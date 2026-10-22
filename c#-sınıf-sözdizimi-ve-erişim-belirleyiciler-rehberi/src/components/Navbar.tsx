/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface NavbarProps {
  onDownloadNotes: () => void;
}

export default function Navbar({ onDownloadNotes }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
        >
          C# OOP Temelleri
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#neden-sinif"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Sınıf Nedir?
          </a>
          <a
            href="#sozdizimi"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Sözdizimi
          </a>
          <a
            href="#builder"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Sınıf Oluşturucu
          </a>
          <a
            href="#erisim-belirleyiciler"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Erişim Belirleyiciler
          </a>
          <a
            href="#test"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Alıştırma & Test
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadNotes}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-indigo-600 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Özet Notları Al
          </button>
        </div>
      </div>
    </header>
  );
}
