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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed

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
    handleShowToggle(String(show.id));
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
      selectedShows: selectedShowsData,
      budget: maxBudget || 100,
      budgetType: subscriptionType
    };

    const recs = calculateRecommendations(userPrefs, streamingServices, allShows);
    setRecommendations(recs);
    setShowRecommendations(true);
  };

  const selectedShowsData = allShows.filter(show => selectedShows.includes(String(show.id)));
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
          <div className="relative">
            {/* Main Content - always full width on mobile, responsive on desktop */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:mr-0' : 'lg:mr-80'}`}>
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

            {/* Mobile Shopping Cart Button - Fixed Bottom Right */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                selectedShows.length > 0 ? 'scale-100' : 'scale-90 opacity-75'
              }`}
              title={sidebarCollapsed ? 'Open shopping cart' : 'Close shopping cart'}
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L21 21H9l-1.5-1.5" />
                </svg>
                {selectedShows.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedShows.length}
                  </span>
                )}
              </div>
            </button>

            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden lg:block fixed top-1/2 transform -translate-y-1/2 z-50 bg-slate-700 hover:bg-slate-600 text-white p-3 shadow-lg transition-all duration-300 ${
                sidebarCollapsed 
                  ? 'right-4 rounded-full' 
                  : 'right-80 rounded-l-lg rounded-r-none'
              }`}
              title={sidebarCollapsed ? 'Expand shopping cart' : 'Collapse shopping cart'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Minimized Desktop Sidebar Indicator */}
            {sidebarCollapsed && (
              <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 mt-16 z-40 bg-slate-800 border border-slate-600 rounded-lg p-2 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl mb-1">🛒</div>
                  <div className="text-xs text-white font-medium">
                    {selectedShows.length}
                  </div>
                  <div className="text-xs text-gray-400">
                    {selectedShows.length === 1 ? 'show' : 'shows'}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Overlay Background */}
            {!sidebarCollapsed && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setSidebarCollapsed(true)}
              />
            )}

            {/* Shopping Cart Sidebar */}
            <div className={`
              fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-slate-700 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
              lg:w-80 lg:max-w-none
              ${sidebarCollapsed ? 'translate-x-full lg:translate-x-full' : 'translate-x-0 lg:translate-x-0'}
            `}>
              <div className="h-full overflow-y-auto">
                <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Your Cart
                  </h2>
                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="lg:hidden text-gray-400 hover:text-white p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {selectedShows.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="hidden lg:block btn btn-secondary px-3 py-1 text-sm"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Selected Shows Cart */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-white">
                      Selected Shows ({selectedShows.length})
                    </h3>
                  </div>
                  
                  {selectedShowsData.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedShowsData.map((show) => (
                        <ShowCard
                          key={show.id}
                          show={show}
                          isSelected={true}
                          onToggle={() => handleShowToggle(String(show.id))}
                          showRemoveButton={true}
                          compact={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-800 p-6 text-center rounded-lg border border-slate-700">
                      <div className="text-3xl mb-3">🛒</div>
                      <p className="text-gray-300 font-medium text-sm mb-1">
                        No shows selected yet
                      </p>
                      <p className="text-gray-400 text-xs">
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
                      <div className="font-medium text-white text-sm">
                        💰 Maximize Value
                      </div>
                      <div className="text-xs text-gray-400">
                        Prioritize fewer services with maximum show coverage
                      </div>
                    </div>
                  </label>
                </div>

                {/* Budget */}
                <div className="mb-4">
                  <label className="block font-medium text-white mb-2 text-sm">
                    Monthly Budget (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={maxBudget || ''}
                    onChange={(e) => setMaxBudget(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Subscription Type */}
                <div className="mb-6">
                  <label className="block font-medium text-white mb-2 text-sm">
                    Subscription Preference
                  </label>
                  <select
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value as 'monthly' | 'yearly')}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly (Better Value)</option>
                  </select>
                </div>

                {/* Get Recommendations Button */}
                <button
                  onClick={handleGetRecommendations}
                  disabled={selectedShows.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded text-sm font-medium transition-colors"
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded text-sm font-medium transition-colors"
                  >
                    Clear All Data
                  </button>
                </div>
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
                      optimizeForValue && rec.services.length <= 2 && rec.uncoveredShows.length === 0
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
                          {optimizeForValue && rec.services.length <= 2 && rec.uncoveredShows.length === 0 && (
                            <span className="badge badge-success px-3 py-1">
                              💰 Best Value
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-primary">
                            ${rec.cost}/month
                          </span>
                          <span className="badge badge-secondary px-3 py-1">
                            Coverage: {Math.round(rec.coverage * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-muted p-4 mb-4">
                      <p className="text-foreground font-medium">
                        This combination covers {rec.coveredShows.length} of your selected shows 
                        {rec.uncoveredShows.length > 0 && ` (${rec.uncoveredShows.length} shows not available)`}.
                        Efficiency score: {Math.round(rec.efficiency * 100)}/100
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

                      {rec.uncoveredShows.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            Uncovered Shows ({rec.uncoveredShows.length})
                          </h4>
                          <div className="space-y-2">
                            {rec.uncoveredShows.map((show: Show) => (
                              <div key={String(show.id)} className="badge badge-destructive px-3 py-2 w-full text-left">
                                ✗ {show.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="card bg-info/10 border-info/20 p-4 mt-4">
                      <p className="text-info font-semibold">
                        💡 Covers {rec.coveredShows.length} of your selected shows with {rec.efficiency.toFixed(2)} efficiency rating
                      </p>
                    </div>
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
