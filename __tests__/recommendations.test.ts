import { calculateRecommendations } from '../src/utils/recommendations';
import { streamingServices } from '../src/data/streamingServices';
import { shows } from '../src/data/shows';
import { UserPreferences } from '../src/types';

describe('Recommendation Algorithm', () => {
  const sampleUserPrefs: UserPreferences = {
    selectedShows: ['stranger-things', 'the-crown', 'mandalorian'], // Use actual show IDs
    maxBudget: 50,
    preferredGenres: [],
    subscriptionType: 'monthly',
    optimizeForValue: true,
  };

  test('should return recommendations when shows are selected', () => {
    const recommendations = calculateRecommendations(
      sampleUserPrefs,
      streamingServices,
      shows
    );

    expect(recommendations).toBeDefined();
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);
  });

  test('should respect budget constraints', () => {
    const lowBudgetPrefs: UserPreferences = {
      ...sampleUserPrefs,
      maxBudget: 20,
    };

    const recommendations = calculateRecommendations(
      lowBudgetPrefs,
      streamingServices,
      shows
    );

    recommendations.forEach(rec => {
      expect(rec.totalMonthlyCost).toBeLessThanOrEqual(20);
    });
  });

  test('should handle empty show selection', () => {
    const emptyPrefs: UserPreferences = {
      ...sampleUserPrefs,
      selectedShows: [],
    };

    const recommendations = calculateRecommendations(
      emptyPrefs,
      streamingServices,
      shows
    );

    expect(recommendations).toEqual([]);
  });

  test('should optimize for value when enabled', () => {
    const valuePrefs: UserPreferences = {
      ...sampleUserPrefs,
      optimizeForValue: true,
    };

    const recommendations = calculateRecommendations(
      valuePrefs,
      streamingServices,
      shows
    );

    // Check that recommendations are sorted by score (highest first)
    for (let i = 0; i < recommendations.length - 1; i++) {
      expect(recommendations[i].score).toBeGreaterThanOrEqual(
        recommendations[i + 1].score
      );
    }
  });

  test('should calculate costs correctly', () => {
    const recommendations = calculateRecommendations(
      sampleUserPrefs,
      streamingServices,
      shows
    );

    recommendations.forEach(rec => {
      expect(rec.totalMonthlyCost).toBeGreaterThan(0);
      expect(rec.score).toBeGreaterThan(0);
      expect(rec.score).toBeLessThanOrEqual(100);
    });
  });

  test('should handle yearly subscription preference', () => {
    const yearlyPrefs: UserPreferences = {
      ...sampleUserPrefs,
      subscriptionType: 'yearly',
    };

    const recommendations = calculateRecommendations(
      yearlyPrefs,
      streamingServices,
      shows
    );

    recommendations.forEach(rec => {
      if (rec.totalYearlyCost) {
        expect(rec.totalYearlyCost).toBeGreaterThan(0);
      }
    });
  });
});
