import React, { useState } from 'react';
import { AUTHOR_NAME } from '../data/constructorContent';
import { BookOpen, CheckCircle2, ShieldCheck, Cpu, Code2, AlertTriangle, Layers, Copy, Check } from 'lucide-react';

export const TheorySection: React.FC = () => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 1800);
  };

  const sampleDefaultConstructorCode = `// Sınıf Tanımı
public class Ogrenci
{
    // Özellikler (Fields)
    public string Ad;       // İlk değer verilmedi!
    public int Yas;          // İlk değer verilmedi!
    public bool KayitliMi;   // İlk değer verilmedi!

    // BİZ KURUCU METOT TANIMLAMASAK BİLE,
    // Derleyici arka planda şu varsayılan kurucuyu oluşturur:
    // public Ogrenci() {
    //     this.Ad = null;
    //     this.Yas = 0;
    //     this.KayitliMi = false;
    // }
}

class Program
{
    static void Main()
    {
        // Nesne oluşturuluyor:
        Ogrenci ogr = new Ogrenci();

        Console.WriteLine(ogr.Ad);        // Çıktı: null
        Console.WriteLine(ogr.Yas);       // Çıktı: 0
        Console.WriteLine(ogr.KayitliMi);  // Çıktı: False
    }
}`;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <span>01. Konu Anlatımı & Kurallar</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>İmzalı Ders Notu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          Constructor (Kurucu Metot) Nedir?
        </h2>
        <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
          Bir sınıftan bir nesne oluşturulduğunda biz tanımlamasak bile arka planda çalışan varsayılan yapıcı metotlara <strong className="text-white font-medium">kurucu</strong> ya da <strong className="text-white font-medium">constructor</strong> denir. Sınıf nesnesi ilk oluşturulduğunda yapılmasını istediğimiz işleri kurucu metotlar içerisinde yaparız.
        </p>
      </div>

      {/* 3 Golden Rules Grid */}
      <div className="mb-16">
        <div className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Kurucu Metot Tanımlarken Dikkat Edilmesi Gereken 3 Temel Kural</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Rule 1 */}
          <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-2 font-semibold">KURAL 01</div>
              <h3 className="text-base font-bold text-white mb-2">Sınıf İsmiyle Aynı Olmak Zorundadır</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Yapıcı metotların isimleri, ait oldukları sınıfın ismi ile harfi harfine birebir aynı olmak zorundadır. Büyük/küçük harf duyarlılığı esastır.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-500">class</span> <span className="text-yellow-300 font-semibold">Ogrenci</span> {'{'} <br />
              &nbsp;&nbsp;<span className="text-cyan-400">public</span> <span className="text-yellow-300 font-semibold">Ogrenci</span>() {'{ ... }'} <br />
              {'}'}
            </div>
          </div>

          {/* Rule 2 */}
          <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-2 font-semibold">KURAL 02</div>
              <h3 className="text-base font-bold text-white mb-2">Public Olarak Bildirilmelidir</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Sınıfın dışından <code>new</code> operatörü ile serbestçe nesne üretilebilmesi için kurucu metotların erişim belirteci <code>public</code> olarak tanımlanmalıdır.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] block mb-1">💡 Not:</span>
              <span className="text-slate-300 font-sans text-xs">
                Özel durumlarda (örn: Singleton Tasarım Deseni) nesne üretimini engellemek için <code>private</code> yapılabilir.
              </span>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-2 font-semibold">KURAL 03</div>
              <h3 className="text-base font-bold text-white mb-2">Geri Dönüş Değerleri Yoktur</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Kurucu metotların kesinlikle geri dönüş tipi olamaz; hatta <code>void</code> dahi yazılamaz! Geri dönüş tipi yazılırsa sıradan metoda dönüşür.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-red-900/40 text-xs font-mono">
              <span className="text-red-400 line-through">public void Ogrenci()</span>
              <span className="text-[11px] text-slate-400 block mt-1 font-sans">
                ❌ Hata: 'void' yazılırsa constructor özelliği kaybolur!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive: Varsayılan Kurucu Metot (Default Constructor) */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Arka Plandaki Otomatik Mekanizma</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Varsayılan Kurucu Metot (Default Constructor)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Her sınıfın biz tanımlamasak da bir tane kurucu metodu vardır. Buna <strong>varsayılan kurucu metot (default constructor)</strong> denir.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Default constructor'ın görevi sınıfın içerisindeki özelliklere ilk değer ataması yapılmadığında onların default değerlerini set etmektir. Şöyle düşünebilirsiniz:
            </p>

            {/* Type defaults breakdown */}
            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white">String Veri Tipi:</span>
                  <p className="text-slate-400 mt-0.5">Sınıf içinde string özellik varsa ve siz ilk değer atamazsanız</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono font-semibold">
                    null
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white">Integer / Sayısal Veri Tipleri:</span>
                  <p className="text-slate-400 mt-0.5">Sayısal tipteki özelliklere başlangıçta değer verilmezse</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-mono font-semibold">
                    0
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white">Boolean Mantıksal Tipi:</span>
                  <p className="text-slate-400 mt-0.5">Mantıksal flag alanlarına başlangıçta otomatik atanan değer</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-purple-400/10 text-purple-300 border border-purple-400/20 font-mono font-semibold">
                    false
                  </span>
                </div>
              </div>
            </div>

            {/* Critical Note on Loss of Default Constructor */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
              <div className="flex items-center gap-2 font-bold mb-1 text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Kritik Not: Varsayılan Kurucunun İptal Olma Kuralı</span>
              </div>
              Eğer sınıfa kendi parametreli kurucunuzu (örn: <code>Ogrenci(string ad)</code>) yazarsanız, derleyici artık arka plandaki parametresiz varsayılan kurucuyu <strong>otomatik olarak eklemez</strong>! Parametresiz nesne de üretmek istiyorsanız, onu da kodun içine açıkça yazmanız (aşırı yüklemeniz) gerekir.
            </div>
          </div>

          {/* Right Column: Code block with copy affordance */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
                <span className="font-mono text-slate-400 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ogrenci.cs (Varsayılan Kurucu)</span>
                </span>
                <button
                  onClick={() => handleCopy(sampleDefaultConstructorCode, 'theory_sample')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors text-[11px]"
                >
                  {copiedCodeId === 'theory_sample' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Kodu Kopyala</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                <code>{sampleDefaultConstructorCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Constructor Overloading Concept */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Layers className="w-4 h-4" />
          <span>Esneklik & Çok Biçimlilik</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Kurucu Metotların Aşırı Yüklenmesi (Constructor Overloading)
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-3xl">
          Kurucu metotların imzasını (parametre tipleri veya parametre sayılarını) değiştirerek <strong>overload edebiliriz yani aşırı yükleyebiliriz</strong>. Metotları anlatırken aşırı yüklemeden bahsetmiştik. Bu sayede nesne oluştururken geliştiriciye dilediği parametre kombinasyonuyla nesne başlatma özgürlüğü sunarız.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">İmza 1: Parametresiz</span>
            <div className="font-mono text-xs text-white mb-2">public Ogrenci()</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Öğrenci hakkında hiçbir bilgi bilinmediğinde çağrılır; varsayılan değerlerle temiz bir sayfa açar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">İmza 2: Tek Parametre</span>
            <div className="font-mono text-xs text-white mb-2">public Ogrenci(string ad)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yalnızca isim biliniyorsa çağrılır; yaş 0 ve kayıt false kalırken ismi hafızaya yazar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">İmza 3: Çok Parametre</span>
            <div className="font-mono text-xs text-white mb-2">public Ogrenci(string ad, int yas)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hem ad hem yaş bilindiğinde tek satırda nesneyi tam kıvamında hayata geçirir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
