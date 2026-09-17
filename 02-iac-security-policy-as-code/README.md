# Infrastructure as Code Security and Policy as Code

## Objective

This project demonstrates how Azure infrastructure can be reviewed, hardened, and validated before deployment using Infrastructure as Code security practices.

The lab compares an intentionally insecure Terraform configuration against a hardened version and uses automated security scanning to detect cloud misconfigurations before resources are deployed.

The main objective is to demonstrate a practical **shift-left cloud security workflow** using Terraform, Checkov, Azure Policy, Docker, and GitHub Actions.

---

## Security Engineering Workflow

```text
Terraform Code
      |
      v
Terraform Format / Init / Validate
      |
      v
Checkov IaC Security Scan
      |
      +-----------------------------+
      |                             |
      v                             v
Vulnerable Infrastructure     Secure Infrastructure
11 failed checks              Hardened configuration
      |                             |
      +---------- Remediation ------+
                                    |
                                    v
                           Security Gate
                                    |
                                    v
                          0 blocking findings
```

---

## Project Structure

```text
02-iac-security-policy-as-code/
│
├── vulnerable-infra/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── .terraform.lock.hcl
│
├── secure-infra/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── .terraform.lock.hcl
│
├── policies/
│   ├── deny-public-storage.json
│   ├── require-https-storage.json
│   └── require-secure-transfer.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── FINDINGS.md
│   └── REMEDIATION.md
│
└── evidence/
    └── scan-results/
```

GitHub Actions workflow:

```text
.github/workflows/02-iac-security.yml
```

---

## Technologies Used

- Terraform
- Microsoft Azure
- AzureRM Provider
- Checkov
- Azure Policy
- GitHub Actions
- Docker
- PowerShell
- JSON
- Infrastructure as Code
- Policy as Code

---

## Lab Scenario

The project contains two Terraform environments:

- `vulnerable-infra`
- `secure-infra`

The first environment intentionally contains Azure security weaknesses.

The second environment demonstrates how those weaknesses can be remediated through infrastructure hardening and automated security validation.

This demonstrates an important cloud security principle:

> Valid infrastructure code does not necessarily mean secure infrastructure code.

Both Terraform configurations are syntactically valid.

The difference is their security posture.

---

# Vulnerable Infrastructure

The vulnerable configuration intentionally contains insecure Azure settings that can commonly appear in real cloud environments.

Examples include:

- SSH exposed to the Internet
- Public Storage Account access
- Anonymous blob access
- Shared Key authorization
- Missing Private Endpoint
- Missing soft-delete protection
- Local redundant storage
- Missing Customer Managed Key encryption
- Missing Queue logging controls

The infrastructure still successfully passes:

```bash
terraform validate
```

This shows that Terraform validation confirms configuration correctness, but does not guarantee that the infrastructure follows security best practices.

---

## Initial Checkov Results

The first Checkov scan against `vulnerable-infra` produced:

```text
Passed checks: 15
Failed checks: 11
Skipped checks: 0
```

### Detected Security Findings

| Check | Finding |
|---|---|
| CKV_AZURE_10 | SSH access exposed to the Internet |
| CKV_AZURE_59 | Storage public access enabled |
| CKV_AZURE_190 | Storage blob public access allowed |
| CKV2_AZURE_47 | Anonymous blob access allowed |
| CKV2_AZURE_40 | Shared Key authorization enabled |
| CKV2_AZURE_33 | Storage Account without Private Endpoint |
| CKV2_AZURE_38 | Soft-delete not enabled |
| CKV2_AZURE_41 | SAS expiration policy missing |
| CKV_AZURE_206 | Storage replication control not satisfied |
| CKV2_AZURE_1 | Customer Managed Key not configured |
| CKV_AZURE_33 | Queue service logging not detected |

---

# Secure Infrastructure

The secure version remediates the identified risks and applies additional Azure security controls.

---

## Network Security

The hardened configuration:

- Restricts SSH access to trusted network ranges
- Associates the Network Security Group with the workload subnet
- Disables public Storage Account network access
- Blocks anonymous blob access
- Deploys an Azure Private Endpoint
- Uses Azure Private Link connectivity for Storage

---

## Identity and Authentication

The hardened environment:

- Disables Shared Key authorization
- Uses Entra ID / OAuth authentication by default
- Reduces dependency on Storage Account access keys
- Uses a User Assigned Managed Identity for encryption operations

This supports an identity-first security model.

---

## Data Protection

The secure infrastructure implements:

- TLS 1.2
- Blob public access disabled
- Blob versioning
- Soft-delete
- Blob retention
- Container retention
- Geo-redundant Storage replication
- Customer Managed Key encryption

These controls help protect data confidentiality, integrity, availability, and recoverability.

---

## Customer Managed Key Encryption

The hardened Storage Account is configured to support encryption using a Customer Managed Key.

The implementation references:

```text
cmk_user_assigned_identity_id
cmk_key_vault_key_id
```

These values are provided as Terraform variables.

No real Azure subscription IDs, tenant IDs, credentials, secrets, or Key Vault keys are stored in the repository.

