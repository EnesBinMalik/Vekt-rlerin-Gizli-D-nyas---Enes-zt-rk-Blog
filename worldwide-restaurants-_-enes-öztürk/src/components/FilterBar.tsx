import React from 'react';
import { FilterState } from '../types/restaurant';
import { WORLD_CITIES, CUISINE_TYPES } from '../data/restaurants';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Award,
  Clock,
  Layers,
  Map as MapIcon,
  Grid3X3
} from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onResetFilter: () => void;
  activeView: 'split' | 'grid' | 'map';
  onViewChange: (view: 'split' | 'grid' | 'map') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  onResetFilter,
  activeView,
  onViewChange,
  totalCount
}) => {
  const isFiltered =
    filter.searchQuery !== '' ||
    filter.cuisine !== 'Tümü' ||
    filter.city !== 'Tümü' ||
    filter.priceLevel !== 'Tümü' ||
    filter.minRating > 0 ||
    filter.michelinOnly ||
    filter.openNowOnly;

  return (
    <div className="bg-[#12151d] border border-stone-800 rounded-xl p-3 sm:p-4 space-y-3 shadow-lg">
      {/* Top Search Input Row & View Switches */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
            placeholder="Restoran adı, mutfak türü, şehir veya tabak ara (örn. Mikla, Omakase, Paris)..."
            className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-stone-950 border border-stone-700/80 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filter, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Switchers (Segmented Control) */}
        <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800 self-start md:self-auto">
          <button
            onClick={() => onViewChange('split')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'split'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Harita & Liste</span>
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'grid'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Kartlar</span>
          </button>
          <button
            onClick={() => onViewChange('map')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'map'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Tam Harita</span>
          </button>
        </div>
      </div>

      {/* Filter Options Row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80 text-xs">
        {/* City Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 hidden sm:inline">Şehir:</span>
          <select
            value={filter.city}
            onChange={(e) => onFilterChange({ ...filter, city: e.target.value })}
            className="px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700/80 text-xs text-stone-300 focus:outline-none focus:border-amber-400"
          >
            <option value="Tümü">Tüm Şehirler</option>
            {WORLD_CITIES.filter((c) => c.name !== 'Tüm Şehirler').map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 hidden sm:inline">Mutfak:</span>
          <select
            value={filter.cuisine}
            onChange={(e) => onFilterChange({ ...filter, cuisine: e.target.value })}
            className="px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700/80 text-xs text-stone-300 focus:outline-none focus:border-amber-400 max-w-[150px] sm:max-w-none truncate"
          >
            {CUISINE_TYPES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Price Level Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 hidden sm:inline">Fiyat:</span>
          <select
            value={filter.priceLevel}
            onChange={(e) => onFilterChange({ ...filter, priceLevel: e.target.value })}
            className="px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700/80 text-xs text-stone-300 focus:outline-none focus:border-amber-400"
          >
            <option value="Tümü">Fiyat (Tümü)</option>
            <option value="$">$ (Bütçe Dostu)</option>
            <option value="$$">$$ (Orta)</option>
            <option value="$$$">$$$ (Lüks)</option>
            <option value="$$$$">$$$$ (Fine Dining)</option>
          </select>
        </div>

        {/* Michelin Only Toggle */}
        <button
          type="button"
          onClick={() => onFilterChange({ ...filter, michelinOnly: !filter.michelinOnly })}
          className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
            filter.michelinOnly
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold'
              : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Michelin Yıldızlı</span>
        </button>

        {/* Open Now Toggle */}
        <button
          type="button"
          onClick={() => onFilterChange({ ...filter, openNowOnly: !filter.openNowOnly })}
          className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
            filter.openNowOnly
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-semibold'
              : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Şu An Açık</span>
        </button>

        {/* Sort by dropdown */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-stone-400 hidden sm:inline">Sıralama:</span>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                sortBy: e.target.value as FilterState['sortBy']
              })
            }
            className="px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700/80 text-xs text-stone-300 focus:outline-none focus:border-amber-400"
          >
            <option value="recommended">Önerilenler</option>
            <option value="rating">En Yüksek Puan</option>
            <option value="reviews">En Çok Değerlendirilen</option>
            <option value="priceAsc">Fiyat (Düşükten Yükseğe)</option>
            <option value="priceDesc">Fiyat (Yüksekten Düşüğe)</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        {isFiltered && (
          <button
            onClick={onResetFilter}
            className="px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Filtreleri Temizle</span>
          </button>
        )}
      </div>
    </div>
  );
};
