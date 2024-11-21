import { Request, Response } from "express";
import { CreateMatchResultService } from "./services/create-match-result-service";
import { DeleteMatchResultService } from "./services/delete-match-result-service";
import {
  GetManyMatchResultsServie,
  MatchResultsPage
} from "./services/get-many-match-results-service";
import {
  FullMatchResult,
  GetMatchResultService
} from "./services/get-match-result-service";

export class MatchResultsController {
  get = async (req: Request, res: Response) => {
    const { id, limit, page } = req.query;
    let data: FullMatchResult | MatchResultsPage[] | null | undefined = null;

    data = id
      ? await new GetMatchResultService().execute(id)
      : await new GetManyMatchResultsServie().execute({ limit, page });

    res.json({ success: true, data });
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const matchId = await new CreateMatchResultService().execute(data);
    res.json({ success: true, message: "Match result created.", matchId });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.query;
    await new DeleteMatchResultService().execute(id);
    res.json({ success: true, message: "Match result deleted." });
  };
}
