/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ACCESS_MODIFIERS,
  ACCESS_SCENARIOS,
  AccessModifierInfo,
} from '../data/oopData';
import {
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCode,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

export default function AccessModifiersSection() {
  const [selectedModifier, setSelectedModifier] = useState<
    'public' | 'private' | 'internal' | 'protected'
  >('private');

  const [activeScenarioId, setActiveScenarioId] = useState<string>('sameAssemblyOther');

  const activeModifierInfo =
    ACCESS_MODIFIERS.find((m) => m.name === selectedModifier) ||
    ACCESS_MODIFIERS[0];

  const activeScenario =
    ACCESS_SCENARIOS.find((s) => s.id === activeScenarioId) ||
    ACCESS_SCENARIOS[1];

  // Determine if the combination is allowed
  const isAccessible =
    activeModifierInfo.scopeRules[
      activeScenario.id as keyof typeof activeModifierInfo.scopeRules
    ];

  return (
    <section
      id="erisim-belirleyiciler"
      className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200"
    >
      {/* Section Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
          Erişim Koruması ve Kapsülleme
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          04. Erişim Belirleyiciler (Access Modifiers)
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Erişim belirleyiciler önüne geldiği öğenin (field, metot, sınıf) projenin
          nerelerinden erişilebileceğini belirler.{' '}
          <span className="font-semibold text-slate-800">
            Öğeleri koruyan güvenlik kapıları gibi düşünebilirsiniz.
          </span>
        </p>
      </div>

      {/* 4 Access Modifiers Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {ACCESS_MODIFIERS.map((item, idx) => {
          const isSelected = selectedModifier === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setSelectedModifier(item.name)}
              className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    0{idx + 1}. Belirleyici
                  </span>
                  {item.name === 'public' && <Unlock className="w-4 h-4 text-emerald-600" />}
                  {item.name === 'private' && <Lock className="w-4 h-4 text-rose-600" />}
                  {item.name === 'internal' && <Layers className="w-4 h-4 text-amber-600" />}
                  {item.name === 'protected' && <Shield className="w-4 h-4 text-indigo-600" />}
                </div>

                <div className="text-lg font-bold font-mono text-slate-900 mb-1">
                  {item.name}
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-normal">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
                  Günlük Hayat Benzetimi:
                </span>
                <p className="text-xs text-slate-700 italic">
                  "{item.analogy}"
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Modifier Deep-Dive Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold ${activeModifierInfo.badgeBg} ${activeModifierInfo.badgeText}`}
            >
              {activeModifierInfo.name}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {activeModifierInfo.displayName}
            </h3>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {activeModifierInfo.name === 'private' && '⚠️ C# Sınıf Üyelerinin Varsayılanıdır'}
            {activeModifierInfo.name === 'public' && '🌐 En Geniş Kapsamlı Belirleyici'}
            {activeModifierInfo.name === 'internal' && '📦 Assembly (.dll / .exe) Sınırı'}
            {activeModifierInfo.name === 'protected' && '🧬 Kalıtım (Inheritance) Odaklı'}
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
          {activeModifierInfo.detail}
        </p>
      </div>

      {/* Interactive Simulation Lab */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 text-white mb-12">
        <div className="mb-6">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Canlı Laboratuvar
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Erişim & Derleme Simülatörü
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Aşağıdan bir erişim belirleyici ve çağıran kod senaryosu seçin. C# derleyicisinin
            bu çağrıya nasıl yanıt verdiğini canlı olarak gözlemleyin.
          </p>
        </div>

        {/* Step 1: Select Modifier */}
        <div className="mb-6">
          <label className="block text-xs font-mono text-slate-400 mb-2">
            1. Hedef Üyenin Erişim Belirleyicisi:
          </label>
          <div className="flex flex-wrap gap-2">
            {ACCESS_MODIFIERS.map((mod) => (
              <button
                key={mod.name}
                onClick={() => setSelectedModifier(mod.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedModifier === mod.name
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {mod.name} int Deger;
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Caller Scenario */}
        <div className="mb-6">
          <label className="block text-xs font-mono text-slate-400 mb-2">
            2. Çağıran Kodun Konumu (Nereden Erişmeye Çalışıyoruz?):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ACCESS_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => setActiveScenarioId(scen.id)}
                className={`p-3 rounded-lg text-left text-xs transition-all border ${
                  activeScenarioId === scen.id
                    ? 'bg-slate-800 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="font-semibold text-slate-200 mb-1">{scen.title}</div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {scen.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Result Box */}
        <div
          className={`p-5 rounded-xl border ${
            isAccessible
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {isAccessible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>
                  {isAccessible
                    ? '✅ ERİŞİM BAŞARILI (Derleme Hatası Yok)'
                    : '❌ DERLEME HATASI: CS0122'}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {isAccessible ? (
                  <>
                    <strong className="font-mono text-white">{selectedModifier}</strong> olarak
                    tanımlanan üye, seçtiğiniz konumdan (
                    <strong className="text-white">{activeScenario.title}</strong>) başarıyla
                    okunabilir veya çağrılabilir.
                  </>
                ) : (
                  <>
                    <strong className="font-mono text-white">{selectedModifier}</strong> olarak
                    tanımlanan üye, koruma düzeyi nedeniyle (
                    <strong className="text-white">{activeScenario.title}</strong>) konumundan
                    erişilemez. C# derleyicisi:{' '}
                    <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-[11px]">
                      error CS0122: 'BankaHesabi.Deger' is inaccessible due to its protection level
                    </code>{' '}
                    hatasını verir.
                  </>
                )}
              </p>

              {/* Sample Code for this scenario */}
              <div className="mt-3 pt-3 border-t border-white/10 font-mono text-xs">
                <span className="text-slate-400 text-[11px] block mb-1">
                  Derleyicinin İncelediği Kod:
                </span>
                <div className="bg-black/60 p-3 rounded-lg text-slate-300 overflow-x-auto">
                  <pre>
                    {activeScenario.callerCode.replace(
                      '// [HEDEF_CAGRI]',
                      isAccessible
                        ? `hesap.Deger = 100; // ✅ Başarıyla erişildi`
                        : `hesap.Deger = 100; // ❌ CS0122: '${selectedModifier}' koruması engeller`
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Access Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            Erişim Belirleyiciler Karşılaştırma Matrisi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            C# dilindeki tüm kapsam kurallarının toplu özeti
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/70 font-semibold text-slate-700">
                <th className="py-3 px-4">Erişim Belirleyici</th>
                <th className="py-3 px-4">Aynı Sınıf</th>
                <th className="py-3 px-4">Aynı Proje (Miras Alan)</th>
                <th className="py-3 px-4">Aynı Proje (Dış Sınıf)</th>
                <th className="py-3 px-4">Farklı Proje (Miras Alan)</th>
                <th className="py-3 px-4">Farklı Proje (Dış Sınıf)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ACCESS_MODIFIERS.map((mod) => (
                <tr
                  key={mod.name}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    selectedModifier === mod.name ? 'bg-indigo-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${mod.badgeBg} ${mod.badgeText}`}
                    >
                      {mod.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-600 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Evet
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {mod.scopeRules.sameAssemblyDerived ? (
                      <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Evet
                      </span>
                    ) : (
                      <span className="text-rose-500 font-medium inline-flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Hayır
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {mod.scopeRules.sameAssemblyOther ? (
                      <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Evet
                      </span>
                    ) : (
                      <span className="text-rose-500 font-medium inline-flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Hayır
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {mod.scopeRules.diffAssemblyDerived ? (
                      <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Evet
                      </span>
                    ) : (
                      <span className="text-rose-500 font-medium inline-flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Hayır
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {mod.scopeRules.diffAssemblyOther ? (
                      <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Evet
                      </span>
                    ) : (
                      <span className="text-rose-500 font-medium inline-flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Hayır
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
