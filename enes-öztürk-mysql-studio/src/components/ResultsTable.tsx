import React, { useState, useMemo } from 'react';
import { SqlQueryResult } from '../lib/sqlEngine';
import { Download, Search, ArrowUpDown, ArrowUp, ArrowDown, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ResultsTableProps {
  result: SqlQueryResult | null;
  onClear?: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeView, setActiveView] = useState<'data' | 'plan'>('data');

  // Filter rows by search term
  const filteredRows = useMemo(() => {
    if (!result || !result.rows) return [];
    if (!searchTerm.trim()) return result.rows;

    const term = searchTerm.toLowerCase();
    return result.rows.filter((row) =>
      Object.values(row).some((val) =>
        val !== null && val !== undefined && String(val).toLowerCase().includes(term)
      )
    );
  }, [result, searchTerm]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!sortColumn) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      let comp = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comp = valA - valB;
      } else {
        comp = String(valA).localeCompare(String(valB), 'tr', { sensitivity: 'base' });
      }

      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [filteredRows, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, currentPage, pageSize]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const exportCsv = () => {
    if (!result || !result.columns.length) return;
    const headers = result.columns.join(',');
    const rows = sortedRows.map((r) =>
      result.columns.map((col) => {
        const val = r[col];
        if (val === null || val === undefined) return '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sakila_query_result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(sortedRows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sakila_query_result_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0e1420] border border-slate-800/80 rounded-lg min-h-[260px]">
        <Info className="w-8 h-8 text-slate-500 mb-3" />
        <h4 className="text-sm font-semibold text-slate-300 mb-1">Henüz Sorgu Çalıştırılmadı</h4>
        <p className="text-xs text-slate-400 max-w-md">
          SQL düzenleyiciye sorgunuzu yazıp <span className="font-mono text-emerald-400">Ctrl + Enter</span> yapabilir veya yukarıdaki ödev butonlarından birine tıklayarak sonuçları inceleyebilirsiniz.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-6 bg-red-950/20 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-300 mb-1">MySQL Sözdizimi Hatası</h4>
            <p className="text-xs text-red-200/90 font-mono leading-relaxed bg-red-950/40 p-3 rounded border border-red-900/50">
              {result.error}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              İpucu: Tablo adlarını (<code className="text-emerald-400">country</code>, <code className="text-emerald-400">film</code>) ve joker karakterleri kontrol edin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#0e1420] border border-slate-800/80 rounded-lg overflow-hidden">
      {/* Result Metrics Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#141b2b] border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-200">Sorgu Başarılı</span>
          </div>

          <div className="text-slate-400 font-mono">
            <span>Dönen Satır: </span>
            <strong className="text-slate-200 font-semibold tabular-nums">{result.totalRows}</strong>
          </div>

          <div className="text-slate-400 font-mono">
            <span>Çalışma Süresi: </span>
            <strong className="text-slate-200 font-semibold tabular-nums">{result.executionTimeMs} ms</strong>
          </div>
        </div>

        {/* View Switcher & Export */}
        <div className="flex items-center gap-2">
          {/* Data vs Plan Segmented Control */}
          <div className="flex items-center bg-slate-900/80 p-0.5 rounded border border-slate-800">
            <button
              onClick={() => setActiveView('data')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                activeView === 'data' ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Veri Tablosu
            </button>
            <button
              onClick={() => setActiveView('plan')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                activeView === 'plan' ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              EXPLAIN Planı
            </button>
          </div>

          <button
            onClick={exportCsv}
            disabled={result.rows.length === 0}
            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded border border-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="CSV olarak dışa aktar"
          >
            <Download className="w-3 h-3" />
            <span>CSV</span>
          </button>

          <button
            onClick={exportJson}
            disabled={result.rows.length === 0}
            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded border border-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="JSON olarak dışa aktar"
          >
            <span>JSON</span>
          </button>
        </div>
      </div>

      {activeView === 'plan' ? (
        /* EXPLAIN Query Plan View */
        <div className="p-5 space-y-4">
          <div className="text-xs text-slate-400 mb-2">
            MySQL Optimizer Sorgu Planı (Sıralı Adımlar):
          </div>

          <div className="space-y-2">
            {(result.plan || []).map((step, idx) => (
              <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/40 rounded border border-emerald-900/40">
                    {idx + 1}. {step.operation}
                  </span>
                  <span className="text-slate-300">{step.details}</span>
                </div>
                <div className="text-slate-400 font-mono tabular-nums">
                  {step.rowsIn !== undefined && (
                    <span>Giren: {step.rowsIn} · Çıkan: {step.rowsOut}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Data Grid View */
        <>
          {/* Quick Filter Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0c121e] border-b border-slate-800/80 text-xs">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Sonuçlar içinde ara..."
                className="w-full pl-8 pr-3 py-1 bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 rounded text-xs outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span>Sayfa Başına:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded px-2 py-0.5 text-xs outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto max-h-[440px]">
            {paginatedRows.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Eşleşen sonuç bulunamadı.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#121927] border-b border-slate-800/80 sticky top-0 z-10">
                    <th className="py-2.5 px-3 text-slate-500 font-mono w-12 text-center">#</th>
                    {result.columns.map((col) => {
                      const isSorted = sortColumn === col;
                      return (
                        <th
                          key={col}
                          onClick={() => handleSort(col)}
                          className="py-2.5 px-3 text-slate-300 font-semibold font-mono whitespace-nowrap hover:bg-slate-800/40 cursor-pointer select-none transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{col}</span>
                            {isSorted ? (
                              sortDirection === 'asc' ? (
                                <ArrowUp className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <ArrowDown className="w-3 h-3 text-emerald-400" />
                              )
                            ) : (
                              <ArrowUpDown className="w-3 h-3 text-slate-600 hover:text-slate-400" />
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {paginatedRows.map((row, idx) => {
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                        <td className="py-2 px-3 text-slate-500 font-mono text-center tabular-nums">
                          {rowNumber}
                        </td>
                        {result.columns.map((col) => {
                          const val = row[col];
                          const isNumber = typeof val === 'number';
                          return (
                            <td
                              key={col}
                              className={`py-2 px-3 whitespace-nowrap text-slate-300 ${
                                isNumber ? 'text-right font-mono tabular-nums text-emerald-300/90' : 'text-left'
                              }`}
                            >
                              {val === null || val === undefined ? (
                                <span className="text-slate-600 italic">NULL</span>
                              ) : typeof val === 'boolean' ? (
                                String(val)
                              ) : (
                                String(val)
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1420] border-t border-slate-800/80 text-xs text-slate-400">
              <div className="font-mono tabular-nums">
                Toplam <strong className="text-slate-200">{sortedRows.length}</strong> kayıttan{' '}
                <strong className="text-slate-200">
                  {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedRows.length)}
                </strong>{' '}
                arası gösteriliyor
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                >
                  Önceki
                </button>
                <span className="font-mono tabular-nums px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                >
                  Sonraki
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
