import React, { useState, useMemo } from 'react';
import { Download, Search, ChevronLeft, ChevronRight, Hash, Database } from 'lucide-react';

interface ResultsTableProps {
  columns: string[];
  rows: any[];
  executionTimeMs?: number;
  maxInitialRows?: number;
  title?: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  columns,
  rows,
  executionTimeMs,
  maxInitialRows = 10,
  title
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(maxInitialRows);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? '').toLowerCase().includes(term)
      )
    );
  }, [rows, searchTerm]);

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const exportCSV = () => {
    if (!rows.length || !columns.length) return;
    const headers = columns.join(',');
    const body = rows
      .map((row) =>
        columns
          .map((col) => {
            const val = row[col];
            if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return val ?? '';
          })
          .join(',')
      )
      .join('\n');
    const blob = new Blob([`${headers}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dvdrental_query_result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if (!rows.length) return;
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dvdrental_query_result_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <Database className="mx-auto h-10 w-10 text-slate-500 mb-2 opacity-60" />
        <p className="text-slate-400 font-medium">Bu sorgu için sonuç bulunamadı (0 satır).</p>
        <p className="text-xs text-slate-500 mt-1">Koşullarınızı veya tablo filtrelerinizi kontrol ediniz.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Table Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/50 px-4 py-3">
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              {title}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
            <Hash className="h-3 w-3" />
            {rows.length} {rows.length === 1 ? 'satır' : 'satır'}
          </span>
          {executionTimeMs !== undefined && (
            <span className="text-xs text-slate-400 font-mono">
              ⚡ {executionTimeMs} ms
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Search in Results */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Sonuçlarda filtrele..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 w-44 rounded-lg bg-slate-900 border border-slate-700/70 pl-8 pr-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Export Dropdown / Buttons */}
          <button
            onClick={exportCSV}
            title="CSV İndir"
            className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <Download className="h-3 w-3 text-cyan-400" />
            <span>CSV</span>
          </button>
          <button
            onClick={exportJSON}
            title="JSON İndir"
            className="hidden sm:flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead className="sticky top-0 bg-slate-900/95 backdrop-blur z-10 border-b border-slate-800 text-slate-300 uppercase tracking-wider font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3 w-10 text-slate-500 font-normal">#</th>
              {columns.map((col) => (
                <th key={col} className="py-2.5 px-3 font-semibold text-slate-200 border-r border-slate-800/40 last:border-r-0 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {paginatedRows.map((row, idx) => {
              const rowNum = (currentPage - 1) * pageSize + idx + 1;
              return (
                <tr
                  key={idx}
                  className="hover:bg-cyan-950/20 transition-colors group"
                >
                  <td className="py-2 px-3 text-slate-500 text-[10px] select-none">
                    {rowNum}
                  </td>
                  {columns.map((col) => {
                    const val = row[col];
                    const isNull = val === null || val === undefined;
                    const isNumber = typeof val === 'number';
                    const isHighlightName = col === 'last_name' && val === 'SMITH';

                    return (
                      <td
                        key={col}
                        className={`py-2 px-3 whitespace-nowrap border-r border-slate-800/30 last:border-r-0 ${
                          isHighlightName
                            ? 'text-emerald-400 font-bold bg-emerald-950/40'
                            : isNull
                            ? 'text-slate-600 italic'
                            : isNumber
                            ? 'text-amber-300 font-mono'
                            : 'text-slate-200'
                        }`}
                      >
                        {isNull ? 'NULL' : String(val)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 bg-slate-900/40 px-4 py-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Sayfa başına:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-slate-500">
            Toplam {filteredRows.length} kayıt
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">
            Sayfa <span className="font-semibold text-slate-200">{currentPage}</span> / {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
