import React from 'react';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Lock,
  GitBranch,
  Database,
  Code2,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          2. Ajanın Çalışma Algoritması ve Adli Sıralama Mimarisi (audit_engine.py)
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Enes Öztürk tarafından tasarlanan bu mimari; dağıtık sistemlerdeki asenkron replikasyon gecikmeleri, CDC kuyrukları, tombstone PII kalıntıları ve log sızıntılarını deterministik olarak denetler ve GDPR/KVKK cezai yaptırımlarını bertaraf eden adli dizilimler üretir.
        </p>
      </div>

      {/* 4 Pipeline Phases Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Phase 1 */}
        <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl p-4 space-y-2.5 relative">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center text-xs">
            01
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Kimlik Çözümlemesi (Identity Resolution)
          </h4>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            <code className="text-cyan-300">user_identities.csv</code> ve{' '}
            <code className="text-cyan-300">user_audit_log.csv</code> dosyalarını özyinelemeli tarayarak kullanıcının tarihsel tüm e-posta, telefon ve ID tanımlayıcılarını eşler.
          </p>
          <div className="text-[10px] font-mono text-cyan-400/80 bg-slate-950 p-2 rounded border border-slate-800">
            ResolvedIdentity (O(1) Cached)
          </div>
        </div>

        {/* Phase 2 */}
        <div className="bg-slate-900/90 border border-indigo-900/40 rounded-xl p-4 space-y-2.5 relative">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs">
            02
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Durum Tespiti & Kanıt Toplama
          </h4>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            <code className="text-indigo-300">system_activity.csv</code> ve kanıt dosyalarını{' '}
            <code className="text-indigo-300">audit_at</code> zaman damgasına göre adli olarak tarar. Hayalet veri, sync, backup ve log kalıntılarını yakalar.
          </p>
          <div className="text-[10px] font-mono text-indigo-400/80 bg-slate-950 p-2 rounded border border-slate-800">
            Evidence Artifact Verification
          </div>
        </div>

        {/* Phase 3 */}
        <div className="bg-slate-900/90 border border-purple-900/40 rounded-xl p-4 space-y-2.5 relative">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center text-xs">
            03
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Poliçe Kararı (Policy Decision)
          </h4>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            <code className="text-purple-300">deletion_rules.csv</code> ve <strong>Tombstone İstisna Kuralı</strong> uygulanır. COMPLETE, INCOMPLETE veya NOT_APPLICABLE kararı verilir.
          </p>
          <div className="text-[10px] font-mono text-purple-400/80 bg-slate-950 p-2 rounded border border-slate-800">
            Tombstone PII Purge Enforced
          </div>
        </div>

        {/* Phase 4 */}
        <div className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-4 space-y-2.5 relative">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-xs">
            04
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Adım Dizilimi & Şema Çıktısı
          </h4>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Operasyon öncelik matrisi ve alfabetik sistem/kaynak kuralına göre sıralanmış <code className="text-emerald-300">steps_json</code> dizisi ve <code className="text-emerald-300">output.csv</code> üretilir.
          </p>
          <div className="text-[10px] font-mono text-emerald-400/80 bg-slate-950 p-2 rounded border border-slate-800">
            Pydantic V2 Schema Validated
          </div>
        </div>
      </div>

      {/* Sorting Equation Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          Deterministik Sıralama Fonksiyonu (Mathematical Sorting Tuple)
        </h4>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
          <div className="text-slate-400">
            # audit_engine.py içerisindeki mutlak sıralama anahtarı:
          </div>
          <div className="text-cyan-300 text-sm font-bold">
            sort_key(step) = ( phase_priority, operation_priority, system_id, resource_id )
          </div>
          <div className="text-slate-400 text-[11px] pt-1">
            1. Faz Önceliği:{' '}
            <span className="text-amber-400">FINDING (1)</span> $\rightarrow${' '}
            <span className="text-rose-400">REMEDIATION (2)</span> $\rightarrow${' '}
            <span className="text-emerald-400">VERIFICATION (3)</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            2. Operasyon Tablosundaki Öncelik Sırası (Aşağıdaki matrise bakınız)
          </div>
          <div className="text-slate-400 text-[11px]">
            3. Eşitlik durumunda ikincil sıralama: Artan alfabetik{' '}
            <span className="text-indigo-300">system_id</span>, ardından{' '}
            <span className="text-indigo-300">resource_id</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            4. Adım Numaralandırma: <span className="text-white">step_no</span> 1'den başlar, ardışık artar.
          </div>
        </div>
      </div>

      {/* Operation Priority Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-lg">
        <div className="p-4 bg-slate-950 border-b border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Operasyon Öncelik ve Hedef Durum (State) Matrisi
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                <th className="py-2.5 px-4">Faz (Phase)</th>
                <th className="py-2.5 px-4">Öncelik</th>
                <th className="py-2.5 px-4">Operasyon Kodu</th>
                <th className="py-2.5 px-4">Zorunlu Durum (State)</th>
                <th className="py-2.5 px-4">Kanıt ID (evidence_id) Kuralı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {/* FINDING */}
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-amber-400 font-bold" rowSpan={4}>
                  FINDING
                </td>
                <td className="py-2.5 px-4">1</td>
                <td className="py-2.5 px-4 text-white">REPORT_REMAINING_RECORD</td>
                <td className="py-2.5 px-4 text-rose-400 font-bold">PRESENT</td>
                <td className="py-2.5 px-4 text-slate-400">Geçerli kanıt ID (file_id/activity_id)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">2</td>
                <td className="py-2.5 px-4 text-white">REPORT_EXPOSED_PII</td>
                <td className="py-2.5 px-4 text-rose-400 font-bold">PRESENT</td>
                <td className="py-2.5 px-4 text-slate-400">Tombstone PII kanıt referansı</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">3</td>
                <td className="py-2.5 px-4 text-white">REPORT_ACTIVE_DATA_FLOW</td>
                <td className="py-2.5 px-4 text-amber-400 font-bold">ACTIVE</td>
                <td className="py-2.5 px-4 text-slate-400">CDC / Kafka stream kanıtı</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">4</td>
                <td className="py-2.5 px-4 text-white">REPORT_RESTORE_RISK</td>
                <td className="py-2.5 px-4 text-amber-400 font-bold">ACTIVE</td>
                <td className="py-2.5 px-4 text-slate-400">Yedek snapshot kanıtı</td>
              </tr>

              {/* REMEDIATION */}
              <tr className="hover:bg-slate-800/30 bg-slate-950/20">
                <td className="py-2.5 px-4 text-rose-400 font-bold" rowSpan={5}>
                  REMEDIATION
                </td>
                <td className="py-2.5 px-4">1</td>
                <td className="py-2.5 px-4 text-white">DISABLE_DATA_FLOW</td>
                <td className="py-2.5 px-4 text-purple-400 font-bold">DISABLED</td>
                <td className="py-2.5 px-4 text-slate-500 italic">"" (Boş metin - Gelecek adım)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-slate-950/20">
                <td className="py-2.5 px-4">2</td>
                <td className="py-2.5 px-4 text-white">BLOCK_RESTORE</td>
                <td className="py-2.5 px-4 text-purple-400 font-bold">BLOCKED</td>
                <td className="py-2.5 px-4 text-slate-500 italic">"" (Boş metin)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-slate-950/20">
                <td className="py-2.5 px-4">3</td>
                <td className="py-2.5 px-4 text-white">DELETE_RECORD</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">ABSENT</td>
                <td className="py-2.5 px-4 text-slate-500 italic">"" (Boş metin)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-slate-950/20">
                <td className="py-2.5 px-4">4</td>
                <td className="py-2.5 px-4 text-white">REDACT_RECORD</td>
                <td className="py-2.5 px-4 text-cyan-400 font-bold">REDACTED</td>
                <td className="py-2.5 px-4 text-slate-500 italic">"" (Boş metin)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-slate-950/20">
                <td className="py-2.5 px-4">5</td>
                <td className="py-2.5 px-4 text-white">ANONYMIZE_RECORD</td>
                <td className="py-2.5 px-4 text-cyan-400 font-bold">ANONYMIZED</td>
                <td className="py-2.5 px-4 text-slate-500 italic">"" (Boş metin)</td>
              </tr>

              {/* VERIFICATION */}
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-emerald-400 font-bold" rowSpan={6}>
                  VERIFICATION
                </td>
                <td className="py-2.5 px-4">1</td>
                <td className="py-2.5 px-4 text-white">VERIFY_RECORD_ABSENT</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">ABSENT</td>
                <td className="py-2.5 px-4 text-slate-400">COMPLETE ise audit_id; INCOMPLETE ise ""</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">2</td>
                <td className="py-2.5 px-4 text-white">VERIFY_RECORD_PRESENT</td>
                <td className="py-2.5 px-4 text-slate-300 font-bold">PRESENT</td>
                <td className="py-2.5 px-4 text-slate-400">Gereken saklama kayıtları için</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">3</td>
                <td className="py-2.5 px-4 text-white">VERIFY_RECORD_REDACTED</td>
                <td className="py-2.5 px-4 text-cyan-400 font-bold">REDACTED</td>
                <td className="py-2.5 px-4 text-slate-400">Tombstone doğrulama kanıtı</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">4</td>
                <td className="py-2.5 px-4 text-white">VERIFY_RECORD_ANONYMIZED</td>
                <td className="py-2.5 px-4 text-cyan-400 font-bold">ANONYMIZED</td>
                <td className="py-2.5 px-4 text-slate-400">Anonimleştirme denetim raporu</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">5</td>
                <td className="py-2.5 px-4 text-white">VERIFY_DATA_FLOW_DISABLED</td>
                <td className="py-2.5 px-4 text-purple-400 font-bold">DISABLED</td>
                <td className="py-2.5 px-4 text-slate-400">Kanal devredışı teyidi</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4">6</td>
                <td className="py-2.5 px-4 text-white">VERIFY_RESTORE_BLOCKED</td>
                <td className="py-2.5 px-4 text-purple-400 font-bold">BLOCKED</td>
                <td className="py-2.5 px-4 text-slate-400">Geri yükleme kilit sertifikası</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
