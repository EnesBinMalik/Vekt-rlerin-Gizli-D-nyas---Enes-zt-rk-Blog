import React, { useState } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Lightbulb, 
  Code2, 
  ChevronDown, 
  ChevronUp, 
  Table, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { QueryScenario, executeQuery, ExecutionResult } from '../services/sqlEngine';
import { ResultsTable } from './ResultsTable';
import confetti from 'canvas-confetti';

interface ScenarioCardProps {
  scenario: QueryScenario;
  onOpenInPlayground: (sql: string) => void;
  isExpandedByDefault?: boolean;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onOpenInPlayground,
  isExpandedByDefault = false
}) => {
  const [copied, setCopied] = useState(false);
  const [activeQuery, setActiveQuery] = useState(scenario.sqlQuery);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(isExpandedByDefault);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunQuery = (sqlToRun: string = activeQuery) => {
    const res = executeQuery(sqlToRun);
    setResult(res);
    setShowResults(true);

    if (scenario.id === 4) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div
      id={`scenario-${scenario.id}`}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl overflow-hidden backdrop-blur transition-all duration-300 hover:border-slate-700/80"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-800/60 font-mono text-sm font-bold text-cyan-300 shadow">
            0{scenario.id}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                {scenario.badge}
              </span>
              <span className="text-slate-500">•</span>
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                <Table className="h-3 w-3 text-cyan-400" />
                {scenario.targetTable}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              {scenario.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRunQuery(activeQuery)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-md shadow-cyan-950 transition-transform active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Sorguyu Çalıştır</span>
          </button>

          <button
            onClick={() => onOpenInPlayground(activeQuery)}
            title="İnteraktif SQL Terminalinde Düzenle"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Editörde Aç</span>
          </button>
        </div>
      </div>

      {/* Problem statement */}
      <div className="px-5 py-3.5 bg-slate-950/40 border-b border-slate-800/50">
        <div className="flex items-start gap-2.5">
          <span className="text-cyan-400 font-mono text-xs font-bold pt-0.5">SORU:</span>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            "{scenario.scenarioText}"
          </p>
        </div>
      </div>

      {/* SQL Code Box */}
      <div className="p-5 space-y-4">
        <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm shadow-inner group">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>PostgreSQL SQL Sorgusu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCopy(activeQuery)}
                className="flex items-center gap-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700/60 px-2 py-1 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-slate-400" />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="text-slate-100 overflow-x-auto whitespace-pre-wrap leading-relaxed selection:bg-cyan-900/60 font-medium">
            {activeQuery}
          </pre>
        </div>

        {/* Alternative queries switch if present */}
        {scenario.alternativeSql && scenario.alternativeSql.length > 0 && (
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/30 p-3">
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>Alternatif SQL Yazımları ({scenario.alternativeSql.length})</span>
              </span>
              {showAlternatives ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {showAlternatives && (
              <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/60">
                {scenario.alternativeSql.map((alt, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs"
                  >
                    <code className="text-slate-200 font-mono overflow-x-auto">
                      {alt}
                    </code>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setActiveQuery(alt);
                          handleRunQuery(alt);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800/60 font-medium transition-colors"
                      >
                        Bunu Dene
                      </button>
                      <button
                        onClick={() => handleCopy(alt)}
                        className="text-slate-400 hover:text-slate-200 p-1"
                        title="Kopyala"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Logic breakdown and explanations */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span>Sorgu Mantığı & Adım Adım Açıklama</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {scenario.explanation.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold mt-0.5">›</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {scenario.importantNotes && (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-200 mt-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-amber-300">Dikkat Edilmesi Gereken Püf Nokta: </span>
                {scenario.importantNotes}
              </div>
            </div>
          )}
        </div>

        {/* Live Result Output */}
        {showResults && result && (
          <div className="space-y-2 pt-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300 font-mono">
                  Sorgu Sonucu ({result.rowCount} Satır Döndü)
                </span>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Gizle
              </button>
            </div>

            {result.success ? (
              <ResultsTable
                columns={result.columns}
                rows={result.rows}
                executionTimeMs={result.executionTimeMs}
                maxInitialRows={5}
                title={`${scenario.badge} Sonuçları`}
              />
            ) : (
              <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-300">
                <p className="font-semibold text-red-200">Sorgu Çalıştırma Hatası:</p>
                <p className="font-mono mt-1 text-red-400">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
