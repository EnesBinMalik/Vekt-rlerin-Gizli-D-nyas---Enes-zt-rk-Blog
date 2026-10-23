import React, { useState } from 'react';
import { Table, Search, KeyRound, Database, Info, Filter } from 'lucide-react';
import { TABLES } from '../data/sakilaDatabase';

interface TableExplorerProps {
  selectedTable: string;
  setSelectedTable: (tableName: string) => void;
}

export const TableExplorer: React.FC<TableExplorerProps> = ({
  selectedTable,
  setSelectedTable
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyMatchingN, setShowOnlyMatchingN] = useState(false);
  const [showOnlyStore1, setShowOnlyStore1] = useState(false);

  const table = TABLES[selectedTable] || TABLES.film;
  const isFilm = selectedTable === 'film';
  const isCustomer = selectedTable === 'customer';

  const rows = table.sampleData.filter(row => {
    // Custom filter toggles
    if (isFilm && showOnlyMatchingN) {
      if (!String(row.title || '').toLowerCase().endsWith('n')) return false;
    }
    if (isCustomer && showOnlyStore1) {
      if (row.store_id !== 1) return false;
    }

    if (!searchTerm) return true;
    return Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      {/* Table Selector Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <button
                onClick={() => {
                  setSelectedTable('film');
                  setSearchTerm('');
                  setShowOnlyMatchingN(false);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                  isFilm
                    ? 'bg-[#21262d] text-[#38bdf8] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                film ({TABLES.film.sampleData.length} kayıt)
              </button>
              <button
                onClick={() => {
                  setSelectedTable('customer');
                  setSearchTerm('');
                  setShowOnlyStore1(false);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                  isCustomer
                    ? 'bg-[#21262d] text-[#38bdf8] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                customer ({TABLES.customer.sampleData.length} kayıt)
              </button>
            </div>

            <p className="hidden md:block text-xs text-slate-400 max-w-md truncate">
              {table.description}
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-2">
            {isFilm && (
              <button
                onClick={() => setShowOnlyMatchingN(!showOnlyMatchingN)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-mono border transition-colors flex items-center gap-1.5 ${
                  showOnlyMatchingN
                    ? 'bg-amber-950/60 text-amber-300 border-amber-600/70'
                    : 'bg-[#0d1117] text-slate-400 border-[#30363d] hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Sadece '%n' ile Bitenler</span>
              </button>
            )}

            {isCustomer && (
              <button
                onClick={() => setShowOnlyStore1(!showOnlyStore1)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-mono border transition-colors flex items-center gap-1.5 ${
                  showOnlyStore1
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/70'
                    : 'bg-[#0d1117] text-slate-400 border-[#30363d] hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Sadece store_id = 1</span>
              </button>
            )}

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`${table.name} tablosunda ara...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0d1117] text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg border border-[#30363d] focus:outline-none focus:border-[#38bdf8] w-48 placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schema Columns Strip */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-3.5 overflow-x-auto">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Sütun Şeması & Tipleri ({table.columns.length} sütun)</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono">
          {table.columns.map((c) => (
            <div
              key={c.name}
              className="px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] shrink-0 flex items-center gap-1.5"
            >
              {c.isPrimary && <KeyRound className="w-2.5 h-2.5 text-amber-400" />}
              <span className="text-white font-medium">{c.name}</span>
              <span className="text-slate-400 text-[10px]">{c.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0d1117] text-slate-400 uppercase font-mono sticky top-0 z-10 border-b border-[#30363d]">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center text-[10px] text-slate-500">#</th>
                {table.columns.map((col) => (
                  <th key={col.name} className="py-2.5 px-3 font-semibold text-[11px] whitespace-nowrap text-slate-300">
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d] font-mono">
              {rows.map((row, idx) => {
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
                    {table.columns.map((col) => {
                      const val = row[col.name];
                      const isTitle = col.name === 'title';
                      const isLength = col.name === 'length';
                      const isEndsWithN = isTitle && typeof val === 'string' && val.toLowerCase().endsWith('n');

                      return (
                        <td
                          key={col.name}
                          className={`py-2 px-3 whitespace-nowrap tabular-nums ${
                            isEndsWithN
                              ? 'text-amber-300 font-semibold'
                              : col.name === 'store_id' && val === 1
                              ? 'text-emerald-400 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {isEndsWithN ? (
                            <span>
                              {val.slice(0, -1)}
                              <span className="text-amber-300 bg-amber-950/70 px-1 py-0.5 rounded border border-amber-600/60 font-bold">
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

        <div className="px-4 py-2 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>
            {rows.length} satır listeleniyor ({table.sampleData.length} toplam kayıttan)
          </span>
          <span>Tablo: sakila.{table.name}</span>
        </div>
      </div>
    </div>
  );
};
