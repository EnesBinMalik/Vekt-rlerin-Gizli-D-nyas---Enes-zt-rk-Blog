import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  BookmarkPlus,
  BookmarkCheck,
  Share2,
  Trash2,
  Star,
  Quote,
  Eye,
  EyeOff,
  Send,
  Sparkles,
} from 'lucide-react';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import { BookCover } from './BookCover';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    currentUser,
    users,
    toggleLikePost,
    deletePost,
    addComment,
    addFavoriteBook,
    isBookInMyFavorites,
    viewUserProfile,
    showToast,
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showSpoiler, setShowSpoiler] = useState(!post.isSpoiler);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const isMine = currentUser?.id === post.userId;
  const isInMyFavorites = isBookInMyFavorites(post.bookTitle, post.bookAuthor);

  const authorUser = users.find((u) => u.id === post.userId);

  const handleAuthorClick = () => {
    if (authorUser) {
      viewUserProfile(authorUser);
    }
  };

  const handleAddBookToFavorites = () => {
    if (isInMyFavorites) {
      showToast('Kitaplığınızda Ekli', `"${post.bookTitle}" zaten favori listenizde bulunuyor.`, 'info');
      return;
    }
    addFavoriteBook({
      title: post.bookTitle,
      author: post.bookAuthor,
      genre: post.bookGenre,
      rating: post.rating,
      status: post.readStatus || 'okudum',
      pageCount: post.pageCount,
      favoriteQuote: post.quote,
      reviewNote: post.content.slice(0, 150) + (post.content.length > 150 ? '...' : ''),
    });
  };

  const handleShare = () => {
    const textToCopy = `Kitaplık'ta ${post.userName}'in "${post.bookTitle}" (${post.bookAuthor}) incelemesi:\n"${post.content.slice(0, 100)}..."`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      showToast('Bağlantı Kopyalandı', 'Gönderi metni panoya kopyalandı.', 'success');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
      {/* Header with User Info */}
      <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleAuthorClick}
            className="relative group shrink-0 cursor-pointer"
          >
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="w-10 h-10 rounded-full border border-stone-200 bg-amber-50 object-cover group-hover:ring-2 group-hover:ring-amber-800 transition-all"
            />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleAuthorClick}
                className="font-medium text-stone-900 hover:text-amber-900 transition-colors text-sm cursor-pointer"
              >
                {post.userName}
              </button>
              <span className="text-xs text-stone-600 font-mono">@{post.userUsername}</span>
              {post.userBadge && (
                <span className="text-[10px] font-medium text-amber-800 tracking-wide">
                  · {post.userBadge}
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-600 flex items-center gap-1.5 mt-0.5">
              <span>{post.createdAt}</span>
              <span aria-hidden="true">·</span>
              <span>Okuma İncelemesi</span>
            </div>
          </div>
        </div>

        {isMine && (
          <button
            onClick={() => deletePost(post.id)}
            className="text-stone-600 hover:text-rose-600 p-1.5 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
            title="Gönderiyi sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Book Spotlight Banner */}
      <div className="mx-4 sm:mx-5 p-3.5 bg-stone-50/90 rounded-lg border border-stone-200/70 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <BookCover
            title={post.bookTitle}
            author={post.bookAuthor}
            genre={post.bookGenre}
            size="sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-stone-600 mb-0.5">
              <span className="font-medium text-amber-900">{post.bookGenre}</span>
              {post.pageCount && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.pageCount} sayfa</span>
                </>
              )}
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug truncate">
              {post.bookTitle}
            </h3>
            <p className="text-xs text-stone-600 truncate">{post.bookAuthor}</p>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= post.rating
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              ))}
              <span className="text-xs font-mono font-semibold text-stone-700 ml-1">
                {post.rating}.0
              </span>
            </div>
          </div>
        </div>

        {/* Quick Add to My Favorites Action */}
        <button
          onClick={handleAddBookToFavorites}
          className={`shrink-0 p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            isInMyFavorites
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200 shadow-xs hover:border-amber-700'
          }`}
          title={isInMyFavorites ? 'Kitaplığınızda ekli' : 'Kendi favorilerime ekle'}
        >
          {isInMyFavorites ? (
            <>
              <BookmarkCheck className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">Kitaplığımda</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Kitaplığıma Ekle</span>
            </>
          )}
        </button>
      </div>

      {/* Main Review Content & Spoiler Handling */}
      <div className="p-4 sm:p-5 pt-3">
        {post.isSpoiler && !showSpoiler ? (
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-center my-2">
            <p className="text-xs font-semibold text-amber-900 mb-1 flex items-center justify-center gap-1.5">
              <EyeOff className="w-4 h-4 text-amber-800" />
              Bu inceleme sürprizbozan (spoiler) içeriyor
            </p>
            <p className="text-xs text-amber-800/80 mb-2">
              Kitabın sonu veya kilit olayları hakkında bilgi yer alabilir.
            </p>
            <button
              onClick={() => setShowSpoiler(true)}
              className="text-xs font-medium px-3 py-1.5 bg-amber-800 text-white rounded hover:bg-amber-900 transition-colors cursor-pointer"
            >
              Yine de İncelemeyi Göster
            </button>
          </div>
        ) : (
          <>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {post.content}
            </p>

            {/* Favorite / Memorable Quote Card */}
            {post.quote && (
              <div className="my-3.5 p-3.5 bg-stone-50 rounded-lg border-l-2 border-amber-700 text-stone-800 italic font-serif text-sm relative">
                <Quote className="w-4 h-4 text-amber-700/40 absolute top-2 right-2" />
                <p className="pr-6">"{post.quote}"</p>
                <div className="text-[11px] font-sans font-medium text-stone-500 mt-1 not-italic">
                  — {post.bookTitle}, {post.bookAuthor}
                </div>
              </div>
            )}

            {/* Attached Photo */}
            {post.photoUrl && (
              <div className="mt-3 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={post.photoUrl}
                  alt={`${post.bookTitle} fotoğrafı`}
                  referrerPolicy="no-referrer"
                  onClick={() => setIsPhotoExpanded(!isPhotoExpanded)}
                  className={`w-full object-cover cursor-pointer hover:opacity-95 transition-all ${
                    isPhotoExpanded ? 'max-h-[600px]' : 'max-h-80'
                  }`}
                />
                <div className="p-1.5 px-3 bg-stone-50 text-[11px] text-stone-500 flex items-center justify-between">
                  <span>Paylaşılan Kitap Fotoğrafı</span>
                  <span className="text-[10px] text-stone-400">
                    {isPhotoExpanded ? 'Küçültmek için tıkla' : 'Büyütmek için tıkla'}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Bar (Like, Comment, Share) */}
      <div className="px-4 sm:px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 bg-stone-50/50">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => toggleLikePost(post.id)}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer group ${
              isLiked ? 'text-rose-600 font-semibold' : 'hover:text-rose-600 text-stone-600'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isLiked ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
            <span className="tabular-nums">{post.likes.length}</span>
            <span className="hidden sm:inline">Beğeni</span>
          </button>

          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer text-stone-600"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="tabular-nums">{post.comments.length}</span>
            <span className="hidden sm:inline">Yorum</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-stone-900 transition-colors p-1.5 rounded cursor-pointer"
            title="Alıntıyı Kopyala"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Expandable Comments Drawer */}
      {isCommentsOpen && (
        <div className="border-t border-stone-200 bg-stone-50/80 p-4 sm:p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            Yorumlar ({post.comments.length})
          </h4>

          {/* Comment List */}
          {post.comments.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-2">
              Henüz yorum yapılmamış. İlk düşünceyi sen paylaş!
            </p>
          ) : (
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-7 h-7 rounded-full border border-stone-200 object-cover mt-0.5"
                  />
                  <div className="flex-1 bg-white p-2.5 rounded-lg border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-stone-900">{comment.userName}</span>
                      <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-stone-700 leading-normal">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Düşüncelerini yaz..."
              className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-3.5 py-2 bg-stone-900 text-white rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-40 disabled:hover:bg-stone-900 cursor-pointer flex items-center gap-1 text-xs font-medium"
            >
              <Send className="w-3.5 h-3.5" />
              Gönder
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
