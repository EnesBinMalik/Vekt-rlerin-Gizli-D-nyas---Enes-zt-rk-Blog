import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  BookmarkPlus,
  BookmarkCheck,
  Star,
  Users,
  Quote,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookGenre, ALL_GENRES, FavoriteBook } from '../types';
import { BookCover } from './BookCover';

export const ExploreSearch: React.FC = () => {
  const {
    favoriteBooks,
    users,
    copyBookToMyFavorites,
    isBookInMyFavorites,
    viewUserProfile,
    setIsAddFavoriteModalOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [displayMode, setDisplayMode] = useState<'catalog' | 'all_entries'>('catalog');

  // Aggregated books group by Title + Author
  const aggregatedBooks = useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        title: string;
        author: string;
        genre: BookGenre;
        coverColor: string;
        coverImage?: string;
        ratings: number[];
        entries: FavoriteBook[];
      }
    >();

    favoriteBooks.forEach((book) => {
      const key = `${book.title.trim().toLowerCase()}___${book.author.trim().toLowerCase()}`;
      if (!map.has(key)) {
        map.set(key, {
          key,
          title: book.title,
          author: book.author,
          genre: book.genre,
          coverColor: book.coverColor,
          coverImage: book.coverImage,
          ratings: [book.rating],
          entries: [book],
        });
      } else {
        const item = map.get(key)!;
        item.ratings.push(book.rating);
        item.entries.push(book);
      }
    });

    return Array.from(map.values());
  }, [favoriteBooks]);

  // Filtered aggregated books
  const filteredCatalog = useMemo(() => {
    return aggregatedBooks.filter((item) => {
      // Genre filter
      if (selectedGenre !== 'all' && item.genre !== selectedGenre) {
        return false;
      }

      // Status filter
      if (
        selectedStatus !== 'all' &&
        !item.entries.some((e) => e.status === selectedStatus)
      ) {
        return false;
      }

      // Query filter: title, author, or readers
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        const matchesGenre = item.genre.toLowerCase().includes(q);
        const matchesReader = item.entries.some(
          (e) =>
            e.userName.toLowerCase().includes(q) ||
            e.userUsername.toLowerCase().includes(q)
        );
        return matchesTitle || matchesAuthor || matchesGenre || matchesReader;
      }

      return true;
    });
  }, [aggregatedBooks, selectedGenre, selectedStatus, searchQuery]);

  // Filtered raw list of all entries
  const filteredEntries = useMemo(() => {
    return favoriteBooks.filter((book) => {
      if (selectedGenre !== 'all' && book.genre !== selectedGenre) return false;
      if (selectedStatus !== 'all' && book.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.userName.toLowerCase().includes(q) ||
          book.userUsername.toLowerCase().includes(q) ||
          book.genre.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [favoriteBooks, selectedGenre, selectedStatus, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header and Explanation */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Kullanıcı Kitaplıkları Arama Motoru</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Kitap Arama & Türler
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Kitaplık topluluğundaki tüm kullanıcıların profillerine eklediği kitaplar içinde arama
              yapın, türlere göre filtreleyin ve beğendiğiniz eserleri tek tıkla kendi kitaplığınıza
              ekleyin.
            </p>
          </div>

          <button
            onClick={() => setIsAddFavoriteModalOpen(true)}
            className="self-start md:self-auto px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            + Kitaplığıma Yeni Eser Ekle
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="mt-6 relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap adı, yazar adı veya okur ismi ile arayın... (Örn: Saatleri Ayarlama Enstitüsü, Frank Herbert, Enes Öztürk)"
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-all text-stone-900 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 px-2 py-1"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Genre Filter Tabs */}
        <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700">Tür Bazlı Filtreleme:</span>
            <span className="text-xs text-stone-500 font-mono">
              {filteredCatalog.length} eser eşleşti
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedGenre === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tüm Türler
            </button>
            {ALL_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedGenre === genre
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Display Mode & Status Filters */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Görünüm:</span>
            <button
              onClick={() => setDisplayMode('catalog')}
              className={`px-2.5 py-1 rounded transition-colors ${
                displayMode === 'catalog'
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Eser Kataloğu (Birleştirilmiş)
            </button>
            <button
              onClick={() => setDisplayMode('all_entries')}
              className={`px-2.5 py-1 rounded transition-colors ${
                displayMode === 'all_entries'
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Tüm Kullanıcı Kayıtları
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500">Okuma Durumu:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs text-stone-700 focus:outline-hidden"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="okudum">Okundu</option>
              <option value="okuyorum">Okunuyor</option>
              <option value="okuyacagim">Okunacak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {displayMode === 'catalog' ? (
        /* Catalog View: Grouped by unique books */
        filteredCatalog.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">
              Aramanızla Eşleşen Kitap Bulunamadı
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
              "{searchQuery}" araması veya seçilen tür filtresinde kayıtlı bir kitap bulunamadı.
              Farklı bir kelime deneyebilir veya ilk ekleyen siz olabilirsiniz.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium hover:bg-stone-200 transition-colors"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCatalog.map((item) => {
              const inMyFav = isBookInMyFavorites(item.title, item.author);
              const avgRating =
                item.ratings.reduce((a, b) => a + b, 0) / item.ratings.length;

              return (
                <div
                  key={item.key}
                  className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <BookCover
                      title={item.title}
                      author={item.author}
                      genre={item.genre}
                      color={item.coverColor}
                      imageUrl={item.coverImage}
                      size="md"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-amber-900 font-medium mb-0.5">
                        <span>{item.genre}</span>
                        <span aria-hidden="true">·</span>
                        <div className="flex items-center gap-0.5 text-amber-700">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="font-mono font-semibold">
                            {avgRating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-0.5 font-medium">
                        {item.author}
                      </p>

                      {/* Readers who favorited this book */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100">
                        <p className="text-[11px] text-stone-500 mb-1.5 flex items-center gap-1">
                          <Users className="w-3 h-3 text-stone-400" />
                          <span>Bu kitabı kitaplığına ekleyen okurlar:</span>
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.entries.map((entry) => {
                            const reader = users.find((u) => u.id === entry.userId);
                            return (
                              <button
                                key={entry.id}
                                onClick={() => reader && viewUserProfile(reader)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-50 hover:bg-amber-50 border border-stone-200 rounded text-[11px] text-stone-700 transition-colors cursor-pointer"
                                title={`${entry.userName} - ${entry.status.toUpperCase()}`}
                              >
                                <img
                                  src={entry.userAvatar}
                                  alt={entry.userName}
                                  className="w-3.5 h-3.5 rounded-full"
                                />
                                <span className="font-medium truncate max-w-[90px]">
                                  {entry.userName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Note / Quote from reader if exists */}
                  {item.entries[0]?.reviewNote && (
                    <div className="mt-3 p-2.5 bg-stone-50 rounded-lg text-xs text-stone-700 italic border-l-2 border-amber-800">
                      "{item.entries[0].reviewNote}"
                      <span className="text-[10px] text-stone-500 block not-italic mt-0.5">
                        — {item.entries[0].userName} incelemesi
                      </span>
                    </div>
                  )}

                  {/* Action Bar: 1-Click Copy to My Favorites */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      {item.entries.length} okurun favorilerinde
                    </span>

                    <button
                      onClick={() => copyBookToMyFavorites(item.entries[0])}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        inMyFav
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-900 hover:bg-amber-900 text-white shadow-xs'
                      }`}
                    >
                      {inMyFav ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-800" />
                          <span>Kitaplığınızda Ekli</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          <span>Kitaplığıma Ekle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* All Individual Entries View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map((book) => {
            const inMyFav = isBookInMyFavorites(book.title, book.author);
            const reader = users.find((u) => u.id === book.userId);

            return (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* User who added it */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                    <button
                      onClick={() => reader && viewUserProfile(reader)}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer truncate"
                    >
                      <img
                        src={book.userAvatar}
                        alt={book.userName}
                        className="w-6 h-6 rounded-full border border-stone-200"
                      />
                      <span className="text-xs font-medium text-stone-900 truncate">
                        {book.userName}
                      </span>
                    </button>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                      {book.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      genre={book.genre}
                      color={book.coverColor}
                      imageUrl={book.coverImage}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-amber-900">
                        {book.genre}
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight truncate">
                        {book.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate">{book.author}</p>

                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= book.rating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {book.reviewNote && (
                    <p className="text-xs text-stone-600 italic mt-2.5 line-clamp-2">
                      "{book.reviewNote}"
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">{book.addedAt}</span>
                  <button
                    onClick={() => copyBookToMyFavorites(book)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1 cursor-pointer ${
                      inMyFav
                        ? 'text-amber-800 bg-amber-50'
                        : 'text-stone-800 hover:text-amber-900 bg-stone-100'
                    }`}
                  >
                    {inMyFav ? (
                      <>
                        <BookmarkCheck className="w-3 h-3" />
                        <span>Kitaplığımda</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-3 h-3" />
                        <span>Favorime Ekle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
