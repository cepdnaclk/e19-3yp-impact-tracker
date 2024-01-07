import { Router } from "express";
import { Request, Response } from "express";
import {
  checkTeamExist,
  checkTeamEmailExist,
  createTeam,
  getTeam,
  deleteTeam,
} from "../controllers/team.controller";

import {
  TeamIdExistsResponse,
  TeamManagerInterface,
  TeamIdEmailExistsResponse,
  Team,
  TeamResponse,
  TeamManagerResponse,
} from "../models/team.model";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";
import { Manager, ManagerResponse } from "../models/manager.model";
import {
  checkManagerExists,
  createManager,
  deleteManager,
} from "../controllers/manager.controller";
import {
  checkManagerExistsInTeamDetails,
  deleteManagerFromTeamDetails,
} from "../services/team.manager.service";

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
    const teamExistsRes = await checkTeamExist(teamId);

    // Check if the specified team exists
    if (teamExistsRes.teamExists === true) {
      await deleteTeam(teamId);
    }

    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// Endpoint to get team details
router.get("/:id", async (req: Request, res: Response) => {
  // Check if the Team ID parameter is missing
  if (!req.params.id) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    // Check if the Team ID exists
    const teamResponse = await getTeam(req.params.id);
    // const exists: boolean = existsResponse.exists;

    res.send(teamResponse);
  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
  }
});

// create team with manager detials
router.post("/manager", async (req, res) => {
  // Extract Team ID and Team Name from the request body
  const teamId = req.body.teamId;
  const teamName = req.body.teamName;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Check if either Team ID or Team Name is missing
  if (!teamId || !teamName || !email || !firstName || !lastName || !password) {
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

  // Validate email format
  if (!validateEmail(email)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  // Check if a manager with the given email exists
  const exists: boolean = await checkManagerExists(email);

  if (exists) {
    console.log(HttpMsg.MANAGER_EXISTS);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.MANAGER_EXISTS });
    return;
  }

  try {
    // Create a new Team instance
    const team: Team = new Team(teamId, teamName, email);
    const manager: Manager = new Manager(
      teamId,
      firstName,
      lastName,
      email,
      password
    );

    // Create the Team and get the response
    const teamResponse: TeamResponse | undefined = await createTeam(team);

    // Create the manager and get the response
    const managerResponse: ManagerResponse | undefined = await createManager(
      manager
    );

    const teamManagerResponse: TeamManagerResponse = new TeamManagerResponse(
      teamId,
      email
    );

    res.send(teamManagerResponse);
  } catch (err) {
    // Check if a manager with the given email exists
    const exists: boolean = await checkManagerExists(email);

    if (exists) {
      await deleteManager(email, teamId);
    }

    const teamExistsRes = await checkTeamExist(teamId);

    // Check if the specified team exists
    if (teamExistsRes.teamExists === true) {
      await deleteTeam(teamId);
    }

    const teamManagerExits = await checkManagerExistsInTeamDetails(
      email,
      teamId
    );

    if (teamManagerExits) {
      await deleteManagerFromTeamDetails(email, teamId);
    }

    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// Endpoint to get team details
router.get("/:id", async (req: Request, res: Response) => {
  // Check if the Team ID parameter is missing
  if (!req.params.id) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    // Check if the Team ID exists
    const teamResponse = await getTeam(req.params.id);
    // const exists: boolean = existsResponse.exists;

    res.send(teamResponse);
  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
  }
});

// Export the router for use in other files
export default router;
