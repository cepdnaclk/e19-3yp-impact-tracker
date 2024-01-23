import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import { validateEmail } from "../utils/utils";
import playerController from "../controllers/player.controller";
import PlayerModel from "../db/player.schema";
import PlayerTeamModel from "../db/players.in.team.schema";
import { PlayerInTeamResponse, PlayerTeamRequest } from "../models/player.model";

// Create an instance of the Express Router
const router = Router();

// add plpayer to the player team collection by Manager
router.post("/add", async (req: Request, res: Response) => {
  const jerseyId = req.body.jerseyId;
  const fullName = req.body.fullName;
  const newPlayerEmail = req.body.playerEmail;
  const teamId = req.body.teamId;
  const managerEmail = req.body.userName;

  if (!jerseyId || !teamId) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(newPlayerEmail)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    const playerInTeamResponse = await playerController.addNewPlayer(
      jerseyId,
      fullName,
      newPlayerEmail,
      teamId,
      managerEmail,
    );
    res.send(playerInTeamResponse);

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

// Endpoint to create a new player
router.post("/", async (req: Request, res: Response) => {
  // Extract player details from the request body
  const email = req.body.email;
  const password = req.body.password;

  // Check if any required field is missing
  if (!email || !password) {
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
    const playerResponse = await playerController.createPlayer( email, password);
    if (playerResponse) {
      res.send(playerResponse);
    } else {
      res.send({ message: "Player create new account failed" });
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

// Endpoint to get player details
router.get("/", async (req: Request, res: Response) => {
  if (!req.body.userName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }
  try {
    // Get Player details
    const playerResponse = await playerController.getPlayer(
      req.body.userName
    );

    res.send(playerResponse);
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

// Endpoint to update player details
router.put("/update", async (req: Request, res: Response) => {
  const newPlayerEmail = req.body.playerEmail;
  const jerseyId = req.body.jerseyId;
  const fullName = req.body.fullName;
  const managerEmail = req.body.userName; // extract from middleware
  const teamId = req.body.teamId;         // extract from middleware

  // Check if any required field is missing
  if (!jerseyId || !fullName || !newPlayerEmail ) {
    const missingFields = [];
  if (!jerseyId) missingFields.push("jerseyId");
  if (!fullName) missingFields.push("fullName");
  if (!newPlayerEmail) missingFields.push("newPlayerEmail");

  const errorMessage = `Missing required fields: ${missingFields.join(", ")}`;
  console.log(errorMessage);
  res.status(HttpCode.BAD_REQUEST).send({ message: errorMessage });
  }

  // Validate email format
  if (!validateEmail(newPlayerEmail)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    const player = await PlayerTeamModel.findOne({ 
      jesryId: jerseyId,
      teamId: teamId });

    const playerTeamRequest = new PlayerTeamRequest(
      newPlayerEmail,
      jerseyId,
      fullName
    );

      
    let playerInTeamResponse;

    if (player){

      playerInTeamResponse = await playerController.updatePlayer(
        playerTeamRequest, 
        managerEmail, 
        teamId);

      // if (player.playerEmail != newPlayerEmail) {
      //   // Player with the same email already exists, update the existing player

      // } else {
      //   // Player with a new email, create a new player
      //   playerInTeamResponse = await playerController.addNewPlayer(
      //     jerseyId,
      //     fullName,
      //     newPlayerEmail,
      //     teamId,
      //     managerEmail,
      //   );
      //   res.send({ message: "Player created successfully", playerInTeamResponse });
      // }


      res.send({ message: "Player updated successfully", playerInTeamResponse });

    }else{
      throw new Error(HttpMsg.PLAYER_NOT_EXISTS_IN_TEAM);
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

// Endpoint to remove player from team
router.delete("/remove",async (req:Request, res: Response) => {
    const jerseyId = req.body.jerseyId;
    const teamId = req.body.teamId;
    const managerEmail = req.body.userName;

    // Check if any required field is missing
    if (!jerseyId) {
 
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }
  
    try{
      const isRemoved = await playerController.removePlayer(jerseyId, teamId, managerEmail);

      if (isRemoved) {
        return res.send({ message: "Player removed from team successfully" });
      } else {
        throw new Error(HttpMsg.PLAYER_REMOVE_FAILED);
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

// Endpoint to get all the teams of Player
router.get("/myTeams", async (req, res) => {
  const playerEmail = req.body.userName;
  try {

    const teams = await playerController.getTeamsForPlayer(playerEmail);

    if (teams.length > 0) {
      res.send({ teams });
    } else {
      res.send({ message: "Player is not part of any teams" });
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

// Endpoint to get analytics summary
router.get("/analytics-summary/:duration",async (req:Request, res: Response) => {
  if (!req.body.userName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }
  try {
    
    const playerEmail = req.body.userName; // player email is retrieved from the request body

    // Check if player exists
    const playerExists = await playerController.checkPlayerExists(playerEmail);

    if (!playerExists) {
      throw new Error(HttpMsg.PLAYER_DOES_NOT_EXIST);
    }

    // Assuming 'getAnalyticsSummary' is a function in your playerController
    // const analyticsSummary = await playerController.getAnalyticsSummary(playerEmail, req.params.duration);
    await playerController.getAnalyticsSummary(playerEmail, req.params.duration);
    // res.send({ analyticsSummary });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint Accept Invitation
router.get("/accept-invitation/token/:token", async (req, res) => {
  const token = req.params.token;
  // const player = await PlayerModel.findOne({ invitationToken: token }); 
  const playerInTeam = await PlayerTeamModel.findOne({ invitationToken: token }); 
  if (playerInTeam && playerInTeam.isVerified == "Pending") {
    // Update player status
    playerInTeam.isVerified = "Accepted";
    await playerInTeam.save();
    res.send("Invitation accepted successfully!");
  }
  else{
    res.status(400).send("Invalid or expired token.");
  }
});

// Endpoint verify email
router.get("/verify-email/token/:token", async (req, res) => {
  const token = req.params.token;
  const player = await PlayerModel.findOne({ invitationToken: token }); 
  // const playerInTeam = await PlayerTeamModel.findOne({ invitationToken: token }); 
  if (player && player.isVerified == "Pending") {
    // Update player status
    player.isVerified = "Accepted";
    await player.save();
    res.send("Invitation accepted successfully!");
  }
  else{
    res.status(400).send("Invalid or expired token.");
  }
});
export default router;
