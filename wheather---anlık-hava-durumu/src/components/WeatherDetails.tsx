import React from 'react';
import { CurrentWeather, LocationInfo } from '../types/weather';
import { getUVLevel, getWindDirectionText } from '../services/weatherUtils';
import {
  Droplets,
  Gauge,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Sunrise,
  Sunset,
  Compass,
  MapPin,
} from 'lucide-react';

interface WeatherDetailsProps {
  current: CurrentWeather;
  location: LocationInfo;
  sunrise?: string;
  sunset?: string;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  current,
  location,
  sunrise,
  sunset,
}) => {
  const uvInfo = getUVLevel(current.uvIndex ?? 4);
  const windDirText = getWindDirectionText(current.windDirection);

  const formatSunTime = (timeStr?: string) => {
    if (!timeStr) return '--:--';
    try {
      const d = new Date(timeStr);
      return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return timeStr.split('T')[1]?.slice(0, 5) || '--:--';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 my-4">
      {/* 1. NEM (HUMIDITY) */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            Nem Oranı
          </span>
          <span className="text-[11px] text-slate-400">
            {current.relativeHumidity > 70 ? 'Yüksek' : current.relativeHumidity < 35 ? 'Düşük' : 'İdeal'}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            %{current.relativeHumidity}
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-sky-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, current.relativeHumidity)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. BASINÇ (PRESSURE) */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            Hava Basıncı
          </span>
          <span className="text-[11px] text-slate-400">
            {current.surfacePressure >= 1013 ? 'Yüksek' : 'Alçak'}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            {current.surfacePressure} <span className="text-xs font-normal text-slate-300">hPa</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Standart deniz seviyesi (1013 hPa)
          </p>
        </div>
      </div>

      {/* 3. HİSSEDİLEN SICAKLIK */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            Hissedilen
          </span>
          <span className="text-[11px] text-slate-400">
            {current.apparentTemperature > current.temperature ? 'Daha sıcak' : 'Rüzgar etkisi'}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            {current.apparentTemperature}°C
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Gerçek sıcaklık {current.temperature}°C
          </p>
        </div>
      </div>

      {/* 4. RÜZGAR HIZI VE YÖNÜ */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            Rüzgar
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Compass className="w-3 h-3 text-teal-300" />
            {windDirText.split(' ')[0]}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            {current.windSpeed} <span className="text-xs font-normal text-slate-300">km/s</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {windDirText} ({current.windDirection}°)
          </p>
        </div>
      </div>

      {/* 5. UV İNDEKSİ */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
            UV İndeksi
          </span>
          <span className={`text-[11px] font-medium ${uvInfo.color}`}>
            {uvInfo.label}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            {current.uvIndex ?? 4} <span className="text-xs font-normal text-slate-400">/ 11+</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            {uvInfo.advice}
          </p>
        </div>
      </div>

      {/* 6. YAĞIŞ MİKTARI */}
      <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            Yağış Miktarı
          </span>
          <span className="text-[11px] text-slate-400">Son saat</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
            {current.precipitation} <span className="text-xs font-normal text-slate-300">mm</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {current.precipitation > 0 ? 'Aktif yağış kaydedildi' : 'Son 1 saatte yağış yok'}
          </p>
        </div>
      </div>

      {/* 7. GÜN DOĞUMU & BATIMI (Geniş 2 Sütun) */}
      <div className="col-span-2 p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
            <Sunrise className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Gün Doğumu</span>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              {formatSunTime(sunrise)}
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
            <Sunset className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Gün Batımı</span>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              {formatSunTime(sunset)}
            </div>
          </div>
        </div>
      </div>

      {/* 8. KOORDİNATLAR & COĞRAFİ TESPİT BİLGİSİ */}
      <div className="col-span-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate">
            {location.district}, {location.city} ({location.country})
          </span>
        </div>
        <div className="font-mono tabular-nums text-[11px] text-slate-400 shrink-0">
          {location.latitude.toFixed(3)}°K, {location.longitude.toFixed(3)}°D
        </div>
      </div>
    </div>
  );
};
