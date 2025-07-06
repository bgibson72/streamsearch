import { StreamingService } from '../types';

/**
 * Major streaming services available in North America
 * Prices are in USD and current as of 2025
 */
export const streamingServices: StreamingService[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    monthlyPrice: 15.49,
    yearlyPrice: 185.88,
    description: 'Global streaming giant with vast original content library',
    logo: '/logos/netflix.png',
    availability: ['US', 'Canada', 'Mexico'],
    contentLibrarySize: 15000,
    features: ['4K streaming', 'Multiple profiles', 'Downloads', 'Original content']
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    monthlyPrice: 13.99,
    yearlyPrice: 139.99,
    description: 'Disney, Marvel, Star Wars, Pixar, and National Geographic content',
    logo: '/logos/disney.png',
    availability: ['US', 'Canada'],
    contentLibrarySize: 500,
    features: ['4K streaming', 'Family-friendly', 'Downloads', 'IMAX Enhanced']
  },
  {
    id: 'hbo-max',
    name: 'Max (HBO Max)',
    monthlyPrice: 15.99,
    yearlyPrice: 149.99,
    description: 'Premium HBO content plus Warner Bros library',
    logo: '/logos/hbo.png',
    availability: ['US', 'Canada'],
    contentLibrarySize: 2800,
    features: ['4K streaming', 'Same-day movie releases', 'HBO originals', 'Ad-free']
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    monthlyPrice: 8.99,
    yearlyPrice: 99.00,
    description: 'Amazon\'s streaming service with Prime benefits',
    logo: '/logos/prime.png',
    availability: ['US', 'Canada', 'Mexico'],
    contentLibrarySize: 12000,
    features: ['Prime shipping', '4K streaming', 'Original content', 'Live sports']
  },
  {
    id: 'hulu',
    name: 'Hulu',
    monthlyPrice: 7.99,
    yearlyPrice: 79.99,
    description: 'Next-day TV episodes and original programming',
    logo: '/logos/hulu.png',
    availability: ['US'],
    contentLibrarySize: 3000,
    features: ['Next-day TV', 'Live TV option', 'Original content', 'Disney bundle']
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    monthlyPrice: 6.99,
    yearlyPrice: 69.99,
    description: 'Apple\'s premium original content streaming service',
    logo: '/logos/apple.png',
    availability: ['US', 'Canada', 'Mexico'],
    contentLibrarySize: 200,
    features: ['4K streaming', 'Premium originals', 'Ad-free', 'Spatial audio']
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    monthlyPrice: 5.99,
    yearlyPrice: 59.99,
    description: 'CBS, Paramount, and Nickelodeon content',
    logo: '/logos/paramount.png',
    availability: ['US', 'Canada'],
    contentLibrarySize: 2500,
    features: ['Live TV', 'Sports', 'News', 'Nickelodeon content']
  },
  {
    id: 'peacock',
    name: 'Peacock',
    monthlyPrice: 5.99,
    yearlyPrice: 59.99,
    description: 'NBCUniversal\'s streaming platform',
    logo: '/logos/peacock.png',
    availability: ['US'],
    contentLibrarySize: 1800,
    features: ['NBC content', 'Live sports', 'News', 'Original series']
  },
  {
    id: 'crave',
    name: 'Crave',
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    description: 'Canadian streaming service with HBO content',
    logo: '/logos/crave.png',
    availability: ['Canada'],
    contentLibrarySize: 1500,
    features: ['HBO content', 'Canadian originals', 'French content', 'Live TV']
  }
];