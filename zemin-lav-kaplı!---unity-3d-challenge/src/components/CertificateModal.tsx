import React from 'react';
import { X, Award, CheckCircle2, Download, Printer, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-950 border-2 border-amber-500/70 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative text-zinc-100 select-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border border-amber-500/30 p-6 rounded-xl bg-gradient-to-b from-amber-950/20 via-zinc-900 to-zinc-950 text-center relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none font-serif text-8xl font-black text-amber-500 rotate-[-15deg]">
            UNITY LEARN
          </div>

          {/* Unity Logo Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg border border-amber-400">
            <span className="font-black text-2xl text-black">U</span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-1">
            Unity Learn 3D Geliştirici Sertifikası
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            MEYDAN OKUMA BAŞARI BELGESİ
          </h1>

          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-5">
            Bu belge, aşağıda adı geçen projenin Unity 3D ilkel objeleri, RigidBody fizik simülasyonu ve materyal mimarisi gereksinimlerini eksiksiz tamamladığını belgeler.
          </p>

          <div className="my-5 py-4 border-y border-amber-500/30">
            <span className="text-xs text-amber-400 uppercase font-mono block mb-1">Proje Başlığı</span>
            <span className="text-xl font-bold text-amber-200">"Challenge: Zemin Lav Kaplı!"</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left bg-zinc-950/70 p-4 rounded-lg border border-zinc-800 mb-6 text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px]">Onaylanan Yetkinlikler:</span>
              <ul className="text-zinc-300 space-y-0.5 mt-1">
                <li>• 3B İlkel Obje & Sahne Hiyerarşisi</li>
                <li>• RigidBody & Esneklik (Bounciness)</li>
                <li>• Lav Zemin Shader & Çarpışma Tespiti</li>
              </ul>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Tarih & Durum:</span>
              <div className="text-zinc-200 font-medium mt-1">2026-10-24</div>
              <div className="flex items-center gap-1 text-emerald-400 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resmi Olarak Doğrulandı</span>
              </div>
            </div>
          </div>

          {/* Signature Block */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-zinc-800 gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] text-zinc-500">Mühür ID</div>
                <div className="font-mono text-[11px] text-amber-300">UL-LAVA-2026-ENES</div>
              </div>
            </div>

            {/* Enes Öztürk Signature */}
            <div className="text-center sm:text-right">
              <div className="font-serif italic text-lg sm:text-xl font-bold text-amber-300 tracking-wide">
                Enes Öztürk
              </div>
              <div className="text-[11px] text-zinc-400">
                Unity Proje Tasarımcısı & Eğitmeni
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs border border-zinc-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            <span>Yazdır</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
