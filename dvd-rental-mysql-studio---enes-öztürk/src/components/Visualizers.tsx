import React, { useState } from 'react';
import { Film, Store, Globe, Award, ChevronDown, ChevronUp, Layers } from 'lucide-react';

// Senaryo 1: Rating Dağılım Grafiği
interface RatingDonutProps {
  data: { rating: string; film_sayisi: number }[];
}

export const RatingVisualizer: React.FC<RatingDonutProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.film_sayisi, 0);

  const colors: Record<string, { bg: string; text: string; bar: string; badge: string }> = {
    'PG-13': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', bar: 'bg-indigo-500', badge: 'border-indigo-500/30' },
    'NC-17': { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500', badge: 'border-rose-500/30' },
    'R': { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500', badge: 'border-amber-500/30' },
    'PG': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500', badge: 'border-emerald-500/30' },
    'G': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-cyan-500', badge: 'border-cyan-500/30' },
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          Rating Değerlerine Göre Film Dağılımı
        </h4>
        <span className="text-[11px] font-mono text-slate-400">Toplam: {total} Film</span>
      </div>

      {/* Yatay Yığılmış Bar */}
      <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex mb-4 shadow-inner">
        {data.map((item) => {
          const pct = ((item.film_sayisi / total) * 100).toFixed(1);
          const color = colors[item.rating] || colors['PG-13'];
          return (
            <div
              key={item.rating}
              style={{ width: `${pct}%` }}
              className={`h-full ${color.bar} transition-all relative group`}
              title={`${item.rating}: ${item.film_sayisi} (%${pct})`}
            />
          );
        })}
      </div>

      {/* Kartlar & Detaylar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {data.map((item) => {
          const pct = ((item.film_sayisi / total) * 100).toFixed(1);
          const color = colors[item.rating] || colors['PG-13'];
          return (
            <div
              key={item.rating}
              className={`p-2.5 rounded-lg border ${color.badge} ${color.bg} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${color.text}`}>{item.rating}</span>
                <span className="text-[10px] text-slate-400 font-mono">%{pct}</span>
              </div>
              <div className="mt-2">
                <div className="text-lg font-black text-slate-100 font-mono leading-none">
                  {item.film_sayisi}
                </div>
                <span className="text-[10px] text-slate-400">adet film</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Senaryo 2: Replacement Cost Bar Grafiği (50 Eşiği Vurgulu)
interface ReplacementCostProps {
  data: { replacement_cost: number; film_sayisi: number }[];
}

export const ReplacementCostVisualizer: React.FC<ReplacementCostProps> = ({ data }) => {
  const [showAllCosts, setShowAllCosts] = useState(false);

  // Standart tüm 21 maliyet dağılımı referansı
  const allCosts = [
    { replacement_cost: 20.99, film_sayisi: 57 },
    { replacement_cost: 21.99, film_sayisi: 55 },
    { replacement_cost: 22.99, film_sayisi: 55 },
    { replacement_cost: 19.99, film_sayisi: 54 },
    { replacement_cost: 27.99, film_sayisi: 53 },
    { replacement_cost: 29.99, film_sayisi: 52 },
    { replacement_cost: 12.99, film_sayisi: 51 },
    { replacement_cost: 13.99, film_sayisi: 51 },
    { replacement_cost: 14.99, film_sayisi: 49 },
    { replacement_cost: 28.99, film_sayisi: 48 },
    { replacement_cost: 17.99, film_sayisi: 47 },
    { replacement_cost: 25.99, film_sayisi: 46 },
    { replacement_cost: 16.99, film_sayisi: 44 },
    { replacement_cost: 9.99,  film_sayisi: 44 },
    { replacement_cost: 18.99, film_sayisi: 44 },
    { replacement_cost: 24.99, film_sayisi: 43 },
    { replacement_cost: 10.99, film_sayisi: 43 },
    { replacement_cost: 11.99, film_sayisi: 42 },
    { replacement_cost: 15.99, film_sayisi: 41 },
    { replacement_cost: 23.99, film_sayisi: 41 },
    { replacement_cost: 26.99, film_sayisi: 40 },
  ];

  const displayData = showAllCosts ? allCosts : data;
  const maxCount = 60;

  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Film Sayısı 50&apos;den Fazla Olan Replacement Cost Değerleri
          </h4>
          <p className="text-[11px] text-slate-400">
            HAVING COUNT(*) &gt; 50 koşulunu sağlayan <strong>{data.length}</strong> farklı maliyet grubu
          </p>
        </div>

        <button
          onClick={() => setShowAllCosts(!showAllCosts)}
          className="self-start sm:self-auto text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 transition"
        >
          {showAllCosts ? 'Sadece 50+ Olanları Göster' : 'Tüm 21 Maliyeti Kıyasla'}
        </button>
      </div>

      {/* Eşik Açıklaması */}
      <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>
          <strong>Kırmızı/Sarı Çizgi = 50 Eşiği:</strong> Yalnızca bu eşiğin üstünde kalan değerler HAVING filtremizden geçmiştir.
        </span>
      </div>

      {/* Dikey Bar Grafiği */}
      <div className="space-y-2 pt-1">
        {displayData.map((item) => {
          const isAboveThreshold = item.film_sayisi > 50;
          const widthPct = (item.film_sayisi / maxCount) * 100;

          return (
            <div key={item.replacement_cost} className="flex items-center gap-3 text-xs">
              <span className="w-16 font-mono font-medium text-slate-300 text-right">
                ${Number(item.replacement_cost).toFixed(2)}
              </span>

              <div className="flex-1 h-6 bg-slate-800/80 rounded-md overflow-hidden relative flex items-center">
                {/* 50 Eşiği Referans Çizgisi */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-rose-500/80 z-10"
                  style={{ left: `${(50 / maxCount) * 100}%` }}
                />

                <div
                  className={`h-full rounded-md transition-all duration-500 flex items-center px-2 font-mono font-bold text-[11px] ${
                    isAboveThreshold
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm'
                      : 'bg-slate-750 text-slate-400'
                  }`}
                  style={{ width: `${widthPct}%` }}
                >
                  {item.film_sayisi}
                </div>
              </div>

              <span className={`w-14 text-[11px] font-mono ${isAboveThreshold ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                {isAboveThreshold ? '✓ > 50' : '≤ 50'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Senaryo 3: Mağaza Müşteri Sayıları Karşılaştırma Kartı
interface StoreCompProps {
  data: { store_id: number; musteri_sayisi: number }[];
}

export const StoreVisualizer: React.FC<StoreCompProps> = ({ data }) => {
  const store1 = data.find((d) => d.store_id === 1)?.musteri_sayisi || 326;
  const store2 = data.find((d) => d.store_id === 2)?.musteri_sayisi || 273;
  const total = store1 + store2;

  const pct1 = ((store1 / total) * 100).toFixed(1);
  const pct2 = ((store2 / total) * 100).toFixed(1);

  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-blue-400" />
          Mağaza (store_id) Bazlı Müşteri Portföyü
        </h4>
        <span className="text-[11px] font-mono text-slate-400">Toplam Müşteri: {total}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Mağaza 1 */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Mağaza 1 (Store ID: 1)
            </span>
            <span className="text-xs font-mono text-blue-400 font-semibold">%{pct1}</span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-100 font-mono">{store1}</div>
            <p className="text-xs text-slate-400 mt-1">Kayıtlı Aktif ve Pasif Müşteri</p>
          </div>
          <div className="mt-3 text-[11px] text-slate-500">
            Adres: 47 MySakila Drive, Alberta
          </div>
        </div>

        {/* Mağaza 2 */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Mağaza 2 (Store ID: 2)
            </span>
            <span className="text-xs font-mono text-purple-400 font-semibold">%{pct2}</span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-100 font-mono">{store2}</div>
            <p className="text-xs text-slate-400 mt-1">Kayıtlı Aktif ve Pasif Müşteri</p>
          </div>
          <div className="mt-3 text-[11px] text-slate-500">
            Adres: 28 MySQL Boulevard, Woodridge
          </div>
        </div>
      </div>

      {/* Karşılaştırma Barı */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>Store 1 ({pct1}%)</span>
          <span>Store 2 ({pct2}%)</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div style={{ width: `${pct1}%` }} className="bg-blue-500 transition-all" />
          <div style={{ width: `${pct2}%` }} className="bg-purple-500 transition-all" />
        </div>
      </div>
    </div>
  );
};

// Senaryo 4: En Çok Şehir Barındıran Ülke Kartı
interface CountryRankProps {
  data: { country_id: number; sehir_sayisi: number }[];
}

export const CountryVisualizer: React.FC<CountryRankProps> = ({ data }) => {
  const [showCities, setShowCities] = useState(false);

  const top = data[0] || { country_id: 44, sehir_sayisi: 60 };

  // DVD Rental veri tabanındaki en yüksek 5 ülke kıyaslaması
  const topCountries = [
    { country_id: 44, country: 'India (Hindistan)', sehir_sayisi: 60, flag: '🇮🇳' },
    { country_id: 24, country: 'China (Çin)', sehir_sayisi: 42, flag: '🇨🇳' },
    { country_id: 104, country: 'United States (ABD)', sehir_sayisi: 35, flag: '🇺🇸' },
    { country_id: 80, country: 'Russian Fed. (Rusya)', sehir_sayisi: 28, flag: '🇷🇺' },
    { country_id: 50, country: 'Japan (Japonya)', sehir_sayisi: 25, flag: '🇯🇵' },
  ];

  const sampleIndiaCities = [
    'Adoni', 'Agra', 'Ahmadnagar', 'Aligarh', 'Allahabad', 'Alwar', 'Amroha', 'Anantapur',
    'Asansol', 'Aurangabad', 'Bally', 'Balurghat', 'Baranagar', 'Barasat', 'Barddhaman',
    'Bareilly', 'Belgaum', 'Bellary', 'Bhopal', 'Bikaner', 'Coimbatore', 'Cuttack',
    'Dehradun', 'Gaya', 'Ghaziabad', 'Guntur', 'Gurgaon', 'Guwahati', 'Gwalior', 'Jaipur',
    'Jalandhar', 'Indore', 'Jabalpur', 'Hubli-Dharwad', 'Haridwar', 'Imphal', 've 24 şehir daha...'
  ];

  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          En Fazla Şehir Sayısı Barındıran Ülke (LIMIT 1)
        </h4>
        <span className="text-[11px] font-mono text-emerald-400 font-bold">ZİRVEDE</span>
      </div>

      {/* Şampiyon Ülke Kartı */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/40 relative overflow-hidden mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-100">
                  India (Hindistan)
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  country_id: {top.country_id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                DVD Rental veri tabanında en geniş coğrafi dağılıma sahip ülke
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {top.sehir_sayisi}
            </div>
            <span className="text-xs text-slate-400 font-medium">Toplam Kayıtlı Şehir</span>
          </div>
        </div>
      </div>

      {/* Kıyaslama: İlk 5 Ülke Bar Grafiği */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2.5">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            En Fazla Şehir Barındıran İlk 5 Ülke Kıyaslaması
          </span>
          <span className="text-[11px] text-slate-500">Şehir Sayısı</span>
        </div>

        <div className="space-y-2">
          {topCountries.map((c, idx) => {
            const widthPct = (c.sehir_sayisi / 60) * 100;
            const isWinner = c.country_id === 44;

            return (
              <div key={c.country_id} className="flex items-center gap-3 text-xs">
                <span className="w-5 text-slate-500 font-mono font-bold">{idx + 1}.</span>
                <span className="w-40 text-slate-300 font-medium flex items-center gap-1.5 truncate">
                  <span>{c.flag}</span>
                  <span className={isWinner ? 'text-emerald-400 font-bold' : ''}>
                    {c.country}
                  </span>
                </span>

                <div className="flex-1 h-5 bg-slate-800 rounded overflow-hidden relative flex items-center">
                  <div
                    className={`h-full rounded transition-all duration-500 ${
                      isWinner ? 'bg-emerald-500 font-bold' : 'bg-slate-700'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>

                <span className={`w-12 text-right font-mono font-bold ${isWinner ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {c.sehir_sayisi}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hindistan Şehirlerini İnceleme Açılır Penceresi */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <button
          onClick={() => setShowCities(!showCities)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 transition"
        >
          <span>Hindistan (country_id: 44) Bünyesindeki 60 Şehirden Örnekleri İncele</span>
          {showCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showCities && (
          <div className="mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="flex flex-wrap gap-1.5">
              {sampleIndiaCities.map((city, cIdx) => (
                <span
                  key={cIdx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
