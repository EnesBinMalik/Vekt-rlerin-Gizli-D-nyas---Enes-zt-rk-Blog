import React from 'react';
import { Menu, Heart, Briefcase, FileCheck, Info } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setIsDrawerOpen,
    favorites,
    appliedJobs,
    setSelectedJob
  } = useJobs();

  const handleNav = (page: 'jobs' | 'favorites' | 'applied' | 'about') => {
    setSelectedJob(null);
    setActivePage(page);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Menüyü Aç"
            className="p-2 -ml-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNav('jobs')}
            className="text-left group flex items-center gap-2 focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              kodwork<span className="text-indigo-600">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-normal text-slate-400 border-l border-slate-200 pl-2">
              İş & Kariyer
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleNav('jobs')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 py-1 ${
              activePage === 'jobs'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>İş Listesi</span>
          </button>

          <button
            onClick={() => handleNav('favorites')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 py-1 ${
              activePage === 'favorites'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favoriler</span>
            {favorites.length > 0 && (
              <span className="text-xs font-semibold px-1.5 py-0.2 bg-rose-100 text-rose-700 rounded-full tabular-nums">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('applied')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 py-1 ${
              activePage === 'applied'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Başvurular</span>
            {appliedJobs.length > 0 && (
              <span className="text-xs font-semibold px-1.5 py-0.2 bg-emerald-100 text-emerald-700 rounded-full tabular-nums">
                {appliedJobs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 py-1 ${
              activePage === 'about'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Proje & Künye</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('favorites')}
            className="md:hidden relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Favoriler"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Menü</span>
          </button>
        </div>
      </div>
    </header>
  );
};
