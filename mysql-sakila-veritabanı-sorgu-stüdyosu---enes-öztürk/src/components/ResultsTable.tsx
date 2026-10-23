import React, { useState } from 'react';
import { Download, Search, CheckCircle2, AlertCircle, FileSpreadsheet, Copy, Check } from 'lucide-react';
import { QueryExecutionResult } from '../types/database';

interface ResultsTableProps {
  result: QueryExecutionResult;
  targetTableName?: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result, targetTableName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  // If there's an error
  if (result.error) {
    return (
      <div className="bg-[#161b22] border border-rose-900/50 rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3 text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-rose-300">MySQL Sorgu Yürütme Hatası</h3>
            <p className="text-xs font-mono text-rose-200/90 bg-rose-950/40 p-3 rounded border border-rose-800/40 whitespace-pre-wrap">
              {result.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter rows based on search
  const filteredRows = result.rows.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleExportCsv = () => {
    if (result.rows.length === 0) return;
    const headers = result.columns.join(',');
    const rows = result.rows
      .map(row => result.columns.map(col => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(`${headers}\n${rows}`);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `mysql_result_${targetTableName || 'query'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMarkdown = () => {
    if (result.rows.length === 0) return;
    const headerRow = `| # | ${result.columns.join(' | ')} |`;
    const sepRow = `|---|${result.columns.map(() => '---').join('|')}|`;
    const rows = result.rows
      .map((row, i) => `| ${i + 1} | ${result.columns.map(c => row[c] ?? '').join(' | ')} |`)
      .join('\n');
    const tableMd = `${headerRow}\n${sepRow}\n${rows}`;
    navigator.clipboard.writeText(tableMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Table Toolbar & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#1a222e] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-white">
            Sorgu Sonuç Tablosu
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({result.rows.length} satır döndü · {result.executionTimeMs} ms)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search in results */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Sonuçlarda filtrele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0d1117] text-xs text-slate-200 pl-8 pr-3 py-1 rounded-md border border-[#30363d] focus:outline-none focus:border-[#38bdf8] w-40 sm:w-48 placeholder:text-slate-500"
            />
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1 text-xs px-2.5 py-1 text-slate-300 hover:text-white bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded transition-colors"
            title="Markdown formatında kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">MD Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1 text-xs px-2.5 py-1 text-slate-300 hover:text-white bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded transition-colors"
            title="CSV Olarak İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {result.rows.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-xs">
          Bu sorgu koşullarına uyan kayıt bulunamadı (0 satır).
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[380px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0d1117] text-slate-400 uppercase font-mono sticky top-0 z-10 border-b border-[#30363d]">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center text-[10px] text-slate-500">
                  #
                </th>
                {result.columns.map((col) => (
                  <th
                    key={col}
                    className={`py-2.5 px-3 font-semibold text-[11px] whitespace-nowrap ${
                      col === 'title' || col === 'first_name' || col === 'last_name'
                        ? 'text-[#38bdf8]'
                        : col === 'length'
                        ? 'text-amber-400 text-right'
                        : col === 'store_id'
                        ? 'text-emerald-400 text-center'
                        : 'text-slate-300'
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d] font-mono">
              {filteredRows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-[#1f242c] transition-colors ${
                      isEven ? 'bg-[#161b22]' : 'bg-[#12161d]'
                    }`}
                  >
                    <td className="py-2 px-3 text-center text-slate-400 tabular-nums select-none text-[11px]">
                      {idx + 1}
                    </td>
                    {result.columns.map((col) => {
                      const val = row[col];
                      const isLength = col === 'length';
                      const isTitle = col === 'title';
                      const isStore = col === 'store_id';
                      const isLastName = col === 'last_name';

                      return (
                        <td
                          key={col}
                          className={`py-2 px-3 whitespace-nowrap tabular-nums ${
                            isLength
                              ? 'text-right font-bold text-amber-300'
                              : isStore
                              ? 'text-center font-bold text-emerald-400'
                              : isTitle
                              ? 'font-semibold text-white'
                              : isLastName
                              ? 'font-bold text-[#38bdf8]'
                              : 'text-slate-300'
                          }`}
                        >
                          {/* If it's a title ending with 'n', visually highlight the 'n' */}
                          {isTitle && typeof val === 'string' && val.toLowerCase().endsWith('n') ? (
                            <span>
                              {val.slice(0, -1)}
                              <span className="text-amber-300 bg-amber-950/60 px-1 py-0.5 rounded border border-amber-600/50">
                                {val.slice(-1)}
                              </span>
                            </span>
                          ) : isLength ? (
                            <span>{val} dk</span>
                          ) : val === null || val === undefined ? (
                            <span className="text-slate-600 italic">NULL</span>
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

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#0d1117] border-t border-[#30363d] flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>Toplam Eşleşen: {result.totalMatched} satır</span>
          <span>·</span>
          <span>Gösterilen: {filteredRows.length} satır</span>
        </div>
        <div className="flex items-center gap-2">
          <span>RDBMS Engine: InnoDB (MySQL 8.4)</span>
        </div>
      </div>
    </div>
  );
};
