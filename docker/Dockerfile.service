FROM base-image:latest AS base

ARG SERVICE_NAME

WORKDIR /app

COPY . .

RUN yarn turbo build --filter=${SERVICE_NAME}...

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

RUN mkdir -p /app/logs
RUN chmod 777 /app/logs
RUN chown -R expressjs:expressjs /app/logs

USER expressjs

COPY --from=base /app .

CMD node apps/${SERVICE_NAME}/dist/index.js
