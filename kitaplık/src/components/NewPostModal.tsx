import React, { useState, useRef } from 'react';
import {
  X,
  PenSquare,
  Star,
  Image as ImageIcon,
  Quote,
  EyeOff,
  Upload,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookGenre, ALL_GENRES } from '../types';

export const NewPostModal: React.FC = () => {
  const { isNewPostModalOpen, setIsNewPostModalOpen, createPost, showToast } = useApp();

  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState<BookGenre>('Roman');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [quote, setQuote] = useState('');
  const [pageCount, setPageCount] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [readStatus, setReadStatus] = useState<'okudum' | 'okuyorum' | 'okuyacagim'>('okudum');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isNewPostModalOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showToast('Dosya Çok Büyük', 'Fotoğraf boyutu 4MB altında olmalıdır.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          showToast('Fotoğraf Eklendi', 'Kitap fotoğrafı başarıyla yüklendi.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const presetPhotos = [
    {
      title: 'Açık Kitap & Kahve',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Klasik Kütüphane Rafı',
      url: 'https://images.unsplash.com/photo-1507842229458-57790b9b3986?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Eski Sayfalar & Gözlük',
      url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !bookAuthor.trim() || !content.trim()) {
      showToast('Eksik Bilgi', 'Kitap adı, yazar adı ve inceleme metni zorunludur.', 'error');
      return;
    }

    createPost({
      bookTitle,
      bookAuthor,
      bookGenre,
      rating,
      content,
      quote: quote.trim() || undefined,
      pageCount: pageCount ? parseInt(pageCount, 10) : undefined,
      photoUrl: photoUrl || undefined,
      isSpoiler,
      readStatus,
    });

    // Reset fields
    setBookTitle('');
    setBookAuthor('');
    setContent('');
    setQuote('');
    setPhotoUrl('');
    setIsSpoiler(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 relative my-6">
        <button
          onClick={() => setIsNewPostModalOpen(false)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1 text-amber-900">
          <PenSquare className="w-5 h-5" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Kitap İncelemesi Paylaş
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-5">
          Okuduğunuz kitap hakkında duygu ve düşüncelerinizi, alıntıları ve fotoğrafları toplulukla paylaşın.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Kitap & Yazar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Kitap Adı <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Örn: 1984"
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
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="Örn: George Orwell"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>
          </div>

          {/* Tür, Durum ve Puan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Tür</label>
              <select
                value={bookGenre}
                onChange={(e) => setBookGenre(e.target.value as BookGenre)}
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
              <label className="block font-semibold text-stone-700 mb-1">Durum</label>
              <select
                value={readStatus}
                onChange={(e) => setReadStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              >
                <option value="okudum">Bitirdim (Okudum)</option>
                <option value="okuyorum">Okuyorum</option>
                <option value="okuyacagim">Okuyacağım</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Puanınız</label>
              <div className="flex items-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-0.5 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-semibold text-stone-700 ml-1">
                  {rating}.0
                </span>
              </div>
            </div>
          </div>

          {/* İnceleme Metni */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              İnceleme & Düşünceleriniz <span className="text-rose-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Kitap sizde nasıl bir his bıraktı? Karakterler, dil ve olay örgüsü hakkında ne düşünüyorsunuz?"
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 leading-relaxed"
            />
          </div>

          {/* Alıntı Ekleme */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-amber-800" />
              <span>Kitaptan Sevilen Alıntı (İsteğe Bağlı)</span>
            </label>
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Örn: 'Geçmişi denetleyen geleceği denetler; bugünü denetleyen geçmişi denetler.'"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 italic font-serif"
            />
          </div>

          {/* Fotoğraf Ekleme Alanı (Device upload + presets + URL) */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
                <span>Gönderiye Fotoğraf Ekle</span>
              </label>
              {photoUrl && (
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="text-[11px] text-rose-600 hover:underline"
                >
                  Fotoğrafı Kaldır
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {photoUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-stone-200 max-h-40 bg-stone-900">
                <img
                  src={photoUrl}
                  alt="Seçilen kitap fotoğrafı"
                  className="w-full h-40 object-cover"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 bg-white border border-dashed border-stone-300 hover:border-amber-700 rounded-lg text-stone-700 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-stone-500" />
                    <span>Cihazdan Fotoğraf Yükle</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span>Veya estetik hazır görsel seçin:</span>
                  {presetPhotos.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoUrl(preset.url)}
                      className="px-2 py-0.5 bg-white border border-stone-200 rounded hover:border-amber-700 text-stone-700 transition-colors"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Spoiler Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="spoilerCheck"
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="rounded border-stone-300 text-amber-900 focus:ring-amber-800 w-4 h-4"
            />
            <label
              htmlFor="spoilerCheck"
              className="text-stone-700 text-xs select-none cursor-pointer flex items-center gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5 text-amber-800" />
              <span>Bu inceleme spoiler (sürprizbozan) içeriyor (okurlar butona basarak açar)</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer font-medium"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer"
            >
              İncelemeyi Yayınla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
