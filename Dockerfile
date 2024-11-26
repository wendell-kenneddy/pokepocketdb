FROM node:20-alpine AS builder
WORKDIR /usr/api

COPY package.json ./
COPY package-lock.json ./
COPY drizzle.config.ts .
COPY src ./src
RUN npm install
RUN npm run build

FROM node:21-alpine
WORKDIR /usr/api

COPY --from=builder /usr/api/dist ./dist
COPY --from=builder /usr/api/package.json ./
COPY drizzle.config.ts .
COPY drizzle ./drizzle
RUN npm install --production
ENV NODE_ENV=production

EXPOSE 3333

CMD [ "npm", "run", "start" ]