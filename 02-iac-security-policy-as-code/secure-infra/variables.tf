variable "location" {
  description = "Azure region used by the lab."
  type        = string
  default     = "East US"
}

variable "prefix" {
  description = "Prefix used for lab resource names."
  type        = string
  default     = "lsdr-iac-lab"
}

variable "storage_account_name" {
  description = "Storage account name for the hardened lab."
  type        = string
  default     = "stlsdrsecurelab01"
}

variable "cmk_user_assigned_identity_id" {
  description = "Resource ID of the centrally managed User Assigned Managed Identity used for Storage CMK encryption."
  type        = string
}

variable "cmk_key_vault_key_id" {
  description = "Versionless resource ID of the Azure Key Vault key used as the customer-managed encryption key."
  type        = string
}
