import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./lib/env";
import { expansionsRouter } from "./modules/expansions/expansions-router";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.ORIGIN }));
app.use(express.json());
app.use(expansionsRouter);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
