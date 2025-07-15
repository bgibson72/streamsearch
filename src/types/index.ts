export interface Show {
  id: number | string;
  title: string;
  description: string;
  genre: string[];
  genres?: string[];
  year: number;
  rating?: number;
  imdbRating?: number;
  contentRating?: string; // R, PG, PG-13, NR, TV-MA, etc.
  providers?: string[];
  streamingServices: string[];
  imageUrl?: string;
  posterPath?: string;
  backdropPath?: string;
  type: 'movie' | 'tv' | 'series';
  popularity: number;
}

export interface StreamingService {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  brandColor: string;
  justWatchId?: number;
}

export interface UserPreferences {
  budget: number;
  budgetType: 'monthly' | 'yearly';
  selectedShows: Show[];
}

export interface Recommendation {
  services: StreamingService[];
  coverage: number;
  cost: number;
  efficiency: number;
  coveredShows: Show[];
  uncoveredShows: Show[];
}
