import React from 'react';
import { DailyForecastItem } from '../types/weather';
import { getWeatherConditionMeta, formatDayName } from '../services/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { CalendarDays, Droplets } from 'lucide-react';

interface DailyForecastProps {
  daily: DailyForecastItem[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  if (!daily || daily.length === 0) return null;

  // Tüm günlerin min ve max değerlerini bulalım (çubuk ölçekleme için)
  const allMins = daily.map((d) => d.tempMin);
  const allMaxs = daily.map((d) => d.tempMax);
  const minOverall = Math.min(...allMins);
  const maxOverall = Math.max(...allMaxs);
  const range = Math.max(1, maxOverall - minOverall);

  return (
    <div className="my-5 p-4 rounded-3xl bg-white/[0.05] backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-sky-400" />
          <span>7 Günlük Hava Tahmini</span>
        </h3>
        <span className="text-xs text-slate-400">Min / Maks</span>
      </div>

      <div className="divide-y divide-white/5">
        {daily.map((item, index) => {
          const meta = getWeatherConditionMeta(item.weatherCode, true);
          const isToday = index === 0;

          // Çubuğun sol ofseti ve genişliği (%)
          const leftPercent = Math.max(0, Math.min(100, ((item.tempMin - minOverall) / range) * 100));
          const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((item.tempMax - item.tempMin) / range) * 100));

          return (
            <div
              key={index}
              className="py-3 flex items-center justify-between gap-3 text-xs"
            >
              {/* Gün Adı */}
              <div className="w-16 shrink-0">
                <span className={`font-medium ${isToday ? 'text-sky-300 font-semibold' : 'text-slate-300'}`}>
                  {formatDayName(item.date)}
                </span>
              </div>

              {/* İkon & Yağış İhtimali */}
              <div className="flex items-center gap-1.5 w-20 shrink-0">
                <WeatherIcon category={meta.category} isDay={true} size="sm" />
                {item.precipitationProbability > 15 ? (
                  <span className="flex items-center gap-0.5 text-[10px] text-sky-400 font-medium">
                    <Droplets className="w-2.5 h-2.5" />
                    %{item.precipitationProbability}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 truncate max-w-[50px]">
                    {meta.category === 'clear' ? 'Açık' : 'Bulutlu'}
                  </span>
                )}
              </div>

              {/* Min Sıcaklık */}
              <span className="w-8 text-right font-mono tabular-nums text-slate-400 font-medium">
                {item.tempMin}°
              </span>

              {/* Sıcaklık Görsel Çubuğu */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden min-w-[50px]">
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
              </div>

              {/* Maks Sıcaklık */}
              <span className="w-8 text-left font-mono tabular-nums text-white font-bold">
                {item.tempMax}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
