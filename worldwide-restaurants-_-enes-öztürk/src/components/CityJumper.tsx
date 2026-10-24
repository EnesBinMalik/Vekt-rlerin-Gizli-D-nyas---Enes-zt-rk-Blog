import React from 'react';
import { WORLD_CITIES } from '../data/restaurants';
import { MapPin } from 'lucide-react';

interface CityJumperProps {
  selectedCity: string;
  onSelectCity: (cityName: string, coords?: { lat: number; lng: number; zoom: number }) => void;
}

export const CityJumper: React.FC<CityJumperProps> = ({
  selectedCity,
  onSelectCity
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
      <span className="text-xs text-stone-400 font-medium whitespace-nowrap shrink-0 flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-amber-400" />
        <span>Hızlı Şehir Geçişi:</span>
      </span>

      {WORLD_CITIES.map((city) => {
        const isSelected = selectedCity === city.name;
        return (
          <button
            key={city.name}
            onClick={() => onSelectCity(city.name, city.coordinates ? { ...city.coordinates, zoom: city.zoom } : undefined)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap shrink-0 font-medium ${
              isSelected
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-stone-700'
            }`}
          >
            {city.name}
          </button>
        );
      })}
    </div>
  );
};
