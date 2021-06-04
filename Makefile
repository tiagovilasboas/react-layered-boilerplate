help:
	@echo "---------------- HELP ---------------------"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\://'| sed -e 's/##//'

terraform-apply-%:	## Aplica receita terraform
	cd infra/terraform/ && \
	terraform init && \
	terraform apply -auto-approve \
	-var-file="$*/public.tfvars" \
	-state="$*/terraform.tfstate"

terraform-plan-%:	## Checa receita terraform
	cd infra/terraform/ && \
	terraform init && \
	terraform plan \
	-var-file="$*/public.tfvars" \
	-state="$*/terraform.tfstate"

terraform-refresh-%:	## Refresh na receita terraform
	cd infra/terraform/ && \
	terraform init && \
	terraform refresh \
	-var-file="$*/public.tfvars" \
	-state="$*/terraform.tfstate"

rpaas-deploy-%: ## Faz o deploy do rpaas (qa|dev|prod)
	@$(eval ENV := $*)
	@cd infra/rpaas && tsuru deploy rpaas-${ENV} apply

rpaas-check-%: ## Faz a verificação do rpaas (qa|dev|prod)
	@$(eval ENV := $*)
	@cd infra/rpaas && tsuru deploy rpaas-${ENV} check

deploy-%:	## Faz o deploy da app
	@$(eval ENV := $*)
	@tsuru app-deploy -a cartola-kyc-${ENV} .