import { NextFunction, Request, Response } from "express";
import { PostgresError } from "postgres";
import { ZodError } from "zod";
import { ValidationError } from "../errors/validation-error";

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
  } else if (err instanceof ValidationError) {
    json.message = "Invalid input.";
    (json.errors as string[]).push(err.message);
  } else if (err instanceof PostgresError) {
    json.message = "Invalid input.";
    json.status = 400;

    switch (err.constraint_name) {
      case "cards_name_expansion_id_unique":
        (json.errors as string[]).push(
          "Card with given name already exists within the given expansion."
        );
        break;
      case "expansions_name_unique":
        (json.errors as string[]).push(
          "Expansion with given name already exists."
        );
        break;
      case "cards_expansion_id_expansions_id_fk":
        (json.errors as string[]).push("No expansion found.");
        break;
      case "match_cards_card_id_cards_id_fk":
        (json.errors as string[]).push(
          "One of the specified cards does not exist."
        );
        break;
      default:
        break;
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
