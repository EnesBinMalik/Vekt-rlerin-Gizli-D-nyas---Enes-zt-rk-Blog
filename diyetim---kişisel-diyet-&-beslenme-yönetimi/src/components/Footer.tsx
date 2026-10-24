import React from 'react';
import { ShieldCheck, Download, RotateCcw, Heart } from 'lucide-react';

interface FooterProps {
  onExportData: () => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExportData, onResetData }) => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200 py-10 text-slate-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">Diyetim</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Enes Öztürk İmzasıyla
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
              Kişiselleştirilmiş beslenme alışkanlığı kazanma, yemek hatırlatıcısı, anlık besin değeri hesaplama ve bütünsel diyet raporlama platformu.
            </p>
          </div>

          {/* Quick Data Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportData}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
              title="Tüm verilerinizi JSON olarak yedekleyin"
            >
              <Download className="w-3.5 h-3.5" />
              Verileri Yedekle
            </button>
            <button
              onClick={onResetData}
              className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
              title="Örnek verileri yeniden yükle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Sıfırla
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>Diyetim Sağlık Sistemleri © 2026.</span>
            <span className="hidden sm:inline">Tüm hakları saklıdır.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <span>Hazırlayan & Tasarlayan:</span>
            <strong className="text-slate-900 font-bold">Enes Öztürk</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
