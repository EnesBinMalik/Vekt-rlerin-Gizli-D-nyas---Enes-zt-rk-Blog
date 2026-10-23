import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, Award, FileCode, CheckCircle2 } from 'lucide-react';
import { ASSIGNMENT_PRESETS, AUTHOR_INFO } from '../data/sakilaDatabase';
import { executeSqlQuery, formatSqlScript } from '../utils/sqlEngine';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const allQueriesSql = ASSIGNMENT_PRESETS.map((p, idx) => {
    return `-- =========================================================
-- ${idx + 1}. SORU: ${p.title}
-- SORU METNİ: ${p.userPrompt}
-- =========================================================
${p.sqlQuery}

${p.mysqlAlternative ? `-- MySQL Alternatif Sözdizimi:\n-- ${p.mysqlAlternative}\n` : ''}`;
  }).join('\n\n');

  const fullScript = formatSqlScript(
    'Film ve Customer Tabloları Sorgu Çözümleri (3 Soru)',
    allQueriesSql,
    AUTHOR_INFO.signatureText
  );

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullScript], { type: 'text/sql;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enes_ozturk_sakila_mysql_cozumleri.sql';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-[#1a222e] border-b border-[#30363d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00758F]/20 border border-[#00758F]/50 flex items-center justify-center text-[#38bdf8]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                MySQL Sakila Ödev & Çözüm Raporu
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {AUTHOR_INFO.signatureText} · {AUTHOR_INFO.databaseName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Tüm SQL\'i Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#00758F] hover:bg-[#008ca8] rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.SQL İndir</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#21262d] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Signature Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#121d2b] to-[#161b22] border border-[#00758F]/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white tracking-wide">
                  {AUTHOR_INFO.name} İmzalı MySQL Raporu
                </div>
                <div className="text-xs text-slate-400">
                  Sakila Veritabanı (film & customer tabloları) filtreleme ve sayfalama çözümleri
                </div>
              </div>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-md">
              3/3 Soru Tamamlandı & Doğrulandı
            </div>
          </div>

          {/* Questions Breakdown */}
          <div className="space-y-6">
            {ASSIGNMENT_PRESETS.map((preset, idx) => {
              const res = executeSqlQuery(preset.sqlQuery);
              return (
                <div
                  key={preset.id}
                  className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#38bdf8] text-slate-900 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {preset.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
                      {preset.keyTakeaway}
                    </span>
                  </div>

                  {/* Prompt */}
                  <div className="text-xs text-slate-300 bg-[#161b22] p-3 rounded-lg border border-[#30363d]">
                    <span className="font-semibold text-slate-400 block mb-1">Verilen Soru:</span>
                    "{preset.userPrompt}"
                  </div>

                  {/* SQL Code Block */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 mb-1 block">
                      MySQL Çözüm Sorgusu:
                    </span>
                    <pre className="p-3 bg-[#161b22] rounded-lg border border-[#30363d] font-mono text-xs text-[#a5d6ff] overflow-x-auto leading-relaxed">
                      <code>{preset.sqlQuery}</code>
                    </pre>
                    {preset.mysqlAlternative && (
                      <p className="mt-1.5 text-[11px] font-mono text-amber-300/90">
                        MySQL Alternatifi: <code className="bg-[#161b22] px-1.5 py-0.5 rounded border border-amber-900/60">{preset.mysqlAlternative}</code>
                      </p>
                    )}
                  </div>

                  {/* Output Preview */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 mb-1.5 block">
                      Dönen Sonuçlar ({res.rows.length} satır):
                    </span>
                    <div className="overflow-x-auto border border-[#30363d] rounded-lg">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#161b22] text-slate-400 border-b border-[#30363d]">
                          <tr>
                            <th className="py-2 px-3 w-8 text-center text-[10px]">#</th>
                            {res.columns.slice(0, 5).map((c) => (
                              <th key={c} className="py-2 px-3 font-semibold text-[11px] text-slate-300">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#21262d]">
                          {res.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#161b22]">
                              <td className="py-1.5 px-3 text-center text-slate-400 text-[10px]">
                                {rIdx + 1}
                              </td>
                              {res.columns.slice(0, 5).map((c) => (
                                <td key={c} className="py-1.5 px-3 whitespace-nowrap">
                                  {c === 'length' ? (
                                    <span className="text-amber-300 font-bold">{r[c]} dk</span>
                                  ) : c === 'title' ? (
                                    <span className="text-white font-semibold">{r[c]}</span>
                                  ) : c === 'store_id' ? (
                                    <span className="text-emerald-400 font-bold">{r[c]}</span>
                                  ) : (
                                    String(r[c] ?? '')
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Explanation summary */}
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    <strong className="text-slate-300 font-medium">Açıklama:</strong> {preset.explanation.overview}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#1a222e] border-t border-[#30363d] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{AUTHOR_INFO.signatureText}</span>
          <span>MySQL 8.4 LTS · Sakila Sample DB</span>
        </div>
      </div>
    </div>
  );
};
