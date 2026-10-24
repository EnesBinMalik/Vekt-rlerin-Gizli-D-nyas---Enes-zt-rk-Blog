import React from 'react';
import { PowerGrid } from '../types/marvel';

interface PowerGridDisplayProps {
  grid: PowerGrid;
  compact?: boolean;
}

const STATS_MAP: { key: keyof PowerGrid; label: string; maxDesc: string }[] = [
  { key: 'intelligence', label: 'Zeka (Intelligence)', maxDesc: 'Tüm Bilen / Evrensel Deha' },
  { key: 'strength', label: 'Güç (Strength)', maxDesc: 'Sınırsız / Kıtasal Yıkım' },
  { key: 'speed', label: 'Hız (Speed)', maxDesc: 'Işınlanma / Işık Hızı' },
  { key: 'durability', label: 'Dayanıklılık (Durability)', maxDesc: 'Neredeyse Yok Edilemez' },
  { key: 'energyProjection', label: 'Enerji Yayımı (Energy)', maxDesc: 'Kozmik Enerji Hakimiyeti' },
  { key: 'fightingSkills', label: 'Dövüş Becerisi (Combat)', maxDesc: 'Tüm Savaş Sanatlarında Usta' },
];

export const PowerGridDisplay: React.FC<PowerGridDisplayProps> = ({ grid, compact = false }) => {
  return (
    <div className="space-y-3">
      {STATS_MAP.map(({ key, label }) => {
        const value = grid[key];
        const percentage = Math.round((value / 7) * 100);

        return (
          <div key={key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-neutral-300">{label}</span>
              <span className="font-mono tabular-nums text-red-400 font-semibold">
                {value} <span className="text-neutral-500 font-normal">/ 7</span>
              </span>
            </div>
            {/* Visual Segments */}
            <div className="flex gap-1 h-2 w-full bg-neutral-900 rounded p-0.5 border border-white/5">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => {
                const isActive = step <= value;
                return (
                  <div
                    key={step}
                    className={`flex-1 rounded-[1px] transition-all duration-300 ${
                      isActive
                        ? step >= 6
                          ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : step >= 4
                          ? 'bg-red-500'
                          : 'bg-red-700'
                        : 'bg-neutral-800/80'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
