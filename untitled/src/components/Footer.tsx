import React from 'react';
import { ShieldCheck, Heart, Sparkles, Database, CheckCircle, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400 py-12 px-4 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Certificate / Signature Card */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 text-xs text-cyan-300 font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Resmi Doğrulama & Sertifika</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                DVD Rental Veri Tabanı SQL Senaryo Çözümleri
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Bu çalışma, PostgreSQL <code className="text-cyan-400">dvdrental</code> örnek veri tabanı standartlarına ve ilişkisel veritabanı kurallarına uygun olarak 
                tüm sorgu senaryoları, alternatif yazımları ve performans analizleri ile birlikte hazırlanmıştır.
              </p>
            </div>

            {/* Signature Stamp */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-cyan-500/30 bg-slate-900/90 shadow-xl min-w-[220px]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                ÖZEL İMZA VE ONAY
              </span>
              <div className="font-serif italic text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-400 py-1">
                Enes Öztürk
              </div>
              <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                Doğrulanmış Çözüm
              </span>
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-slate-900">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-400" />
            <span>PostgreSQL 16 & Sakila / DVD Rental Veri Tabanı</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Hazırlayan & Tasarım:</span>
            <strong className="text-slate-300 font-semibold">Enes Öztürk</strong>
            <span>• Kolay Gelsin!</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>UTF-8</span>
            <span>•</span>
            <span>ANSI SQL</span>
            <span>•</span>
            <span>Client-side Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
