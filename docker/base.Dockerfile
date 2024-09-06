FROM node:21-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn install 
