import React, { useState } from 'react';
import { Table, Key, FileCode, Check, Copy } from 'lucide-react';
import { SAKILA_SCHEMA, TableSchema } from '../data/sakilaData';

interface TableStructureModalProps {
  onQuickRun: (sql: string) => void;
}

export const TableStructureModal: React.FC<TableStructureModalProps> = ({ onQuickRun }) => {
  const [selectedTable, setSelectedTable] = useState<string>('film');
  const [copiedDdl, setCopiedDdl] = useState(false);

  const tables = Object.values(SAKILA_SCHEMA);
  const currentTable = SAKILA_SCHEMA[selectedTable] || SAKILA_SCHEMA.film;

  const generateDdl = (table: TableSchema): string => {
    const colLines = table.columns.map(c => {
      let line = `  \`${c.name}\` ${c.type}`;
      if (!c.nullable) line += ' NOT NULL';
      if (c.defaultValue) line += ` DEFAULT '${c.defaultValue}'`;
      if (c.comment) line += ` COMMENT '${c.comment}'`;
      return line;
    });

    const pk = table.columns.find(c => c.isPrimaryKey);
    if (pk) {
      colLines.push(`  PRIMARY KEY (\`${pk.name}\`)`);
    }

    return `CREATE TABLE \`${table.name}\` (\n${colLines.join(',\n')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;
  };

  const ddlString = generateDdl(currentTable);

  const handleCopyDdl = () => {
    navigator.clipboard.writeText(ddlString);
    setCopiedDdl(true);
    setTimeout(() => setCopiedDdl(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-1">
            <span>MySQL Sakila Şema Tanımları (DDL)</span>
            <span aria-hidden="true">·</span>
            <span>InnoDB Tablo Mimarisi</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Tablo Yapıları & Veri Tipleri
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sakila veritabanında yer alan tabloların sütun tipleri, indeksleri ve DDL kodları.
          </p>
        </div>

        {/* Table Selector Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto">
          {tables.map(t => (
            <button
              key={t.name}
              onClick={() => setSelectedTable(t.name)}
              className={`cursor-pointer px-4 py-2 rounded-md text-xs font-medium font-mono whitespace-nowrap transition-colors flex items-center gap-2 ${
                selectedTable === t.name
                  ? 'bg-sky-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{t.name}</span>
              <span className="text-[10px] opacity-75">({t.data.length} satır)</span>
            </button>
          ))}
        </div>

        {/* Table Column Detail Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-semibold text-white font-mono">
                {currentTable.name} Sütunları ({currentTable.columns.length})
              </h2>
            </div>
            <button
              onClick={() => onQuickRun(`SELECT * FROM ${currentTable.name} LIMIT 50;`)}
              className="cursor-pointer text-xs font-semibold text-sky-400 hover:text-sky-300 font-mono"
            >
              SELECT * FROM {currentTable.name} LIMIT 50 →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-xs font-mono">
              <thead className="bg-slate-950/60 text-slate-400 text-[11px]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Sütun Adı</th>
                  <th className="py-2.5 px-4 font-semibold">Veri Tipi</th>
                  <th className="py-2.5 px-4 font-semibold">Anahtar</th>
                  <th className="py-2.5 px-4 font-semibold">Boş Olabilir (NULL)</th>
                  <th className="py-2.5 px-4 font-semibold">Varsayılan Değer</th>
                  <th className="py-2.5 px-4 font-semibold">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60 text-[11px]">
                {currentTable.columns.map(col => (
                  <tr key={col.name} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-2 px-4 text-slate-200 font-bold">{col.name}</td>
                    <td className="py-2 px-4 text-sky-300">{col.type}</td>
                    <td className="py-2 px-4">
                      {col.isPrimaryKey ? (
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Key className="w-3 h-3" />
                          <span>PRI</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-slate-300">{col.nullable ? 'YES' : 'NO'}</td>
                    <td className="py-2 px-4 text-slate-400">{col.defaultValue || 'NULL'}</td>
                    <td className="py-2 px-4 text-slate-300 font-sans">{col.comment || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DDL Code Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold text-slate-200 font-mono">
                CREATE TABLE DDL Sözdizimi
              </h3>
            </div>
            <button
              onClick={handleCopyDdl}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-xs transition-colors"
            >
              {copiedDdl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>DDL Kopyala</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 font-mono text-xs text-sky-200 overflow-x-auto leading-relaxed">
            <code>{ddlString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
