import React, { useState } from 'react';
import { Shield, Zap, Sparkles, BookOpen, Flame, Compass } from 'lucide-react';

interface MarvelImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: 'character' | 'comic';
  categoryKey?: string;
}

export const MarvelImage: React.FC<MarvelImageProps> = ({
  src,
  alt,
  className = '',
  type = 'character',
  categoryKey = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback visual themes based on hero or comic
  const getFallbackTheme = () => {
    const key = (categoryKey || alt).toLowerCase();
    if (key.includes('spider')) {
      return {
        bg: 'from-red-950 via-neutral-900 to-blue-950',
        accent: 'text-red-500',
        icon: Zap,
        label: 'SPIDER-VERSE',
      };
    }
    if (key.includes('iron') || key.includes('stark')) {
      return {
        bg: 'from-amber-950 via-neutral-900 to-red-950',
        accent: 'text-amber-400',
        icon: Sparkles,
        label: 'STARK TECH',
      };
    }
    if (key.includes('captain') || key.includes('america') || key.includes('rogers')) {
      return {
        bg: 'from-blue-950 via-neutral-900 to-red-950',
        accent: 'text-blue-400',
        icon: Shield,
        label: 'FIRST AVENGER',
      };
    }
    if (key.includes('thor') || key.includes('god')) {
      return {
        bg: 'from-cyan-950 via-neutral-900 to-blue-950',
        accent: 'text-cyan-400',
        icon: Zap,
        label: 'ASGARD MIGHT',
      };
    }
    if (key.includes('thanos') || key.includes('infinity')) {
      return {
        bg: 'from-purple-950 via-neutral-900 to-amber-950',
        accent: 'text-amber-400',
        icon: Flame,
        label: 'INFINITY GAUNTLET',
      };
    }
    if (key.includes('scarlet') || key.includes('wanda')) {
      return {
        bg: 'from-red-950 via-neutral-900 to-stone-900',
        accent: 'text-red-400',
        icon: Flame,
        label: 'CHAOS MAGIC',
      };
    }
    if (key.includes('x-men') || key.includes('wolverine') || key.includes('magneto')) {
      return {
        bg: 'from-amber-950 via-neutral-900 to-yellow-950',
        accent: 'text-yellow-400',
        icon: Compass,
        label: 'MUTANT ARCHIVE',
      };
    }
    return {
      bg: 'from-red-950 via-neutral-900 to-neutral-950',
      accent: 'text-red-500',
      icon: type === 'comic' ? BookOpen : Shield,
      label: type === 'comic' ? 'MARVEL COMIC' : 'MARVEL ARCHIVE',
    };
  };

  const theme = getFallbackTheme();
  const IconComponent = theme.icon;

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-br ${theme.bg} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className={`p-4 rounded-full bg-black/40 border border-white/10 ${theme.accent} mb-3 shadow-inner`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">
          {theme.label}
        </span>
        <h4 className="font-comic text-base tracking-wide text-neutral-100 max-w-[85%] line-clamp-2">
          {alt}
        </h4>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {!isLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${theme.bg} animate-pulse`}>
          <IconComponent className={`w-6 h-6 ${theme.accent} opacity-40`} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
