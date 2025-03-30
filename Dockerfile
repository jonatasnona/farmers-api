# syntax=docker/dockerfile:1

########################################
# BUILD BASE
########################################

FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=development

COPY --chown=node:node package*.json ./

RUN npm ci

COPY . .

RUN npm run build

########################################
# LOCAL DEVELOPMENT
########################################

FROM node:20-alpine AS development

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=development

COPY --chown=node:node --from=base /app/ .

CMD ["npm", "run", "start:dev"]

########################################
# BUILD FOR PRODUCTION
########################################

FROM node:20-alpine AS build

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node package*.json .

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY --chown=node:node --from=base /app/dist ./dist

CMD ["npm", "run", "start:prod"]
