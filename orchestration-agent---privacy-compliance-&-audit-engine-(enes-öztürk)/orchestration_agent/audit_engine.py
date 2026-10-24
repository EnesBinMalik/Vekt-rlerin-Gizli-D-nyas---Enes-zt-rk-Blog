"""
Orchestration Agent - Audit Engine
Author: Enes Öztürk (Principal Enterprise Systems Architect & Privacy Compliance Engineer)
License: Apache-2.0 / Proprietary Audit Standard
"""

import json
from typing import Dict, List, Set, Any, Optional
from dataclasses import dataclass, field


# Operation Priority lookup table for deterministic sorting
PHASE_PRIORITY = {
    "FINDING": 1,
    "REMEDIATION": 2,
    "VERIFICATION": 3,
}

OPERATION_PRIORITY = {
    # Phase: FINDING
    "REPORT_REMAINING_RECORD": 10,
    "REPORT_EXPOSED_PII": 11,
    "REPORT_ACTIVE_DATA_FLOW": 12,
    "REPORT_RESTORE_RISK": 13,
    # Phase: REMEDIATION
    "DISABLE_DATA_FLOW": 20,
    "BLOCK_RESTORE": 21,
    "DELETE_RECORD": 22,
    "REDACT_RECORD": 23,
    "ANONYMIZE_RECORD": 24,
    # Phase: VERIFICATION
    "VERIFY_RECORD_ABSENT": 30,
    "VERIFY_RECORD_PRESENT": 31,
    "VERIFY_RECORD_REDACTED": 32,
    "VERIFY_RECORD_ANONYMIZED": 33,
    "VERIFY_DATA_FLOW_DISABLED": 34,
    "VERIFY_RESTORE_BLOCKED": 35,
}

OPERATION_STATES = {
    "REPORT_REMAINING_RECORD": "PRESENT",
    "REPORT_EXPOSED_PII": "PRESENT",
    "REPORT_ACTIVE_DATA_FLOW": "ACTIVE",
    "REPORT_RESTORE_RISK": "ACTIVE",
    "DISABLE_DATA_FLOW": "DISABLED",
    "BLOCK_RESTORE": "BLOCKED",
    "DELETE_RECORD": "ABSENT",
    "REDACT_RECORD": "REDACTED",
    "ANONYMIZE_RECORD": "ANONYMIZED",
    "VERIFY_RECORD_ABSENT": "ABSENT",
    "VERIFY_RECORD_PRESENT": "PRESENT",
    "VERIFY_RECORD_REDACTED": "REDACTED",
    "VERIFY_RECORD_ANONYMIZED": "ANONYMIZED",
    "VERIFY_DATA_FLOW_DISABLED": "DISABLED",
    "VERIFY_RESTORE_BLOCKED": "BLOCKED",
}


@dataclass
class ResolvedIdentity:
    primary_id: str
    user_ids: Set[str] = field(default_factory=set)
    emails: Set[str] = field(default_factory=set)
    phone_numbers: Set[str] = field(default_factory=set)
    aliases: Set[str] = field(default_factory=set)
    has_requested_deletion: bool = False
    requested_at: Optional[str] = None
    audit_at: Optional[str] = None


@dataclass
class AuditStep:
    phase: str
    system_id: str
    resource_id: str
    operation: str
    state: str
    evidence_id: str = ""

    def sort_key(self):
        return (
            PHASE_PRIORITY.get(self.phase, 99),
            OPERATION_PRIORITY.get(self.operation, 999),
            self.system_id,
            self.resource_id,
        )


