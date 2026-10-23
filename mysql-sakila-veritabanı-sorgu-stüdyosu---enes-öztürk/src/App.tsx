import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { QueryEditor } from './components/QueryEditor';
import { ResultsTable } from './components/ResultsTable';
import { QueryExplanationCard } from './components/QueryExplanationCard';
import { TableExplorer } from './components/TableExplorer';
import { ReportModal } from './components/ReportModal';
import { ASSIGNMENT_PRESETS, AUTHOR_INFO, TABLES } from './data/sakilaDatabase';
import { executeSqlQuery, formatSqlScript } from './utils/sqlEngine';
import { QueryExecutionResult } from './types/database';
import { Award, Terminal, Database, Sparkles, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('query-1');
  const [selectedTable, setSelectedTable] = useState<string>('film');
  const [sqlQuery, setSqlQuery] = useState<string>(ASSIGNMENT_PRESETS[0].sqlQuery);
  const [queryResult, setQueryResult] = useState<QueryExecutionResult>(() =>
    executeSqlQuery(ASSIGNMENT_PRESETS[0].sqlQuery)
  );
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Sync editor SQL when activeView preset changes
  useEffect(() => {
    const preset = ASSIGNMENT_PRESETS.find((p) => p.id === activeView);
    if (preset) {
      setSqlQuery(preset.sqlQuery);
      setQueryResult(executeSqlQuery(preset.sqlQuery));
    }
  }, [activeView]);

  const currentPreset = ASSIGNMENT_PRESETS.find((p) => p.id === activeView);

  const handleExecute = () => {
    const res = executeSqlQuery(sqlQuery);
    setQueryResult(res);
  };

  const handleReset = () => {
    if (currentPreset) {
      setSqlQuery(currentPreset.sqlQuery);
      setQueryResult(executeSqlQuery(currentPreset.sqlQuery));
    }
  };

  const handleDownloadAllSql = () => {
    const allQueriesSql = ASSIGNMENT_PRESETS.map((p, idx) => {
      return `-- =========================================================
-- ${idx + 1}. SORU: ${p.title}
-- SORU METNİ: ${p.userPrompt}
-- =========================================================
${p.sqlQuery}

${p.mysqlAlternative ? `-- MySQL Alternatif Sözdizimi:\n-- ${p.mysqlAlternative}\n` : ''}`;
    }).join('\n\n');

    const fullScript = formatSqlScript(
      'Film ve Customer Tabloları Sorgu Çözümleri',
      allQueriesSql,
      AUTHOR_INFO.signatureText
    );

    const blob = new Blob([fullScript], { type: 'text/sql;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enes_ozturk_sakila_mysql_cozumleri.sql';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col font-sans">
      {/* Top Bar */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenReport={() => setIsReportOpen(true)}
        onDownloadAllSql={handleDownloadAllSql}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />

        {/* Central Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Breadcrumb & Task Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#30363d]">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Database className="w-3.5 h-3.5 text-[#00758F]" />
              <span>sakila</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-white font-semibold">
                {activeView === 'tables'
                  ? `tablo_gezgini.${selectedTable}`
                  : currentPreset
                  ? currentPreset.title
                  : 'ozel_sorgu.sql'}
              </span>
            </div>

            {/* Quick Segmented Task Selector */}
            <div className="flex items-center gap-1 p-1 bg-[#161b22] rounded-lg border border-[#30363d]">
              {ASSIGNMENT_PRESETS.map((p) => {
                const isActive = activeView === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveView(p.id)}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#21262d] text-[#38bdf8] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.assignmentNumber}. Soru
                  </button>
                );
              })}
              <button
                onClick={() => setActiveView('tables')}
                className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeView === 'tables'
                    ? 'bg-[#21262d] text-[#38bdf8] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tablo Gezgini
              </button>
            </div>
          </div>

          {/* View: Assignment Presets (Questions 1, 2, 3) */}
          {activeView !== 'tables' && (
            <div className="space-y-6">
              {/* Query Editor Box */}
              <QueryEditor
                currentPreset={currentPreset}
                sqlQuery={sqlQuery}
                setSqlQuery={setSqlQuery}
                onExecute={handleExecute}
                onReset={handleReset}
              />

              {/* Execution Results Grid */}
              <ResultsTable
                result={queryResult}
                targetTableName={currentPreset?.explanation.targetTable || 'film'}
              />

              {/* Step-by-Step SQL Analysis & Explanation */}
              {currentPreset && <QueryExplanationCard preset={currentPreset} />}
            </div>
          )}

          {/* View: Table Explorer (Raw film & customer tables) */}
          {activeView === 'tables' && (
            <TableExplorer
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          )}

          {/* Enes Öztürk Signature Watermark Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">
                  {AUTHOR_INFO.signatureText}
                </div>
                <div className="text-[11px] text-slate-400">
                  {AUTHOR_INFO.title} · {AUTHOR_INFO.course}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setIsReportOpen(true)}
                className="text-[#38bdf8] hover:underline font-mono text-[11px]"
              >
                Tüm Çözüm Raporunu Görüntüle →
              </button>
              <button
                onClick={handleDownloadAllSql}
                className="text-slate-400 hover:text-white font-mono text-[11px]"
              >
                .SQL Dosyasını İndir
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Homework Report Modal */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}
