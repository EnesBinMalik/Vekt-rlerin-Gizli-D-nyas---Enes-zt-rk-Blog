import React from 'react';
import { X, CheckCircle2, Sparkles, Navigation, RefreshCw, Feather } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Signature Callout Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-0.5 shadow-lg shadow-sky-500/20 mb-3">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Feather className="w-7 h-7 text-sky-400" />
            </div>
          </div>

          <span className="text-[11px] font-semibold tracking-wider text-sky-400 uppercase">
            Özel Tasarım & Yazılım
          </span>

          <h2 className="text-2xl font-bold text-white tracking-tight mt-1 font-serif italic">
            Enes Öztürk
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent my-2" />

          <p className="text-xs text-slate-300 max-w-xs mt-1 leading-relaxed">
            Wheather — Yeni Nesil Mobil Hava Durumu ve Rastgele Konum Keşif Deneyimi
          </p>
        </div>

        {/* Uygulama Yetenekleri Listesi */}
        <div className="space-y-2.5 my-4 text-xs text-slate-300">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Otomatik Konum & Ters Coğrafi Kodlama</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Kullanıcının GPS koordinatlarını alarak il-ilçe (Örn: Kadıköy, İstanbul) düzeyinde dönüştürür.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3">
            <RefreshCw className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Aşağı Kaydırarak Yenileme (Pull-to-Refresh)</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Dokunmatik ekranda aşağı kaydırıldığında elastik fizik ile Türkiye ve dünyadan rastgele bir konum getirir.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Özel Animasyonlu Hava Durumu İkonları</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                WMO hava durumu kodlarına özel vektörel hareketli güneş, yağmur, kar, fırtına ve bulut simgeleri.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3">
            <Navigation className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Detaylı Meteoroloji Parametreleri</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Sıcaklık, nem oranı, atmosferik basınç, rüzgar hızı/yönü, UV indeksi, 24 saatlik ve 7 günlük tahmin.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Credit & Signature Seal */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            <span>Wheather App</span>
            <span className="mx-1.5">·</span>
            <span className="text-slate-300 font-medium">Enes Öztürk İmzasıyla</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
