import React from 'react';
import { Calendar, Globe } from 'lucide-react';

interface NavbarProps {
  reservationCount: number;
  onOpenMyReservations: () => void;
  activeView: 'split' | 'grid' | 'map';
  onViewChange: (view: 'split' | 'grid' | 'map') => void;
  onScrollToExplore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  reservationCount,
  onOpenMyReservations,
  activeView,
  onViewChange,
  onScrollToExplore
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f1115]/95 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, single element) */}
        <a
          href="/"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2 group"
        >
          <span className="text-amber-400 group-hover:rotate-12 transition-transform">✦</span>
          <span>Worldwide Restaurants</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-300">
          <button
            onClick={() => {
              onViewChange('split');
              onScrollToExplore();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${
              activeView === 'split' ? 'text-amber-400 font-semibold' : 'text-stone-300'
            }`}
          >
            Harita & Keşfet
          </button>
          <button
            onClick={() => {
              onViewChange('grid');
              onScrollToExplore();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${
              activeView === 'grid' ? 'text-amber-400 font-semibold' : 'text-stone-300'
            }`}
          >
            Restoran Koleksiyonu
          </button>
          <button
            onClick={() => {
              onViewChange('map');
              onScrollToExplore();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 ${
              activeView === 'map' ? 'text-amber-400 font-semibold' : 'text-stone-300'
            }`}
          >
            Tam Harita
          </button>
          <a
            href="#cities"
            className="transition-colors whitespace-nowrap shrink-0 text-stone-300 hover:text-amber-300"
          >
            Gastronomi Şehirleri
          </a>
          <a
            href="#about"
            className="transition-colors whitespace-nowrap shrink-0 text-stone-300 hover:text-amber-300"
          >
            Küratör & İmza
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenMyReservations}
            className="px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-400/10"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Rezervasyonlarım</span>
            {reservationCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-stone-950 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                {reservationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
