import { Request, Response } from "express";
import { AuthorizationError } from "../../errors/authorization-error";
import { CreateRoleService } from "./services/create-role-service";
import { DeleteRoleService } from "./services/delete-role-service";
import { GetManyRolesService } from "./services/get-many-roles-service";
import { UpdateRoleService } from "./services/update-role-service";

export class RolesController {
  get = async (req: Request, res: Response) => {
    const { userPermissions } = req;
    if (!userPermissions || !userPermissions.includes("roles:read"))
      throw new AuthorizationError();
    const roles = await new GetManyRolesService().execute(req.query);
    res.json({ success: true, data: roles });
  };

  create = async (req: Request, res: Response) => {
    const { userPermissions } = req;
    if (!userPermissions || !userPermissions.includes("roles:create"))
      throw new AuthorizationError();
    const roleId = await new CreateRoleService().execute(req.body);
    res.json({ success: true, message: "Role created.", data: roleId });
  };

  update = async (req: Request, res: Response) => {
    const { userPermissions } = req;
    if (!userPermissions || !userPermissions.includes("roles:update"))
      throw new AuthorizationError();
    await new UpdateRoleService().execute(req.body);
    res.json({ success: true, message: "Role updated." });
  };

  delete = async (req: Request, res: Response) => {
    const { userPermissions } = req;
    if (!userPermissions || !userPermissions.includes("roles:delete"))
      throw new AuthorizationError();
    await new DeleteRoleService().execute(req.query.roleId);
    res.json({ success: true, message: "Role deleted." });
  };
}
