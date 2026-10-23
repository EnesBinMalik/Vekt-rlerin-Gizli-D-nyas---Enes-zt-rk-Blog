import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Download, Filter, HelpCircle, Search } from 'lucide-react';
import { ExecutedResult } from '../utils/sqlExecutor';

interface ResultTableProps {
  result: ExecutedResult;
  title: string;
}

export const ResultTable: React.FC<ResultTableProps> = ({ result, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterNullOnly, setFilterNullOnly] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Sort
  const processedRows = useMemo(() => {
    let list = [...result.rows];

    // Filter by nulls
    if (filterNullOnly) {
      list = list.filter((row) =>
        result.columns.some((col) => row[col] === null || row[col] === undefined)
      );
    }

    // Filter by search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter((row) =>
        result.columns.some((col) => {
          const val = row[col];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
        })
      );
    }

    // Sort
    if (sortColumn) {
      list.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA === null && valB === null) return 0;
        if (valA === null) return sortDirection === 'asc' ? 1 : -1;
        if (valB === null) return sortDirection === 'asc' ? -1 : 1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        return sortDirection === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      });
    }

    return list;
  }, [result.rows, result.columns, searchTerm, sortColumn, sortDirection, filterNullOnly]);

  const totalPages = Math.ceil(processedRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedRows.slice(start, start + pageSize);
  }, [processedRows, currentPage, pageSize]);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

  const handleExportCsv = () => {
    const headers = result.columns.join(',');
    const rows = processedRows.map((r) =>
      result.columns.map((c) => (r[c] === null ? 'NULL' : `"${String(r[c]).replace(/"/g, '""')}"`)).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Controls Header */}
      <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-200">Sorgu Çıktısı</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {result.totalCount} toplam satır
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">
            ({result.executionTimeMs} ms)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Sonuçlarda ara..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-36 sm:w-44 transition"
            />
          </div>

          {/* Filter Nulls Toggle */}
          <button
            onClick={() => {
              setFilterNullOnly(!filterNullOnly);
              setCurrentPage(1);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition border cursor-pointer ${
              filterNullOnly
                ? 'bg-amber-950/80 text-amber-300 border-amber-600/80 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
            }`}
            title="Eşleşmeyen (NULL içeren) kayıtları filtrele"
          >
            <Filter className="w-3 h-3" />
            <span>NULL Olanlar</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg border border-slate-700 transition cursor-pointer"
            title="CSV Olarak İndir"
          >
            <Download className="w-3 h-3 text-slate-400" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto max-h-96 scrollbar-thin">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider sticky top-0 z-10 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center text-slate-500">#</th>
              {result.columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="py-2.5 px-4 font-semibold text-slate-300 hover:text-white cursor-pointer select-none transition"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col}</span>
                    <ArrowUpDown
                      className={`w-3 h-3 ${
                        sortColumn === col ? 'text-sky-400' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </th>
              ))}
              <th className="py-2.5 px-3 text-right">Eşleşme Durumu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={result.columns.length + 2} className="py-8 text-center text-slate-500 italic">
                  Eşleşen sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, idx) => {
                const rowIndex = (currentPage - 1) * pageSize + idx + 1;
                const status = row._status as string;
                const isLeftOnly = status === 'left_only';
                const isRightOnly = status === 'right_only';

                return (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isLeftOnly
                        ? 'bg-sky-950/20'
                        : isRightOnly
                        ? 'bg-amber-950/20'
                        : 'bg-transparent'
                    }`}
                  >
                    <td className="py-2 px-3 text-center text-slate-500 font-mono text-[11px]">
                      {rowIndex}
                    </td>

                    {result.columns.map((col) => {
                      const val = row[col];
                      const isNull = val === null || val === undefined;

                      return (
                        <td key={col} className="py-2.5 px-4 font-mono text-slate-200">
                          {isNull ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              NULL
                              <span className="text-[9px] font-normal text-amber-300/80">
                                (Eşleşme yok)
                              </span>
                            </span>
                          ) : (
                            <span className="text-slate-200 font-medium">{String(val)}</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="py-2 px-3 text-right">
                      {isLeftOnly && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-sky-900/40 text-sky-300 border border-sky-700/50">
                          Sol Tablodan (Eşleşmedi)
                        </span>
                      )}
                      {isRightOnly && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-900/40 text-amber-300 border border-amber-700/50">
                          Sağ Tablodan (Eşleşmedi)
                        </span>
                      )}
                      {status === 'matched' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                          Ortak Eşleşme
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

      {/* Pagination & Status Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Sayfada göster:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-0.5 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-slate-500 ml-2">
            Gösterilen: {paginatedRows.length} / {processedRows.length}
          </span>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition cursor-pointer"
            >
              Önceki
            </button>
            <span className="px-2 font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition cursor-pointer"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
