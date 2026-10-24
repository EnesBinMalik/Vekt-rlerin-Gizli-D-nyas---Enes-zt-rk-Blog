import React, { useState } from 'react';
import { RANDOM_LOCATIONS, CuratedLocation } from '../data/randomLocations';
import { LocationInfo } from '../types/weather';
import { Search, MapPin, X, Sparkles, Navigation } from 'lucide-react';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: LocationInfo) => void;
  onDetectLocation: () => void;
  currentLocationName?: string;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  onDetectLocation,
  currentLocationName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = RANDOM_LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (l: CuratedLocation) => {
    onSelectLocation({
      latitude: l.latitude,
      longitude: l.longitude,
      city: l.city,
      district: l.district,
      country: l.country,
      formattedName: l.name,
      isCurrentLocation: false,
      discoveredAt: l.tagline,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-white/10 p-5 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-semibold text-white">Konum Seç veya Keşfet</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick GPS Action Button */}
        <div className="mt-3">
          <button
            onClick={() => {
              onDetectLocation();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 flex items-center justify-between transition-colors group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-slate-950 font-bold">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-300 block">
                  Mevcut GPS Konumumu Kullan
                </span>
                <span className="text-[11px] text-slate-400">
                  Cihaz koordinatlarını saptayıp il-ilçe gösterir
                </span>
              </div>
            </div>
            <span className="text-[11px] text-sky-400 font-medium">Tespit Et</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-3 mb-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İl, ilçe veya ülke ara (Örn: Beşiktaş, Kaş)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.07] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Location List */}
        <div className="overflow-y-auto flex-1 divide-y divide-white/5 pr-1 mt-1 -mr-1">
          <div className="py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Popüler İl & İlçeler ({filtered.length})</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Aradığınız kriterde konum bulunamadı.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = currentLocationName === item.name;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-left transition-colors my-0.5 ${
                    isSelected
                      ? 'bg-sky-500/15 border border-sky-400/30'
                      : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex-1 truncate mr-2">
                    <div className="text-xs font-semibold text-white truncate">
                      {item.district}, {item.city}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {item.tagline}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono tabular-nums shrink-0">
                    {item.country}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
