import React from 'react';
import { Type, Moon, Sun, BookOpen } from 'lucide-react';
import { ReadingTheme, FontSize } from '../types';

interface ThemeAndFontControlsProps {
  theme: ReadingTheme;
  setTheme: (t: ReadingTheme) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
}

export const ThemeAndFontControls: React.FC<ThemeAndFontControlsProps> = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl border border-stone-200/80 bg-white/80 backdrop-blur-xs text-xs text-stone-600">
      {/* Theme Picker */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-stone-500">Okuma Modu:</span>
        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setTheme('paper')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
              theme === 'paper' ? 'bg-[#F7F4EE] text-amber-950 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-800" /> Arşiv Kağıdı
          </button>
          <button
            type="button"
            onClick={() => setTheme('clean')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
              theme === 'clean' ? 'bg-white text-stone-900 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-stone-500" /> Beyaz
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
              theme === 'dark' ? 'bg-stone-900 text-stone-100 font-semibold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-stone-400" /> Gece
          </button>
        </div>
      </div>

      {/* Font Size Adjuster */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-stone-500 flex items-center gap-1">
          <Type className="w-3.5 h-3.5" /> Metin Boyutu:
        </span>
        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setFontSize('normal')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
              fontSize === 'normal' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Standart
          </button>
          <button
            type="button"
            onClick={() => setFontSize('large')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
              fontSize === 'large' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Büyük
          </button>
          <button
            type="button"
            onClick={() => setFontSize('larger')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
              fontSize === 'larger' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            En Büyük
          </button>
        </div>
      </div>
    </div>
  );
};
