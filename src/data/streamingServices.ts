import { StreamingService } from '../types';

export const streamingServices: StreamingService[] = [
  // Major Subscription Services
  {
    id: 'netflix',
    name: 'Netflix',
    monthlyPrice: 15.49,
    yearlyPrice: 185.88,
    brandColor: '#E50914',
    justWatchId: 8,
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    monthlyPrice: 8.99,
    yearlyPrice: 107.88,
    brandColor: '#00A8E1',
    justWatchId: 9,
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    monthlyPrice: 7.99,
    yearlyPrice: 95.88,
    brandColor: '#006BB7',
    justWatchId: 337,
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    monthlyPrice: 15.99,
    yearlyPrice: 191.88,
    brandColor: '#8B5CF6',
    justWatchId: 384,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    monthlyPrice: 7.99,
    yearlyPrice: 95.88,
    brandColor: '#1CE783',
    justWatchId: 15,
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    monthlyPrice: 6.99,
    yearlyPrice: 83.88,
    brandColor: '#000000',
    justWatchId: 350,
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    monthlyPrice: 5.99,
    yearlyPrice: 71.88,
    brandColor: '#0064FF',
    justWatchId: 531,
  },
  {
    id: 'peacock',
    name: 'Peacock',
    monthlyPrice: 5.99,
    yearlyPrice: 71.88,
    brandColor: '#000000',
    justWatchId: 387,
  },
  {
    id: 'showtime',
    name: 'Showtime',
    monthlyPrice: 10.99,
    yearlyPrice: 131.88,
    brandColor: '#FF0000',
    justWatchId: 37,
  },
  {
    id: 'starz',
    name: 'Starz',
    monthlyPrice: 9.99,
    yearlyPrice: 119.88,
    brandColor: '#000000',
    justWatchId: 43,
  },
  {
    id: 'discovery-plus',
    name: 'Discovery+',
    monthlyPrice: 4.99,
    yearlyPrice: 59.88,
    brandColor: '#004CFF',
    justWatchId: 524,
  },
  {
    id: 'espn-plus',
    name: 'ESPN+',
    monthlyPrice: 10.99,
    yearlyPrice: 109.99,
    brandColor: '#FF0033',
    justWatchId: 528,
  },
  {
    id: 'funimation',
    name: 'Funimation',
    monthlyPrice: 7.99,
    yearlyPrice: 95.88,
    brandColor: '#410099',
    justWatchId: 283,
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    monthlyPrice: 7.99,
    yearlyPrice: 95.88,
    brandColor: '#FF6500',
    justWatchId: 634,
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    monthlyPrice: 13.99,
    yearlyPrice: 167.88,
    brandColor: '#FF0000',
    justWatchId: 192,
  },
  {
    id: 'fubo',
    name: 'Fubo',
    monthlyPrice: 74.99,
    yearlyPrice: 899.88,
    brandColor: '#00D4FF',
    justWatchId: 257,
  },
  {
    id: 'crave',
    name: 'Crave',
    monthlyPrice: 9.99,
    yearlyPrice: 119.88,
    brandColor: '#E50914',
    justWatchId: 623,
  },
  
  // Free Services
  {
    id: 'tubi',
    name: 'Tubi',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#FA541C',
    justWatchId: 73,
  },
  {
    id: 'pluto-tv',
    name: 'Pluto TV',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#00A8E1',
    justWatchId: 300,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#000000',
    justWatchId: 613,
  },
  {
    id: 'plex',
    name: 'Plex',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#E5A00D',
    justWatchId: 538, // Plex JustWatch ID
  },
  
  // Rental/Purchase Services (show $0 monthly since they're pay-per-use)
  {
    id: 'apple-tv',
    name: 'Apple TV',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#000000',
    justWatchId: 2,
  },
  {
    id: 'google-play',
    name: 'Google Play Movies & TV',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#4285F4',
    justWatchId: 386,
  },
  {
    id: 'microsoft-store',
    name: 'Microsoft Store',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#00BCF2',
    justWatchId: 68,
  },
  {
    id: 'vudu',
    name: 'Vudu',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#3B82F6',
    justWatchId: 7,
  },
  {
    id: 'amazon-video',
    name: 'Amazon Video',
    monthlyPrice: 0,
    yearlyPrice: 0,
    brandColor: '#00A8E1',
    justWatchId: 9,
  },
];

// Helper function to get service by JustWatch ID
export function getServiceByJustWatchId(justWatchId: number): StreamingService | undefined {
  return streamingServices.find(service => service.justWatchId === justWatchId);
}

// Helper function to get service by internal ID
export function getServiceById(id: string): StreamingService | undefined {
  return streamingServices.find(service => service.id === id);
}

// JustWatch provider mapping for API integration
export const justWatchProviderMapping: Map<number, string> = new Map([
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

// Reverse mapping: Internal ID to JustWatch ID
export const internalToJustWatchMapping: Map<string, number> = new Map([
  ['netflix', 8],
  ['amazon-prime', 9],
  ['disney-plus', 337],
  ['hbo-max', 384],
  ['hulu', 15],
  ['apple-tv-plus', 350],
  ['paramount-plus', 531],
  ['peacock', 387],
  ['showtime', 37],
  ['starz', 43],
  ['discovery-plus', 524],
  ['espn-plus', 528],
  ['funimation', 283],
  ['crunchyroll', 634],
  ['youtube-premium', 192],
  ['fubo', 257],
  ['crave', 623],
  ['tubi', 73],
  ['pluto-tv', 300],
  ['tiktok', 613],
  ['apple-tv', 2],
  ['google-play', 386],
  ['microsoft-store', 68],
  ['vudu', 7],
  ['plex', 538],
]);

// Provider categories for optimization logic
export const SUBSCRIPTION_PROVIDERS = [
  'netflix', 'amazon-prime', 'disney-plus', 'hbo-max', 'hulu', 
  'apple-tv-plus', 'paramount-plus', 'peacock', 'showtime', 'starz',
  'discovery-plus', 'espn-plus', 'funimation', 'crunchyroll', 
  'youtube-premium', 'fubo', 'crave'
];

export const FREE_PROVIDERS = ['tubi', 'pluto-tv', 'tiktok', 'plex'];

export const RENTAL_PURCHASE_PROVIDERS = [
  'apple-tv', 'google-play', 'microsoft-store', 'vudu', 'amazon-video'
];

// Price tiers for optimization
export const BUDGET_TIERS = {
  BUDGET: { max: 25, providers: ['discovery-plus', 'paramount-plus', 'peacock', 'apple-tv-plus'] },
  MID_RANGE: { max: 50, providers: ['netflix', 'hulu', 'disney-plus', 'amazon-prime'] },
  PREMIUM: { max: 100, providers: ['hbo-max', 'showtime', 'starz', 'youtube-premium'] },
  COMPREHENSIVE: { max: 200, providers: ['fubo', 'espn-plus', 'crunchyroll', 'funimation'] }
};

export default streamingServices;
