import React from 'react';
import { Share2, Bookmark, Sun, Moon, Coffee, Type, Sparkles } from 'lucide-react';
import { ReaderTheme, FontSize } from '../types/blog';

interface HeaderProps {
  progress: number;
  theme: ReaderTheme;
  setTheme: (t: ReaderTheme) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  onShareClick: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  onShareClick,
  isBookmarked,
  onBookmarkToggle,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-stone-200/80 bg-white/90 dark:bg-stone-900/90 dark:border-stone-800 transition-colors">
      {/* Progress Bar */}
      <div className="h-1 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand / Publication Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold font-sans-ui text-stone-900 dark:text-white tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white text-xs font-black">
              EÖ
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-bold">Enes Öztürk</span>
              <span className="block text-[10px] text-amber-700 dark:text-amber-400 font-medium tracking-wider uppercase">
                Veri Bilimi Denemeleri
              </span>
            </div>
          </div>
        </div>

        {/* Reader Customization Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme switcher */}
          <div className="flex items-center rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
            <button
              onClick={() => setTheme('light')}
              title="Aydınlık Mod"
              className={`p-1.5 rounded-md transition-all ${
                theme === 'light' ? 'bg-white shadow-xs text-amber-600' : 'hover:text-stone-900'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              title="Sepya / Kitap Modu"
              className={`p-1.5 rounded-md transition-all ${
                theme === 'sepia' ? 'bg-[#f4ecd8] text-amber-900 shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              <Coffee className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Karanlık Mod"
              className={`p-1.5 rounded-md transition-all ${
                theme === 'dark' ? 'bg-stone-700 text-amber-400 shadow-xs' : 'hover:text-stone-200'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Font Size Toggle */}
          <div className="hidden sm:flex items-center rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => setFontSize(fontSize === 'lg' ? 'base' : 'sm')}
              className="px-2 py-1 rounded hover:text-stone-900"
              title="Yazı Tipini Küçült"
            >
              A-
            </button>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <button
              onClick={() => setFontSize(fontSize === 'base' ? 'lg' : fontSize === 'lg' ? 'xl' : 'base')}
              className="px-2 py-1 rounded hover:text-stone-900"
              title="Yazı Tipini Büyüt"
            >
              A+
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={onBookmarkToggle}
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title={isBookmarked ? 'Kaydedildi' : 'Yazıyı Kaydet'}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Primary Share Action */}
          <button
            onClick={onShareClick}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-3 py-1.5 text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-xs active:scale-95"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Paylaş</span>
          </button>
        </div>
      </div>
    </header>
  );
};
