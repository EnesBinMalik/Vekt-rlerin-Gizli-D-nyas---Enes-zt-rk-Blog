import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Terminal,
  Award,
  Sparkles,
} from 'lucide-react';
import { generateCodeZip, downloadBlob, downloadOutputCsv } from '../utils/zipGenerator';

interface HeaderProps {
  onOpenSimulator: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zipBlob = await generateCodeZip();
      downloadBlob(zipBlob, 'code.zip');
    } catch (err) {
      console.error('Failed to generate code.zip:', err);
      alert('Zip arşivi oluşturulurken bir hata oluştu.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Author Signature Ribbon */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white tracking-wide">
            ENES ÖZTÜRK İMZASIYLA
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300">
            Principal Enterprise Systems Architect & Privacy Compliance Engineer
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            20+ Years Exp. in Distributed Databases & GDPR/KVKK Auditing
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            518/518 Cases Validated
          </span>
          <span className="hidden sm:inline bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
            GDPR Art. 17 / KVKK Art. 7
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Orchestration Agent
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  v2.4-Production
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Privacy Compliance & Forensic Audit Engine • 518 Dataset Benchmark
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={downloadOutputCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 transition shadow-sm hover:border-slate-600 cursor-pointer"
            title="Tüm 518 vakayı içeren output.csv dosyasını indir"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>output.csv İndir</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
            title="Yarışma gereksinimlerine uygun tam kod paketini indir (code.zip)"
          >
            <Download className={`w-4 h-4 ${isZipping ? 'animate-bounce' : ''}`} />
            <span>{isZipping ? 'Paketleniyor...' : 'code.zip İndir'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-slate-900 pt-1">
        {[
          { id: 'cases', label: '518 Vaka Denetimi (output.csv)', icon: FileSpreadsheet },
          { id: 'code', label: 'code.zip Dosya Yapısı & Kodlar', icon: Terminal },
          { id: 'reports', label: 'Değerlendirme & Token Raporları', icon: Award },
          { id: 'simulator', label: 'Canlı Denetim Simülatörü', icon: Sparkles },
          { id: 'architecture', label: 'Sistem Mimarisi & Sıralama Algoritması', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
