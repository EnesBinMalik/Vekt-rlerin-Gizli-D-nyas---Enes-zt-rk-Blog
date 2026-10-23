import React from 'react';
import { Heart, MapPin, Building, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Job } from '../types/job';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { openJobDetail, addToFavorites, removeFromFavorites, isFavorite, isApplied } = useJobs();

  const favorited = isFavorite(job.id);
  const applied = isApplied(job.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorites(job.id);
    } else {
      addToFavorites(job);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Extract clean text preview from HTML contents
  const getTextPreview = (html: string) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.trim().slice(0, 160) + (text.length > 160 ? '...' : '');
  };

  const locationsText = job.locations?.map(l => l.name).join(', ') || 'Konum Belirtilmemiş';
  const levelsText = job.levels?.map(l => l.name).join(', ') || '';
  const categoriesText = job.categories?.map(c => c.name).join(', ') || '';

  return (
    <article
      onClick={() => openJobDetail(job)}
      className="group relative bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-5 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Row: Company & Favorite Action */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
            <Building className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate max-w-[220px]">{job.company?.name || 'Gizli Şirket'}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {applied && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Başvuruldu
              </span>
            )}
            <button
              onClick={handleFavoriteClick}
              aria-label={favorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              className={`p-1.5 rounded-lg transition-colors ${
                favorited
                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                  : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 mb-3">
          {job.name}
        </h3>

        {/* Unboxed Metadata (Zero-pill discipline with typographic separators) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-3.5">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[180px]">{locationsText}</span>
          </span>

          {levelsText && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{levelsText}</span>
            </>
          )}

          {categoriesText && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="truncate max-w-[140px]">{categoriesText}</span>
            </>
          )}

          {job.salary_range && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-medium text-slate-700">{job.salary_range}</span>
            </>
          )}
        </div>

        {/* Short Text Preview */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {getTextPreview(job.contents)}
        </p>
      </div>

      {/* Bottom Footer Row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="w-3 h-3" />
          <time dateTime={job.publication_date}>{formatDate(job.publication_date)}</time>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
          İlanı İncele
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
