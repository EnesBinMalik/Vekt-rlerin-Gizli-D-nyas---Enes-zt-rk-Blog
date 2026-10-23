import React, { useState } from 'react';
import { Play, Sparkles, BookOpen, Layers, CheckCircle2, Lightbulb, Code2 } from 'lucide-react';
import { ScenarioItem } from '../data/scenariosData';
import { SqlHighlighter } from './SqlHighlighter';
import { QueryResultsTable } from './QueryResultsTable';
import { QueryResult, executeScenarioQuery } from '../utils/sqlEngine';

interface ScenarioViewProps {
  scenario: ScenarioItem;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({ scenario }) => {
  const [activeCodeVariant, setActiveCodeVariant] = useState<'primary' | 'alternative'>('primary');
  const [result, setResult] = useState<QueryResult | null>(() => executeScenarioQuery(scenario.id));
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executeScenarioQuery(scenario.id);
      setResult(res);
      setIsRunning(false);
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Question Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono font-medium">
            <span>{scenario.badge}</span>
            <span className="text-slate-600">·</span>
            <span>MySQL 8.x</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">dvdrental</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>İmza:</span>
            <span className="text-slate-200 font-semibold">{scenario.authorSignature}</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-balance">
          {scenario.title}
        </h2>

        {/* Exact Question Prompt */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-3">
          <div className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <BookOpen className="w-3 h-3" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Senaryo Sorusu:
            </div>
            <p className="text-sm font-medium text-slate-100 mt-1 leading-relaxed">
              "{scenario.question}"
            </p>
          </div>
        </div>
      </div>

      {/* Code Editor & Execution Panel */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCodeVariant('primary')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  activeCodeVariant === 'primary'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Standart MySQL Çözümü
              </button>
              {scenario.alternativeQuery && (
                <button
                  onClick={() => setActiveCodeVariant('alternative')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeCodeVariant === 'alternative'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Alternatif Yaklaşım
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>İlgili Tablolar:</span>
            {scenario.relevantTables.map(t => (
              <span key={t} className="font-mono text-amber-300 font-medium">
                `{t}`
              </span>
            ))}
          </div>
        </div>

        <SqlHighlighter
          code={activeCodeVariant === 'primary' ? scenario.sqlQuery : scenario.alternativeQuery || scenario.sqlQuery}
          onRun={handleRun}
          isRunning={isRunning}
          title={`${scenario.badge} - MySQL Sözdizimi`}
        />
      </div>

      {/* Step-by-Step Logic & Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {scenario.explanationSteps.map((step, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                {step.step}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
            {step.codeSnippet && (
              <div className="mt-3 p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-cyan-300/90 border border-slate-800/80 overflow-x-auto">
                <code>{step.codeSnippet}</code>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Execution Results View */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>Çalıştırma Sonuçları</span>
            <span className="text-xs font-normal text-slate-400">(dvdrental Örneklem Verisi Üzerinde)</span>
          </h3>
          <button
            onClick={handleRun}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
          >
            Yeniden Çalıştır ↻
          </button>
        </div>
        <QueryResultsTable result={result} scenarioTitle={scenario.title} />
      </div>

      {/* Technical Notes & Optimization Tips */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>MySQL Önemli Notları & Best Practices</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {scenario.mysqlNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            <span className="font-semibold text-cyan-300">İndeks & Performans Önerisi: </span>
            <span className="font-mono text-slate-300">{scenario.performanceTips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
