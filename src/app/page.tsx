'use client';

import { useState, useEffect } from 'react';
import { streamingServices } from '../data/streamingServices';
import { shows } from '../data/shows';
import { calculateRecommendations } from '../utils/recommendations';
import { areApisConfigured } from '../utils/api';
import { UserPreferences, Recommendation, Show } from '../types';
import ApiContentBrowser from '../components/ApiContentBrowser';
import ErrorBoundary from '../components/ErrorBoundary';
import ShowCard from '../components/ShowCard';
import FeedbackForm from '../components/FeedbackForm';

const STORAGE_KEYS = {
  SELECTED_SHOWS: 'streamsearch_selected_shows',
  ALL_SHOWS: 'streamsearch_all_shows',
  MAX_BUDGET: 'streamsearch_max_budget',
  SUBSCRIPTION_TYPE: 'streamsearch_subscription_type',
  OPTIMIZE_FOR_VALUE: 'streamsearch_optimize_for_value',
  LAST_UPDATED: 'streamsearch_last_updated'
};

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATED, Date.now().toString());
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = (key: string, defaultValue: unknown = null): unknown => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

const isStorageValid = () => {
  try {
    const lastUpdated = localStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
    if (!lastUpdated) return false;
    
    const timeDiff = Date.now() - parseInt(lastUpdated);
    return timeDiff < CACHE_DURATION;
  } catch {
    return false;
  }
};

