import React, { useState } from 'react';
import { X, CheckCircle, Award, Code, Sparkles, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCount: number;
  totalCount: number;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  isOpen,
  onClose,
  activeCount,
  totalCount,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completedCount = totalCount - activeCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Ödev & Proje Detayları</h2>
              <p className="text-xs text-slate-400">
                Geliştirici: <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Submission Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
                  İnceleme & Değerlendirme (Review)
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Ödev teslimi için canlı bağlantıyı kopyalayabilir veya inceleyen kişiye sunabilirsiniz.
                </p>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'Linki Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Checklist of accomplished prompt requirements */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
              Tamamlanan Ödev İsterleri & Kriterleri
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">1. Kullanıcıdan Input Yakalama</strong>
                  <span className="text-xs text-slate-400">
                    Form kontrolü, Enter tuşu ile otomatik ekleme, boşluk doğrulaması ve öncelik seviyesi belirleme.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">2. Todo Tıklanınca Üzeri Çizili Stil & Checkbox</strong>
                  <span className="text-xs text-slate-400">
                    Tıklanınca özel SVG checkmark animasyonu, <code className="text-indigo-300">line-through</code> dekorasyonu ve zarif renk geçişi.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">3. Yukarıdaki Sayaç SADECE Aktif Kalan Todoları Belirtir</strong>
                  <span className="text-xs text-slate-400">
                    Üst başlıktaki sayaç tamamlanan görevleri saymaz, sadece bekleyen ({activeCount} aktif) görevleri yansıtır.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">4. EK ÖZELLİK: Basılı Tutunca (Long-Press) Todo'yu Komple Kaldır</strong>
                  <span className="text-xs text-slate-400">
                    750ms basılı tutulduğunda kırmızı dolum çubuğu ilerler ve görevi kalıcı olarak siler. Mobil dokunma & fare desteği, haptic titreşim ve Geri Al (Undo) seçeneği mevcuttur.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">5. Custom Component Disiplini</strong>
                  <span className="text-xs text-slate-400">
                    <code className="text-indigo-300">TodoHeader</code>, <code className="text-indigo-300">TodoInput</code>, <code className="text-indigo-300">TodoItem</code>, <code className="text-indigo-300">TodoList</code>, <code className="text-indigo-300">EnesSignature</code> ve <code className="text-indigo-300">Toast</code> bileşenleri ile modüler TypeScript mimarisi.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">6. todo_1, todo_2, todo_3 Başlangıç Verileri</strong>
                  <span className="text-xs text-slate-400">
                    Uygulama açılışında ve sıfırlama butonunda yönergedeki örnek veriler hazır olarak yüklenir.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>Teknoloji Yığını & Özellikler</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>· React 19 + TypeScript</div>
              <div>· Tailwind CSS v4</div>
              <div>· Web Audio API Ses Sentezi</div>
              <div>· LocalStorage Senkronizasyonu</div>
              <div>· WCAG AA Erişilebilirlik</div>
              <div>· Dokunmatik & Fare Long-Press Algılayıcı</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Proje İmzası: Enes Öztürk
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
