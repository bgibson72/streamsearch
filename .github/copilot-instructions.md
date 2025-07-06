# StreamSearch - GitHub Copilot Instructions

## Project Overview
StreamSearch is a Next.js webapp that helps users find optimal streaming service combinations for their favorite shows and movies. The goal is to save money by avoiding redundant subscriptions.

## Architecture
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **APIs**: TMDB (movie/TV data), JustWatch (streaming availability)
- **Algorithm**: Smart recommendation engine that optimizes cost vs. content coverage

## Key Features
- Show/movie selection with search functionality
- Budget-aware recommendations
- Real-time streaming availability data
- Cost optimization algorithm
- Fallback to curated sample data
- Full Terms of Service compliance

## File Structure
```
src/
├── app/
│   ├── page.tsx           # Main application UI
│   ├── layout.tsx         # App layout and metadata
│   └── globals.css        # Global styles
├── components/
│   └── ApiContentBrowser.tsx  # API-powered content browser
├── data/
│   ├── shows.ts           # Sample shows data
│   └── streamingServices.ts   # Streaming service definitions
├── types/
│   └── index.ts           # TypeScript type definitions
└── utils/
    ├── api.ts             # API integration (TMDB/JustWatch)
    ├── compliance.ts      # Terms of Service compliance
    └── recommendations.ts # Recommendation algorithm
```

## Coding Guidelines

### TypeScript
- Use strict typing throughout
- Define interfaces for all data structures
- Avoid `any` type - use specific types or `unknown`
- Use type guards for runtime type checking

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Use client-side rendering where needed (`'use client'`)
- Follow Next.js App Router conventions

### API Integration
- Always implement rate limiting
- Use proper error handling with fallbacks
- Cache responses appropriately
- Respect Terms of Service

### Styling
- Use Tailwind CSS classes
- Implement dark mode support
- Ensure responsive design
- Follow consistent spacing and color schemes

## API Compliance Rules

### TMDB API
- Use official API endpoints only
- Implement proper rate limiting (1000 requests/day)
- Provide required attribution
- Cache responses to minimize usage
- Never scrape or use unauthorized endpoints

### JustWatch
- Use public API endpoints only
- Implement conservative rate limiting
- Cache streaming availability data
- Provide attribution
- Respect robots.txt and terms

### General Principles
- No web scraping
- Official APIs only
- Proper error handling
- User privacy protection
- Educational use only

## Development Patterns

### Error Handling
```typescript
try {
  const data = await api.fetch();
  return data;
} catch (error) {
  console.error('API error:', error);
  return getFallbackData();
}
```

### Rate Limiting
```typescript
await rateLimitedRequest(() => 
  axios.get(apiUrl), 'apiName'
);
```

### Caching
```typescript
const cached = localStorage.getItem(cacheKey);
if (cached && isCacheValid(cacheKey, timestamp)) {
  return JSON.parse(cached);
}
```

### Type Safety
```typescript
interface APIResponse {
  data: Show[];
  error?: string;
}

function processResponse(response: unknown): Show[] {
  // Validate and type-check response
  if (isValidResponse(response)) {
    return response.data;
  }
  throw new Error('Invalid response format');
}
```

## Recommendation Algorithm
The core algorithm analyzes streaming service combinations to optimize:
1. **Coverage**: Percentage of selected shows available
2. **Cost**: Total monthly/yearly subscription cost
3. **Efficiency**: Coverage per dollar spent
4. **Budget compliance**: Staying within user's budget

## Performance Considerations
- Implement virtual scrolling for large content lists
- Use React.memo for expensive components
- Debounce search inputs
- Lazy load non-critical components
- Optimize bundle size

## Security & Privacy
- No personal data storage
- API keys in environment variables only
- Client-side data processing
- No tracking or analytics
- Transparent data usage

## Testing Strategy
- Unit tests for recommendation algorithm
- Integration tests for API calls
- E2E tests for user workflows
- Performance testing for large datasets
- Accessibility testing

## Common Modifications

### Adding New Streaming Service
1. Update `streamingServices.ts` with service data
2. Add service ID to provider mapping in API utils
3. Update recommendation algorithm if needed
4. Test with sample data

### Adding New API
1. Create API client in `utils/api.ts`
2. Implement rate limiting and caching
3. Add compliance documentation
4. Update Terms of Service references
5. Provide fallback behavior

### Modifying Recommendation Logic
1. Update scoring algorithm in `recommendations.ts`
2. Consider edge cases (no shows, budget constraints)
3. Add unit tests for new logic
4. Document scoring criteria

## Deployment Considerations
- Set environment variables for production
- Implement proper error logging
- Monitor API usage and limits
- Set up caching headers
- Ensure HTTPS and security headers

## Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## When Adding Features
1. Check Terms of Service compliance
2. Implement proper error handling
3. Add TypeScript types
4. Include loading states
5. Consider mobile responsiveness
6. Test with and without API access
7. Update documentation