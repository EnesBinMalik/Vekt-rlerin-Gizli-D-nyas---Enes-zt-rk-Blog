import React from 'react';
import { BookMarked, Heart, Sparkles, Feather } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentTab, setSelectedUserProfile, users } = useApp();

  const enesUser = users.find((u) => u.username === 'enes_ozturk');

  return (
    <footer className="mt-16 bg-[#f5f0ea] border-t border-stone-300/80 text-stone-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Signature Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-200 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                Kitaplık
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Kitap severlerin okudukları eserler hakkında samimi incelemeler paylaştığı,
              kütüphanelerini birbiriyle buluşturduğu ve kelimelerin dünyasında kaybolduğu edebiyat
              platformu.
            </p>

            {/* Signature Box */}
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-950 font-serif">
              <Feather className="w-4 h-4 text-amber-800" />
              <span>
                <strong className="font-bold">Enes Öztürk</strong> İmzalı Eser
              </span>
              <span className="text-stone-400">·</span>
              <button
                onClick={() => {
                  if (enesUser) {
                    setSelectedUserProfile(enesUser);
                    setCurrentTab('profile');
                  }
                }}
                className="text-amber-800 hover:text-stone-900 underline underline-offset-2 transition-colors cursor-pointer font-sans text-[11px]"
              >
                Geliştirici Profilini Görüntüle
              </button>
            </div>
          </div>

          {/* Literary Quote Column */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
              Günün Başucu Alıntısı
            </h4>
            <blockquote className="font-serif italic text-xs text-stone-800 leading-relaxed border-l-2 border-amber-800 pl-3 py-0.5">
              "Bir kitap, içimizdeki donmuş denizi parçalayacak bir balta olmalıdır. Eğer okuduğumuz
              bir kitap bizi bir darbeyle sarsmıyorsa, niye okuyalım ki?"
            </blockquote>
            <p className="text-[11px] text-stone-500 font-medium pl-3">— Franz Kafka</p>
          </div>

          {/* Fast Navigation */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-stone-500 font-sans">
              Hızlı Gezinti
            </h4>
            <ul className="space-y-1.5 text-stone-600">
              <li>
                <button
                  onClick={() => setCurrentTab('feed')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Okuma Akışı & İncelemeler
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('explore')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Tüm Kitaplar & Tür Araması
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('favorites')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Kişisel Favori Kitaplığım
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('community')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Okur Topluluğu & Kütüphaneler
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright hairline */}
        <div className="mt-10 pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 Kitaplık. Tüm hakları saklıdır. Enes Öztürk tarafından kitap tutkunları için sevgiyle geliştirildi.</p>
          <div className="flex items-center gap-1 text-stone-600">
            <span>Edebiyatla ve</span>
            <Heart className="w-3 h-3 text-rose-600 fill-rose-600 inline" />
            <span>kitap aşkıyla hazırlandı</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
