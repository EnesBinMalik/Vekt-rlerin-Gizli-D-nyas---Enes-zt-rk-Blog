import React from 'react';
import { Compass, Sparkles, MapPin, Award, ArrowDown, Utensils } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenMapClick: () => void;
  totalRestaurants: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenMapClick,
  totalRestaurants
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-stone-800/80 bg-gradient-to-b from-[#11141c] via-[#0f1117] to-[#0c0e14]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Pre-title Curator Signature Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-xs text-amber-300 shadow-md backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold tracking-wide">Enes Öztürk İmzalı Küresel Gastronomi Atlası</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Dünyanın En Seçkin Restoranlarını Keşfedin
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Tokyo’dan Paris’e, İstanbul’dan New York’a uzanan Michelin yıldızlı lezzet durakları, 
            haftalık çalışma saatleri, ziyaretçi değerlendirmeleri ve canlı dünya haritası ile 
            sayfadan ayrılmadan anında masa rezervasyonu yapın.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 group"
            >
              <Utensils className="w-4 h-4 text-stone-950" />
              <span>Restoranları İncele</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenMapClick}
              className="px-6 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 text-xs sm:text-sm font-medium border border-stone-700/80 transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>İnteraktif Dünya Haritası</span>
            </button>
          </div>
        </div>

        {/* 4-Item Proof & Metric Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
              {totalRestaurants}+
            </div>
            <span className="text-xs text-stone-400 mt-0.5 block">Küratör Seçimli Restoran</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
              12 Şehir
            </div>
            <span className="text-xs text-stone-400 mt-0.5 block">Dünya Gastronomi Başkenti</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
              %100 Doğrulanmış
            </div>
            <span className="text-xs text-stone-400 mt-0.5 block">Çalışma Saatleri & Yorumlar</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
              Canlı Harita
            </div>
            <span className="text-xs text-stone-400 mt-0.5 block">Sayfadan Ayrılmadan İnceleme</span>
          </div>
        </div>
      </div>
    </section>
  );
};
