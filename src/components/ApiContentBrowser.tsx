'use client';

import { useState, useEffect } from 'react';
import { ContentApi, areApisConfigured, API_ATTRIBUTION } from '../utils/api';
import { Show } from '../types';

interface ApiContentBrowserProps {
  onShowSelect: (show: Show) => void;
  selectedShows: string[];
  selectedCategory?: 'all' | 'movie' | 'tv';
  selectedGenre?: string;
  onCategoryChange?: (category: 'all' | 'movie' | 'tv') => void;
  onGenreChange?: (genre: string) => void;
}

export default function ApiContentBrowser({ 
  onShowSelect, 
  selectedShows,
  selectedCategory = 'all',
  selectedGenre = 'all',
  onCategoryChange,
  onGenreChange
}: ApiContentBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [popularContent, setPopularContent] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Search relevance function for API content
  const getSearchRelevance = (show: Show, query: string): number => {
    if (!query) return 0;
    
    const searchTerm = query.toLowerCase();
    const title = show.title.toLowerCase();
    const description = show.description.toLowerCase();
    const genres = show.genre.map(g => g.toLowerCase());
    
    let score = 0;
    
    // Exact title match gets highest score
    if (title === searchTerm) score += 100;
    // Title starts with search term
    else if (title.startsWith(searchTerm)) score += 80;
    // Title contains search term
    else if (title.includes(searchTerm)) score += 60;
    
    // Word-by-word matching for multi-word searches
    const searchWords = searchTerm.split(' ').filter(word => word.length > 2);
    const titleWords = title.split(' ');
    
    searchWords.forEach(searchWord => {
      titleWords.forEach(titleWord => {
        if (titleWord === searchWord) score += 40;
        else if (titleWord.startsWith(searchWord)) score += 30;
        else if (titleWord.includes(searchWord)) score += 20;
      });
    });
    
    // Description matches
    if (description.includes(searchTerm)) score += 15;
    searchWords.forEach(word => {
      if (description.includes(word)) score += 10;
    });
    
    // Genre matches
    genres.forEach(genre => {
      if (genre.includes(searchTerm)) score += 25;
      searchWords.forEach(word => {
        if (genre.includes(word)) score += 15;
      });
    });
    
    return score;
  };

  // Combine and filter content
  const allContent = [...popularContent, ...searchResults];
  const uniqueContent = allContent.filter((show, index, self) => 
    index === self.findIndex(s => s.id === show.id)
  );

  // Apply filters and sort by relevance
  const filteredContent = uniqueContent
    .filter(show => {
      const matchesCategory = selectedCategory === 'all' || 
        show.type === selectedCategory ||
        (selectedCategory === 'tv' && show.type === 'series');
      const matchesGenre = selectedGenre === 'all' || 
        show.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
      
      // If there's a search query, check relevance
      if (searchQuery) {
        const searchRelevance = getSearchRelevance(show, searchQuery);
        return matchesCategory && matchesGenre && searchRelevance > 0;
      }
      
      return matchesCategory && matchesGenre;
    })
    .sort((a, b) => {
      // If there's a search query, sort by relevance first
      if (searchQuery) {
        const aRelevance = getSearchRelevance(a, searchQuery);
        const bRelevance = getSearchRelevance(b, searchQuery);
        if (aRelevance !== bRelevance) {
          return bRelevance - aRelevance;
        }
      }
      // Secondary sort by popularity
      return (b.popularity || 0) - (a.popularity || 0);
    });

  // Get unique genres from all content
  const allGenres = Array.from(new Set(uniqueContent.flatMap(show => show.genre))).sort();

  useEffect(() => {
    const initializeApi = async () => {
      try {
        setIsConfigured(areApisConfigured());
        if (areApisConfigured()) {
          console.log('APIs configured, loading popular content...');
          await loadPopularContent();
        } else {
          console.log('APIs not configured, skipping API calls');
        }
      } catch (error) {
        console.error('Error initializing API content browser:', error);
        setIsConfigured(false);
      }
    };

    initializeApi();
  }, []);

  const loadPopularContent = async () => {
    setLoading(true);
    try {
      console.log('Loading popular content...');
      const content = await ContentApi.getPopularContent();
      console.log('Popular content loaded:', content.length, 'items');
      setPopularContent(content);
    } catch (error) {
      console.error('Error loading popular content:', error);
      // Set empty array on error to prevent crashes
      setPopularContent([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      console.log('Searching for:', searchQuery);
      const results = await ContentApi.searchContent(searchQuery);
      console.log('Search results:', results.length, 'items');
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching content:', error);
      // Set empty array on error to prevent crashes
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowClick = (show: Show) => {
    onShowSelect(show);
  };

  const displayContent = filteredContent;

  if (!isConfigured) {
    return (
      <div className="card border-warning/20 bg-warning/5 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          API Configuration Required
        </h3>
        <p className="text-muted-foreground mb-4">
          To use real-time content data, you need to configure API keys. This will give you access to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
          <li>Latest movies and TV shows</li>
          <li>Real-time streaming availability</li>
          <li>Accurate ratings and descriptions</li>
          <li>Search functionality across thousands of titles</li>
        </ul>
        <div className="card bg-muted p-4">
          <h4 className="font-semibold mb-3 text-foreground">Setup Instructions:</h4>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
            <li>Get a free TMDB API key at <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">themoviedb.org</a></li>
            <li>Copy <code className="bg-background text-foreground px-2 py-1 rounded font-mono text-xs">.env.example</code> to <code className="bg-background text-foreground px-2 py-1 rounded font-mono text-xs">.env.local</code></li>
            <li>Add your API key to the <code className="bg-background text-foreground px-2 py-1 rounded font-mono text-xs">NEXT_PUBLIC_TMDB_API_KEY</code> variable</li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Section */}
      <div className="space-y-4">
        {/* Search */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search movies and TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 input"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn btn-primary px-6 py-2 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Category and Genre Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange?.(e.target.value as 'all' | 'movie' | 'tv')}
              className="input"
            >
              <option value="all">All Content</option>
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>
          
          {/* Genre Filter */}
          <div className="flex-1">
            <label className="block font-medium text-foreground mb-2">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange?.(e.target.value)}
              className="input"
            >
              <option value="all">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="badge badge-secondary px-4 py-2">
          Showing {displayContent.length} items
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== 'all' && ` • ${selectedCategory === 'movie' ? 'Movies' : 'TV Shows'}`}
          {selectedGenre !== 'all' && ` • ${selectedGenre}`}
        </div>
      </div>

      {/* Content Grid */}
      {loading && (
        <div className="card p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-3 text-muted-foreground">Loading content...</p>
        </div>
      )}

      {!loading && displayContent.length === 0 && searchQuery && (
        <div className="card p-8 text-center">
          <p className="text-muted-foreground">No results found for &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}

      {!loading && displayContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {searchResults.length > 0 ? `Search Results (${searchResults.length})` : `Popular Content (${popularContent.length})`}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayContent.map((show) => {
              const isSelected = selectedShows.includes(show.id);
              return (
                <div
                  key={show.id}
                  onClick={() => handleShowClick(show)}
                  className={`card p-4 cursor-pointer transition-all hover:shadow-medium hover:-translate-y-1 ${
                    isSelected
                      ? 'ring-2 ring-primary bg-primary/5'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-foreground text-sm line-clamp-2 flex-1">
                      {show.title}
                    </h4>
                    <div className="flex gap-2 ml-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 border rounded transition-colors ${
                        show.type === 'movie' 
                          ? 'border-primary text-primary bg-transparent'
                          : 'border-secondary text-secondary bg-transparent'
                      }`}>
                        {show.type === 'movie' ? '🎬' : '📺'}
                      </span>
                      {show.year && (
                        <span className="badge badge-secondary text-xs">
                          {show.year}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="card bg-muted p-3 mb-3">
                    <p className="text-muted-foreground text-xs line-clamp-2">
                      {show.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {show.genre.slice(0, 3).map((genre) => (
                      <span
                        key={genre}
                        className="badge badge-secondary text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                    {show.genre.length > 3 && (
                      <span className="text-muted-foreground text-xs px-1.5 py-0.5">
                        +{show.genre.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {show.streamingServices.length > 0 && (
                      <div className="text-xs w-full text-center px-2 py-1 border border-primary text-primary bg-transparent rounded">
                        📺 {show.streamingServices.length} service{show.streamingServices.length !== 1 ? 's' : ''}
                      </div>
                    )}

                    {show.imdbRating && (
                      <div className="text-xs w-full text-center px-2 py-1 border border-warning text-warning bg-transparent rounded">
                        ⭐ {show.imdbRating.toFixed(1)}/10
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* API Attribution */}
      <div className="card bg-muted p-4 mt-6">
        <div className="text-muted-foreground text-xs space-y-1">
          <p>{API_ATTRIBUTION.tmdb}</p>
          <p>{API_ATTRIBUTION.justwatch}</p>
        </div>
      </div>
    </div>
  );
}
