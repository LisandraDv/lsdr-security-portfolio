# Security Findings

## Executive Summary

The initial Terraform configuration was syntactically valid but contained multiple Azure security weaknesses.

Checkov identified:

- 15 passed checks
- 11 failed checks

The hardened configuration was progressively remediated until reaching:

- 25 passed checks
- 0 failed checks
- 1 documented scanner compatibility exception

## Initial Findings

| Check | Finding | Risk | Remediation |
|---|---|---|---|
| CKV_AZURE_10 | SSH exposed to the Internet | High | Restrict SSH to trusted network ranges |
| CKV_AZURE_59 | Storage public access allowed | High | Disable public network access |
| CKV_AZURE_190 | Blob public access allowed | High | Disable nested public items |
| CKV2_AZURE_47 | Anonymous blob access permitted | High | Block anonymous access |
| CKV2_AZURE_40 | Shared Key authorization enabled | High | Disable Shared Key and prefer Entra ID |
| CKV2_AZURE_33 | No Private Endpoint | High | Configure Azure Private Link |
| CKV2_AZURE_38 | Soft-delete not enabled | Medium | Enable retention and soft-delete |
| CKV2_AZURE_41 | SAS expiration policy missing | Medium | Configure SAS expiration policy |
| CKV_AZURE_206 | Storage replication insufficient | Medium | Use geo-redundant replication |
| CKV2_AZURE_1 | Customer Managed Key missing | Medium | Configure CMK encryption |
| CKV_AZURE_33 | Queue logging not detected | Medium | Configure Queue logging |

## Security Improvements

The hardened Terraform configuration implements:

- Restricted SSH access
- Disabled public network access
- Disabled anonymous blob access
- Disabled Shared Key authorization
- Entra ID authentication preference
- TLS 1.2
- Geo-redundant storage replication
- Soft-delete and retention
- Private Endpoint
- Customer Managed Key encryption
- User Assigned Managed Identity
- Queue read, write and delete logging
- Security-focused resource tagging

## Scanner Compatibility Note

Checkov rule `CKV_AZURE_33` evaluates Queue logging directly against the Storage Account resource.

AzureRM 5.x manages Queue logging using the separate:

`azurerm_storage_account_queue_properties`

resource.

The secure configuration enables read, write and delete Queue logging through this resource.

The Checkov rule is therefore explicitly suppressed with a documented justification rather than weakening or duplicating the Terraform configuration.