export default function Home() {
  const [selectedShows, setSelectedShows] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'yearly'>('monthly');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [allShows, setAllShows] = useState<Show[]>(shows);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'movie' | 'tv'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [optimizeForValue, setOptimizeForValue] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isStorageValid()) {
      const savedSelectedShows = loadFromStorage(STORAGE_KEYS.SELECTED_SHOWS, []) as string[];
      const savedAllShows = loadFromStorage(STORAGE_KEYS.ALL_SHOWS, shows) as Show[];
      const savedMaxBudget = loadFromStorage(STORAGE_KEYS.MAX_BUDGET, undefined) as number | undefined;
      const savedSubscriptionType = loadFromStorage(STORAGE_KEYS.SUBSCRIPTION_TYPE, 'monthly') as 'monthly' | 'yearly';
      const savedOptimizeForValue = loadFromStorage(STORAGE_KEYS.OPTIMIZE_FOR_VALUE, true) as boolean;

      setSelectedShows(savedSelectedShows);
      setAllShows(savedAllShows);
      setMaxBudget(savedMaxBudget);
      setSubscriptionType(savedSubscriptionType);
      setOptimizeForValue(savedOptimizeForValue);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.SELECTED_SHOWS, selectedShows);
    }
  }, [selectedShows, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.ALL_SHOWS, allShows);
    }
  }, [allShows, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.MAX_BUDGET, maxBudget);
    }
  }, [maxBudget, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.SUBSCRIPTION_TYPE, subscriptionType);
    }
  }, [subscriptionType, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.OPTIMIZE_FOR_VALUE, optimizeForValue);
    }
  }, [optimizeForValue, isLoaded]);

  const handleShowToggle = (showId: string) => {
    setSelectedShows(prev => 
      prev.includes(showId) 
        ? prev.filter(id => id !== showId)
        : [...prev, showId]
    );
  };

  const handleApiShowSelect = (show: Show) => {
    // Add to our shows list if not already there
    if (!allShows.find(s => s.id === show.id)) {
      setAllShows(prev => [...prev, show]);
    }
    handleShowToggle(show.id);
  };

  const clearCart = () => {
    setSelectedShows([]);
    // Also clear from localStorage
    if (typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.SELECTED_SHOWS, []);
    }
  };

  const handleGetRecommendations = () => {
    const userPrefs: UserPreferences = {
      selectedShows,
      maxBudget,
      preferredGenres: [],
      subscriptionType,
      optimizeForValue // Pass the value optimization preference
    };

    const recs = calculateRecommendations(userPrefs, streamingServices, allShows);
    setRecommendations(recs);
    setShowRecommendations(true);
  };

  const selectedShowsData = allShows.filter(show => selectedShows.includes(show.id));
  const isApiConfigured = areApisConfigured();

  // Clear all persisted data
  const clearAllData = () => {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      // Reset all state to defaults
      setSelectedShows([]);
      setAllShows(shows);
      setMaxBudget(undefined);
      setSubscriptionType('monthly');
      setOptimizeForValue(true);
      setRecommendations([]);
      setShowRecommendations(false);
    }
  };

  const handleClearAllData = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all data?\n\n' +
      'This will remove:\n' +
      '• All selected shows from your cart\n' +
      '• Your budget and subscription preferences\n' +
      '• Any shows added from the API browser\n' +
      '• All saved recommendations\n\n' +
      'This action cannot be undone.'
    );
    
    if (confirmed) {
      clearAllData();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Stream<span className="text-primary">Search</span>
          </h1>
          <div className="card p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Find the perfect streaming service combination for your shows and save money by avoiding redundant subscriptions.
            </p>
          </div>
        </div>

        {!showRecommendations ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Show Selection */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Browse & Select Your Shows
                </h2>
                
                {isApiConfigured ? (
                  /* API Content Browser */
                  <ErrorBoundary>
                    <ApiContentBrowser 
                      onShowSelect={handleApiShowSelect}
                      selectedShows={selectedShows}
                      selectedCategory={selectedCategory}
                      selectedGenre={selectedGenre}
                      onCategoryChange={setSelectedCategory}
                      onGenreChange={setSelectedGenre}
                    />
                  </ErrorBoundary>
                ) : (
                  /* API Configuration Required */
                  <div className="card border-warning/20 bg-warning/5 p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      API Configuration Required
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      To browse real-time content data, you need to configure your TMDB API key.
                    </p>
                    <div className="card bg-muted p-4">
                      <h4 className="font-semibold mb-3 text-foreground">Quick Setup:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                        <li>Run: <code className="bg-background text-foreground px-2 py-1 rounded font-mono text-xs">npm run setup</code></li>
                        <li>Get a free TMDB API key at <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">themoviedb.org</a></li>
                        <li>Follow the setup instructions</li>
                        <li>Restart the development server</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preferences Panel */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Cart
                  </h2>
                  {selectedShows.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="btn btn-secondary px-3 py-1 text-sm"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Selected Shows Cart */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-foreground">
                      Selected Shows ({selectedShows.length})
                    </h3>
                  </div>
                  
                  {selectedShowsData.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedShowsData.map((show) => (
                        <ShowCard
                          key={show.id}
                          show={show}
                          onToggle={handleShowToggle}
                          showRemoveButton={true}
                          compact={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="card bg-muted p-6 text-center">
                      <div className="text-3xl mb-3">🛒</div>
                      <p className="text-muted-foreground font-medium text-sm mb-1">
                        No shows selected yet
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Browse and click shows to add them
                      </p>
                    </div>
                  )}
                </div>

                {/* Optimization Preference */}
                <div className="mb-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={optimizeForValue}
                      onChange={(e) => setOptimizeForValue(e.target.checked)}
                      className="checkbox-custom"
                    />
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        💰 Maximize Value
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Prioritize fewer services with maximum show coverage
                      </div>
                    </div>
                  </label>
                </div>

                {/* Budget */}
                <div className="mb-4">
                  <label className="block font-medium text-foreground mb-2 text-sm">
                    Monthly Budget (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={maxBudget || ''}
                    onChange={(e) => setMaxBudget(e.target.value ? Number(e.target.value) : undefined)}
                    className="input text-sm"
                  />
                </div>

                {/* Subscription Type */}
                <div className="mb-6">
                  <label className="block font-medium text-foreground mb-2 text-sm">
                    Subscription Preference
                  </label>
                  <select
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value as 'monthly' | 'yearly')}
                    className="input text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly (Better Value)</option>
                  </select>
                </div>

                {/* Get Recommendations Button */}
                <button
                  onClick={handleGetRecommendations}
                  disabled={selectedShows.length === 0}
                  className="w-full btn btn-primary py-3 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedShows.length === 0 
                    ? 'Add Shows to Get Started' 
                    : `Get Recommendations (${selectedShows.length} show${selectedShows.length !== 1 ? 's' : ''})`
                  }
                </button>

                {/* Clear All Data Button */}
                <div className="mt-4">
                  <button
                    onClick={handleClearAllData}
                    className="w-full btn btn-destructive py-3 px-4 text-sm"
                  >
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Recommendations View */
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Your Recommendations
                </h2>
                {optimizeForValue && (
                  <div className="badge badge-success mt-3 px-3 py-1">
                    💰 Optimized for maximum value (fewer services, more coverage)
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClearAllData}
                  className="btn btn-destructive px-4 py-2 text-sm"
                  title="Clear all saved data and preferences"
                >
                  Clear All Data
                </button>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="btn btn-secondary px-6 py-2"
                >
                  Back to Selection
                </button>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`card p-6 ${
                      optimizeForValue && rec.services.length <= 2 && rec.missedShows.length === 0
                        ? 'ring-2 ring-success bg-success/5'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-foreground">
                            {rec.services.map(s => s.name).join(' + ')}
                          </h3>
                          {optimizeForValue && rec.services.length <= 2 && rec.missedShows.length === 0 && (
                            <span className="badge badge-success px-3 py-1">
                              💰 Best Value
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-primary">
                            ${rec.totalMonthlyCost}/month
                          </span>
                          {rec.totalYearlyCost && (
                            <span className="text-lg text-muted-foreground font-medium">
                              (${rec.totalYearlyCost}/year)
                            </span>
                          )}
                          <span className="badge badge-secondary px-3 py-1">
                            Score: {rec.score}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-muted p-4 mb-4">
                      <p className="text-foreground font-medium">
                        {rec.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Covered Shows ({rec.coveredShows.length})
                        </h4>
                        <div className="space-y-2">
                          {rec.coveredShows.map((show) => (
                            <div key={show.id} className="badge badge-success px-3 py-2 w-full text-left">
                              ✓ {show.title}
                            </div>
                          ))}
                        </div>
                      </div>

                      {rec.missedShows.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            Missed Shows ({rec.missedShows.length})
                          </h4>
                          <div className="space-y-2">
                            {rec.missedShows.map((show) => (
                              <div key={show.id} className="badge badge-destructive px-3 py-2 w-full text-left">
                                ✗ {show.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {rec.savings > 0 && (
                      <div className="card bg-success/10 border-success/20 p-4 mt-4">
                        <p className="text-success font-semibold">
                          💰 Potential savings: ${Math.round(rec.savings * 100) / 100}/month
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-destructive/5 border-destructive/20 p-8 text-center">
                <p className="text-lg font-medium text-foreground">
                  No recommendations found. Try adjusting your budget or show selection.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Always Free Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <span className="text-green-600">💚</span>
              <span>Always Free, Always Private</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              StreamSearch will always be completely free because we believe it would be hypocritical 
              to charge for a service designed to save you money. We never collect personal data, 
              require registration, or track your usage. Your privacy and savings are our priority.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>No Registration</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>No Data Collection</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>No Hidden Fees</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-600">
              Built with ❤️ for cord-cutters everywhere • Save money, watch more, stress less
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-40 flex items-center gap-2"
        title="Send Feedback"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Feedback Form Modal */}
      <FeedbackForm 
        isOpen={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
      />
    </div>
  );
}
