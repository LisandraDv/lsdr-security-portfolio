# Azure & Microsoft 365 Cloud Security Hardening Assessment

![Cloud Security](https://img.shields.io/badge/Cloud%20Security-Hardening-B22222)
![Azure](https://img.shields.io/badge/Azure-Security-7A1212)
![Microsoft 365](https://img.shields.io/badge/Microsoft%20365-Security-D94A4A)
![Status](https://img.shields.io/badge/Status-Sample%20Assessment-111111)

## Overview

This project presents a sample cloud security hardening assessment focused on Azure and Microsoft 365 environments.

The objective is to demonstrate how I evaluate cloud security posture, identify identity and access risks, review hardening gaps, and provide clear remediation guidance that helps organizations reduce exposure.

## Assessment Scope

The assessment covers the following areas:

- Microsoft Entra ID security
- Multi-Factor Authentication coverage
- Conditional Access policies
- Privileged role assignments
- Azure RBAC review
- Microsoft Secure Score opportunities
- Microsoft Defender for Cloud posture
- Audit logging and monitoring visibility
- Cloud hardening recommendations

## Methodology

The review follows a structured approach:

1. Review identity and access controls.
2. Validate MFA and Conditional Access coverage.
3. Assess privileged roles and administrative exposure.
4. Review audit logging and monitoring capabilities.
5. Identify hardening gaps and improvement opportunities.
6. Classify findings by severity and business impact.
7. Build a prioritized remediation roadmap.

## Results Summary

| Area | Findings | Severity |
|---|---:|---|
| MFA Coverage | 2 | High |
| Conditional Access | 2 | High / Medium |
| Privileged Access | 2 | Medium |
| Audit Logging | 1 | High |
| Secure Score / Hardening | 3 | Medium |
| Monitoring Visibility | 2 | Medium |
| Total | 12 | High / Medium |

## Key Findings

- MFA coverage required improvement for privileged and sensitive access scenarios.
- Conditional Access policies were not fully aligned with risk-based access controls.
- Privileged role assignments required review and reduction.
- Audit logging and retention needed validation.
- Microsoft Secure Score recommendations provided hardening opportunities.
- Monitoring visibility could be strengthened for administrative and identity events.

## Deliverables

A client receiving this service would get:

- Executive security summary
- Cloud security findings by severity
- Identity and access review
- Microsoft 365 and Azure hardening recommendations
- Remediation roadmap
- Security posture improvement guidance

## Visual Case Study

Visual assets such as a project cover, executive one-pager, risk summary, and remediation roadmap can be found in the `visuals/` folder.

## Reports

- [Executive Summary](reports/executive-summary.md)
- [Cloud Security Review Report](reports/cloud-security-review-report.md)
- [Identity and Access Review](reports/identity-access-review.md)
- [Findings Summary](evidence/findings-summary.md)
- [Remediation Plan](remediation/remediation-plan.md)

## Disclaimer

This project is a sample assessment created for portfolio purposes. It does not include real client data, production tenant information, credentials, screenshots from private environments, or confidential security configurations.
