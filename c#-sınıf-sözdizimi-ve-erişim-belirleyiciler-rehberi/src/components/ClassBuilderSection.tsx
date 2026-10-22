/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Trash2, Copy, Check, Code2, Sparkles, RefreshCw } from 'lucide-react';

interface CustomField {
  id: string;
  modifier: 'public' | 'private' | 'protected' | 'internal';
  type: string;
  name: string;
  defaultValue?: string;
}

interface CustomMethod {
  id: string;
  modifier: 'public' | 'private' | 'protected' | 'internal';
  returnType: string;
  name: string;
  params: string;
  body: string;
}

export default function ClassBuilderSection() {
  const [className, setClassName] = useState('Ogrenci');
  const [fields, setFields] = useState<CustomField[]>([
    { id: '1', modifier: 'public', type: 'string', name: 'AdSoyad', defaultValue: '"Ahmet Yılmaz"' },
    { id: '2', modifier: 'private', type: 'int', name: 'ogrenciNo', defaultValue: '1024' },
    { id: '3', modifier: 'protected', type: 'double', name: 'notOrtalamasi', defaultValue: '3.45' },
  ]);

  const [methods, setMethods] = useState<CustomMethod[]>([
    {
      id: 'm1',
      modifier: 'public',
      returnType: 'void',
      name: 'BilgileriYazdir',
      params: '',
      body: 'Console.WriteLine($"Öğrenci: {AdSoyad}, No: {ogrenciNo}");',
    },
    {
      id: 'm2',
      modifier: 'public',
      returnType: 'bool',
      name: 'MezuniyetKontrolu',
      params: 'double barajNotu',
      body: 'return notOrtalamasi >= barajNotu;',
    },
  ]);

  const [copied, setCopied] = useState(false);

  // Field Add handler
  const addField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      modifier: 'public',
      type: 'string',
      name: `yeniAlan${fields.length + 1}`,
      defaultValue: '',
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    if (fields.length <= 1) return;
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  // Method Add handler
  const addMethod = () => {
    const newMethod: CustomMethod = {
      id: Date.now().toString(),
      modifier: 'public',
      returnType: 'void',
      name: `YeniMetot${methods.length + 1}`,
      params: '',
      body: 'Console.WriteLine("İşlem yapıldı");',
    };
    setMethods([...methods, newMethod]);
  };

  const removeMethod = (id: string) => {
    if (methods.length <= 1) return;
    setMethods(methods.filter((m) => m.id !== id));
  };

  const updateMethod = (id: string, updates: Partial<CustomMethod>) => {
    setMethods(methods.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  // Reset to default presets
  const applyPreset = (presetType: 'Ogrenci' | 'Araba' | 'BankaHesabi') => {
    if (presetType === 'Ogrenci') {
      setClassName('Ogrenci');
      setFields([
        { id: '1', modifier: 'public', type: 'string', name: 'AdSoyad', defaultValue: '"Ahmet Yılmaz"' },
        { id: '2', modifier: 'private', type: 'int', name: 'ogrenciNo', defaultValue: '1024' },
        { id: '3', modifier: 'protected', type: 'double', name: 'notOrtalamasi', defaultValue: '3.45' },
      ]);
      setMethods([
        {
          id: 'm1',
          modifier: 'public',
          returnType: 'void',
          name: 'BilgileriYazdir',
          params: '',
          body: 'Console.WriteLine($"Öğrenci: {AdSoyad}, No: {ogrenciNo}");',
        },
        {
          id: 'm2',
          modifier: 'public',
          returnType: 'bool',
          name: 'MezuniyetKontrolu',
          params: 'double barajNotu',
          body: 'return notOrtalamasi >= barajNotu;',
        },
      ]);
    } else if (presetType === 'Araba') {
      setClassName('Araba');
      setFields([
        { id: '1', modifier: 'public', type: 'string', name: 'Marka', defaultValue: '"Toyota"' },
        { id: '2', modifier: 'public', type: 'string', name: 'Model', defaultValue: '"Corolla"' },
        { id: '3', modifier: 'private', type: 'int', name: 'hiz', defaultValue: '0' },
        { id: '4', modifier: 'internal', type: 'string', name: 'sasiNo', defaultValue: '"TYT-2026-X99"' },
      ]);
      setMethods([
        {
          id: 'm1',
          modifier: 'public',
          returnType: 'void',
          name: 'Hizlan',
          params: 'int artis',
          body: 'hiz += artis;\n        Console.WriteLine($"{Marka} hızlandı. Güncel Hız: {hiz} km/s");',
        },
        {
          id: 'm2',
          modifier: 'public',
          returnType: 'int',
          name: 'MevcutHiziGetir',
          params: '',
          body: 'return hiz;',
        },
      ]);
    } else if (presetType === 'BankaHesabi') {
      setClassName('BankaHesabi');
      setFields([
        { id: '1', modifier: 'public', type: 'string', name: 'HesapNo', defaultValue: '"TR100234"' },
        { id: '2', modifier: 'private', type: 'decimal', name: 'bakiye', defaultValue: '25000m' },
        { id: '3', modifier: 'protected', type: 'string', name: 'musteriTuru', defaultValue: '"Bireysel"' },
      ]);
      setMethods([
        {
          id: 'm1',
          modifier: 'public',
          returnType: 'void',
          name: 'ParaYatir',
          params: 'decimal miktar',
          body: 'if (miktar > 0) bakiye += miktar;\n        Console.WriteLine($"Yeni Bakiye: {bakiye} TL");',
        },
        {
          id: 'm2',
          modifier: 'private',
          returnType: 'bool',
          name: 'GuvenlikOnayiAl',
          params: '',
          body: 'return true; // Sadece sınıf içinden çağrılan yardımcı metot',
        },
      ]);
    }
  };

  // Generate C# Code String
  const generatedCSharpCode = `// Hazırlayan / İmza: Enes Öztürk
// Sınıf Tanımı ve Üyeleri

public class ${className}
{
    // ==========================================
    // 1. FIELD (ÖZELLİK / DURUM) TANIMLAMALARI
    // ==========================================
${fields
  .map(
    (f) =>
      `    ${f.modifier} ${f.type} ${f.name}${f.defaultValue ? ` = ${f.defaultValue}` : ''};`
  )
  .join('\n')}

    // ==========================================
    // 2. METOT (DAVRANIŞ / İŞLEM) TANIMLAMALARI
    // ==========================================
${methods
  .map(
    (m) =>
      `    ${m.modifier} ${m.returnType} ${m.name}(${m.params})\n    {\n        ${m.body.replace(/\n/g, '\n        ')}\n    }`
  )
  .join('\n\n')}
}

// ==========================================
// KULLANIM ÖRNEĞİ (Program.cs / Main)
// ==========================================
class Program
{
    static void Main()
    {
        // Nesne üretimi (Instantiation)
        ${className} nesne = new ${className}();

        // Public field ve metotlara doğrudan erişim sağlanabilir:
${fields
  .filter((f) => f.modifier === 'public')
  .map((f) => `        nesne.${f.name} = ${f.defaultValue || '...'} // ✅ Erişilebilir (Public)`)
  .join('\n')}
${methods
  .filter((m) => m.modifier === 'public')
  .map((m) => `        nesne.${m.name}(${m.params ? '/* parametre */' : ''}); // ✅ Çağrılabilir (Public)`)
  .join('\n')}

        // ⚠️ Private veya Protected öğelere buradan doğrudan erişilemez:
${fields
  .filter((f) => f.modifier !== 'public')
  .map((f) => `        // nesne.${f.name} -> ❌ Derleme Hatası (CS0122: ${f.modifier} korumalı)`)
  .join('\n')}
    }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCSharpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="builder" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200">
      {/* Editorial Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
            İnteraktif Araç
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            03. Canlı Sınıf & Metot Oluşturucu
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Kendi C# sınıfınızı tasarlayın. Field ve metotları ekleyip erişim belirleyicilerini
            seçin; anında derlenebilir temiz C# kodunu ve çağırma örneğini görün.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Hazır Şablonlar:</span>
          <div className="inline-flex p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => applyPreset('Ogrenci')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                className === 'Ogrenci'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Öğrenci
            </button>
            <button
              onClick={() => applyPreset('Araba')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                className === 'Araba'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Araba
            </button>
            <button
              onClick={() => applyPreset('BankaHesabi')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                className === 'BankaHesabi'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Banka Hesabı
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Builder Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Class Name Configuration */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Sınıf Adı (PascalCase)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-2 rounded-lg border border-slate-200">
                class
              </span>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                className="flex-1 px-3 py-2 text-sm font-semibold font-mono text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="SinifAdi"
              />
            </div>
          </div>

          {/* Fields Editor */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Field (Alan) Listesi</h4>
                <p className="text-[11px] text-slate-500">Nesnenin tutacağı veri durumları</p>
              </div>
              <button
                onClick={addField}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Field Ekle</span>
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <select
                      value={field.modifier}
                      onChange={(e) =>
                        updateField(field.id, {
                          modifier: e.target.value as CustomField['modifier'],
                        })
                      }
                      className="px-2 py-1 text-xs font-medium border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="public">public</option>
                      <option value="private">private</option>
                      <option value="protected">protected</option>
                      <option value="internal">internal</option>
                    </select>

                    <select
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value })}
                      className="px-2 py-1 text-xs font-mono border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="string">string</option>
                      <option value="int">int</option>
                      <option value="double">double</option>
                      <option value="decimal">decimal</option>
                      <option value="bool">bool</option>
                      <option value="DateTime">DateTime</option>
                    </select>

                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(field.id, { name: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs font-mono font-semibold border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="AlanAdi"
                    />

                    {fields.length > 1 && (
                      <button
                        onClick={() => removeField(field.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methods Editor */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Metot (Davranış) Listesi</h4>
                <p className="text-[11px] text-slate-500">Nesnenin yapabildiği eylemler</p>
              </div>
              <button
                onClick={addMethod}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Metot Ekle</span>
              </button>
            </div>

            <div className="space-y-3">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <select
                      value={method.modifier}
                      onChange={(e) =>
                        updateMethod(method.id, {
                          modifier: e.target.value as CustomMethod['modifier'],
                        })
                      }
                      className="px-2 py-1 text-xs font-medium border border-slate-300 rounded bg-white text-slate-700 focus:outline-none"
                    >
                      <option value="public">public</option>
                      <option value="private">private</option>
                      <option value="protected">protected</option>
                      <option value="internal">internal</option>
                    </select>

                    <select
                      value={method.returnType}
                      onChange={(e) => updateMethod(method.id, { returnType: e.target.value })}
                      className="px-2 py-1 text-xs font-mono border border-slate-300 rounded bg-white text-slate-700 focus:outline-none"
                    >
                      <option value="void">void</option>
                      <option value="string">string</option>
                      <option value="int">int</option>
                      <option value="bool">bool</option>
                      <option value="double">double</option>
                    </select>

                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) => updateMethod(method.id, { name: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs font-mono font-semibold border border-slate-300 rounded bg-white text-slate-900 focus:outline-none"
                      placeholder="MetotAdi"
                    />

                    {methods.length > 1 && (
                      <button
                        onClick={() => removeMethod(method.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={method.params}
                    onChange={(e) => updateMethod(method.id, { params: e.target.value })}
                    className="w-full px-2 py-1 text-[11px] font-mono border border-slate-200 rounded bg-white text-slate-600"
                    placeholder="Parametreler (örn: int miktar, string bilgi)"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Live Generated C# Code Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl sticky top-24">
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-300">
                {className}.cs + Program.cs
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 font-mono text-xs sm:text-[13px] text-slate-200 leading-relaxed overflow-x-auto max-h-[580px] overflow-y-auto">
            <pre>{generatedCSharpCode}</pre>
          </div>

          <div className="px-5 py-3 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Enes Öztürk Eğitim Standartları</span>
            <span className="text-emerald-400">✓ %100 C# Uyumlu Sözdizimi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
