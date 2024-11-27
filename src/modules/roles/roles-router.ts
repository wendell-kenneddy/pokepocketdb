import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication-middleware";
import { userPermissionsMiddleware } from "../../middlewares/user-permissions-middleware";
import { RolesController } from "./roles-controller";

const rolesController = new RolesController();
const rolesRouter = Router();

rolesRouter.get(
  "/roles",
  authenticationMiddleware,
  userPermissionsMiddleware,
  rolesController.get
);
rolesRouter.post(
  "/roles",
  authenticationMiddleware,
  userPermissionsMiddleware,
  rolesController.create
);
rolesRouter.patch(
  "/roles",
  authenticationMiddleware,
  userPermissionsMiddleware,
  rolesController.update
);
rolesRouter.delete(
  "/roles",
  authenticationMiddleware,
  userPermissionsMiddleware,
  rolesController.delete
);

export { rolesRouter };
