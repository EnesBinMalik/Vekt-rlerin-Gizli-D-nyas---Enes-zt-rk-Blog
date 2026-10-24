import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  PenSquare,
  TrendingUp,
  Award,
  Filter,
  Search,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';
import { BookGenre, ALL_GENRES } from '../types';

export const Feed: React.FC = () => {
  const {
    currentUser,
    posts,
    favoriteBooks,
    setIsNewPostModalOpen,
    setIsAddFavoriteModalOpen,
    users,
    viewUserProfile,
    setCurrentTab,
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | BookGenre>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Enes Öztürk user reference
  const enesUser = users.find((u) => u.username === 'enes_ozturk');

  // Filter posts
  const filteredPosts = posts
    .filter((post) => {
      if (selectedFilter === 'popular') {
        return post.likes.length >= 2;
      }
      if (selectedFilter !== 'all') {
        return post.bookGenre === selectedFilter;
      }
      return true;
    })
    .filter((post) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        post.bookTitle.toLowerCase().includes(q) ||
        post.bookAuthor.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.userName.toLowerCase().includes(q)
      );
    });

  // Unique books count in community
  const uniqueBooksCount = new Set(
    favoriteBooks.map((b) => `${b.title.toLowerCase()}_${b.author.toLowerCase()}`)
  ).size;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Create Post Box */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-start gap-3.5">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full border border-stone-200 object-cover bg-amber-50 shrink-0"
              />
              <div className="flex-1">
                <button
                  onClick={() => setIsNewPostModalOpen(true)}
                  className="w-full text-left px-4 py-3 bg-stone-50 hover:bg-stone-100/90 text-stone-500 rounded-lg text-sm border border-stone-200/80 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>Hangi kitabı okuyorsunuz? İncelemenizi veya bir alıntıyı paylaşın...</span>
                  <PenSquare className="w-4 h-4 text-amber-800 shrink-0 ml-2" />
                </button>

                <div className="flex items-center justify-between mt-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsNewPostModalOpen(true)}
                      className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>Kitap İncelemesi</span>
                    </button>
                    <button
                      onClick={() => setIsAddFavoriteModalOpen(true)}
                      className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                      <span>Favorilere Kitap Ekle</span>
                    </button>
                  </div>
                  <span className="hidden sm:inline text-[11px] text-stone-400">
                    Fotoğraf & Alıntı desteğiyle
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setSelectedFilter('popular')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  selectedFilter === 'popular'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <TrendingUp className="w-3 h-3 text-amber-400" />
                Popülerler
              </button>
              {['Klasik', 'Roman', 'Bilim Kurgu', 'Şiir', 'Felsefe'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedFilter(genre as BookGenre)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedFilter === genre
                      ? 'bg-amber-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Quick in-feed search */}
            <div className="relative shrink-0 sm:w-48">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Akışta ara..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>
          </div>

          {/* Posts Stream */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-stone-800 text-base mb-1">
                Eşleşen Gönderi Bulunamadı
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Seçtiğiniz filtreye uygun henüz bir inceleme paylaşılmamış. İlk paylaşımı siz yapın!
              </p>
              <button
                onClick={() => setIsNewPostModalOpen(true)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-amber-900 transition-colors cursor-pointer"
              >
                Yeni İnceleme Yaz
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: Reading Goal, Enes Öztürk Founder Highlight & Explore Teaser */}
        <div className="lg:col-span-4 space-y-6">
          {/* Enes Öztürk Signature Box */}
          {enesUser && (
            <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 text-white rounded-xl p-5 border border-amber-900/30 shadow-md">
              <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-amber-300/80 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Geliştirici & Kurucu İmzası</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={enesUser.avatar}
                  alt={enesUser.name}
                  className="w-12 h-12 rounded-full border-2 border-amber-400/40 object-cover bg-amber-900"
                />
                <div>
                  <h3 className="font-serif font-bold text-white text-base leading-tight">
                    {enesUser.name}
                  </h3>
                  <p className="text-xs text-amber-200/90 font-mono">@{enesUser.username}</p>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic mb-3">
                "{enesUser.favoriteQuote}"
              </p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-white/10">
                <span className="text-stone-300">
                  {enesUser.stats.booksRead} kitap · {enesUser.stats.reviewsCount} inceleme
                </span>
                <button
                  onClick={() => viewUserProfile(enesUser)}
                  className="text-amber-300 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Profili İncele →
                </button>
              </div>
            </div>
          )}

          {/* Current User's Reading Goal Tracker */}
          {currentUser && (
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  {currentUser.readingGoal.year} Okuma Hedefi
                </h4>
                <span className="text-xs font-mono font-semibold text-amber-900">
                  {currentUser.readingGoal.current} / {currentUser.readingGoal.target} Kitap
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-amber-800 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
                        (currentUser.readingGoal.current / currentUser.readingGoal.target) * 100
                      )
                    )}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>
                  %{Math.round((currentUser.readingGoal.current / currentUser.readingGoal.target) * 100)}{' '}
                  tamamlandı
                </span>
                <button
                  onClick={() => setIsAddFavoriteModalOpen(true)}
                  className="text-amber-800 hover:text-stone-900 font-medium cursor-pointer"
                >
                  + Kitap Ekle
                </button>
              </div>
            </div>
          )}

          {/* Quick Explore / Search Teaser */}
          <div className="bg-amber-50/60 rounded-xl border border-amber-200/60 p-5">
            <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm mb-1.5">
              <Search className="w-4 h-4 text-amber-800" />
              <span>Tüm Okurların Kitaplığı</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Topluluktaki okurların favorilerine eklediği {uniqueBooksCount}+ farklı kitabı keşfedin ve tek tıkla kendi kitaplığınıza aktarın.
            </p>
            <button
              onClick={() => setCurrentTab('explore')}
              className="w-full py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer text-center block"
            >
              Kitapları & Türleri Keşfet
            </button>
          </div>

          {/* Top Community Readers */}
          <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Aktif Okurlar</h4>
              <button
                onClick={() => setCurrentTab('community')}
                className="text-xs text-amber-800 hover:text-stone-900 font-medium cursor-pointer"
              >
                Tümü
              </button>
            </div>
            <div className="space-y-3">
              {users.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  onClick={() => viewUserProfile(user)}
                  className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-stone-200 object-cover bg-amber-50"
                    />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-stone-500 font-mono truncate">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0">
                    {user.stats.booksRead} kitap
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
