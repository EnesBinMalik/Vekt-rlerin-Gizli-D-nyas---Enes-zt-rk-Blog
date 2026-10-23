/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScenarioCard } from './components/ScenarioCard';
import { SchemaViewer } from './components/SchemaViewer';
import { InteractivePlayground } from './components/InteractivePlayground';
import { TheorySection } from './components/TheorySection';
import { FullScriptModal } from './components/FullScriptModal';
import { SQL_SCENARIOS } from './data/scenarios';
import {
  executeScenario1LeftJoin,
  executeScenario2RightJoin,
  executeScenario3FullJoin,
} from './utils/sqlExecutor';
import { CheckCircle, Database, FileText, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'schema' | 'playground' | 'theory'>('scenarios');
  const [isFullScriptModalOpen, setIsFullScriptModalOpen] = useState(false);

  // Results state
  const [res1, setRes1] = useState(executeScenario1LeftJoin());
  const [res2, setRes2] = useState(executeScenario2RightJoin());
  const [res3, setRes3] = useState(executeScenario3FullJoin());

  const handleReExecute = (scenarioId: string) => {
    if (scenarioId === 'scenario-1') {
      setRes1(executeScenario1LeftJoin());
    } else if (scenarioId === 'scenario-2') {
      setRes2(executeScenario2RightJoin());
    } else if (scenarioId === 'scenario-3') {
      setRes3(executeScenario3FullJoin());
    }
  };

  const getResultForScenario = (id: string) => {
    switch (id) {
      case 'scenario-1':
        return res1;
      case 'scenario-2':
        return res2;
      case 'scenario-3':
        return res3;
      default:
        return res1;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Header with Navigation and Author Signature */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFullScript={() => setIsFullScriptModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner with User Brief Highlights */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                PostgreSQL dvdrental Sorgu Ödevi & Portföyü
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                dvdrental Örnek Veritabanı JOIN Senaryoları
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bu platformda, PostgreSQL’in popüler <strong>dvdrental</strong> veritabanı üzerindeki 
                3 temel sorgu senaryosu (<strong>LEFT JOIN</strong>, <strong>RIGHT JOIN</strong> ve <strong>FULL JOIN</strong>) 
                sözdizimleri, Venn şemaları, çalışan canlı sorguları ve açıklamaları ile hazırlanmıştır.
              </p>
            </div>

            {/* Author Card Stamp */}
            <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-xl flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-sky-400/30">
                EÖ
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Geliştirici & İmza
                </div>
                <div className="text-lg font-bold text-white">
                  Enes Öztürk
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Doğrulanmış SQL Çözümleri
                </div>
              </div>
            </div>
          </div>

          {/* Quick Scenario Pills */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">1. city & country</div>
                <div className="text-[11px] text-sky-400 font-mono">LEFT JOIN (Şehir + Ülke)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">2. customer & payment</div>
                <div className="text-[11px] text-emerald-400 font-mono">RIGHT JOIN (payment_id)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">3. customer & rental</div>
                <div className="text-[11px] text-purple-400 font-mono">FULL JOIN (rental_id)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: 3 Scenarios */}
        {activeTab === 'scenarios' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-sky-400" />
                  İstenen 3 SQL Senaryosu
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Her sorgu senaryosunu inceleyebilir, çalıştırabilir, Venn diyagramını görebilir ve SQL kodunu kopyalayabilirsiniz.
                </p>
              </div>

              <button
                onClick={() => setIsFullScriptModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-850 text-sky-300 border border-sky-500/40 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tek Dosyada Görüntüle</span>
              </button>
            </div>

            <div className="space-y-6">
              {SQL_SCENARIOS.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  scenarioIndex={index}
                  result={getResultForScenario(scenario.id)}
                  onReExecute={() => handleReExecute(scenario.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Playground */}
        {activeTab === 'playground' && <InteractivePlayground />}

        {/* Tab 3: Database Schemas */}
        {activeTab === 'schema' && <SchemaViewer />}

        {/* Tab 4: Theory & Comparative Guide */}
        {activeTab === 'theory' && <TheorySection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-sky-400" />
            <span>PostgreSQL dvdrental SQL JOIN Çalışması</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-semibold">Enes Öztürk</span>
          </div>

          <div className="text-[11px] text-slate-500">
            city LEFT JOIN country • customer RIGHT JOIN payment • customer FULL JOIN rental
          </div>
        </div>
      </footer>

      {/* Full Script Modal */}
      <FullScriptModal
        isOpen={isFullScriptModalOpen}
        onClose={() => setIsFullScriptModalOpen(false)}
      />
    </div>
  );
}
