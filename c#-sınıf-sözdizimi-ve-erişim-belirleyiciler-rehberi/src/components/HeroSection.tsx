/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Layers, ShieldCheck, Terminal } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 px-6 border-b border-slate-800">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Unboxed Metadata kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-400 font-medium mb-4 tracking-wide">
          <span>Nesne Yönelimli Programlama (OOP)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>C# Temelleri</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-emerald-400 font-semibold">Eğitmen: Enes Öztürk</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl text-balance">
          Sınıf Sözdizimi, Field & Metot Tanımlama ve Erişim Belirleyiciler
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
          C# %100 nesne yönelimli bir dildir. Tüm metotlar ve özellikler sınıflar
          içerisinde yer alır. Tek bir metotta veya sınıfta her şeyi çözmek yerine,
          sorumlulukları parçalara ayırarak kod tekrarını önleyin, okunabilirliği ve
          sistemin genişletilebilirliğini en üst düzeye çıkarın.
        </p>

        {/* Feature quick cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <a
            href="#neden-sinif"
            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-100">1. Sınıf Nedir?</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              OOP felsefesi ve neden spagetti kod yerine sınıflara böleriz?
            </p>
          </a>

          <a
            href="#sozdizimi"
            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-100">2. Sözdizimi Anatomisi</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Field (özellik/durum) ve Metot (davranış) bileşenlerinin incelenmesi.
            </p>
          </a>

          <a
            href="#builder"
            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-100">3. Sınıf Oluşturucu</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Canlı parametrelerle kendi C# sınıfını inşa et ve kodu al.
            </p>
          </a>

          <a
            href="#erisim-belirleyiciler"
            className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-100">4. Erişim Koruması</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Public, Private, Internal, Protected kuralları ve simülasyonu.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
