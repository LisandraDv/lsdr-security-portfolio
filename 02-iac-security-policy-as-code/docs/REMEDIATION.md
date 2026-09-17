# Remediation Plan

## Objective

Reduce Azure infrastructure risk by applying security controls before deployment.

## Remediation Actions

### Network Security

Initial state:

- SSH allowed from any Internet source.

Remediation:

- Restrict SSH access to trusted internal network ranges.
- Associate the NSG directly with the workload subnet.

### Storage Network Exposure

Initial state:

- Public network access enabled.
- Blob objects could be configured for public access.

Remediation:

- Disable Storage public network access.
- Disable nested item public access.
- Deploy a Private Endpoint for Blob Storage.

### Identity and Authentication

Initial state:

- Shared Key authorization enabled.
- OAuth authentication not preferred.

Remediation:

- Disable Shared Key authorization.
- Enable Entra ID / OAuth authentication by default.
- Use a User Assigned Managed Identity for CMK encryption.

### Data Protection

Initial state:

- Local redundant storage.
- No soft-delete configuration.
- No customer-managed encryption key.

Remediation:

- Use geo-redundant storage replication.
- Enable soft-delete and retention.
- Configure Customer Managed Key encryption.

### Logging and Monitoring

Initial state:

- Queue service logging was not configured.

Remediation:

- Enable read logging.
- Enable write logging.
- Enable delete logging.
- Configure log retention.

## Outcome

The hardened configuration reduced the Checkov results from:

11 failed checks

to:

0 failed checks

with one documented scanner compatibility suppression.
