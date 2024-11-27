import { Request, Response } from "express";
import { AuthorizationError } from "../../errors/authorization-error";
import { CreateUserService } from "./services/create-user-service";
import { DeleteUserService } from "./services/delete-user-service";
import {
  GetManyUsersService,
  UserWithRole
} from "./services/get-many-users-service";
import {
  GetUserService,
  UserWithPermissions
} from "./services/get-user-service";

export class UsersController {
  get = async (req: Request, res: Response) => {
    let data: UserWithPermissions | UserWithRole[] | null = null;

    if (req.query.limit) {
      const { userPermissions } = req;
      if (!userPermissions || !userPermissions.includes("users:read"))
        throw new AuthorizationError();
      data = await new GetManyUsersService().execute(req.query);
    } else {
      data = await new GetUserService().execute(req.userId);
    }

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
