import { cookies } from "next/headers";

export async function refetchableRequest<T>(
  url: string,
  options?: RequestInit
): Promise<{ res: Response; json: T }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("access-token")?.value;
  let fullOptions: RequestInit = {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `refresh-token=${refreshToken}`,
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  let res = await fetch(url, fullOptions);
  let json = await res.json();

  if (json.message && json.message == "New Access and Refresh Tokens provided.") {
    const newAccessToken = res.headers.get("Authorization")?.replace("Bearer ", "");
    const newRefreshToken = res.headers
      .getSetCookie()
      .find((s) => s.startsWith("refresh-token="))
      ?.replace("refresh-token=", "");
    cookieStore.set("access-token", newAccessToken as string, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    cookieStore.set("refresh-token", newRefreshToken as string, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    fullOptions = {
      ...fullOptions,
      headers: {
        ...fullOptions.headers,
        Authorization: `Bearer ${newAccessToken}`,
        Cookie: `refresh-token=${newRefreshToken}`,
      },
    };

    const refetch = await fetch(url, fullOptions);
    res = refetch;
    json = (await refetch.json()) as T;
  }

  return { res, json };
}
