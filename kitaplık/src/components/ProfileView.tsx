import React, { useState } from 'react';
import {
  BookOpen,
  Star,
  MapPin,
  Calendar,
  Quote,
  BookmarkPlus,
  BookmarkCheck,
  Plus,
  Edit3,
  UserCheck,
  UserPlus,
  Trash2,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookCover } from './BookCover';
import { PostCard } from './PostCard';
import { FavoriteBook } from '../types';

interface ProfileViewProps {
  onOpenEditModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenEditModal }) => {
  const {
    currentUser,
    selectedUserProfile,
    favoriteBooks,
    posts,
    copyBookToMyFavorites,
    isBookInMyFavorites,
    removeFavoriteBook,
    setIsAddFavoriteModalOpen,
    showToast,
  } = useApp();

  // Profile target: either selected user or logged in user
  const profileUser = selectedUserProfile || currentUser;

  const [activeTab, setActiveTab] = useState<'favorites' | 'posts' | 'reading_list'>('favorites');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('all');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-stone-500">Görüntülenecek profil bulunamadı.</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;

  // Filter books of this user
  const userFavorites = favoriteBooks.filter((b) => b.userId === profileUser.id);
  const userPosts = posts.filter((p) => p.userId === profileUser.id);

  // Genre breakdown
  const genreCounts: { [key: string]: number } = {};
  userFavorites.forEach((b) => {
    genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
  });

  const filteredUserFavorites = userFavorites.filter((b) => {
    if (selectedGenreFilter === 'all') return true;
    return b.genre === selectedGenreFilter;
  });

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    showToast(
      isFollowing ? 'Takipten Çıkıldı' : 'Takip Ediliyor',
      `${profileUser.name} ${isFollowing ? 'takip listenizden çıkarıldı.' : 'artık takip ediliyor.'}`,
      'info'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-stone-200 bg-amber-50 object-cover shadow-sm"
              />
              {profileUser.badge && (
                <div className="absolute -bottom-2 -right-1 bg-stone-900 text-amber-200 text-[10px] px-2 py-0.5 rounded-full font-medium border border-stone-700 shadow-xs whitespace-nowrap">
                  {profileUser.badge}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {profileUser.name}
                </h1>
                <span className="text-xs text-stone-600 font-mono">
                  @{profileUser.username}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 max-w-xl leading-relaxed">
                {profileUser.bio}
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-600 pt-1 flex-wrap">
                {profileUser.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {profileUser.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {profileUser.joinedDate} tarihinden beri üye
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            {isOwnProfile ? (
              <>
                <button
                  onClick={() => setIsAddFavoriteModalOpen(true)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Favori Kitap Ekle
                </button>
                {onOpenEditModal && (
                  <button
                    onClick={onOpenEditModal}
                    className="px-3 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    title="Profili Düzenle"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Düzenle</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleFollowToggle}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  isFollowing
                    ? 'bg-stone-100 text-stone-800 border border-stone-300'
                    : 'bg-stone-900 text-white hover:bg-amber-900'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Takip Ediliyor</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Takip Et</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Favorite Quote Block */}
        {profileUser.favoriteQuote && (
          <div className="mt-5 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/50 flex items-start gap-2.5">
            <Quote className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-800 leading-relaxed font-serif italic">
              <span>"{profileUser.favoriteQuote}"</span>
              {profileUser.favoriteQuoteAuthor && (
                <span className="text-[11px] font-sans font-medium text-stone-600 block not-italic mt-0.5">
                  — {profileUser.favoriteQuoteAuthor}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats Strip */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-2 bg-stone-50 rounded-lg">
            <span className="text-stone-600 text-[11px] block">Favori Kitaplar</span>
            <span className="font-serif font-bold text-lg text-stone-900 tabular-nums">
              {userFavorites.length}
            </span>
          </div>
          <div className="p-2 bg-stone-50 rounded-lg">
            <span className="text-stone-600 text-[11px] block">İncelemeler</span>
            <span className="font-serif font-bold text-lg text-stone-900 tabular-nums">
              {userPosts.length}
            </span>
          </div>
          <div className="p-2 bg-stone-50 rounded-lg">
            <span className="text-stone-600 text-[11px] block">2026 Okuma Hedefi</span>
            <span className="font-serif font-bold text-lg text-amber-900 tabular-nums">
              {profileUser.readingGoal.current} / {profileUser.readingGoal.target}
            </span>
          </div>
          <div className="p-2 bg-stone-50 rounded-lg">
            <span className="text-stone-600 text-[11px] block">Takipçiler</span>
            <span className="font-serif font-bold text-lg text-stone-900 tabular-nums">
              {profileUser.stats.followersCount + (isFollowing ? 1 : 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Profil Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Favori Kitaplığı ({userFavorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'posts'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>İncelemeler & Gönderiler ({userPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reading_list')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'reading_list'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <PieChart className="w-3.5 h-3.5" />
          <span>Okuma Durumu & Tür Dağılımı</span>
        </button>
      </div>

      {/* TAB 1: Favori Kitaplar Grid with 1-click "Benim Favorilerime Ekle" */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {/* Genre Filters on Profile */}
          {Object.keys(genreCounts).length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-400 mr-1 text-[11px]">Tür Filtresi:</span>
              <button
                onClick={() => setSelectedGenreFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedGenreFilter === 'all'
                    ? 'bg-amber-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Tümü ({userFavorites.length})
              </button>
              {Object.entries(genreCounts).map(([genre, count]) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenreFilter(genre)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedGenreFilter === genre
                      ? 'bg-amber-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {genre} ({count})
                </button>
              ))}
            </div>
          )}

          {!isOwnProfile && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {profileUser.name}'in favorilerindeki herhangi bir kitabı tek tıkla kendi favorilerinize ekleyebilirsiniz.
                </span>
              </div>
            </div>
          )}

          {filteredUserFavorites.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-10 text-center">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-600 text-xs">
                {isOwnProfile
                  ? 'Henüz favori kitap eklemediniz. "+ Favori Kitap Ekle" butonuna basarak kitaplığınızı doldurabilirsiniz!'
                  : 'Bu kullanıcının seçilen türde henüz favori kitabı bulunmuyor.'}
              </p>
              {isOwnProfile && (
                <button
                  onClick={() => setIsAddFavoriteModalOpen(true)}
                  className="mt-3 px-3.5 py-1.5 bg-stone-900 text-white rounded text-xs hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  Kitap Ekle
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUserFavorites.map((book) => {
                const inMyFav = isBookInMyFavorites(book.title, book.author);

                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-xs flex flex-col justify-between hover:border-amber-700/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          genre={book.genre}
                          color={book.coverColor}
                          imageUrl={book.coverImage}
                          size="sm"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] uppercase font-mono font-semibold text-amber-800">
                              {book.genre}
                            </span>
                            <span className="text-[10px] text-stone-600 uppercase font-mono">
                              {book.status}
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-stone-900 text-sm leading-tight truncate mt-0.5">
                            {book.title}
                          </h3>
                          <p className="text-xs text-stone-600 truncate">{book.author}</p>

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
                            <span className="text-[11px] font-mono font-semibold text-stone-700 ml-1">
                              {book.rating}.0
                            </span>
                          </div>
                        </div>
                      </div>

                      {book.reviewNote && (
                        <p className="text-xs text-stone-700 italic mt-3 bg-stone-50 p-2 rounded border-l-2 border-amber-800 line-clamp-3">
                          "{book.reviewNote}"
                        </p>
                      )}

                      {book.favoriteQuote && (
                        <p className="text-[11px] text-stone-500 mt-2 font-serif italic line-clamp-2">
                          Alıntı: "{book.favoriteQuote}"
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400">
                        {book.pageCount ? `${book.pageCount} sayfa` : book.addedAt}
                      </span>

                      {/* If own profile, allow deleting; if other profile, allow 1-click copy! */}
                      {isOwnProfile ? (
                        <button
                          onClick={() => removeFavoriteBook(book.id)}
                          className="text-stone-600 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer p-1"
                          title="Favorilerden Kaldır"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Kaldır</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => copyBookToMyFavorites(book)}
                          className={`px-2.5 py-1 text-xs rounded transition-all flex items-center gap-1 cursor-pointer font-medium ${
                            inMyFav
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-stone-900 hover:bg-amber-900 text-white'
                          }`}
                        >
                          {inMyFav ? (
                            <>
                              <BookmarkCheck className="w-3 h-3 text-amber-800" />
                              <span>Kitaplığınızda Ekli</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="w-3 h-3" />
                              <span>Favorilerime Ekle</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: User Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-5">
          {userPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-10 text-center">
              <p className="text-xs text-stone-500">
                Bu kullanıcının henüz yayınlanmış bir gönderisi bulunmuyor.
              </p>
            </div>
          ) : (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {/* TAB 3: Reading List & Genre Breakdown */}
      {activeTab === 'reading_list' && (
        <div className="bg-white rounded-xl border border-stone-200/90 p-5 sm:p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base mb-3">
              Tür Dağılımı
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(genreCounts).map(([genre, count]) => {
                const pct = Math.round((count / userFavorites.length) * 100);
                return (
                  <div key={genre} className="p-3 bg-stone-50 rounded-lg border border-stone-200/70">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-stone-800">{genre}</span>
                      <span className="font-mono text-amber-900 font-bold">{count} kitap</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-800 h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">%{pct} oran</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-stone-100 pt-5">
            <h3 className="font-serif font-bold text-stone-900 text-base mb-3">
              Okuma Durumuna Göre Kitaplar
            </h3>
            <div className="space-y-4">
              {['okudum', 'okuyorum', 'okuyacagim'].map((statusKey) => {
                const booksInStatus = userFavorites.filter((b) => b.status === statusKey);
                const labels: { [k: string]: string } = {
                  okudum: 'Tamamlanan Kitaplar (Okudum)',
                  okuyorum: 'Şu Anda Okunan Kitaplar (Okuyorum)',
                  okuyacagim: 'Okuma Listesindekiler (Okuyacağım)',
                };
                return (
                  <div key={statusKey} className="p-3.5 bg-stone-50/70 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-stone-800">
                        {labels[statusKey]}
                      </h4>
                      <span className="text-xs font-mono text-stone-500 font-medium">
                        {booksInStatus.length} adet
                      </span>
                    </div>
                    {booksInStatus.length === 0 ? (
                      <p className="text-[11px] text-stone-400 italic">Kayıt yok</p>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        {booksInStatus.map((b) => (
                          <span
                            key={b.id}
                            className="px-2.5 py-1 bg-white border border-stone-200 rounded text-xs text-stone-800"
                          >
                            {b.title} <span className="text-stone-400">({b.author})</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
