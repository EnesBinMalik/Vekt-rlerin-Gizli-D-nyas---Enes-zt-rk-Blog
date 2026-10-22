import React, { useState } from 'react';
import { Database, Table, ChevronRight, ChevronDown, Key, Play, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';
import { SAKILA_SCHEMA, TableSchema } from '../data/sakilaData';
import { HOMEWORK_TASKS, HomeworkTask } from '../utils/sqlEngine';

interface SidebarProps {
  onSelectTable: (tableName: string) => void;
  onSelectHomeworkTask: (task: HomeworkTask) => void;
  onQuickRun: (sql: string) => void;
  currentSql: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectTable,
  onSelectHomeworkTask,
  onQuickRun,
}) => {
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({
    film: true,
    actor: true,
  });

  const toggleTable = (name: string) => {
    setExpandedTables(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const tables = Object.values(SAKILA_SCHEMA);

  return (
    <aside className="w-72 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full text-slate-300 shrink-0 select-none">
      {/* Schema Navigation Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Veritabanı Şeması
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          sakila
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Homework Tasks Direct Access */}
        <div>
          <div className="px-2.5 mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ödev Görevleri</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">3 Görev</span>
          </div>
          <div className="space-y-1">
            {HOMEWORK_TASKS.map((task, idx) => (
              <div
                key={task.id}
                onClick={() => onSelectHomeworkTask(task)}
                className="group p-2 rounded-md bg-slate-850/60 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    0{idx + 1}. {task.badge}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickRun(task.sql);
                    }}
                    title="Hızlıca Çalıştır"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-amber-500/20 text-amber-400 transition-opacity"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {task.targetTable} tablosu sorgusu
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tables & Columns Tree */}
        <div>
          <div className="px-2.5 mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Tablolar ({tables.length})</span>
            </span>
          </div>

          <div className="space-y-1">
            {tables.map(table => {
              const isExpanded = expandedTables[table.name];
              return (
                <div key={table.name} className="rounded-md overflow-hidden bg-slate-950/20 border border-slate-850">
                  <div
                    onClick={() => toggleTable(table.name)}
                    className="flex items-center justify-between p-2 hover:bg-slate-800/60 cursor-pointer text-xs font-medium text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <Table className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="font-mono truncate">{table.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                        {table.data.length}r
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickRun(`SELECT * FROM ${table.name} LIMIT 50;`);
                        }}
                        title={`SELECT * FROM ${table.name} LIMIT 50`}
                        className="p-1 rounded hover:bg-sky-500/20 text-sky-400 transition-colors"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Columns */}
                  {isExpanded && (
                    <div className="px-3 pb-2 pt-0.5 space-y-1 bg-slate-950/40 border-t border-slate-900/60 font-mono text-[11px]">
                      {table.columns.map(col => (
                        <div
                          key={col.name}
                          className="flex items-center justify-between text-slate-400 hover:text-slate-200 py-0.5"
                          title={`${col.comment || col.name} (${col.type})`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            {col.isPrimaryKey ? (
                              <Key className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                            ) : (
                              <span className="w-2.5 h-2.5 inline-block text-[8px] text-slate-600 shrink-0">·</span>
                            )}
                            <span className="truncate">{col.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {col.type.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Connection & Signature Info Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/70 text-[11px]">
        <div className="flex items-center justify-between text-slate-400">
          <span>Sunucu</span>
          <span className="font-mono text-slate-300">MySQL 8.0.36</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 mt-1">
          <span>İmza</span>
          <span className="font-semibold text-amber-300">Enes Öztürk</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 mt-1">
          <span>Collation</span>
          <span className="font-mono text-slate-400 text-[10px]">utf8mb4_general_ci</span>
        </div>
      </div>
    </aside>
  );
};
