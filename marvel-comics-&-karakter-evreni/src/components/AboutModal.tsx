import React from 'react';
import { X, Award, Code2, Database, Sparkles, BookOpen } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Lockup */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#E62429] px-3 py-1 rounded shadow text-white font-comic text-2xl font-bold uppercase">
            MARVEL
          </div>
          <div>
            <h2 className="font-comic text-lg uppercase tracking-wide text-white leading-tight">
              Karakter & Çizgi Roman Evreni
            </h2>
            <span className="text-xs text-red-400 font-semibold">
              Enes Öztürk İmzalı Özel Proje
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
          <p>
            Bu platform, Marvel çizgi roman evreninin zenginliğini, karakterler ve çizgi romanlar arasındaki çift yönlü ilişkisel bağları derinlemesine incelemek amacıyla geliştirilmiştir.
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <Database className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-100 block">Resmi Marvel API Mimarisi</strong>
                <span className="text-neutral-400">
                  Karakterler, varyant kapaklar, yaratıcı ekip (yazar, çizer), resmi 1-7 güç skalası ve hikaye arkları doğrudan Marvel veri modeliyle modellenmiştir.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-100 block">Çift Yönlü İlişkisel Keşif</strong>
                <span className="text-neutral-400">
                  Herhangi bir karaktere tıklayarak yer aldığı tüm çizgi romanları görebilir; çizgi romana dokunarak o sayıda boy gösteren tüm kahramanları anında inceleyebilirsiniz.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-100 block">Geliştirici İmzası</strong>
                <span className="text-neutral-400">
                  Tasarım, veri mimarisi ve uygulama geliştirmesi <strong>Enes Öztürk</strong> tarafından hayata geçirilmiştir.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 font-mono">
              Sürüm: 1.0.0 · 2026
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow"
            >
              Anladım
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
