import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, BookMarked, User, LogOut, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: 'characters' | 'comics' | 'favorites' | 'reading-list';
  setActiveTab: (tab: 'characters' | 'comics' | 'favorites' | 'reading-list') => void;
  onOpenAuth: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenAbout,
}) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const favCount = user?.favorites.length || 0;
  const readingCount = user?.readingList.length || 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Strict 1 line, display font) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('characters')}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded text-left group"
          >
            <div className="bg-[#E62429] px-2.5 py-0.5 rounded shadow-sm text-white font-comic text-xl font-bold tracking-tighter uppercase transition-transform group-hover:scale-105">
              MARVEL
            </div>
            <div className="flex flex-col">
              <span className="font-comic text-sm tracking-wide text-neutral-100 uppercase font-semibold">
                Karakter & Çizgi Roman
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider">
                Enes Öztürk İmzalı
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => setActiveTab('characters')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'characters' ? 'text-red-500 font-semibold border-b-2 border-red-500 pb-1' : ''
            }`}
          >
            Karakterler
          </button>

          <button
            onClick={() => setActiveTab('comics')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'comics' ? 'text-red-500 font-semibold border-b-2 border-red-500 pb-1' : ''
            }`}
          >
            Çizgi Romanlar
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors hover:text-white ${
              activeTab === 'favorites' ? 'text-red-500 font-semibold border-b-2 border-red-500 pb-1' : ''
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'favorites' ? 'fill-red-500 text-red-500' : ''}`} />
            <span>Favorilerim</span>
            {favCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-neutral-400">({favCount})</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reading-list')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors hover:text-white ${
              activeTab === 'reading-list' ? 'text-red-500 font-semibold border-b-2 border-red-500 pb-1' : ''
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Okuma Listem</span>
            {readingCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-neutral-400">({readingCount})</span>
            )}
          </button>

          <button
            onClick={onOpenAbout}
            className="whitespace-nowrap shrink-0 flex items-center gap-1 transition-colors hover:text-neutral-200"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Hakkında</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (User profile or Login) */}
        <div className="flex items-center gap-3 shrink-0 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-xs font-bold text-red-400">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-neutral-200 leading-none truncate max-w-[120px]">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono leading-tight mt-0.5">
                    {user.email.split('@')[0]}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-neutral-900 rounded-lg border border-neutral-800 shadow-xl py-2 z-50 divide-y divide-neutral-800"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div className="px-4 py-2">
                    <p className="text-xs text-neutral-400">Giriş Yapıldı</p>
                    <p className="text-sm font-semibold text-neutral-200 truncate">{user.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center justify-between"
                    >
                      <span>Favori Karakterler</span>
                      <span className="font-mono text-neutral-500">{favCount}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('reading-list')}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center justify-between"
                    >
                      <span>Çizgi Roman Listesi</span>
                      <span className="font-mono text-neutral-500">{readingCount}</span>
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Giriş Yap / Kaydol</span>
            </button>
          )}

          {/* Mobile Tab Shortcut Menu */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setActiveTab(activeTab === 'characters' ? 'comics' : 'characters')}
              className="p-2 rounded bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 text-xs"
              title="Karakter / Çizgi Roman Değiştir"
            >
              {activeTab === 'characters' ? 'Çizgi Romanlar' : 'Karakterler'}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