This keeps the lab safe while still demonstrating a production-oriented encryption architecture.

---

## Private Endpoint

The secure infrastructure includes:

```text
azurerm_private_endpoint
```

for Azure Storage Blob access.

This helps ensure that Storage traffic can use private connectivity instead of relying on public Internet exposure.

Architecture:

```text
Virtual Network
      |
      v
Workload Subnet
      |
      v
Private Endpoint
      |
      v
Azure Storage Account
```

---

## Soft Delete and Versioning

The hardened Storage Account enables:

```text
Blob Versioning
Soft Delete
Container Delete Retention
```

Retention is configured for:

```text
30 days
```

These controls provide additional protection against accidental deletion, malicious deletion, and data recovery scenarios.

---

## Storage Replication

The vulnerable environment uses:

```text
LRS
```

The hardened configuration uses:

```text
GRS
```

This improves resilience by maintaining copies of data across geographically separated Azure regions.

---

## Queue Logging

Queue Storage logging is enabled for:

```text
read   = true
write  = true
delete = true
```

Logging retention is also configured.

AzureRM 5.x manages this through:

```text
azurerm_storage_account_queue_properties
```

rather than the historical Queue configuration embedded directly inside the Storage Account resource.

---

# Final Checkov Results

After the remediation process, the hardened infrastructure reached:

```text
Passed checks: 25
Failed checks: 0
Skipped checks: 1
```

The security gate therefore contains:

```text
0 blocking findings
```

---

## Documented Checkov Exception

The skipped rule is:

```text
CKV_AZURE_33
```

The rule checks whether Queue Storage logging is enabled.

However, AzureRM 5.x manages Queue logging using the dedicated resource:

```text
azurerm_storage_account_queue_properties
```

The secure Terraform configuration already enables:

```text
read   = true
write  = true
delete = true
```

Because the security control is implemented but the scanner evaluates the Storage Account resource differently, the rule is suppressed with an explicit justification:

```text
#checkov:skip=CKV_AZURE_33:AzureRM 5.x manages Queue logging through azurerm_storage_account_queue_properties.lab where read write and delete logging are enabled.
```

This avoids weakening the infrastructure simply to satisfy a scanner.

---

# Before vs After

| Security Control | Vulnerable Infrastructure | Secure Infrastructure |
|---|---|---|
| SSH from Internet | Allowed | Restricted |
| Storage public network access | Enabled | Disabled |
| Anonymous blob access | Allowed | Disabled |
| Shared Key authentication | Enabled | Disabled |
| Entra ID / OAuth authentication | Not preferred | Preferred |
| Private Endpoint | Missing | Configured |
| Soft-delete | Missing | Enabled |
| Blob versioning | Missing | Enabled |
| Storage replication | LRS | GRS |
| Customer Managed Key | Missing | Configured |
| Managed Identity | Missing | Configured |
| Queue logging | Missing | Enabled |
| Security tags | Missing | Configured |
| TLS | TLS 1.2 | TLS 1.2 enforced |

---

# Azure Policy as Code

The project also includes custom Azure Policy definitions used to demonstrate preventive cloud governance.

Policies are stored under:

```text
policies/
```

---

## Deny Public Storage Access

File:

```text
policies/deny-public-storage.json
```

This policy evaluates:

```text
Microsoft.Storage/storageAccounts/publicNetworkAccess
```

Storage Accounts are denied when public network access is not disabled.

Conceptually:

```text
Storage Account
      |
      v
publicNetworkAccess
      |
      +--> Disabled --> Allowed
      |
      +--> Other -----> Denied
```

---

## Require HTTPS

File:

```text
policies/require-https-storage.json
```

This policy requires:

```text
Microsoft.Storage/storageAccounts/supportsHttpsTrafficOnly
```

to be:

```text
true
```

Storage Accounts that do not enforce HTTPS-only communication are denied.

---

## Require TLS 1.2

File:

```text
policies/require-secure-transfer.json
```

This policy evaluates:

```text
Microsoft.Storage/storageAccounts/minimumTlsVersion
```

and requires:

```text
TLS1_2
```

This helps prevent Storage Accounts from accepting weaker TLS configurations.

---

# Policy as Code Model

```text
Terraform Infrastructure
        |
        v
Infrastructure Security
        |
        +----------------------+
        |                      |
        v                      v
Checkov                 Azure Policy
Detection               Prevention
        |                      |
        +----------+-----------+
                   |
                   v
              Secure Cloud
```

Checkov provides static Infrastructure as Code security analysis.

Azure Policy represents preventive governance controls that can be applied to Azure environments.

Together they demonstrate both:

```text
Detection + Prevention
```

---

# CI/CD Security Pipeline

The project includes an automated GitHub Actions workflow:

```text
.github/workflows/02-iac-security.yml
```

The workflow runs when changes are pushed to Project 02 or when a Pull Request modifies the project.

---

## Pipeline Architecture

