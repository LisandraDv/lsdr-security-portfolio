# Findings Summary

## Results Obtained

The assessment identified 12 findings across identity, access management, audit logging, monitoring, and cloud hardening controls.

## Findings by Severity

| Severity | Count |
|---|---:|
| High | 3 |
| Medium | 9 |
| Low | 0 |
| Total | 12 |

## Findings by Area

| Area | Findings | Main Concern |
|---|---:|---|
| MFA Coverage | 2 | Incomplete protection for sensitive access |
| Conditional Access | 2 | Policies not fully aligned with risk-based access |
| Privileged Access | 2 | Excessive or standing privileged roles |
| Audit Logging | 1 | Limited visibility or retention |
| Secure Score / Hardening | 3 | Recommended controls not fully implemented |
| Monitoring Visibility | 2 | Gaps in detection and investigation readiness |

## Top Findings

### 1. Incomplete MFA Coverage

Some privileged or sensitive access scenarios were not consistently protected by Multi-Factor Authentication.

**Risk:** Increased exposure to credential theft, password spraying, and account takeover attempts.

**Recommended Action:** Enforce MFA for all privileged users and expand coverage based on risk.

---

### 2. Conditional Access Gaps

Conditional Access policies were not fully aligned with common risk-based access scenarios.

**Risk:** Suspicious sign-ins, legacy access, or non-compliant devices may not be properly restricted.

**Recommended Action:** Implement stronger policies for admin access, risky sign-ins, device compliance, and legacy authentication.

---

### 3. Privileged Access Exposure

Privileged role assignments required review to reduce unnecessary standing access.

**Risk:** Excessive privileges increase the impact of account compromise or misuse.

**Recommended Action:** Apply least privilege, review role assignments, and consider just-in-time access where appropriate.

---

### 4. Audit Logging Visibility

Audit logging and retention should be validated to support investigation and monitoring needs.

**Risk:** Limited logs can affect incident response and reduce visibility over administrative actions.

**Recommended Action:** Ensure auditing is enabled and define a retention strategy aligned with investigation requirements.

## Practical Value

This project demonstrates how cloud security findings can be documented, categorized, and converted into clear remediation actions.
