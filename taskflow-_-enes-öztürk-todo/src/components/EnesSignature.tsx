import React from 'react';
import { Award, Heart, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';

interface EnesSignatureProps {
  onOpenProjectInfo: () => void;
}

export const EnesSignature: React.FC<EnesSignatureProps> = ({ onOpenProjectInfo }) => {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Signature block */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
            EÖ
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span>Enes Öztürk İmzasıyla</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-[11px] text-slate-400">
              Frontend Geliştirici & UI/UX Tasarım
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProjectInfo}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ödev & İnceleme Detayları</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-[11px] text-slate-600 flex flex-wrap items-center justify-center gap-2">
        <span>React 19</span>
        <span aria-hidden="true">·</span>
        <span>TypeScript</span>
        <span aria-hidden="true">·</span>
        <span>Tailwind CSS</span>
        <span aria-hidden="true">·</span>
        <span>Long-Press Gestures</span>
        <span aria-hidden="true">·</span>
        <span>{new Date().getFullYear()} TaskFlow</span>
      </div>
    </footer>
  );
};
