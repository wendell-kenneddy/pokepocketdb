import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { env } from "./env";

export const accessTokenKey = createSecretKey(env.ACCESS_TOKEN_SECRET, "utf-8");
export const refreshTokenKey = createSecretKey(
  env.REFRESH_TOKEN_SECRET,
  "utf-8"
);

export class JWTHandler {
  async generateAccessToken(userId: string) {
    const accessToken = await new SignJWT({ userId })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setSubject("access-token")
      .setProtectedHeader({ alg: "HS512" })
      .sign(accessTokenKey);

    return accessToken;
  }

  async generateRefreshToken(userId: string) {
    const refreshToken = await new SignJWT({ userId })
      .setIssuedAt()
      .setExpirationTime("1d")
      .setSubject("refresh-token")
      .setProtectedHeader({ alg: "HS512" })
      .sign(refreshTokenKey);

    return refreshToken;
  }
}
