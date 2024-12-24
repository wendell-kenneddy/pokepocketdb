import { NextResponse, type NextRequest } from "next/server";
import { APIResponse, UserWithRole } from "./data/types";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const reqCookies = req.cookies;
  const accessToken = reqCookies.get("access-token");
  const refreshToken = reqCookies.get("refresh-token");

  if (!accessToken || !refreshToken) return NextResponse.redirect(new URL("/", req.url));

  const res = await fetch(`${String(process.env.API_URL)}/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      Cookie: `refresh-token=${refreshToken.value}`,
      Accept: "application/json",
    },
    credentials: "include",
    mode: "cors",
  });

  if (res.status == 403) {
    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");
    return NextResponse.redirect(new URL("/", req.url));
  }

  let json: APIResponse<UserWithRole> = await res.json();

  if (json.message == "New Access and Refresh Tokens provided.") {
    const authorizationHeader = res.headers.get("authorization");
    const responseCookies = res.headers.getSetCookie();
    const refreshTokenCookie = responseCookies.find((s) => s.startsWith("refresh-token="));
    const newRefreshToken = String(refreshTokenCookie).replace("refresh-token=", "");
    const newAccessToken = String(authorizationHeader).replace("Bearer ", "");

    response.cookies.set("access-token", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    response.cookies.set("refresh-token", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    const refetch = await fetch(`${String(process.env.API_URL)}/users/profile`, {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
        Cookie: `refresh-token=${newRefreshToken}`,
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    json = await refetch.json();
  }

  response.headers.set("x-user-session", JSON.stringify(json.data));
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
