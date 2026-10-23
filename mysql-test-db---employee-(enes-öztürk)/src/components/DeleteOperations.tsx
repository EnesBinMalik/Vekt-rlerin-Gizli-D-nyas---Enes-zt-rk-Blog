import React, { useState } from 'react';
import { DELETE_OPERATIONS } from '../data/mockarooData';
import { Employee, SqlOperation } from '../types/database';
import { Trash2, Copy, Check, AlertTriangle, ShieldCheck, Play } from 'lucide-react';

interface DeleteOperationsProps {
  employees: Employee[];
  onExecuteSql: (sql: string) => void;
}

export const DeleteOperations: React.FC<DeleteOperationsProps> = ({
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
    DELETE_OPERATIONS.forEach(op => {
      onExecuteSql(op.sql);
      setExecutedIds(prev => ({ ...prev, [op.id]: true }));
    });
  };

  const getTargetCandidates = (op: SqlOperation) => {
    if (op.id === 'delete-1') {
      return employees.filter(e => e.id === 15);
    }
    if (op.id === 'delete-2') {
      return employees.filter(e => e.name === 'Barış Aksoy');
    }
    if (op.id === 'delete-3') {
      return employees.filter(e => e.birthday === '1973-08-16');
    }
    if (op.id === 'delete-4') {
      return employees.filter(e => e.email === 'gokhan.cetin@tempmail.com');
    }
    if (op.id === 'delete-5') {
      return employees.filter(e => e.email.includes('tempmail.com') || e.id === 48);
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
              Sütunların Her Birine Göre Satır Silen 5 Adet DELETE İşlemi
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Ödev gereksinimi: Sütunların her birine göre (id, name, birthday, email ve koşullu filtre) ilgili satırları tablodan silecek 5 adet hassas MySQL DELETE işlemi hazırlanmıştır.
            </p>
          </div>

          <button
            onClick={handleRunAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tüm 5 DELETE Sorgusunu Çalıştır</span>
          </button>
        </div>
      </div>

      {/* Grid of 5 DELETE Operations */}
      <div className="space-y-4">
        {DELETE_OPERATIONS.map((op) => {
          const candidates = getTargetCandidates(op);
          const isExecuted = executedIds[op.id] || candidates.length === 0;

          return (
            <div
              key={op.id}
              className="bg-slate-900/70 border border-slate-800 rounded-lg p-5 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold flex items-center justify-center">
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
                    disabled={candidates.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Satırı Sil (DELETE)</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div><strong>Açıklama:</strong> {op.description}</div>
                <div className="text-slate-400"><strong>Beklenen Etki:</strong> {op.expectedEffect}</div>
              </div>

              {/* SQL Code Block */}
              <div className="relative">
                <pre className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto leading-relaxed">
                  {op.sql}
                </pre>
              </div>

              {/* Live Target Status */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded p-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    {candidates.length > 0 ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hedef Satırlar Tabloda Mevcut ({candidates.length} Satır Silinebilir):</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Hedef Satır Zaten Tablodan Silinmiş (0 Kayıt):</span>
                      </>
                    )}
                  </span>
                </div>

                {candidates.length === 0 ? (
                  <div className="text-emerald-400/80 italic py-1 font-mono text-xs">
                    Bu sorgunun hedeflediği kayıtlar veritabanında bulunmuyor (silme işlemi başarıyla tamamlanmış veya kayıt yok).
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
                        {candidates.map(row => (
                          <tr key={row.id} className="text-slate-300 bg-rose-500/5">
                            <td className="py-1 px-2 text-rose-400 font-semibold">#{row.id}</td>
                            <td className="py-1 px-2 font-sans">{row.name}</td>
                            <td className="py-1 px-2 text-slate-400">{row.birthday}</td>
                            <td className="py-1 px-2 text-slate-400">{row.email}</td>
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
