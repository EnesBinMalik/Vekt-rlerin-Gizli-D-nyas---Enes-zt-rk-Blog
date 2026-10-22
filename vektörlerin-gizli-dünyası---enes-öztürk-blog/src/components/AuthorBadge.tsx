import React from 'react';
import { Calendar, Clock, Sparkles, Award, Share2 } from 'lucide-react';
import { Author } from '../types/blog';

interface AuthorBadgeProps {
  author: Author;
  publishDate: string;
  readTime: string;
  onShareClick: () => void;
}

export const AuthorBadge: React.FC<AuthorBadgeProps> = ({
  author,
  publishDate,
  readTime,
  onShareClick,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-stone-200/80 my-8">
      {/* Author Profile */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="h-13 w-13 rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 p-0.5 shadow-md flex items-center justify-center text-white font-bold text-lg font-reading">
            EÖ
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white ring-2 ring-white">
            <Award className="h-3 w-3" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-sans-ui font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer text-base">
              {author.name}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              <Sparkles className="h-2.5 w-2.5 text-amber-600" /> Yazar
            </span>
          </div>
          <p className="text-xs text-stone-500 font-sans-ui mt-0.5">
            {author.title} • {author.location}
          </p>
        </div>
      </div>

      {/* Meta details & Share trigger */}
      <div className="flex items-center gap-4 text-xs text-stone-500 font-sans-ui">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-stone-400" />
          <span>{publishDate}</span>
        </div>
        <span className="text-stone-300">•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-stone-400" />
          <span className="font-semibold text-stone-700">{readTime}</span>
        </div>
        <button
          onClick={onShareClick}
          className="flex items-center gap-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 px-3 py-1 font-semibold transition-colors"
        >
          <Share2 className="h-3.5 w-3.5 text-amber-600" />
          <span>Paylaş</span>
        </button>
      </div>
    </div>
  );
};