```text
Push / Pull Request
        |
        v
Terraform Validation
        |
        +------------------------------+
        |                              |
        v                              v
vulnerable-infra                secure-infra
        |                              |
        v                              v
terraform fmt                   terraform fmt
terraform init                  terraform init
terraform validate              terraform validate
        |                              |
        +---------------+--------------+
                        |
                        v
                 Checkov Scanning
                        |
          +-------------+-------------+
          |                           |
          v                           v
Vulnerable Scan                Secure Scan
Expected Findings              Security Gate
Non-Blocking                   Blocking
          |                           |
          +-------------+-------------+
                        |
                        v
             Azure Policy Validation
                        |
                        v
                 Pipeline Success
```

---

# GitHub Actions Jobs

The workflow executes the following jobs:

```text
Terraform Validate - vulnerable-infra
Terraform Validate - secure-infra
Checkov - Vulnerable Infrastructure
Checkov - Secure Infrastructure Gate
Azure Policy as Code Validation
```

The final pipeline completed successfully.

---

## Terraform Validation

GitHub Actions automatically executes:

```bash
terraform fmt -check -recursive
terraform init -backend=false -input=false
terraform validate -no-color
```

against both Terraform environments.

This confirms that both the vulnerable and hardened configurations remain valid Terraform.

---

## Vulnerable Infrastructure Scan

The vulnerable environment is intentionally allowed to generate security findings.

```text
vulnerable-infra
       |
       v
Checkov Scan
       |
       v
Expected Findings
       |
       v
Non-Blocking
```

This job demonstrates detection capabilities without intentionally breaking the entire pipeline.

---

## Secure Infrastructure Security Gate

The secure environment is treated as a blocking security gate.

```text
secure-infra
       |
       v
Checkov Scan
       |
       +----------------------+
       |                      |
       v                      v
No Findings              New Finding
       |                      |
       v                      v
Pipeline Continues       Pipeline Fails
```

This helps prevent future insecure Terraform changes from silently entering the hardened configuration.

---

## Azure Policy Validation

The GitHub Actions workflow also validates every JSON policy definition.

The pipeline verifies:

- Valid JSON syntax
- `displayName`
- Policy mode
- `policyRule.if`
- `policyRule.then`
- `deny` effect

This means invalid Policy as Code definitions can be detected during CI rather than later during deployment.

---

# Security Results

The project demonstrates a complete Infrastructure as Code security lifecycle:

```text
Insecure Terraform
       |
       v
Terraform Validation
       |
       v
Static Security Analysis
       |
       v
11 Security Findings
       |
       v
Risk Analysis
       |
       v
Infrastructure Hardening
       |
       v
Private Connectivity
       |
       v
Identity Hardening
       |
       v
Data Protection
       |
       v
Customer Managed Encryption
       |
       v
Policy as Code
       |
       v
Automated Security Gate
       |
       v
0 Blocking Findings
```

---

# Key Outcomes

This project demonstrates how cloud security controls can be integrated into the infrastructure development lifecycle.

Key outcomes include:

- Detected Azure security misconfigurations before deployment
- Demonstrated the difference between valid Terraform and secure Terraform
- Reduced Checkov findings from 11 to 0 blocking findings
- Implemented Azure Private Endpoint connectivity
- Disabled Storage public network access
- Disabled anonymous blob access
- Removed Shared Key dependency
- Preferred Entra ID authentication
- Added User Assigned Managed Identity
- Added Customer Managed Key encryption
- Enabled soft-delete
- Enabled blob versioning
- Added retention controls
- Improved Storage resilience using GRS
- Enabled Queue read, write, and delete logging
- Added custom Azure Policy definitions
- Automated Terraform validation
- Automated Checkov security scanning
- Added a blocking IaC security gate
- Automated Policy as Code validation
- Created a repeatable shift-left cloud security workflow

---

# Security Principles Demonstrated

The lab demonstrates concepts including:

- Shift-left security
- Infrastructure as Code
- Policy as Code
- Zero Trust principles
- Least privilege
- Identity-first security
- Private connectivity
- Defense in depth
- Encryption at rest
- Customer Managed Keys
- Secure-by-default infrastructure
- Cloud governance
- Automated security gates
- Continuous security validation
- Infrastructure hardening
- Security automation

---

# Documentation

Additional technical documentation is available in:

- [Architecture](docs/ARCHITECTURE.md)
- [Security Findings](docs/FINDINGS.md)
- [Remediation Plan](docs/REMEDIATION.md)

---

# Important Note

This project performs security validation and static Infrastructure as Code analysis.

The GitHub Actions pipeline does **not** deploy Azure resources.

No Azure credentials are required by the CI/CD workflow because the project uses:

```text
terraform init
terraform validate
Checkov
Policy validation
```

instead of:

```text
terraform apply
```

This allows the project to demonstrate Azure infrastructure security without creating cloud resources or generating Azure consumption costs.

---

# Disclaimer

This project is a controlled cybersecurity lab created for educational and portfolio purposes.

No production subscriptions, client environments, real credentials, secrets, tenant identifiers, subscription identifiers, or confidential infrastructure configurations are included.

The `vulnerable-infra` configuration is intentionally insecure and should **not** be deployed to a production environment.

The secure configuration demonstrates defensive cloud security patterns but should still be adapted to the architecture, compliance requirements, threat model, and operational requirements of a real environment.
