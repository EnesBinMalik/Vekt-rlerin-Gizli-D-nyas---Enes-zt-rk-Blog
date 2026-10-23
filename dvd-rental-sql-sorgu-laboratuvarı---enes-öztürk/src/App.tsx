/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { ScenarioSelector } from './components/ScenarioSelector';
import { SqlWorkspace } from './components/SqlWorkspace';
import { ResultsViewer } from './components/ResultsViewer';
import { VennVisualizer } from './components/VennVisualizer';
import { DatabaseModal } from './components/DatabaseModal';
import { AssignmentReportModal } from './components/AssignmentReportModal';
import { MysqlTheorySection } from './components/MysqlTheorySection';
import { SCENARIOS } from './data/scenarios';
import { executeScenario, executeCustomSql, computeSetStats } from './utils/sqlEngine';
import { QueryDialect, ExecutionResult } from './types/database';
import { Award, Database, CheckCircle2, FileText, ChevronRight, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);
  const [dialect, setDialect] = useState<QueryDialect>('mysql_8_native');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('scenarios');
  const [isLoading, setIsLoading] = useState(false);

  const stats = useMemo(() => computeSetStats(), []);

  const currentScenario = useMemo(() => {
    return SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];
  }, [selectedScenarioId]);

  // Current execution result
  const [executionResult, setExecutionResult] = useState<ExecutionResult>(() => {
    return executeScenario(1, 'mysql_8_native');
  });

  const vennRef = useRef<HTMLDivElement>(null);
  const scenariosRef = useRef<HTMLDivElement>(null);
  const theoryRef = useRef<HTMLDivElement>(null);

  const handleSelectScenario = (id: number) => {
    setSelectedScenarioId(id);
    setIsLoading(true);
    setTimeout(() => {
      const res = executeScenario(id, dialect);
      setExecutionResult(res);
      setIsLoading(false);
    }, 50);
  };

  const handleDialectChange = (newDialect: QueryDialect) => {
    setDialect(newDialect);
    const res = executeScenario(selectedScenarioId, newDialect);
    setExecutionResult(res);
  };

  const handleRunQuery = (sql: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const res = executeCustomSql(sql);
      setExecutionResult(res);
      setIsLoading(false);
    }, 80);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'venn' && vennRef.current) {
      vennRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'scenarios' && scenariosRef.current) {
      scenariosRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'theory' && theoryRef.current) {
      theoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top 3-Zone Navigation Header */}
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenDatabase={() => setIsDatabaseModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Author Signature & Assignment Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Database className="w-4 h-4 text-amber-400" />
                <span>dvdrental Örnek Veri Tabanı Küme Senaryoları</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">MySQL 8.0+ Dialect</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                actor & customer first_name Sorgu Çözümleri
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                Bu laboratuvarda <code className="text-amber-300 font-mono">actor</code> (200 satır) ve{' '}
                <code className="text-sky-300 font-mono">customer</code> (599 satır) tablolarındaki{' '}
                <code className="text-emerald-300 font-mono">first_name</code> sütunları üzerinde{' '}
                <strong>UNION</strong>, <strong>INTERSECT</strong>, <strong>EXCEPT</strong> ve bunların{' '}
                <strong>tekrar eden veriler için olan ALL varyasyonları</strong> MySQL veritabanı motoru üzerinde çalıştırılmaktadır.
              </p>
            </div>

            {/* Author Verified Badge */}
            <div className="shrink-0 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 flex flex-col items-center sm:items-end text-center sm:text-right shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Hazırlayan & İmza</span>
              </div>
              <span className="text-lg font-bold text-slate-100 font-serif tracking-wide mt-0.5">
                Enes Öztürk
              </span>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                SQL Veri Tabanı Projesi
              </span>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="mt-3 cursor-pointer text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Ödev Raporunu Aç</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6 Scenario Cards Grid */}
        <div ref={scenariosRef} className="space-y-4">
          <ScenarioSelector
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={handleSelectScenario}
          />
        </div>

        {/* Two-Column Sandbox Split: Left (Sql Workspace), Right (Venn Visualizer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Column: SQL Editor & Execution (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SqlWorkspace
              scenario={currentScenario}
              dialect={dialect}
              onDialectChange={handleDialectChange}
              onRunQuery={handleRunQuery}
              isLoading={isLoading}
            />

            {/* Live Results Table */}
            <ResultsViewer result={executionResult} />
          </div>

          {/* Right Column: Venn Visualizer & Dataset Quick Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div ref={vennRef}>
              <VennVisualizer
                stats={stats}
                currentScenario={currentScenario}
                onSelectScenario={handleSelectScenario}
              />
            </div>

            {/* Quick Overview of the Authentic Data */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  En Çok Kesişen İsimler (Top Overlap)
                </h4>
                <button
                  onClick={() => setIsDatabaseModalOpen(true)}
                  className="text-xs text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-medium"
                >
                  <span>Tabloları Gör</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {stats.topOverlappingNames.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 font-mono"
                  >
                    <span className="font-semibold text-slate-200">
                      {idx + 1}. {item.name}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Actor: <strong className="text-amber-400">{item.actorCount}</strong> · Customer: <strong className="text-sky-400">{item.customerCount}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* In-depth Theory & MySQL Architecture Section */}
        <div ref={theoryRef}>
          <MysqlTheorySection />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>dvdrental Örnek Veri Tabanı SQL Sorgu Laboratuvarı</span>
            <span className="mx-2">·</span>
            <span>MySQL 8.0.31+ & ANSI SQL Uyumlu</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Hazırlayan & Kodlayan:</span>
            <strong className="text-amber-400 font-medium">Enes Öztürk</strong>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DatabaseModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
      />

      <AssignmentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
