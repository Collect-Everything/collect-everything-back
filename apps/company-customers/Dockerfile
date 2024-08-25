FROM collect/turbo-base:latest AS builder
WORKDIR /app

COPY . .
RUN turbo prune company-customers --docker

FROM collect/turbo-base:latest AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .env .env

RUN yarn turbo build --filter=company-customers...

FROM collect/turbo-base:latest AS runner
WORKDIR /app

COPY --from=installer /app .

CMD node apps/company-customers/dist/index.js
