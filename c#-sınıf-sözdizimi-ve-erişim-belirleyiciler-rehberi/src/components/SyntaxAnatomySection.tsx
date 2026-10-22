/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Terminal, Info, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface SyntaxToken {
  id: string;
  name: string;
  category: 'keyword' | 'identifier' | 'modifier' | 'type' | 'params' | 'body' | 'brace';
  description: string;
  example: string;
  rule: string;
}

const SYNTAX_TOKENS: Record<string, SyntaxToken> = {
  classKeyword: {
    id: 'classKeyword',
    name: 'class Anahtar Kelimesi',
    category: 'keyword',
    description: 'C# dilinde yeni bir referans tipi (sınıf) tanımlamak için kullanılan ayrılmış temel anahtar kelimedir.',
    example: 'class BankaHesabi { ... }',
    rule: 'Küçük harfle yazılır. Sınıf bir nesne şablonudur ve heap bellekte yer tutacak nesnelerin kalıbıdır.',
  },
  className: {
    id: 'className',
    name: 'SinifAdi (Sınıf İsmi)',
    category: 'identifier',
    description: 'Sınıfın benzersiz adıdır. C# konvansiyonlarına göre daima PascalCase (Her kelimenin ilk harfi büyük) yazılır.',
    example: 'Musteri, BankaHesabi, SiparisYoneticisi',
    rule: 'Rakamla başlayamaz, Türkçe karakter ve özel sembol içermemesi uluslararası standarttır.',
  },
  fieldModifier: {
    id: 'fieldModifier',
    name: '[Erişim Belirleyici] (Field)',
    category: 'modifier',
    description: 'Bu alanın projenin nerelerinden okunup değiştirilebileceğini kontrol eder (public, private, protected, internal).',
    example: 'private string _tcKimlik; veya public int Yas;',
    rule: 'Yazılmazsa C# varsayılan olarak "private" kabul eder. Kapsülleme gereği field\'lar genellikle private veya protected tutulur.',
  },
  fieldType: {
    id: 'fieldType',
    name: '[Veri Tipi] (Field Veri Türü)',
    category: 'type',
    description: 'Alanın bellekte tutacağı bilginin türünü belirtir. C# tip güvenli (type-safe) bir dildir.',
    example: 'int (tam sayı), string (metin), double (ondalık), bool (true/false), DateTime, veya başka bir sınıf tipi.',
    rule: 'Alana yalnızca tanımlanan tipte değer atanabilir; tür uyuşmazlığı derleme hatası verir.',
  },
  fieldName: {
    id: 'fieldName',
    name: 'ÖzellikAdı / Field Adı',
    category: 'identifier',
    description: 'Nesnenin durumunu (state/verisini) tutan değişken adıdır. Nesne yaşadığı sürece bu değeri saklar.',
    example: 'Ad, Soyad, Bakiye, tcNo',
    rule: 'Private field\'lar genelde camelCase veya alt çizgi ile başlar (_bakiye), public alanlar/property\'ler PascalCase yazılır.',
  },
  methodModifier: {
    id: 'methodModifier',
    name: '[Erişim Belirleyici] (Metot)',
    category: 'modifier',
    description: 'Bu metodun hangi sınıflar ve dış projeler tarafından çağrılabileceğini (tetiklenebileceğini) belirler.',
    example: 'public void BilgiYazdir() { ... }',
    rule: 'Yazılmazsa sınıf içinde varsayılan olarak "private" olur (yani sadece o sınıf içindeki diğer metotlar çağırabilir).',
  },
  returnType: {
    id: 'returnType',
    name: '[Geri Dönüş Değerinin Tipi]',
    category: 'type',
    description: 'Metodun işlemini tamamladıktan sonra onu çağıran yere geri vereceği değerin veri türüdür.',
    example: 'int, double, string, bool, veya değer döndürmüyorsa "void".',
    rule: 'Eğer bir tip belirtilmişse, metot gövdesinde mutlaka o tipe uygun bir "return deger;" satırı bulunmalıdır.',
  },
  methodName: {
    id: 'methodName',
    name: 'MetotAdi (Metot İsmi)',
    category: 'identifier',
    description: 'Gerçekleştirilecek eylemi / davranışı temsil eden addır. C# konvansiyonunda PascalCase yazılır.',
    example: 'ParaYatir(), BilgiGoster(), Topla(), GirisYap()',
    rule: 'Genellikle bir eylem/fiil ifade eder. Bir nesnenin "neler yapabildiğini" tanımlar.',
  },
  parameters: {
    id: 'parameters',
    name: '[Parametreler]',
    category: 'params',
    description: 'Metodun görevini yapabilmesi için dışarıdan alması gereken girdi değerleridir.',
    example: '(double miktar, string aciklama) veya parametresiz ()',
    rule: 'Her parametre "[Veri Tipi] [Parametre Adı]" şeklinde tanımlanır. Birden fazla parametre virgülle ayrılır.',
  },
  methodBody: {
    id: 'methodBody',
    name: '{ // Metot Gövdesi }',
    category: 'body',
    description: 'Metot çağrıldığında yukarıdan aşağıya sırayla yürütülecek C# algoritma ve işlem satırlarıdır.',
    example: 'Bakiye += miktar; Console.WriteLine("İşlem başarılı");',
    rule: 'Süslü parantezler {} ile sınırlandırılır. Yerel (local) değişkenler tanımlanabilir.',
  },
};

