import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Star,
  Trash2,
  PenSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Bookmark,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookCover } from './BookCover';
import { BookGenre, ALL_GENRES } from '../types';

export const FavoritesView: React.FC = () => {
  const {
    currentUser,
    favoriteBooks,
    removeFavoriteBook,
    setIsAddFavoriteModalOpen,
    setIsNewPostModalOpen,
  } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myBooks = currentUser
    ? favoriteBooks.filter((b) => b.userId === currentUser.id)
    : [];

  const filteredBooks = myBooks.filter((book) => {
    if (selectedStatus !== 'all' && book.status !== selectedStatus) return false;
    if (selectedGenre !== 'all' && book.genre !== selectedGenre) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        (book.reviewNote && book.reviewNote.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Favori Kitaplığım
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Kişisel koleksiyonunuza eklediğiniz, okuduğunuz veya okumak istediğiniz tüm favori
              kitaplarınız.
            </p>
          </div>

          <button
            onClick={() => setIsAddFavoriteModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Yeni Favori Kitap Ekle
          </button>
        </div>

        {/* Filter Strip */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tümü ({myBooks.length})
            </button>
            <button
              onClick={() => setSelectedStatus('okudum')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'okudum'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Okudum ({myBooks.filter((b) => b.status === 'okudum').length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('okuyorum')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'okuyorum'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Okuyorum ({myBooks.filter((b) => b.status === 'okuyorum').length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('okuyacagim')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'okuyacagim'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-sky-500" />
              <span>Okuyacağım ({myBooks.filter((b) => b.status === 'okuyacagim').length})</span>
            </button>
          </div>

          {/* Search within own books */}
          <div className="relative md:w-60">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitaplığımda ara..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
            />
          </div>
        </div>

        {/* Genre Filter Buttons */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] text-stone-400 mr-1">Tür:</span>
          <button
            onClick={() => setSelectedGenre('all')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              selectedGenre === 'all'
                ? 'bg-amber-900 text-white font-medium'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Tümü
          </button>
          {ALL_GENRES.map((g) => {
            const count = myBooks.filter((b) => b.genre === g).length;
            if (count === 0) return null;
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  selectedGenre === g
                    ? 'bg-amber-900 text-white font-medium'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {g} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
            Filtreye Uygun Kitap Bulunamadı
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            Henüz bu kritere uyan bir kitap eklenmemiş. Yeni bir favori kitap ekleyerek listenizi
            genişletebilirsiniz.
          </p>
          <button
            onClick={() => setIsAddFavoriteModalOpen(true)}
            className="px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            + Kitap Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    color={book.coverColor}
                    imageUrl={book.coverImage}
                    size="md"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono uppercase font-semibold text-amber-900">
                        {book.genre}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                        {book.status}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-base leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">{book.author}</p>

                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= book.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-mono font-semibold text-stone-700 ml-1">
                        {book.rating}.0
                      </span>
                    </div>

                    {book.pageCount && (
                      <span className="text-[11px] text-stone-400 block mt-1">
                        {book.pageCount} sayfa
                      </span>
                    )}
                  </div>
                </div>

                {book.reviewNote && (
                  <p className="text-xs text-stone-700 italic mt-3 p-2.5 bg-stone-50 rounded-lg border-l-2 border-amber-800 line-clamp-3">
                    "{book.reviewNote}"
                  </p>
                )}

                {book.favoriteQuote && (
                  <p className="text-[11px] text-stone-500 mt-2 font-serif italic line-clamp-2">
                    Alıntı: "{book.favoriteQuote}"
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setIsNewPostModalOpen(true)}
                  className="text-xs text-stone-600 hover:text-amber-900 flex items-center gap-1 cursor-pointer font-medium"
                  title="Bu kitap hakkında gönderi paylaş"
                >
                  <PenSquare className="w-3.5 h-3.5 text-amber-800" />
                  <span>İnceleme Paylaş</span>
                </button>

                <button
                  onClick={() => removeFavoriteBook(book.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 rounded transition-colors cursor-pointer"
                  title="Kitaplığımdan Çıkar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
