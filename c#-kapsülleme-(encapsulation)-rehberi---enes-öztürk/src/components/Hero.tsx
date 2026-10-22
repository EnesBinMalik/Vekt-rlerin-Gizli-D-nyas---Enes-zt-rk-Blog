import React from 'react';
import { ArrowDown, Code2, Lock, ShieldCheck, Terminal } from 'lucide-react';

interface HeroProps {
  onStartLab: () => void;
  onReadArticle: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLab, onReadArticle }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author kicker without pill badges */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
          <span className="text-indigo-400 font-semibold">C# & Nesne Yönelimli Programlama (OOP)</span>
          <span aria-hidden="true">·</span>
          <span>Kapsülleme (Encapsulation) Prensipleri</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 font-semibold">Enes Öztürk İmzasıyla</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Kapsülleme ile Sınıf Verilerinizi Bilinçsiz Kullanımdan Koruyun
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              C#, %100 nesne yönelimli güçlü bir dildir. Kapsülleme (Encapsulation), nesnenin
              özelliklerini diğer sınıflardan saklamak ya da korumaktır. <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">private field</code>'ları
              dış dünyanın keyfi müdahalelerine kapatıp, kontrollü <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">public property</code> (get/set)
              yapılarıyla iş kurallarını garanti altına alırsınız.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartLab}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Terminal className="w-4 h-4" />
                <span>İnteraktif Simülatörü Başlat</span>
              </button>
              <button
                onClick={onReadArticle}
                className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Code2 className="w-4 h-4 text-slate-400" />
                <span>Ogrenci & Person Kod İncelemesi</span>
              </button>
            </div>

            {/* Clean metadata strip */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
              <div>
                <div className="text-slate-100 font-bold text-base font-mono tabular-nums">%100 OOP</div>
                <div className="mt-0.5 text-slate-400">Nesne Yönelimli Mimari</div>
              </div>
              <div>
                <div className="text-slate-100 font-bold text-base font-mono">Private Field</div>
                <div className="mt-0.5 text-slate-400">Gizli Bellek Deposu</div>
              </div>
              <div>
                <div className="text-slate-100 font-bold text-base font-mono">Get / Set</div>
                <div className="mt-0.5 text-slate-400">Filtrelenmiş Doğrulama</div>
              </div>
            </div>
          </div>

          {/* Visual Concept Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-mono text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Kapsül Koruma Mimarisi
                </span>
                <span className="text-indigo-400 font-mono">Enes Öztürk C# Dersleri</span>
              </div>

              {/* Graphical representation of the Capsule */}
              <div className="space-y-3 font-mono text-xs">
                {/* Outer World */}
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Dış Dünya (Main)</span>
                  <span className="text-emerald-400">person.Age = 25;</span>
                </div>

                {/* Gateway */}
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="text-indigo-300 font-semibold text-xs flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    Public Property (Age) - Kalkan & Filtre
                  </div>
                  <div className="space-y-1.5 pl-2 text-[11px]">
                    <div className="text-slate-300">
                      <span className="text-indigo-400 font-bold">set:</span> if (value &gt; 0) age = value;
                    </div>
                    <div className="text-slate-300">
                      <span className="text-indigo-400 font-bold">get:</span> return age;
                    </div>
                  </div>
                </div>

                {/* Vault Core */}
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                  <div className="text-amber-300 font-semibold text-xs flex items-center gap-1.5 mb-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Private Field (Gizli Çekirdek Alan)
                  </div>
                  <div className="text-slate-300 text-[11px] pl-2">
                    <code className="text-amber-400">private int age = 0;</code>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Sınıf dışından doğrudan erişilemez (CS0122 Derleme Koruması).
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic text-center">
                &ldquo;Kapsülleme sayesinde nesneler bilinçsiz atamalardan ve hatalı durumlardan korunur.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