export default function SyntaxAnatomySection() {
  const [selectedTokenKey, setSelectedTokenKey] = useState<string>('fieldModifier');

  const selectedToken = SYNTAX_TOKENS[selectedTokenKey] || SYNTAX_TOKENS['fieldModifier'];

  return (
    <section id="sozdizimi" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
          Sözdizimi İncelemesi
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          02. Sınıf Sözdizimi, Field ve Metot Anatomisi
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Bir sınıfın temelde iki tip yapıtaşı vardır: <strong>Field (Durum/Veri)</strong> ve{' '}
          <strong>Metotlar (Davranış/İşlem)</strong>. Aşağıdaki etkileşimli sözdiziminde herhangi
          bir öğeye tıklayarak C# kurallarını ve rollerini anında inceleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive Clickable Code Syntax (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 font-mono text-sm leading-loose shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <span>C# Sınıf Şablonu Sözdizimi</span>
            <span className="text-indigo-400">Öğelere tıklayarak inceleyin</span>
          </div>

          <div className="space-y-1">
            {/* class SinifAdi line */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTokenKey('classKeyword')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer font-bold ${
                  selectedTokenKey === 'classKeyword'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : 'text-blue-400 hover:bg-slate-800'
                }`}
              >
                class
              </button>
              <button
                onClick={() => setSelectedTokenKey('className')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer font-bold ${
                  selectedTokenKey === 'className'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'text-emerald-400 hover:bg-slate-800'
                }`}
              >
                SinifAdi
              </button>
            </div>

            {/* Opening brace */}
            <div className="text-slate-500 font-bold">{'{'}</div>

            {/* Field Definition line */}
            <div className="pl-6 py-2 bg-slate-900/60 rounded-lg border border-slate-800/80 my-2 flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 text-xs">// 1. Field (Alan / Özellik) Tanımı</span>
              <div className="w-full flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedTokenKey('fieldModifier')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'fieldModifier'
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                      : 'text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900'
                  }`}
                >
                  [Erişim Belirleyici]
                </button>
                <button
                  onClick={() => setSelectedTokenKey('fieldType')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'fieldType'
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                      : 'text-amber-300 bg-amber-950/60 hover:bg-amber-900'
                  }`}
                >
                  [Veri Tipi]
                </button>
                <button
                  onClick={() => setSelectedTokenKey('fieldName')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'fieldName'
                      ? 'bg-teal-600 text-white ring-2 ring-teal-400'
                      : 'text-teal-300 bg-teal-950/60 hover:bg-teal-900'
                  }`}
                >
                  ÖzellikAdı;
                </button>
              </div>
            </div>

            {/* Method Definition line */}
            <div className="pl-6 py-2 bg-slate-900/60 rounded-lg border border-slate-800/80 my-2 flex flex-col gap-2">
              <span className="text-slate-500 text-xs">// 2. Metot (Davranış) Tanımı</span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedTokenKey('methodModifier')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'methodModifier'
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                      : 'text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900'
                  }`}
                >
                  [Erişim Belirleyici]
                </button>
                <button
                  onClick={() => setSelectedTokenKey('returnType')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'returnType'
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                      : 'text-amber-300 bg-amber-950/60 hover:bg-amber-900'
                  }`}
                >
                  [Geri Dönüş Değerinin Tipi]
                </button>
                <button
                  onClick={() => setSelectedTokenKey('methodName')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'methodName'
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : 'text-purple-300 bg-purple-950/60 hover:bg-purple-900'
                  }`}
                >
                  MetotAdi
                </button>
                <button
                  onClick={() => setSelectedTokenKey('parameters')}
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer font-semibold ${
                    selectedTokenKey === 'parameters'
                      ? 'bg-pink-600 text-white ring-2 ring-pink-400'
                      : 'text-pink-300 bg-pink-950/60 hover:bg-pink-900'
                  }`}
                >
                  ([Parametreler])
                </button>
              </div>

              {/* Method Body */}
              <div className="pl-4 border-l-2 border-slate-800 space-y-1">
                <div className="text-slate-500">{'{'}</div>
                <button
                  onClick={() => setSelectedTokenKey('methodBody')}
                  className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all cursor-pointer ${
                    selectedTokenKey === 'methodBody'
                      ? 'bg-slate-800 text-emerald-300 ring-1 ring-emerald-500'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  // Metot Gövdesi (Algoritmalar & İşlemler)
                </button>
                <div className="text-slate-500">{'}'}</div>
              </div>
            </div>

            {/* Closing brace */}
            <div className="text-slate-500 font-bold">{'}'}</div>
          </div>
        </div>

        {/* Right Side: Detailed Inspector Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>Öğe Müfettişi (Syntax Inspector)</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3">{selectedToken.name}</h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {selectedToken.description}
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                Örnek C# Kullanımı:
              </span>
              <code className="text-xs font-mono text-indigo-600 break-all font-semibold">
                {selectedToken.example}
              </code>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <span className="text-xs font-semibold text-amber-900 block mb-1">
                Kural & En İyi Pratik:
              </span>
              <p className="text-xs text-amber-800 leading-relaxed">
                {selectedToken.rule}
              </p>
            </div>
          </div>

          {/* Quick comparison between Field & Method */}
          <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Field (Alan)</span>
              <p className="text-slate-500 text-[11px] leading-tight">
                Nesnenin <strong>durumunu</strong> (state / verisini) bellekte saklar.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Metot (Davranış)</span>
              <p className="text-slate-500 text-[11px] leading-tight">
                Nesnenin <strong>yapabildiği işlemleri</strong> (aksiyonları) yürütür.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
