import React, { useState } from 'react';
import { ScenarioDefinition, QueryDialect } from '../types/database';
import { Play, Copy, Check, Terminal, Info, Code2, Sparkles } from 'lucide-react';

interface SqlWorkspaceProps {
  scenario: ScenarioDefinition;
  dialect: QueryDialect;
  onDialectChange: (dialect: QueryDialect) => void;
  onRunQuery: (sql: string) => void;
  isLoading?: boolean;
}

export const SqlWorkspace: React.FC<SqlWorkspaceProps> = ({
  scenario,
  dialect,
  onDialectChange,
  onRunQuery,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);
  const activeSql = dialect === 'mysql_8_native' ? scenario.mysql8Sql : scenario.mysqlClassicSql;
  const [customSql, setCustomSql] = useState(activeSql);
  const [isEditing, setIsEditing] = useState(false);

  // Update customSql when scenario or dialect changes and not manually editing
  React.useEffect(() => {
    setCustomSql(dialect === 'mysql_8_native' ? scenario.mysql8Sql : scenario.mysqlClassicSql);
    setIsEditing(false);
  }, [scenario, dialect]);

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? customSql : activeSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    onRunQuery(isEditing ? customSql : activeSql);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            MySQL Sorgu Editörü & Kod Alanı
          </h3>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            · dvdrental veritabanı
          </span>
        </div>

        {/* Dialect Toggle Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden md:inline">MySQL Sözdizimi:</span>
          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => onDialectChange('mysql_8_native')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dialect === 'mysql_8_native'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MySQL 8.0.31+ (Yerel)
            </button>
            <button
              onClick={() => onDialectChange('mysql_classic')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dialect === 'mysql_classic'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MySQL Klasik (JOIN / CTE)
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Actions Bar */}
      <div className="relative group bg-slate-950">
        {/* Floating Top Right Buttons */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors border border-slate-700/60 cursor-pointer flex items-center gap-1.5"
            title="Sorguyu düzenle veya kendi SQL sorgunu yaz"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Varsayılana Dön' : 'Düzenle'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors border border-slate-700/60 cursor-pointer flex items-center gap-1.5"
            title="SQL kodunu panoya kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="px-3.5 py-1 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            title="Sorguyu çalıştır (dvdrental verileri üzerinde)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isLoading ? 'Çalışıyor...' : 'Çalıştır'}</span>
          </button>
        </div>

        {/* Code Block / Textarea */}
        {isEditing ? (
          <textarea
            value={customSql}
            onChange={(e) => setCustomSql(e.target.value)}
            className="w-full h-44 p-4 font-mono text-xs text-amber-200 bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-y leading-relaxed"
            placeholder="Kendi SQL sorgunuzu buraya yazabilirsiniz..."
            spellCheck={false}
          />
        ) : (
          <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 min-h-36">
            {activeSql.split('\n').map((line, idx) => {
              const isComment = line.trim().startsWith('--');
              return (
                <div key={idx} className="flex">
                  <span className="w-8 shrink-0 select-none text-slate-600 text-right pr-4 tabular-nums">
                    {idx + 1}
                  </span>
                  <span className={isComment ? 'text-slate-500 italic' : 'text-slate-200'}>
                    {renderSyntaxHighlight(line)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Explanation & Theory Accordion */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs">
            <h4 className="font-semibold text-slate-200">
              Sorgu Mantığı ve Çalışma Prensibi:
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {scenario.explanation}
            </p>
          </div>
        </div>

        {/* Quick Theory Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
          {scenario.theoryNotes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0 mt-1.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple syntax highlighting helper for SQL keywords
function renderSyntaxHighlight(line: string) {
  if (line.trim().startsWith('--')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  const keywords = [
    'SELECT', 'FROM', 'UNION', 'ALL', 'INTERSECT', 'EXCEPT', 'ORDER', 'BY',
    'ASC', 'DESC', 'DISTINCT', 'INNER', 'LEFT', 'JOIN', 'ON', 'WHERE', 'IS',
    'NULL', 'NOT', 'IN', 'WITH', 'AS', 'ROW_NUMBER', 'OVER', 'PARTITION'
  ];

  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = line.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const upper = part.toUpperCase();
        if (keywords.includes(upper)) {
          return (
            <span key={i} className="text-amber-400 font-semibold">
              {part}
            </span>
          );
        }
        if (['actor', 'customer', 'actor_ranked', 'customer_ranked'].includes(part.toLowerCase())) {
          return (
            <span key={i} className="text-sky-300">
              {part}
            </span>
          );
        }
        if (['first_name', 'actor_id', 'customer_id', 'rn'].includes(part.toLowerCase())) {
          return (
            <span key={i} className="text-emerald-300">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
