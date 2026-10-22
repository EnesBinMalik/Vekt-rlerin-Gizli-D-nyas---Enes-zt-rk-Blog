import React, { useState } from 'react';
import { Play, Copy, Check, BookOpen, Sparkles, CheckCircle2, ChevronRight, Terminal, Info } from 'lucide-react';
import { HOMEWORK_TASKS, HomeworkTask } from '../utils/sqlEngine';

interface HomeworkPanelProps {
  onRunTask: (sql: string) => void;
  onOpenAboutModal: () => void;
}

export const HomeworkPanel: React.FC<HomeworkPanelProps> = ({ onRunTask, onOpenAboutModal }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8">
      {/* Title & Author Kicker */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
              <span>SQL Veritabanı Ödev & Uygulama Rehberi</span>
              <span aria-hidden="true">·</span>
              <span>Enes Öztürk İmzalı</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Sakila Veritabanı Sorgu Görevleri
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Aşağıda istenen 3 SQL görevinin MySQL 8.0 standartlarına uygun sorgu kodları,
              kavramsal açıklamaları ve tek tıkla canlı çalıştırma imkanı yer almaktadır.
            </p>
          </div>

          <button
            onClick={onOpenAboutModal}
            className="cursor-pointer self-start md:self-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>İmza & Proje Detayları</span>
          </button>
        </div>

        {/* The 3 Homework Cards */}
        <div className="space-y-6">
          {HOMEWORK_TASKS.map((task, index) => (
            <div
              key={task.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700/80 transition-all shadow-sm"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-800/80 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-sky-300">{task.targetTable} tablosu</span>
                    </div>
                    <h2 className="text-base font-semibold text-white mt-0.5">
                      {task.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(task.id, task.sql)}
                    className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition-colors"
                  >
                    {copiedId === task.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>SQL Kopyala</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onRunTask(task.sql)}
                    className="cursor-pointer flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Sorguyu Canlı Çalıştır</span>
                  </button>
                </div>
              </div>

              {/* Problem Question Box */}
              <div className="p-5 space-y-4">
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Soru Metni (Görev Tanımı)
                  </span>
                  <p className="text-sm font-medium text-slate-200">
                    "{task.question}"
                  </p>
                </div>

                {/* SQL Code Block */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-sky-400" />
                      <span>MySQL 8.0 Çözüm Sorgusu:</span>
                    </span>
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto leading-relaxed selection:bg-sky-500/30">
                    <code>{task.sql}</code>
                  </pre>
                </div>

                {/* Technical Explanation */}
                <div className="bg-slate-850/40 border border-slate-800/60 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Detaylı Açıklama & Mantık:</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {task.explanation}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {task.keyConcepts.map(kc => (
                      <span
                        key={kc}
                        className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature & Author Footer Banner */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-slate-200">
              MySQL Sakila Veritabanı ve SQL Ödev Projesi
            </div>
            <div>
              Özel tasarım, in-memory SQL motoru ve Sakila veritabanı ile hazırlanmıştır.
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-amber-300 bg-slate-950/80 px-3 py-1.5 rounded-md border border-amber-500/20">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Enes Öztürk İmzalı</span>
          </div>
        </div>
      </div>
    </div>
  );
};
