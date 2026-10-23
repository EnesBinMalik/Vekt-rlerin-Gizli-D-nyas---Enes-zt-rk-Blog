import React from 'react';
import { Heart, ShieldCheck, Code, ExternalLink } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedJob } = useJobs();

  const handleNav = (page: 'jobs' | 'favorites' | 'applied' | 'about') => {
    setSelectedJob(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          {/* Brand & Signature Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                kodwork<span className="text-indigo-600">.</span>
              </span>
              <span className="text-xs text-slate-400 border-l border-slate-200 pl-2">
                İş Arama Platformu
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Yazılım geliştiricileri ve teknoloji profesyonelleri için sektördeki en yeni iş fırsatlarını listeleyen, The Muse API tabanlı modern kariyer platformu.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-600">
              <span>Geliştirici & Tasarımcı:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                Enes Öztürk
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Gezinme
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('jobs')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  İş Listesi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('favorites')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Favori İlanlarım
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('applied')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Başvuru Takibi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Proje Künyesi & Lisans
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Credits Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Yasal & API
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tüm Hakları Saklıdır</span>
              </li>
              <li>
                <a
                  href="https://www.themuse.com/developers/api/v2"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
                >
                  The Muse API v2 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="text-slate-400">
                Patika / Kodluyoruz
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 kodwork. Tüm hakları saklıdır. Bu proje Enes Öztürk tarafından geliştirilmiştir.</p>
          <p className="flex items-center gap-1">
            <span>Enes Öztürk ile özenle kodlandı</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
