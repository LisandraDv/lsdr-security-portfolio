terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "5.4.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "lab" {
  name     = "${var.prefix}-secure-rg"
  location = var.location

  tags = {
    environment = "lab"
    managed_by  = "terraform"
    security    = "hardened"
  }
}

resource "azurerm_virtual_network" "lab" {
  name                = "${var.prefix}-secure-vnet"
  address_space       = ["10.30.0.0/16"]
  location            = azurerm_resource_group.lab.location
  resource_group_name = azurerm_resource_group.lab.name

  tags = {
    environment = "lab"
    security    = "hardened"
  }
}

resource "azurerm_subnet" "lab" {
  name                 = "workload-subnet"
  resource_group_name  = azurerm_resource_group.lab.name
  virtual_network_name = azurerm_virtual_network.lab.name
  address_prefixes     = ["10.30.1.0/24"]
}

resource "azurerm_network_security_group" "lab" {
  name                = "${var.prefix}-secure-nsg"
  location            = azurerm_resource_group.lab.location
  resource_group_name = azurerm_resource_group.lab.name

  tags = {
    environment = "lab"
    security    = "hardened"
  }
}

resource "azurerm_network_security_rule" "restricted_ssh" {
  name                        = "Allow-SSH-From-Trusted-Network"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "10.10.10.0/24"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.lab.name
  network_security_group_name = azurerm_network_security_group.lab.name
}

resource "azurerm_subnet_network_security_group_association" "lab" {
  subnet_id                 = azurerm_subnet.lab.id
  network_security_group_id = azurerm_network_security_group.lab.id
}

resource "azurerm_storage_account" "lab" {
  #checkov:skip=CKV_AZURE_33:AzureRM 5.x manages Queue logging through azurerm_storage_account_queue_properties.lab where read write and delete logging are enabled.
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.lab.name
  location                 = azurerm_resource_group.lab.location
  account_tier             = "Standard"
  account_replication_type = "GRS"

  public_network_access_enabled   = false
  allow_nested_items_to_be_public = false
  shared_access_key_enabled       = false
  default_to_oauth_authentication = true
  min_tls_version                 = "TLS1_2"

  # Customer-managed encryption key (CMK)
  identity {
    type         = "UserAssigned"
    identity_ids = [var.cmk_user_assigned_identity_id]
  }

  customer_managed_key {
    key_vault_key_id          = var.cmk_key_vault_key_id
    user_assigned_identity_id = var.cmk_user_assigned_identity_id
  }

  blob_properties {
    versioning_enabled = true

    delete_retention_policy {
      days = 30
    }

    container_delete_retention_policy {
      days = 30
    }
  }

  tags = {
    environment = "lab"
    managed_by  = "terraform"
    security    = "hardened"
  }
}


resource "azurerm_storage_account_queue_properties" "lab" {
  storage_account_id = azurerm_storage_account.lab.id

  logging {
    version               = "1.0"
    delete                = true
    read                  = true
    write                 = true
    retention_policy_days = 30
  }

  hour_metrics {
    version               = "1.0"
    retention_policy_days = 30
  }

  minute_metrics {
    version               = "1.0"
    retention_policy_days = 30
  }
}

# Private Endpoint for Azure Storage Blob
resource "azurerm_private_endpoint" "storage_blob" {
  name                = "${var.prefix}-storage-pe"
  location            = azurerm_resource_group.lab.location
  resource_group_name = azurerm_resource_group.lab.name
  subnet_id           = azurerm_subnet.lab.id

  private_service_connection {
    name                           = "${var.prefix}-storage-psc"
    private_connection_resource_id = azurerm_storage_account.lab.id
    subresource_names              = ["blob"]
    is_manual_connection           = false
  }

  tags = {
    environment = "lab"
    managed_by  = "terraform"
    security    = "private-link"
  }
}


