import React, { useState } from 'react';
import { UPDATE_OPERATIONS } from '../data/mockarooData';
import { Employee, SqlOperation } from '../types/database';
import { Play, Copy, Check, Info, RefreshCw, CheckCircle2 } from 'lucide-react';

interface UpdateOperationsProps {
  employees: Employee[];
  onExecuteSql: (sql: string) => void;
}

export const UpdateOperations: React.FC<UpdateOperationsProps> = ({
  employees,
  onExecuteSql
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [executedIds, setExecutedIds] = useState<Record<string, boolean>>({});

  const handleCopy = (op: SqlOperation) => {
    navigator.clipboard.writeText(op.sql);
    setCopiedId(op.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRun = (op: SqlOperation) => {
    onExecuteSql(op.sql);
    setExecutedIds(prev => ({ ...prev, [op.id]: true }));
  };

  const handleRunAll = () => {
    UPDATE_OPERATIONS.forEach(op => {
      onExecuteSql(op.sql);
      setExecutedIds(prev => ({ ...prev, [op.id]: true }));
    });
  };

  // Helper to find matching records currently in the table
  const getMatchingRecords = (op: SqlOperation) => {
    if (op.id === 'update-1') {
      return employees.filter(e => e.id === 1);
    }
    if (op.id === 'update-2') {
      return employees.filter(e => e.name.includes('Can Özkan'));
    }
    if (op.id === 'update-3') {
      return employees.filter(e => e.birthday === '1984-11-03' || e.name.includes('Mehmet Demir'));
    }
    if (op.id === 'update-4') {
      return employees.filter(e => e.email.includes('zeynep.aydin') || e.name.includes('Zeynep Aydın'));
    }
    if (op.id === 'update-5') {
      return employees.filter(e => e.id >= 8 && e.id <= 10);
    }
    return [];
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Sütunlara Göre Diğer Sütunları Güncelleyen 5 Adet UPDATE İşlemi
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Ödev gereksinimi: Sütunların her birine göre (id, name, birthday, email ve aralık filtreleri) diğer sütunları güncelleyecek 5 adet profesyonel SQL UPDATE işlemi hazırlanmıştır.
            </p>
          </div>

          <button
            onClick={handleRunAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Tüm 5 UPDATE Sorgusunu Çalıştır</span>
          </button>
        </div>
      </div>

      {/* Grid of 5 UPDATE Operations */}
      <div className="space-y-4">
        {UPDATE_OPERATIONS.map((op) => {
          const matching = getMatchingRecords(op);
          const isExecuted = executedIds[op.id];

          return (
            <div
              key={op.id}
              className="bg-slate-900/70 border border-slate-800 rounded-lg p-5 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                    {op.number}
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {op.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    [Kriter Sütun: {op.targetColumnLabel}]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(op)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded transition-colors"
                  >
                    {copiedId === op.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleRun(op)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Sorguyu Çalıştır</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div><strong>Açıklama:</strong> {op.description}</div>
                <div className="text-slate-400"><strong>Beklenen Etki:</strong> {op.expectedEffect}</div>
              </div>

              {/* SQL Code Block */}
              <div className="relative">
                <pre className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                  {op.sql}
                </pre>
              </div>

              {/* Live Status of Target Record in DB */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded p-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Veritabanındaki Güncel Durumu ({matching.length} Kayıt Bulundu):</span>
                  </span>
                  {isExecuted && (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Bu oturumda çalıştırıldı</span>
                    </span>
                  )}
                </div>

                {matching.length === 0 ? (
                  <div className="text-slate-500 italic py-1">
                    Bu kriterle eşleşen kayıt bulunamadı (silinmiş olabilir).
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800 pb-1">
                          <th className="py-1 px-2">id</th>
                          <th className="py-1 px-2">name</th>
                          <th className="py-1 px-2">birthday</th>
                          <th className="py-1 px-2">email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {matching.map(row => (
                          <tr key={row.id} className="text-slate-200">
                            <td className="py-1 px-2 text-cyan-400 font-semibold">#{row.id}</td>
                            <td className="py-1 px-2 font-sans">{row.name}</td>
                            <td className="py-1 px-2 text-slate-300">{row.birthday}</td>
                            <td className="py-1 px-2 text-slate-300">{row.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
