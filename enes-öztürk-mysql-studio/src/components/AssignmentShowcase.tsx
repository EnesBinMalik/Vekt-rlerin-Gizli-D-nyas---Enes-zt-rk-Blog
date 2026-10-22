import React, { useState } from 'react';
import { SAKILA_ASSIGNMENTS, AssignmentItem } from '../data/assignments';
import { Play, Check, Copy, Code2, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

interface AssignmentShowcaseProps {
  onLoadAndRun: (sql: string) => void;
}

export const AssignmentShowcase: React.FC<AssignmentShowcaseProps> = ({ onLoadAndRun }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-1');
  const [copiedSql, setCopiedSql] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'recommended' | 'alternatives' | 'breakdown' | 'examples'>('recommended');

  const currentTask: AssignmentItem = SAKILA_ASSIGNMENTS.find((t) => t.id === selectedTaskId) || SAKILA_ASSIGNMENTS[0];

  const handleCopy = (sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedSql(sql);
    setTimeout(() => setCopiedSql(null), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Task Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAKILA_ASSIGNMENTS.map((task) => {
          const isSelected = task.id === selectedTaskId;
          return (
            <button
              key={task.id}
              onClick={() => {
                setSelectedTaskId(task.id);
                setActiveSubTab('recommended');
              }}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-sm'
                  : 'bg-[#0e1420] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Görev {task.orderNumber}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {task.targetTable} tablosu
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                  {task.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {task.userQuestion}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  Detayları Gör <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Task Detailed Card */}
      <div className="bg-[#0e1420] border border-slate-800/80 rounded-lg p-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                Görev 0{currentTask.orderNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Tablo: <strong className="text-slate-200">{currentTask.targetTable}</strong>
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              {currentTask.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong className="text-slate-300">Soru:</strong> &ldquo;{currentTask.userQuestion}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(currentTask.recommendedSql)}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSql === currentTask.recommendedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SQL Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={() => onLoadAndRun(currentTask.recommendedSql)}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-all flex items-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Stüdyoda Çalıştır</span>
            </button>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1 pt-3 pb-3 border-b border-slate-800/60 text-xs">
          <button
            onClick={() => setActiveSubTab('recommended')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'recommended'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Önerilen SQL Çözümü</span>
          </button>

          <button
            onClick={() => setActiveSubTab('alternatives')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'alternatives'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Alternatif Çözümler ({currentTask.alternatives.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('breakdown')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'breakdown'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Mantıksal Çözümleme</span>
          </button>

          <button
            onClick={() => setActiveSubTab('examples')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'examples'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Eşleşen & Elenen Kayıtlar</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeSubTab === 'recommended' && (
            <div className="space-y-4">
              <div className="relative group">
                <pre className="p-4 bg-[#080d15] border border-slate-800 rounded font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
                  {currentTask.recommendedSql}
                </pre>
              </div>

              <div className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded text-xs space-y-2">
                <h5 className="font-semibold text-slate-200">Çözüm Mantığı:</h5>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                  {currentTask.explanation}
                </p>
              </div>

              {/* Wildcard reference strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                {currentTask.wildcardRules.map((rule, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900/40 border border-slate-800/60 rounded text-xs">
                    <div className="font-mono text-emerald-400 font-semibold mb-0.5">
                      {rule.symbol}
                    </div>
                    <div className="text-slate-300 text-[11px] mb-1 font-medium">
                      {rule.meaning}
                    </div>
                    <div className="text-slate-500 text-[10px]">
                      {rule.usageInQuery}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'alternatives' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                MySQL ve ilişkisel veritabanlarında aynı sonuca ulaşmanın birden çok profesyonel yöntemi vardır:
              </p>

              <div className="space-y-3">
                {currentTask.alternatives.map((alt, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">
                        {idx + 1}. {alt.title}
                      </span>
                      <button
                        onClick={() => onLoadAndRun(alt.sql)}
                        className="px-2.5 py-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-900/50 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Bunu Çalıştır</span>
                      </button>
                    </div>

                    <pre className="p-2.5 bg-[#080d15] border border-slate-800/80 rounded font-mono text-xs text-emerald-300/90 overflow-x-auto">
                      {alt.sql}
                    </pre>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {alt.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'breakdown' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded whitespace-pre-line text-slate-300">
                {currentTask.explanation}
              </div>

              <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded text-xs text-blue-200/90">
                <span className="font-semibold text-blue-300">İpucu / Best Practice: </span>
                LIKE sorgularında eğer kalıbın başında <code className="text-amber-300">&apos;%&apos;</code> karakteri bulunursa (örn: <code className="text-amber-300">&apos;%a&apos;</code>), veritabanı B-Tree indeksini tam olarak kullanamaz ve Full Table Scan yapar. Ancak <code className="text-amber-300">&apos;A%&apos;</code> gibi sabit bir önekle başladığında MySQL B-Tree Range Scan yaparak devasa tablolarda mikro-saniyeler mertebesinde sonuç döner.
              </div>
            </div>
          )}

          {activeSubTab === 'examples' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Positive matches */}
              <div className="p-4 bg-emerald-950/15 border border-emerald-500/20 rounded">
                <h5 className="text-xs font-semibold text-emerald-300 mb-2.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Koşulu Sağlayan Örnek Kayıtlar</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {currentTask.sampleMatches.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Counter-examples */}
              <div className="p-4 bg-red-950/15 border border-red-500/20 rounded">
                <h5 className="text-xs font-semibold text-red-300 mb-2.5">
                  Elenen / Eşleşmeyen Karşıt Örnekler
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                  {currentTask.counterExamples.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
