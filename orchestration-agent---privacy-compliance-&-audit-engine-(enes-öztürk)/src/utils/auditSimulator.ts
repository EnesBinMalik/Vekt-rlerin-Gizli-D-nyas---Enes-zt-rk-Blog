import { AuditStep, DeletionStatus, PhaseType, OperationType, OperationState } from '../types/audit';

const PHASE_ORDER: PhaseType[] = ['FINDING', 'REMEDIATION', 'VERIFICATION'];

const OPERATION_PRIORITIES: Record<PhaseType, OperationType[]> = {
  FINDING: [
    'REPORT_REMAINING_RECORD',
    'REPORT_EXPOSED_PII',
    'REPORT_ACTIVE_DATA_FLOW',
    'REPORT_RESTORE_RISK',
  ],
  REMEDIATION: [
    'DISABLE_DATA_FLOW',
    'BLOCK_RESTORE',
    'DELETE_RECORD',
    'REDACT_RECORD',
    'ANONYMIZE_RECORD',
  ],
  VERIFICATION: [
    'VERIFY_RECORD_ABSENT',
    'VERIFY_RECORD_PRESENT',
    'VERIFY_RECORD_REDACTED',
    'VERIFY_RECORD_ANONYMIZED',
    'VERIFY_DATA_FLOW_DISABLED',
    'VERIFY_RESTORE_BLOCKED',
  ],
};

const PHASE_PRIORITY: Record<PhaseType, number> = {
  FINDING: 1,
  REMEDIATION: 2,
  VERIFICATION: 3,
};

const OP_PRIORITY: Record<string, number> = {
  REPORT_REMAINING_RECORD: 10,
  REPORT_EXPOSED_PII: 11,
  REPORT_ACTIVE_DATA_FLOW: 12,
  REPORT_RESTORE_RISK: 13,
  DISABLE_DATA_FLOW: 20,
  BLOCK_RESTORE: 21,
  DELETE_RECORD: 22,
  REDACT_RECORD: 23,
  ANONYMIZE_RECORD: 24,
  VERIFY_RECORD_ABSENT: 30,
  VERIFY_RECORD_PRESENT: 31,
  VERIFY_RECORD_REDACTED: 32,
  VERIFY_RECORD_ANONYMIZED: 33,
  VERIFY_DATA_FLOW_DISABLED: 34,
  VERIFY_RESTORE_BLOCKED: 35,
};

export interface SimulationInput {
  caseId: string;
  hasRequestedDeletion: boolean;
  userEmail: string;
  aliases: string[];
  findings: Array<{
    systemId: string;
    resourceId: string;
    evidenceId: string;
    type: 'REMAINING_RECORD' | 'EXPOSED_PII_TOMBSTONE' | 'ACTIVE_DATA_FLOW' | 'RESTORE_RISK' | 'CLEAN_RECORD';
  }>;
}

export interface SimulationResult {
  caseId: string;
  deletionStatus: DeletionStatus;
  steps: AuditStep[];
  validationErrors: string[];
  identityResolutionGraph: {
    primaryEmail: string;
    historicalAliases: string[];
    associatedUserIds: string[];
    tombstoneChecked: boolean;
  };
}

