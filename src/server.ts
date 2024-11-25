import cors from "cors";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env } from "./lib/env";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import { cardsRouter } from "./modules/cards/cards-router";
import { expansionsRouter } from "./modules/expansions/expansions-router";
import { matchResultsRouter } from "./modules/matches/match-results-router";

const app = express();
const limiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  limit: 50
});

app.use(helmet());
app.use(cors({ origin: env.ORIGIN }));
app.use(express.json());
app.use(limiter);

app.use(expansionsRouter);
app.use(cardsRouter);
app.use(matchResultsRouter);
app.use(errorHandlerMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running on ${env.API_BASE_URL}:${env.PORT}`);
});
