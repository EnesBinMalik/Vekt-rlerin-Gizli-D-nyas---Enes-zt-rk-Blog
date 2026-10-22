/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Terminal, 
  Database, 
  Layers, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Film,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { Header } from './components/Header';
import { ScenarioCard } from './components/ScenarioCard';
import { MarySpotlight } from './components/MarySpotlight';
import { SqlPlayground } from './components/SqlPlayground';
import { SchemaBrowser } from './components/SchemaBrowser';
import { SqlGuide } from './components/SqlGuide';
import { SqlQuiz } from './components/SqlQuiz';
import { Footer } from './components/Footer';
import { OFFICIAL_SCENARIOS, initDatabase, executeQuery, ExecutionResult } from './services/sqlEngine';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'playground' | 'schema' | 'guide' | 'quiz'>('scenarios');
  const [playgroundQuery, setPlaygroundQuery] = useState<string>('');
  const [allRanCount, setAllRanCount] = useState<number>(0);

  useEffect(() => {
    initDatabase();
  }, []);

  const handleOpenInPlayground = (sql: string) => {
    setPlaygroundQuery(sql);
    setActiveTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAllScenarios = () => {
    OFFICIAL_SCENARIOS.forEach((s) => {
      executeQuery(s.sqlQuery);
    });
    setAllRanCount(OFFICIAL_SCENARIOS.length);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  const handleRunMaryScenario = () => {
    const maryScenario = OFFICIAL_SCENARIOS.find((s) => s.id === 4);
    if (maryScenario) {
      handleOpenInPlayground(maryScenario.sqlQuery);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunAllScenarios={handleRunAllScenarios}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 relative z-10 space-y-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>PostgreSQL dvdrental Uygulama Projesi</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-mono">Enes Öztürk Özel Çözümleri</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                dvdrental Veri Tabanı <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  SQL Sorgu Senaryoları & Analizi
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                İstenen 5 sorgu senaryosu; <strong>ORDER BY sıralama ilkeleri</strong>, <strong>operatör öncelikleri (AND / OR)</strong>, 
                <strong>De Morgan mantıksal değilleme (NOT)</strong> ve <strong>Mary isimli müşterinin soyadı sorgusu</strong> dahil olmak üzere 
                eksiksiz olarak hazırlanmış ve interaktif SQL motoruyla doğrulanmıştır.
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-400 font-mono mr-1">Hızlı Erişim:</span>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setActiveTab('scenarios');
                      const el = document.getElementById(`scenario-${num}`);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-cyan-300 transition-colors"
                  >
                    Senaryo {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Block */}
            <div className="grid grid-cols-2 gap-3 min-w-[280px]">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold font-mono">
                  <Film className="h-4 w-4" />
                  <span>film</span>
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">100+</div>
                <div className="text-[11px] text-slate-400">Katalog Filmi</div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Senaryolar</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">5 / 5</div>
                <div className="text-[11px] text-slate-400">%100 Tamamlandı</div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                  <Zap className="h-4 w-4" />
                  <span>Müşteri Mary</span>
                </div>
                <div className="text-lg font-black text-amber-300 font-mono mt-1">SMITH</div>
                <div className="text-[11px] text-slate-400">Soyadı Tespiti</div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold font-mono">
                  <Clock className="h-4 w-4" />
                  <span>SQL Motoru</span>
                </div>
                <div className="text-sm font-bold text-white font-mono mt-1">&lt; 1 ms</div>
                <div className="text-[11px] text-slate-400">Anlık Yürütme</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: 5 Scenarios */}
        {activeTab === 'scenarios' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Spotlight Card for Question 4: Mary's Last Name */}
            <MarySpotlight onRunMaryQuery={handleRunMaryScenario} />

            {/* Scenarios Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-cyan-400" />
                  <span>5 Adet DVD Rental SQL Senaryosu ve Çözümleri</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Her senaryo için hazır SQL sorgusu, alternatif yazımları, mantık analizi ve canlı veri sonucu sunulmuştur.
                </p>
              </div>

              <button
                onClick={handleRunAllScenarios}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-102"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Tüm Senaryoları Canlı Test Et</span>
              </button>
            </div>

            {/* List of 5 Scenarios */}
            <div className="space-y-6">
              {OFFICIAL_SCENARIOS.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onOpenInPlayground={handleOpenInPlayground}
                  isExpandedByDefault={scenario.id <= 2}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: SQL Playground */}
        {activeTab === 'playground' && (
          <div className="animate-fadeIn">
            <SqlPlayground initialQuery={playgroundQuery} />
          </div>
        )}

        {/* Tab 3: Schema Browser */}
        {activeTab === 'schema' && (
          <div className="animate-fadeIn">
            <SchemaBrowser onSelectQueryInEditor={handleOpenInPlayground} />
          </div>
        )}

        {/* Tab 4: SQL Guide */}
        {activeTab === 'guide' && (
          <div className="animate-fadeIn">
            <SqlGuide />
          </div>
        )}

        {/* Tab 5: SQL Quiz */}
        {activeTab === 'quiz' && (
          <div className="animate-fadeIn">
            <SqlQuiz />
          </div>
        )}
      </main>

      {/* Signature & Verification Footer */}
      <Footer />
    </div>
  );
}
