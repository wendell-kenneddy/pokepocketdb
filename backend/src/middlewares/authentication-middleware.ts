import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import {
  JWSInvalid,
  JWSSignatureVerificationFailed,
  JWTExpired,
  JWTInvalid
} from "jose/errors";
import { AuthenticationError } from "../errors/authentication-error";
import {
  accessTokenKey,
  JWTHandler,
  refreshTokenKey
} from "../lib/jwt-handler";

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    throw new AuthenticationError("No Access Token provided.");
  const accessToken = authorizationHeader.replace("Bearer ", "");

  try {
    const accessTokenVerification = await jwtVerify<{ userId: string }>(
      accessToken,
      accessTokenKey
    );
    req.userId = accessTokenVerification.payload.userId;
  } catch (error) {
    if (process.env.NODE_ENV == "development") console.log(error);

    if (
      error instanceof JWTInvalid ||
      error instanceof JWSInvalid ||
      error instanceof JWSSignatureVerificationFailed
    )
      throw new AuthenticationError("Invalid Access Token.");
    if (error instanceof JWTExpired) {
      const refreshToken = req.signedCookies["refresh-token"];
      if (!refreshToken)
        throw new AuthenticationError("No Refresh Token provided.");

      try {
        const refreshTokenVerification = await jwtVerify<{ userId: string }>(
          refreshToken,
          refreshTokenKey
        );
        const jwtHandler = new JWTHandler();
        const newAccessToken = await jwtHandler.generateAccessToken(
          refreshTokenVerification.payload.userId
        );
        const newRefreshToken = await jwtHandler.generateRefreshToken(
          refreshTokenVerification.payload.userId
        );

        res.setHeader("authorization", `Bearer ${newAccessToken}`);
        res.cookie("refresh-token", newRefreshToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          signed: true,
          maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
        });
        res.json({
          success: true,
          message: "New Access and Refresh Tokens provided."
        });
        return;
      } catch (error) {
        if (process.env.NODE_ENV == "development") console.log(error);

        if (
          error instanceof JWTInvalid ||
          error instanceof JWSInvalid ||
          error instanceof JWSSignatureVerificationFailed
        ) {
          res.status(401).json({
            success: false,
            message: "Unauthenticated access denied.",
            errors: ["Invalid Refresh Token."]
          });
          return;
        }
        if (error instanceof JWTExpired) {
          res.status(401).json({
            success: false,
            message: "Unauthenticated access denied.",
            errors: ["Refresh Token expired."]
          });
          return;
        }
      }
    }
  }

  next();
}
