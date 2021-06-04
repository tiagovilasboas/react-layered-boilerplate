provider "tsuru" {
    tsuru_target_url = "https://tsuru.globoi.com"
    tsuru_token = var.tsuru_token
}

resource "tsuru_app" "app" {
    app_name = var.app_name
    app_platform = "nodejs"
    team_owner = var.team_owner
    description = var.app_description
    pool_name = var.pool_name
    plan_name = var.app_plan_name
}

### RPaaS ###

resource "tsuru_service_instance" "cartola_sync_rpaas_service_instance" {
    service_name = var.rpaas_service_name
    service_instance_name = var.rpaas_service_instance_name
    plan_name = "tiny"
    team_owner = var.team_owner
}

resource "tsuru_service_instance_bind" "cartola_sync_rpaas_service_instance_bind" {
    service_name = tsuru_service_instance.cartola_sync_rpaas_service_instance.service_name
    service_instance_name = tsuru_service_instance.cartola_sync_rpaas_service_instance.service_instance_name
    app_name = tsuru_app.app.app_name
    depends_on = [tsuru_service_instance.cartola_sync_rpaas_service_instance]
}

### ACL ###
resource "tsuru_service_instance" "cartola_sync_api_acl_service_instance" {
    service_name = var.acl_service_name
    service_instance_name = var.acl_service_instance_name
    team_owner = var.team_owner
}

resource "tsuru_service_instance_bind" "cartola_sync_api_acl_service_instance_bind" {
    service_name = tsuru_service_instance.cartola_sync_api_acl_service_instance.service_name
    service_instance_name = tsuru_service_instance.cartola_sync_api_acl_service_instance.service_instance_name
    app_name = var.app_name
    depends_on = [tsuru_service_instance.cartola_sync_api_acl_service_instance]
}
