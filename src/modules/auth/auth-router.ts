import { Router } from "express";
import { AuthController } from "./auth-controller";

const authController = new AuthController();
const authRouter = Router();

authRouter.post("/auth/login", authController.login);

export { authRouter };
