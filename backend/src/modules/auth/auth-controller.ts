import { Request, Response } from "express";
import { JWTHandler } from "../../lib/jwt-handler";
import { LoginService } from "./services/login-service";

export class AuthController {
  login = async (req: Request, res: Response) => {
    const jwtHandler = new JWTHandler();
    const userId = await new LoginService().execute(req.body);
    const [accessToken, refreshToken] = await Promise.all([
      jwtHandler.generateAccessToken(userId),
      jwtHandler.generateRefreshToken(userId)
    ]);
    res.setHeader("authorization", `Bearer ${accessToken}`);
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    res.json({ success: true, message: "Successfully signed in." });
  };
}
