import React from 'react';
import { MarvelComic, MarvelCharacter } from '../types/marvel';
import { MarvelImage } from './MarvelImage';
import { useAuth } from '../context/AuthContext';
import { BookMarked, Star, Users, ArrowRight, Check } from 'lucide-react';

interface ComicCardProps {
  comic: MarvelComic;
  allCharacters: MarvelCharacter[];
  onSelect: (comic: MarvelComic) => void;
  onSelectCharacter?: (character: MarvelCharacter) => void;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  comic,
  allCharacters,
  onSelect,
  onSelectCharacter,
}) => {
  const { getReadingItem, updateReadingList } = useAuth();
  const readingItem = getReadingItem(comic.id);

  // Get matching characters
  const featuredCharacters = allCharacters.filter((c) => comic.characterIds.includes(c.id));

  const handleToggleReading = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!readingItem) {
      updateReadingList(comic.id, 'to-read');
    } else if (readingItem.status === 'to-read') {
      updateReadingList(comic.id, 'reading');
    } else if (readingItem.status === 'reading') {
      updateReadingList(comic.id, 'completed', 5);
    } else {
      updateReadingList(comic.id, 'to-read');
    }
  };

  const getStatusBadge = () => {
    if (!readingItem) return null;
    switch (readingItem.status) {
      case 'to-read':
        return { text: 'Okunacak', color: 'bg-neutral-800 text-neutral-300 border-neutral-700' };
      case 'reading':
        return { text: 'Okunuyor', color: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'completed':
        return { text: 'Okundu', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="group relative flex flex-col bg-neutral-900/80 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1">
      
      {/* Cover Media Container */}
      <div className="relative h-72 w-full overflow-hidden bg-neutral-950">
        <MarvelImage
          src={comic.coverUrl}
          alt={comic.title}
          type="comic"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          categoryKey={comic.title}
        />

        {/* Vintage Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

        {/* Issue Number Badge & Format */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="font-comic text-xs font-bold bg-[#E62429] text-white px-2 py-0.5 rounded shadow">
            #{comic.issueNumber}
          </span>
          <span className="text-[10px] uppercase font-mono bg-black/60 backdrop-blur-md text-neutral-300 px-2 py-0.5 rounded border border-white/10">
            {comic.format}
          </span>
        </div>

        {/* Quick Reading List Bookmark Button */}
        <button
          onClick={handleToggleReading}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all border ${
            readingItem
              ? 'bg-red-600/90 border-red-500 text-white shadow-md'
              : 'bg-black/50 border-white/10 text-neutral-300 hover:text-white hover:bg-black/70'
          }`}
          title={readingItem ? `Durum: ${statusBadge?.text} (Değiştirmek için tıkla)` : 'Okuma Listeme Ekle'}
          aria-label={`${comic.title} okuma listesi`}
        >
          {readingItem?.status === 'completed' ? (
            <Check className="w-4 h-4" />
          ) : (
            <BookMarked className="w-4 h-4" />
          )}
        </button>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
            <span>{comic.onSaleDate.split('-')[0]}</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="tabular-nums font-semibold">{comic.rating}</span>
            </span>
          </div>

          <h3 className="font-comic text-xl font-bold tracking-tight text-white uppercase leading-tight line-clamp-1">
            {comic.title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Editorial Synopsis */}
        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
          {comic.description}
        </p>

        {/* Starring Characters in this Issue */}
        <div className="space-y-1.5 border-t border-neutral-800/80 pt-2.5">
          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <Users className="w-3 h-3 text-red-500" />
            <span>Yer Alan Karakterler ({featuredCharacters.length}):</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {featuredCharacters.slice(0, 4).map((char) => (
              <button
                key={char.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectCharacter) onSelectCharacter(char);
                }}
                className="text-[11px] font-medium text-neutral-300 hover:text-red-400 transition-colors underline decoration-dotted decoration-neutral-600 underline-offset-2"
                title={`${char.name} dosyasını incele`}
              >
                {char.name}
              </button>
            ))}
            {featuredCharacters.length > 4 && (
              <span className="text-[10px] text-neutral-500">+{featuredCharacters.length - 4} diğer</span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-800/80">
          <div className="text-[11px] text-neutral-400">
            {statusBadge ? (
              <span className={`px-2 py-0.5 rounded text-[10px] border ${statusBadge.color}`}>
                {statusBadge.text}
              </span>
            ) : (
              <span className="font-mono text-neutral-400">${comic.printPrice.toFixed(2)} USD</span>
            )}
          </div>

          <button
            onClick={() => onSelect(comic)}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all group-hover:bg-red-600 group-hover:text-white shadow-sm"
          >
            <span>Çizgi Roman İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
