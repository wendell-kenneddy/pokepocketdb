import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication-middleware";
import { userPermissionsMiddleware } from "../../middlewares/user-permissions-middleware";
import { MatchResultsController } from "./match-results-controller";

const matchesController = new MatchResultsController();
const matchResultsRouter = Router();

matchResultsRouter.get("/matches", matchesController.get);
matchResultsRouter.post(
  "/matches",
  authenticationMiddleware,
  userPermissionsMiddleware,
  matchesController.create
);
matchResultsRouter.delete(
  "/matches",
  authenticationMiddleware,
  userPermissionsMiddleware,
  matchesController.delete
);

export { matchResultsRouter };
