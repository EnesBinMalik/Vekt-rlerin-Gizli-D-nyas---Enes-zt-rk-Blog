import React from 'react';
import { Search, Filter, RefreshCw, X, AlertCircle, Briefcase, Sparkles } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobCard } from './JobCard';

export const JobsListPage: React.FC = () => {
  const {
    jobs,
    loading,
    error,
    isLiveApi,
    currentPage,
    totalPages,
    totalJobs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    selectedLocation,
    setSelectedLocation,
    changePage,
    refreshJobs
  } = useJobs();

  const categories = [
    { label: 'Tüm Kategoriler', value: 'all' },
    { label: 'Yazılım Mühendisliği', value: 'Software Engineering' },
    { label: 'Veri Bilimi & Yapay Zeka', value: 'Data Science' },
    { label: 'Tasarım & UX', value: 'Design & UX' },
    { label: 'DevOps & Bulut', value: 'DevOps' },
    { label: 'Yönetim & Liderlik', value: 'Management' }
  ];

  const levels = [
    { label: 'Tüm Seviyeler', value: 'all' },
    { label: 'Yeni Mezun / Giriş (Entry)', value: 'Entry Level' },
    { label: 'Orta Düzey (Mid)', value: 'Mid Level' },
    { label: 'Kıdemli (Senior)', value: 'Senior Level' },
    { label: 'Yönetici (Management)', value: 'Management' }
  ];

  const locations = [
    { label: 'Tüm Konumlar', value: 'all' },
    { label: 'Uzaktan / Remote', value: 'Remote' },
    { label: 'İstanbul', value: 'İstanbul' },
    { label: 'Hibrit', value: 'Hibrit' }
  ];

  const isFiltered = searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedLocation !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedLocation('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Hero Banner / Intro */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Sektördeki Açık Pozisyonlar
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 tabular-nums">
                {isLiveApi ? 'The Muse Canlı API' : 'Önbellek & Yerel Veri'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Kariyerini İleriye Taşıyacak İşi Bul
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Türkiye ve dünya çapındaki teknoloji şirketlerinin güncel iş ilanlarını keşfedin, detayları inceleyin ve hemen başvurun.
            </p>
          </div>

          {/* Quick Stats / Refresh */}
          <div className="flex items-center gap-3">
            <button
              onClick={refreshJobs}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Yenile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        {/* Search Row */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pozisyon, şirket adı veya anahtar kelime ile ara (örn: React, Trendyol, Senior, Go)..."
            className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtreler:</span>
          </div>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-medium outline-none focus:border-indigo-500"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Level Select */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-medium outline-none focus:border-indigo-500"
          >
            {levels.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>

          {/* Location Select */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 font-medium outline-none focus:border-indigo-500"
          >
            {locations.map(loc => (
              <option key={loc.value} value={loc.value}>{loc.label}</option>
            ))}
          </select>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-rose-600 hover:underline flex items-center gap-1 ml-auto"
            >
              <X className="w-3 h-3" />
              <span>Filtreleri Sıfırla</span>
            </button>
          )}
        </div>
      </div>

      {/* Notice if API fell back to cached curated jobs */}
      {error && !isLiveApi && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">The Muse API Bildirimi</p>
            <p className="text-amber-800 mt-0.5">
              The Muse API sunucusu doğrudan tarayıcı isteklerini sınırlandırdığı veya CORS uyguladığı için, platform kesintisiz çalışması amacıyla zengin yerel iş veritabanı aktif edildi. Tüm ilan detayları, HTML açıklamaları ve başvuru fonksiyonları eksiksiz çalışmaktadır.
            </p>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-500">
          Toplam <span className="text-slate-900 font-bold tabular-nums">{jobs.length}</span> ilan listeleniyor
        </p>
        <span className="text-xs text-slate-400 tabular-nums">
          Sayfa {currentPage} / {totalPages}
        </span>
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-4/5" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="h-10 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-1/4 pt-2" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Aramanıza Uygun İlan Bulunamadı
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Farklı anahtar kelimeler deneyebilir veya filtreleri temizleyerek tüm açık pozisyonları listeleyebilirsiniz.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Tüm İlanları Göster
          </button>
        </div>
      ) : (
        /* Job Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && !loading && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
          >
            ← Önceki Sayfa
          </button>

          <span className="text-xs font-medium text-slate-600 px-3 py-1 bg-slate-100 rounded-md tabular-nums">
            Sayfa {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
          >
            Sonraki Sayfa →
          </button>
        </div>
      )}
    </div>
  );
};
