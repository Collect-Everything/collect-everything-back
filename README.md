# Mono répo des services back de l'application Collect&verything

## Prérequis

1. Installer les dépendances

```bash
yarn install
```

2. Lancer la DB
   Si vous avez make d'installé:

```bash
make start-infra
```

Sinon:

```bash
 docker compose --env-file .env -f ./docker/infra-docker-compose.yml up -d --force-recreate --build
```

3. Setup la DB

```bash
yarn db:push
```

4. Build les packages

```bash
yarn build:packages
```

5. Démarrer le projet

```bash
yarn dev --concurrency 20
```

**Option pour pc lent:**
Ouvrir deux terminaux, dans le premier lancer une gateway
avec une commande comme `yarn dev:showcase-gateway` et dans
le deuxième lancer le service sur lequel vous voulez travailler
par exemple `yarn dev:companies`
