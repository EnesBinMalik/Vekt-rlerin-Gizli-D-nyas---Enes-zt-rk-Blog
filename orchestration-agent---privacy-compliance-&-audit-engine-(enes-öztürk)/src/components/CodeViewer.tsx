import React, { useState } from 'react';
import {
  Folder,
  FileCode,
  FileText,
  Copy,
  Check,
  Download,
  FolderOpen,
  Terminal,
} from 'lucide-react';
import { CODE_FILES, CodeFile } from '../data/codeFiles';
import { generateCodeZip, downloadBlob } from '../utils/zipGenerator';

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(CODE_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const blob = await generateCodeZip();
      downloadBlob(blob, 'code.zip');
    } catch (e) {
      console.error(e);
      alert('Zip indirme başarısız oldu.');
    } finally {
      setIsZipping(false);
    }
  };

  const lines = selectedFile.content.split('\n');

  return (
    <div className="space-y-4">
      {/* Top Banner explaining code.zip structure */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            1. Sistem Mimarisi ve Çözüm Yaklaşımı (code.zip Yapısı)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Yarışma gereksinimlerini karşılamak için modüler, Pydantic & Pandas uyumlu, Enes Öztürk imzalı mimari.
          </p>
        </div>
        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isZipping ? 'Oluşturuluyor...' : 'code.zip Arşivini İndir'}</span>
        </button>
      </div>

      {/* Code Editor Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-xl min-h-[580px]">
        {/* Left Explorer Tree */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-800 bg-slate-950/90 p-3 flex flex-col">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1 mb-2 border-b border-slate-800/80 flex items-center justify-between">
            <span>Dizin Ağacı</span>
            <span className="text-[10px] text-cyan-400">code.zip</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {/* Root folder */}
            <div className="flex items-center gap-1.5 px-2 py-1 text-slate-300 font-semibold">
              <FolderOpen className="w-4 h-4 text-yellow-500" />
              <span>orchestration_agent/</span>
            </div>

            {/* Direct files in orchestration_agent */}
            <div className="pl-4 space-y-0.5">
              {CODE_FILES.filter((f) => !f.path.includes('/evaluation/')).map((file) => {
                const isSelected = selectedFile.name === file.name;
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {file.name.endsWith('.py') ? (
                      <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}

              {/* Subfolder: evaluation/ */}
              <div className="pt-1.5">
                <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-medium">
                  <Folder className="w-3.5 h-3.5 text-yellow-600" />
                  <span>evaluation/</span>
                </div>
                <div className="pl-4 space-y-0.5">
                  {CODE_FILES.filter((f) => f.path.includes('/evaluation/')).map((file) => {
                    const isSelected = selectedFile.name === file.name;
                    return (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        <span className="truncate">{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Module Description */}
          <div className="mt-auto pt-4 border-t border-slate-900 text-[11px] text-slate-400">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">
              Modül Açıklaması:
            </span>
            <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-slate-300">
              {selectedFile.description}
            </p>
          </div>
        </div>

        {/* Right Code Content Pane */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-slate-950">
          {/* File Header Bar */}
          <div className="px-4 py-2.5 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-cyan-400 font-bold">{selectedFile.path}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{lines.length} satır</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>

          {/* Line Numbers and Code */}
          <div className="p-4 overflow-x-auto overflow-y-auto max-h-[640px] font-mono text-[11.5px] leading-relaxed flex">
            <div className="select-none pr-4 text-slate-600 text-right font-mono min-w-[32px] border-r border-slate-800/80 mr-4">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="text-slate-200 whitespace-pre">
              {selectedFile.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
