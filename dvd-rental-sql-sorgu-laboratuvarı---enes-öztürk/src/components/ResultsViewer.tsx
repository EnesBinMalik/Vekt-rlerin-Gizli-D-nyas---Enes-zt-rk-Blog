import React, { useState, useMemo } from 'react';
import { ExecutionResult } from '../types/database';
import { Download, Search, Check, Copy, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';

interface ResultsViewerProps {
  result: ExecutionResult;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Reset pagination when result changes
  React.useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
  }, [result]);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return result.rows;
    const term = searchTerm.toLowerCase().trim();
    return result.rows.filter(r => r.first_name.toLowerCase().includes(term));
  }, [result.rows, searchTerm]);

  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredRows.length / pageSize);

  const displayedRows = useMemo(() => {
    if (pageSize === -1) return filteredRows;
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const handleExportCsv = () => {
    const headers = ['Row_Number', 'First_Name', 'Actor_Occurrences', 'Customer_Occurrences', 'Source'];
    const rows = filteredRows.map((r, i) => {
      let source = 'Both';
      if ((r.actor_count || 0) > 0 && (r.customer_count || 0) === 0) source = 'Actor_Only';
      else if ((r.actor_count || 0) === 0 && (r.customer_count || 0) > 0) source = 'Customer_Only';
      return [i + 1, r.first_name, r.actor_count || 0, r.customer_count || 0, source].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dvdrental_query_scenario_${result.scenarioId || 'custom'}_result.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyNames = () => {
    const text = filteredRows.map(r => r.first_name).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Metrics & Filter Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-100">
              Sorgu Sonuç Tablosu
            </h3>
            <span className="text-xs text-amber-400 font-mono font-bold tabular-nums">
              ({result.totalRows} satır döndü)
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · {result.distinctCount} tekil isim
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {result.summaryText}
          </p>
        </div>

        {/* Search & Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="İsim ara..."
              className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 w-36 sm:w-44"
            />
          </div>

          <button
            onClick={handleCopyNames}
            className="cursor-pointer px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 flex items-center gap-1.5 whitespace-nowrap"
            title="Listelenen tüm isimleri panoya kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="cursor-pointer px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60 flex items-center gap-1.5 whitespace-nowrap"
            title="Sonuçları CSV dosyası olarak indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV İndir</span>
          </button>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto min-h-64 max-h-[460px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] sticky top-0 z-10 border-b border-slate-800">
            <tr>
              <th className="py-2 px-3 w-16 text-center">#</th>
              <th className="py-2 px-4">first_name</th>
              <th className="py-2 px-3 text-center">Actor Tablosu Frekansı</th>
              <th className="py-2 px-3 text-center">Customer Tablosu Frekansı</th>
              <th className="py-2 px-4">Küme Durumu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {displayedRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 font-sans text-xs">
                  Aramanıza uygun sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              displayedRows.map((row, idx) => {
                const actualIndex = (pageSize === -1 ? 0 : (currentPage - 1) * pageSize) + idx + 1;
                const inBoth = (row.actor_count || 0) > 0 && (row.customer_count || 0) > 0;
                const onlyActor = (row.actor_count || 0) > 0 && (row.customer_count || 0) === 0;

                return (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-2 px-3 text-center text-slate-500 tabular-nums">
                      {actualIndex}
                    </td>
                    <td className="py-2 px-4 font-semibold text-slate-100">
                      {row.first_name}
                    </td>
                    <td className="py-2 px-3 text-center tabular-nums">
                      <span className={(row.actor_count || 0) > 0 ? 'text-amber-400 font-bold' : 'text-slate-600'}>
                        {row.actor_count || 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center tabular-nums">
                      <span className={(row.customer_count || 0) > 0 ? 'text-sky-400 font-bold' : 'text-slate-600'}>
                        {row.customer_count || 0}
                      </span>
                    </td>
                    <td className="py-2 px-4 font-sans text-[11px]">
                      {inBoth && (
                        <span className="text-emerald-400 font-medium">
                          Ortak (Actor & Customer)
                        </span>
                      )}
                      {onlyActor && (
                        <span className="text-amber-300 font-medium">
                          Sadece Actor Tablosu
                        </span>
                      )}
                      {!inBoth && !onlyActor && (
                        <span className="text-sky-300 font-medium">
                          Sadece Customer Tablosu
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Sayfa Başına Satır:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-800 text-slate-200 rounded px-2 py-1 text-xs focus:outline-none"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={-1}>Tümü ({filteredRows.length})</option>
          </select>
          <span className="tabular-nums">
            {filteredRows.length} kayıttan {pageSize === -1 ? filteredRows.length : Math.min(filteredRows.length, (currentPage - 1) * pageSize + 1)} - {pageSize === -1 ? filteredRows.length : Math.min(filteredRows.length, currentPage * pageSize)} arası
          </span>
        </div>

        {pageSize !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono tabular-nums text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
