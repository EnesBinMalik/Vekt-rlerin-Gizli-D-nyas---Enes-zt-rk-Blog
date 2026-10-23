import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download, CheckCircle, Award, Sparkles, Database } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { computeSetStats } from '../utils/sqlEngine';

interface AssignmentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentReportModal: React.FC<AssignmentReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const stats = computeSetStats();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    return `# DVD RENTAL VERİ TABANI KÜME OPERASYONLARI ÖDEV RAPORU
**Hazırlayan:** Enes Öztürk  
**Veritabanı:** MySQL 8.0+ (dvdrental / Sakila Sample Database)  
**Tarih:** ${new Date().toLocaleDateString('tr-TR')}  
**İmza:** Enes Öztürk (Doğrulanmış SQL Çözüm Belgesi)

---

## 1. Veri Tabanı Genel Özeti
- **actor Tablosu:** 200 Satır (${stats.actorDistinctNames} benzersiz first_name)
- **customer Tablosu:** 599 Satır (${stats.customerDistinctNames} benzersiz first_name)
- **Ortak İsimler (Kesişim):** ${stats.intersectDistinctCount} benzersiz isim

---

## BÖLÜM 1: TEKRARSIZ (DISTINCT) SORGULAR

### Soru 1: actor ve customer tablolarında bulunan first_name sütunları için tüm verileri sıralayalım.
\`\`\`sql
-- MySQL 8.0+ ve Klasik Çözüm (UNION varsayılan olarak DISTINCT çalışır)
(SELECT first_name FROM actor)
UNION
(SELECT first_name FROM customer)
ORDER BY first_name ASC;
\`\`\`
- **Matematiksel Küme Notasyonu:** A ∪ B = { x | x ∈ Actor ∨ x ∈ Customer }
- **Dönen Satır Sayısı:** ${stats.unionDistinctCount} tekil satır
- **Açıklama:** UNION işleci her iki tablodaki kayıtları birleştirir ve duplicate (tekrar eden) isimleri otomatik olarak eler.

### Soru 2: actor ve customer tablolarında bulunan first_name sütunları için kesişen verileri sıralayalım.
\`\`\`sql
-- MySQL 8.0.31+ Yerel Sözdizimi
(SELECT first_name FROM actor)
INTERSECT
(SELECT first_name FROM customer)
ORDER BY first_name ASC;

-- MySQL Klasik (5.7 ve 8.0.31 Öncesi) Çözümü (INNER JOIN)
SELECT DISTINCT a.first_name
FROM actor a
INNER JOIN customer c ON a.first_name = c.first_name
ORDER BY a.first_name ASC;
\`\`\`
- **Matematiksel Küme Notasyonu:** A ∩ B = { x | x ∈ Actor ∧ x ∈ Customer }
- **Dönen Satır Sayısı:** ${stats.intersectDistinctCount} tekil satır
- **Açıklama:** Yalnızca hem aktör hem de müşteri tablosunda ortak olarak yer alan isimleri tekrarsız olarak sıralar.

### Soru 3: actor ve customer tablolarında bulunan first_name sütunları için ilk tabloda bulunan ancak ikinci tabloda bulunmayan verileri sıralayalım.
\`\`\`sql
-- MySQL 8.0.31+ Yerel Sözdizimi
(SELECT first_name FROM actor)
EXCEPT
(SELECT first_name FROM customer)
ORDER BY first_name ASC;

-- MySQL Klasik (5.7 ve 8.0.31 Öncesi) Çözümü (LEFT JOIN WHERE IS NULL)
SELECT DISTINCT a.first_name
FROM actor a
LEFT JOIN customer c ON a.first_name = c.first_name
WHERE c.first_name IS NULL
ORDER BY a.first_name ASC;
\`\`\`
- **Matematiksel Küme Notasyonu:** A \\ B = { x | x ∈ Actor ∧ x ∉ Customer }
- **Dönen Satır Sayısı:** ${stats.exceptDistinctCount} tekil satır
- **Açıklama:** Sadece aktörler tablosunda mevcut olup hiçbir müşteride kullanılmayan isimleri tekil olarak sıralar.

---

## BÖLÜM 2: TEKRARLAYAN (ALL) SORGULAR

### Soru 4: İlk 3 sorgunun tekrar eden veriler için yapılışı (1/3) - Tüm Veriler (UNION ALL)
\`\`\`sql
-- MySQL Tüm Sürümler
(SELECT first_name FROM actor)
UNION ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;
\`\`\`
- **Matematiksel Notasyon:** A ⊎ B (Frekansların toplamı)
- **Dönen Satır Sayısı:** ${stats.unionAllCount} satır (200 Actor + 599 Customer)
- **Açıklama:** Tekilleştirme yapmaksızın tüm kayıtları sıralar.

### Soru 5: İlk 3 sorgunun tekrar eden veriler için yapılışı (2/3) - Kesişen Veriler (INTERSECT ALL)
\`\`\`sql
-- MySQL 8.0.31+ Yerel Sözdizimi
(SELECT first_name FROM actor)
INTERSECT ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;

-- MySQL Klasik (8.0+ CTE Pencere Fonksiyonları ile Frekans Korumalı Kesişim)
WITH actor_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY actor_id) AS rn
  FROM actor
),
customer_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY customer_id) AS rn
  FROM customer
)
SELECT a.first_name
FROM actor_ranked a
INNER JOIN customer_ranked c 
  ON a.first_name = c.first_name AND a.rn = c.rn
ORDER BY a.first_name ASC;
\`\`\`
- **Matematiksel Notasyon:** count_{A ∩_all B}(x) = min(count_A(x), count_B(x))
- **Dönen Satır Sayısı:** ${stats.intersectAllCount} satır
- **Açıklama:** SQL standart küme teorisinde min frekans kuralına göre çoklu eşleşmeleri listeler.

### Soru 6: İlk 3 sorgunun tekrar eden veriler için yapılışı (3/3) - İlk Tabloda Olup İkincide Olmayanlar (EXCEPT ALL)
\`\`\`sql
-- MySQL 8.0.31+ Yerel Sözdizimi
(SELECT first_name FROM actor)
EXCEPT ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;

-- MySQL Klasik (8.0+ CTE Pencere Fonksiyonları ile Frekans Korumalı Fark)
WITH actor_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY actor_id) AS rn
  FROM actor
),
customer_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY customer_id) AS rn
  FROM customer
)
SELECT a.first_name
FROM actor_ranked a
LEFT JOIN customer_ranked c 
  ON a.first_name = c.first_name AND a.rn = c.rn
WHERE c.first_name IS NULL
ORDER BY a.first_name ASC;
\`\`\`
- **Matematiksel Notasyon:** count_{A \\_all B}(x) = max(0, count_A(x) - count_B(x))
- **Dönen Satır Sayısı:** ${stats.exceptAllCount} satır
- **Açıklama:** Aktör tablosundaki frekanstan müşteri tablosundaki frekans düşülerek fazlalıklar listelenir.

---
**İmza ve Onay:**
Enes Öztürk  
Veritabanı Yönetim Sistemleri (RDBMS) - MySQL dvdrental Çalışması
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    let sqlContent = `-- ========================================================\n`;
    sqlContent += `-- DVD RENTAL VERİ TABANI KÜME OPERASYONLARI ÖDEVİ\n`;
    sqlContent += `-- Hazırlayan: Enes Öztürk\n`;
    sqlContent += `-- Tarih: ${new Date().toLocaleDateString('tr-TR')}\n`;
    sqlContent += `-- Veritabanı: MySQL 8.0+ / dvdrental (Sakila)\n`;
    sqlContent += `-- ========================================================\n\n`;

    SCENARIOS.forEach(sc => {
      sqlContent += `-- --------------------------------------------------------\n`;
      sqlContent += `-- SENARYO ${sc.id}: ${sc.title}\n`;
      sqlContent += `-- --------------------------------------------------------\n`;
      sqlContent += `${sc.mysql8Sql}\n\n`;
    });

    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enes_ozturk_dvdrental_sorgulari.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Resmi Ödev ve Çözüm Raporu</span>
                <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded font-mono font-medium">
                  Enes Öztürk İmzalı
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                dvdrental örnek veritabanı MySQL küme sorguları tam analizi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 flex items-center gap-1.5 cursor-pointer"
              title="Markdown olarak panoya kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Raporu Kopyala'}</span>
            </button>
            <button
              onClick={handleDownloadSql}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Tüm sorguları .sql dosyası olarak indir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.SQL İndir</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900 text-slate-200 print:bg-white print:text-black">
          {/* Formal Assignment Header */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  VERİTABANI YÖNETİM SİSTEMLERİ · ÖDEV TESLİM FORMU
                </span>
                <h1 className="text-xl font-bold text-white mt-1">
                  DVD Rental (Sakila) Küme Operasyonları
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  actor ve customer first_name Alanları Üzerinde UNION, INTERSECT, EXCEPT ve ALL Analizi
                </p>
              </div>

              {/* Author Signature Stamp Box */}
              <div className="px-4 py-2.5 rounded-lg bg-amber-400/5 border border-amber-400/30 text-right shrink-0">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Hazırlayan & İmza</span>
                <span className="text-base font-bold text-amber-300 font-serif tracking-wide block">
                  Enes Öztürk
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  MySQL 8.0+ Uyumlu
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">actor Tablosu</span>
                <strong className="text-white text-sm">200 Satır</strong>
                <span className="text-[10px] text-slate-400 block">({stats.actorDistinctNames} Tekil)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">customer Tablosu</span>
                <strong className="text-white text-sm">599 Satır</strong>
                <span className="text-[10px] text-slate-400 block">({stats.customerDistinctNames} Tekil)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Kesişen İsimler</span>
                <strong className="text-emerald-400 text-sm">{stats.intersectDistinctCount} Tekil</strong>
                <span className="text-[10px] text-slate-400 block">(Ortak)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Sadece Aktör</span>
                <strong className="text-amber-400 text-sm">{stats.exceptDistinctCount} Tekil</strong>
                <span className="text-[10px] text-slate-400 block">(Fark Kümesi)</span>
              </div>
            </div>
          </div>

          {/* Solutions List */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
              Sorgu Senaryoları ve MySQL Çözümleri
            </h3>

            {SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {sc.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">
                      {sc.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-amber-400">
                    {sc.mathematicalNotation}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sc.shortDescription}
                </p>

                {/* SQL Code Preview */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 overflow-x-auto">
                  <pre>{sc.mysql8Sql}</pre>
                </div>

                {/* Explanation */}
                <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/40 space-y-1">
                  <span className="text-slate-300 font-semibold block">Çalışma Prensibi:</span>
                  <p>{sc.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formal Stamp & Signature Footer */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-white block">
                Doğrulama ve Teslim Onayı
              </span>
              <p className="text-xs text-slate-400">
                Tüm sorgu senaryoları MySQL 8.0+ veritabanı motoru standartlarına tam uygundur.
              </p>
            </div>

            <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6">
              <span className="text-[11px] text-slate-500 block uppercase font-mono">Öğrenci / Geliştirici</span>
              <span className="text-lg font-bold text-amber-400 font-serif tracking-wider block">
                Enes Öztürk
              </span>
              <span className="text-[11px] text-slate-400 font-mono block">
                İmzalanmıştır · {new Date().toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
