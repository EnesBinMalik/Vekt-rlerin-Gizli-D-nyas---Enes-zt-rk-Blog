/**
 * DVD Rental MySQL Query Solution Studio
 * Author / Hazırlayan: Enes Öztürk
 */

import React, { useState } from 'react';
import { SCENARIOS } from './data/scenariosData';
import { getDatabaseMetrics } from './utils/sqlEngine';
import { Header } from './components/Header';
import { ScenarioView } from './components/ScenarioView';
import { SqlPlayground } from './components/SqlPlayground';
import { SchemaModal } from './components/SchemaModal';
import { ExportModal } from './components/ExportModal';
import { Database, Film, Users, CreditCard, Award, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<number | 'console'>(1);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const metrics = getDatabaseMetrics();
  const currentScenario = typeof activeTab === 'number'
    ? SCENARIOS.find(s => s.id === activeTab) || SCENARIOS[0]
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenSchema={() => setIsSchemaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Author Signature & Context Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-semibold text-white">Hazırlayan:</span>
            <span className="text-cyan-400 font-bold text-sm">Enes Öztürk</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Veritabanı: dvdrental (MySQL 8.x)</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">SQL Subquery & Kümeleme Uygulaması</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span className="text-slate-500">Ort. Film:</span>
            <span className="text-cyan-300 font-semibold tabular-nums">{metrics.avgLength} dk</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Max Kira:</span>
            <span className="text-emerald-300 font-semibold tabular-nums">{metrics.maxRentalRate} $</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Min Kira:</span>
            <span className="text-amber-300 font-semibold tabular-nums">{metrics.minRentalRate} $</span>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
          {SCENARIOS.map(s => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="font-mono font-semibold mr-1.5 text-cyan-400">0{s.id}.</span>
                {s.title}
              </button>
            );
          })}

          <button
            onClick={() => setActiveTab('console')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'console'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="font-mono font-semibold mr-1.5 text-cyan-400">&gt;_</span>
            Serbest SQL Konsolu
          </button>
        </div>

        {/* Active Content Area */}
        {activeTab === 'console' ? (
          <SqlPlayground />
        ) : currentScenario ? (
          <ScenarioView scenario={currentScenario} />
        ) : null}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">DVD Rental MySQL Portfolyosu</span>
            <span>·</span>
            <span>Tüm sorgular MySQL 8.x / MariaDB üzerinde test edilmiştir.</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>İmza: <strong className="text-slate-200 font-semibold">Enes Öztürk</strong></span>
            <span>·</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              SQL Scriptini Görüntüle
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
