.PHONY: start-db
start-db:
	docker compose --env-file .env -f ./docker/db-docker-compose.yml up -d --force-recreate --build

.PHONY: stop-db
stop-db:
	docker compose --env-file .env -f ./docker/db-docker-compose.yml down

.PHONY: start-services
start-services:
	docker compose --env-file ./.env -f ./docker/services-docker-compose.yml up -d --force-recreate --build

.PHONY: stop-services
stop-services:
	docker compose --env-file ./.env -f ./docker/services-docker-compose.yml down
