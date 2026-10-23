import React, { useState, useMemo } from 'react';
import { X, Search, ExternalLink, Filter } from 'lucide-react';
import { DVD_RENTAL_FILMS, Film } from '../data/dvdrentalData';

interface DataDrillDownModalProps {
  scenarioId: number | null;
  onClose: () => void;
}

export const DataDrillDownModal: React.FC<DataDrillDownModalProps> = ({ scenarioId, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (scenarioId === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <div className="text-xs text-blue-400 font-medium">Senaryo {scenarioId} Detaylı Veri İnceleme</div>
            <h2 className="text-lg font-bold text-white">
              {scenarioId === 1 && 'rental_rate Değer Dağılımı ve Ortalama Kanıtı'}
              {scenarioId === 2 && "'C' Karakteri ile Başlayan Tüm Filmler (92 Adet)"}
              {scenarioId === 3 && 'rental_rate = 0.99 Olan Filmler (Uzunluğa Göre Sıralı)'}
              {scenarioId === 4 && 'Uzunluğu > 150 dk Olan Filmlerdeki 21 Farklı replacement_cost'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {scenarioId === 1 && <Scenario1DrillDown />}
          {scenarioId === 2 && <Scenario2DrillDown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {scenarioId === 3 && <Scenario3DrillDown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {scenarioId === 4 && <Scenario4DrillDown />}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>PostgreSQL dvdrental film tablosu gerçek verisi üzerinden çekilmiştir.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

// Scenario 1 Drilldown
const Scenario1DrillDown: React.FC = () => {
  const buckets = useMemo(() => {
    const b099 = DVD_RENTAL_FILMS.filter(f => f.rental_rate === 0.99);
    const b299 = DVD_RENTAL_FILMS.filter(f => f.rental_rate === 2.99);
    const b499 = DVD_RENTAL_FILMS.filter(f => f.rental_rate === 4.99);
    return [
      { rate: 0.99, count: b099.length, total: b099.length * 0.99, sample: b099.slice(0, 4) },
      { rate: 2.99, count: b299.length, total: b299.length * 2.99, sample: b299.slice(0, 4) },
      { rate: 4.99, count: b499.length, total: b499.length * 4.99, sample: b499.slice(0, 4) },
    ];
  }, []);

  const totalSum = buckets.reduce((acc, b) => acc + b.total, 0);
  const totalCount = buckets.reduce((acc, b) => acc + b.count, 0);
  const exactAvg = totalSum / totalCount;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {buckets.map((b, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">Tarife Grubu</div>
            <div className="text-2xl font-bold text-white font-mono">${b.rate}</div>
            <div className="text-xs text-slate-300 mt-2 flex justify-between">
              <span>Film Adedi:</span>
              <span className="font-mono font-semibold">{b.count} film</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 flex justify-between">
              <span>Grup Toplamı:</span>
              <span className="font-mono text-blue-400">${b.total.toFixed(2)}</span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span className="block font-medium text-slate-300 mb-1">Örnek Başlıklar:</span>
              {b.sample.map(s => (
                <div key={s.film_id} className="truncate">• {s.title}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 space-y-2 text-xs">
        <h4 className="font-semibold text-blue-300 text-sm">Matematiksel Aritmetik Ortalama İspatı</h4>
        <div className="font-mono text-slate-200 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
          <div>Toplam Tutar = (341 × 0.99) + (323 × 2.99) + (336 × 4.99) = 337.59 + 965.77 + 1676.64 = 2.980,00 USD</div>
          <div className="mt-1 text-emerald-400 font-bold">AVG(rental_rate) = 2.980,00 USD / 1.000 film = 2.9800 → ROUND(..., 2) = 2.98 USD</div>
        </div>
      </div>
    </div>
  );
};

// Scenario 2 Drilldown: 92 'C' films
const Scenario2DrillDown: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({
  searchTerm,
  setSearchTerm
}) => {
  const cFilms = useMemo(() => {
    return DVD_RENTAL_FILMS.filter(f => f.title.startsWith('C'));
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return cFilms;
    return cFilms.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [cFilms, searchTerm]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="'C' ile başlayan 92 film içinde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-slate-400 shrink-0 font-mono">
          Eşleşen: {filtered.length} / 92
        </div>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">film_id</th>
              <th className="py-2.5 px-3 font-semibold">Film Adı (title)</th>
              <th className="py-2.5 px-3 font-semibold">Süre (length)</th>
              <th className="py-2.5 px-3 font-semibold">rental_rate</th>
              <th className="py-2.5 px-3 font-semibold">Derecelendirme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((film) => (
              <tr key={film.film_id} className="hover:bg-slate-800/40 font-mono">
                <td className="py-2 px-3 text-slate-500">#{film.film_id}</td>
                <td className="py-2 px-3 font-sans font-medium text-white">{film.title}</td>
                <td className="py-2 px-3">{film.length} dk</td>
                <td className="py-2 px-3 text-emerald-400">${film.rental_rate}</td>
                <td className="py-2 px-3 font-sans text-slate-400">{film.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Scenario 3 Drilldown: 0.99 rental rate films
const Scenario3DrillDown: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({
  searchTerm,
  setSearchTerm
}) => {
  const rate099Films = useMemo(() => {
    return DVD_RENTAL_FILMS
      .filter(f => f.rental_rate === 0.99)
      .sort((a, b) => b.length - a.length);
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return rate099Films;
    return rate099Films.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rate099Films, searchTerm]);

  return (
    <div className="space-y-3">
      <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-xl text-xs text-amber-200">
        <strong>En Uzun Film Zirvesi:</strong> 0.99$ kiralama bedeline sahip filmler içerisinde maksimum süre <strong>184 dakikadır</strong> (Örn: <em>CHICAGO NORTH</em> ve <em>SOLDIERS EVOLUTION</em>).
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="0.99$ filmler arasında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-slate-400 shrink-0 font-mono">
          Toplam 0.99$ Film: 341 adet
        </div>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Sıra</th>
              <th className="py-2.5 px-3 font-semibold">Film Adı</th>
              <th className="py-2.5 px-3 font-semibold">Süre (length)</th>
              <th className="py-2.5 px-3 font-semibold">rental_rate</th>
              <th className="py-2.5 px-3 font-semibold">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.slice(0, 50).map((film, idx) => (
              <tr key={film.film_id} className={`hover:bg-slate-800/40 font-mono ${film.length === 184 ? 'bg-amber-950/20' : ''}`}>
                <td className="py-2 px-3 text-slate-500">{idx + 1}</td>
                <td className="py-2 px-3 font-sans font-medium text-white">{film.title}</td>
                <td className="py-2 px-3 font-bold text-amber-400">{film.length} dk</td>
                <td className="py-2 px-3 text-emerald-400">${film.rental_rate}</td>
                <td className="py-2 px-3 font-sans">
                  {film.length === 184 ? (
                    <span className="text-amber-400 font-semibold text-[11px]">En Uzun (MAX)</span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Scenario 4 Drilldown: 21 distinct replacement costs for length > 150
const Scenario4DrillDown: React.FC = () => {
  const data = useMemo(() => {
    const longFilms = DVD_RENTAL_FILMS.filter(f => f.length > 150);
    const costMap: Record<number, number> = {};
    longFilms.forEach(f => {
      costMap[f.replacement_cost] = (costMap[f.replacement_cost] || 0) + 1;
    });

    const sortedCosts = Object.keys(costMap)
      .map(k => parseFloat(k))
      .sort((a, b) => a - b);

    return {
      longFilmCount: longFilms.length,
      distinctCount: sortedCosts.length,
      costList: sortedCosts.map(cost => ({
        cost,
        count: costMap[cost]
      }))
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-xs text-purple-200">
        <strong>Farklı (DISTINCT) Değer Sayısı: {data.distinctCount} Adet</strong>
        <p className="mt-1 text-slate-300">
          Uzunluğu 150 dakikadan büyük olan {data.longFilmCount} adet film içerisinde 9.99$ ile 29.99$ arasında değişen tam 21 adet tekilleştirilmiş yenileme maliyeti bulunmaktadır.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {data.costList.map((item, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400 font-mono">#{idx + 1}</div>
            <div className="text-base font-bold text-purple-400 font-mono mt-0.5">
              ${item.cost.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              {item.count} film
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
