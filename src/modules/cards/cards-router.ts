import { Router } from "express";
import { CardsController } from "./cards-controller";

const cardsController = new CardsController();
const cardsRouter = Router();

cardsRouter.get("/cards", cardsController.get);
cardsRouter.post("/cards", cardsController.create);
cardsRouter.patch("/cards", cardsController.update);
cardsRouter.delete("/cards", cardsController.delete);

export { cardsRouter };
