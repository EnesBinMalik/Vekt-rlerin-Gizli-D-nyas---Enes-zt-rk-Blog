import React from 'react';
import { AUTHOR_NAME, AUTHOR_TITLE } from '../data/constructorContent';
import { Terminal, Download, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadNotes = () => {
    const textContent = `CONSTRUCTOR (KURUCU METOT) REHBERİ
Hazırlayan: ${AUTHOR_NAME} (${AUTHOR_TITLE})
======================================================

1. Constructor Tanımı:
Bir sınıftan bir nesne oluşturulduğunda biz tanımlamasak bile arka planda çalışan varsayılan yapıcı metotlara kurucu yada constructor denir. Sınıf nesnesi ilk oluşturulduğunda yapılmasını istediğimiz işleri kurucu metotlar içerisinde yaparız.

2. Kurucu Metot Tanımlarken Dikkat Edilmesi Gereken 3 Altın Kural:
- Yapıcı metotların isimleri sınıf isimleri ile aynı olmak zorundadır.
- Public olarak bildirilmeleri gerekir.
- Geri dönüş değerleri yoktur (void dahi yazılamaz).

3. Varsayılan Kurucu Metot (Default Constructor):
Her sınıfın biz tanımlamasak da bir tane kurucu metodu vardır. Buna varsayılan kurucu metot (default constructor) denir.
Default constructor'ın görevi sınıfın içerisindeki özelliklere ilk değer ataması yapılmadığında onların default değerlerini set etmektir.
- String veri tipi -> null
- Integer / Sayısal tipler -> 0
- Boolean tipler -> false

4. Kurucu Metotların Aşırı Yüklenmesi (Constructor Overloading):
Kurucu metotların imzasını (parametre sayısı ve tiplerini) değiştirerek overload edebiliriz yani aşırı yükleyebiliriz.

------------------------------------------------------
Enes Öztürk imzasıyla hazırlanmıştır.
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Constructor_Kavrami_Enes_Ozturk_Notlari.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Signature Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span>ConstructorLab</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-cyan-400 font-normal">Enes Öztürk İmzasıyla</span>
            </div>
            <p className="text-xs text-slate-400">
              Nesne Yönelimli Programlama (OOP) Kurucu Metot & Bellek Eğitimi
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleDownloadNotes}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ders Notlarını İndir (.txt)</span>
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Yukarı Çık"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span>Telif Hakkı © 2026</span>
          <span>·</span>
          <span>Eğitim İçeriği: {AUTHOR_NAME}</span>
          <span>·</span>
          <span>Tüm hakları saklıdır</span>
        </div>
        <div>
          C#, Java, TypeScript ve C++ Uyumlu OOP Öğrenim Simülasyonu
        </div>
      </div>
    </footer>
  );
};
