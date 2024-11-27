import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication-middleware";
import { userPermissionsMiddleware } from "../../middlewares/user-permissions-middleware";
import { UsersController } from "./users-controller";

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.get(
  "/users",
  authenticationMiddleware,
  userPermissionsMiddleware,
  usersController.get
);
usersRouter.post(
  "/users",
  authenticationMiddleware,
  userPermissionsMiddleware,
  usersController.create
);
usersRouter.delete(
  "/users",
  authenticationMiddleware,
  userPermissionsMiddleware,
  usersController.delete
);

export { usersRouter };
