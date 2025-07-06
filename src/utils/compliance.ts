/**
 * Terms of Service Compliance Documentation
 * 
 * This document outlines how StreamSearch complies with various API terms of service
 * and best practices for ethical data usage.
 */

export const COMPLIANCE_INFO = {
  tmdb: {
    name: "The Movie Database (TMDB)",
    termsUrl: "https://www.themoviedb.org/terms",
    compliance: [
      "Uses official TMDB API with proper authentication",
      "Respects rate limits (1000 requests per day for free tier)",
      "Implements client-side caching to minimize API calls",
      "Provides proper attribution as required",
      "Only accesses publicly available data",
      "Does not scrape or use unauthorized endpoints"
    ],
    attribution: "This product uses the TMDB API but is not endorsed or certified by TMDB.",
    limits: {
      requests_per_day: 1000,
      requests_per_second: 4
    }
  },
  
  justwatch: {
    name: "JustWatch",
    termsUrl: "https://www.justwatch.com/terms",
    compliance: [
      "Uses publicly available API endpoints only",
      "Respects rate limiting to avoid service disruption",
      "Caches data appropriately to minimize requests",
      "Does not redistribute or resell data",
      "Uses data for informational purposes only",
      "Provides attribution for streaming availability data"
    ],
    attribution: "Streaming availability data provided by JustWatch.",
    limits: {
      requests_per_second: 1
    }
  },

  general: {
    principles: [
      "No automated scraping of websites",
      "Respect robots.txt files",
      "Use official APIs whenever available",
      "Implement proper rate limiting",
      "Cache data to minimize API usage",
      "Provide proper attribution",
      "Only use data for intended educational/informational purposes",
      "Do not redistribute copyrighted content",
      "Respect intellectual property rights"
    ]
  }
};

export const RATE_LIMITING = {
  tmdb: {
    windowMs: 1000, // 1 second
    maxRequests: 1
  },
  justwatch: {
    windowMs: 1000, // 1 second  
    maxRequests: 1
  }
};

export const CACHING_POLICY = {
  search_results: 3600000, // 1 hour
  popular_content: 14400000, // 4 hours
  genre_data: 86400000, // 24 hours
  streaming_availability: 7200000 // 2 hours
};

/**
 * Validates that API usage complies with rate limits
 */
export class ComplianceMonitor {
  private static requestTimes: Map<string, number[]> = new Map();

  static canMakeRequest(apiName: string): boolean {
    const limits = RATE_LIMITING[apiName as keyof typeof RATE_LIMITING];
    if (!limits) return true;

    const now = Date.now();
    const apiRequests = this.requestTimes.get(apiName) || [];
    
    // Remove old requests outside the window
    const validRequests = apiRequests.filter(
      time => now - time < limits.windowMs
    );

    this.requestTimes.set(apiName, validRequests);
    
    return validRequests.length < limits.maxRequests;
  }

  static recordRequest(apiName: string): void {
    const now = Date.now();
    const apiRequests = this.requestTimes.get(apiName) || [];
    apiRequests.push(now);
    this.requestTimes.set(apiName, apiRequests);
  }

  static getUsageStats(apiName: string): {
    requestsInWindow: number;
    maxRequests: number;
    windowMs: number;
  } {
    const limits = RATE_LIMITING[apiName as keyof typeof RATE_LIMITING];
    if (!limits) {
      return { requestsInWindow: 0, maxRequests: Infinity, windowMs: 0 };
    }

    const now = Date.now();
    const apiRequests = this.requestTimes.get(apiName) || [];
    const requestsInWindow = apiRequests.filter(
      time => now - time < limits.windowMs
    ).length;

    return {
      requestsInWindow,
      maxRequests: limits.maxRequests,
      windowMs: limits.windowMs
    };
  }
}

/**
 * Checks if cached data is still valid
 */
export function isCacheValid(cacheKey: string, timestamp: number): boolean {
  const policy = CACHING_POLICY[cacheKey as keyof typeof CACHING_POLICY];
  if (!policy) return false;
  
  return Date.now() - timestamp < policy;
}

/**
 * Terms of Service warning component data
 */
export const TOS_WARNING = {
  title: "API Terms of Service Compliance",
  message: `StreamSearch is designed to comply with all relevant Terms of Service:

• TMDB API: Used under official API terms with proper attribution
• JustWatch: Uses public endpoints with appropriate rate limiting  
• No web scraping or unauthorized data access
• Proper caching to minimize API usage
• Educational/informational use only

By using this application, you acknowledge that streaming availability 
data may not be 100% accurate and should be verified on the respective 
streaming platforms.`,
  
  actions: [
    "Review TMDB Terms: https://www.themoviedb.org/terms",
    "Review JustWatch Terms: https://www.justwatch.com/terms",
    "Use official streaming platform websites for final verification"
  ]
};
