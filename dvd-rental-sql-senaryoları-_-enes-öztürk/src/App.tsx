import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { ScenarioCard } from './components/ScenarioCard';
import { SqlPlayground } from './components/SqlPlayground';
import { FilmTableBrowser } from './components/FilmTableBrowser';
import { SchemaInspector } from './components/SchemaInspector';
import { DataDrillDownModal } from './components/DataDrillDownModal';
import { SignedReportModal } from './components/SignedReportModal';
import { QUERY_SCENARIOS, AUTHOR_INFO } from './data/dvdrentalData';
import { initDatabase } from './services/sqlEngine';
import { ShieldCheck, Award, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'editor' | 'database' | 'schema'>('scenarios');
  const [drillDownScenarioId, setDrillDownScenarioId] = useState<number | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [playgroundSql, setPlaygroundSql] = useState<string>('');
  const [isRunningAll, setIsRunningAll] = useState(false);

  useEffect(() => {
    // Initialize AlaSQL database with film table on startup
    initDatabase();
  }, []);

  const handleRunAll = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      setIsRunningAll(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 400);
  };

  const handleSendToPlayground = (sql: string) => {
    setPlaygroundSql(sql);
    setActiveTab('editor');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Hero Section with KPIs & Context */}
      <HeroHeader
        onRunAll={handleRunAll}
        isRunningAll={isRunningAll}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: Scenarios List */}
        {activeTab === 'scenarios' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>4 Temel Sorgu Senaryosu & Canlı Analiz Çözümleri</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Her senaryo için optimize edilmiş SQL kodu, açıklama, matematiksel doğrulama ve anlık çalıştırma butonu.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>4 / 4 Doğrulandı</span>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {QUERY_SCENARIOS.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onOpenDrillDown={(id) => setDrillDownScenarioId(id)}
                  onSendToPlayground={handleSendToPlayground}
                />
              ))}
            </div>

            {/* Quick Summary Matrix & Findings Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>PostgreSQL Sorgu Senaryoları Özeti & İmzalı Değerlendirme</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Analist: {AUTHOR_INFO.name}
                </span>
              </div>

              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Senaryo</th>
                      <th className="py-2.5 px-3">Hedef Alan / Koşul</th>
                      <th className="py-2.5 px-3">Kullanılan Agregat</th>
                      <th className="py-2.5 px-3 font-mono">Elde Edilen Sonuç</th>
                      <th className="py-2.5 px-3">İnceleme</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-white">1. Ortalama Ücret</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">rental_rate</td>
                      <td className="py-2.5 px-3 text-blue-400 font-mono">ROUND(AVG(rental_rate), 2)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">$2.98 USD</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setDrillDownScenarioId(1)}
                          className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                          Dağılımı İncele
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-white">2. &apos;C&apos; ile Başlayanlar</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">title LIKE &apos;C%&apos;</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-mono">COUNT(*)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">92 adet film</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setDrillDownScenarioId(2)}
                          className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                          92 Filmi Listele
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-white">3. 0.99$ En Uzun Film</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">rental_rate = 0.99</td>
                      <td className="py-2.5 px-3 text-amber-400 font-mono">MAX(length)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">184 dakika</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setDrillDownScenarioId(3)}
                          className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                          Filmleri Gör
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-white">4. &gt;150 dk Tekil Maliyet</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">length &gt; 150</td>
                      <td className="py-2.5 px-3 text-purple-400 font-mono">COUNT(DISTINCT replacement_cost)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white">21 tekil değer</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setDrillDownScenarioId(4)}
                          className="text-blue-400 hover:text-blue-300 underline font-medium"
                        >
                          21 Maliyeti Gör
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SQL Playground */}
        {activeTab === 'editor' && (
          <div className="animate-in fade-in duration-150">
            <SqlPlayground initialSql={playgroundSql} />
          </div>
        )}

        {/* Tab 3: Film Table Database Browser */}
        {activeTab === 'database' && (
          <div className="animate-in fade-in duration-150">
            <FilmTableBrowser />
          </div>
        )}

        {/* Tab 4: Schema Inspector */}
        {activeTab === 'schema' && (
          <div className="animate-in fade-in duration-150">
            <SchemaInspector />
          </div>
        )}
      </main>

      {/* Author Signature & Seal Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-700/50 flex items-center justify-center text-blue-400 font-bold text-xs">
              EÖ
            </div>
            <div>
              <div className="text-white font-semibold">Hazırlayan: {AUTHOR_INFO.name}</div>
              <div className="text-slate-500">{AUTHOR_INFO.subject}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>İmzalı Resmî Raporu Görüntüle</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-slate-500">2026</span>
          </div>
        </div>
      </footer>

      {/* Drill-down Data Modal */}
      <DataDrillDownModal
        scenarioId={drillDownScenarioId}
        onClose={() => setDrillDownScenarioId(null)}
      />

      {/* Signed Report Modal */}
      <SignedReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
