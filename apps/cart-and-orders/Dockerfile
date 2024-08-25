FROM collect/turbo-base:latest AS builder
WORKDIR /app

COPY . .
RUN turbo prune cart-and-orders --docker

FROM collect/turbo-base:latest AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .env .env

RUN yarn turbo build --filter=cart-and-orders...

FROM collect/turbo-base:latest AS runner
WORKDIR /app

COPY --from=installer /app .

CMD node apps/cart-and-orders/dist/index.js