export function runAuditSimulation(input: SimulationInput): SimulationResult {
  const errors: string[] = [];
  const caseId = input.caseId.trim() || 'case_custom';

  if (!input.hasRequestedDeletion) {
    return {
      caseId,
      deletionStatus: 'NOT_APPLICABLE',
      steps: [],
      validationErrors: [],
      identityResolutionGraph: {
        primaryEmail: input.userEmail,
        historicalAliases: input.aliases,
        associatedUserIds: [`uid_${caseId.replace(/[^0-9]/g, '') || '999'}`],
        tombstoneChecked: true,
      },
    };
  }

  const unsequenced: AuditStep[] = [];
  let isIncomplete = false;

  for (const item of input.findings) {
    const sys = item.systemId.trim() || 'system_core';
    const res = item.resourceId.trim() || 'record_001';
    const ev = item.evidenceId.trim();

    if (item.type === 'REMAINING_RECORD') {
      isIncomplete = true;
      unsequenced.push({
        step_no: 0,
        phase: 'FINDING',
        system_id: sys,
        resource_id: res,
        operation: 'REPORT_REMAINING_RECORD',
        state: 'PRESENT',
        evidence_id: ev || `ev_${Math.floor(Math.random() * 1000)}`,
      });
      unsequenced.push({
        step_no: 0,
        phase: 'REMEDIATION',
        system_id: sys,
        resource_id: res,
        operation: 'DELETE_RECORD',
        state: 'ABSENT',
        evidence_id: '',
      });
      unsequenced.push({
        step_no: 0,
        phase: 'VERIFICATION',
        system_id: sys,
        resource_id: res,
        operation: 'VERIFY_RECORD_ABSENT',
        state: 'ABSENT',
        evidence_id: '',
      });
    } else if (item.type === 'EXPOSED_PII_TOMBSTONE') {
      isIncomplete = true;
      unsequenced.push({
        step_no: 0,
        phase: 'FINDING',
        system_id: sys,
        resource_id: res,
        operation: 'REPORT_EXPOSED_PII',
        state: 'PRESENT',
        evidence_id: ev || `ev_pii_${Math.floor(Math.random() * 1000)}`,
      });
      unsequenced.push({
        step_no: 0,
        phase: 'REMEDIATION',
        system_id: sys,
        resource_id: res,
        operation: 'REDACT_RECORD',
        state: 'REDACTED',
        evidence_id: '',
      });
      unsequenced.push({
        step_no: 0,
        phase: 'VERIFICATION',
        system_id: sys,
        resource_id: res,
        operation: 'VERIFY_RECORD_REDACTED',
        state: 'REDACTED',
        evidence_id: '',
      });
    } else if (item.type === 'ACTIVE_DATA_FLOW') {
      isIncomplete = true;
      unsequenced.push({
        step_no: 0,
        phase: 'FINDING',
        system_id: sys,
        resource_id: res,
        operation: 'REPORT_ACTIVE_DATA_FLOW',
        state: 'ACTIVE',
        evidence_id: ev || `ev_flow_${Math.floor(Math.random() * 1000)}`,
      });
      unsequenced.push({
        step_no: 0,
        phase: 'REMEDIATION',
        system_id: sys,
        resource_id: res,
        operation: 'DISABLE_DATA_FLOW',
        state: 'DISABLED',
        evidence_id: '',
      });
      unsequenced.push({
        step_no: 0,
        phase: 'VERIFICATION',
        system_id: sys,
        resource_id: res,
        operation: 'VERIFY_DATA_FLOW_DISABLED',
        state: 'DISABLED',
        evidence_id: '',
      });
    } else if (item.type === 'RESTORE_RISK') {
      isIncomplete = true;
      unsequenced.push({
        step_no: 0,
        phase: 'FINDING',
        system_id: sys,
        resource_id: res,
        operation: 'REPORT_RESTORE_RISK',
        state: 'ACTIVE',
        evidence_id: ev || `ev_risk_${Math.floor(Math.random() * 1000)}`,
      });
      unsequenced.push({
        step_no: 0,
        phase: 'REMEDIATION',
        system_id: sys,
        resource_id: res,
        operation: 'BLOCK_RESTORE',
        state: 'BLOCKED',
        evidence_id: '',
      });
      unsequenced.push({
        step_no: 0,
        phase: 'VERIFICATION',
        system_id: sys,
        resource_id: res,
        operation: 'VERIFY_RESTORE_BLOCKED',
        state: 'BLOCKED',
        evidence_id: '',
      });
    } else {
      // CLEAN_RECORD
      if (!isIncomplete) {
        unsequenced.push({
          step_no: 0,
          phase: 'VERIFICATION',
          system_id: sys,
          resource_id: res,
          operation: 'VERIFY_RECORD_ABSENT',
          state: 'ABSENT',
          evidence_id: ev || `audit_clean_${caseId}`,
        });
      }
    }
  }

  const finalStatus: DeletionStatus = isIncomplete ? 'INCOMPLETE' : 'COMPLETE';
  const stepsToSort = isIncomplete
    ? unsequenced.filter((s) => s.phase === 'FINDING' || s.phase === 'REMEDIATION' || s.phase === 'VERIFICATION')
    : unsequenced;

  // Strict Enes Öztürk Sequencing rules:
  // 1. Phase Priority (FINDING -> REMEDIATION -> VERIFICATION)
  // 2. Operation Priority inside Phase
  // 3. Alphabetical system_id
  // 4. Alphabetical resource_id
  stepsToSort.sort((a, b) => {
    const pA = PHASE_PRIORITY[a.phase] || 99;
    const pB = PHASE_PRIORITY[b.phase] || 99;
    if (pA !== pB) return pA - pB;

    const opA = OP_PRIORITY[a.operation] || 999;
    const opB = OP_PRIORITY[b.operation] || 999;
    if (opA !== opB) return opA - opB;

    if (a.system_id !== b.system_id) {
      return a.system_id.localeCompare(b.system_id);
    }
    return a.resource_id.localeCompare(b.resource_id);
  });

  const finalSteps: AuditStep[] = stepsToSort.map((step, idx) => ({
    ...step,
    step_no: idx + 1,
  }));

  // Schema Validation Check
  for (let i = 0; i < finalSteps.length - 1; i++) {
    const curr = finalSteps[i];
    const nxt = finalSteps[i + 1];
    const currPhaseIdx = PHASE_ORDER.indexOf(curr.phase);
    const nxtPhaseIdx = PHASE_ORDER.indexOf(nxt.phase);

    if (currPhaseIdx > nxtPhaseIdx) {
      errors.push(`Phase sequencing error: ${curr.phase} appeared before ${nxt.phase}`);
    } else if (currPhaseIdx === nxtPhaseIdx) {
      const pList = OPERATION_PRIORITIES[curr.phase];
      const currOpIdx = pList.indexOf(curr.operation);
      const nxtOpIdx = pList.indexOf(nxt.operation);
      if (currOpIdx > nxtOpIdx) {
        errors.push(`Operation priority error: ${curr.operation} appeared before ${nxt.operation}`);
      }
    }
  }

  return {
    caseId,
    deletionStatus: finalStatus,
    steps: finalSteps,
    validationErrors: errors,
    identityResolutionGraph: {
      primaryEmail: input.userEmail || `user@corp.io`,
      historicalAliases: input.aliases.length > 0 ? input.aliases : ['legacy@corp.io'],
      associatedUserIds: [`uid_${caseId.replace(/[^0-9]/g, '') || '001'}`],
      tombstoneChecked: true,
    },
  };
}
