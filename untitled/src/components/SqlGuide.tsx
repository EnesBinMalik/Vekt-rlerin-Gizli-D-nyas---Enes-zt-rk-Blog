import React from 'react';
import { BookOpen, AlertOctagon, CheckCircle2, XCircle, Code, ArrowRight } from 'lucide-react';

export const SqlGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">
            SQL Mantık Kuralları & PostgreSQL Püf Noktaları Rehberi
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Bu 5 senaryoda test edilen SQL kuralları, veritabanı mülakatlarında ve gerçek dünya sorgularında en sık karşılaşılan tuzakları barındırır.
        </p>
      </div>

      {/* Guide 1: Operator Precedence & Parentheses (Scenario 3) */}
      <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <AlertOctagon className="h-5 w-5" />
          <h3>1. Operatör Önceliği (Operator Precedence) ve Parantezlerin Önemi</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          SQL'de <strong>AND</strong> operatörünün işlem önceliği (precedence) <strong>OR</strong> operatöründen daha yüksektir. 
          Tıpkı matematikte çarpmanın toplamaya göre öncelikli olması gibidir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
              <XCircle className="h-4 w-4" />
              <span>HATALI KULLANIM (Parantezsiz)</span>
            </div>
            <code className="block bg-slate-950 p-3 rounded text-xs font-mono text-red-300">
              WHERE rental_rate = 0.99 <br />
              AND replacement_cost = 12.99 <br />
              OR replacement_cost = 28.99
            </code>
            <p className="text-xs text-slate-400">
              Bu sorgu veritabanı tarafından şöyle yorumlanır: 
              <em>"(rental_rate 0.99 VE maliyet 12.99 olanlar) VEYA (maliyeti 28.99 olan HERHANGİ bir film)".</em>
              Sonuçta rental_rate 4.99 olan ve maliyeti 28.99 olan filmler de hatalı olarak döner!
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>DOĞRU KULLANIM (Parantezli veya IN)</span>
            </div>
            <code className="block bg-slate-950 p-3 rounded text-xs font-mono text-emerald-300">
              WHERE rental_rate = 0.99 <br />
              AND (replacement_cost = 12.99 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;OR replacement_cost = 28.99)
            </code>
            <p className="text-xs text-slate-400">
              Parantez sayesinde önce <strong>OR</strong> bloğu değerlendirilir, ardından 0.99 şartı ile kesiştirilir. 
              Daha temiz bir yazım: <code className="text-cyan-300">AND replacement_cost IN (12.99, 28.99)</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Guide 2: De Morgan's Laws & NOT Operator (Scenario 5) */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
          <Code className="h-5 w-5" />
          <h3>2. De Morgan Kuralı & "OLMAYAN" (NOT) Mantıksal Dönüşümleri</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          5. Senaryodaki <em>"uzunluğu 50'den büyük OLMAYIP ve rental_rate 2.99 veya 4.99 OLMAYAN"</em> koşulu mantık matematiğinde De Morgan kuralına dayanır:
        </p>

        <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs space-y-2 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">Kural 1:</span>
            <span>NOT (length &gt; 50)</span>
            <ArrowRight className="h-3 w-3 text-cyan-400" />
            <span className="text-emerald-400 font-bold">length &lt;= 50</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">Kural 2:</span>
            <span>NOT (rate = 2.99 OR rate = 4.99)</span>
            <ArrowRight className="h-3 w-3 text-cyan-400" />
            <span className="text-emerald-400 font-bold">rate NOT IN (2.99, 4.99)</span>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          İki yazım da SQL motorunda geçerlidir ve aynı sonuç kümesini üretir. Ancak <code className="text-cyan-300">&lt;=</code> ve <code className="text-cyan-300">NOT IN</code> kullanmak sorgu planlayıcısının (query planner) indeksleri daha verimli kullanmasını sağlayabilir.
        </p>
      </div>

      {/* Guide 3: > < vs BETWEEN (Scenario 2) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span className="text-cyan-400">3.</span>
          <span>Büyük/Küçük Karşılaştırmaları ve BETWEEN Farkı</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Senaryo 2'de <em>"60 dan büyük VE 75 ten küçük"</em> denmektedir.
        </p>
        <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
          <li>
            <code className="text-cyan-300 font-mono">WHERE length &gt; 60 AND length &lt; 75</code> ifadesi 60 ve 75 değerlerini <strong>dahil etmez</strong> (exclusive). Sadece 61, 62, ..., 74 dakikalık filmler listelenir.
          </li>
          <li>
            <code className="text-amber-300 font-mono">WHERE length BETWEEN 60 AND 75</code> ifadesi ise her iki sınırı da <strong>dahil eder</strong> (inclusive - &gt;= 60 AND &lt;= 75). Bu nedenle sorunun tam kelime karşılığı doğrudan <code className="text-cyan-300 font-mono">&gt;</code> ve <code className="text-cyan-300 font-mono">&lt;</code> operatörleridir.
          </li>
        </ul>
      </div>

      {/* Guide 4: ORDER BY Defaults (Scenario 1) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span className="text-cyan-400">4.</span>
          <span>ORDER BY Varsayılan Sıralama Yönü (ASC vs DESC)</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          SQL'de <code className="text-cyan-300 font-mono">ORDER BY title</code> yazıldığında arkasına yön eklenmezse standart olarak <strong>ASC (Ascending - Artan)</strong> kabul edilir.
          Kelimeler için A'dan Z'ye, sayılar için en küçükten en büyüğe sıralanır. Ters sıralama için <code className="text-cyan-300 font-mono">DESC</code> yazılmalıdır.
        </p>
      </div>
    </div>
  );
};
