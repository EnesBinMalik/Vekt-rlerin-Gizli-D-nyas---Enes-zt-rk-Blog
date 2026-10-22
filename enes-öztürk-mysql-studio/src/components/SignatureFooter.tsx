import React from 'react';
import { Database, CheckCircle, ShieldCheck } from 'lucide-react';

export const SignatureFooter: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-[#0a0f18] py-8 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Signature Block */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm tracking-wider">
            EÖ
          </div>
          <div>
            <div className="font-semibold text-slate-200 text-sm">
              Enes Öztürk İmzalı MySQL Studio
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              İlişkisel Veritabanı Mimarisi · Sakila SQL Sorgu & Analiz Motoru
            </div>
          </div>
        </div>

        {/* Center: Principles */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sakila Veritabanı Standardı</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>4/4 Tam Ödev Uyumluluğu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gerçek Zamanlı Tarayıcı SQL Motoru</span>
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="text-slate-500 text-right text-[11px]">
          <div>Tasarım & Mühendislik: <span className="text-slate-300 font-medium">Enes Öztürk</span></div>
          <div>MySQL 8.0 & ANSI SQL Uyumlu</div>
        </div>
      </div>
    </footer>
  );
};
