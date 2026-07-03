# Container and Kubernetes Security

## Objective

This project demonstrates how to assess and improve the security posture of container images and Kubernetes workloads before and after deployment.

The goal is to identify vulnerable container images, insecure configurations, excessive privileges, and Kubernetes hardening gaps that could increase risk in cloud-native environments.

## Scope

The assessment includes:

- Docker image vulnerability scanning
- Container configuration review
- Kubernetes manifest security review
- AKS security hardening considerations
- Runtime security recommendations
- Registry and image management best practices

## Lab / Assessment Context

This project is based on a controlled lab environment using containerized workloads and Kubernetes configuration files.

No real production cluster, customer data, or sensitive credentials are included.

## Tools Used

- Docker
- Kubernetes
- Azure Kubernetes Service
- Trivy
- Kubesec
- Checkov
- kube-score
- GitHub Actions

## Methodology

1. Build or review sample Docker images.
2. Scan container images for known vulnerabilities.
3. Review Dockerfiles for insecure practices.
4. Analyze Kubernetes manifests for security misconfigurations.
5. Identify excessive permissions, missing resource limits, and weak workload isolation.
6. Document findings and prioritize remediation actions.
7. Provide hardening recommendations for container and Kubernetes environments.

## Results Summary

| Area | Findings | Severity |
|---|---:|---|
| Image Vulnerabilities | 5 | High / Medium |
| Dockerfile Security | 3 | Medium |
| Kubernetes Manifests | 4 | High / Medium |
| Workload Hardening | 3 | Medium |
| Total | 15 | High / Medium |

## Key Findings

- Some container images included vulnerable packages.
- Dockerfile security best practices were not fully applied.
- Kubernetes workloads were missing resource limits.
- Some workloads were running with excessive privileges.
- Security context controls required improvement.
- Image scanning should be integrated into the CI/CD process.

## Key Outcomes

- Identified vulnerable container images.
- Detected Kubernetes workload misconfigurations.
- Documented hardening recommendations for AKS and Kubernetes.
- Created a remediation plan focused on practical risk reduction.
- Demonstrated how container security can be integrated into DevSecOps workflows.

## Reports

- [Executive Summary](reports/executive-summary.md)
- [Container Security Report](reports/container-security-report.md)
- [Kubernetes Security Report](reports/kubernetes-security-report.md)
- [Findings Summary](evidence/findings-summary.md)
- [Remediation Plan](remediation/remediation-plan.md)

## Evidence

Evidence such as vulnerability scan outputs, Kubernetes manifest reviews, screenshots, and configuration examples can be added to the `evidence/` folder.

## Disclaimer

This project is part of my cybersecurity portfolio. It does not include real client data, production clusters, or confidential environment information.
