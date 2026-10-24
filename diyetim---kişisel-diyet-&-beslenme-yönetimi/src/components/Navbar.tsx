import React from 'react';
import { Calendar, Utensils, Bell, BookOpen, FileText, Sparkles, Check } from 'lucide-react';

export type NavTab = 'daily' | 'programs' | 'reminders' | 'library' | 'report';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeRemindersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeRemindersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark with subtle signature kicker */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('daily')}
              className="text-left group flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
                D
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Diyetim
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-2 border border-emerald-200/60">
                  Enes Öztürk İmzasıyla
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean 5 single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onSelectTab('daily')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'daily'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              Günlük Takip
            </button>

            <button
              onClick={() => onSelectTab('programs')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'programs'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Utensils className="w-4 h-4 text-emerald-600" />
              Diyet Programları
            </button>

            <button
              onClick={() => onSelectTab('reminders')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'reminders'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4 text-emerald-600" />
              Yemek Hatırlatıcıları
              {activeRemindersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono flex items-center justify-center">
                  {activeRemindersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('library')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'library'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Besin Kütüphanesi
            </button>

            <button
              onClick={() => onSelectTab('report')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'report'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Diyet Raporu
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectTab('report')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rapor Al</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Subnav */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50/80 px-2 py-1.5 flex items-center justify-around text-xs">
        <button
          onClick={() => onSelectTab('daily')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
            currentTab === 'daily' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          Günlük
        </button>
        <button
          onClick={() => onSelectTab('programs')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
            currentTab === 'programs' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 text-emerald-600" />
          Programlar
        </button>
        <button
          onClick={() => onSelectTab('reminders')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
            currentTab === 'reminders' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Bell className="w-3.5 h-3.5 text-emerald-600" />
          Alarmlar
        </button>
        <button
          onClick={() => onSelectTab('library')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
            currentTab === 'library' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Besinler
        </button>
        <button
          onClick={() => onSelectTab('report')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
            currentTab === 'report' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Rapor
        </button>
      </div>
    </header>
  );
};
