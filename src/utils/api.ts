/**
 * API utilities for fetching streaming data from TMDB and JustWatch
 * 
 * COMPLIANCE NOTES:
 * - TMDB: Uses official API with proper attribution
 * - JustWatch: Uses public API endpoints (no private/scraped data)
 * - Rate limiting implemented to respect service limits
 * - All data is cached appropriately to minimize API calls
 * - Attribution and credits provided where required
 */

import { Show } from '../types';
import { ComplianceMonitor } from './compliance';

// API Configuration
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 for poster thumbnails

// Rate limiting configuration
const API_RATE_LIMIT = 1000; // 1 second between requests
let lastApiCall = 0;

/**
 * Safe fetch wrapper for API calls
 */
async function safeFetch(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    console.log('Making API request to:', url);
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, url: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('API request successful:', url);
    return response;
  } catch (error) {
    console.error('Fetch error for URL:', url, error);
    throw error;
  }
}

/**
 * Rate limiting wrapper for API calls with compliance monitoring
 */
async function rateLimitedRequest<T>(requestFn: () => Promise<T>, apiName: string = 'general'): Promise<T> {
  // Check compliance before making request
  if (!ComplianceMonitor.canMakeRequest(apiName)) {
    await new Promise(resolve => setTimeout(resolve, API_RATE_LIMIT));
  }

  const now = Date.now();
  const timeSinceLastCall = now - lastApiCall;
  
  if (timeSinceLastCall < API_RATE_LIMIT) {
    await new Promise(resolve => setTimeout(resolve, API_RATE_LIMIT - timeSinceLastCall));
  }
  
  lastApiCall = Date.now();
  ComplianceMonitor.recordRequest(apiName);
  
  return requestFn();
}

/**
 * TMDB API Types
 */
interface TMDBSearchItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  media_type?: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface TMDBGenre {
  id: number;
  name: string;
}

interface JustWatchProvider {
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

/**
 * TMDB API Functions
 */
export class TMDBApi {
  private static genreCache: Map<number, string> = new Map();

  static async getGenres(): Promise<Map<number, string>> {
    if (this.genreCache.size > 0) return this.genreCache;

    if (!TMDB_API_KEY) {
      console.warn('TMDB API key not configured');
      return new Map();
    }

    try {
      const [movieGenresResponse, tvGenresResponse] = await Promise.all([
        rateLimitedRequest(async () => {
          const response = await safeFetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
          return response.json();
        }, 'tmdb'),
        rateLimitedRequest(async () => {
          const response = await safeFetch(`${TMDB_BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}`);
          return response.json();
        }, 'tmdb')
      ]);

      const movieGenres = movieGenresResponse as { genres: TMDBGenre[] };
      const tvGenres = tvGenresResponse as { genres: TMDBGenre[] };
      
      const allGenres = [...movieGenres.genres, ...tvGenres.genres];
      allGenres.forEach((genre: TMDBGenre) => {
        this.genreCache.set(genre.id, genre.name);
      });

      return this.genreCache;
    } catch (error) {
      console.error('Error fetching TMDB genres:', error);
      return new Map();
    }
  }

  static async searchContent(query: string, page = 1): Promise<Show[]> {
    if (!TMDB_API_KEY) {
      console.warn('TMDB API key not configured');
      return [];
    }

    try {
      const response = await rateLimitedRequest(async () => {
        const res = await safeFetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return res.json();
      }, 'tmdb');

      const apiResponse = response as { results: TMDBSearchItem[] };
      const genres = await this.getGenres();
      const shows: Show[] = [];

      for (const item of apiResponse.results) {
        if (item.media_type === 'movie' || item.media_type === 'tv') {
          const show = await this.convertToShow(item, genres);
          if (show) shows.push(show);
        }
      }

      return shows;
    } catch (error) {
      console.error('Error searching TMDB content:', error);
      return [];
    }
  }

