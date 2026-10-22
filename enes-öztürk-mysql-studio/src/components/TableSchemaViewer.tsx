import React, { useState } from 'react';
import { DATABASE_TABLES_META } from '../data/sakilaData';
import { Database, Key, Play, Code, Copy, Check } from 'lucide-react';

interface TableSchemaViewerProps {
  onQueryTable: (sql: string) => void;
}

export const TableSchemaViewer: React.FC<TableSchemaViewerProps> = ({ onQueryTable }) => {
  const [selectedTableName, setSelectedTableName] = useState<string>('country');
  const [showDdl, setShowDdl] = useState<boolean>(false);
  const [copiedDdl, setCopiedDdl] = useState<boolean>(false);

  const currentMeta = DATABASE_TABLES_META[selectedTableName] || DATABASE_TABLES_META.country;

  const handleCopyDdl = () => {
    navigator.clipboard.writeText(currentMeta.ddl);
    setCopiedDdl(true);
    setTimeout(() => setCopiedDdl(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 bg-[#0e1420] border border-slate-800/80 rounded-lg p-5">
      {/* Table Selection Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          {Object.keys(DATABASE_TABLES_META).map((tbl) => {
            const meta = DATABASE_TABLES_META[tbl];
            const isSelected = tbl === selectedTableName;
            return (
              <button
                key={tbl}
                onClick={() => {
                  setSelectedTableName(tbl);
                  setShowDdl(false);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>{tbl}</span>
                <span className="text-[10px] text-slate-500 font-sans tabular-nums">
                  ({meta.rowCount})
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDdl(!showDdl)}
            className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded border border-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Code className="w-3 h-3 text-amber-400" />
            <span>{showDdl ? 'Sütunları Göster' : 'CREATE TABLE DDL Göster'}</span>
          </button>

          <button
            onClick={() => onQueryTable(`SELECT * FROM ${selectedTableName} LIMIT 25;`)}
            className="px-3 py-1 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-all flex items-center gap-1 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Tabloyu Sorgula</span>
          </button>
        </div>
      </div>

      {/* Table Metadata Header */}
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-slate-200 font-mono">
            {currentMeta.name}
          </h3>
          <span className="text-xs text-slate-400">
            Toplam {currentMeta.rowCount} kayıt · {currentMeta.columns.length} sütun
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {currentMeta.description}
        </p>
      </div>

      {/* DDL or Columns Table */}
      {showDdl ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">MySQL DDL Şema Tanımı:</span>
            <button
              onClick={handleCopyDdl}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedDdl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedDdl ? 'Kopyalandı' : 'DDL Kopyala'}</span>
            </button>
          </div>
          <pre className="p-4 bg-[#080d15] border border-slate-800 rounded font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
            {currentMeta.ddl}
          </pre>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#121927] border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Sütun Adı</th>
                <th className="py-2.5 px-3">Veri Tipi</th>
                <th className="py-2.5 px-3">Anahtar / Kısıt</th>
                <th className="py-2.5 px-3">Null?</th>
                <th className="py-2.5 px-3">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {currentMeta.columns.map((col, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-2 px-3 font-mono font-semibold text-slate-200">
                    <div className="flex items-center gap-1.5">
                      {col.isPrimary && <Key className="w-3 h-3 text-amber-400 shrink-0" />}
                      <span>{col.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 font-mono text-emerald-400">
                    {col.type}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-400">
                    {col.isPrimary ? (
                      <span className="text-amber-400 font-semibold">PRIMARY KEY</span>
                    ) : col.isForeign ? (
                      <span className="text-blue-400">FK → {col.foreignRef}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-400">
                    {col.nullable ? 'YES' : 'NO'}
                  </td>
                  <td className="py-2 px-3 text-slate-400">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
