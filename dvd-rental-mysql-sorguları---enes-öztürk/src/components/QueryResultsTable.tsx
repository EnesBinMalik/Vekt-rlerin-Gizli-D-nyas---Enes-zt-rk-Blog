import React, { useState, useMemo } from 'react';
import { Download, Search, Database, Clock, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { QueryResult } from '../utils/sqlEngine';

interface QueryResultsTableProps {
  result: QueryResult | null;
  scenarioTitle?: string;
}

export const QueryResultsTable: React.FC<QueryResultsTableProps> = ({ result, scenarioTitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center">
        <Database className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-400">Henüz sorgu çalıştırılmadı.</p>
        <p className="text-xs text-slate-500 mt-1">Yukarıdaki "Çalıştır" butonuna tıklayarak sonuçları görebilirsiniz.</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="rounded-xl border border-rose-900/60 bg-rose-950/30 p-5">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-rose-300">Sorgu Hatası (MySQL Error)</h4>
            <p className="text-xs text-rose-200/80 mt-1 font-mono">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter rows based on search
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return result.rows;
    const term = searchTerm.toLowerCase();
    return result.rows.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(term))
    );
  }, [result.rows, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  // Export to CSV
  const exportCsv = () => {
    if (result.rows.length === 0) return;
    const headers = result.columns.join(',');
    const rows = result.rows.map(r =>
      result.columns.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dvdrental_sonuc_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isNumericColumn = (colName: string) => {
    const lower = colName.toLowerCase();
    return (
      lower.includes('id') ||
      lower.includes('sayisi') ||
      lower.includes('count') ||
      lower.includes('ucret') ||
      lower.includes('maliyet') ||
      lower.includes('length') ||
      lower.includes('rate') ||
      lower.includes('cost') ||
      lower.includes('tutar') ||
      lower.includes('dakika')
    );
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-lg">
      {/* Table Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sorgu Çıktısı</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1 font-mono tabular-nums text-slate-300">
            <Hash className="w-3 h-3 text-slate-500" />
            <span>{result.rowCount} satır</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1 font-mono tabular-nums text-slate-400">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>{result.executionTimeMs} ms</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {result.rows.length > 5 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Sonuçlarda ara..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1 text-xs bg-slate-950/70 border border-slate-700/80 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-48"
              />
            </div>
          )}

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
            title="Sonuçları CSV formatında indir"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">CSV İndir</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {result.message && (
        <div className="px-4 py-2 bg-emerald-950/30 border-b border-emerald-900/30 text-xs text-emerald-300/90 font-mono flex items-center gap-2">
          <span className="text-emerald-400">✓</span>
          <span>{result.message}</span>
        </div>
      )}

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[11px]">
            <tr>
              <th className="py-2.5 px-3 w-10 text-center text-slate-600">#</th>
              {result.columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-2.5 px-4 font-semibold text-slate-300 ${
                    isNumericColumn(col) ? 'text-right' : 'text-left'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={result.columns.length + 1} className="py-8 text-center text-slate-500">
                  Aramanıza uygun sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, rIdx) => {
                const rowNum = (currentPage - 1) * pageSize + rIdx + 1;
                return (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-3 text-center text-slate-600 font-mono text-[11px] tabular-nums">
                      {rowNum}
                    </td>
                    {result.columns.map((col, cIdx) => {
                      const val = row[col];
                      const isNum = isNumericColumn(col);
                      return (
                        <td
                          key={cIdx}
                          className={`py-2.5 px-4 ${
                            isNum
                              ? 'text-right font-mono tabular-nums text-cyan-300 font-medium'
                              : 'text-left text-slate-200'
                          }`}
                        >
                          {typeof val === 'number'
                            ? col.includes('ucret') || col.includes('maliyet') || col.includes('rate') || col.includes('cost') || col.includes('tutar')
                              ? `${val.toFixed(2)} $`
                              : val.toLocaleString('tr-TR')
                            : String(val ?? 'NULL')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 text-xs text-slate-400">
          <span className="tabular-nums">
            Sayfa <span className="text-slate-200 font-semibold">{currentPage}</span> / {totalPages} (Toplam {filteredRows.length} kayıt)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
              title="Önceki Sayfa"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
              title="Sonraki Sayfa"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
