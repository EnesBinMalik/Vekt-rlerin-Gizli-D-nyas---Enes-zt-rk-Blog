import React, { useState } from 'react';
import { Layers, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';

interface SyntaxVariant {
  id: string;
  name: string;
  csharpVersion: string;
  useCase: string;
  code: string;
  pros: string[];
  cons: string[];
}

export const CodeComparator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('full');
  const [copied, setCopied] = useState<boolean>(false);

  const variants: SyntaxVariant[] = [
    {
      id: 'full',
      name: '1. Geleneksel Full-Property',
      csharpVersion: 'C# 1.0+',
      useCase: 'Özel doğrulama, loglama veya değer dönüştürme gerektiğinde (En esnek)',
      code: `class Person
{
    private int age = 0; // Manuel tanımlanmış gizli field

    public int Age
    {
        get 
        { 
            return age; 
        }
        set 
        {
            if (value > 0)
                age = value; // Koşullu denetim ve koruma
        }
    }
}`,
      pros: [
        'if/else ile tam veri denetimi ve doğrulama yapılabilir',
        'Atama anında loglama veya bildirim (INotifyPropertyChanged) tetiklenebilir',
        'Okuma ve yazma sırasında değer dönüştürülebilir',
      ],
      cons: [
        'Daha fazla kod (boilerplate) yazımı gerektirir',
      ],
    },
    {
      id: 'auto',
      name: '2. Otomatik Özellik (Auto-Property)',
      csharpVersion: 'C# 3.0+',
      useCase: 'Özel bir validasyon gerekmeyen, temiz DTO ve model sınıflarında',
      code: `class Person
{
    // C# derleyicisi arka planda gizli bir backing field oluşturur
    public string Name { get; set; } = "Tanımsız";
    public int Age { get; set; }
}`,
      pros: [
        'Son derece kısa, okunabilir ve temiz sözdizimi',
        'İleride gerekirse dış kodu bozmadan Full-Property\'ye dönüştürülebilir',
        'Varsayılan değer (default value) atanabilir',
      ],
      cons: [
        'set bloğu içinde özel if/else koşulu yazılamaz',
      ],
    },
    {
      id: 'readonly',
      name: '3. Salt-Okunur Özellik (Read-Only)',
      csharpVersion: 'C# 6.0+',
      useCase: 'Dışarıdan asla değiştirilemeyen, sadece okunabilen özellikler',
      code: `class Person
{
    // Yalnızca get erişimcisi vardır. set metodu YOKTUR!
    public DateTime CreatedAt { get; } = DateTime.UtcNow;

    private int age;
    public int Age { get { return age; } } // Sadece sınıf içi metotlarla değişir
}`,
      pros: [
        'Nesnenin değişmezliğini (immutability) garanti altına alır',
        'Yanlışlıkla dışarıdan veri bozulmasını imkansız kılar',
      ],
      cons: [
        'Sadece nesne oluşturulurken veya constructor içinde değer atanabilir',
      ],
    },
    {
      id: 'init',
      name: '4. Başlatma Korumalı (Init-Only)',
      csharpVersion: 'C# 9.0+',
      useCase: 'Nesne oluşturulurken atanabilen, sonrasında kilitlenen özellikler',
      code: `class Person
{
    // Nesne oluşturulurken atanabilir, sonrasında değiştirilemez
    public string TcKimlikNo { get; init; }
}

// Kullanım:
var p = new Person { TcKimlikNo = "12345678901" }; // Serbest
// p.TcKimlikNo = "99999999999"; // DERLEME HATASI! Kilitlidir.`,
      pros: [
        'Object Initializer sözdizimiyle esnek atama imkanı verir',
        'Nesne bir kez oluşturulduktan sonra mutasyonlara karşı tam koruma sağlar',
      ],
      cons: [
        'C# 9.0 veya daha yeni bir .NET sürümü gerektirir',
      ],
    },
    {
      id: 'expression',
      name: '5. İfade Gövdeli Özellik (Expression-Bodied)',
      csharpVersion: 'C# 6.0 / 7.0+',
      useCase: 'Hesaplanan alanlar (Computed Properties) ve tek satırlık get/set',
      code: `class Person
{
    private string name;
    private int age;

    // Tek satırlık get & set lambdaları
    public string Name
    {
        get => name;
        set => name = value?.Trim() ?? string.Empty;
    }

    // Yalnızca okunabilir hesaplanan özellik
    public bool ResitMi => age >= 18;
}`,
      pros: [
        'Son derece zarif ve modern sözdizimi',
        'Hesaplanan dinamik değerler için idealdir',
      ],
      cons: [
        'Çok satırlı karmaşık mantıklar için Full-Property tercih edilmelidir',
      ],
    },
  ];

  const current = variants.find((v) => v.id === activeTab) || variants[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="syntax" className="py-16 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>MODERN C# SÖZDİZİMİ</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Enes Öztürk İmzasıyla</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Property Tanımlama Sözdizimleri
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            C# dilinin evrimiyle birlikte Kapsülleme (Encapsulation) için geliştirilmiş modern yapıları keşfedin.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto mb-8 max-w-full">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveTab(v.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === v.id
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Display Active Variant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Code View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div>
              <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{current.name}</span>
                  <span className="text-indigo-400 font-mono text-[11px]">({current.csharpVersion})</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
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

              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-slate-950/70">
                <code>{current.code}</code>
              </pre>
            </div>

            <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Kullanım Senaryosu: <strong className="text-slate-300">{current.useCase}</strong></span>
            </div>
          </div>

          {/* Pros / Cons / Details (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-white mb-2">Mimari Değerlendirme</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {current.useCase}
              </p>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Avantajları:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {current.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {current.cons.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                      Kısıtlamaları:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {current.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 italic">
              Tavsiye: Basit modellerde Auto-Property ile başlayıp, doğrulama kuralı gerektiğinde kolayca Full-Property'ye geçebilirsiniz.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
