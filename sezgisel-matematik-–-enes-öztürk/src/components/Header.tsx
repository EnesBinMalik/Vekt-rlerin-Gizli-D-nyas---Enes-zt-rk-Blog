import React from 'react';

interface HeaderProps {
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#top"
          className="text-lg font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-900 transition-colors"
        >
          Enes Öztürk
        </a>

        {/* Zone 2: 4-5 clean single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-stone-600">
          <a
            href="#cember-alani"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Çember Geometrisi
          </a>
          <a
            href="#pisagor-teoremi"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Pisagor & Alan
          </a>
          <a
            href="#turev-mikroskobu"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Türev Mikroskobu
          </a>
          <a
            href="#euler-sabiti"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Doğal Sabit (e)
          </a>
          <a
            href="#kalkulus-baglantisi"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Temel Teorem
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenShare}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            Yazıyı Paylaş
          </button>
        </div>
      </div>
    </header>
  );
};
