import { NextFunction, Request, Response } from "express";
import { GetUserPermissionsService } from "../modules/users/services/get-user-permissions-service";

export async function userPermissionsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const permissions = await new GetUserPermissionsService().execute(userId);
  req.userPermissions = permissions;
  next();
}
