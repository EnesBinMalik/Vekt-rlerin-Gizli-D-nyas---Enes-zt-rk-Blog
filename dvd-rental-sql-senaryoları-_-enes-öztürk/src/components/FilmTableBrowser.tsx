import React, { useState, useMemo } from 'react';
import { DVD_RENTAL_FILMS, Film } from '../data/dvdrentalData';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const FilmTableBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [selectedRate, setSelectedRate] = useState<number | 'ALL'>('ALL');
  const [minLength, setMinLength] = useState<number>(0);
  const [sortField, setSortField] = useState<keyof Film>('film_id');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const handleSort = (field: keyof Film) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRating('ALL');
    setSelectedRate('ALL');
    setMinLength(0);
    setCurrentPage(1);
  };

  // Quick preset filter buttons
  const applyPreset = (preset: 'all' | 'c_films' | 'rate_099' | 'long_150') => {
    resetFilters();
    if (preset === 'c_films') {
      setSearchTerm('^C'); // special handled or filter
    } else if (preset === 'rate_099') {
      setSelectedRate(0.99);
    } else if (preset === 'long_150') {
      setMinLength(151);
    }
  };

  const filteredFilms = useMemo(() => {
    return DVD_RENTAL_FILMS.filter(film => {
      // Search
      if (searchTerm) {
        if (searchTerm === '^C') {
          if (!film.title.startsWith('C')) return false;
        } else {
          const q = searchTerm.toLowerCase();
          if (!film.title.toLowerCase().includes(q) && !film.description.toLowerCase().includes(q)) {
            return false;
          }
        }
      }

      // Rating
      if (selectedRating !== 'ALL' && film.rating !== selectedRating) {
        return false;
      }

      // Rental Rate
      if (selectedRate !== 'ALL' && Math.abs(film.rental_rate - selectedRate) > 0.001) {
        return false;
      }

      // Min Length
      if (minLength > 0 && film.length < minLength) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchTerm, selectedRating, selectedRate, minLength, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredFilms.length / pageSize) || 1;
  const pagedFilms = filteredFilms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {/* Control panel & filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        {/* Scenario quick triggers */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium text-slate-300">Senaryo Hızlı Filtreleri:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => applyPreset('all')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              Tüm Filmler (1.000)
            </button>
            <button
              onClick={() => applyPreset('c_films')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              &apos;C&apos; ile Başlayanlar (92)
            </button>
            <button
              onClick={() => applyPreset('rate_099')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              0.99$ Olanlar (341)
            </button>
            <button
              onClick={() => applyPreset('long_150')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              Süre &gt; 150 dk
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Film adı veya açıklama..."
              value={searchTerm === '^C' ? "'C' ile başlayanlar" : searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Rating filter */}
          <div>
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Tüm Derecelendirmeler (Rating)</option>
              <option value="G">G (Genel İzleyici)</option>
              <option value="PG">PG (Ebeveyn Rehberliği)</option>
              <option value="PG-13">PG-13 (13 Yaş Üzeri)</option>
              <option value="R">R (Kısıtlı / 17+)</option>
              <option value="NC-17">NC-17 (Yetişkin)</option>
            </select>
          </div>

          {/* Rental Rate filter */}
          <div>
            <select
              value={selectedRate}
              onChange={(e) => {
                setSelectedRate(e.target.value === 'ALL' ? 'ALL' : parseFloat(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="ALL">Tüm Kiralama Ücretleri</option>
              <option value="0.99">$0.99 (Ekonomik)</option>
              <option value="2.99">$2.99 (Standart)</option>
              <option value="4.99">$4.99 (Premium)</option>
            </select>
          </div>

          {/* Min Length slider / selector */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
            <span className="text-slate-400 whitespace-nowrap">Min Süre:</span>
            <input
              type="range"
              min="0"
              max="180"
              step="10"
              value={minLength}
              onChange={(e) => {
                setMinLength(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <span className="font-mono text-white text-[11px] w-12 text-right">
              {minLength > 0 ? `${minLength} dk` : 'Hepsi'}
            </span>
          </div>
        </div>

        {/* Status & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div>
            Gösterilen: <strong className="text-white font-mono">{filteredFilms.length}</strong> / 1.000 film
          </div>
          <button
            onClick={resetFilters}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Filtreleri Sıfırla</span>
          </button>
        </div>
      </div>

      {/* High-density Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-semibold select-none">
              <tr>
                <th
                  onClick={() => handleSort('film_id')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors w-16"
                >
                  <div className="flex items-center gap-1 font-mono">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('title')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors min-w-[200px]"
                >
                  <div className="flex items-center gap-1">
                    <span>Film Adı (title)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rental_rate')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Kiralama ($)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('length')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Süre (dk)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('replacement_cost')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Yenileme ($)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rating')}
                  className="py-3 px-3 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Rating</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-slate-400">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {pagedFilms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Kriterlere uygun film bulunamadı. Filtreleri sıfırlamayı deneyin.
                  </td>
                </tr>
              ) : (
                pagedFilms.map((film) => (
                  <tr key={film.film_id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500">#{film.film_id}</td>
                    <td className="py-2.5 px-3 font-medium text-white">
                      <span className={film.title.startsWith('C') ? 'text-blue-300 font-semibold' : ''}>
                        {film.title}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-medium text-emerald-400">
                      ${film.rental_rate}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className={film.length > 150 ? 'text-amber-400 font-semibold' : ''}>
                        {film.length} dk
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-purple-400">
                      ${film.replacement_cost}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {film.rating}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs truncate" title={film.description}>
                      {film.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Sayfa <span className="text-white font-mono font-semibold">{currentPage}</span> / {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] px-2">
              {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredFilms.length)}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
