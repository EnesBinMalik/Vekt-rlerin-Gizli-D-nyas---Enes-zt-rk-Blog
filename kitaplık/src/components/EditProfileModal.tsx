import React, { useState } from 'react';
import { X, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [favoriteQuote, setFavoriteQuote] = useState(currentUser?.favoriteQuote || '');
  const [favoriteQuoteAuthor, setFavoriteQuoteAuthor] = useState(
    currentUser?.favoriteQuoteAuthor || ''
  );
  const [readingTarget, setReadingTarget] = useState<number>(
    currentUser?.readingGoal.target || 30
  );

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name,
      bio,
      location,
      favoriteQuote,
      favoriteQuoteAuthor,
      readingGoal: {
        ...currentUser.readingGoal,
        target: readingTarget,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative my-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-xl font-bold text-stone-900 mb-1">Profili Düzenle</h2>
        <p className="text-xs text-stone-500 mb-5">
          Profil bilgilerinizi, edebiyat alıntınızı ve okuma hedefinizi güncelleyin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Konum</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Örn: İstanbul, Türkiye"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Biyografi</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Favori Alıntı (Başucu Sözü)
            </label>
            <input
              type="text"
              value={favoriteQuote}
              onChange={(e) => setFavoriteQuote(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 italic font-serif"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Alıntının Sahibi</label>
              <input
                type="text"
                value={favoriteQuoteAuthor}
                onChange={(e) => setFavoriteQuoteAuthor(e.target.value)}
                placeholder="Örn: Franz Kafka"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                2026 Okuma Hedefi (Kitap)
              </label>
              <input
                type="number"
                min="1"
                max="300"
                value={readingTarget}
                onChange={(e) => setReadingTarget(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
