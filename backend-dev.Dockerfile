FROM node:20-alpine AS base
WORKDIR /usr/api

COPY backend/package.json .
COPY backend/package-lock.json .
COPY backend/drizzle.config.ts .
COPY backend/drizzle ./drizzle
COPY backend/src ./src
RUN npm install

FROM base AS runner
ENV NODE_ENV=development
EXPOSE 8080

CMD [ "npm", "run", "dev" ]