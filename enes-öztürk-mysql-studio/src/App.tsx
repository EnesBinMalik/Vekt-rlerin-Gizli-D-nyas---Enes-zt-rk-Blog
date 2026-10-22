import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SqlEditor } from './components/SqlEditor';
import { ResultsTable } from './components/ResultsTable';
import { AssignmentShowcase } from './components/AssignmentShowcase';
import { LikePatternSimulator } from './components/LikePatternSimulator';
import { TableSchemaViewer } from './components/TableSchemaViewer';
import { SignatureFooter } from './components/SignatureFooter';
import { executeSqlQuery, SqlQueryResult } from './lib/sqlEngine';
import { SAKILA_ASSIGNMENTS } from './data/assignments';
import { Database, Play, CheckCircle2, Terminal, BookOpen, Layers, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assignments' | 'editor' | 'tables' | 'simulator'>('assignments');
  const [query, setQuery] = useState<string>(SAKILA_ASSIGNMENTS[0].recommendedSql);
  const [result, setResult] = useState<SqlQueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Run the current query
  const handleExecute = useCallback((sqlToRun?: string) => {
    const targetSql = sqlToRun || query;
    setIsExecuting(true);

    setTimeout(() => {
      const res = executeSqlQuery(targetSql);
      setResult(res);
      setIsExecuting(false);
    }, 40);
  }, [query]);

  // Initial execution of Task 1 on load
  useEffect(() => {
    handleExecute(SAKILA_ASSIGNMENTS[0].recommendedSql);
  }, [handleExecute]);

  // Load an assignment SQL into the editor and execute it immediately
  const handleLoadAndRun = (sql: string) => {
    setQuery(sql);
    handleExecute(sql);
    setActiveTab('editor');
    // Scroll to editor smoothly
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleQueryTable = (sql: string) => {
    setQuery(sql);
    handleExecute(sql);
    setActiveTab('editor');
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d15] text-slate-100 flex flex-col font-sans selection:bg-emerald-950 selection:text-emerald-200">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExecute={() => handleExecute()}
        isExecuting={isExecuting}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Kicker Banner */}
        <div className="bg-gradient-to-r from-[#0d1624] via-[#0e1726] to-[#0d1522] border border-slate-800/80 rounded-xl p-6 relative overflow-hidden">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Enes Öztürk İmzalı</span>
              <span>·</span>
              <span>Sakila DVD Rental Veritabanı</span>
              <span>·</span>
              <span className="text-slate-300 font-mono">MySQL 8.0 Engine</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Gelişmiş MySQL Veritabanı Sorgu Stüdyosu & Sakila Çözümleri
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Ödevinizde istenen 4 temel SQL sorgusunun (<code className="text-emerald-400 font-mono">A%a</code> kalıbı, <code className="text-emerald-400 font-mono">_____%n</code> ve 6 karakter kontrolü, <code className="text-emerald-400 font-mono">en az 4 &apos;T&apos; harfi</code> ve <code className="text-emerald-400 font-mono">C% AND length &gt; 90 AND rate = 2.99</code>) eksiksiz çözümleri, alternatif yazımları ve tarayıcı içi canlı SQL motoru.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/60 text-xs">
            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
              <div className="text-slate-500 text-[11px]">Ödev Görevleri</div>
              <div className="text-emerald-400 font-bold font-mono text-sm tabular-nums mt-0.5">
                4 / 4 Eksiksiz
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
              <div className="text-slate-500 text-[11px]">Country Tablosu</div>
              <div className="text-slate-200 font-bold font-mono text-sm tabular-nums mt-0.5">
                109 Ülke Kaydı
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
              <div className="text-slate-500 text-[11px]">Film Tablosu</div>
              <div className="text-slate-200 font-bold font-mono text-sm tabular-nums mt-0.5">
                Sakila Film Kataloğu
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
              <div className="text-slate-500 text-[11px]">SQL Sözdizimi</div>
              <div className="text-slate-200 font-bold font-mono text-sm tabular-nums mt-0.5">
                ANSI & MySQL Standardı
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Homework Shortcuts Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Ödev Soruları Hızlı Yürütme:</span>
            <span>Tıklandığında doğrudan SQL Stüdyosunda çalıştırılır</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SAKILA_ASSIGNMENTS.map((task) => (
              <button
                key={task.id}
                onClick={() => handleLoadAndRun(task.recommendedSql)}
                className="p-3 bg-[#0e1420] hover:bg-[#131b2a] border border-slate-800 hover:border-emerald-500/40 rounded-lg text-left transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-emerald-400 font-semibold">
                      Görev {task.orderNumber}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {task.targetTable}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {task.title}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-emerald-400">
                  <span>Çalıştır & İncele</span>
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Mode Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800/80 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'assignments'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Ödev Çözüm Rehberi & Detaylar</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>2. Canlı SQL Düzenleyici & Sonuçlar</span>
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tables'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Tablo Şemaları & DDL</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. LIKE & Joker Laboratuvarı</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <AssignmentShowcase onLoadAndRun={handleLoadAndRun} />

            {/* Always show the Results Grid below for immediate visibility */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Aktif Sorgu Sonuçları:</span>
                <span className="font-mono text-emerald-400">{result?.totalRows ?? 0} satır listelendi</span>
              </div>
              <ResultsTable result={result} />
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-6">
            <SqlEditor
              query={query}
              setQuery={setQuery}
              onExecute={() => handleExecute()}
              isExecuting={isExecuting}
            />

            <ResultsTable result={result} />
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="space-y-6">
            <TableSchemaViewer onQueryTable={handleQueryTable} />
            <ResultsTable result={result} />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <LikePatternSimulator />
          </div>
        )}
      </main>

      {/* Signature Footer */}
      <SignatureFooter />
    </div>
  );
}
