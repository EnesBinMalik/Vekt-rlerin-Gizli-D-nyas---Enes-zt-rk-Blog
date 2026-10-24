import React from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeView: 'characters' | 'comics';
  setActiveView: (view: 'characters' | 'comics') => void;
  totalCharacters: number;
  totalComics: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  totalCharacters,
  totalComics,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 pt-10 pb-12">
      {/* Subtle comic grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle & Signature */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-3">
          <span className="text-red-500 font-semibold uppercase tracking-wider">Marvel Veritabanı</span>
          <span aria-hidden="true">·</span>
          <span>Resmi API Uyumlu Şema</span>
          <span aria-hidden="true">·</span>
          <span className="text-neutral-300">Enes Öztürk Özel Kürasyonu</span>
        </div>

        {/* Dominant Headline */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase text-balance leading-none">
            Marvel Çizgi Roman & Karakter Arşivi
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Kahramanların güç skalalarını, ilk çıkışlarını ve yer aldıkları çizgi romanları inceleyin. Bir çizgi romana dokunarak içindeki tüm karakterleri ve öyküleri anında keşfedin.
          </p>
        </div>

        {/* Functional Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeView === 'characters' ? 'Karakter adı, gerçek isim veya güç ara... (örn. Peter Parker, Thor)' : 'Çizgi roman başlığı, yazar veya olay ara... (örn. Infinity Gauntlet, Civil War)'}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-10 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-0.5 rounded"
                title="Aramayı Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Segmented View Switcher (Functional buttons, not pills) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setActiveView('characters')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeView === 'characters'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Karakterler ({totalCharacters})
            </button>
            <button
              onClick={() => setActiveView('comics')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeView === 'comics'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Çizgi Romanlar ({totalComics})
            </button>
          </div>

        </div>

        {/* Fact Bar with Tabular Numerals */}
        <div className="mt-8 pt-6 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-4 text-neutral-400 text-xs">
          <div>
            <span className="block font-mono text-lg font-bold text-neutral-100 tabular-nums">14</span>
            <span className="text-neutral-500">Detaylı Karakter Dosyası</span>
          </div>
          <div>
            <span className="block font-mono text-lg font-bold text-neutral-100 tabular-nums">12</span>
            <span className="text-neutral-500">İkonik Çizgi Roman Sayısı</span>
          </div>
          <div>
            <span className="block font-mono text-lg font-bold text-neutral-100 tabular-nums">100%</span>
            <span className="text-neutral-500">Çapraz İlişkisel Keşif</span>
          </div>
          <div>
            <span className="block font-mono text-lg font-bold text-red-400">Enes Öztürk</span>
            <span className="text-neutral-500">Tasarım & Geliştirme</span>
          </div>
        </div>

      </div>
    </section>
  );
};
