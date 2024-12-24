import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env } from "./lib/env";
import { redisClient } from "./lib/redis";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import { authRouter } from "./modules/auth/auth-router";
import { cardsRouter } from "./modules/cards/cards-router";
import { expansionsRouter } from "./modules/expansions/expansions-router";
import { matchResultsRouter } from "./modules/matches/match-results-router";
import { rolesRouter } from "./modules/roles/roles-router";
import { usersRouter } from "./modules/users/users-router";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.ORIGIN }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  const limiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    limit: 50
  });
  app.use(limiter);
}

app.use(expansionsRouter);
app.use(cardsRouter);
app.use(matchResultsRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(rolesRouter);
app.use(errorHandlerMiddleware);

redisClient
  .connect()
  .then(() => {
    app.listen(env.API_PORT, () => {
      console.log(`Server running on ${env.API_BASE_URL}:${env.API_PORT}`);
    });
  })
  .catch((e) => console.log(e));
