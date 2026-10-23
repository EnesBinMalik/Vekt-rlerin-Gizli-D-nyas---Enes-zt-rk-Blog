import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto my-4 w-full max-w-[400px] h-[820px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl ring-1 ring-slate-800/80 border-4 border-slate-700/80">
      {/* Cihaz Yan Tuşları Simülasyonu */}
      <div className="absolute -left-5 top-28 w-1 h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -left-5 top-44 w-1 h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -right-5 top-32 w-1 h-16 bg-slate-700 rounded-r-md" />

      {/* Ekran Container */}
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col shadow-inner">
        {/* Durum Çubuğu (Status Bar) */}
        <div className="h-10 px-6 bg-white flex items-center justify-between text-slate-800 text-xs font-semibold select-none z-20 shrink-0 border-b border-slate-50">
          <span>09:41</span>
          {/* Dinamik Ada / Çentik */}
          <div className="w-24 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Uygulama Ekranı (Scrollable FlatList container) */}
        <div className="flex-1 overflow-y-auto px-2.5 pb-8 pt-1 flex flex-col scrollbar-thin scrollbar-thumb-slate-200">
          {children}
        </div>

        {/* Home Indicator (iPhone alt çubuğu) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400 rounded-full z-20 pointer-events-none" />
      </div>
    </div>
  );
};
