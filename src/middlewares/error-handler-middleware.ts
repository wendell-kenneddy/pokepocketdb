import { NextFunction, Request, Response } from "express";
import { PostgresError } from "postgres";
import { ZodError } from "zod";

interface ErrorResponse {
  message: string;
  status: number;
  errors: unknown;
}

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  const json: ErrorResponse = {
    message: "Internal server error.",
    status: 500,
    errors: []
  };

  if (err.message.includes("not valid JSON")) {
    json.message = "Invalid JSON";
    json.status = 400;
    json.errors = [];
  } else if (err instanceof PostgresError) {
    json.message = "Invalid input.";
    json.status = 400;
    if (err.detail && err.detail.includes("(name, expansion_id)")) {
      (json.errors as string[]).push(
        "Card with given name already exists within the given expansion."
      );
    }
  } else if (err instanceof ZodError) {
    json.message = "Invalid input";
    json.status = 400;
    json.errors = err.flatten().formErrors.length
      ? err.flatten().formErrors
      : err.flatten().fieldErrors;
  }

  res
    .status(json.status)
    .json({ success: false, message: json.message, errors: json.errors });
}
