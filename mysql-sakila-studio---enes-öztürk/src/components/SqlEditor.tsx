import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Sparkles, Code2, HelpCircle } from 'lucide-react';
import { HOMEWORK_TASKS, HomeworkTask } from '../utils/sqlEngine';

export interface EditorTab {
  id: string;
  name: string;
  sql: string;
}

interface SqlEditorProps {
  currentSql: string;
  onChangeSql: (sql: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
  onSelectHomeworkTask: (task: HomeworkTask) => void;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  currentSql,
  onChangeSql,
  onExecute,
  isExecuting,
  onSelectHomeworkTask,
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Line numbers calculation
  const linesCount = Math.max(1, currentSql.split('\n').length);
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  // Handle Tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + '  ' + val.substring(end);
      onChangeSql(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatSql = () => {
    const formatted = formatQuery(currentSql);
    onChangeSql(formatted);
  };

  const formatQuery = (raw: string): string => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'BETWEEN', 'IN', 'NOT',
      'ORDER BY', 'GROUP BY', 'LIMIT', 'OFFSET', 'ASC', 'DESC',
      'AS', 'LIKE', 'SHOW TABLES', 'DESCRIBE', 'EXPLAIN'
    ];

    let formatted = raw;
    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(reg, kw);
    });

    return formatted;
  };

  return (
    <div className="flex flex-col bg-slate-950 border-b border-slate-800 shrink-0">
      {/* Editor Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onExecute}
            disabled={isExecuting}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold rounded transition-colors disabled:opacity-50"
            title="Sorguyu Çalıştır (Ctrl+Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Çalıştır (Ctrl + Enter)</span>
          </button>

          <button
            onClick={handleFormatSql}
            className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 transition-colors"
            title="SQL Anahtar Kelimelerini Büyük Harfe Dönüştür & Düzenle"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Formatla</span>
          </button>

          <button
            onClick={() => onChangeSql('')}
            className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 transition-colors"
            title="Editörü Temizle"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Temizle</span>
          </button>
        </div>

        {/* Quick Homework Selector Dropdown & Copy */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400">Hızlı Yükle:</span>
            {HOMEWORK_TASKS.map((t, index) => (
              <button
                key={t.id}
                onClick={() => onSelectHomeworkTask(t)}
                className="cursor-pointer px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-[11px] font-mono text-amber-300/90 hover:text-amber-200 transition-colors"
                title={t.title}
              >
                Ödev {index + 1}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            onClick={handleCopy}
            className="cursor-pointer flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 transition-colors text-[11px]"
            title="SQL Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex min-h-[140px] max-h-[220px] font-mono text-xs overflow-hidden relative">
        {/* Line Numbers Gutter */}
        <div className="w-12 bg-slate-900/60 text-slate-400 select-none py-2.5 text-right pr-3 border-r border-slate-800/80 shrink-0 font-mono text-[11px] leading-5">
          {lineNumbers.map(n => (
            <div key={n}>{n}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={currentSql}
          onChange={(e) => onChangeSql(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="-- MySQL sorgunuzu buraya yazın veya yukarıdaki 'Ödev 1 / 2 / 3' butonlarına tıklayın&#10;SELECT * FROM film WHERE replacement_cost BETWEEN 12.99 AND 16.99;"
          className="flex-1 bg-transparent text-slate-100 p-2.5 outline-none resize-none font-mono text-xs leading-5 selection:bg-sky-500/30 overflow-y-auto"
        />
      </div>
    </div>
  );
};