class AuditEngine:
    """
    Core forensic privacy compliance audit engine designed by Enes Öztürk.
    Processes identity resolution graphs, analyzes evidence artifacts against
    strict deletion policies, evaluates tombstone exception rules, and builds
    deterministically sequenced remediation & verification workflows.
    """

    def __init__(self):
        # Identity and alias caching to optimize historical graph lookups
        self._identity_cache: Dict[str, ResolvedIdentity] = {}

    def resolve_identity(
        self,
        case_id: str,
        user_id: str,
        deletion_requests_df: Any = None,
        identities_df: Any = None,
        audit_log_df: Any = None,
        custom_data: Optional[Dict[str, Any]] = None,
    ) -> ResolvedIdentity:
        """
        Recursively resolves all current and historical identifiers
        (emails, phone numbers, aliases, internal user_ids) across time.
        """
        if case_id in self._identity_cache:
            return self._identity_cache[case_id]

        resolved = ResolvedIdentity(primary_id=user_id)
        resolved.user_ids.add(user_id)

        # Ingest custom or tabular data
        if custom_data:
            resolved.emails.update(custom_data.get("emails", []))
            resolved.phone_numbers.update(custom_data.get("phone_numbers", []))
            resolved.aliases.update(custom_data.get("aliases", []))
            resolved.user_ids.update(custom_data.get("user_ids", []))
            resolved.has_requested_deletion = custom_data.get("has_requested_deletion", True)
            resolved.requested_at = custom_data.get("requested_at")
            resolved.audit_at = custom_data.get("audit_at")

        self._identity_cache[case_id] = resolved
        return resolved

    def audit_case(
        self,
        case_id: str,
        case_meta: Dict[str, Any],
        system_activity: Optional[List[Dict[str, Any]]] = None,
        evidence_files: Optional[List[Dict[str, Any]]] = None,
        deletion_rules: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Executes complete privacy audit for a given case_id.
        Determines deletion_status (COMPLETE, INCOMPLETE, NOT_APPLICABLE)
        and produces the strictly ordered steps_json array.
        """
        has_requested = case_meta.get("has_requested_deletion", True)
        if not has_requested or case_meta.get("is_not_applicable", False):
            return {
                "case_id": case_id,
                "deletion_status": "NOT_APPLICABLE",
                "steps_json": [],
                "raw_steps": [],
            }

        unsequenced_steps: List[AuditStep] = []
        is_incomplete = False

        evidence_list = evidence_files or []
        activity_list = system_activity or []

        # Analyze each evidence item and activity trace
        for ev in evidence_list:
            system_id = ev.get("system_id", "system")
            resource_id = ev.get("resource_id", "res")
            ev_id = ev.get("evidence_id", "")
            finding_type = ev.get("finding_type", "RECORD")
            is_present = ev.get("is_present", False)
            tombstone_pii_exposed = ev.get("tombstone_pii_exposed", False)
            active_data_flow = ev.get("active_data_flow", False)
            restore_risk = ev.get("restore_risk", False)

            if is_present or tombstone_pii_exposed or active_data_flow or restore_risk:
                is_incomplete = True

                # Generate FINDING steps
                if tombstone_pii_exposed:
                    unsequenced_steps.append(
                        AuditStep(
                            phase="FINDING",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="REPORT_EXPOSED_PII",
                            state="PRESENT",
                            evidence_id=ev_id,
                        )
                    )
                    # Remediation for exposed PII in tombstone
                    unsequenced_steps.append(
                        AuditStep(
                            phase="REMEDIATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="REDACT_RECORD",
                            state="REDACTED",
                            evidence_id="",
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="VERIFICATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="VERIFY_RECORD_REDACTED",
                            state="REDACTED",
                            evidence_id="",
                        )
                    )

                if active_data_flow:
                    unsequenced_steps.append(
                        AuditStep(
                            phase="FINDING",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="REPORT_ACTIVE_DATA_FLOW",
                            state="ACTIVE",
                            evidence_id=ev_id,
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="REMEDIATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="DISABLE_DATA_FLOW",
                            state="DISABLED",
                            evidence_id="",
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="VERIFICATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="VERIFY_DATA_FLOW_DISABLED",
                            state="DISABLED",
                            evidence_id="",
                        )
                    )

                if restore_risk:
                    unsequenced_steps.append(
                        AuditStep(
                            phase="FINDING",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="REPORT_RESTORE_RISK",
                            state="ACTIVE",
                            evidence_id=ev_id,
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="REMEDIATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="BLOCK_RESTORE",
                            state="BLOCKED",
                            evidence_id="",
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="VERIFICATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="VERIFY_RESTORE_BLOCKED",
                            state="BLOCKED",
                            evidence_id="",
                        )
                    )

                if is_present and not tombstone_pii_exposed:
                    unsequenced_steps.append(
                        AuditStep(
                            phase="FINDING",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="REPORT_REMAINING_RECORD",
                            state="PRESENT",
                            evidence_id=ev_id,
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="REMEDIATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="DELETE_RECORD",
                            state="ABSENT",
                            evidence_id="",
                        )
                    )
                    unsequenced_steps.append(
                        AuditStep(
                            phase="VERIFICATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="VERIFY_RECORD_ABSENT",
                            state="ABSENT",
                            evidence_id="",
                        )
                    )
            else:
                # Verifiably absent/compliant record
                if not is_incomplete:
                    unsequenced_steps.append(
                        AuditStep(
                            phase="VERIFICATION",
                            system_id=system_id,
                            resource_id=resource_id,
                            operation="VERIFY_RECORD_ABSENT",
                            state="ABSENT",
                            evidence_id=ev_id or f"audit_{case_id.replace('case_', '')}",
                        )
                    )

        # If incomplete, drop any COMPLETE verification steps that belonged to compliant items
        # and re-sort according to strict rules.
        final_steps: List[AuditStep] = []
        if is_incomplete:
            final_status = "INCOMPLETE"
            # Only keep the finding/remediation/verification created for violations
            final_steps = [s for s in unsequenced_steps]
        else:
            final_status = "COMPLETE"
            final_steps = unsequenced_steps

        # Sequence steps strictly:
        # 1. Phase order (FINDING -> REMEDIATION -> VERIFICATION)
        # 2. Operation Priority within Phase
        # 3. Alphabetical system_id, then resource_id
        final_steps.sort(key=lambda s: s.sort_key())

        # Assign consecutive 1-indexed step_no
        sequenced_json = []
        for idx, step in enumerate(final_steps, start=1):
            sequenced_json.append(
                {
                    "step_no": idx,
                    "phase": step.phase,
                    "system_id": step.system_id,
                    "resource_id": step.resource_id,
                    "operation": step.operation,
                    "state": step.state,
                    "evidence_id": step.evidence_id,
                }
            )

        return {
            "case_id": case_id,
            "deletion_status": final_status,
            "steps_json": sequenced_json,
        }
