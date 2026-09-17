# Secure Code, SCA, SAST and Secret Detection

> Hands-on AppSec lab demonstrating how security checks can detect insecure code, vulnerable dependencies, and exposed secrets before deployment.

## Objective

This project focuses on preventing vulnerable dependencies, insecure code patterns, and exposed secrets from reaching production by integrating automated security checks into CI/CD.

## What This Lab Demonstrates

- **SAST** with Semgrep
- **SCA** with Trivy and OWASP Dependency-Check
- **Secret detection** with Gitleaks
- Secure code review and remediation
- CI/CD security gates with GitHub Actions
- Before/after comparison between intentionally vulnerable and remediated code

## Architecture

```text
Push / Pull Request
        |
        +--> Semgrep -----------------> SAST findings
        |
        +--> Gitleaks ----------------> Secret findings
        |
        +--> Trivy -------------------> Dependency / filesystem findings
        |
        +--> OWASP Dependency-Check --> SCA report
        |
        +--> security-gate -----------> Remediated app must pass
```

## Repository Structure

```text
01-secure-code-sca-sast-secret-detection/
├── vulnerable-app/        # Intentionally insecure lab sample
├── secure-app/            # Remediated version
├── rules/semgrep.yml      # Custom SAST rules
├── config/gitleaks.toml   # Synthetic-secret detection rule
└── docs/
    ├── FINDINGS.md        # Expected detections
    └── REMEDIATION.md     # How each finding is fixed
```

The GitHub Actions workflow lives at:

```text
.github/workflows/01-secure-code-security.yml
```

## Vulnerabilities Introduced Intentionally

The vulnerable sample contains only controlled, educational issues:

1. `eval()` to demonstrate dangerous dynamic code execution.
2. A **synthetic** `demo_key_...` value to demonstrate secret detection.
3. `lodash@4.17.15` to demonstrate dependency vulnerability scanning.

The secret is not valid for any service and must never be replaced with a real credential.

## Remediation

The `secure-app/` version:

- replaces `eval()` with explicit allow-listed operations;
- reads the demo API key from `process.env.DEMO_API_KEY`;
- upgrades `lodash` to `4.17.21`;
- includes a small test suite for functional regression checking.

See [`docs/REMEDIATION.md`](docs/REMEDIATION.md) for the complete mapping.

## Pipeline Behavior

The workflow separates two concepts:

### 1. Demonstration scans

The vulnerable application is expected to generate findings. These steps are allowed to report findings without permanently breaking the portfolio workflow.

### 2. Security gate

The remediated application is scanned separately. High or critical findings in the secure version are treated as a gate failure.

This mirrors a practical DevSecOps workflow: detect early, remediate, then enforce policy before deployment.

## Run Locally

### Secure application

```bash
cd secure-app
npm install
npm test
node app.js
```

### Semgrep

```bash
semgrep --config rules/semgrep.yml vulnerable-app
semgrep --config rules/semgrep.yml secure-app
```

### Gitleaks

```bash
gitleaks detect --source vulnerable-app --config config/gitleaks.toml --no-git
```

### Trivy

```bash
trivy fs vulnerable-app
trivy fs secure-app
```

## Expected Outcome

The vulnerable application should produce clear findings, while the remediated application should demonstrate how those findings are resolved and how a CI/CD gate can prevent regressions.

## Notes

This project is part of my hands-on cybersecurity portfolio. It contains no client data, production secrets, real tokens, or production infrastructure credentials.
