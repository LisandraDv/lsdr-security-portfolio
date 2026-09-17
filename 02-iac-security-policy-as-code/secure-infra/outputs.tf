output "resource_group_name" {
  value = azurerm_resource_group.lab.name
}

output "virtual_network_name" {
  value = azurerm_virtual_network.lab.name
}

output "storage_account_name" {
  value = azurerm_storage_account.lab.name
}
