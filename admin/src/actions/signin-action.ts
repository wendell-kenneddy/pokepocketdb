"use server";

import { z, ZodError } from "zod";
import { ClientError } from "../errors/client-error";
import { APIResponse } from "@/data/types";
import { cookies } from "next/headers";

export interface SigninFormState {
  message: string;
  errors: string[];
}

const loginSchema = z.object({
  email: z.string().email("Invalid e-mail address."),
  password: z.string().min(5, "Password must be at least 5 characters long."),
});

export async function signinAction(
  prevState: SigninFormState | null,
  formData: FormData
): Promise<SigninFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const state: SigninFormState = { message: "", errors: [] };

  try {
    loginSchema.parse(rawData);
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(rawData),
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const json: APIResponse<null> = await res.json();

    if (!json.success) throw new ClientError(json.message, json.errors);
    const { set } = await cookies();
    const accessToken = res.headers.get("authorization")?.replace("Bearer ", "") as string;
    const resCookies = res.headers.getSetCookie();
    const refreshTokenCookie = resCookies.find((cookie) => cookie.startsWith("refresh-token="));
    const refreshToken = refreshTokenCookie?.replace("refresh-token=", "") as string;

    set("access-token", accessToken, {
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    set("refresh-token", refreshToken, {
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    state.message = json.message;
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;

      for (const key in fieldErrors) {
        state.errors = [...state.errors, ...fieldErrors[key]];
      }
    } else if (error instanceof ClientError) {
      state.message = error.message;
      state.errors = error.errors;
    } else {
      state.errors?.push((error as unknown as Error).message);
    }
  }

  return state;
}
