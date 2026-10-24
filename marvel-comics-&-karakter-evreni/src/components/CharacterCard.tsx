import React from 'react';
import { MarvelCharacter } from '../types/marvel';
import { MarvelImage } from './MarvelImage';
import { useAuth } from '../context/AuthContext';
import { Heart, BookOpen, Zap, ArrowRight } from 'lucide-react';

interface CharacterCardProps {
  character: MarvelCharacter;
  onSelect: (character: MarvelCharacter) => void;
  onOpenComic?: (comicId: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const { isFavorite, toggleFavorite, user } = useAuth();
  const favorited = isFavorite(character.id);

  const getAlignmentLabel = (alignment: string) => {
    switch (alignment) {
      case 'hero':
        return { text: 'Kahraman', color: 'text-emerald-400' };
      case 'anti-hero':
        return { text: 'Anti-Kahraman', color: 'text-amber-400' };
      case 'villain':
        return { text: 'Kötü Karakter', color: 'text-red-400' };
      default:
        return { text: 'Bilinmiyor', color: 'text-neutral-400' };
    }
  };

  const alignInfo = getAlignmentLabel(character.alignment);

  return (
    <div className="group relative flex flex-col bg-neutral-900/80 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1">
      
      {/* Top Media Frame */}
      <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
        <MarvelImage
          src={character.thumbnail}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          categoryKey={character.name}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

        {/* Floating Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(character.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 border ${
            favorited
              ? 'bg-red-600/90 border-red-500 text-white shadow-md'
              : 'bg-black/50 border-white/10 text-neutral-300 hover:text-white hover:bg-black/70'
          }`}
          title={favorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          aria-label={`${character.name} favori durumu`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* First Appearance Overprint */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-mono">
            <span className={alignInfo.color}>{alignInfo.text}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>{character.species}</span>
          </div>
          <h3 className="font-comic text-2xl font-bold tracking-tight text-white uppercase mt-0.5 leading-none truncate">
            {character.name}
          </h3>
          <p className="text-xs text-neutral-400 truncate mt-0.5">
            {character.realName}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Bio Excerpt */}
        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
          {character.description}
        </p>

        {/* Power Preview & First Appearance */}
        <div className="space-y-2 text-xs border-t border-neutral-800/80 pt-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1 text-[11px]">
              <Zap className="w-3 h-3 text-red-500" />
              <span>Öne Çıkan Güç:</span>
            </span>
            <span className="font-medium text-neutral-200 text-right truncate max-w-[160px]">
              {character.powers[0]}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1 text-[11px]">
              <BookOpen className="w-3 h-3 text-neutral-400" />
              <span>İlk Çıkış:</span>
            </span>
            <span className="font-mono text-neutral-300 text-[11px]">
              {character.firstAppearance.comicTitle} {character.firstAppearance.issueNumber} ({character.firstAppearance.year})
            </span>
          </div>
        </div>

        {/* Card Footer: Connected Comics count & Detail Button */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-800/80">
          <span className="text-[11px] text-neutral-400">
            <strong className="text-neutral-200 font-mono tabular-nums">{character.comicIds.length}</strong> Çizgi Roman
          </span>

          <button
            onClick={() => onSelect(character)}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all group-hover:bg-red-600 group-hover:text-white shadow-sm"
          >
            <span>Detaylar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
