# LSDR Security Lab

### Cloud Security · AppSec · DevSecOps · Infrastructure Security

Hands-on cybersecurity portfolio focused on building, testing, hardening, and validating security controls across code, cloud, infrastructure, and CI/CD workflows.

[![Security Pipeline](https://github.com/LisandraDv/lsdr-security-portfolio/actions/workflows/01-secure-code-security.yml/badge.svg)](https://github.com/LisandraDv/lsdr-security-portfolio/actions/workflows/01-secure-code-security.yml)
![Cloud Security](https://img.shields.io/badge/Cloud-Security-blue)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Security%20Automation-purple)
![AppSec](https://img.shields.io/badge/AppSec-SAST%20%7C%20SCA%20%7C%20DAST-orange)
![Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4?logo=microsoftazure&logoColor=white)

**[View Portfolio](https://lisandradv.github.io/lsdr-security-portfolio/)** ·
**[GitHub Profile](https://github.com/LisandraDv)**

---

## About This Lab

**LSDR Security Lab** is a practical cybersecurity portfolio built to demonstrate how security controls can be integrated into real engineering workflows.

The projects cover the security lifecycle from **prevention and secure design** to **automated detection, vulnerability analysis, remediation, validation, and continuous monitoring**.

Rather than presenting security only as documentation, each lab is designed around implementation, tooling, findings, and remediation evidence.

---

## Security Engineering Workflow

```text
        CODE / INFRASTRUCTURE
                 │
                 ▼
        ┌─────────────────┐
        │ Security Checks │
        └────────┬────────┘
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
     SAST       SCA      Secrets
      │          │          │
      └──────────┼──────────┘
                 ▼
          FINDINGS / RISK
                 │
                 ▼
            REMEDIATION
                 │
                 ▼
             RE-SCAN
                 │
                 ▼
          SECURITY GATE
                 │
           ┌─────┴─────┐
           ▼           ▼
        PASS ✅      BLOCK ❌
```

---

## Security Projects

| # | Project | Security Areas | Key Technologies |
|---|---|---|---|
| **01** | [Secure Code, SCA, SAST & Secret Detection](./01-secure-code-sca-sast-secret-detection/) | AppSec, SAST, SCA, secrets, CI/CD security gates | Semgrep, Gitleaks, Trivy, OWASP Dependency-Check, GitHub Actions |
| **02** | [Infrastructure as Code Security & Policy as Code](./02-iac-security-policy-as-code/) | IaC scanning, policy enforcement, cloud misconfiguration prevention | Terraform, Checkov, tfsec, policy-as-code |
| **03** | [Container & Kubernetes Security](./03-container-kubernetes-security/) | Image scanning, container security, Kubernetes workload security | Docker, Trivy, Kubernetes security controls |
| **04** | [DAST & Continuous Security Monitoring](./04-dast-continuous-security-monitoring/) | Runtime testing, vulnerability discovery, security monitoring | DAST, logging, monitoring, security findings |
| **05** | [Cloud Security Hardening — Azure & Microsoft 365](./05-cloud-security-hardening-azure-m365/) | Identity, endpoint, cloud posture, access control, monitoring | Azure, Entra ID, Defender, Intune, Microsoft 365 |

---

## Featured Lab — Secure Code Security Pipeline

The first project demonstrates a complete **DevSecOps security validation workflow** using an intentionally vulnerable application and a remediated version.

### Security Controls

- **SAST** with Semgrep
- **Software Composition Analysis** with Trivy and OWASP Dependency-Check
- **Secret detection** with Gitleaks
- Functional regression testing
- Automated GitHub Actions pipeline
- HIGH / CRITICAL vulnerability gate
- Vulnerable vs. remediated code comparison
- Security findings and remediation documentation

### Pipeline

```text
Push / Pull Request
        │
        ├──► Semgrep ───────────────► SAST findings
        │
        ├──► Gitleaks ──────────────► Secret findings
        │
        ├──► Trivy ─────────────────► Dependency findings
        │
        ├──► OWASP Dependency-Check ► SCA report
        │
        └──► Security Gate
                    │
              HIGH / CRITICAL?
                │         │
               YES       NO
                │         │
             BLOCK ❌   PASS ✅
```

The lab demonstrates an important DevSecOps principle: **code can be functionally correct while still failing a security gate because of vulnerable dependencies or other security findings.**

---

## Security Toolbox

| Area | Technologies & Practices |
|---|---|
| **Cloud Security** | Microsoft Azure, Microsoft 365, Defender, Entra ID, cloud security hardening |
| **Identity & Access** | IAM, MFA, Conditional Access, RBAC, PIM, SSO, Zero Trust |
| **Endpoint Security** | Intune, Defender for Endpoint, BitLocker, LAPS, ASR, EDR |
| **Application Security** | SAST, SCA, DAST, secure code review, secret detection |
| **DevSecOps** | GitHub Actions, security gates, CI/CD security automation |
| **Infrastructure Security** | Terraform, IaC scanning, policy-as-code, secure configuration |
| **Containers** | Docker, container image scanning, Kubernetes security |
| **Security Monitoring** | Microsoft Sentinel, Defender XDR, logging, findings analysis |
| **Automation** | PowerShell, Bash, Python, GitHub Actions |

---

## Lab Methodology

Each project follows a security-focused engineering cycle:

```text
Identify
   ↓
Build / Configure
   ↓
Scan
   ↓
Detect
   ↓
Analyze
   ↓
Remediate
   ↓
Validate
   ↓
Document
```

The objective is not only to identify vulnerabilities, but to demonstrate how security findings are **understood, prioritized, remediated, and verified**.

---

## Repository Structure

```text
lsdr-security-portfolio/
│
├── .github/
│   └── workflows/
│       └── 01-secure-code-security.yml
│
├── 01-secure-code-sca-sast-secret-detection/
├── 02-iac-security-policy-as-code/
├── 03-container-kubernetes-security/
├── 04-dast-continuous-security-monitoring/
├── 05-cloud-security-hardening-azure-m365/
│
├── education-and-certifications/
├── assests/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## What This Portfolio Demonstrates

This repository is designed to demonstrate practical experience with:

- Security automation in CI/CD
- Secure software development practices
- Vulnerability detection and remediation
- Cloud and identity security
- Infrastructure hardening
- Security validation before deployment
- Security monitoring and reporting
- DevSecOps engineering workflows
- Technical security documentation

---

## Portfolio Goal

My goal with this portfolio is to demonstrate practical cybersecurity engineering through **hands-on labs, security controls, automated validation, findings, remediation, and technical documentation**.

The projects are structured to show both the technical implementation and the reasoning behind security decisions.

---

## Disclaimer

All labs and examples in this repository are created for **educational, research, and portfolio purposes**.

No real client data, production credentials, production secrets, or confidential organizational information are included. Any vulnerable code, exposed tokens, or insecure configurations used in the labs are intentionally created and isolated for demonstration purposes.

---

<div align="center">

### Secure by design. Validate by automation. Improve by remediation.

**LSDR Security Lab**

</div>
