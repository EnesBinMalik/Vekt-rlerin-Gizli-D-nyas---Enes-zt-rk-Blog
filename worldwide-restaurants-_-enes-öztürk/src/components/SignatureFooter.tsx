import React from 'react';
import { Sparkles, Globe, MapPin, Award, Compass, Heart } from 'lucide-react';

export const SignatureFooter: React.FC = () => {
  return (
    <footer id="about" className="bg-[#0b0d12] border-t border-stone-800/80 text-stone-400 text-xs mt-16">
      {/* Editorial Signature Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131620] via-[#161a26] to-[#12151f] border border-stone-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Globe className="w-64 h-64 text-amber-400" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Küratör & Geliştirici
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Enes Öztürk İmzalı Worldwide Dining Guide
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Dünyanın dört bir yanındaki Michelin yıldızlı restoranları, asırlık gastronomi tapınaklarını ve 
              yenilikçi lezzet duraklarını tek bir interaktif haritada buluşturan prestijli rehber. 
              Ziyaretçilerin işletme saatlerini, detaylı kullanıcı yorumlarını incelemesi ve sayfadan 
              ayrılmadan anında masa rezervasyonu yapabilmesi amacıyla titizlikle tasarlandı.
            </p>

            <div className="flex items-center gap-6 pt-2 text-stone-400 text-xs">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>12+ Dünya Başkenti</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Michelin & World’s 50 Best Seçkisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Cities Grid for Fast Exploration */}
        <div id="cities" className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Avrupa</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>İstanbul, Türkiye</li>
              <li>Paris, Fransa</li>
              <li>Roma & Modena, İtalya</li>
              <li>Barselona, İspanya</li>
              <li>Londra, İngiltere</li>
              <li>Kopenhag, Danimarka</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Asya</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>Tokyo, Japonya</li>
              <li>Bangkok, Tayland</li>
              <li>Dubai, BAE</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Amerika</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>New York, ABD</li>
              <li>Mexico City, Meksika</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Okyanusya</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>Sidney, Avustralya</li>
            </ul>
          </div>
          <div className="col-span-2">
            <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Uygulama Hakkında</h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Worldwide Restaurants; dünya mutfaklarını keşfetmek, anlık çalışma saatlerini ve kullanıcı puanlarını 
              harita eşliğinde incelemek isteyen gastronomi tutkunları için Enes Öztürk tarafından geliştirilmiştir.
            </p>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Worldwide Restaurants. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400 font-medium">
            <span>Enes Öztürk İmzasıyla Tasarlanıp Geliştirilmiştir</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
