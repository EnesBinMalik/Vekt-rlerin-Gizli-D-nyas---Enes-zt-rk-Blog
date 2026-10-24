import React from 'react';
import { Award, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/60 bg-slate-950/60 mt-auto py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        {/* Signature */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1.5px] flex items-center justify-center shadow-md shadow-indigo-500/10">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-amber-400 text-xs">
              EÖ
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span>Enes Öztürk İmzasıyla</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-500">
              Bilgi Yarışması • 12 Saniye Kuralı • Hızlı Soru-Cevap
            </p>
          </div>
        </div>

        {/* Features badges */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> 12s Soru Süresi
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Award className="w-3.5 h-3.5 text-indigo-400" /> Skor Tablosu
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            © 2026 Trivia
          </span>
        </div>
      </div>
    </footer>
  );
};
