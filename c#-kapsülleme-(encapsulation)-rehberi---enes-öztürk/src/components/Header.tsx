import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('top');
          }}
          className="flex items-center gap-2.5 text-slate-100 font-bold text-lg tracking-tight whitespace-nowrap shrink-0 group hover:text-indigo-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/30 transition-all">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span>C# Kapsülleme Rehberi</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavigate('lab')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              activeSection === 'lab' ? 'text-indigo-400' : ''
            }`}
          >
            Canlı Simülatör
          </button>
          <button
            onClick={() => onNavigate('ogrenci-person')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              activeSection === 'ogrenci-person' ? 'text-indigo-400' : ''
            }`}
          >
            Örnek Kodlar
          </button>
          <button
            onClick={() => onNavigate('syntax')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              activeSection === 'syntax' ? 'text-indigo-400' : ''
            }`}
          >
            Sözdizimi Türleri
          </button>
          <button
            onClick={() => onNavigate('modifiers')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              activeSection === 'modifiers' ? 'text-indigo-400' : ''
            }`}
          >
            Erişim Belirteçleri
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 ${
              activeSection === 'quiz' ? 'text-indigo-400' : ''
            }`}
          >
            Test & Pekiştirme
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('author')}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Enes Öztürk İmzasıyla</span>
          </button>
        </div>
      </div>
    </header>
  );
};
