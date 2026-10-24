import React from 'react';
import { MarvelCharacter, MarvelComic } from '../types/marvel';
import { CharacterCard } from './CharacterCard';
import { useAuth } from '../context/AuthContext';
import { Heart, Compass, ShieldAlert } from 'lucide-react';

interface FavoritesViewProps {
  allCharacters: MarvelCharacter[];
  allComics: MarvelComic[];
  onSelectCharacter: (char: MarvelCharacter) => void;
  onExploreClick: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  allCharacters,
  onSelectCharacter,
  onExploreClick,
}) => {
  const { user } = useAuth();

  const favoriteCharacters = allCharacters.filter((char) =>
    user?.favorites.includes(char.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span className="font-semibold text-neutral-200">Kişiselleştirilmiş Liste</span>
            <span aria-hidden="true">·</span>
            <span>{user?.name || 'Misafir Kullanıcı'}</span>
          </div>
          <h2 className="font-comic text-3xl font-bold uppercase tracking-tight text-white">
            Favori Marvel Karakterleriniz
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Kaydettiğiniz tüm kahraman ve karakterlerin güncel güç verileri ve çizgi roman bağlantıları.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
            <span className="text-neutral-500 block">Kayıtlı Favori</span>
            <span className="font-mono text-base font-bold text-red-400 tabular-nums">
              {favoriteCharacters.length}
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favoriteCharacters.length === 0 ? (
        <div className="text-center py-16 px-4 max-w-md mx-auto bg-neutral-900/40 rounded-2xl border border-neutral-800/80">
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-comic text-xl font-bold uppercase text-white mb-2">
            Henüz Favori Eklenmedi
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Marvel karakter kataloğundaki herhangi bir kahramanın üzerindeki kalp simgesine dokunarak buraya anında kaydedebilirsiniz.
          </p>
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Karakterleri Keşfet</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={onSelectCharacter}
            />
          ))}
        </div>
      )}

    </div>
  );
};
