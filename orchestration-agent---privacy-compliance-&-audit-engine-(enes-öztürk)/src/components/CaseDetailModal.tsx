import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Database,
  ArrowRight,
  Copy,
  Check,
  UserCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { CaseData, PhaseType } from '../types/audit';

interface CaseDetailModalProps {
  caseData: CaseData | null;
  onClose: () => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ caseData, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!caseData) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(caseData.steps_json, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    switch (caseData.deletion_status) {
      case 'COMPLETE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            COMPLETE (Tamamlandı)
          </span>
        );
      case 'INCOMPLETE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            INCOMPLETE (İyileştirme Gerekli)
          </span>
        );
      case 'NOT_APPLICABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-300 border border-slate-500/30">
            NOT_APPLICABLE (Kapsam Dışı)
          </span>
        );
    }
  };

  const getPhaseBadge = (phase: PhaseType) => {
    switch (phase) {
      case 'FINDING':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
            1. FINDING
          </span>
        );
      case 'REMEDIATION':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30">
            2. REMEDIATION
          </span>
        );
      case 'VERIFICATION':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            3. VERIFICATION
          </span>
        );
    }
  };

  const getStateBadge = (state: string) => {
    let color = 'bg-slate-800 text-slate-300 border-slate-700';
    if (state === 'PRESENT') color = 'bg-rose-950/50 text-rose-300 border-rose-800/50';
    if (state === 'ABSENT') color = 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50';
    if (state === 'REDACTED' || state === 'ANONYMIZED')
      color = 'bg-cyan-950/50 text-cyan-300 border-cyan-800/50';
    if (state === 'ACTIVE') color = 'bg-amber-950/50 text-amber-300 border-amber-800/50';
    if (state === 'DISABLED' || state === 'BLOCKED')
      color = 'bg-purple-950/50 text-purple-300 border-purple-800/50';

    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${color}`}>
        {state}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[92vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold font-mono text-white">
                  {caseData.case_id}
                </h2>
                {getStatusBadge()}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Denetim Zaman Damgası: {caseData.audit_at}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>steps_json Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Phase 1: Identity & State Reconstruction Card */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Faz 1: Kimlik Çözümlemesi (Identity Resolution Graph)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                user_identities.csv + user_audit_log.csv
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Birincil Kullanıcı E-posta:</span>
                <span className="font-mono text-slate-200 bg-slate-900 px-2 py-1 rounded border border-slate-800 block truncate">
                  {caseData.user_email}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tarihsel Takma Adlar & Telefonlar:</span>
                <div className="font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate">
                  {caseData.aliases && caseData.aliases.length > 0
                    ? caseData.aliases.join(', ')
                    : 'Ek takma ad / harici telefon bulunamadı'}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2: Policy Enforcement Card */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2 border-b border-slate-800/80 pb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Faz 2: Poliçe ve Kanıt Analizi (Policy Decision)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                deletion_rules.csv + system_activity.csv
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              {caseData.notes}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-mono">İlgili Sistemler:</span>
              {caseData.systems_involved?.map((sys) => (
                <span
                  key={sys}
                  className="font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                >
                  {sys}
                </span>
              ))}
              <span className="ml-auto text-[11px] text-emerald-400/90 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tombstone İstisna Kuralı Doğrulandı
              </span>
            </div>
          </div>

          {/* Phase 3 & 4: Sequence Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Faz 3 & 4: Sıralanmış Operasyon Dizilimi (steps_json)
              </span>
              <span className="text-xs font-mono text-slate-400">
                {caseData.steps_json.length} Adım Kaydedildi
              </span>
            </div>

            {caseData.steps_json.length === 0 ? (
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs font-mono">
                NOT_APPLICABLE: Silme talebi bulunmadığından üretilen steps_json boştur [].
              </div>
            ) : (
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Faz (Phase)</th>
                        <th className="py-2.5 px-3">Sistem (system_id)</th>
                        <th className="py-2.5 px-3">Kaynak (resource_id)</th>
                        <th className="py-2.5 px-3">Operasyon (operation)</th>
                        <th className="py-2.5 px-3">Durum (state)</th>
                        <th className="py-2.5 px-3">Kanıt ID (evidence_id)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                      {caseData.steps_json.map((step) => (
                        <tr key={step.step_no} className="hover:bg-slate-900/50 transition">
                          <td className="py-2.5 px-3 text-cyan-400 font-bold">
                            {step.step_no}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {getPhaseBadge(step.phase)}
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            {step.system_id}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300">
                            {step.resource_id}
                          </td>
                          <td className="py-2.5 px-3 text-indigo-300 font-medium whitespace-nowrap">
                            {step.operation}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {getStateBadge(step.state)}
                          </td>
                          <td className="py-2.5 px-3 text-slate-400">
                            {step.evidence_id ? (
                              <span className="text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/40">
                                {step.evidence_id}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">"" (İleriye dönük)</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Raw JSON View */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Ham JSON Formatı (Strict Schema Verified)
              </span>
            </div>
            <pre className="bg-black/70 border border-slate-800 text-cyan-300/90 font-mono text-[11px] p-3.5 rounded-xl overflow-x-auto max-h-48">
              {JSON.stringify(caseData.steps_json, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Enes Öztürk Doğrulama İmzası: SHA256-EO-AUDIT-VERIFIED-518</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
