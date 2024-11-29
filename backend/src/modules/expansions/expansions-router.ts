import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication-middleware";
import { userPermissionsMiddleware } from "../../middlewares/user-permissions-middleware";
import { ExpansionsController } from "./expansions-controller";

const expansionsController = new ExpansionsController();
const expansionsRouter = Router();

expansionsRouter.get("/expansions", expansionsController.get);
expansionsRouter.post(
  "/expansions",
  authenticationMiddleware,
  userPermissionsMiddleware,
  expansionsController.create
);
expansionsRouter.patch(
  "/expansions",
  authenticationMiddleware,
  userPermissionsMiddleware,
  expansionsController.update
);
expansionsRouter.delete(
  "/expansions",
  authenticationMiddleware,
  userPermissionsMiddleware,
  expansionsController.delete
);

export { expansionsRouter };
