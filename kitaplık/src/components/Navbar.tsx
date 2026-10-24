import React, { useState } from 'react';
import { BookMarked, Plus, Search, Users, Sparkles, LogIn, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewTab } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    users,
    currentTab,
    setCurrentTab,
    setIsNewPostModalOpen,
    setIsAuthModalOpen,
    setAuthMode,
    switchUser,
    setSelectedUserProfile,
    favoriteBooks,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const myFavoritesCount = currentUser
    ? favoriteBooks.filter((b) => b.userId === currentUser.id).length
    : 0;

  const handleNav = (tab: ViewTab) => {
    if (tab === 'profile' && currentUser) {
      setSelectedUserProfile(currentUser);
    }
    setCurrentTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Element with literary signature) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('feed')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-200 flex items-center justify-center shadow-sm group-hover:bg-amber-900 transition-colors">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 block leading-none">
                Kitaplık
              </span>
              <span className="text-[10px] tracking-wider text-amber-800 font-medium">
                Enes Öztürk İmzalı
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNav('feed')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 ${
              currentTab === 'feed'
                ? 'text-stone-950 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Akış
          </button>

          <button
            onClick={() => handleNav('explore')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentTab === 'explore'
                ? 'text-stone-950 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Kitap Arama & Türler
          </button>

          <button
            onClick={() => handleNav('favorites')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentTab === 'favorites'
                ? 'text-stone-950 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            Favorilerim
            {myFavoritesCount > 0 && (
              <span className="text-xs text-amber-800 font-mono font-medium">
                ({myFavoritesCount})
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('community')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentTab === 'community'
                ? 'text-stone-950 font-semibold border-b-2 border-amber-800'
                : 'hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Okurlar
          </button>
        </nav>

        {/* Zone 3: 1 primary action button & User Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 transition-colors rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Paylaşım Yap
          </button>

          {/* User Profile / Account Trigger */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-stone-300 bg-amber-50 object-cover"
                />
                <span className="hidden lg:inline text-xs font-medium text-stone-800 truncate max-w-[100px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs text-stone-400">Giriş Yapılan Hesap</p>
                    <p className="text-sm font-semibold text-stone-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-stone-500 font-mono">@{currentUser.username}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNav('profile')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 transition-colors flex items-center justify-between"
                    >
                      <span>Profilimi Görüntüle</span>
                      <span className="text-[10px] text-amber-800 font-medium">Favoriler & İncelemeler</span>
                    </button>
                    <button
                      onClick={() => handleNav('favorites')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 transition-colors"
                    >
                      Favori Kitaplarım ({myFavoritesCount})
                    </button>
                  </div>

                  <div className="border-t border-stone-100 pt-2 px-3">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-stone-400 px-1 mb-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      <span>Hesap Değiştir (Demo)</span>
                    </div>
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => switchUser(u.id)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-amber-50 text-amber-950 font-medium'
                            : 'hover:bg-stone-100 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full" />
                          <span className="truncate">{u.name}</span>
                        </div>
                        {u.id === currentUser.id && (
                          <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-stone-100 mt-2 pt-1 px-3">
                    <button
                      onClick={() => {
                        setAuthMode('register');
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      + Yeni Hesap Aç
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-900 border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Giriş Yap
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav bar sub-ribbon */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/80 bg-white py-2 px-2 text-xs font-medium text-stone-600">
        <button
          onClick={() => handleNav('feed')}
          className={`py-1 px-2 rounded ${currentTab === 'feed' ? 'text-stone-950 font-bold bg-amber-50' : ''}`}
        >
          Akış
        </button>
        <button
          onClick={() => handleNav('explore')}
          className={`py-1 px-2 rounded ${currentTab === 'explore' ? 'text-stone-950 font-bold bg-amber-50' : ''}`}
        >
          Arama & Türler
        </button>
        <button
          onClick={() => handleNav('favorites')}
          className={`py-1 px-2 rounded ${currentTab === 'favorites' ? 'text-stone-950 font-bold bg-amber-50' : ''}`}
        >
          Favoriler ({myFavoritesCount})
        </button>
        <button
          onClick={() => handleNav('community')}
          className={`py-1 px-2 rounded ${currentTab === 'community' ? 'text-stone-950 font-bold bg-amber-50' : ''}`}
        >
          Okurlar
        </button>
        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="py-1 px-2.5 rounded bg-stone-900 text-white font-medium"
        >
          + Paylaş
        </button>
      </div>
    </header>
  );
};
