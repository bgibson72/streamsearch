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
    userPrefs.selectedShows.includes(show.id)
  );

  if (selectedShows.length === 0) {
    return [];
  }

  // Generate all possible service combinations
  const serviceCombinations = generateServiceCombinations(allServices);
  
  // Score each combination
  const recommendations = serviceCombinations.map(services => 
    scoreServiceCombination(services, selectedShows, userPrefs)
  );

  // Filter by budget and sort by score
  return recommendations
    .filter(rec => !userPrefs.maxBudget || rec.totalMonthlyCost <= userPrefs.maxBudget)
    .sort((a, b) => b.score - a.score)
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
  selectedShows: Show[],
  userPrefs: UserPreferences
): Recommendation {
  const serviceIds = services.map(s => s.id);
  
  // Calculate show coverage
  const coveredShows = selectedShows.filter(show =>
    show.streamingServices.some(serviceId => serviceIds.includes(serviceId))
  );
  
  const missedShows = selectedShows.filter(show =>
    !show.streamingServices.some(serviceId => serviceIds.includes(serviceId))
  );

  // Calculate costs
  const totalMonthlyCost = services.reduce((sum, service) => sum + service.monthlyPrice, 0);
  const totalYearlyCost = userPrefs.subscriptionType === 'yearly' 
    ? services.reduce((sum, service) => sum + (service.yearlyPrice || service.monthlyPrice * 12), 0)
    : undefined;

  // Calculate coverage percentage
  const coveragePercentage = (coveredShows.length / selectedShows.length) * 100;

  // Calculate efficiency score (coverage per dollar)
  const efficiency = coveragePercentage / totalMonthlyCost;

  // Calculate savings compared to getting all services
  const allServicesCost = services.length > 1 
    ? calculatePotentialSavings(services, selectedShows)
    : 0;

  // Base score calculation with value optimization
  let score = 0;
  
  if (userPrefs.optimizeForValue) {
    // Value optimization: Prioritize fewer services with maximum coverage
    
    // Coverage weight (60% of score) - higher weight for value optimization
    score += coveragePercentage * 0.6;
    
    // Service count penalty/bonus (25% of score)
    const serviceCountScore = Math.max(0, 25 - (services.length - 1) * 8);
    score += serviceCountScore;
    
    // Cost efficiency weight (15% of score)
    score += Math.min(efficiency * 5, 15);
    
    // Big bonus for complete coverage with minimal services
    if (missedShows.length === 0 && services.length <= 2) {
      score += 25;
    } else if (missedShows.length === 0) {
      score += 15;
    }
    
    // Extra penalty for too many services in value mode
    if (services.length > 3) {
      score -= 20;
    }
  } else {
    // Standard optimization: Balance coverage, cost, and efficiency
    
    // Coverage weight (50% of score)
    score += coveragePercentage * 0.5;
    
    // Cost efficiency weight (30% of score)
    score += Math.min(efficiency * 10, 30);
    
    // Bonus for complete coverage (20% of score)
    if (missedShows.length === 0) {
      score += 20;
    }
    
    // Penalty for too many services
    if (services.length > 3) {
      score -= 10;
    }
  }

  // Budget compliance bonus (applies to both modes)
  if (userPrefs.maxBudget && totalMonthlyCost <= userPrefs.maxBudget * 0.8) {
    score += 5;
  }

  const reasoning = generateReasoning(services, coveredShows, missedShows, totalMonthlyCost, allServicesCost, userPrefs.optimizeForValue);

  return {
    services,
    totalMonthlyCost: Math.round(totalMonthlyCost * 100) / 100,
    totalYearlyCost: totalYearlyCost ? Math.round(totalYearlyCost * 100) / 100 : undefined,
    coveredShows,
    missedShows,
    savings: allServicesCost,
    reasoning,
    score: Math.round(Math.min(score, 100) * 100) / 100 // Cap score at 100
  };
}

/**
 * Calculate potential savings compared to alternative approaches
 */
function calculatePotentialSavings(
  services: StreamingService[],
  selectedShows: Show[]
): number {
  // This is a simplified calculation
  // In reality, you'd compare against other viable combinations
  const averageServiceCost = 12; // Average monthly cost
  const potentialServices = selectedShows.reduce((acc, show) => {
    show.streamingServices.forEach(serviceId => acc.add(serviceId));
    return acc;
  }, new Set()).size;

  const worstCaseCost = potentialServices * averageServiceCost;
  const actualCost = services.reduce((sum, service) => sum + service.monthlyPrice, 0);
  
  return Math.max(0, worstCaseCost - actualCost);
}

/**
 * Generate human-readable reasoning for the recommendation
 */
function generateReasoning(
  services: StreamingService[],
  coveredShows: Show[],
  missedShows: Show[],
  totalCost: number,
  savings: number,
  optimizeForValue?: boolean
): string {
  const serviceNames = services.map(s => s.name).join(' + ');
  
  let reasoning = `${serviceNames} covers ${coveredShows.length} of your selected shows for $${totalCost}/month.`;
  
  if (missedShows.length === 0) {
    reasoning += ' This combination provides complete coverage of all your shows.';
    if (optimizeForValue && services.length <= 2) {
      reasoning += ' 🎯 Maximum value achieved with minimal services!';
    }
  } else {
    reasoning += ` You'll miss ${missedShows.length} show(s): ${missedShows.map(s => s.title).join(', ')}.`;
  }
  
  if (savings > 0) {
    reasoning += ` This saves you approximately $${Math.round(savings * 100) / 100}/month compared to other combinations.`;
  }
  
  if (services.length === 1) {
    reasoning += optimizeForValue 
      ? ' 💰 Single service solution - ultimate value and simplicity!'
      : ' Single service solution - simple and cost-effective.';
  } else if (services.length === 2 && optimizeForValue) {
    reasoning += ' 💪 Two-service combo delivers great bang for your buck.';
  } else {
    reasoning += ` Multi-service solution maximizes your content access.`;
  }
  
  return reasoning;
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