import React from 'react';
import { Database, ShieldCheck, Heart, Sparkles, Code2, ArrowUp } from 'lucide-react';

export const SignatureFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/90 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800/60 pb-8">
          
          {/* Sol Kolon: Proje & Veri Tabanı Kimliği */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-100 text-sm">
                DVD Rental MySQL Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              DVD Rental örnek veri tabanı üzerindeki 4 temel SQL senaryosunun analizi, çözümleri ve interaktif test ortamı.
            </p>
          </div>

          {/* Orta Kolon: Enes Öztürk İmzası (Öne Çıkan Tasarım) */}
          <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Geliştirici İmzası</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 tracking-wide font-sans">
              Enes Öztürk
            </div>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Bu proje, Enes Öztürk imzası ile MySQL veri tabanı mimarisi ve sorgulama standartlarına tam uygun olarak tasarlanmıştır.
            </p>
          </div>

          {/* Sağ Kolon: Teknoloji & Başa Dön */}
          <div className="flex flex-col md:items-end space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>MySQL 8.0 • React 19 • AlaSQL</span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 text-xs font-medium transition active:scale-95 shadow-sm"
            >
              <span>Yukarı Çık</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Alt Telif Barı */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-1">
            <span>© 2026 DVD Rental MySQL Project. Kodlandı ve İmzalandı</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
            <strong className="text-slate-400">Enes Öztürk</strong>
          </div>
          <div>Otantik Sakila/DVD-Rental Veri Tabanı Benchmark Çıktılarıyla Birebir Eşleşir.</div>
        </div>
      </div>
    </footer>
  );
};
