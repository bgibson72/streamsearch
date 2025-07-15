import { StreamingService, Show, UserPreferences, Recommendation } from '../types';

/**
 * Calculate the optimal streaming service recommendations for a user
 * @param userPrefs User's preferences including selected shows and budget
 * @param allServices Available streaming services
 * @param allShows All available shows
 * @returns Recommended service combinations with cost analysis
 */
export function calculateRecommendations(
  userPrefs: UserPreferences,
  allServices: StreamingService[],
  allShows: Show[]
): Recommendation[] {
  const selectedShows = allShows.filter(show => 
    userPrefs.selectedShows.find(selectedShow => String(selectedShow.id) === String(show.id))
  );

  if (selectedShows.length === 0) {
    return [];
  }

  // Generate all possible service combinations
  const serviceCombinations = generateServiceCombinations(allServices);
  
  // Score each combination
  const recommendations = serviceCombinations.map(services => 
    scoreServiceCombination(services, selectedShows)
  );

  // Filter by budget and sort by efficiency
  return recommendations
    .filter(rec => !userPrefs.budget || rec.cost <= userPrefs.budget)
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 5); // Return top 5 recommendations
}

/**
 * Generate all possible combinations of streaming services
 * Limited to reasonable combinations (1-4 services)
 */
function generateServiceCombinations(services: StreamingService[]): StreamingService[][] {
  const combinations: StreamingService[][] = [];
  
  // Single services
  services.forEach(service => {
    combinations.push([service]);
  });

  // Pairs
  for (let i = 0; i < services.length; i++) {
    for (let j = i + 1; j < services.length; j++) {
      combinations.push([services[i], services[j]]);
    }
  }

  // Triples (only for popular combinations)
  const popularServices = services.filter(s => 
    ['netflix', 'disney-plus', 'hbo-max', 'amazon-prime', 'hulu'].includes(s.id)
  );
  
  for (let i = 0; i < popularServices.length; i++) {
    for (let j = i + 1; j < popularServices.length; j++) {
      for (let k = j + 1; k < popularServices.length; k++) {
        combinations.push([popularServices[i], popularServices[j], popularServices[k]]);
      }
    }
  }

  return combinations;
}

/**
 * Score a service combination based on coverage, cost, and efficiency
 */
function scoreServiceCombination(
  services: StreamingService[],
  selectedShows: Show[]
): Recommendation {
  const serviceIds = services.map(s => s.id);
  
  // Calculate show coverage
  const coveredShows = selectedShows.filter(show =>
    show.streamingServices.some(serviceId => serviceIds.includes(serviceId))
  );
  
  const uncoveredShows = selectedShows.filter(show =>
    !show.streamingServices.some(serviceId => serviceIds.includes(serviceId))
  );

  // Calculate costs
  const cost = services.reduce((sum, service) => sum + service.monthlyPrice, 0);

  // Calculate coverage percentage
  const coverage = selectedShows.length > 0 ? coveredShows.length / selectedShows.length : 0;

  // Calculate efficiency score (coverage per dollar)
  const efficiency = cost > 0 ? coverage / cost : 0;

  return {
    services,
    cost: Math.round(cost * 100) / 100,
    coverage,
    efficiency,
    coveredShows,
    uncoveredShows
  };
}

/**
 * Find shows available on a specific streaming service
 */
export function getShowsByService(serviceId: string, allShows: Show[]): Show[] {
  return allShows.filter(show => show.streamingServices.includes(serviceId));
}

/**
 * Enhanced search shows with relevance scoring
 */
export function searchShows(query: string, allShows: Show[]): Show[] {
  if (!query.trim()) return allShows;
  
  const getSearchRelevance = (show: Show, searchQuery: string): number => {
    const searchTerm = searchQuery.toLowerCase();
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

  return allShows
    .filter(show => getSearchRelevance(show, query) > 0)
    .sort((a, b) => {
      const aRelevance = getSearchRelevance(a, query);
      const bRelevance = getSearchRelevance(b, query);
      if (aRelevance !== bRelevance) {
        return bRelevance - aRelevance; // Higher relevance first
      }
      // Secondary sort by popularity
      return (b.popularity || 0) - (a.popularity || 0);
    });
}