import React, { useState } from 'react';
import { Lock, Unlock, Shield, Globe, Building, Check, X } from 'lucide-react';

interface ModifierInfo {
  name: string;
  keyword: string;
  description: string;
  level: string;
  matrix: {
    sameClass: boolean;
    derivedClassSameAssembly: boolean;
    derivedClassOtherAssembly: boolean;
    nonDerivedSameAssembly: boolean;
    nonDerivedOtherAssembly: boolean;
  };
}

export const AccessModifiersGuide: React.FC = () => {
  const [selectedModifier, setSelectedModifier] = useState<string>('private');

  const modifiers: ModifierInfo[] = [
    {
      name: 'Private (En Sıkı)',
      keyword: 'private',
      level: 'Yalnızca Tanımlandığı Sınıf',
      description:
        'Kapsüllemenin temelidir. Değişken (field) yalnızca bildirildiği sınıfın süslü parantezleri { } içinden görülebilir. Dışarıdaki hiçbir kod ve türetilmiş alt sınıflar dahi bu alana erişemez.',
      matrix: {
        sameClass: true,
        derivedClassSameAssembly: false,
        derivedClassOtherAssembly: false,
        nonDerivedSameAssembly: false,
        nonDerivedOtherAssembly: false,
      },
    },
    {
      name: 'Public (En Açık)',
      keyword: 'public',
      level: 'Her Yerden Erişilebilir',
      description:
        'Sınırlama yoktur. Hem aynı assembly içindeki hem de bu projeyi referans alan harici tüm assembly ve sınıflardan serbestçe erişilebilir. Genellikle Property\'ler ve arayüz metotları public yapılır.',
      matrix: {
        sameClass: true,
        derivedClassSameAssembly: true,
        derivedClassOtherAssembly: true,
        nonDerivedSameAssembly: true,
        nonDerivedOtherAssembly: true,
      },
    },
    {
      name: 'Protected (Kalıtım İçi)',
      keyword: 'protected',
      level: 'Sınıf ve Miras Alanlar',
      description:
        'Kendi sınıfı ve bu sınıftan miras (inheritance) alan alt sınıflar içerisinden erişilebilir. Nesne örneği üzerinden doğrudan dışarıdan çağrılamaz.',
      matrix: {
        sameClass: true,
        derivedClassSameAssembly: true,
        derivedClassOtherAssembly: true,
        nonDerivedSameAssembly: false,
        nonDerivedOtherAssembly: false,
      },
    },
    {
      name: 'Internal (Proje İçi)',
      keyword: 'internal',
      level: 'Aynı Assembly (Proje)',
      description:
        'Yalnızca derlenen aynı assembly (DLL veya EXE projesi) içerisindeki kodlar erişebilir. Dış projeler bu üyeyi göremez.',
      matrix: {
        sameClass: true,
        derivedClassSameAssembly: true,
        derivedClassOtherAssembly: false,
        nonDerivedSameAssembly: true,
        nonDerivedOtherAssembly: false,
      },
    },
  ];

  const current = modifiers.find((m) => m.keyword === selectedModifier) || modifiers[0];

  return (
    <section id="modifiers" className="py-16 border-b border-slate-800 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>C# ERİŞİM BELİRTEÇLERİ (ACCESS MODIFIERS)</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Enes Öztürk İmzasıyla</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Kapsüllemenin Güvenlik Katmanları
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Kapsülleme yapılırken doğru erişim belirtecini seçmek yazılım mimarisinin güvenliğini ve bakım kolaylığını belirler.
          </p>
        </div>

        {/* Interactive Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {modifiers.map((mod) => (
            <button
              key={mod.keyword}
              onClick={() => setSelectedModifier(mod.keyword)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedModifier === mod.keyword
                  ? 'bg-indigo-950/50 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-indigo-300">
                  {mod.keyword}
                </span>
                {mod.keyword === 'private' ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : mod.keyword === 'public' ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Shield className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <div className="text-sm font-semibold text-slate-100">{mod.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{mod.level}</div>
            </button>
          ))}
        </div>

        {/* Matrix & Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detail card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-sm font-bold text-indigo-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {current.keyword}
              </span>
              <span className="text-sm font-semibold text-slate-200">{current.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Kapsülleme Kuralı:
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-mono">
                {current.keyword === 'private' && (
                  <span className="text-amber-300">
                    &ldquo;Field'ları daima private yapın; nesnenin ham belleğini dış dünyaya asla doğrudan teslim etmeyin.&rdquo;
                  </span>
                )}
                {current.keyword === 'public' && (
                  <span className="text-emerald-300">
                    &ldquo;Property'leri public yapın; dış dünya ile güvenli iletişim bu kontrollü get/set kapılarından aksın.&rdquo;
                  </span>
                )}
                {current.keyword === 'protected' && (
                  <span className="text-indigo-300">
                    &ldquo;Kalıtım hiyerarşisinde alt sınıfların bilmesi gereken ancak dış dünyanın görmemesi gereken üyeler içindir.&rdquo;
                  </span>
                )}
                {current.keyword === 'internal' && (
                  <span className="text-cyan-300">
                    &ldquo;Büyük projelerde modül içi yardımcı sınıfları dış kütüphanelerden gizlemek için kullanılır.&rdquo;
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Access Matrix Table (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">
                Erişim İzinleri Tablosu: <code className="text-indigo-400">{current.keyword}</code>
              </span>
              <span className="text-slate-400">C# Derleme Kuralları</span>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              <div className="p-3.5 flex items-center justify-between bg-slate-950/40">
                <span className="text-slate-300">Aynı Sınıf İçinden</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <Check className="w-4 h-4" /> İzin Verildi
                </span>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-300">Aynı Projedeki Alt Sınıftan (Derived Class)</span>
                {current.matrix.derivedClassSameAssembly ? (
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Check className="w-4 h-4" /> İzin Verildi
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                    <X className="w-4 h-4" /> Yasak (Erişilemez)
                  </span>
                )}
              </div>

              <div className="p-3.5 flex items-center justify-between bg-slate-950/40">
                <span className="text-slate-300">Aynı Projedeki Alakasız Sınıftan</span>
                {current.matrix.nonDerivedSameAssembly ? (
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Check className="w-4 h-4" /> İzin Verildi
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                    <X className="w-4 h-4" /> Yasak (Erişilemez)
                  </span>
                )}
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-300">Farklı Projedeki Alt Sınıftan (Referenced Assembly)</span>
                {current.matrix.derivedClassOtherAssembly ? (
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Check className="w-4 h-4" /> İzin Verildi
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                    <X className="w-4 h-4" /> Yasak (Erişilemez)
                  </span>
                )}
              </div>

              <div className="p-3.5 flex items-center justify-between bg-slate-950/40">
                <span className="text-slate-300">Farklı Projedeki Alakasız Sınıftan (Dış Dünya)</span>
                {current.matrix.nonDerivedOtherAssembly ? (
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Check className="w-4 h-4" /> İzin Verildi
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                    <X className="w-4 h-4" /> Yasak (Erişilemez)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
