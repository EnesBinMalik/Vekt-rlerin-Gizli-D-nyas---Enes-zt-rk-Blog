import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">C# Kapsülleme (Encapsulation) Rehberi</span>
          <span aria-hidden="true">·</span>
          <span>Enes Öztürk İmzasıyla</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>Nesne Yönelimli Programlama (OOP)</span>
          <span aria-hidden="true">·</span>
          <span>Field & Property Mimarisi</span>
          <span aria-hidden="true">·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};
