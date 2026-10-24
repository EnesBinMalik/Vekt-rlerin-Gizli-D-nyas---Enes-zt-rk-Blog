import React, { useState } from 'react';
import { MarvelComic, MarvelCharacter, ReadingStatus } from '../types/marvel';
import { ComicCard } from './ComicCard';
import { useAuth } from '../context/AuthContext';
import { BookMarked, Compass, CheckCircle2, Clock, BookOpen } from 'lucide-react';

interface ReadingListViewProps {
  allComics: MarvelComic[];
  allCharacters: MarvelCharacter[];
  onSelectComic: (comic: MarvelComic) => void;
  onSelectCharacter: (char: MarvelCharacter) => void;
  onExploreComics: () => void;
}

export const ReadingListView: React.FC<ReadingListViewProps> = ({
  allComics,
  allCharacters,
  onSelectComic,
  onSelectCharacter,
  onExploreComics,
}) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | ReadingStatus>('all');

  const readingItems = user?.readingList || [];

  const filteredComics = allComics
    .map((comic) => {
      const item = readingItems.find((r) => r.comicId === comic.id);
      return item ? { comic, item } : null;
    })
    .filter((entry): entry is { comic: MarvelComic; item: (typeof readingItems)[0] } => entry !== null)
    .filter((entry) => {
      if (filter === 'all') return true;
      return entry.item.status === filter;
    });

  const completedCount = readingItems.filter((i) => i.status === 'completed').length;
  const inProgressCount = readingItems.filter((i) => i.status === 'reading').length;
  const toReadCount = readingItems.filter((i) => i.status === 'to-read').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <BookMarked className="w-3.5 h-3.5 text-red-500" />
            <span className="font-semibold text-neutral-200">Kişisel Çizgi Roman Kütüphanesi</span>
            <span aria-hidden="true">·</span>
            <span>{user?.name || 'Misafir Kullanıcı'}</span>
          </div>
          <h2 className="font-comic text-3xl font-bold uppercase tracking-tight text-white">
            Çizgi Roman Okuma Takibi
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Okumayı planladığınız, okumakta olduğunuz ve bitirdiğiniz Marvel sayıları.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-center">
            <span className="text-[10px] text-neutral-500 block">Okunacak</span>
            <span className="font-mono font-bold text-neutral-300 tabular-nums">{toReadCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-center">
            <span className="text-[10px] text-amber-500 block">Okunuyor</span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">{inProgressCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-center">
            <span className="text-[10px] text-emerald-500 block">Okundu</span>
            <span className="font-mono font-bold text-emerald-400 tabular-nums">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Segmented Controls */}
      <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 mb-6 self-start inline-flex">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            filter === 'all' ? 'bg-red-600 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Tümü ({readingItems.length})
        </button>
        <button
          onClick={() => setFilter('to-read')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            filter === 'to-read' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Okunacak ({toReadCount})
        </button>
        <button
          onClick={() => setFilter('reading')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            filter === 'reading' ? 'bg-amber-600 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Okunuyor ({inProgressCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            filter === 'completed' ? 'bg-emerald-600 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Okundu ({completedCount})
        </button>
      </div>

      {/* Empty State */}
      {filteredComics.length === 0 ? (
        <div className="text-center py-16 px-4 max-w-md mx-auto bg-neutral-900/40 rounded-2xl border border-neutral-800/80">
          <div className="w-14 h-14 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <BookMarked className="w-6 h-6" />
          </div>
          <h3 className="font-comic text-xl font-bold uppercase text-white mb-2">
            Bu Filtrede Eser Bulunmuyor
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Çizgi roman kartlarındaki ayraç simgesine veya detay sayfalarındaki butonlara dokunarak okuma durumunuzu belirleyebilirsiniz.
          </p>
          <button
            onClick={onExploreComics}
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Çizgi Romanları Keşfet</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredComics.map(({ comic }) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              allCharacters={allCharacters}
              onSelect={onSelectComic}
              onSelectCharacter={onSelectCharacter}
            />
          ))}
        </div>
      )}

    </div>
  );
};
