import React, { useState } from 'react';
import { Heart, Share2, Copy, Check, ArrowUp, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingToolbarProps {
  progress: number;
  onShareClick: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onScrollToTop: () => void;
}

export const ReadingToolbar: React.FC<ReadingToolbarProps> = ({
  progress,
  onShareClick,
  isBookmarked,
  onBookmarkToggle,
  onScrollToTop,
}) => {
  const [claps, setClaps] = useState<number>(142);
  const [userClapped, setUserClapped] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleClap = () => {
    setClaps((c) => c + 1);
    setUserClapped((u) => u + 1);

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.9, x: 0.5 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6'],
    });
  };

  const handleQuickCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 rounded-full bg-stone-900/90 dark:bg-stone-800/90 text-white px-4 py-2 shadow-2xl backdrop-blur-md border border-stone-700/60">
        {/* Claps button */}
        <button
          onClick={handleClap}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-stone-800 dark:hover:bg-stone-700 transition-colors group active:scale-95"
          title="Yazıyı Beğen / Alkışla"
        >
          <span className="text-base group-hover:scale-125 transition-transform inline-block">
            👏
          </span>
          <span className="font-mono text-xs font-bold text-amber-300">
            {claps}
          </span>
        </button>

        <span className="h-4 w-px bg-stone-700 inline-block" />

        {/* Quick Link Copy Button */}
        <button
          onClick={handleQuickCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs hover:bg-stone-800 dark:hover:bg-stone-700 transition-colors text-stone-200"
          title="Yazının Linkini Kopyala"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-[11px]">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-stone-400" />
              <span className="hidden sm:inline text-[11px]">Linki Kopyala</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={onShareClick}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-colors"
          title="Sosyal Ağlarda Paylaş"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="text-[11px]">Paylaş</span>
        </button>

        <span className="h-4 w-px bg-stone-700 inline-block" />

        {/* Bookmark */}
        <button
          onClick={onBookmarkToggle}
          className={`p-1.5 rounded-full hover:bg-stone-800 transition-colors ${
            isBookmarked ? 'text-amber-400' : 'text-stone-400'
          }`}
          title="Yazıyı Kaydet"
        >
          <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Scroll Top & Progress */}
        <button
          onClick={onScrollToTop}
          className="flex items-center gap-1 p-1.5 rounded-full hover:bg-stone-800 transition-colors text-stone-400 hover:text-white"
          title="En Başa Dön"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] text-stone-400 hidden sm:inline">
            %{Math.round(progress)}
          </span>
        </button>
      </div>
    </div>
  );
};
