FROM node:20-alpine
WORKDIR /usr/api

COPY package.json ./
COPY package-lock.json ./
COPY drizzle.config.ts .
COPY drizzle ./drizzle
COPY src ./src
RUN apk add git bash
RUN git clone https://github.com/vishnubob/wait-for-it.git ./wait-for-it
RUN npm install

CMD ["./wait-for-it/wait-for-it.sh", "postgres:5432", "--", "npm", "run", "migrate"]