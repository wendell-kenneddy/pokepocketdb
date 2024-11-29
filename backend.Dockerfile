FROM node:20-alpine AS base
WORKDIR /usr/api

COPY backend/package.json .
COPY backend/package-lock.json .
COPY backend/drizzle.config.ts .
COPY backend/drizzle ./drizzle
COPY backend/src ./src
RUN npm install

FROM base AS builder
WORKDIR /usr/api

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/api

COPY --from=builder /usr/api/dist ./dist
COPY --from=builder /usr/api/package.json .
COPY --from=builder /usr/api/drizzle.config.ts .
RUN npm install --production
ENV NODE_ENV=production
EXPOSE 3333

CMD [ "npm", "run", "start" ]