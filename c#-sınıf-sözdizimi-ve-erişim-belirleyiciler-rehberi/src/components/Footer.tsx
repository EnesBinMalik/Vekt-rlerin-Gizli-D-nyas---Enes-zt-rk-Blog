/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">C# OOP Temelleri</span>
          <span aria-hidden="true">·</span>
          <span>Sınıf Sözdizimi, Field & Metot, Erişim Belirleyiciler</span>
        </div>

        <div className="flex items-center gap-3">
          <span>İmza:</span>
          <span className="font-semibold text-slate-900">Enes Öztürk</span>
          <span aria-hidden="true">·</span>
          <span>Tüm Hakları Saklıdır</span>
        </div>
      </div>
    </footer>
  );
}
