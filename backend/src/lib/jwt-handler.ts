import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import { env } from "./env";
import { createId } from "@paralleldrive/cuid2";

export const accessTokenKey = createSecretKey(env.ACCESS_TOKEN_SECRET, "utf-8");
export const refreshTokenKey = createSecretKey(
  env.REFRESH_TOKEN_SECRET,
  "utf-8"
);

export class JWTHandler {
  async generateAccessToken(userId: string) {
    const accessToken = await new SignJWT({ userId })
      .setJti(createId())
      .setIssuedAt()
      .setExpirationTime("15min")
      .setSubject("access-token")
      .setProtectedHeader({ alg: "HS512" })
      .sign(accessTokenKey);

    return accessToken;
  }

  async generateRefreshToken(userId: string) {
    const refreshToken = await new SignJWT({ userId })
      .setJti(createId())
      .setIssuedAt()
      .setExpirationTime("7d")
      .setSubject("refresh-token")
      .setProtectedHeader({ alg: "HS512" })
      .sign(refreshTokenKey);

    return refreshToken;
  }
}
