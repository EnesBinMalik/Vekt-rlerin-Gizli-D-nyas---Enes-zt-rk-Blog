import React, { useState } from 'react';
import { X, Send, Paperclip, CheckCircle2, Building, Briefcase } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const ApplyModal: React.FC = () => {
  const { applyingForJob, setApplyingForJob, applyToJob } = useJobs();

  const [name, setName] = useState('Enes Öztürk');
  const [email, setEmail] = useState('enes.ozturk@example.com');
  const [phone, setPhone] = useState('+90 555 123 45 67');
  const [portfolio, setPortfolio] = useState('https://github.com/enes-ozturk');
  const [coverLetter, setCoverLetter] = useState(
    'Merhaba, pozisyon için aranan kriterleri inceledim. Geliştirici tecrübem ve teknik yetkinliklerim ile ekibinize değer katabileceğime inanıyorum.'
  );
  const [resumeName, setResumeName] = useState('Enes_Ozturk_CV.pdf');
  const [submitting, setSubmitting] = useState(false);

  if (!applyingForJob) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    setTimeout(() => {
      applyToJob({
        job: applyingForJob,
        applicantName: name,
        applicantEmail: email,
        applicantPhone: phone,
        portfolioUrl: portfolio,
        coverLetter: coverLetter,
        resumeFileName: resumeName
      });
      setSubmitting(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setApplyingForJob(null)}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
          {/* Modal Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-1">
                <Building className="w-3.5 h-3.5" />
                <span>{applyingForJob.company?.name || 'Şirket'}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                İş Başvurusu: {applyingForJob.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bilgilerinizi doldurarak doğrudan şirket değerlendirme havuzuna iletin.
              </p>
            </div>
            <button
              onClick={() => setApplyingForJob(null)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub / LinkedIn / Web
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Resume Upload Simulation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Özgeçmiş (CV) Dosyası
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
                <Paperclip className="w-4 h-4 text-indigo-600" />
                <span className="text-xs text-slate-700 font-medium truncate flex-1">
                  {resumeName}
                </span>
                <label className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                  <span>Değiştir</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setResumeName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ön Yazı / Kısa Not
              </label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Şirkete iletmek istediğiniz ön yazı veya motivasyon notu..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setApplyingForJob(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
