import React from 'react';
import { BookOpen, AlertTriangle, Layers, Zap, Award, CheckCircle2 } from 'lucide-react';

export const SqlTutorial: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Başlık Kartı */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            MySQL ve İlişkisel Veri Tabanı Mimarisi Kılavuzu
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
          DVD Rental senaryolarında kullanılan <code className="text-cyan-300">GROUP BY</code>,{' '}
          <code className="text-cyan-300">HAVING</code>, agregasyon fonksiyonları ve MySQL optimizasyon stratejilerinin akademik ve mülakat odaklı detaylı analizi.
        </p>
      </div>

      {/* Bölüm 1: SQL Sorgu Yürütülme Sırası (Logical Query Processing) */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>1. SQL Sorgularının Mantıksal Yürütülme Sırası (Execution Order)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Birçok yazılımcı SQL sorgularını yazarken ilk olarak <code className="text-cyan-400">SELECT</code> ile başlar, ancak veri tabanı motoru (MySQL / InnoDB) sorguyu bambaşka bir sırayla işletir:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-cyan-400 font-bold mb-1">ADIM 1: FROM &amp; JOIN</div>
            <p className="text-slate-400 font-sans text-[11px]">
              İlk olarak hedef tablolar belleğe alınır ve JOIN bağlantıları kurulur.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-cyan-400 font-bold mb-1">ADIM 2: WHERE</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Gruplama yapılmadan önce ham satırlar elenir (Agregasyon fonksiyonu ALAMAZ).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 bg-emerald-950/10">
            <div className="text-emerald-400 font-bold mb-1">ADIM 3: GROUP BY</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Kalan satırlar belirtilen sütuna göre sanal gruplara ayrılır.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 bg-amber-950/10">
            <div className="text-amber-400 font-bold mb-1">ADIM 4: HAVING</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Oluşturulan gruplar üzerinde agregasyon filtreleri (örn: COUNT &gt; 50) uygulanır.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-purple-400 font-bold mb-1">ADIM 5: SELECT</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Hangi sütunların veya hesaplamaların ekrana getirileceği seçilir.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-purple-400 font-bold mb-1">ADIM 6: DISTINCT</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Varsa yinelenen satırlar filtrelenir.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-blue-400 font-bold mb-1">ADIM 7: ORDER BY</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Sonuç kümesi belirtilen kriterlere göre sıralanır (ASC / DESC).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-blue-400 font-bold mb-1">ADIM 8: LIMIT / OFFSET</div>
            <p className="text-slate-400 font-sans text-[11px]">
              Sonuç kümesinden istenen satır sayısı (örn: LIMIT 1) kesilip döndürülür.
            </p>
          </div>
        </div>
      </div>

      {/* Bölüm 2: WHERE vs HAVING Karşılaştırması */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>2. Kritik Ayrım: WHERE ve HAVING Arasındaki Farklar</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 font-bold font-mono">
              <tr>
                <th className="py-3 px-4 w-1/4 border-b border-slate-800">Özellik</th>
                <th className="py-3 px-4 w-3/8 border-b border-slate-800 text-cyan-400">WHERE Bloğu</th>
                <th className="py-3 px-4 w-3/8 border-b border-slate-800 text-amber-400">HAVING Bloğu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
              <tr className="hover:bg-slate-950/40">
                <td className="py-2.5 px-4 font-semibold text-slate-200">Çalışma Zamanı</td>
                <td className="py-2.5 px-4">Gruplama yapılmadan <strong>ÖNCE</strong> satır düzeyinde çalışır.</td>
                <td className="py-2.5 px-4">Gruplama yapıldıktan <strong>SONRA</strong> grup düzeyinde çalışır.</td>
              </tr>
              <tr className="hover:bg-slate-950/40">
                <td className="py-2.5 px-4 font-semibold text-slate-200">Agregasyon Fonksiyonları</td>
                <td className="py-2.5 px-4 text-rose-400 font-medium">KULLANILAMAZ! (Örn: WHERE COUNT(*) &gt; 50 hata verir)</td>
                <td className="py-2.5 px-4 text-emerald-400 font-medium">KULLANILABİLİR (Örn: HAVING COUNT(*) &gt; 50)</td>
              </tr>
              <tr className="hover:bg-slate-950/40">
                <td className="py-2.5 px-4 font-semibold text-slate-200">Kullanım Amacı</td>
                <td className="py-2.5 px-4">Bireysel satırları süzmek (Örn: aktif müşteriler, süresi 120 dk&apos;dan uzun filmler).</td>
                <td className="py-2.5 px-4">Grup toplamlarını, ortalamalarını veya sayılarını filtrelemek.</td>
              </tr>
              <tr className="hover:bg-slate-950/40">
                <td className="py-2.5 px-4 font-semibold text-slate-200">İndeks Uyumu</td>
                <td className="py-2.5 px-4 text-emerald-400 font-medium">B-Tree indekslerini doğrudan kullanarak sorguyu hızlandırabilir.</td>
                <td className="py-2.5 px-4 text-slate-400">Gruplanmış geçici sonuç kümesi üzerinden filtreleme yapar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bölüm 3: Performans ve İndeksleme Stratejileri */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>3. MySQL İndeksleme ve Optimizasyon (InnoDB Engine)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              GROUP BY İndeks Optimizasyonu
            </h4>
            <p className="text-slate-400 leading-relaxed">
              `film` tablosundaki `rating` veya `replacement_cost` üzerinde bir B-Tree indeks tanımlandığında, MySQL <code>Using temporary; Using filesort</code> adımlarını atlayarak veriyi disk yerine doğrudan sıralı indeks yaprağından okur.
            </p>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-cyan-300">
              CREATE INDEX idx_film_rating ON film(rating);
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              JOIN ve Foreign Key İndeksleri
            </h4>
            <p className="text-slate-400 leading-relaxed">
              `city` tablosunda `country_id` ve `customer` tablosunda `store_id` birer yabancı anahtar (FK) olduğundan, bunlara atanacak indeksler GROUP BY ve JOIN operasyonlarını O(N) karmaşıklığından O(log N)&apos;e düşürür.
            </p>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-cyan-300">
              CREATE INDEX idx_city_country ON city(country_id);
            </div>
          </div>
        </div>
      </div>

      {/* Bölüm 4: Enes Öztürk Özel Notu */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Enes Öztürk İmzalı SQL Metodolojisi
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bu projede gerçekleştirilen 4 sorgu senaryosu, modern ilişkisel veri tabanlarının (RDBMS) temel taşı olan veri analitiği, gruplama ve koşullu özetleme disiplinini en yalın ve optimize sözdizimleriyle yansıtmaktadır.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold shrink-0">
          Enes Öztürk © 2026
        </div>
      </div>
    </div>
  );
};
