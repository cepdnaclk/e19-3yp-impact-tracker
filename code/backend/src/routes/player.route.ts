import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import { validateEmail } from "../utils/utils";
import playerController from "../controllers/player.controller";
import PlayerModel from "../db/player.schema";
import PlayerTeamModel from "../db/players.in.team.schema";

// Create an instance of the Express Router
const router = Router();

// add plpayer to the player team collection by Manager
router.post("/add", async (req: Request, res: Response) => {
  const jersyId = req.body.jersyId;
  const fullName = req.body.fullName;
  const newPlayerEmail = req.body.playerEmail;
  const teamId = req.body.teamId;
  const managerEmail = req.body.userName;

  if (!newPlayerEmail || !teamId) {
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
      jersyId,
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
      res.send({ message: "Player created successfully"});
    } else {
      res.send({ message: "Player created failed" });
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


// Endpoint Accept Invitation
router.get("/accept-invitation/token/:token", async (req, res) => {
  const token = req.params.token;
  // const player = await PlayerModel.findOne({ invitationToken: token }); 
  const playerInTeam = await PlayerTeamModel.findOne({ invitationToken: token }); 
  if (playerInTeam && !playerInTeam.isVerified) {
    // Update manager status
    playerInTeam.isVerified = "Accepted";
    await playerInTeam.save();
    res.send("Invitation accepted successfully!");
  }
  else{
    res.status(400).send("Invalid or expired token.");
  }
});
export default router;
