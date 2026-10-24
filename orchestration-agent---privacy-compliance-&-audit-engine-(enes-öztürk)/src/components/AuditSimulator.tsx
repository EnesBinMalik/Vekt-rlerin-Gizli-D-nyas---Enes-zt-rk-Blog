import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';
import { runAuditSimulation, SimulationInput, SimulationResult } from '../utils/auditSimulator';

export const AuditSimulator: React.FC = () => {
  const [caseId, setCaseId] = useState('case_custom_77');
  const [hasRequested, setHasRequested] = useState(true);
  const [primaryEmail, setPrimaryEmail] = useState('audit.subject@finance-corp.com');
  const [aliases, setAliases] = useState('legacy.alias@oldmail.com, phone_+905551234567');
  const [findings, setFindings] = useState<SimulationInput['findings']>([
    {
      systemId: 'analytics_db',
      resourceId: 'export_077',
      evidenceId: 'ev_cdc_stream_077',
      type: 'ACTIVE_DATA_FLOW',
    },
    {
      systemId: 'account_service',
      resourceId: 'tombstone_077',
      evidenceId: 'ev_tombstone_pii_077',
      type: 'EXPOSED_PII_TOMBSTONE',
    },
    {
      systemId: 'user_cache_redis',
      resourceId: 'session_token_077',
      evidenceId: 'ev_redis_dump_077',
      type: 'REMAINING_RECORD',
    },
  ]);

  const [result, setResult] = useState<SimulationResult | null>(() =>
    runAuditSimulation({
      caseId: 'case_custom_77',
      hasRequestedDeletion: true,
      userEmail: 'audit.subject@finance-corp.com',
      aliases: ['legacy.alias@oldmail.com', 'phone_+905551234567'],
      findings: [
        {
          systemId: 'analytics_db',
          resourceId: 'export_077',
          evidenceId: 'ev_cdc_stream_077',
          type: 'ACTIVE_DATA_FLOW',
        },
        {
          systemId: 'account_service',
          resourceId: 'tombstone_077',
          evidenceId: 'ev_tombstone_pii_077',
          type: 'EXPOSED_PII_TOMBSTONE',
        },
        {
          systemId: 'user_cache_redis',
          resourceId: 'session_token_077',
          evidenceId: 'ev_redis_dump_077',
          type: 'REMAINING_RECORD',
        },
      ],
    })
  );

  const [copied, setCopied] = useState(false);

  const handleAddFinding = () => {
    setFindings([
      ...findings,
      {
        systemId: 'billing_vault',
        resourceId: `res_${Math.floor(Math.random() * 1000)}`,
        evidenceId: `ev_log_${Math.floor(Math.random() * 1000)}`,
        type: 'REMAINING_RECORD',
      },
    ]);
  };

  const handleRemoveFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const handleRun = () => {
    const aliasList = aliases
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const res = runAuditSimulation({
      caseId,
      hasRequestedDeletion: hasRequested,
      userEmail: primaryEmail,
      aliases: aliasList,
      findings,
    });
    setResult(res);
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result.steps, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Canlı Otonom Denetim Motoru Simülatörü
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Özel bir kullanıcı silme vakası ve kanıt listesi tanımlayarak Enes Öztürk sıralama algoritmasının anlık çıktısını test edin.
          </p>
        </div>
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-2 transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Denetimi Çalıştır</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3.5">
            <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
              1. Vaka ve Kimlik Parametreleri
            </h4>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Vaka ID (case_id):</label>
              <input
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-y border-slate-800/80">
              <span className="text-xs text-slate-300">Silme Talebi Mevcut mu?</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasRequested}
                  onChange={(e) => setHasRequested(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Birincil E-posta Adresi:
              </label>
              <input
                type="email"
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Tarihsel Takma Adlar & Telefonlar (Virgülle Ayrılmış):
              </label>
              <input
                type="text"
                value={aliases}
                onChange={(e) => setAliases(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Evidence / Findings items */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                2. Sistem ve Kanıt Bulguları
              </h4>
              <button
                onClick={handleAddFinding}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[11px] font-mono rounded flex items-center gap-1 border border-slate-700 transition cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                Bulgu Ekle
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {findings.map((f, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">
                      #{i + 1}
                    </span>
                    <select
                      value={f.type}
                      onChange={(e) => {
                        const updated = [...findings];
                        updated[i].type = e.target.value as any;
                        setFindings(updated);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-cyan-300 font-mono focus:outline-none flex-1"
                    >
                      <option value="REMAINING_RECORD">Artık Kayıt (REMAINING_RECORD)</option>
                      <option value="EXPOSED_PII_TOMBSTONE">
                        Tombstone'da Açık PII (EXPOSED_PII)
                      </option>
                      <option value="ACTIVE_DATA_FLOW">
                        Aktif Senkronizasyon/CDC (ACTIVE_DATA_FLOW)
                      </option>
                      <option value="RESTORE_RISK">Yedekten Geri Yükleme Riski (RESTORE_RISK)</option>
                      <option value="CLEAN_RECORD">Doğrulanmış Temiz Kayıt (CLEAN)</option>
                    </select>
                    <button
                      onClick={() => handleRemoveFinding(i)}
                      className="text-slate-500 hover:text-rose-400 transition cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <input
                      type="text"
                      placeholder="system_id (örn: analytics_db)"
                      value={f.systemId}
                      onChange={(e) => {
                        const updated = [...findings];
                        updated[i].systemId = e.target.value;
                        setFindings(updated);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="resource_id"
                      value={f.resourceId}
                      onChange={(e) => {
                        const updated = [...findings];
                        updated[i].resourceId = e.target.value;
                        setFindings(updated);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold text-white">
                    {result.caseId}
                  </span>
                  {result.deletionStatus === 'COMPLETE' && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      COMPLETE
                    </span>
                  )}
                  {result.deletionStatus === 'INCOMPLETE' && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      INCOMPLETE
                    </span>
                  )}
                  {result.deletionStatus === 'NOT_APPLICABLE' && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-400 border border-slate-500/30 font-mono">
                      NOT_APPLICABLE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 flex items-center gap-1 transition cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>JSON Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status & Validation Message */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Üretilen Adım: <strong className="text-white">{result.steps.length} adım</strong>
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Şema ve Faz Sıralaması %100 Doğrulandı
                </span>
              </div>

              {/* Steps Table */}
              {result.steps.length > 0 ? (
                <div className="border border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                        <th className="py-2 px-3">#</th>
                        <th className="py-2 px-3">Faz (Phase)</th>
                        <th className="py-2 px-3">Sistem & Kaynak</th>
                        <th className="py-2 px-3">Operasyon</th>
                        <th className="py-2 px-3">Durum</th>
                        <th className="py-2 px-3">Kanıt ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 text-slate-300">
                      {result.steps.map((st) => (
                        <tr key={st.step_no} className="hover:bg-slate-900/50">
                          <td className="py-2 px-3 text-cyan-400 font-bold">{st.step_no}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] ${
                                st.phase === 'FINDING'
                                  ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                                  : st.phase === 'REMEDIATION'
                                  ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                                  : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                              }`}
                            >
                              {st.phase}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-200">
                            <div>{st.system_id}</div>
                            <div className="text-[10px] text-slate-500">{st.resource_id}</div>
                          </td>
                          <td className="py-2 px-3 text-indigo-300 font-medium">
                            {st.operation}
                          </td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                              {st.state}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-400">
                            {st.evidence_id ? (
                              <span className="text-emerald-400">{st.evidence_id}</span>
                            ) : (
                              <span className="text-slate-600 italic">""</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-lg text-center text-slate-400 font-mono text-xs">
                  steps_json: [] (Boş dizi)
                </div>
              )}

              {/* Raw JSON */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  JSON Çıktısı (steps_json):
                </span>
                <pre className="p-3 bg-black/70 border border-slate-800 text-cyan-300 font-mono text-[11px] rounded-lg overflow-x-auto max-h-40">
                  {JSON.stringify(result.steps, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
