# Cloud Security Hardening for Azure and Microsoft 365

## Objective

This project demonstrates how to assess and improve the security posture of a Microsoft cloud environment by reviewing identity, access, monitoring, and baseline hardening controls across Azure and Microsoft 365.

The goal is to identify security gaps, prioritize risks, and provide practical remediation steps that help reduce exposure to cloud and identity-based threats.

## Scope

The assessment includes:

- Microsoft Entra ID security review
- Multi-Factor Authentication coverage
- Conditional Access policy review
- Privileged role assessment
- Azure RBAC review
- Microsoft Secure Score improvement opportunities
- Microsoft Defender for Cloud posture review
- Microsoft Purview audit validation
- Logging and monitoring visibility
- Tenant hardening recommendations

## Lab / Assessment Context

This project is based on a practical cloud security review scenario using Microsoft cloud security best practices.

No real client data, tenant screenshots, production credentials, or confidential information are included.

## Tools Used

- Microsoft Entra ID
- Microsoft Azure
- Microsoft 365 Admin Center
- Microsoft Secure Score
- Microsoft Defender for Cloud
- Microsoft Purview Audit
- Conditional Access
- Azure RBAC
- Log Analytics

## Methodology

1. Review identity and access security controls.
2. Validate MFA coverage for privileged and standard users.
3. Assess Conditional Access policies.
4. Review privileged role assignments and access exposure.
5. Evaluate audit logging and monitoring visibility.
6. Identify Secure Score and hardening improvement opportunities.
7. Classify findings by severity and business impact.
8. Create a prioritized remediation roadmap.

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

- MFA coverage required improvement for critical access scenarios.
- Conditional Access policies were not fully aligned with risk-based access controls.
- Privileged role assignments required review and reduction.
- Audit logging and retention needed validation.
- Secure Score recommendations provided improvement opportunities.
- Monitoring visibility could be strengthened for administrative and identity events.

## Key Outcomes

- Identified cloud and identity security gaps.
- Prioritized findings based on risk and impact.
- Created a remediation roadmap for Microsoft cloud hardening.
- Demonstrated how Azure and Microsoft 365 environments can be reviewed using a structured security assessment approach.
- Provided practical recommendations to improve cloud security posture.

## Reports

- [Executive Summary](reports/executive-summary.md)
- [Cloud Security Review Report](reports/cloud-security-review-report.md)
- [Identity and Access Review](reports/identity-access-review.md)
- [Findings Summary](evidence/findings-summary.md)
- [Remediation Plan](remediation/remediation-plan.md)

## Evidence

Evidence such as sample findings, anonymized screenshots, Secure Score examples, policy review notes, and diagrams can be added to the `evidence/` folder.

## Disclaimer

This project is part of my cybersecurity portfolio. It does not include real client data, production tenant information, credentials, or confidential security configurations.
