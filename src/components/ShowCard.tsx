'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Show } from '../types';

interface ShowCardProps {
  show: Show;
  isSelected: boolean;
  onSelect?: (show: Show) => void;
  onToggle?: () => void;
  showRemoveButton?: boolean;
  compact?: boolean;
}

export default function ShowCard({ 
  show, 
  isSelected, 
  onSelect, 
  onToggle, 
  showRemoveButton = false, 
  compact = false 
}: ShowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(isSelected);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAddedToCart) {
      setIsAddedToCart(true);
      if (onSelect) {
        onSelect(show);
      } else if (onToggle) {
        onToggle();
      }
    }
  };

  // Generate specific colors for provider badges
  const getProviderColor = (provider: string) => {
    const providerColors: { [key: string]: string } = {
      // Major Subscription Services
      'netflix': 'bg-red-600',
      'amazon-prime': 'bg-sky-400',
      'disney-plus': 'bg-blue-800',
      'hbo-max': 'bg-blue-600',
      'hulu': 'bg-green-600',
      'apple-tv-plus': 'bg-black',
      'paramount-plus': 'bg-sky-400',
      'peacock': 'bg-black',
      'showtime': 'bg-red-600',
      'starz': 'bg-teal-600',
      'discovery-plus': 'bg-orange-400',
      'espn-plus': 'bg-black',
      'funimation': 'bg-purple-600',
      'crunchyroll': 'bg-orange-600',
      'youtube-premium': 'bg-red-600',
      'fubo': 'bg-cyan-500', // Using cyan for fubo since there's no specific "fubo" color
      'crave': 'bg-sky-400',
      
      // Free Services
      'tubi': 'bg-purple-600',
      'pluto-tv': 'bg-yellow-500',
      'tiktok': 'bg-gray-600',
      'plex': 'bg-yellow-600', // Using yellow-600 for gold
      
      // Rental/Purchase Services
      'apple-tv': 'bg-black',
      'google-play': 'bg-yellow-500',
      'microsoft-store': 'bg-blue-600',
      'vudu': 'bg-blue-800',
      'amazon-video': 'bg-sky-400',
    };
    
    return providerColors[provider] || 'bg-gray-600'; // fallback color
  };

  // Use posterPath if available, otherwise fallback to imageUrl
  const posterUrl = show.posterPath 
    ? `https://image.tmdb.org/t/p/w500${show.posterPath}`
    : show.imageUrl;

  // Get rating value (supporting both rating and imdbRating fields)
  const rating = show.rating || show.imdbRating;

  // Get genres (supporting both genre and genres fields)
  const genres = show.genres || show.genre || [];

  // Get providers (supporting both providers and streamingServices fields)
  const providers = show.providers || show.streamingServices || [];

  // Compact mode (for shopping cart)
  if (compact) {
    return (
      <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
        <div className="w-12 h-18 flex-shrink-0">
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={show.title}
              width={48}
              height={72}
              className="rounded object-contain w-full h-full"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{show.title}</h3>
          <p className="text-xs text-gray-400">
            {show.year} • {show.type === 'movie' ? 'Movie' : 'TV Show'}
          </p>
        </div>
        {showRemoveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggle) onToggle();
            }}
            className="text-red-400 hover:text-red-300 text-lg font-bold px-2 cursor-pointer"
            title="Remove from selection"
          >
            ×
          </button>
        )}
      </div>
    );
  }

  // Full card mode with Layout 7 design (providers in top bar, metadata below title)
  return (
    <div 
      className="bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative border border-slate-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'visible' }}
    >
      {/* Top bar with providers and cart button - ALWAYS SHOW for consistency */}
      <div className="bg-slate-700 px-3 py-2 flex items-center justify-between relative rounded-t-lg" style={{ overflow: 'visible' }}>
        <div className="flex items-center gap-1 flex-wrap relative min-h-[24px]">
          {providers && providers.length > 0 ? (
            // Show providers if available
            providers.length <= 2 ? (
              // Show all providers if 2 or fewer (mobile optimization)
              providers.map((provider, index) => (
                <span 
                  key={index}
                  className={`px-1.5 py-0.5 text-xs text-white rounded ${getProviderColor(provider)}`}
                >
                  {provider}
                </span>
              ))
            ) : (
              // Show first 2 providers + expandable button if more than 2 (mobile optimization)
              <>
                {providers.slice(0, 2).map((provider, index) => (
                  <span 
                    key={index}
                    className={`px-1.5 py-0.5 text-xs text-white rounded ${getProviderColor(provider)}`}
                  >
                    {provider}
                  </span>
                ))}
                <div className="relative group">
                  <button className="px-1.5 py-0.5 text-xs text-white rounded bg-gray-600 hover:bg-gray-500 cursor-pointer">
                    +{providers.length - 2}
                  </button>
                  {/* Hover dropdown with all providers - mobile optimized */}
                  <div className="absolute top-full left-0 mt-1 p-2 bg-slate-800 border border-slate-600 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-max max-w-[280px] z-[100]">
                    <div className="text-xs text-gray-300 mb-1 font-medium">All providers:</div>
                    <div className="flex flex-wrap gap-1">
                      {providers.map((provider, index) => (
                        <span 
                          key={index}
                          className={`px-1.5 py-0.5 text-xs text-white rounded ${getProviderColor(provider)}`}
                        >
                          {provider}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            // Show placeholder when no providers available
            <span className="text-xs text-gray-400 italic">Checking availability...</span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-7 h-7 rounded flex items-center justify-center transition-all ml-2 cursor-pointer flex-shrink-0 ${
            isAddedToCart 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title={isAddedToCart ? 'Added to cart' : 'Add to cart'}
        >
          {isAddedToCart ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L21 21H9l-1.5-1.5" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Main content area - mobile optimized */}
      <div className="flex p-3 sm:p-4 rounded-b-lg overflow-hidden">
        {/* Thumbnail on the left - smaller on mobile */}
        <div className="w-16 h-24 sm:w-20 sm:h-30 md:w-24 md:h-36 flex-shrink-0 mr-3">
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={show.title}
              width={96}
              height={144}
              className="rounded object-contain w-full h-full border border-slate-600"
            />
          )}
        </div>
        
        {/* Content area - mobile optimized */}
        <div className="flex-1 text-white space-y-2 sm:space-y-3 min-w-0">
          {/* Title - responsive font size */}
          <h3 className="text-base sm:text-lg font-bold leading-tight">{show.title}</h3>
          
          {/* Year, Rating, and Type Badge row - mobile optimized */}
          <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
            <span className="whitespace-nowrap">{show.year}</span>
            {rating && (
              <span className="text-yellow-400 whitespace-nowrap">★ {typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
            )}
            <span className={`px-1.5 py-0.5 text-xs rounded whitespace-nowrap ${
              show.type === 'movie' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {show.type === 'movie' ? (
                <>🎬 Movie</>
              ) : (
                <>📺 TV</>
              )}
            </span>
          </div>
          
          {/* Genre and Content Rating badges - mobile optimized */}
          <div className="flex flex-wrap gap-1">
            {/* Content Rating badge */}
            {show.contentRating && (
              <span className="px-2 py-1 text-xs font-medium bg-orange-600 text-white rounded">
                {show.contentRating}
              </span>
            )}
            
            {/* Genre badges */}
            {genres && genres.length > 0 && (
              <>
                {genres.slice(0, 3).map((genre, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-600 text-white rounded"
                  >
                    {genre}
                  </span>
                ))}
                {genres.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-500 text-white rounded">
                    +{genres.length - 3}
                  </span>
                )}
              </>
            )}
          </div>
          
          {/* Synopsis */}
          {show.description && (
            <p className={`text-sm text-gray-300 leading-relaxed ${
              isHovered ? '' : 'line-clamp-3'
            }`}>
              {show.description.length > 150 ? `${show.description.substring(0, 150)}...` : show.description}
            </p>
          )}
          
          {!isHovered && show.description && show.description.length > 150 && (
            <div className="text-xs text-gray-400 italic">
              hover to read more...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
