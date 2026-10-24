import React, { useState } from 'react';
import { X, BookOpen, Star, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookGenre, ALL_GENRES, ReadingStatus } from '../types';

export const AddFavoriteModal: React.FC = () => {
  const { isAddFavoriteModalOpen, setIsAddFavoriteModalOpen, addFavoriteBook } = useApp();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<BookGenre>('Roman');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<ReadingStatus>('okudum');
  const [pageCount, setPageCount] = useState<string>('');
  const [reviewNote, setReviewNote] = useState('');
  const [favoriteQuote, setFavoriteQuote] = useState('');
  const [coverColor, setCoverColor] = useState('from-amber-900 via-stone-800 to-amber-950');

  if (!isAddFavoriteModalOpen) return null;

  const colorPalettes = [
    { label: 'Kehribar & Ceviz', value: 'from-amber-900 via-stone-800 to-amber-950' },
    { label: 'Zümrüt Yeşili', value: 'from-emerald-950 via-teal-900 to-stone-900' },
    { label: 'Bordo & Gece', value: 'from-rose-950 via-stone-900 to-black' },
    { label: 'Gece Mavisi & Lapis', value: 'from-indigo-950 via-slate-900 to-stone-900' },
    { label: 'Koyu Grafit & Kömür', value: 'from-stone-900 via-stone-800 to-black' },
    { label: 'Kızıl Toprak & Çöl', value: 'from-orange-950 via-amber-950 to-stone-950' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const success = addFavoriteBook({
      title,
      author,
      genre,
      rating,
      status,
      pageCount: pageCount ? parseInt(pageCount, 10) : undefined,
      coverColor,
      reviewNote,
      favoriteQuote,
    });

    if (success) {
      // Reset
      setTitle('');
      setAuthor('');
      setReviewNote('');
      setFavoriteQuote('');
      setPageCount('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative my-8">
        <button
          onClick={() => setIsAddFavoriteModalOpen(false)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-1 text-amber-900">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-serif text-xl font-bold text-stone-900">Favori Kitap Ekle</h2>
        </div>
        <p className="text-xs text-stone-500 mb-5">
          Kitaplığınızda sergilenecek ve diğer okurlarla paylaşılabilecek favori eserinizi ekleyin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Kitap Adı & Yazar Adı (Enforced by requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Kitap Adı <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Saatleri Ayarlama Enstitüsü"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Yazar Adı <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Örn: Ahmet Hamdi Tanpınar"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>
          </div>

          {/* Tür (Enforced by requirement) & Okuma Durumu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Kitap Türü <span className="text-rose-600">*</span>
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as BookGenre)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 font-medium"
              >
                {ALL_GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Okuma Durumu</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ReadingStatus)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              >
                <option value="okudum">Okudum (Bitirdim)</option>
                <option value="okuyorum">Şu Anda Okuyorum</option>
                <option value="okuyacagim">Okuma Listemde (Okuyacağım)</option>
              </select>
            </div>
          </div>

          {/* Puanlama & Sayfa Sayısı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Puanınız</label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-stone-700 ml-1">
                  {rating}/5
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Sayfa Sayısı</label>
              <input
                type="number"
                min="1"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                placeholder="Örn: 382"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>
          </div>

          {/* Kapak Görünümü / Rengi */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Kapak Cilt Teması
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorPalettes.map((cp) => (
                <button
                  key={cp.value}
                  type="button"
                  onClick={() => setCoverColor(cp.value)}
                  className={`p-2 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    coverColor === cp.value
                      ? 'border-amber-800 bg-amber-50 ring-1 ring-amber-800'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${cp.value} shrink-0`}
                  />
                  <span className="text-[10px] text-stone-700 font-medium truncate">
                    {cp.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Kişisel İnceleme / Not */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Kişisel Not / Kısa İnceleme
            </label>
            <textarea
              rows={2}
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="Bu kitap sizde nasıl bir his bıraktı? Neden favoriniz?"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
            />
          </div>

          {/* En Sevilen Alıntı */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              En Sevdiğiniz Alıntı
            </label>
            <input
              type="text"
              value={favoriteQuote}
              onChange={(e) => setFavoriteQuote(e.target.value)}
              placeholder="Örn: 'Düşünüyorum, öyleyse varım değil; düşlüyorum, öyleyse varım.'"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 italic font-serif"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddFavoriteModalOpen(false)}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Kitaplığıma Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
