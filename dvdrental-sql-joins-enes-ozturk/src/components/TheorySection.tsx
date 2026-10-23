import React from 'react';
import { BookOpen, Check, GitCommit, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export const TheorySection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">PostgreSQL JOIN Türleri Kılavuzu & Karşılaştırması</h2>
            <p className="text-xs text-slate-400">
              dvdrental örnek veritabanı senaryoları eşliğinde SQL JOIN mantığının temelleri ve incelikleri.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT JOIN */}
        <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 mb-3">
              LEFT [OUTER] JOIN
            </div>
            <h3 className="text-base font-bold text-white mb-2">Sol Dış Bağlantı</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              FROM ifadesinden sonra belirtilen <strong>Sol Tablo</strong> (örn. <code className="text-sky-300">city</code>) merkez alınır.
              Sol tablodaki bütün satırlar eksiksiz listelenir.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Eşleşme varsa sağ tablodaki değerler gelir.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Eşleşme yoksa sağ sütunlar <strong>NULL</strong> olur.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Sol taraftan hiçbir veri kaybolmaz.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400">
            city LEFT JOIN country ON city.country_id = country.country_id
          </div>
        </div>

        {/* RIGHT JOIN */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
              RIGHT [OUTER] JOIN
            </div>
            <h3 className="text-base font-bold text-white mb-2">Sağ Dış Bağlantı</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              JOIN kelimesinden sonra gelen <strong>Sağ Tablo</strong> (örn. <code className="text-emerald-300">payment</code>) merkez alınır.
              Sağ tablodaki tüm kayıtlar garantiye alınır.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Sağ tablodaki tüm ödemeler mutlaka listelenir.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Müşteri eşleşmezse sol sütunlar (isim, soyisim) <strong>NULL</strong> kalır.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Tüm muhasebe/tahsilat hareketlerini denetlemede kritiktir.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            customer RIGHT JOIN payment ON customer.customer_id = payment.customer_id
          </div>
        </div>

        {/* FULL JOIN */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-3">
              FULL [OUTER] JOIN
            </div>
            <h3 className="text-base font-bold text-white mb-2">Tam Dış Bağlantı</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Her iki tablonun (örn. <code className="text-purple-300">customer</code> ve <code className="text-purple-300">rental</code>) 
              tüm satırlarını kapsar. Eşleşme olsun veya olmasın hiçbir veri dışarıda kalmaz.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Hiç kiralama yapmamış müşteriler listelenir (rental_id = NULL).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Müşteri kaydı olmayan kiralamalar da listelenir (isim = NULL).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>İki tablonun birleşim kümesidir (Union).</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400">
            customer FULL JOIN rental ON customer.customer_id = rental.customer_id
          </div>
        </div>
      </div>

      {/* Practical Tips by Enes Öztürk */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Enes Öztürk ile PostgreSQL İpuçları & Performans Notları
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              1. İndeksleme (Indexes) Önemi
            </h4>
            <p className="text-slate-300 leading-relaxed">
              <code className="text-sky-300 font-mono">ON</code> koşulunda kullanılan yabancı anahtar alanlarında (örneğin <code className="text-amber-300 font-mono">city.country_id</code> ve <code className="text-amber-300 font-mono">payment.customer_id</code>) B-Tree indeks bulunması sorgu hızını katlar. dvdrental veritabanında bu indeksler varsayılan olarak tanımlıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <GitCommit className="w-4 h-4" />
              2. RIGHT JOIN yerine LEFT JOIN Dönüştürülebilir mi?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Evet! Pratikte çoğu yazılımcı kod okunabilirliği için tabloların yerini değiştirerek RIGHT JOIN yerine LEFT JOIN yazar. Örneğin:
              <br />
              <code className="text-emerald-300 font-mono block mt-1 bg-slate-900 p-1.5 rounded">
                FROM customer RIGHT JOIN payment ...
              </code>
              sorgusu matematiksel olarak şuna eşittir:
              <code className="text-emerald-300 font-mono block mt-1 bg-slate-900 p-1.5 rounded">
                FROM payment LEFT JOIN customer ...
              </code>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              3. Sadece Eşleşmeyenleri Bulmak (Anti-Join)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Eğer "Hiç kiralama yapmamış müşterileri" bulmak isterseniz, FULL veya LEFT JOIN sorgusunun sonuna <code className="text-amber-300 font-mono">WHERE rental.rental_id IS NULL</code> filtresini ekleyebilirsiniz.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              4. PostgreSQL Optimizer Kararları
            </h4>
            <p className="text-slate-300 leading-relaxed">
              PostgreSQL sorgu planlayıcısı (Query Planner), veri boyutuna göre <strong>Hash Join</strong>, <strong>Merge Join</strong> veya <strong>Nested Loop</strong> algoritmalarından en verimlisini otomatik seçer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
