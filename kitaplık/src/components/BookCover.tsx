import React from 'react';
import { BookOpen } from 'lucide-react';
import { BookGenre } from '../types';

interface BookCoverProps {
  title: string;
  author: string;
  genre: BookGenre | string;
  color?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  genre,
  color = 'from-amber-950 via-stone-900 to-amber-950',
  imageUrl,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-24 text-[9px]',
    md: 'w-24 h-36 text-[11px]',
    lg: 'w-36 h-52 text-xs',
  };

  if (imageUrl) {
    return (
      <div
        className={`relative shrink-0 rounded shadow-md overflow-hidden bg-stone-900 ${sizeClasses[size]} ${className}`}
      >
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded" />
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 rounded shadow-md overflow-hidden bg-gradient-to-br ${color} flex flex-col justify-between p-2 text-stone-200 border-r-2 border-stone-800 ${sizeClasses[size]} ${className}`}
    >
      {/* Book spine line shadow effect */}
      <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-black/30 pointer-events-none" />
      <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10 pointer-events-none" />

      {/* Top genre accent */}
      <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-amber-200/80 font-mono">
        <span className="truncate max-w-[80%]">{genre}</span>
        <BookOpen className="w-2.5 h-2.5 shrink-0 opacity-70" />
      </div>

      {/* Center title */}
      <div className="my-auto py-1 text-center">
        <h4 className="font-serif font-bold text-stone-100 line-clamp-2 leading-tight">
          {title}
        </h4>
        <div className="w-4 h-px bg-amber-400/50 mx-auto my-1" />
      </div>

      {/* Bottom author */}
      <div className="text-center text-[9px] text-stone-300 font-medium truncate">
        {author}
      </div>

      {/* Subtle paper reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
    </div>
  );
};
