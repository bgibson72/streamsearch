'use client';

import { Show } from '../types';
import { streamingServices } from '../data/streamingServices';
import Image from 'next/image';
import { useState } from 'react';

interface ShowCardProps {
  show: Show;
  isSelected?: boolean;
  onToggle?: (showId: string) => void;
  showRemoveButton?: boolean;
  compact?: boolean;
}

export default function ShowCard({ 
  show, 
  isSelected = false, 
  onToggle, 
  showRemoveButton = false,
  compact = false 
}: ShowCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const PlaceholderImage = () => (
    <div className="w-full h-full bg-muted flex items-center justify-center border border-border rounded">
      <div className="text-center text-muted-foreground p-2">
        <div className="text-2xl mb-1">
          {show.type === 'movie' ? '🎬' : '📺'}
        </div>
        <div className="text-xs font-medium">
          {show.type === 'movie' ? 'Movie' : 'TV Show'}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`card p-3 ${compact ? 'p-2' : ''} ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className={`flex-shrink-0 ${compact ? 'w-12 h-16' : 'w-16 h-24'} relative`}>
          {show.imageUrl && !imageError ? (
            <Image
              src={show.imageUrl}
              alt={`${show.title} poster`}
              fill
              className="object-cover rounded border border-border"
              onError={handleImageError}
              sizes={compact ? "48px" : "64px"}
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-foreground ${compact ? 'text-sm' : 'text-base'} truncate`}>
                {show.title}
              </h3>
              <div className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'} mb-2`}>
                {show.year} • {show.genre.slice(0, 2).join(', ')}
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-2">
                <span className={`badge text-xs ${
                  show.type === 'movie' 
                    ? 'badge-primary'
                    : 'badge-secondary'
                }`}>
                  {show.type === 'movie' ? '🎬 Movie' : '📺 TV'}
                </span>
                
                {show.imdbRating && (
                  <span className="badge badge-accent text-xs">
                    ⭐ {show.imdbRating.toFixed(1)}
                  </span>
                )}
                
                {/* Streaming Service Logos */}
                {show.streamingServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    {show.streamingServices.slice(0, 4).map(serviceId => {
                      const service = streamingServices.find(s => s.id === serviceId);
                      return service?.logo ? (
                        <div 
                          key={serviceId}
                          className="w-8 h-8 flex-shrink-0 relative"
                          title={service.name}
                        >
                          <Image
                            src={service.logo}
                            alt={`${service.name} logo`}
                            fill
                            className="object-contain rounded"
                            sizes="32px"
                          />
                        </div>
                      ) : (
                        <span key={serviceId} className="badge badge-success text-xs">
                          {serviceId}
                        </span>
                      );
                    })}
                    {show.streamingServices.length > 4 && (
                      <span className="badge badge-muted text-xs">
                        +{show.streamingServices.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description (non-compact only) */}
              {!compact && (
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {show.description}
                </p>
              )}
            </div>

            {/* Action Button */}
            {onToggle && (
              <button
                onClick={() => onToggle(show.id)}
                className={`ml-2 px-2 py-1 text-sm flex-shrink-0 ${
                  showRemoveButton
                    ? 'btn btn-destructive'
                    : isSelected
                    ? 'btn btn-secondary'
                    : 'btn btn-primary'
                }`}
                title={
                  showRemoveButton
                    ? 'Remove from cart'
                    : isSelected
                    ? 'Remove from selection'
                    : 'Add to cart'
                }
              >
                {showRemoveButton ? '×' : isSelected ? '✓' : '+'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
