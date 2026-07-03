# Infrastructure as Code Security and Policy as Code

## Objective

This project demonstrates how to review and validate cloud infrastructure definitions before deployment, ensuring that Azure resources are created with secure configurations from the beginning.

The goal is to reduce cloud misconfigurations by applying Infrastructure as Code security checks and Policy as Code controls before resources are provisioned.

## Scope

The assessment includes:

- Terraform security review
- Infrastructure as Code misconfiguration detection
- Policy as Code validation
- Azure resource hardening checks
- Preventive security controls before deployment

## Lab / Assessment Context

This project is based on a controlled lab scenario where Azure infrastructure is defined using Infrastructure as Code.

No production subscriptions, client environments, real credentials, or confidential information are included.

## Tools Used

- Terraform
- Checkov
- tfsec
- Azure Policy
- GitHub Actions
- Microsoft Azure

## Methodology

1. Create or review Terraform templates for Azure resources.
2. Scan the IaC files for insecure configurations.
3. Identify risks such as public exposure, weak network controls, missing encryption, or insufficient logging.
4. Validate security requirements using Policy as Code.
5. Document findings by severity.
6. Create a remediation plan to improve the security posture before deployment.

## Results Summary

| Area | Findings | Severity |
|---|---:|---|
| Network Security | 3 | High / Medium |
| Storage Security | 2 | Medium |
| Logging & Monitoring | 2 | Medium |
| Encryption | 1 | Medium |
| Policy Compliance | 2 | Medium / Low |
| Total | 10 | High / Medium / Low |

## Key Findings

- Some resources were missing secure network restrictions.
- Logging and diagnostic settings were not consistently enabled.
- Storage security controls required improvement.
- Policy validation helped identify non-compliant resource definitions before deployment.
- Security checks were integrated into the development workflow.

## Key Outcomes

- Detected cloud misconfigurations before deployment.
- Improved infrastructure security through automated validation.
- Created a repeatable IaC security review process.
- Reduced risk of insecure Azure resources being deployed.
- Produced remediation guidance for identified issues.

## Reports

- [Executive Summary](reports/executive-summary.md)
- [IaC Security Report](reports/iac-security-report.md)
- [Policy as Code Report](reports/policy-as-code-report.md)
- [Findings Summary](evidence/findings-summary.md)
- [Remediation Plan](remediation/remediation-plan.md)

## Evidence

Evidence such as scan results, sample policy outputs, screenshots, and configuration examples can be added to the `evidence/` folder.

## Disclaimer

This project is part of my cybersecurity portfolio. It does not include real client data, production credentials, or confidential cloud configurations.
