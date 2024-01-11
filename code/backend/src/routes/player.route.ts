import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import { validateEmail } from "../utils/utils";
import { addNewPlayer } from "../controllers/player.controller";

// Create an instance of the Express Router
const router = Router();

// add plpayer to the player team collection
router.post("/add", async (req: Request, res: Response) => {
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
    const state = await addNewPlayer(managerEmail, newPlayerEmail, teamId);

    if (state == true) {
      res.send({ message: "Player added successfully" });
    } else {
      res.send({ message: "Player added failed" });
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

export default router;
