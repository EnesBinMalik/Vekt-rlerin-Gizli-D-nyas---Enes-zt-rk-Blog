import React, { useEffect } from 'react';
import { X, Briefcase, Heart, FileCheck, Info, Sparkles, ExternalLink, ShieldCheck, Code2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const SidebarDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    activePage,
    setActivePage,
    favorites,
    appliedJobs,
    setSelectedJob,
    setSelectedCategory
  } = useJobs();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  const navigateTo = (page: 'jobs' | 'favorites' | 'applied' | 'about') => {
    setSelectedJob(null);
    setActivePage(page);
    setIsDrawerOpen(false);
  };

  const handleCategoryShortcut = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedJob(null);
    setActivePage('jobs');
    setIsDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out border-r border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              kw
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                kodwork<span className="text-indigo-600">.</span>
              </h2>
              <p className="text-xs text-slate-500">İş Arama Platformu</p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Main Pages */}
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Sayfalar
            </p>
            <nav className="space-y-1">
              <button
                onClick={() => navigateTo('jobs')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === 'jobs'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className={`w-4 h-4 ${activePage === 'jobs' ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>İş Listesi</span>
                </div>
                <span className="text-xs text-slate-400">Tüm İlanlar</span>
              </button>

              <button
                onClick={() => navigateTo('favorites')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === 'favorites'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className={`w-4 h-4 ${activePage === 'favorites' ? 'text-rose-600' : 'text-slate-500'}`} />
                  <span>Favoriler</span>
                </div>
                {favorites.length > 0 ? (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-700 tabular-nums">
                    {favorites.length}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 tabular-nums">0</span>
                )}
              </button>

              <button
                onClick={() => navigateTo('applied')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === 'applied'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileCheck className={`w-4 h-4 ${activePage === 'applied' ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>Başvurulan İşler</span>
                </div>
                {appliedJobs.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-700 tabular-nums">
                    {appliedJobs.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateTo('about')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === 'about'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className={`w-4 h-4 ${activePage === 'about' ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>Proje & Künye</span>
                </div>
                <span className="text-xs text-indigo-600 font-medium">Enes Öztürk</span>
              </button>
            </nav>
          </div>

          {/* Quick Category Filters */}
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Popüler Kategoriler
            </p>
            <div className="space-y-1">
              {[
                { name: 'Yazılım Mühendisliği', key: 'Software Engineering' },
                { name: 'Veri Bilimi & AI', key: 'Data Science' },
                { name: 'Tasarım & UX', key: 'Design & UX' },
                { name: 'DevOps & Bulut', key: 'DevOps' },
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryShortcut(cat.key)}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-slate-300">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Developer & Assignment Signature */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Geliştirici İmzası</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">Enes Öztürk</p>
            <p className="text-xs text-slate-500 mt-0.5">
              kodwork Projesi · Patika & Kodluyoruz
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Tüm telif hakları saklıdır.</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>The Muse API v2</span>
          <a
            href="https://www.themuse.com/developers/api/v2"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline flex items-center gap-1"
          >
            API Dokümanı <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>
    </div>
  );
};
