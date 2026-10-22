/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Download, Copy, Check, FileText, CheckCircle2, Award } from 'lucide-react';

export default function SummaryCheatSheet() {
  const [copied, setCopied] = useState(false);

  const fullLessonNotes = `# C# Sınıf Sözdizimi, Field ve Metot Tanımlama, Erişim Belirleyiciler
Eğitmen / İmza: Enes Öztürk

## 1. Sınıf Nedir, Neden İhtiyaç Duyarız ?
- Sınıflar Nesne Yönelimli Programlamanın (OOP) en önemli öğesidir.
- C# %100 nesne yönelimli bir dil olduğu için tüm metot ve özellikler sınıflar içerisinde yer alır.
- Metotlardan bahsederken bütün işlemleri tek bir metot içerisinde yazmak yerine, parçalarına yani alt metotlara ayırmak kod tekrarını azaltırken okunabilirliği arttırır demiştik. Üstelik bu şekilde yazdığınız programların daha kolay genişleyebildiğini görürsünüz.
- Aynı şekilde program geliştirirken bütün metotları tek bir sınıf içerisinde yazmak yerine benzer görevleri olan metotları tek bir sınıf içerisinde toplamak en doğru yaklaşımdır.

## 2. Bir Sınıfın Temel Öğeleri
Bir sınıfın temelde 2 tipte öğesi vardır:
1. Field (Alan / Özellik): Nesnenin durumunu ve verilerini saklar.
2. Metotlar: Nesnenin yapabildiği eylemleri ve davranışları belirler.

### Sınıf Sözdizimi:
\`\`\`csharp
class SinifAdi
{
    [Erişim Belirleyici][Veri Tipi] ÖzellikAdı;
    [Erişim Belirleyici][Geri Dönüş Değerinin Tipi] MetotAdi([Parametreler])
    {
        // Metot Gövdesi
    }
}
\`\`\`

## 3. Erişim Belirleyiciler (Access Modifiers)
Erişim belirleyiciler önüne geldiği öğenin projenin nerelerinden erişilebileceğini belirler. Öğeleri korur gibi düşünebilirsiniz.

1. Public : Her yerden erişilebilir.
2. Private : Sadece tanımlandığı sınıf içerisinden erişilebilir (Sınıf içi üyeler için C# varsayılanıdır).
3. Internal : Sadece bulunduğu proje (assembly) içerisinden erişilebilir.
4. Protected : Sadece tanımlandığı sınıfta ya da o sınıfı miras alan (türemiş) sınıflardan erişilebilir.

---
Hazırlayan & İmzalı: Enes Öztürk
`;

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(fullLessonNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadNotes = () => {
    const blob = new Blob([fullLessonNotes], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'csharp-sinif-erisim-belirleyiciler-enes-ozturk.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="ozet" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200">
      {/* Editorial Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
            Hızlı Referans
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            06. Ders Özeti ve Hızlı Başvuru Kartı
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Dersin tüm temel formüllerini, kurallarını ve sözdizimini tek bir yerde
            bulun. Notları çalışma ortamınıza aktarabilir veya markdown olarak indirebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyNotes}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Notları Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadNotes}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Markdown İndir (.md)</span>
          </button>
        </div>
      </div>

      {/* Cheatsheet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 1: 4 Access Modifiers */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              4 Temel Erişim Belirleyici
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Öğeleri koruyan ve görünürlüğü denetleyen anahtar sözcükler
            </p>

            <ul className="space-y-3 text-xs">
              <li className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                <span className="font-mono font-bold text-emerald-700 shrink-0">1. public:</span>
                <span className="text-emerald-950">
                  Her yerden erişilebilir (proje içi, miras alanlar, dış projeler).
                </span>
              </li>
              <li className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 flex items-start gap-2.5">
                <span className="font-mono font-bold text-rose-700 shrink-0">2. private:</span>
                <span className="text-rose-950">
                  Sadece tanımlandığı sınıf içerisinden erişilebilir (C# sınıf içi varsayılan).
                </span>
              </li>
              <li className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 flex items-start gap-2.5">
                <span className="font-mono font-bold text-amber-700 shrink-0">3. internal:</span>
                <span className="text-amber-950">
                  Sadece bulunduğu proje (assembly) içerisinden erişilebilir.
                </span>
              </li>
              <li className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5">
                <span className="font-mono font-bold text-indigo-700 shrink-0">4. protected:</span>
                <span className="text-indigo-950">
                  Sadece tanımlandığı sınıfta ya da o sınıfı miras alan (türemiş) sınıflardan erişilebilir.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Sözdizimi & Temel İlkeler */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Sözdizimi Şablonu & Mimari Kural
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              C# temiz kod standartları ve sınıf anatomisi
            </p>

            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-200 mb-4 overflow-x-auto">
              <pre>{`class SinifAdi
{
    [Erişim] [Veri Tipi] ÖzellikAdı;
    [Erişim] [Dönüş Tipi] MetotAdi([Parametreler])
    {
        // Metot Gövdesi
    }
}`}</pre>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Bütün işlemleri tek metotta toplamak yerine alt metotlara bölmek kod tekrarını
                  azaltır ve okunabilirliği yükseltir.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Tüm metotları tek bir dev sınıfa yığmak yerine, benzer görevleri olan metotları
                  tek bir sınıf içerisinde toplamak en doğru yaklaşımdır.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Author Signature Certificate Block */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
            Eğitmen & Yazar Onayı
          </div>
          <h3 className="text-xl font-bold text-white">
            C# Nesne Yönelimli Programlama Eğitim Serisi
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Bu eğitim materyali, modern C# ve OOP ilkelerine tam uyumlu olarak hazırlanmış;
            sözdizimi kuralları ve erişim denetimleri ayrıntılı örneklerle temellendirilmiştir.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">İmza</span>
          <div className="text-2xl font-serif italic text-emerald-400 tracking-wide mt-1">
            Enes Öztürk
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-mono">
            Yazılım Eğitmeni & C# Mimarı
          </span>
        </div>
      </div>
    </section>
  );
}
