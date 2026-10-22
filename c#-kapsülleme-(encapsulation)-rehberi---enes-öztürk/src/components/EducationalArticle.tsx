import React, { useState } from 'react';
import { Copy, Check, BookOpen, ShieldCheck, Code, AlertTriangle, Lightbulb } from 'lucide-react';

export const EducationalArticle: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const ogrenciCode = `class Ogrenci
{
    private string name; //field

    public string Name //property
    {
        get { return name; }
        set { name = value; }
    }
}`;

  const personCode = `class Person
{
    private int age = 0;
    public int Age
    {
        get { return age; }
        set {
            if (value > 0)
                age = value;
        }
    }
}`;

  const dangerCode = `// ❌ KAPSÜLLEME OLMADAN (Tehlikeli & Korunmasız Kod)
class PersonKorumasiz
{
    public int age; // Herkes doğrudan değiştirebilir!
}

// Dışarıdan çağıran kod:
PersonKorumasiz p = new PersonKorumasiz();
p.age = -999; // Derlenir ve çalışır! Yaş mantıksız bir negatif sayı oldu!`;

  return (
    <section id="ogrenci-person" className="py-16 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span>TEMEL TEORİ VE KOD ANALİZİ</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Enes Öztürk İmzasıyla</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Encapsulation (Kapsülleme) Kavramı
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            C# dilinin nesne yönelimli mimarisinin kalbinde yer alan kapsülleme ilkesi, veriyi güvene almanın ve nesnenin iç yapısını dış etkenlerden soyutlamanın en zarif yoludur.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Prose (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-300 leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                C# ve %100 Nesne Yönelimli Mimari
              </h3>
              <p>
                C#'ın %100 nesne yönelimli bir dil olduğundan bahsetmiştik. <strong>Encapsulation yani Kapsülleme</strong> kavramı, bir özelliği başka sınıflardan saklamak ya da korumaktır.
              </p>
              <p>
                Örneğin siz bir property yani özellik tanımı yaptınız ve diğer sınıflar içerisinden erişilsin ama <em>sadece okumak için erişilsin, değeri dışarıdan değiştirilemesin</em> istiyorsunuz. Bunu kapsülleme yaparak sağlayabilirsiniz. Kapsülleme işlemini ise <strong>Property (Özellik)</strong> yapılarını kullanarak yapabilirsiniz.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Bilinçsiz Kullanıma Karşı Zırh: Field & Property
              </h3>
              <p>
                Kapsülleme sayesinde nesneler <strong>bilinçsiz olarak kullanımdan korunmuş olur</strong>. Fakat bazı durumlarda <code className="text-amber-300 font-mono">private field</code>'lara erişmemiz ve özelliklerini değiştirmemiz gerekebilir.
              </p>
              <p>
                Bu durumda <strong>Property Kavramı</strong> devreye girer. Property bir field'ın değerini geri döndürmeye <strong>(Get)</strong> ve yeni bir değer <strong>(Set)</strong> atamaya olanak sağlar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 mb-1 font-mono">1. Field (Alan)</div>
                  <div className="text-xs text-slate-400">
                    Sınıfın bellekteki ham değişkenidir. Genellikle <code className="text-amber-300">private</code> tutulur ve doğrudan dışarı açılmaz.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 mb-1 font-mono">2. Property (Özellik)</div>
                  <div className="text-xs text-slate-400">
                    Field'ın etrafındaki akıllı arayüzdür. <code className="text-indigo-300">get</code> ve <code className="text-indigo-300">set</code> blokları ile veri akışını denetler.
                  </div>
                </div>
              </div>
            </div>

            {/* Author Keynote Callout */}
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-900/50 flex items-start gap-3.5">
              <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-200 leading-relaxed">
                <strong className="text-white block mb-0.5">Enes Öztürk'ten Altın İlke:</strong>
                &ldquo;Bir nesnenin durumunu (state) asla dışarıdan kontrolsüzce yazılabilir bırakmayın. Bir değişken dış dünyaya sadece ihtiyacı kadar açılmalı; doğrulama kuralları nesnenin kendi sınırları içinde çalıştırılmalıdır.&rdquo;
              </div>
            </div>
          </div>

          {/* Code Showcase & Annotations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Example 1: Ogrenci Class */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Örnek 1: Ogrenci Sınıfı
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(ogrenciCode, 'ogrenci')}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'ogrenci' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{ogrenciCode}</code>
              </pre>

              <div className="p-3 bg-slate-900/50 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div>
                  <strong className="text-slate-300">Açıklama:</strong> <code className="text-amber-300 font-mono">name</code> isminde private bir field tanımı görüyoruz. Sınıf dışından erişilemez.
                </div>
                <div>
                  Altındaysa <code className="text-indigo-300 font-mono">Name</code> isminde <code className="text-amber-300">name</code> field'ını geri döndüren <strong>Get</strong> ve yeni değer atamasını yapabilen <strong>Set</strong> metotlu bir property yer almaktadır.
                </div>
              </div>
            </div>

            {/* Example 2: Person Class with validation */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Örnek 2: Person Sınıfı (Negatif Yaş Koruması)
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(personCode, 'person')}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'person' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{personCode}</code>
              </pre>

              <div className="p-3 bg-slate-900/50 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                <div className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Doğrulama (Validation) Mekanizması:
                </div>
                <div>
                  Public property'nin set metodu içerisinde bu field'a atanabilecek verileri kontrol edebilir ve müdahale edebiliriz.
                </div>
                <div>
                  Yukarıdaki örnekte <code className="text-emerald-300">if (value &gt; 0)</code> koşuluyla <strong>yaş olarak negatif bir değer atanması kesin olarak engellenir</strong>.
                </div>
              </div>
            </div>

            {/* Negative contrast box */}
            <div className="rounded-2xl bg-slate-950 border border-rose-950/60 overflow-hidden">
              <div className="px-4 py-2.5 bg-rose-950/30 border-b border-rose-900/30 flex items-center gap-2 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Kapsülleme Olmasaydı Ne Olurdu?</span>
              </div>
              <pre className="p-3 text-[11px] font-mono text-rose-200/90 overflow-x-auto leading-relaxed">
                <code>{dangerCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
