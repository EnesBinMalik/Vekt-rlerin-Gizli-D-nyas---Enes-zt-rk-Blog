import React, { useState } from 'react';
import { OVERLOAD_PRESETS } from '../data/constructorContent';
import { ProgrammingLanguage } from '../types';
import { Layers, Code2, Copy, Check, Sparkles, SlidersHorizontal } from 'lucide-react';

export const OverloadPlayground: React.FC = () => {
  const [selectedOverloadId, setSelectedOverloadId] = useState<string>('two_params');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('csharp');
  const [copied, setCopied] = useState(false);

  // User parameter inputs
  const [paramValues, setParamValues] = useState<Record<string, string>>({
    ad: 'Elif Yılmaz',
    yas: '22',
    kayitliMi: 'true',
    bakiye: '320.00'
  });

  const currentOverload = OVERLOAD_PRESETS.find((o) => o.id === selectedOverloadId) || OVERLOAD_PRESETS[0];

  const handleCopyCode = () => {
    const code = currentOverload.codeExample[selectedLanguage];
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParamChange = (name: string, val: string) => {
    setParamValues((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  // Generate dynamic invocation snippet
  const getDynamicInvocation = () => {
    if (currentOverload.id === 'default') {
      return `Ogrenci ogr = new Ogrenci();`;
    }
    if (currentOverload.id === 'single_param') {
      return `Ogrenci ogr = new Ogrenci("${paramValues.ad || 'İsimsiz'}");`;
    }
    if (currentOverload.id === 'two_params') {
      return `Ogrenci ogr = new Ogrenci("${paramValues.ad || 'İsimsiz'}", ${paramValues.yas || 0});`;
    }
    if (currentOverload.id === 'full_params') {
      return `Ogrenci ogr = new Ogrenci("${paramValues.ad || 'İsimsiz'}", ${paramValues.yas || 0}, ${paramValues.kayitliMi === 'true'}, ${paramValues.bakiye || 0.0});`;
    }
    return '';
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <span>03. Aşırı Yükleme Laboratuvarı</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Constructor Overloading</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Kurucu Metotların Aşırı Yüklenmesi (Overload)
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
          Aynı sınıfta farklı parametre listelerine (imzalara) sahip birden fazla kurucu metot tanımlayarak nesne oluşturma esnekliğini artırabilirsiniz. Aşağıdan farklı imzaları seçerek nesnenin bellekte nasıl yapılandığını inceleyin.
        </p>
      </div>

      {/* Overload Signature Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {OVERLOAD_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedOverloadId(preset.id)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedOverloadId === preset.id
                ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
            }`}
          >
            <div className="text-[11px] font-mono text-cyan-400 mb-1">{preset.signature}</div>
            <div className="text-xs font-bold text-white mb-1.5">{preset.name}</div>
            <div className="text-[11px] text-slate-400 line-clamp-2">{preset.description}</div>
          </button>
        ))}
      </div>

      {/* Interactive Testing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Input Controls & Object State Inspector */}
        <div className="lg:col-span-5 space-y-6">
          {/* Parameter Inputs (if applicable) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-4">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Parametre Değerlerini Belirleyin</span>
            </div>

            {currentOverload.params.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold block mb-1">Parametresiz Çağrı:</span>
                Hiçbir parametre gönderilmiyor. Varsayılan kurucu tüm alanları arka planda otomatik default değerlere set eder.
              </div>
            ) : (
              <div className="space-y-3.5">
                {currentOverload.params.map((p) => (
                  <div key={p.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-cyan-300">{p.name} ({p.type}):</span>
                      <span className="text-[11px] text-slate-400">{p.description}</span>
                    </div>

                    {p.type === 'bool' ? (
                      <select
                        value={paramValues[p.name] || 'true'}
                        onChange={(e) => handleParamChange(p.name, e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      >
                        <option value="true">true (Kayıtlı)</option>
                        <option value="false">false (Kayıtlı Değil)</option>
                      </select>
                    ) : (
                      <input
                        type={p.type === 'int' || p.type === 'double' ? 'number' : 'text'}
                        value={paramValues[p.name] ?? p.defaultVal}
                        onChange={(e) => handleParamChange(p.name, e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Generated Invocation Line */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Oluşturulan Çağrı İfadesi:</span>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                {getDynamicInvocation()}
              </div>
            </div>
          </div>

          {/* Resulting Heap Object State Inspector */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-200">
                Oluşan Nesnenin Bellek Durumu (Heap Fields)
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                ID: 0x00A89F
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {/* Ad */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">ogr.Ad:</span>
                {currentOverload.id === 'default' ? (
                  <span className="text-amber-400 font-semibold">null (Varsayılan)</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">"{paramValues.ad || 'İsimsiz'}"</span>
                )}
              </div>

              {/* Yas */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">ogr.Yas:</span>
                {currentOverload.id === 'default' || currentOverload.id === 'single_param' ? (
                  <span className="text-cyan-400 font-semibold">0 (Varsayılan)</span>
                ) : (
                  <span className="text-cyan-300 font-semibold">{paramValues.yas || 0}</span>
                )}
              </div>

              {/* KayitliMi */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">ogr.KayitliMi:</span>
                {currentOverload.id === 'full_params' ? (
                  <span className="text-purple-400 font-semibold">{paramValues.kayitliMi}</span>
                ) : (
                  <span className="text-purple-400/80 font-semibold">false (Varsayılan)</span>
                )}
              </div>

              {/* Bakiye */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">ogr.Bakiye:</span>
                {currentOverload.id === 'full_params' ? (
                  <span className="text-yellow-400 font-semibold">{paramValues.bakiye || '0.00'} ₺</span>
                ) : (
                  <span className="text-yellow-400/80 font-semibold">0.0 (Varsayılan)</span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
              Parametre verilmeyen tüm alanlar için derleyici, arka planda güvenli varsayılan değerleri set ederek belleğin kararsız kalmasını engeller.
            </div>
          </div>
        </div>

        {/* Right: Code Inspector in Multiple Languages */}
        <div className="lg:col-span-7">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Header with language picker */}
            <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => setSelectedLanguage('csharp')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedLanguage === 'csharp'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  C#
                </button>
                <button
                  onClick={() => setSelectedLanguage('java')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedLanguage === 'java'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Java
                </button>
                <button
                  onClick={() => setSelectedLanguage('typescript')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedLanguage === 'typescript'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setSelectedLanguage('cpp')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedLanguage === 'cpp'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  C++
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto min-h-[380px]">
              <pre>
                <code>{currentOverload.codeExample[selectedLanguage]}</code>
              </pre>
            </div>

            {/* Language explanation footer */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
              {selectedLanguage === 'csharp' && (
                <span><strong>C# Sözdizimi:</strong> Kurucu adı sınıf ile aynıdır (<code>Ogrenci</code>). Aşırı yüklemeler aynı sınıf içerisinde parametre listesi değiştirilerek yapılır.</span>
              )}
              {selectedLanguage === 'java' && (
                <span><strong>Java Sözdizimi:</strong> Java'da da C#'taki gibi kurucu ismi sınıf ismiyle aynıdır. <code>this()</code> ile bir kurucudan diğerine delegasyon yapılabilir.</span>
              )}
              {selectedLanguage === 'typescript' && (
                <span><strong>TypeScript Sözdizimi:</strong> TypeScript'te kurucu ismi sınıf ismi değil doğrudan <code>constructor</code> anahtar kelimesidir. Parametre önünde <code>public</code> yazılarak otomatik alan tanımlanabilir.</span>
              )}
              {selectedLanguage === 'cpp' && (
                <span><strong>C++ Sözdizimi:</strong> C++'ta üye başlatma listesi (member initializer list: <code>: ad(ad), yas(yas)</code>) kullanılarak nesne alanları kurucu gövdesi çalışmadan önce doğrudan başlatılır.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
