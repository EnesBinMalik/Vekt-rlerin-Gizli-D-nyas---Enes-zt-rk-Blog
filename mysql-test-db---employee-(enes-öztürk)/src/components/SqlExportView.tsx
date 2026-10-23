import React, { useState } from 'react';
import { generateFullSqlScript } from '../data/mockarooData';
import { Download, Copy, Check, FileCode, CheckCircle2, Award } from 'lucide-react';

interface SqlExportViewProps {
  onDownload: () => void;
}

export const SqlExportView: React.FC<SqlExportViewProps> = ({ onDownload }) => {
  const [copied, setCopied] = useState(false);
  const fullSql = generateFullSqlScript('Enes Öztürk');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Download Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">
                MySQL Komut Dosyası (enes_ozturk_employee.sql)
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              CREATE TABLE, 50 Mockaroo INSERT, 5 UPDATE ve 5 DELETE sorgularını içeren eksiksiz MySQL betiği.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Tümü Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SQL'i Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.sql Olarak İndir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Author & Verification Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-semibold flex items-center gap-1.5">
              <span>Hazırlayan & İmzacı: Enes Öztürk</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-slate-400 text-2xs mt-0.5">
              Patika / SQL Ödevi: employee tablosu, Mockaroo 50 veri, 5 UPDATE & 5 DELETE işlemleri
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-2xs sm:text-right">
          <div>
            <div>Veritabanı: <span className="text-slate-200">test</span></div>
            <div>Tablo: <span className="text-slate-200">employee</span></div>
          </div>
          <div>
            <div>Sütun: <span className="text-slate-200">4 adet</span></div>
            <div>Mockaroo: <span className="text-slate-200">50 satır</span></div>
          </div>
        </div>
      </div>

      {/* Script Preview Box */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">enes_ozturk_employee_db.sql</span>
          <span>{fullSql.split('\n').length} satır</span>
        </div>
        <div className="p-4 bg-slate-950/90 max-h-[600px] overflow-y-auto">
          <pre className="font-mono text-xs text-cyan-300 leading-relaxed whitespace-pre overflow-x-auto">
            {fullSql}
          </pre>
        </div>
      </div>
    </div>
  );
};
