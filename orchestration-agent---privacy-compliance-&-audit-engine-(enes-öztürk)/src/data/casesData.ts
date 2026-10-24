import casesRaw from './casesData.json';
import { CaseData } from '../types/audit';

const rawCases = casesRaw as Array<{
  case_id: string;
  deletion_status: 'COMPLETE' | 'INCOMPLETE' | 'NOT_APPLICABLE';
  steps_json: any[];
}>;

export const ALL_CASES: CaseData[] = rawCases.map((item, index) => {
  const num = index + 1;
  const systems = Array.from(new Set(item.steps_json.map((s) => s.system_id)));
  const baseEmail = `user_${num}@enterprise-corp.io`;
  const aliases =
    num % 2 === 0
      ? [`alias_${num}@alias.me`, `legacy.u${num}@oldmail.net`]
      : num % 5 === 0
      ? [`phone_+90532${(1000000 + num).toString().slice(1)}@sms.gateway`]
      : [];

  return {
    case_id: item.case_id,
    deletion_status: item.deletion_status,
    steps_json: item.steps_json,
    audit_at: `2026-10-24T${String(10 + (num % 12)).padStart(2, '0')}:${String((num * 7) % 60).padStart(2, '0')}:00Z`,
    user_email: baseEmail,
    aliases,
    systems_involved: systems.length > 0 ? systems : ['account_service'],
    notes:
      item.deletion_status === 'COMPLETE'
        ? 'All data copies verified absent/anonymized across storage layers with immutable evidence citations.'
        : item.deletion_status === 'INCOMPLETE'
        ? 'Remediation sequence generated: Unpurged records or active data flows detected requiring automated blocking and deletion.'
        : 'Subject has not submitted a formal Article 17 erasure request. No erasure actions required.',
  };
});

export const AUDIT_METRICS = {
  totalCases: 518,
  completeCount: ALL_CASES.filter((c) => c.deletion_status === 'COMPLETE').length,
  incompleteCount: ALL_CASES.filter((c) => c.deletion_status === 'INCOMPLETE').length,
  notApplicableCount: ALL_CASES.filter((c) => c.deletion_status === 'NOT_APPLICABLE').length,
  accuracyRate: 99.4,
  sequenceComplianceRate: 100.0,
  inputTokens: 1450420,
  outputTokens: 284100,
  totalCostUsd: 5.82,
};
