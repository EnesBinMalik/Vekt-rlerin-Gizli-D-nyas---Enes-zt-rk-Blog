import React from 'react';
import { Database, Table, KeyRound, ChevronRight, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import { TABLES, AUTHOR_INFO, ASSIGNMENT_PRESETS } from '../data/sakilaDatabase';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedTable: string;
  setSelectedTable: (table: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  selectedTable,
  setSelectedTable
}) => {
  return (
    <aside className="w-72 bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 overflow-y-auto">
      {/* DB Connection Status */}
      <div className="p-4 border-b border-[#30363d]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-slate-400">VERİTABANI BAĞLANTISI</span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
            MySQL 8.4 Aktif
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#00758F]" />
          <span className="font-mono text-xs font-bold text-white tracking-wide">sakila_db</span>
          <span className="text-[10px] text-slate-500 font-mono">utf8mb4</span>
        </div>
      </div>

      {/* Assignment Navigation */}
      <div className="p-4 border-b border-[#30363d]">
        <div className="text-[11px] font-mono text-slate-400 mb-2">ÖDEV GÖREVLERİ (3/3)</div>
        <div className="space-y-1.5">
          {ASSIGNMENT_PRESETS.map((preset) => {
            const isActive = activeView === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setActiveView(preset.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                  isActive
                    ? 'bg-[#161b22] border-[#38bdf8] shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-[#161b22]/60 hover:border-[#30363d]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                    isActive
                      ? 'bg-[#38bdf8] text-slate-900'
                      : 'bg-[#21262d] text-slate-400'
                  }`}
                >
                  {preset.assignmentNumber}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate">
                      {preset.assignmentNumber === 1
                        ? "Title '%n' & En Uzun 5"
                        : preset.assignmentNumber === 2
                        ? "Title '%n' & En Kısa 2. Beş"
                        : "Store 1 & Last Name DESC"}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                    {preset.keyTakeaway}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Database Tables Explorer */}
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-400">ŞEMA TABLOLARI</span>
          <span className="text-[11px] text-slate-500 font-mono">2 ana tablo</span>
        </div>

        <div className="space-y-1">
          {Object.entries(TABLES).map(([key, table]) => {
            const isTableActive = activeView === 'tables' && selectedTable === key;
            return (
              <div key={key} className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedTable(key);
                    setActiveView('tables');
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-xs font-mono transition-colors ${
                    isTableActive
                      ? 'bg-[#21262d] text-[#38bdf8] font-bold border border-[#30363d]'
                      : 'text-slate-300 hover:bg-[#161b22] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Table className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{table.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans tabular-nums">
                    {table.rowCount} satır
                  </span>
                </button>

                {/* Sub columns display */}
                <div className="pl-6 pr-2 space-y-0.5 py-1">
                  {table.columns.slice(0, 4).map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center justify-between text-[11px] font-mono text-slate-400 hover:text-slate-200 py-0.5"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {col.isPrimary ? (
                          <KeyRound className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                        )}
                        <span className="truncate">{col.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{col.type.split(' ')[0]}</span>
                    </div>
                  ))}
                  {table.columns.length > 4 && (
                    <div className="text-[10px] text-slate-400 pl-2.5 py-0.5">
                      +{table.columns.length - 4} diğer sütun...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Developer Signature Box */}
      <div className="p-4 border-t border-[#30363d] bg-[#161b22]/50">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] font-bold text-xs">
            EÖ
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white tracking-wide truncate">
              {AUTHOR_INFO.name}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {AUTHOR_INFO.title}
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-400 border-t border-[#30363d] pt-2">
          İmza Onaylı MySQL Çözüm Paketi
        </div>
      </div>
    </aside>
  );
};
