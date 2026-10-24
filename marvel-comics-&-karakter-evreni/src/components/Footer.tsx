import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onSetTab: (tab: 'characters' | 'comics' | 'favorites' | 'reading-list') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onSetTab }) => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <span className="bg-[#E62429] px-2 py-0.5 rounded text-white font-comic text-sm font-bold uppercase tracking-tight">
              MARVEL
            </span>
            <span className="text-neutral-300 font-medium">
              Karakter & Çizgi Roman İnceleme Portalı
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onSetTab('characters')}
              className="hover:text-white transition-colors"
            >
              Karakterler
            </button>
            <button
              onClick={() => onSetTab('comics')}
              className="hover:text-white transition-colors"
            >
              Çizgi Romanlar
            </button>
            <button
              onClick={() => onSetTab('favorites')}
              className="hover:text-white transition-colors"
            >
              Favoriler
            </button>
            <button
              onClick={() => onSetTab('reading-list')}
              className="hover:text-white transition-colors"
            >
              Okuma Listesi
            </button>
            <button
              onClick={onOpenAbout}
              className="hover:text-white transition-colors"
            >
              Proje Hakkında
            </button>
          </div>

        </div>

        {/* Copyright & Enes Öztürk Signature */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            <span>© {new Date().getFullYear()} Marvel Veritabanı Projesi · </span>
            <span className="text-neutral-300 font-semibold">Tasarım & Kodlama: Enes Öztürk</span>
          </div>
          <div>
            <span>Marvel Comics tescilli karakter ve eserleri Marvel Entertainment, LLC mülkiyetindedir.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
