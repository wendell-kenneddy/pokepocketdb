import { Router } from "express";
import { ExpansionsController } from "./expansions-controller";

const expansionsController = new ExpansionsController();
const expansionsRouter = Router();

expansionsRouter.post("/expansions", expansionsController.create);
expansionsRouter.get("/expansions", expansionsController.get);
expansionsRouter.patch("/expansions", expansionsController.update);
expansionsRouter.delete("/expansions", expansionsController.delete);

export { expansionsRouter };
