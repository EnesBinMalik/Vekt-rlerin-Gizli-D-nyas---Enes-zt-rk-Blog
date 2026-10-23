import React, { useState } from 'react';
import { SqlScenario } from '../types/sql';
import { VennDiagram } from './VennDiagram';
import { SqlCodeViewer } from './SqlCodeViewer';
import { ResultTable } from './ResultTable';
import { ExecutedResult } from '../utils/sqlExecutor';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Code2, Info, Lightbulb, Play } from 'lucide-react';

interface ScenarioCardProps {
  scenario: SqlScenario;
  scenarioIndex: number;
  result: ExecutedResult;
  onReExecute: () => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  scenarioIndex,
  result,
  onReExecute,
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'results' | 'explanation'>('sql');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      onReExecute();
      setActiveTab('results');
      setIsExecuting(false);
    }, 180);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'LEFT JOIN':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'RIGHT JOIN':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'FULL JOIN':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
      {/* Card Header */}
      <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center font-mono font-bold text-base flex-shrink-0">
            {scenarioIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeColor(scenario.joinType)}`}>
                {scenario.joinType}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {scenario.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {scenario.description}
            </p>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow transition cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : 'fill-current'}`} />
            {isExecuting ? 'Yürütülüyor...' : 'Sorguyu Çalıştır'}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Daralt / Genişlet"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top Info Bar: Tables, Keys, and Quick Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Visual Venn Diagram */}
            <div className="lg:col-span-5">
              <VennDiagram
                joinType={scenario.joinType}
                leftTableName={scenario.leftTable}
                rightTableName={scenario.rightTable}
              />
            </div>

            {/* Quick Relationship Details */}
            <div className="lg:col-span-7 bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs text-slate-400 font-medium">İlişki Detayları</span>
                <span className="text-[11px] font-mono text-sky-400">
                  {scenario.leftTable} ↔ {scenario.rightTable}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px]">Sol Tablo (Left):</div>
                  <div className="font-mono font-semibold text-slate-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    {scenario.leftTable}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 text-[11px]">Sağ Tablo (Right):</div>
                  <div className="font-mono font-semibold text-slate-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {scenario.rightTable}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="text-slate-500 text-[11px]">Bağlantı Şartı (ON Koşulu):</div>
                  <code className="text-xs font-mono text-amber-300 bg-slate-900 px-2 py-1 rounded block mt-0.5 border border-slate-800">
                    ON {scenario.onCondition}
                  </code>
                </div>

                <div className="sm:col-span-2">
                  <div className="text-slate-500 text-[11px]">Seçilen Sütunlar:</div>
                  <code className="text-xs font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded block mt-0.5 border border-slate-800">
                    SELECT {scenario.selectFields}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: SQL Code vs Live Results vs Explanation */}
          <div className="border-b border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'sql'
                  ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              SQL Sorgusu & İmza
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'results'
                  ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-4 h-4" />
              Canlı Sonuçlar ({result.totalCount})
            </button>

            <button
              onClick={() => setActiveTab('explanation')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'explanation'
                  ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Detaylı Açıklama & Mantık
            </button>
          </div>

          {/* Tab Content 1: SQL Code */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <SqlCodeViewer
                code={scenario.sqlQuery}
                scenarioTitle={scenario.title}
                onExecute={handleExecute}
                isExecuting={isExecuting}
              />
            </div>
          )}

          {/* Tab Content 2: Results Table */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              <ResultTable result={result} title={scenario.title} />
            </div>
          )}

          {/* Tab Content 3: Explanation */}
          {activeTab === 'explanation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                  <Info className="w-4 h-4" />
                  Bu Sorgunun Amacı ve Özeti
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scenario.explanation.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Neden {scenario.joinType} Kullanıldı?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scenario.explanation.whyThisJoin}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  NULL Değerlerin Ortaya Çıkışı
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scenario.explanation.nullBehavior}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Code2 className="w-4 h-4" />
                  PostgreSQL Pratiği & Gerçek Hayat
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scenario.explanation.practicalUse}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
