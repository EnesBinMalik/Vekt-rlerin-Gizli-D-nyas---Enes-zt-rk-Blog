import React, { useState } from 'react';
import { Play, RotateCcw, Download, Copy, Check, AlertCircle, Database, Sparkles, Zap, Terminal } from 'lucide-react';
import { dvdRentalDb, QueryResult } from '../services/db';

export const SqlPlayground: React.FC = () => {
  const [sql, setSql] = useState<string>(
    `-- MySQL DVD Rental Çalışma Konsolu
-- Aşağıdaki 4 temel senaryodan birini seçebilir veya kendi sorgunuzu yazabilirsiniz:

SELECT 
    rating, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY rating 
ORDER BY film_sayisi DESC;`
  );

  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const runQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = dvdRentalDb.runQuery(sql);
      setResult(res);
      setIsRunning(false);
    }, 50);
  };

  const setPreset = (presetSql: string) => {
    setSql(presetSql);
    setTimeout(() => {
      const res = dvdRentalDb.runQuery(presetSql);
      setResult(res);
    }, 50);
  };

  const copyResults = () => {
    if (!result || result.rows.length === 0) return;
    navigator.clipboard.writeText(JSON.stringify(result.rows, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCsv = () => {
    if (!result || result.rows.length === 0) return;
    const headers = result.columns.join(',');
    const rows = result.rows.map((r) =>
      result.columns.map((c) => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'dvdrental_query_result.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sonuçları arama filtresine göre süz
  const filteredRows = result?.rows.filter((row) => {
    if (!searchTerm) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Üst Bilgi Kartı */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
              <Terminal className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-100">
              İnteraktif MySQL Çalışma Konsolu
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            `film`, `customer`, `city`, `country`, `store` tablolarında dilediğiniz MySQL sorgusunu yazıp canlı test edebilirsiniz.
          </p>
        </div>

        {/* Hızlı Kısayol Bilgisi */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
          <span>Kısayol:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
            Ctrl
          </kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
            Enter
          </kbd>
        </div>
      </div>

      {/* Hazır Sorgu Şablonları (Presets) */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Hazır Sorgu Şablonları &amp; Senaryolar:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              setPreset(`SELECT rating, COUNT(*) AS film_sayisi \nFROM film \nGROUP BY rating \nORDER BY film_sayisi DESC;`)
            }
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
          >
            #1 Film Rating Gruplama
          </button>

          <button
            onClick={() =>
              setPreset(
                `SELECT replacement_cost, COUNT(*) AS film_sayisi \nFROM film \nGROUP BY replacement_cost \nHAVING COUNT(*) > 50 \nORDER BY film_sayisi DESC;`
              )
            }
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
          >
            #2 Replacement Cost (&gt;50)
          </button>

          <button
            onClick={() =>
              setPreset(`SELECT store_id, COUNT(*) AS musteri_sayisi \nFROM customer \nGROUP BY store_id \nORDER BY store_id ASC;`)
            }
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
          >
            #3 Mağaza Müşteri Sayıları
          </button>

          <button
            onClick={() =>
              setPreset(
                `SELECT country_id, COUNT(*) AS sehir_sayisi \nFROM city \nGROUP BY country_id \nORDER BY sehir_sayisi DESC \nLIMIT 1;`
              )
            }
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
          >
            #4 En Çok Şehirli Ülke (LIMIT 1)
          </button>

          <button
            onClick={() =>
              setPreset(
                `SELECT city.country_id, country.country, COUNT(*) AS sehir_sayisi \nFROM city \nJOIN country ON city.country_id = country.country_id \nGROUP BY city.country_id, country.country \nORDER BY sehir_sayisi DESC \nLIMIT 5;`
              )
            }
            className="px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-medium transition"
          >
            ★ JOIN ile İlk 5 Ülke
          </button>

          <button
            onClick={() =>
              setPreset(
                `SELECT rating, \n       COUNT(*) AS toplam_film, \n       ROUND(AVG(length), 1) AS ortalama_sure, \n       ROUND(AVG(replacement_cost), 2) AS ortalama_maliyet \nFROM film \nGROUP BY rating \nORDER BY ortalama_maliyet DESC;`
              )
            }
            className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition"
          >
            ★ Rating Başına Ortalamalar
          </button>
        </div>
      </div>

      {/* SQL Editör Kutusu */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-300">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>query_editor.sql</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSql('')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Temizle"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Temizle</span>
            </button>

            <button
              onClick={runQuery}
              disabled={isRunning || !sql.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Çalışıyor...' : 'Çalıştır (Execute)'}</span>
            </button>
          </div>
        </div>

        {/* Textarea Code Editor */}
        <div className="relative">
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                runQuery();
              }
            }}
            placeholder="SELECT * FROM film LIMIT 10;"
            rows={8}
            className="w-full bg-slate-950 p-4 font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-y leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Hata Mesajı */}
      {result?.error && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-rose-200 mb-1">
              MySQL Sözdizimi Hatası (Syntax Error)
            </span>
            <code className="font-mono bg-rose-950/60 px-2 py-1 rounded border border-rose-800/40 block mt-1">
              {result.error}
            </code>
          </div>
        </div>
      )}

      {/* Sonuç Alanı */}
      {result && !result.error && (
        <div className="space-y-3">
          {/* Sonuç Araç Çubuğu */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                200 OK
              </span>
              <span className="text-slate-400 font-mono">
                Toplam Satır: <strong className="text-slate-200">{result.rowCount}</strong>
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                {result.executionTimeMs} ms
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Tablo İçi Arama */}
              <input
                type="text"
                placeholder="Sonuçlarda filtrele..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />

              <button
                onClick={copyResults}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                title="JSON Kopyala"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'JSON'}</span>
              </button>

              <button
                onClick={exportCsv}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                title="CSV İndir"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Tablo Görünümü */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-inner">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 text-slate-300 font-semibold font-mono">
                  <tr>
                    <th className="py-2.5 px-4 w-12 text-slate-500 text-center">#</th>
                    {result.columns.map((col) => (
                      <th key={col} className="py-2.5 px-4 text-cyan-400">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {filteredRows && filteredRows.length > 0 ? (
                    filteredRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-900/60 transition-colors odd:bg-slate-950/40"
                      >
                        <td className="py-2 px-4 text-slate-600 text-center text-[11px]">
                          {idx + 1}
                        </td>
                        {result.columns.map((col) => {
                          const val = row[col];
                          const isNumeric = typeof val === 'number';
                          return (
                            <td
                              key={col}
                              className={`py-2 px-4 ${
                                isNumeric ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                              }`}
                            >
                              {val !== null && val !== undefined ? String(val) : 'NULL'}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={result.columns.length + 1}
                        className="py-8 text-center text-slate-500"
                      >
                        Sonuç bulunamadı veya arama kriteriyle eşleşen satır yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
