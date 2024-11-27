import { NextFunction, Request, Response } from "express";
import { GetUserService } from "../modules/users/services/get-user-service";

export async function userPermissionsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const { permissions } = await new GetUserService().execute(userId);
  req.userPermissions = permissions;
  next();
}
