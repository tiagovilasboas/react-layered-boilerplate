variable "tsuru_token" {
  description = "Tsuru Token"
}

## APP

variable "app_name" {
  description = "App Name"
}

variable "env" {
  description = "App Env"
}

variable "app_plan_name" {
  description = "App Plan Name"
  default = ""
}

variable "app_description" {
  description = "App Description"
  default = ""
}

variable "pool_name" {
  description = "Pool Name"
}

variable "team_owner" {
  description = "Team Owner"
}

variable "teams" {
    type = list(string)
    description = "Teams to grant"
    default = []
}

## Service

variable "rpaas_service_name" {
  description = "rpaas Service Name"
}

variable "rpaas_service_instance_name" {
  description = "rpaas Service Instance Name"
}

variable "acl_service_name" {
  description = "ACL Service Name"
}

variable "acl_service_instance_name" {
  description = "ACL Service Instance Name"
}
