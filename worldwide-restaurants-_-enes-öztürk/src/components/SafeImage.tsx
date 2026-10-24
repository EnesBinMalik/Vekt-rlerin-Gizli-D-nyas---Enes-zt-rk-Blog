import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  categoryLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  categoryLabel
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#181c24] ${aspectRatioClass} ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#1c222d] animate-pulse" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a202c] via-[#12161f] to-[#0c0e14] text-stone-400">
          <div className="p-3 mb-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-stone-300 text-center line-clamp-1">{alt}</span>
          {categoryLabel && (
            <span className="mt-1 text-[10px] text-amber-500/80 uppercase tracking-widest">{categoryLabel}</span>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};
