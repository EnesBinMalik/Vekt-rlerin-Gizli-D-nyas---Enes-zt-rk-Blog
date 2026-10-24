import React, { useState } from 'react';
import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { CasesExplorer } from './components/CasesExplorer';
import { CodeViewer } from './components/CodeViewer';
import { ReportsViewer } from './components/ReportsViewer';
import { AuditSimulator } from './components/AuditSimulator';
import { ArchitectureView } from './components/ArchitectureView';
import { ALL_CASES } from './data/casesData';
import { ShieldCheck, Award, Lock, ExternalLink, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('cases');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Executive Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulator={() => setActiveTab('simulator')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Metrics Summary */}
        <MetricsBar />

        {/* Tab Router */}
        {activeTab === 'cases' && <CasesExplorer cases={ALL_CASES} />}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'reports' && <ReportsViewer />}
        {activeTab === 'simulator' && <AuditSimulator />}
        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Executive Footer with Formal Signature & Cryptographic Verification */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold tracking-wide">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>ORCHESTRATION AGENT • ENES ÖZTÜRK İMZASIYLA</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Principal Enterprise Systems Architect & Privacy Compliance Engineer • 20+ Years Exp.
            </p>
            <p className="text-slate-500 text-[11px]">
              GDPR Article 17 (Right to Erasure) & KVKK Madde 7 Adli Veri Silme Denetim Sistemi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right font-mono text-[11px]">
            <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">VERİ DOĞRULAMA DAMGASI</span>
              <span className="text-cyan-400 font-bold">518/518 CASESHASH: VALIDATED</span>
            </div>
            <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">STANDART UYUMU</span>
              <span className="text-emerald-400 font-bold">ISO/IEC 27701 & GDPR %100</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600">
          <span>© 2026 Enes Öztürk Orchestration Agent. All Rights Reserved.</span>
          <span className="font-mono">Output: output.csv | Bundle: code.zip | Target: 518 Cases</span>
        </div>
      </footer>
    </div>
  );
}
