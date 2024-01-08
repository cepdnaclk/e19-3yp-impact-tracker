import { Router } from "express";
import { Request, Response } from "express";
import { mapToImpactPlayers } from "../utils/utils";
import { SessionRequest } from "../models/session.model";
import { checkTeamExist } from "../controllers/team.controller";
import { HttpMsg } from "../exceptions/appErrorsDefine";
import {
  checkSessionExists,
  createSession,
  deleteSession,
} from "../controllers/session.controller";

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

  if (
    !userName ||
    !teamId ||
    !sessionId ||
    !sessionName ||
    !createdAt ||
    !updatedAt ||
    !impactHistoryOld
  ) {
    res.status(400).send({ message: "Bad Request" });
    return;
  }

  const teamExists = await checkTeamExist(teamId);

  if (!teamExists) {
    res.status(404).send({ message: "Team not found" });
    return;
  }

  // check session exists
  const sessionExists = await checkSessionExists(sessionId);
  if (sessionExists) {
    res.status(400).send({ message: "Session already exists" });
    return;
  }

  const impactHistory = mapToImpactPlayers(impactHistoryOld);

  const sessionRequest = new SessionRequest(
    teamId,
    sessionId,
    sessionName,
    createdAt,
    updatedAt,
    impactHistory
  );

  // check team exists

  try {
    await createSession(sessionRequest);
    res.send({ message: HttpMsg.SESSION_SUCESS });
  } catch (err) {
    // check session exists
    const sessionExists = await checkSessionExists(sessionId);
    if (sessionExists) {
      await deleteSession(sessionId);
    }

    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: HttpMsg.SESSION_ERROR });
    }
  }
});

export default router;