  static async getPopularContent(type: 'movie' | 'tv' = 'movie', page = 1): Promise<Show[]> {
    if (!TMDB_API_KEY) {
      console.warn('TMDB API key not configured');
      return [];
    }

    try {
      const response = await rateLimitedRequest(async () => {
        const res = await safeFetch(`${TMDB_BASE_URL}/${type}/popular?api_key=${TMDB_API_KEY}&page=${page}`);
        return res.json();
      }, 'tmdb');

      const apiResponse = response as { results: TMDBSearchItem[] };
      const genres = await this.getGenres();
      const shows: Show[] = [];

      for (const item of apiResponse.results) {
        const show = await this.convertToShow({ ...item, media_type: type }, genres);
        if (show) shows.push(show);
      }

      return shows;
    } catch (error) {
      console.error('Error fetching popular content:', error);
      return [];
    }
  }

  private static async convertToShow(item: TMDBSearchItem, genres: Map<number, string>): Promise<Show | null> {
    try {
      const isMovie = item.media_type === 'movie' || item.title;
      const title = isMovie ? item.title : item.name;
      const releaseDate = isMovie ? item.release_date : item.first_air_date;
      
      if (!title || !releaseDate) return null;

      const year = new Date(releaseDate).getFullYear();
      const genreNames = item.genre_ids
        ?.map((id: number) => genres.get(id))
        .filter((name): name is string => Boolean(name)) || [];

      // Get streaming availability from JustWatch
      const streamingServices = await JustWatchApi.getStreamingServices(title, year);

      return {
        id: `tmdb-${item.id}`,
        title,
        genre: genreNames,
        year,
        type: isMovie ? 'movie' : 'series',
        streamingServices,
        popularity: Math.round(item.popularity / 10), // Scale to 1-10
        imdbRating: item.vote_average,
        description: item.overview || 'No description available.',
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        imageUrl: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : undefined
      };
    } catch (error) {
      console.error('Error converting TMDB item to show:', error);
      return null;
    }
  }
}

/**
 * JustWatch API Functions
 * Note: JustWatch API has CORS restrictions, so we'll use fallback logic
 */
export class JustWatchApi {
  private static providerMap: Map<number, string> = new Map([
    // Major Subscription Services
    [8, 'netflix'],
    [9, 'amazon-prime'],
    [337, 'disney-plus'],
    [384, 'hbo-max'],
    [15, 'hulu'],
    [350, 'apple-tv-plus'],
    [531, 'paramount-plus'],
    [387, 'peacock'],
    [37, 'showtime'],
    [43, 'starz'],
    [524, 'discovery-plus'],
    [528, 'espn-plus'],
    [283, 'funimation'],
    [634, 'crunchyroll'],
    [192, 'youtube-premium'],
    [257, 'fubo'],
    [623, 'crave'],
    
    // Free Services
    [73, 'tubi'],
    [300, 'pluto-tv'],
    [613, 'tiktok'],
    [538, 'plex'],
    
    // Rental/Purchase Services
    [2, 'apple-tv'],
    [386, 'google-play'],
    [68, 'microsoft-store'],
    [7, 'vudu'],
  ]);

