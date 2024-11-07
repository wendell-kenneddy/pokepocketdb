import { Router } from "express";
import { ExpansionsController } from "./expansions-controller";

const expansionsController = new ExpansionsController();
const expansionsRouter = Router();

expansionsRouter.post("/expansions", expansionsController.create);

export { expansionsRouter };
