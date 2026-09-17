# Expected Security Findings

This document records the findings intentionally introduced into `vulnerable-app/` so the security pipeline has something safe and repeatable to detect.

| ID | Area | Expected Finding | Detector | Severity | Remediated In |
|---|---|---|---|---|---|
| F-001 | SAST | Use of `eval()` with attacker-controlled input potential | Semgrep | High | `secure-app/app.js` |
| F-002 | Secrets | Hardcoded synthetic `demo_key_...` value | Gitleaks / Semgrep | High | `secure-app/app.js` |
| F-003 | SCA | Outdated `lodash` dependency (`4.17.15`) | Trivy / OWASP Dependency-Check | High/Critical depending on database | `secure-app/package.json` |

## Interpretation

The vulnerable application is intentionally expected to produce findings. Those demo checks are configured so they can report evidence without making the entire portfolio repository unusable.

The `security-gate` job scans the remediated application and is intended to pass. That job represents the control that would be enforced before deployment in a real CI/CD pipeline.

## Safety Note

The secret is synthetic, clearly labeled for demonstration, and is not valid for any external service. No client data, production credentials, tokens, or real infrastructure secrets are included.
