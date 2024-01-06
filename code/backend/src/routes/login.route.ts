import { Router } from "express";
import { Request, Response } from "express";
import { LoginResquest, LoginResponse } from "../models/login.model";
import {
  loginManager,
  loginPlayer,
  logout,
} from "../controllers/login.controller";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";

// Create an instance of the Express Router
const router = Router();

// Endpoint to handle login for a manager
router.post("/manager", async (req: Request, res: Response) => {
  // Extract password and userName from the request body
  const password = req.body.password;
  const userName = req.body.userName;

  // Check if password or userName is missing
  if (!password || !userName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(userName)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    // Create a LoginRequest instance for manager login
    const loginReq: LoginResquest = new LoginResquest(password, userName);

    // Perform manager login and get the status
    const loginRes: LoginResponse = await loginManager(loginReq);

    // Send a response (you may want to send the status or additional data here)
    res.send(loginRes);
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

// Endpoint to handle login for a player
router.post("/player", async (req: Request, res: Response) => {
  // Extract password and userName from the request body
  const password = req.body.password;
  const userName = req.body.userName;

  // Check if password or userName is missing
  if (!password || !userName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(userName)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    // Create a LoginRequest instance for player login
    const loginReq: LoginResquest = new LoginResquest(password, userName);

    // Perform player login and get the status
    const loginRes: LoginResponse = await loginPlayer(loginReq);

    // Send a response (you may want to send the status or additional data here)
    res.send(loginRes);
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

// logout endpoint
router.post("/logout", async (req: Request, res: Response) => {
  // Extract password and userName from the request body
  const userName = req.body.userName;

  try {
    // Perform player login and get the status
    const loginRes = await logout(userName);

    // Send a response (you may want to send the status or additional data here)
    res.send({ message: loginRes });
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
