/**
 * Core types for the StreamSearch application
 */

export interface StreamingService {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  description: string;
  logo: string;
  availability: string[];
  contentLibrarySize: number;
  features: string[];
}

export interface Show {
  id: string;
  title: string;
  genre: string[];
  year: number;
  type: 'movie' | 'series';
  streamingServices: string[]; // Array of service IDs
  popularity: number; // 1-10 scale
  imdbRating?: number;
  description: string;
}

export interface UserPreferences {
  selectedShows: string[]; // Array of show IDs
  maxBudget?: number;
  preferredGenres: string[];
  subscriptionType: 'monthly' | 'yearly';
  optimizeForValue?: boolean; // Prioritize fewer services with maximum coverage
}

export interface Recommendation {
  services: StreamingService[];
  totalMonthlyCost: number;
  totalYearlyCost?: number;
  coveredShows: Show[];
  missedShows: Show[];
  savings: number;
  reasoning: string;
  score: number; // 1-100 optimization score
}

export interface SearchFilters {
  genre?: string;
  year?: number;
  type?: 'movie' | 'series';
  service?: string;
}