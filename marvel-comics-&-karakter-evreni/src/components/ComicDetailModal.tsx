import React from 'react';
import { MarvelComic, MarvelCharacter } from '../types/marvel';
import { MarvelImage } from './MarvelImage';
import { useAuth } from '../context/AuthContext';
import { X, Star, Calendar, DollarSign, BookOpen, User, Check, ArrowRight, Layers, Award } from 'lucide-react';

interface ComicDetailModalProps {
  comic: MarvelComic | null;
  allCharacters: MarvelCharacter[];
  onClose: () => void;
  onSelectCharacter: (character: MarvelCharacter) => void;
}

export const ComicDetailModal: React.FC<ComicDetailModalProps> = ({
  comic,
  allCharacters,
  onClose,
  onSelectCharacter,
}) => {
  const { getReadingItem, updateReadingList, removeFromReadingList } = useAuth();

  if (!comic) return null;

  const readingItem = getReadingItem(comic.id);
  const featuredCharacters = allCharacters.filter((c) => comic.characterIds.includes(c.id));

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

        {/* Header Hero Area */}
        <div className="relative bg-neutral-950 p-6 sm:p-8 border-b border-neutral-800">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Comic Cover Preview */}
            <div className="w-40 sm:w-48 h-56 sm:h-68 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 shrink-0 mx-auto sm:mx-0">
              <MarvelImage
                src={comic.coverUrl}
                alt={comic.title}
                type="comic"
                className="w-full h-full object-cover"
                categoryKey={comic.title}
              />
            </div>

            {/* Comic Header Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-comic text-xs font-bold bg-[#E62429] text-white px-2 py-0.5 rounded shadow">
                  SAYI #{comic.issueNumber}
                </span>
                <span className="text-xs uppercase font-mono text-neutral-400">
                  {comic.series}
                </span>
                <span className="text-xs text-neutral-500">·</span>
                <span className="text-xs text-neutral-400 font-mono">
                  {comic.format}
                </span>
              </div>

              <h2 className="font-comic text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
                {comic.title}
              </h2>

              {comic.variantDescription && (
                <p className="text-xs text-amber-400 font-medium">
                  {comic.variantDescription}
                </p>
              )}

              {/* Specs Definition Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Yayın Tarihi</span>
                  <span className="font-mono text-neutral-200 font-semibold">{comic.onSaleDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Sayfa Sayısı</span>
                  <span className="font-mono text-neutral-200 font-semibold">{comic.pageCount} Sayfa</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Kapak Fiyatı</span>
                  <span className="font-mono text-neutral-200 font-semibold">${comic.printPrice.toFixed(2)} USD</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px]">Kullanıcı Skoru</span>
                  <span className="font-mono text-amber-400 font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{comic.rating} / 5.0</span>
                  </span>
                </div>
              </div>

              {/* Reading List Manager Box */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-neutral-400 mr-2">Okuma Durumunuz:</span>
                <button
                  onClick={() => updateReadingList(comic.id, 'to-read')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    readingItem?.status === 'to-read'
                      ? 'bg-neutral-100 text-neutral-900 border-white font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  Okunacak
                </button>
                <button
                  onClick={() => updateReadingList(comic.id, 'reading')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    readingItem?.status === 'reading'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  Okunuyor
                </button>
                <button
                  onClick={() => updateReadingList(comic.id, 'completed', 5)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    readingItem?.status === 'completed'
                      ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Check className="w-3 h-3 inline mr-1" />
                  Okundu
                </button>
                {readingItem && (
                  <button
                    onClick={() => removeFromReadingList(comic.id)}
                    className="text-xs text-red-400 hover:text-red-300 underline ml-2"
                  >
                    Listeden Çıkar
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[50vh] overflow-y-auto">
          
          {/* Synopsis */}
          <div>
            <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3">
              Çizgi Roman Özeti & Editoryal Not
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {comic.description}
            </p>
          </div>

          {/* Connected Characters in this comic (Interactive!) */}
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
              <h3 className="font-comic text-lg uppercase tracking-wide text-white">
                Bu Sayıda Yer Alan Karakterler
              </h3>
              <span className="text-xs text-neutral-400">
                Detay dosyasını açmak için karaktere dokunun
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {featuredCharacters.map((char) => (
                <div
                  key={char.id}
                  onClick={() => {
                    onClose();
                    onSelectCharacter(char);
                  }}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-600 hover:bg-neutral-800/60 cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                    <MarvelImage
                      src={char.thumbnail}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      categoryKey={char.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-comic text-base font-bold text-white group-hover:text-red-400 truncate">
                      {char.name}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate">
                      {char.realName}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Creators & Creative Team Table */}
          <div>
            <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3">
              Yaratıcı Ekip & Sanatçılar (Creators)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
              {comic.creators.map((creator, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-500 block text-[11px] uppercase tracking-wider font-mono">
                    {creator.role}
                  </span>
                  <span className="font-semibold text-neutral-200 mt-0.5 block truncate">
                    {creator.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stories & Chapters in this issue */}
          {comic.stories && comic.stories.length > 0 && (
            <div>
              <h3 className="font-comic text-lg uppercase tracking-wide text-white border-b border-neutral-800 pb-2 mb-3">
                İçerilen Hikayeler & Olaylar
              </h3>
              <div className="space-y-2">
                {comic.stories.map((st) => (
                  <div key={st.id} className="p-3.5 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-neutral-200 text-sm">{st.name}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        {st.type}
                      </span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{st.synopsis}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Marvel Resmi Katalog: {comic.isbn || comic.upc || comic.id}</span>
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
