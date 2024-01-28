import { Router } from "express";
import { Request, Response } from "express";
import {
  ManagerExistsResponse,
  Manager,
  ManagerResponse,
} from "../models/manager.model";
import managerController from "../controllers/manager.controller";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import { validateEmail } from "../utils/utils";
import teamController from "../controllers/team.controller";
import ManagerModel from "../db/manager.schema";
import ManagerTeamModel  from '../db/managers.in.team.schema'; // Import the missing ManagerTeamModel
import ROLES from "../config/roles";


// Create an instance of the Express Router
const router = Router();

// add a manager to the manager team collection
router.post("/add", async (req: Request, res: Response) => {
  const newManagerEmail = req.body.managerEmail;
  const teamId = req.body.teamId;
  const managerEmail = req.body.userName;

  if (!newManagerEmail || !teamId) {
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

  try {
    const state = await managerController.addNewManager(
      managerEmail,
      newManagerEmail,
      teamId
    );

    if (state) {
      res.send(HttpMsg.MANAGER_ADD_SUCCESS + " " + state);
    } else {
      res.send({ message: HttpMsg.MANAGER_ADD_FAILED });
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
router.get("/exists/:email/:teamId", async (req: Request, res: Response) => {
  // Extract email parameter from the request
  const email = req.params.email;
  const teamId = req.params.teamId;

  // Check if email parameter is missing
  if (!email || !teamId) {
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
    // Check if a manager with the given email exists in team
    const exists: boolean = await managerController.checkManagerExistsInTeam(email, teamId);
    // const existsResponse: ManagerExistsResponse = new ManagerExistsResponse(
    //   exists
    // );
    if (exists) {
      res.send(exists);
    }else{
      const teamExistsRes = await teamController.checkTeamExist(teamId);

      if (teamExistsRes.teamExists){
        throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      }else{
        throw new Error(HttpMsg.TEAM_NOT_FOUND);
      }
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

// Endpoint to create a new manager
router.post("/", async (req: Request, res: Response) => {
  // Extract manager details from the request body
  const teamId = req.body.teamId;
  const fullName = req.body.fullName;
  const names = fullName.split(' ');
  const firstName = names[0];
  const lastName = names[1];
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

  const teamExistsRes = await teamController.checkTeamExist(teamId);

  // Check if the specified team exists
  if (teamExistsRes.teamExists === false) {
    console.log(HttpMsg.INVALID_TEAMID);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_TEAMID });
    return;
  }

  // Check if a manager with the given email exists
  const exists: boolean = await managerController.checkManagerExistsInTeam(
    email,
    teamId
  );

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
      password,
      "", // Initially set to empty string
      "pending" // Initially set to pending
    );

    // Create the manager and get the response
    const managerResponse: ManagerResponse | undefined =
      await managerController.createManager(manager, teamId);

    res.send(managerResponse);
  } catch (err) {
    // Check if a manager with the given email exists
    const exists: boolean = await managerController.checkManagerExistsInTeam(
      email,
      teamId
    );

    if (exists) {
      await managerController.deleteManager(email, teamId);
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

// Endpoint to get manager details
router.get("/", async (req: Request, res: Response) => {
  // check the request comes from the manager
  if (req.body.role != ROLES.MANAGER) {
    console.log(HttpMsg.UNAUTHORIZED);
    res.status(HttpCode.UNAUTHORIZED).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  if (!req.body.userName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }
  try {
    // Get Manager details
    const teamResponse = await managerController.getManager(
      req.body.userName,
      req.body.teamId
    );

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

// Endpoint to get player details of the team
router.get("/getTeamPlayers",async (req:Request, res: Response) => {

  const managerEmail = req.body.userName;
  const teamId = req.body.teamId;
  // check the request comes from the manager
  if (req.body.role != ROLES.MANAGER) {
    console.log(HttpMsg.UNAUTHORIZED);
    res.status(HttpCode.UNAUTHORIZED).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  if (!managerEmail) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  

  try{
    const managerExists = await managerController.checkManagerExistsInTeam(managerEmail, teamId);

    if (managerExists){
      const teamPlayerResponse = await managerController.getPlayers(teamId);
      res.send(teamPlayerResponse);
    }else{
      throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
    }
    


  }catch (err) {
    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// Endpoint to get Team Analytics
router.get("/analytics-summary/:duration", async (req: Request, res: Response) => {
  const managerEmail = req.body.userName;
  const teamId = req.body.teamId;
  // check the request comes from the manager
  if (req.body.role != ROLES.MANAGER) {
    console.log(HttpMsg.UNAUTHORIZED);
    res.status(HttpCode.UNAUTHORIZED).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  if (!managerEmail) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    const managerExists = await managerController.checkManagerExistsInTeam(
      managerEmail,
      teamId
    );

    if (managerExists) {
      const teamAnalyticsResponse =
        await managerController.getTeamAnalytics(teamId, req.params.duration);
      res.send(teamAnalyticsResponse);
    } else {
      throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
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

// Endpoint Accept Invitation
router.get("/accept-invitation/token/:token", async (req, res) => {
  const token = req.params.token;
  const manager = await ManagerModel.findOne({ invitationToken: token }); 
  const managerInTeam = await ManagerTeamModel.findOne({ invitationToken: token }); 
  if (manager && (manager.isVerified == "pending")) {
    // Update manager status
    manager.isVerified = "verified";
    await manager.save();
    res.send("Invitation accepted successfully!");
  } else if (managerInTeam && (managerInTeam.accepted == "pending")){
    // Update manager status
    managerInTeam.accepted = "verified";
    await managerInTeam.save();
  } else{
    res.status(400).send("Invalid or expired token.");
  }
});

// Export the router for use in other files
export default router;
