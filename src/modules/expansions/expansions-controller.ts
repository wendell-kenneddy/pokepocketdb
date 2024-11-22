import { Request, Response } from "express";
import { expansions } from "../../db/schema";
import { CreateExpansionService } from "./services/create-expansion-service";
import { DeleteExpansionService } from "./services/delete-expansion-service";
import { GetExpansionService } from "./services/get-expansion-service";
import { GetManyExpansionsService } from "./services/get-many-expansions-service";
import { UpdateExpansionService } from "./services/update-expansion-service";

type Expansion = typeof expansions.$inferSelect;

export class ExpansionsController {
  create = async (req: Request, res: Response) => {
    const id = await new CreateExpansionService().execute(req.body);
    res.json({ success: true, message: "Expansion created.", data: id });
  };

  get = async (req: Request, res: Response) => {
    const { id, limit, offset } = req.query;
    let data: Expansion | Expansion[] | null = null;

    data = id
      ? await new GetExpansionService().execute(id)
      : await new GetManyExpansionsService().execute({
          limit,
          offset
        });

    res.json({ success: true, data });
  };

  update = async (req: Request, res: Response) => {
    await new UpdateExpansionService().execute(req.body);
    res.json({ success: true, message: "Expansion updated." });
  };

  delete = async (req: Request, res: Response) => {
    await new DeleteExpansionService().execute(req.query.id);
    res.json({ success: true, message: "Expansion deleted." });
  };
}
