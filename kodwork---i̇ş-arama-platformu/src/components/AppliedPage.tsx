import React from 'react';
import { FileCheck, Building, Calendar, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const AppliedPage: React.FC = () => {
  const { appliedJobs, openJobById, setActivePage } = useJobs();

  if (appliedJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-in fade-in duration-200">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <FileCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Henüz Bir Başvurunuz Bulunmuyor
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          İş ilanlarının detay sayfasındaki &ldquo;Hemen Başvur&rdquo; butonunu kullanarak özgeçmiş ve bilgilerinizi iletebilirsiniz.
        </p>
        <button
          onClick={() => setActivePage('jobs')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
        >
          <span>Açık Pozisyonları İncele</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="pb-6 mb-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Başvurulan İşler
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tabular-nums">
              {appliedJobs.length} Başvuru
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bu oturumda ve tarayıcınızda kayıtlı iş başvurularınızın takip listesi.
          </p>
        </div>

        <button
          onClick={() => setActivePage('jobs')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          + Yeni İlanlara Başvur
        </button>
      </div>

      <div className="space-y-4">
        {appliedJobs.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <Building className="w-3.5 h-3.5" />
                <span>{app.companyName}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {app.jobTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>Başvuran: <strong className="text-slate-700">{app.applicantName}</strong></span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>E-posta: {app.applicantEmail}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <time>{formatDate(app.appliedAt)}</time>
                </span>
              </div>
              {app.coverLetter && (
                <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 line-clamp-2 mt-2">
                  &ldquo;{app.coverLetter}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <CheckCircle className="w-3.5 h-3.5" />
                {app.status}
              </span>

              <button
                onClick={() => openJobById(app.jobId)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>İlanı Gör</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
