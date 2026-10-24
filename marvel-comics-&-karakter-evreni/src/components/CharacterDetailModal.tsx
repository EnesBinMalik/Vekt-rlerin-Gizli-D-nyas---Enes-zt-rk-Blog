import React from 'react';
import { MarvelCharacter, MarvelComic } from '../types/marvel';
import { MarvelImage } from './MarvelImage';
import { PowerGridDisplay } from './PowerGridDisplay';
import { useAuth } from '../context/AuthContext';
import { X, Heart, BookOpen, Shield, Zap, Sparkles, ArrowRight, Quote, Globe, UserCheck } from 'lucide-react';

interface CharacterDetailModalProps {
  character: MarvelCharacter | null;
  allComics: MarvelComic[];
  onClose: () => void;
  onSelectComic: (comic: MarvelComic) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  allComics,
  onClose,
  onSelectComic,
}) => {
  const { isFavorite, toggleFavorite } = useAuth();

  if (!character) return null;

  const favorited = isFavorite(character.id);
  const featuredComics = allComics.filter((c) => character.comicIds.includes(c.id));

  const getAlignmentBadge = (align: string) => {
    switch (align) {
      case 'hero':
        return { label: 'Süper Kahraman', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' };
      case 'anti-hero':
        return { label: 'Anti-Kahraman', bg: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'villain':
        return { label: 'Kötü Karakter (Süper Düşman)', bg: 'bg-red-950/80 text-red-300 border-red-800' };
      default:
        return { label: align, bg: 'bg-neutral-800 text-neutral-300 border-neutral-700' };
    }
  };

  const alignBadge = getAlignmentBadge(character.alignment);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-neutral-400 hover:text-white hover:bg-black/90 transition-colors border border-white/10"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Banner */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-950">
          <MarvelImage
            src={character.thumbnail}
            alt={character.name}
            className="w-full h-full object-cover"
            categoryKey={character.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Overlaid Title and Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${alignBadge.bg}`}>
                  {alignBadge.label}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {character.species}
                </span>
              </div>
              <h2 className="font-comic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-none">
                {character.name}
              </h2>
              <p className="text-sm text-neutral-300 font-medium mt-1">
                Gerçek Adı: <span className="text-white">{character.realName}</span>
                {character.alias && <span className="text-neutral-400 font-normal"> ({character.alias})</span>}
              </p>
            </div>

            {/* Favorite Action Button */}
            <button
              onClick={() => toggleFavorite(character.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md self-start sm:self-auto border ${
                favorited
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-neutral-800/90 border-neutral-700 text-neutral-200 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
              <span>{favorited ? 'Favorilerimde Eklendi' : 'Favorilere Ekle'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Quote */}
          {character.quote && (
            <div className="relative pl-6 py-2 border-l-2 border-red-600 bg-red-950/20 rounded-r-lg">
              <Quote className="w-5 h-5 text-red-500 mb-1 opacity-60" />
              <p className="text-sm italic text-neutral-200 font-serif leading-relaxed">
                "{character.quote}"
              </p>
            </div>
          )}

          {/* Quick dossier grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs">
            <div>
              <span className="text-neutral-500 block mb-1">İlk Çizgi Roman Çıkışı</span>
              <p className="font-semibold text-neutral-200 font-mono">
                {character.firstAppearance.comicTitle} {character.firstAppearance.issueNumber} ({character.firstAppearance.year})
              </p>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Vatandaşlık / Köken</span>
              <p className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>{character.citizenship}</span>
              </p>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Takım Üyelikleri</span>
              <p className="font-semibold text-neutral-200 truncate">
                {character.teams.join(', ')}
              </p>
            </div>
          </div>

          {/* Biography & Power Grid 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Bio & Powers */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3">
                  Biyografi & Hikaye
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {character.description}
                </p>
              </div>

              {/* Powers & Abilities */}
              <div>
                <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span>Özel Yetenekler & Güçler</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {character.powers.map((power, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{power}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stories / Öyküler */}
              {character.stories && character.stories.length > 0 && (
                <div>
                  <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3">
                    Önemli Hikaye Arkları & Öyküler
                  </h3>
                  <div className="space-y-2.5">
                    {character.stories.map((story) => (
                      <div
                        key={story.id}
                        className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/60 text-xs space-y-1"
                      >
                        <span className="font-semibold text-neutral-200 block text-sm">
                          {story.name}
                        </span>
                        <p className="text-neutral-400 leading-relaxed">
                          {story.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 cols: Official Marvel Power Grid */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
                  <h3 className="font-comic text-base uppercase tracking-wide text-white">
                    Resmi Güç Seviyesi Skalası
                  </h3>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">Marvel 1-7 Skoru</span>
                </div>
                <PowerGridDisplay grid={character.powerGrid} />
              </div>
            </div>

          </div>

          {/* Interactive Connected Comics Section */}
          <div className="border-t border-neutral-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-comic text-xl uppercase tracking-wide text-white">
                  Yer Aldığı Çizgi Romanlar
                </h3>
                <p className="text-xs text-neutral-400">
                  {character.name} karakterinin başrolde veya kilit noktada yer aldığı eserler. Bir çizgi romana tıklayarak detaylarını inceleyebilirsiniz.
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-400 tabular-nums">
                {featuredComics.length} Eser
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuredComics.map((comic) => (
                <div
                  key={comic.id}
                  onClick={() => {
                    onClose();
                    onSelectComic(comic);
                  }}
                  className="group/comic flex gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-red-600/80 hover:bg-neutral-800/50 cursor-pointer transition-all duration-200"
                >
                  <div className="w-16 h-22 rounded-md overflow-hidden bg-neutral-900 shrink-0">
                    <MarvelImage
                      src={comic.coverUrl}
                      alt={comic.title}
                      type="comic"
                      className="w-full h-full object-cover"
                      categoryKey={comic.title}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 font-semibold">
                        Sayı #{comic.issueNumber} · {comic.onSaleDate.split('-')[0]}
                      </span>
                      <h4 className="font-comic text-sm font-bold text-white group-hover/comic:text-red-400 transition-colors line-clamp-2">
                        {comic.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 group-hover/comic:text-white transition-colors">
                      <span>Çizgi Roman Detayı</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Marvel Resmi API Varlık Kimliği: <code className="font-mono text-neutral-400">{character.id}</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
