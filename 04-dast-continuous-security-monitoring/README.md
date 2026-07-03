# DAST and Continuous Security Monitoring

## Objective

This project demonstrates how to perform dynamic application security testing and implement continuous security monitoring to identify vulnerabilities that appear during runtime.

The goal is to evaluate application behavior while it is running, detect security weaknesses, and improve visibility through monitoring and reporting.

## Scope

The assessment includes:

- Dynamic Application Security Testing
- Runtime vulnerability detection
- Web application security review
- Security monitoring and alerting concepts
- Log visibility and observability review
- Remediation-focused reporting

## Lab / Assessment Context

This project is based on a controlled lab scenario using a sample web application.

No real customer application, production environment, or sensitive information is included.

## Tools Used

- OWASP ZAP
- Burp Suite Community
- Docker
- GitHub Actions
- Azure Monitor
- Log Analytics
- Microsoft Defender for Cloud

## Methodology

1. Deploy or access a sample web application in a lab environment.
2. Run DAST scans against the application.
3. Identify runtime vulnerabilities and misconfigurations.
4. Review security headers, exposed endpoints, authentication flows, and error handling.
5. Analyze available logs and monitoring coverage.
6. Document findings by severity and impact.
7. Create a remediation plan and monitoring improvement recommendations.

## Results Summary

| Area | Findings | Severity |
|---|---:|---|
| Web Application Security | 4 | High / Medium |
| Security Headers | 3 | Medium |
| Runtime Exposure | 2 | Medium |
| Logging & Monitoring | 3 | Medium / Low |
| Total | 12 | High / Medium / Low |

## Key Findings

- Some security headers were missing or incomplete.
- Runtime testing identified weaknesses not visible in static review.
- Application error handling required improvement.
- Monitoring coverage could be improved for better detection.
- Logs should be centralized and reviewed for suspicious activity.

## Key Outcomes

- Performed runtime security testing using DAST.
- Identified web application security weaknesses.
- Reviewed monitoring and logging visibility.
- Created clear remediation actions.
- Demonstrated the value of continuous testing and monitoring after deployment.

## Reports

- [Executive Summary](reports/executive-summary.md)
- [DAST Report](reports/dast-report.md)
- [Monitoring Review Report](reports/monitoring-review-report.md)
- [Findings Summary](evidence/findings-summary.md)
- [Remediation Plan](remediation/remediation-plan.md)

## Evidence

Evidence such as DAST scan outputs, screenshots, alerts, sample logs, and monitoring diagrams can be added to the `evidence/` folder.

## Disclaimer

This project is part of my cybersecurity portfolio. It does not include real client data, production applications, or confidential monitoring information.
