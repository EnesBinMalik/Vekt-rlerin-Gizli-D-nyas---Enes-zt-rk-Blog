import React from 'react';
import { HourlyForecastItem } from '../types/weather';
import { getWeatherConditionMeta, formatHour } from '../services/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="my-5">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>24 Saatlik Hava Tahmini</span>
        </h3>
        <span className="text-xs text-slate-400">Saat başı görünüm</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {hourly.map((item, index) => {
          const meta = getWeatherConditionMeta(item.weatherCode, item.isDay);
          const isNow = index === 0;

          return (
            <div
              key={index}
              className={`shrink-0 flex flex-col items-center justify-between py-3 px-3 rounded-2xl min-w-[72px] transition-all duration-200 ${
                isNow
                  ? 'bg-sky-500/20 border border-sky-400/40 shadow-sm'
                  : 'bg-white/[0.05] border border-white/5 hover:bg-white/[0.08]'
              }`}
            >
              <span className={`text-[11px] font-medium ${isNow ? 'text-sky-300 font-semibold' : 'text-slate-400'}`}>
                {isNow ? 'Şimdi' : formatHour(item.time)}
              </span>

              <div className="my-2">
                <WeatherIcon category={meta.category} isDay={item.isDay} size="sm" />
              </div>

              <span className="text-base font-bold text-white font-mono tabular-nums">
                {item.temperature}°
              </span>

              {item.humidity !== undefined && (
                <span className="text-[10px] text-sky-300/80 mt-1 font-mono">
                  %{item.humidity}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