  static async getStreamingServices(title: string, year: number): Promise<string[]> {
    try {
      console.log(`Getting streaming services for: ${title} (${year})`);
      
      // Call the real JustWatch API through our proxy endpoint
      const response = await fetch('/api/justwatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, year }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`JustWatch API response for ${title}:`, data);
        
        if (data.providers && data.providers.length > 0) {
          // Map JustWatch provider IDs to our internal service IDs and deduplicate
          const mappedServices = data.providers
            .map((provider: { provider_id: number }) => this.providerMap.get(provider.provider_id))
            .filter((service: string | undefined): service is string => Boolean(service));
          
          console.log(`🔧 Before deduplication for ${title}:`, mappedServices);
          
          // Remove duplicates using Set
          const uniqueServices = Array.from(new Set(mappedServices)) as string[];
          
          console.log(`✅ After deduplication for ${title}:`, uniqueServices);
          return uniqueServices;
        }
      }

      // If JustWatch API fails, use specific show mappings for better accuracy
      const titleLower = title.toLowerCase();
      const knownMappings: Record<string, string[]> = {
        'new girl': ['hulu'],
        'friends': ['hbo-max'],
        'the office': ['peacock'],
        'stranger things': ['netflix'],
        'the mandalorian': ['disney-plus'],
        'game of thrones': ['hbo-max'],
        'succession': ['hbo-max'],
        'the boys': ['amazon-prime'],
        'handmaids tale': ['hulu'],
        'brooklyn nine-nine': ['hulu', 'peacock'],
        'parks and recreation': ['peacock'],
        'arrested development': ['netflix'],
        'house of cards': ['netflix'],
        'orange is the new black': ['netflix'],
        'the crown': ['netflix'],
        'wandavision': ['disney-plus'],
        'the falcon and the winter soldier': ['disney-plus'],
        'loki': ['disney-plus'],
        'euphoria': ['hbo-max'],
        'westworld': ['hbo-max'],
        'silicon valley': ['hbo-max'],
        'veep': ['hbo-max'],
        'barry': ['hbo-max'],
        'chernobyl': ['hbo-max'],
        'band of brothers': ['hbo-max'],
        'the wire': ['hbo-max'],
        'the sopranos': ['hbo-max'],
        'sex and the city': ['hbo-max'],
        'girls': ['hbo-max'],
        'true detective': ['hbo-max'],
        'the good place': ['netflix'],
        'schitts creek': ['netflix'],
        'ozark': ['netflix'],
        'narcos': ['netflix'],
        'mindhunter': ['netflix'],
        'black mirror': ['netflix'],
        'the witcher': ['netflix'],
        'bridgerton': ['netflix'],
        'squid game': ['netflix'],
        'money heist': ['netflix'],
        'dark': ['netflix'],
        'queens gambit': ['netflix'],
        'tiger king': ['netflix'],
        'making a murderer': ['netflix'],
        'fuller house': ['netflix'],
        'bojack horseman': ['netflix'],
        'big mouth': ['netflix'],
        'disenchantment': ['netflix'],
        'marvelous mrs maisel': ['amazon-prime'],
        'the expanse': ['amazon-prime'],
        'jack ryan': ['amazon-prime'],
        'fleabag': ['amazon-prime'],
        'the man in the high castle': ['amazon-prime'],
        'transparent': ['amazon-prime'],
        'bosch': ['amazon-prime'],
        'upload': ['amazon-prime'],
        'the tick': ['amazon-prime'],
      };

      // Check for exact match
      const exactMatch = knownMappings[titleLower];
      if (exactMatch) {
        console.log(`Using known mapping for ${title}:`, exactMatch);
        return exactMatch;
      }

      // Check for partial matches
      for (const [knownTitle, services] of Object.entries(knownMappings)) {
        if (titleLower.includes(knownTitle) || knownTitle.includes(titleLower)) {
          console.log(`Using partial mapping for ${title}:`, services);
          return services;
        }
      }

      // If no mapping found, return empty array instead of defaulting to Netflix
      console.log(`No streaming data found for ${title}, returning empty array`);
      return [];
    } catch (error) {
      console.error('Error fetching JustWatch data:', error);
      // Return empty array instead of defaulting to Netflix
      return [];
    }
  }

