FROM node:20-alpine AS base
WORKDIR /usr/api

COPY package.json .
COPY package-lock.json .
COPY drizzle.config.ts .
COPY drizzle ./drizzle
COPY src ./src
RUN npm install

FROM base AS builder
WORKDIR /usr/api

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/api

COPY --from=builder /usr/api/dist ./dist
COPY --from=builder /usr/api/package.json ./
COPY drizzle.config.ts .
RUN npm install --production
EXPOSE 3333
ENV NODE_ENV=production

CMD [ "npm", "run", "start" ]