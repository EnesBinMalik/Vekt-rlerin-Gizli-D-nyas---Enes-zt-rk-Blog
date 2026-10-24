"""
Orchestration Agent - Schema Validator Module
Author: Enes Öztürk (Principal Enterprise Systems Architect & Privacy Compliance Engineer)
License: Apache-2.0 / Proprietary Audit Standard
"""

import json
from typing import List, Literal, Optional, Dict, Any

# Operation Priorities per Phase
PHASE_ORDER = ["FINDING", "REMEDIATION", "VERIFICATION"]

OPERATION_PRIORITIES = {
    "FINDING": [
        "REPORT_REMAINING_RECORD",
        "REPORT_EXPOSED_PII",
        "REPORT_ACTIVE_DATA_FLOW",
        "REPORT_RESTORE_RISK",
    ],
    "REMEDIATION": [
        "DISABLE_DATA_FLOW",
        "BLOCK_RESTORE",
        "DELETE_RECORD",
        "REDACT_RECORD",
        "ANONYMIZE_RECORD",
    ],
    "VERIFICATION": [
        "VERIFY_RECORD_ABSENT",
        "VERIFY_RECORD_PRESENT",
        "VERIFY_RECORD_REDACTED",
        "VERIFY_RECORD_ANONYMIZED",
        "VERIFY_DATA_FLOW_DISABLED",
        "VERIFY_RESTORE_BLOCKED",
    ],
}

VALID_OPERATION_STATES = {
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


class StepModel:
    def __init__(
        self,
        step_no: int,
        phase: str,
        system_id: str,
        resource_id: str,
        operation: str,
        state: str,
        evidence_id: str = "",
    ):
        self.step_no = step_no
        self.phase = phase
        self.system_id = system_id
        self.resource_id = resource_id
        self.operation = operation
        self.state = state
        self.evidence_id = evidence_id
        self.validate()

    def validate(self):
        if self.step_no < 1:
            raise ValueError(f"step_no must be >= 1, got {self.step_no}")
        if self.phase not in PHASE_ORDER:
            raise ValueError(f"Invalid phase: {self.phase}")

        expected_phase = None
        for phase, ops in OPERATION_PRIORITIES.items():
            if self.operation in ops:
                expected_phase = phase
                break

        if not expected_phase:
            raise ValueError(f"Unknown operation: {self.operation}")

        if self.phase != expected_phase:
            raise ValueError(f"Operation {self.operation} does not belong to phase {self.phase}")

        expected_state = VALID_OPERATION_STATES.get(self.operation)
        if expected_state and self.state != expected_state:
            raise ValueError(
                f"Invalid state '{self.state}' for operation '{self.operation}'. Expected '{expected_state}'."
            )

    def to_dict(self):
        return {
            "step_no": self.step_no,
            "phase": self.phase,
            "system_id": self.system_id,
            "resource_id": self.resource_id,
            "operation": self.operation,
            "state": self.state,
            "evidence_id": self.evidence_id,
        }


class CaseAuditResult:
    def __init__(self, case_id: str, deletion_status: str, steps_json: List[Any]):
        self.case_id = case_id
        self.deletion_status = deletion_status
        self.steps_json = [
            s if isinstance(s, StepModel) else StepModel(**s) for s in steps_json
        ]
        self.validate()

    def validate(self):
        status = self.deletion_status
        steps = self.steps_json

        if status not in ["COMPLETE", "INCOMPLETE", "NOT_APPLICABLE"]:
            raise ValueError(f"Invalid deletion_status: {status}")

        if status == "NOT_APPLICABLE":
            if len(steps) != 0:
                raise ValueError(
                    f"Case {self.case_id} is NOT_APPLICABLE but contains {len(steps)} steps. Expected []."
                )
            return

        # Validate step numbering continuity
        for idx, step in enumerate(steps, start=1):
            if step.step_no != idx:
                raise ValueError(
                    f"Step sequence broken in {self.case_id}: expected step_no {idx}, got {step.step_no}"
                )

        # Validate Phase & Operation sorting
        for i in range(len(steps) - 1):
            curr = steps[i]
            nxt = steps[i + 1]

            curr_phase_idx = PHASE_ORDER.index(curr.phase)
            nxt_phase_idx = PHASE_ORDER.index(nxt.phase)

            if curr_phase_idx > nxt_phase_idx:
                raise ValueError(
                    f"Phase out of order in {self.case_id}: {curr.phase} appeared before {nxt.phase}"
                )

            if curr_phase_idx == nxt_phase_idx:
                curr_op_prio = OPERATION_PRIORITIES[curr.phase].index(curr.operation)
                nxt_op_prio = OPERATION_PRIORITIES[nxt.phase].index(nxt.operation)

                if curr_op_prio > nxt_op_prio:
                    raise ValueError(
                        f"Operation priority violation in {self.case_id}: {curr.operation} appeared before {nxt.operation}"
                    )

                if curr_op_prio == nxt_op_prio:
                    # Alphabetical sort by system_id then resource_id
                    if curr.system_id > nxt.system_id:
                        raise ValueError(
                            f"Alphabetical system_id violation in {self.case_id}: '{curr.system_id}' should come after '{nxt.system_id}'"
                        )
                    elif curr.system_id == nxt.system_id and curr.resource_id > nxt.resource_id:
                        raise ValueError(
                            f"Alphabetical resource_id violation in {self.case_id}: '{curr.resource_id}' should come after '{nxt.resource_id}'"
                        )

        # Evidence validation:
        if status == "COMPLETE":
            for step in steps:
                if not step.evidence_id:
                    raise ValueError(
                        f"COMPLETE case {self.case_id} step {step.step_no} must cite a valid evidence_id."
                    )
        elif status == "INCOMPLETE":
            for step in steps:
                if step.phase in ["REMEDIATION", "VERIFICATION"] and step.evidence_id != "":
                    raise ValueError(
                        f"INCOMPLETE case {self.case_id} prospective step {step.step_no} ({step.phase}) must have evidence_id = ''"
                    )


def validate_steps_json_string(raw_json: str, status: str, case_id: str) -> CaseAuditResult:
    """Helper to validate raw json string against CaseAuditResult schema."""
    parsed = json.loads(raw_json)
    return CaseAuditResult(case_id=case_id, deletion_status=status, steps_json=parsed)
