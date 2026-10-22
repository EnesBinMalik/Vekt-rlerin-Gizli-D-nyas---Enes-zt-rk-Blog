import React from 'react';
import { X, ShieldCheck, FileCheck, Check, Scale, BookMarked } from 'lucide-react';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightModal: React.FC<CopyrightModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Telif Hakkı & Fikri Mülkiyet Bildirimi
              </h3>
              <p className="text-xs text-stone-500">
                Eser Sahibi: Enes Öztürk · © 2026
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed font-sans">
          {/* Certificate Banner */}
          <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/70">
            <div className="flex items-start gap-3">
              <FileCheck className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-stone-950 text-sm">
                  Resmi Telif Beyanı (Declaration of Copyright)
                </h4>
                <p className="mt-1 text-stone-800">
                  <em>"Formülsüz Matematik: Doğayı Ezberlemeden Görmek"</em> başlıklı bu akademik/pedagojik blog gönderisinin
                  tüm metinsel içeriği, sezgisel anlatım dizilimi, interaktif simülasyon algoritmaları ve kavramsal mimarisi
                  <strong> Enes Öztürk</strong>'ün şahsi fikri mülkiyetidir.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] font-mono text-stone-600">
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-amber-200">
                    ID: 2026-EO-MATH-BLOG-TURKEY
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-amber-200">
                    Zaman Damgası: 22 Ekim 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clauses */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-stone-600" /> Kullanım & Lisans Şartları
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-emerald-800 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> İzin Verilenler (Eğitim Amaçlı)
                </span>
                <ul className="mt-2 space-y-1 text-stone-600 list-disc list-inside text-[11px]">
                  <li>Derslerde, seminerlerde ve atölyelerde kaynak göstererek sunum yapma.</li>
                  <li>Öğrenci veya araştırmacıların yazıyı alıntılayarak tez/ödev hazırlaması.</li>
                  <li>Kişisel ve kâr amacı gütmeyen eğitim paylaşımları.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-rose-800 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Yasaklananlar (İzinsiz Kullanım)
                </span>
                <ul className="mt-2 space-y-1 text-stone-600 list-disc list-inside text-[11px]">
                  <li>Metnin veya simülasyonların ticari yayınlarda kaynak belirtilmeden kopyalanması.</li>
                  <li>Yazarın ismi çıkarılarak başka bir isim altında yeniden yayınlanması.</li>
                  <li>Metnin izinsiz basılı kitap haline getirilerek satılması.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Academic citation obligation */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white">
            <h5 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-stone-600" /> Akademik Kaynak Gösterme Standartı
            </h5>
            <p className="text-[11px] text-stone-600 mb-2">
              Bu yazıdan yararlandığınızda lütfen aşağıdaki biçimde atıfta bulununuz:
            </p>
            <div className="p-2.5 rounded bg-stone-100 font-mono text-[11px] text-stone-800 break-words select-all">
              Öztürk, Enes. (2026). "Formülsüz Matematik: Doğayı Ezberlemeden Görmek". Sezgisel Matematik Blog Yayınları.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
