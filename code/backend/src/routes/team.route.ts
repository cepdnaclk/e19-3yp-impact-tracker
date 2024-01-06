import { Router } from "express";
import { Request, Response } from "express";
import {
  checkTeamExist,
  checkTeamEmailExist,
  createTeam,
} from "../controllers/team.controller";
import ManagerModel from "../db/manager.schema";

import {
  TeamIdExistsResponse,
  TeamManagerInterface,
  TeamIdEmailExistsResponse,
  Team,
  TeamResponse,
} from "../models/team.model";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";

// Create an instance of the Express Router
const router = Router();

// Endpoint to validate if a Team ID exists
router.get("/exists/teamId/:id", async (req: Request, res: Response) => {
  // Check if the Team ID parameter is missing
  if (!req.params.id) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    // Check if the Team ID exists
    const existsResponse: TeamIdExistsResponse = await checkTeamExist(
      req.params.id
    );
    // const exists: boolean = existsResponse.exists;

    res.send(existsResponse);
  } catch (err) {
    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// Endpoint to validate both Team ID and email existence
//Doubt???? --> BAD Request
router.get(
  "/exists",
  async (req: Request<{}, {}, {}, TeamManagerInterface>, res: Response) => {
    // Extract Team ID and email from query parameters
    const teamId = req.query.teamId;
    const email = req.query.email;

    // Check if either Team ID or email is missing
    if (!teamId || !email) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.log(HttpMsg.INVALID_EMAIL);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
      return;
    }

    try {
      // Check if Team ID and email combination exists
      const teamIdEmailExistResponse: TeamIdEmailExistsResponse =
        await checkTeamEmailExist(teamId, email);

      res.send(teamIdEmailExistResponse);
    } catch (err) {
      if (err instanceof Error) {
        // If 'err' is an instance of Error, send the error message
        res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
      } else {
        // If 'err' is of unknown type, send a generic error message
        res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      }
    }
  }
);

// Endpoint to create a Team
router.post("/", async (req: Request, res: Response) => {
  // Extract Team ID and Team Name from the request body
  const teamId = req.body.teamId;
  const teamName = req.body.teamName;
  const teamManagerEmail = req.body.teamManager;

  // Check if either Team ID or Team Name is missing
  if (!teamId || !teamName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  const teamExistsRes = await checkTeamExist(teamId);

  // Check if the specified team exists
  if (teamExistsRes.teamExists === true) {
    console.log(HttpMsg.INVALID_TEAMID);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_TEAMID });
    return;
  }

  try {
    // Create a new Team instance
    const team: Team = new Team(teamId, teamName, teamManagerEmail);

    // Create the Team and get the response
    const teamResponse: TeamResponse | undefined = await createTeam(team);

    res.send(teamResponse);
  } catch (err) {
    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// Export the router for use in other files
export default router;
