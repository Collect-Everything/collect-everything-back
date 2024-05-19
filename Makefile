.PHONY: start-infra
start-infra:
	docker compose --env-file .env -f ./docker/infra-docker-compose.yml up -d --force-recreate --build

.PHONY: stop-infra
stop-infra:
	docker compose --env-file .env -f ./docker/infra-docker-compose.yml down

.PHONY: start-services
start-services:
	docker compose --env-file ./.env -f ./docker/services-docker-compose.yml up -d --force-recreate --build

.PHONY: stop-services
stop-services:
	docker compose --env-file ./.env -f ./docker/services-docker-compose.yml down
