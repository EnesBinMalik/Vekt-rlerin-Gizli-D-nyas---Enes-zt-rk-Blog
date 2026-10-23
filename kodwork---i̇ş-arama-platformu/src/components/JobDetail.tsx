import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import {
  ArrowLeft,
  Heart,
  Send,
  Building,
  MapPin,
  Calendar,
  Share2,
  ExternalLink,
  Code2,
  Eye,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const JobDetail: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isApplied,
    setApplyingForJob,
    showToast
  } = useJobs();

  const [viewRawHtml, setViewRawHtml] = useState(false);

  // If no job selected, return nothing
  if (!selectedJob) return null;

  const favorited = isFavorite(selectedJob.id);
  const applied = isApplied(selectedJob.id);

  // Sanitize the HTML coming from The Muse API safely
  const sanitizedHtml = useMemo(() => {
    if (!selectedJob.contents) return '<p>İlan detay açıklaması bulunamadı.</p>';
    return DOMPurify.sanitize(selectedJob.contents, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target', 'rel']
    });
  }, [selectedJob.contents]);

  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFromFavorites(selectedJob.id);
    } else {
      addToFavorites(selectedJob);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('İlan bağlantısı panoya kopyalandı!', 'success');
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const locationsText = selectedJob.locations?.map(l => l.name).join(', ') || 'Belirtilmemiş';
  const levelsText = selectedJob.levels?.map(l => l.name).join(', ') || 'Tüm Seviyeler';
  const categoriesText = selectedJob.categories?.map(c => c.name).join(', ') || 'Genel';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setSelectedJob(null)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>İş Listesine Geri Dön</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors text-xs inline-flex items-center gap-1.5"
            title="İlanı Paylaş"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Main Job Hero Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Building className="w-4 h-4" />
              <span>{selectedJob.company?.name || 'Şirket Belirtilmemiş'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {selectedJob.name}
            </h1>

            {/* Zero-pill metadata with subtle separators */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{locationsText}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>{levelsText}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{formatDate(selectedJob.publication_date)}</span>
              </span>
              {selectedJob.salary_range && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-semibold text-slate-900">{selectedJob.salary_range}</span>
                </>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                favorited
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600 text-rose-600' : 'text-slate-500'}`} />
              <span>{favorited ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}</span>
            </button>

            {/* Apply Button */}
            <button
              onClick={() => setApplyingForJob(selectedJob)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs transition-all ${
                applied
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              }`}
            >
              {applied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Başvuru Yapıldı</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Hemen Başvur</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* External Muse link if available */}
        {selectedJob.refs?.landing_page && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Orijinal The Muse İlanı:</span>
            <a
              href={selectedJob.refs.landing_page}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium"
            >
              The Muse Sayfasında İncele
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* HTML Description Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Toggle between Rendered HTML and Raw HTML Inspector */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Pozisyon Detayları ve Açıklaması
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The Muse API üzerinden HTML formatında iletilen ilan metni
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewRawHtml(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                !viewRawHtml ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Biçimlendirilmiş</span>
            </button>
            <button
              onClick={() => setViewRawHtml(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                viewRawHtml ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ham HTML</span>
            </button>
          </div>
        </div>

        {/* Content View */}
        {viewRawHtml ? (
          <div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 mb-4">
              <strong>HTML Denetçisi:</strong> The Muse API&apos;den gelen raw HTML çıktısı aşağıdadır. Uygulamamız bu içeriği DOMPurify ile sterilize edip Tailwind prose stiliyle güvenle render etmektedir.
            </div>
            <pre className="p-4 bg-slate-900 text-slate-200 text-xs font-mono rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {selectedJob.contents}
            </pre>
          </div>
        ) : (
          <div
            className="kodwork-prose"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        )}
      </div>

      {/* Floating Application Bar for Quick Action */}
      <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-950">
            Bu pozisyon aradığınız kariyere uygun mu?
          </p>
          <p className="text-xs text-indigo-700">
            kodwork üzerinden hemen başvurunuzu iletebilir veya sonra incelemek üzere favorilerinize ekleyebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleFavoriteToggle}
            className="px-3.5 py-2 text-xs font-semibold text-indigo-900 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {favorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          </button>
          <button
            onClick={() => setApplyingForJob(selectedJob)}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            {applied ? 'Tekrar Başvur' : 'Pozisyona Başvur'}
          </button>
        </div>
      </div>
    </div>
  );
};
