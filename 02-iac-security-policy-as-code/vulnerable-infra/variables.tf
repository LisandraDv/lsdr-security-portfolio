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
  description = "Storage account name for the intentionally vulnerable lab."
  type        = string
  default     = "stlsdrvulnlab01"
}