  static async getProviders(): Promise<JustWatchProvider[]> {
    try {
      // Return static provider list due to CORS restrictions
      return [
        { provider_id: 8, provider_name: 'Netflix', display_priority: 1 },
        { provider_id: 337, provider_name: 'Disney Plus', display_priority: 2 },
        { provider_id: 384, provider_name: 'HBO Max', display_priority: 3 },
        { provider_id: 9, provider_name: 'Amazon Prime Video', display_priority: 4 },
        { provider_id: 15, provider_name: 'Hulu', display_priority: 5 }
      ];
    } catch (error) {
      console.error('Error fetching JustWatch providers:', error);
      return [];
    }
  }
}

/**
 * Combined API Functions
 */
export class ContentApi {
  /**
   * Search for content across all APIs
   */
  static async searchContent(query: string): Promise<Show[]> {
    try {
      // Check cache first (client-side only) - SHORT CACHE FOR TESTING
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(`search_${query}`);
        if (cached) {
          try {
            const { results, timestamp } = JSON.parse(cached);
            // Return cached results if less than 30 seconds old (for testing)
            if (Date.now() - timestamp < 30000) {
              console.log('Returning cached search results for:', query);
              return results;
            }
          } catch (error) {
            console.warn('Error parsing cached search results:', error);
          }
        }
      }

      // Search TMDB first (more reliable)
      const tmdbResults = await TMDBApi.searchContent(query);
      
      // Cache results to avoid repeated API calls (client-side only) - SHORT CACHE
      if (typeof window !== 'undefined') {
        localStorage.setItem(`search_${query}`, JSON.stringify({
          results: tmdbResults,
          timestamp: Date.now()
        }));
      }

      return tmdbResults;
    } catch (error) {
      console.error('Error in content search:', error);
      
      // Try to return cached results if available (client-side only)
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(`search_${query}`);
        if (cached) {
          try {
            const { results, timestamp } = JSON.parse(cached);
            // Return cached results if less than 1 hour old
            if (Date.now() - timestamp < 3600000) {
              console.log('Returning cached search results from error fallback for:', query);
              return results;
            }
          } catch (parseError) {
            console.warn('Error parsing cached search results in error fallback:', parseError);
          }
        }
      }
      
      return [];
    }
  }

  /**
   * Get popular content with streaming availability
   */
  static async getPopularContent(): Promise<Show[]> {
    try {
      const cacheKey = 'popular_content';
      
      // Check cache first (client-side only)
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            const { results, timestamp } = JSON.parse(cached);
            // Return cached results if less than 4 hours old
            if (Date.now() - timestamp < 14400000) {
              console.log('Returning cached popular content');
              return results;
            }
          } catch (error) {
            console.warn('Error parsing cached popular content:', error);
          }
        }
      }

      // Get popular movies and TV shows
      const [popularMovies, popularTVShows] = await Promise.all([
        TMDBApi.getPopularContent('movie'),
        TMDBApi.getPopularContent('tv')
      ]);

      const allContent = [...popularMovies, ...popularTVShows]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 50); // Limit to top 50

      // Cache the results (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify({
          results: allContent,
          timestamp: Date.now()
        }));
      }

      return allContent;
    } catch (error) {
      console.error('Error fetching popular content:', error);
      return [];
    }
  }

  /**
   * Get content by streaming service
   */
  static async getContentByService(serviceId: string): Promise<Show[]> {
    try {
      const popularContent = await this.getPopularContent();
      return popularContent.filter(show => 
        show.streamingServices.includes(serviceId)
      );
    } catch (error) {
      console.error('Error filtering content by service:', error);
      return [];
    }
  }
}

/**
 * Utility function to check if APIs are properly configured
 */
export function areApisConfigured(): boolean {
  const isConfigured = Boolean(TMDB_API_KEY);
  console.log('API configuration check:', { 
    TMDB_API_KEY: TMDB_API_KEY ? 'Set' : 'Not set',
    actualKey: TMDB_API_KEY ? `${TMDB_API_KEY.substring(0, 8)}...` : 'None',
    isConfigured,
    environment: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('TMDB'))
  });
  return isConfigured;
}

/**
 * Attribution text for compliance
 */
export const API_ATTRIBUTION = {
  tmdb: "This product uses the TMDB API but is not endorsed or certified by TMDB.",
  justwatch: "Streaming availability data provided by JustWatch."
};


