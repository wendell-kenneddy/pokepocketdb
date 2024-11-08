import { Request, Response } from "express";
import { cards } from "../../db/schema";
import { CreateCardService } from "./services/create-card-service";
import { DeleteCardService } from "./services/delete-card-service";
import { GetCardService } from "./services/get-card-service";
import { GetManyCardsService } from "./services/get-many-cards-service";
import { UpdateCardService } from "./services/update-card-service";

type Card = typeof cards.$inferSelect;

export class CardsController {
  create = async (req: Request, res: Response) => {
    await new CreateCardService().execute(req.body);
    res.json({ success: true, message: "Card created." });
  };

  get = async (req: Request, res: Response) => {
    const { id, type, category, expansionId, limit, page } = req.params;
    let data: Card | Card[] | null = null;

    data = id
      ? await new GetCardService().execute(id)
      : await new GetManyCardsService().execute({
          type,
          category,
          expansionId,
          limit,
          page
        });

    res.json({ success: true, data });
  };

  update = async (req: Request, res: Response) => {
    await new UpdateCardService().execute(req.body);
    res.json({ success: true, message: "Card updated." });
  };

  delete = async (req: Request, res: Response) => {
    await new DeleteCardService().execute(req.query.id);
    res.json({ success: true, message: "Card deleted." });
  };
}
