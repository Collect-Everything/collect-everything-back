FROM node:21-alpine3.17 AS base


FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN yarn global add turbo@^2.0.14

ARG SERVICE_NAME

COPY . .
RUN turbo prune ${SERVICE_NAME} --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .env .env

RUN yarn turbo build --filter=${SERVICE_NAME}...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

RUN mkdir -p /app/logs
RUN chmod 777 /app/logs
RUN chown -R expressjs:expressjs /app/logs

USER expressjs

COPY --from=installer /app .

CMD node apps/${SERVICE_NAME}/dist/index.js
