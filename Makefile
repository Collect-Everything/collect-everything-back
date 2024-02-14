.PHONY: start-db
start-db:
	docker compose --env-file .env up -d --force-recreate --build
