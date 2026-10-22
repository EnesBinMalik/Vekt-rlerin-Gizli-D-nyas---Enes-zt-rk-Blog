import React, { useState, useMemo } from 'react';
import {
  Download,
  Copy,
  Check,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Clock,
  FileSpreadsheet,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { QueryResult } from '../utils/sqlEngine';

interface ResultsGridProps {
  result: QueryResult | null;
  historyLogs: string[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ result, historyLogs }) => {
  const [activeTab, setActiveTab] = useState<'grid' | 'logs' | 'explain'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [copiedData, setCopiedData] = useState(false);

  // Sorting
  const handleSort = (colName: string) => {
    if (sortColumn === colName) {
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
      } else {
        setSortColumn(null);
        setSortDirection('ASC');
      }
    } else {
      setSortColumn(colName);
      setSortDirection('ASC');
    }
    setCurrentPage(1);
  };

  // Filter & Sort rows
  const processedRows = useMemo(() => {
    if (!result || !result.success || !result.rows.length) return [];

    let rows = [...result.rows];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      rows = rows.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    // Sort
    if (sortColumn) {
      rows.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        let comp = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          comp = valA - valB;
        } else {
          comp = String(valA).localeCompare(String(valB));
        }
        return sortDirection === 'DESC' ? -comp : comp;
      });
    }

    return rows;
  }, [result, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedRows.slice(start, start + pageSize);
  }, [processedRows, currentPage, pageSize]);

  // Export functions
  const exportToCsv = () => {
    if (!result || !result.rows.length) return;
    const headers = result.columns.join(',');
    const rows = result.rows.map(row =>
      result.columns.map(col => {
        const val = row[col] === null || row[col] === undefined ? '' : String(row[col]);
        return `"${val.replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mysql_sakila_query_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJson = () => {
    if (!result || !result.rows.length) return;
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result.rows, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `mysql_sakila_query_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyResults = () => {
    if (!result || !result.rows.length) return;
    navigator.clipboard.writeText(JSON.stringify(result.rows, null, 2));
    setCopiedData(true);
    setTimeout(() => setCopiedData(false), 2000);
  };

  const isNumeric = (val: any) => typeof val === 'number' || (!isNaN(Number(val)) && val !== '' && val !== null);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-900 overflow-hidden">
      {/* Sub-Header Tabs & Grid Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 border-b border-slate-800 bg-slate-950/60 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('grid')}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'grid'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700/80 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sonuç Tablosu ({result?.rowCount || 0})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'logs'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700/80 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Konsol Çıktısı
          </button>
          {result?.explainPlan && (
            <button
              onClick={() => setActiveTab('explain')}
              className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'explain'
                  ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700/80 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Execution Plan (EXPLAIN)
            </button>
          )}
        </div>

        {/* Search & Export Toolbar */}
        {activeTab === 'grid' && result?.success && result.rows.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Sonuçlarda filtrele..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-44"
              />
            </div>

            <button
              onClick={exportToCsv}
              className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-xs transition-colors"
              title="CSV Olarak İndir"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>CSV</span>
            </button>

            <button
              onClick={exportToJson}
              className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-xs transition-colors"
              title="JSON Olarak İndir"
            >
              <Download className="w-3 h-3 text-sky-400" />
              <span>JSON</span>
            </button>

            <button
              onClick={copyResults}
              className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-xs transition-colors"
              title="Panoya Kopyala"
            >
              {copiedData ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-auto bg-slate-950/40 relative">
        {activeTab === 'grid' && (
          <>
            {/* Error Banner */}
            {result && !result.success && (
              <div className="p-4 m-4 bg-rose-950/40 border border-rose-800/80 rounded-lg text-rose-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-rose-300">Sözdizimi / Çalıştırma Hatası</h4>
                  <p className="font-mono text-xs mt-1 text-rose-200 bg-rose-950/60 p-2 rounded border border-rose-900/60">
                    {result.error || result.message}
                  </p>
                  <p className="text-xs text-rose-300/80 mt-2">
                    İpucu: Tablo adını (film, actor, category), sütun isimlerini ve tırnak işaretlerini kontrol ediniz.
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!result || (result.success && result.rows.length === 0)) && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400">
                <Terminal className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-sm font-medium text-slate-300">
                  {result ? "Eşleşen kayıt bulunamadı (0 satır)" : "Henüz bir sorgu çalıştırılmadı"}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  {result
                    ? "Belirtilen koşullarla eşleşen veri yok. Filtre değerlerinizi kontrol edin."
                    : "Yukarıdaki SQL editörüne bir sorgu yazıp 'Çalıştır' butonuna basabilir veya sağ üstteki ödevleri seçebilirsiniz."}
                </p>
              </div>
            )}

            {/* Populated Table Grid */}
            {result && result.success && result.rows.length > 0 && (
              <div className="min-w-full inline-block align-middle">
                <table className="min-w-full divide-y divide-slate-800 text-left text-xs">
                  <thead className="bg-slate-900/90 sticky top-0 z-10 select-none shadow-xs border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3 font-mono text-[11px] text-slate-400 font-medium w-12 text-center">
                        #
                      </th>
                      {result.columns.map(col => {
                        const isSorted = sortColumn === col;
                        return (
                          <th
                            key={col}
                            onClick={() => handleSort(col)}
                            className="py-2.5 px-3 font-mono text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors whitespace-nowrap"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{col}</span>
                              {isSorted ? (
                                sortDirection === 'ASC' ? (
                                  <ArrowUp className="w-3 h-3 text-sky-400" />
                                ) : (
                                  <ArrowDown className="w-3 h-3 text-sky-400" />
                                )
                              ) : (
                                <ArrowUpDown className="w-2.5 h-2.5 text-slate-400 opacity-60 hover:opacity-100" />
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60 font-mono text-[11px]">
                    {paginatedRows.map((row, idx) => {
                      const absoluteIndex = (currentPage - 1) * pageSize + idx + 1;
                      return (
                        <tr
                          key={idx}
                          className="hover:bg-slate-850/70 transition-colors"
                        >
                          <td className="py-2 px-3 text-slate-400 text-center select-none font-mono text-[10px]">
                            {absoluteIndex}
                          </td>
                          {result.columns.map(col => {
                            const val = row[col];
                            const numeric = isNumeric(val);
                            return (
                              <td
                                key={col}
                                className={`py-2 px-3 text-slate-200 whitespace-nowrap ${
                                  numeric ? 'tabular-nums text-right text-sky-300/90' : 'text-left'
                                }`}
                              >
                                {val === null || val === undefined ? (
                                  <span className="text-slate-400 italic">NULL</span>
                                ) : typeof val === 'boolean' ? (
                                  val ? 'TRUE' : 'FALSE'
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
              </div>
            )}
          </>
        )}

        {/* Logs View */}
        {activeTab === 'logs' && (
          <div className="p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-slate-400 pb-2 border-b border-slate-800">
              -- MySQL 8.0.36 Client Session Log · Enes Öztürk Sakila Database
            </div>
            {historyLogs.map((log, i) => (
              <div key={i} className="text-slate-300 py-0.5 leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        )}

        {/* Explain View */}
        {activeTab === 'explain' && result?.explainPlan && (
          <div className="p-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-slate-200 mb-2 font-mono">
                Sorgu Yürütme Planı (Query Execution Plan)
              </h4>
              <div className="overflow-x-auto font-mono text-xs">
                <table className="min-w-full text-left text-slate-300">
                  <thead className="bg-slate-850 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-2">id</th>
                      <th className="p-2">select_type</th>
                      <th className="p-2">table</th>
                      <th className="p-2">type</th>
                      <th className="p-2">key</th>
                      <th className="p-2">rows</th>
                      <th className="p-2">Extra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.explainPlan.map((ep, idx) => (
                      <tr key={idx} className="border-b border-slate-800/60">
                        <td className="p-2 text-sky-400">{ep.id}</td>
                        <td className="p-2">{ep.select_type}</td>
                        <td className="p-2 text-amber-300">{ep.table}</td>
                        <td className="p-2 text-emerald-400">{ep.type}</td>
                        <td className="p-2">{ep.key || 'NULL'}</td>
                        <td className="p-2 tabular-nums">{ep.rows}</td>
                        <td className="p-2 text-slate-400">{ep.Extra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination & Status Bar */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0 select-none">
        <div className="flex items-center gap-3">
          {result?.success ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{result.message}</span>
            </span>
          ) : result?.error ? (
            <span className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Sorgu hatası oluştu</span>
            </span>
          ) : (
            <span className="text-slate-400 font-mono text-[11px]">Hazır</span>
          )}
        </div>

        {/* Pagination controls */}
        {activeTab === 'grid' && result?.success && result.rows.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px]">
              <span>Sayfa boyutu:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-slate-200 text-xs focus:outline-none"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-1 font-mono text-[11px] tabular-nums">
              <span>{currentPage}</span>
              <span className="text-slate-400">/</span>
              <span>{totalPages}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 text-[11px] transition-colors"
              >
                Önceki
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 text-[11px] transition-colors"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
