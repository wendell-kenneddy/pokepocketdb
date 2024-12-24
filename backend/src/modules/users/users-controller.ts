import { Request, Response } from "express";
import { AuthorizationError } from "../../errors/authorization-error";
import { CreateUserService } from "./services/create-user-service";
import { DeleteUserService } from "./services/delete-user-service";
import { GetManyUsersService } from "./services/get-many-users-service";
import { GetUserService } from "./services/get-user-service";

export class UsersController {
  getProfile = async (req: Request, res: Response) => {
    const { userId } = req;
    const data = await new GetUserService().execute(userId);
    res.json({ success: true, data });
  };

  getManyUsers = async (req: Request, res: Response) => {
    const { userPermissions } = req;

    if (!userPermissions || !userPermissions.includes("users:read"))
      throw new AuthorizationError();
    const data = await new GetManyUsersService().execute(req.query);

    res.json({ success: true, data });
  };

  create = async (req: Request, res: Response) => {
    const { userPermissions } = req;

    if (!userPermissions || !userPermissions.includes("users:create"))
      throw new AuthorizationError();
    const userId = await new CreateUserService().execute(req.body);
    res.json({ success: true, data: userId });
  };

  delete = async (req: Request, res: Response) => {
    const { userPermissions } = req;
    if (!userPermissions || !userPermissions.includes("users:delete"))
      throw new AuthorizationError();
    const userId = await new DeleteUserService().execute(req.query.userId);
    res.json({ success: true, message: "User deleted.", data: userId });
  };
}
