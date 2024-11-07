import { Request, Response } from "express";
import { CreateExpansionService } from "./services/create-expansion-service";

export class ExpansionsController {
  create = async (req: Request, res: Response) => {
    const data = req.body;
    await new CreateExpansionService().execute(data);
    res.json({ success: true });
  };
}
