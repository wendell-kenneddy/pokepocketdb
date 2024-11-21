import { Router } from "express";
import { MatchResultsController } from "./match-results-controller";

const matchesController = new MatchResultsController();
const matchResultsRouter = Router();

matchResultsRouter.get("/matches", matchesController.get);
matchResultsRouter.post("/matches", matchesController.create);
matchResultsRouter.delete("/matches", matchesController.delete);

export { matchResultsRouter };
