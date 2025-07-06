# API Integration Guide

StreamSearch integrates with external APIs to provide real-time streaming data while maintaining full compliance with Terms of Service.

## APIs Used

### TMDB (The Movie Database)
- **Purpose**: Movie and TV show metadata
- **Type**: Official REST API
- **Authentication**: API Key required
- **Rate Limits**: 1000 requests/day (free tier)
- **Compliance**: ✅ Official API, proper attribution

### JustWatch
- **Purpose**: Streaming availability data
- **Type**: Public API endpoints
- **Rate Limits**: Self-imposed 1 request/second
- **Compliance**: ✅ Public endpoints, proper caching

## Setup Instructions

1. **Get TMDB API Key**
   - Visit: https://www.themoviedb.org/settings/api
   - Create a free account
   - Request an API key (instant approval)
   - Free tier includes 1000 requests/day

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
3. **Add API Key**
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Restart Development Server**
   ```bash
   npm run dev
   ```

## Features with API Integration

- ✅ Real-time movie/TV show search
- ✅ Current streaming availability 
- ✅ Accurate ratings and descriptions
- ✅ Latest releases and popular content
- ✅ Comprehensive genre classification
- ✅ Automatic caching for performance

## Compliance Features

### Rate Limiting
- Automatic 1-second delay between API calls
- Request tracking and monitoring
- Graceful fallback to cached data

### Caching Strategy
- Search results: 1 hour
- Popular content: 4 hours
- Genre data: 24 hours
- Streaming availability: 2 hours

### Attribution
- Required TMDB attribution displayed
- JustWatch credit for streaming data
- Clear data source indicators

## Terms of Service Compliance

StreamSearch is designed to fully comply with all API terms:

### TMDB Compliance ✅
- Uses official API with authentication
- Respects daily rate limits
- Provides required attribution
- No unauthorized data access
- Educational use only

### JustWatch Compliance ✅
- Uses public API endpoints only
- Implements rate limiting
- Caches data appropriately
- Attribution provided
- No data redistribution

### General Best Practices ✅
- No web scraping
- Official APIs only
- Proper error handling
- User privacy respected
- Educational/informational use

## Fallback Behavior

If APIs are not configured or unavailable:
- Falls back to curated sample data
- All core functionality remains available
- Clear indication of data source
- No degraded user experience

## Data Accuracy

⚠️ **Important**: While we strive for accuracy, streaming availability can change frequently. Users should verify content availability on the actual streaming platforms before making subscription decisions.

## Development Notes

### API Error Handling
```typescript
// Graceful degradation
try {
  const data = await api.fetch();
  return data;
} catch (error) {
  console.warn('API unavailable, using cached data');
  return getCachedData();
}
```

### Rate Limiting Implementation
```typescript
// Built-in rate limiting
const response = await rateLimitedRequest(() => 
  axios.get(apiUrl)
);
```

### Caching Strategy
```typescript
// Intelligent caching
const cached = localStorage.getItem(cacheKey);
if (cached && isCacheValid(cacheKey, timestamp)) {
  return JSON.parse(cached);
}
```

## Legal Considerations

This application:
- Does not store or redistribute copyrighted content
- Uses only publicly available metadata
- Provides attribution as required
- Operates under fair use for educational purposes
- Encourages users to support official platforms

For any compliance questions or concerns, please review the official terms of service for each API provider.
