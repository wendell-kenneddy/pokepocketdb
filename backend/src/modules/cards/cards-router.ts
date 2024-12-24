import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication-middleware";
import { userPermissionsMiddleware } from "../../middlewares/user-permissions-middleware";
import { CardsController } from "./cards-controller";

const cardsController = new CardsController();
const cardsRouter = Router();

cardsRouter.get("/cards", cardsController.get);
cardsRouter.get(
  "/cards/categories",
  authenticationMiddleware,
  userPermissionsMiddleware,
  cardsController.getCategories
);
cardsRouter.get(
  "/cards/types",
  authenticationMiddleware,
  userPermissionsMiddleware,
  cardsController.getPokemonTypes
);
cardsRouter.post(
  "/cards",
  authenticationMiddleware,
  userPermissionsMiddleware,
  cardsController.create
);
cardsRouter.patch(
  "/cards",
  authenticationMiddleware,
  userPermissionsMiddleware,
  cardsController.update
);
cardsRouter.delete(
  "/cards",
  authenticationMiddleware,
  userPermissionsMiddleware,
  cardsController.delete
);

export { cardsRouter };
