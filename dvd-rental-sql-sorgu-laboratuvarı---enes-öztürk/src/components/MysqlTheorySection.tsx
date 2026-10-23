import React from 'react';
import { Database, GitCompare, Zap, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const MysqlTheorySection: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-amber-400" />
            <span>MySQL Veritabanında Küme Operatörleri Mimarisi</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            UNION, INTERSECT, EXCEPT ve ALL varyasyonlarının MySQL motorundaki iç işleyişi ve sürüm farkları
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          Hazırlayan: Enes Öztürk
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: UNION vs UNION ALL */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">01</span>
            <h4 className="text-xs font-bold text-slate-100">UNION vs UNION ALL</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400">UNION</strong>, iki sorgunun sonucunu birleştirirken arkada örtük bir <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">DISTINCT</code> işlemi uygular. MySQL geçici bir bellek tablosu (temporary table) oluşturur ve hash veya sort işlemiyle yinelenen kayıtları siler.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-sky-400">UNION ALL</strong> ise yinelenen satırları silmez, doğrudan sonuçları birbirine ekler. Bellek ve CPU maliyeti düşüktür; mükerrer kayıtların sakıncası olmadığı veya zaten olmadığı durumlarda her zaman UNION ALL tercih edilmelidir.
          </p>
          <div className="pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
            dvdrental: UNION 647 satır · UNION ALL 799 satır
          </div>
        </div>

        {/* Card 2: INTERSECT vs INTERSECT ALL */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">02</span>
            <h4 className="text-xs font-bold text-slate-100">INTERSECT vs INTERSECT ALL</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">INTERSECT</strong>, her iki kümede de var olan ortak kayıtları tekil olarak getirir. Küme teorisindeki <code className="bg-slate-800 px-1 py-0.5 rounded text-emerald-300">A ∩ B</code> işlemidir.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-sky-400">INTERSECT ALL</strong> (Multiset/Bag kesişimi), her iki tablodaki tekrar frekanslarını sayar ve minimum frekansı sonuç kümesine yazar: <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300">min(count_A, count_B)</code>. Örneğin bir isim A'da 4, B'de 1 kez varsa 1 kez listelenir.
          </p>
          <div className="pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
            MySQL 8.0.31 öncesinde INNER JOIN & ROW_NUMBER ile çözülür.
          </div>
        </div>

        {/* Card 3: EXCEPT vs EXCEPT ALL */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400 font-mono text-xs font-bold">03</span>
            <h4 className="text-xs font-bold text-slate-100">EXCEPT vs EXCEPT ALL</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-sky-400">EXCEPT</strong>, ilk kümede olan ancak ikinci kümede hiç bulunmayan elemanları tekilleştirerek getirir (<code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300">A \ B</code>).
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-amber-400">EXCEPT ALL</strong>, ilk tablodaki frekanstan ikinci tablodaki frekansı çıkartarak aradaki farkı (fazlalıkları) korur: <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">max(0, count_A - count_B)</code>. Klasik MySQL'de LEFT JOIN ve CTE ile modellenir.
          </p>
          <div className="pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
            A EXCEPT B ile B EXCEPT A farklı kümelerdir.
          </div>
        </div>
      </div>

      {/* MySQL 8.0.31 Milestone Note */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
        <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-semibold text-white">
            MySQL Sürüm Evrimi: Yerel INTERSECT & EXCEPT Desteği
          </span>
          <p className="text-slate-300 leading-relaxed">
            Oracle, <strong>MySQL 8.0.31 (Ekim 2022)</strong> sürümünde <code className="text-amber-400 font-mono">INTERSECT</code>, <code className="text-amber-400 font-mono">INTERSECT ALL</code>, <code className="text-amber-400 font-mono">EXCEPT</code> ve <code className="text-amber-400 font-mono">EXCEPT ALL</code> sözdizimini yerel (native) olarak motora kazandırmıştır. Bu sürümden önce geliştiriciler aynı mantığı <code className="text-sky-400 font-mono">INNER JOIN</code>, <code className="text-sky-400 font-mono">LEFT JOIN ... WHERE IS NULL</code> veya <code className="text-emerald-400 font-mono">ROW_NUMBER() OVER (...)</code> pencere fonksiyonları ile yazmak zorundaydı. Uygulamamızda Enes Öztürk imzasıyla her iki MySQL sözdizimi de sunulmaktadır.
          </p>
        </div>
      </div>
    </div>
  );
};
