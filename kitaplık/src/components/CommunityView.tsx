import React, { useState } from 'react';
import { Users, BookOpen, Star, BookmarkPlus, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookCover } from './BookCover';
import { User } from '../types';

export const CommunityView: React.FC = () => {
  const { users, favoriteBooks, viewUserProfile, copyBookToMyFavorites, isBookInMyFavorites } =
    useApp();
  const [filterSearch, setFilterSearch] = useState('');

  const filteredUsers = users.filter((u) => {
    if (!filterSearch.trim()) return true;
    const q = filterSearch.toLowerCase().trim();
    return (
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.bio.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Kitaplık Okur Topluluğu</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Okurlar & Kütüphaneleri
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Farklı zevklere sahip okurların profillerini inceleyin, kütüphanelerindeki favori
              kitapları keşfedin ve tek tıkla kendi kitaplığınıza aktarın.
            </p>
          </div>

          <div className="sm:w-64">
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Okur ara..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
            />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.map((user) => {
          const userFavs = favoriteBooks.filter((b) => b.userId === user.id);

          return (
            <div
              key={user.id}
              className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* User Info Bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border border-stone-200 object-cover bg-amber-50"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-stone-900 text-base leading-tight">
                          {user.name}
                        </h3>
                        {user.badge && (
                          <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/70 px-2 py-0.2 rounded font-medium">
                            {user.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 font-mono">@{user.username}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => viewUserProfile(user)}
                    className="text-xs font-semibold text-amber-900 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>Profili Gör</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bio & Quote */}
                <p className="text-xs text-stone-700 leading-relaxed mb-3 line-clamp-2">
                  {user.bio}
                </p>

                {user.favoriteQuote && (
                  <div className="p-2.5 bg-stone-50 rounded-lg text-xs italic text-stone-600 border-l-2 border-amber-800 mb-4 line-clamp-2">
                    "{user.favoriteQuote}"
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4 py-2 border-y border-stone-100">
                  <span>
                    <strong className="text-stone-900 font-mono">{userFavs.length}</strong> Favori
                    Kitap
                  </span>
                  <span>
                    <strong className="text-stone-900 font-mono">{user.stats.reviewsCount}</strong>{' '}
                    İnceleme
                  </span>
                  <span>
                    <strong className="text-stone-900 font-mono">
                      {user.readingGoal.current}/{user.readingGoal.target}
                    </strong>{' '}
                    2026 Hedefi
                  </span>
                </div>

                {/* Favorite Books Mini Showcase */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-700">
                      Öne Çıkan Favorileri:
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {userFavs.length} kayıtlı kitap
                    </span>
                  </div>

                  {userFavs.length === 0 ? (
                    <p className="text-xs text-stone-400 italic">Henüz favori kitap eklenmemiş.</p>
                  ) : (
                    <div className="space-y-2">
                      {userFavs.slice(0, 3).map((book) => {
                        const inMyFav = isBookInMyFavorites(book.title, book.author);

                        return (
                          <div
                            key={book.id}
                            className="p-2 bg-stone-50 hover:bg-stone-100/70 rounded-lg border border-stone-200/60 flex items-center justify-between gap-3 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <BookCover
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                color={book.coverColor}
                                imageUrl={book.coverImage}
                                size="sm"
                                className="scale-75 origin-left"
                              />
                              <div className="min-w-0">
                                <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                                  {book.title}
                                </h4>
                                <p className="text-[11px] text-stone-500 truncate">{book.author}</p>
                              </div>
                            </div>

                            {/* 1-Click add to favorites button */}
                            <button
                              onClick={() => copyBookToMyFavorites(book)}
                              className={`shrink-0 px-2 py-1 text-[11px] rounded transition-colors flex items-center gap-1 cursor-pointer font-medium ${
                                inMyFav
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-white hover:bg-amber-900 hover:text-white text-stone-700 border border-stone-200 shadow-2xs'
                              }`}
                              title={
                                inMyFav
                                  ? 'Zaten kitaplığınızda ekli'
                                  : 'Bu kitabı kendi favorilerime ekle'
                              }
                            >
                              {inMyFav ? (
                                <>
                                  <BookmarkCheck className="w-3 h-3 text-amber-800" />
                                  <span className="hidden sm:inline">Kitaplığımda</span>
                                </>
                              ) : (
                                <>
                                  <BookmarkPlus className="w-3 h-3" />
                                  <span>Kitaplığıma Ekle</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
