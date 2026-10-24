export type PhaseType = 'FINDING' | 'REMEDIATION' | 'VERIFICATION';

export type DeletionStatus = 'COMPLETE' | 'INCOMPLETE' | 'NOT_APPLICABLE';

export type OperationType =
  // FINDING
  | 'REPORT_REMAINING_RECORD'
  | 'REPORT_EXPOSED_PII'
  | 'REPORT_ACTIVE_DATA_FLOW'
  | 'REPORT_RESTORE_RISK'
  // REMEDIATION
  | 'DISABLE_DATA_FLOW'
  | 'BLOCK_RESTORE'
  | 'DELETE_RECORD'
  | 'REDACT_RECORD'
  | 'ANONYMIZE_RECORD'
  // VERIFICATION
  | 'VERIFY_RECORD_ABSENT'
  | 'VERIFY_RECORD_PRESENT'
  | 'VERIFY_RECORD_REDACTED'
  | 'VERIFY_RECORD_ANONYMIZED'
  | 'VERIFY_DATA_FLOW_DISABLED'
  | 'VERIFY_RESTORE_BLOCKED';

export type OperationState =
  | 'PRESENT'
  | 'ACTIVE'
  | 'DISABLED'
  | 'BLOCKED'
  | 'ABSENT'
  | 'REDACTED'
  | 'ANONYMIZED';

export interface AuditStep {
  step_no: number;
  phase: PhaseType;
  system_id: string;
  resource_id: string;
  operation: OperationType;
  state: OperationState;
  evidence_id: string;
}

export interface CaseData {
  case_id: string;
  deletion_status: DeletionStatus;
  steps_json: AuditStep[];
  audit_at?: string;
  user_email?: string;
  aliases?: string[];
  systems_involved?: string[];
  notes?: string;
}

export interface SystemMetrics {
  totalCases: number;
  completeCount: number;
  incompleteCount: number;
  notApplicableCount: number;
  accuracyRate: number;
  sequenceComplianceRate: number;
  inputTokens: number;
  outputTokens: number;
  totalCostUsd: number;
}
