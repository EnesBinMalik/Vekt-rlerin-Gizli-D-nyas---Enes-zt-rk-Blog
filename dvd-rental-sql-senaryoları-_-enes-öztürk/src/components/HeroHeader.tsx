import React from 'react';
import { AUTHOR_INFO } from '../data/dvdrentalData';
import { Play, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroHeaderProps {
  onRunAll: () => void;
  isRunningAll: boolean;
  onOpenReport: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onRunAll, isRunningAll, onOpenReport }) => {
  return (
    <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top metadata strip - quiet text with separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
          <span className="font-semibold text-blue-400">PostgreSQL Veri Tabanı</span>
          <span aria-hidden="true">·</span>
          <span>dvdrental Örnek Veri Seti</span>
          <span aria-hidden="true">·</span>
          <span>film Tablosu Analizi</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 font-medium">Hazırlayan: {AUTHOR_INFO.name}</span>
        </div>

        {/* Headline & Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3" style={{ textWrap: 'balance' }}>
              dvdrental Film Tablosu SQL Sorgu Senaryoları
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              İstenen 4 temel analiz sorusu için optimize edilmiş PostgreSQL SQL sorguları, matematiksel doğrulama adımları ve 1.000 filmlik canlı veri tabanı üzerinde anlık çalıştırma sonuçları.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onRunAll}
              disabled={isRunningAll}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunningAll ? 'Sorgular Yürütülüyor...' : 'Tüm Senaryoları Canlı Çalıştır'}</span>
            </button>

            <button
              onClick={onOpenReport}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>İmzalı Özeti Görüntüle</span>
            </button>
          </div>
        </div>

        {/* 4 Essential Scenario Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">Senaryo 1 · AVG(rental_rate)</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              $2.98
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Ortalama kiralama ücreti (1.000 film)
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">Senaryo 2 · LIKE &apos;C%&apos;</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
              92
            </div>
            <div className="text-xs text-slate-400 mt-1">
              &apos;C&apos; harfi ile başlayan film adedi
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">Senaryo 3 · MAX(length) [0.99$]</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">
              184 <span className="text-sm font-normal text-slate-400">dk</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              0.99$ ücretli en uzun film süresi
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">Senaryo 4 · DISTINCT cost [&gt;150 dk]</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono tabular-nums">
              21
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Farklı replacement_cost değeri
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
