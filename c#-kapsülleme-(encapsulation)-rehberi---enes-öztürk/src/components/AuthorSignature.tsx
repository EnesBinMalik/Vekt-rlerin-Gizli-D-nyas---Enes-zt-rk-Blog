import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';

export const AuthorSignature: React.FC = () => {
  return (
    <section id="author" className="py-16 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span>YAZAR & EĞİTMEN İMZASI</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enes Öztürk İmzasıyla
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                &ldquo;Yazılım mühendisliğinde en büyük ustalık, sistemin karmaşıklığını nesnenin kalbine gömüp, dış dünyaya yalnızca güvenli ve zarif bir arayüz sunabilmektir. Kapsülleme (Encapsulation), kodunuzu gelecekteki hatalardan ve bilinçsiz müdahalelerden koruyan en sağlam mimari kaledir.&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Temiz Mimari & OOP Prensipleri</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>C# .NET Uzmanlık Rehberi</span>
                </div>
              </div>
            </div>

            {/* Stylized Signature Badge */}
            <div className="shrink-0 flex flex-col items-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner w-full md:w-auto">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                Dijital Onay & İmza
              </div>

              {/* Calligraphic Script Appearance */}
              <div className="font-serif italic text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 py-2">
                Enes Öztürk
              </div>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-1.5" />

              <div className="text-[10px] text-slate-400 font-mono mt-1">
                C# Kapsülleme Rehberi © 2026
              </div>
            </div>
          </div>

          {/* Quick Recap takeaways */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="font-bold text-white block mb-0.5">1. Sakla (Private Field)</span>
              <span>Nesnenin ham verisini her zaman private tutun. Dış sınıflar doğrudan erişemesin.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="font-bold text-white block mb-0.5">2. Koru (Public Property)</span>
              <span>Veriyi get ve set metotlarıyla dışa açın. Mantıksız atamaları if ile engelleyin.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="font-bold text-white block mb-0.5">3. Güvende Kal (State Integrity)</span>
              <span>Nesneniz hiçbir zaman tanımsız veya tutarsız bir duruma (invalid state) düşmesin.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
