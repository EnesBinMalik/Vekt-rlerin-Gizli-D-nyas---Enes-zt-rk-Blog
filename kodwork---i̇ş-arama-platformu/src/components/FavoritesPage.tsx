import React from 'react';
import { Heart, Trash2, ArrowRight, Briefcase, Building, MapPin, CheckCircle2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { Job } from '../types/job';

export const FavoritesPage: React.FC = () => {
  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    openJobDetail,
    setActivePage,
    setApplyingForJob,
    isApplied
  } = useJobs();

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-in fade-in duration-200">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Henüz Favori İlanınız Bulunmuyor
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          İş Listesi sayfasındaki ilanların üzerindeki kalp ikonuna tıklayarak ilgilendiğiniz iş fırsatlarını bu listeye ekleyebilirsiniz.
        </p>
        <button
          onClick={() => setActivePage('jobs')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          <span>İş Listesine Göz At</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Favori İş İlanlarım
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 tabular-nums">
              {favorites.length} İlan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kaydettiğiniz pozisyonları buradan yönetebilir, inceleyebilir veya kaldırabilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('jobs')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            + Daha Fazla İlan Ekle
          </button>
          <button
            onClick={clearFavorites}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tümünü Temizle</span>
          </button>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {favorites.map((job: Job) => {
          const applied = isApplied(job.id);
          const locationsText = job.locations?.map(l => l.name).join(', ') || 'Konum Belirtilmemiş';
          const levelsText = job.levels?.map(l => l.name).join(', ') || '';

          return (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
                    <Building className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate max-w-[180px]">{job.company?.name || 'Şirket'}</span>
                  </div>

                  <button
                    onClick={() => removeFromFavorites(job.id)}
                    title="Favorilerden Kaldır"
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  onClick={() => openJobDetail(job)}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 mb-2"
                >
                  {job.name}
                </h3>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-4">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px]">{locationsText}</span>
                  </span>
                  {levelsText && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{levelsText}</span>
                    </>
                  )}
                  {job.salary_range && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-medium text-slate-700">{job.salary_range}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => openJobDetail(job)}
                  className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
                >
                  Detayları Gör
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2">
                  {applied ? (
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Başvuruldu
                    </span>
                  ) : (
                    <button
                      onClick={() => setApplyingForJob(job)}
                      className="px-3 py-1 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      Başvur
                    </button>
                  )}
                  <button
                    onClick={() => removeFromFavorites(job.id)}
                    className="text-xs text-rose-600 hover:underline px-1 py-1"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
