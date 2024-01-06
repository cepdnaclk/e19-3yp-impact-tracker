import { Router } from "express";
import { Request, Response } from "express";
import {
  ManagerExistsResponse,
  Manager,
  ManagerResponse,
} from "../models/manager.model";
import {
  checkManagerExists,
  createManager,
  addNewManager,
} from "../controllers/manager.controller";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";
import { checkTeamExist } from "../controllers/team.controller";

// Create an instance of the Express Router
const router = Router();

// add a manager to the manager team collection
router.post("/add", async (req: Request, res: Response) => {
  const newManagerEmail = req.body.managerEmail;
  const teamId = req.body.teamId;
  const managerEmail = req.body.userName;

  if (!newManagerEmail || !teamId || !managerEmail) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(newManagerEmail)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  if (!validateEmail(managerEmail)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    const state = await addNewManager(managerEmail, newManagerEmail, teamId);

    if (state == true) {
      res.send({ message: "Manager added successfully" });
    } else {
      res.send({ message: "Manager added failed" });
    }
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

// Endpoint to check if a manager with a specific email exists
router.get("/exists/email/:email", async (req: Request, res: Response) => {
  // Extract email parameter from the request
  const email = req.params.email;

  // Check if email parameter is missing
  if (!email) {
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
    // Check if a manager with the given email exists
    const exists: boolean = await checkManagerExists(email);
    const existsResponse: ManagerExistsResponse = new ManagerExistsResponse(
      exists
    );

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

// Endpoint to create a new manager
router.post("/", async (req: Request, res: Response) => {
  // Extract manager details from the request body
  const teamId = req.body.teamId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  // Check if any required field is missing
  if (!email || !teamId || !firstName || !lastName || !password) {
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

  const teamExistsRes = await checkTeamExist(teamId);

  // Check if the specified team exists
  if (teamExistsRes.teamExists === false) {
    console.log(HttpMsg.INVALID_TEAMID);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_TEAMID });
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
    // Create a new Manager instance
    const manager: Manager = new Manager(
      teamId,
      firstName,
      lastName,
      email,
      password
    );

    console.log(manager);
    // Create the manager and get the response
    const managerResponse: ManagerResponse | undefined = await createManager(
      manager
    );

    res.send(managerResponse);
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
