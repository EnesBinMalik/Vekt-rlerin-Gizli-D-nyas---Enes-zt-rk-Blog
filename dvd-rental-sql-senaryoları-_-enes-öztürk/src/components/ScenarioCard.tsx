import React, { useState } from 'react';
import { QueryScenario } from '../data/dvdrentalData';
import { QueryResult, executeQuery } from '../services/sqlEngine';
import { Play, Copy, Check, Info, Eye, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface ScenarioCardProps {
  scenario: QueryScenario;
  onOpenDrillDown: (scenarioId: number) => void;
  onSendToPlayground: (sql: string) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onOpenDrillDown,
  onSendToPlayground
}) => {
  const [copied, setCopied] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runQuery = () => {
    setIsRunning(true);
    // Execute query
    const activeSql = showAlternative ? scenario.alternativeSql : scenario.sqlQuery;
    setTimeout(() => {
      const res = executeQuery(activeSql);
      setResult(res);
      setIsRunning(false);
    }, 80);
  };

  // Run automatically on first mount if not yet run
  React.useEffect(() => {
    const res = executeQuery(scenario.sqlQuery);
    setResult(res);
  }, [scenario.sqlQuery]);

  const activeSql = showAlternative ? scenario.alternativeSql : scenario.sqlQuery;
  const singleValue = result && result.data.length > 0
    ? Object.values(result.data[0])[0]
    : scenario.expectedResult;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all hover:border-slate-700">
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/90">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-400">
          <span className="font-semibold text-blue-400">{scenario.title}</span>
          <span className="font-mono text-slate-500">film_id [1..1000]</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
          {scenario.scenarioQuestion}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-300 font-medium">Hedef Agregat:</span>
          {scenario.keyFunctions.map((fn, idx) => (
            <span key={idx} className="font-mono text-slate-300 bg-slate-800/70 px-2 py-0.5 rounded border border-slate-700/60">
              {fn}
            </span>
          ))}
        </div>
      </div>

      {/* SQL Code Block */}
      <div className="p-5 sm:p-6 bg-slate-950/70 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-4 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium text-slate-300">
              {showAlternative ? 'Alternatif PostgreSQL Sorgusu:' : 'Önerilen PostgreSQL SQL Sorgusu:'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAlternative(!showAlternative)}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
            >
              {showAlternative ? 'Önerilen Sorguya Dön' : 'Alternatif Yaklaşım'}
            </button>
            <button
              onClick={() => handleCopy(activeSql)}
              className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Sorguyu Kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="relative font-mono text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-lg p-3.5 text-slate-200 overflow-x-auto">
          <pre className="whitespace-pre">{activeSql}</pre>
        </div>

        {/* Action strip under code */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={runQuery}
              disabled={isRunning}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Çalıştırılıyor...' : 'Sorguyu Çalıştır'}</span>
            </button>

            <button
              onClick={() => onSendToPlayground(activeSql)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              SQL Editöründe Aç
            </button>
          </div>

          <button
            onClick={() => onOpenDrillDown(scenario.id)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detaylı Kayıtları Gör</span>
          </button>
        </div>
      </div>

      {/* Live Result Bar */}
      <div className="p-5 sm:p-6 bg-slate-900/60 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Sorgu Sonucu (Dönen Değer):</span>
              {result && (
                <span className="text-slate-500 font-mono text-[11px]">
                  {result.executionTimeMs} ms · 1 satır
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {singleValue !== undefined && singleValue !== null ? String(singleValue) : '—'}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {scenario.resultUnit}
              </span>
            </div>
          </div>

          {/* Quick status badge */}
          <div className="text-xs bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-lg text-slate-300 flex flex-col justify-center">
            <span className="text-slate-400 text-[11px]">Kolon / Alias</span>
            <span className="font-mono font-medium text-blue-300">{scenario.columnName}</span>
          </div>
        </div>
      </div>

      {/* Accordion: Explanation & Mathematical Logic */}
      <div className="px-5 sm:px-6 py-4 bg-slate-900">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors py-1"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Sorgu Mantığı & Matematiksel İnceleme</span>
          </span>
          {showDetails ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs text-slate-300">
            <p className="leading-relaxed">
              {scenario.explanation}
            </p>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-slate-200 mb-1">Matematiksel Doğrulama & Dağılım:</div>
              {scenario.mathBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300 font-mono text-[11px]">
                  <span className="text-blue-400 shrink-0">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="text-slate-400 italic bg-blue-950/20 border border-blue-900/30 p-2.5 rounded text-[11px]">
              <strong className="text-blue-300 not-italic font-semibold">SQL İpucu:</strong> {scenario.tips}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
