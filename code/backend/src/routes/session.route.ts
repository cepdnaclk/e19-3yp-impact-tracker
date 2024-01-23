import { Router } from "express";
import { Request, Response } from "express";
import { mapToImpactPlayers } from "../utils/utils";
import { SessionRequest } from "../models/session.model";
import teamController from "../controllers/team.controller";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import sessionController from "../controllers/session.controller";

const router = Router();

// end point to create session
router.post("/", async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const teamId = req.body.teamId;
  const sessionId = req.body.sessionId;
  const sessionName = req.body.sessionName;
  const createdAt = req.body.createdAt;
  const updatedAt = req.body.updatedAt;
  const impactHistoryOld = req.body.impactHistory;
  const active = req.body.active;

  if (
    !userName ||
    !teamId ||
    !sessionId ||
    !sessionName ||
    !createdAt ||
    !updatedAt ||
    !impactHistoryOld
  ) {
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  const teamExists = await teamController.checkTeamExist(teamId);

  if (!teamExists) {
    res.status(HttpCode.NOT_FOUND).send({ message: HttpMsg.NOT_FOUND });
    return;
  }

  // check session exists
  const sessionExists = await sessionController.checkSessionExists(sessionId);
  if (sessionExists) {
    res.status(400).send({ message: HttpMsg.TEAM_NOT_FOUND });
    return;
  }

  const impactHistory = mapToImpactPlayers(impactHistoryOld);

  const sessionRequest = new SessionRequest(
    teamId,
    sessionId,
    sessionName,
    createdAt,
    updatedAt,
    impactHistory,
    active
  );

  // check team exists

  try {
    await sessionController.createSession(sessionRequest);
    res.send({ message: HttpMsg.SESSION_SUCESS });
  } catch (err) {
    // check session exists
    const sessionExists = await sessionController.checkSessionExists(sessionId);
    if (sessionExists) {
      await sessionController.deleteSession(sessionId);
    }

    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: HttpMsg.SESSION_ERROR });
    }
  }
});

export default router;
