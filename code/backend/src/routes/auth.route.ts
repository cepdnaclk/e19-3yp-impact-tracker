import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";
import { createAccessToken } from "../utils/jwt.token";
import { LoginResquest, LoginResponse } from "../models/login.model";
import { refreshTokenMiddleware } from "../middleware/auth.middleware";

// Create an instance of the Express Router
const router = Router();

// get the access token
router.get("/", refreshTokenMiddleware, async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const role = req.body.role;
  const refreshToken = req.body.refreshToken;

  // Check if password or userName is missing
  if (!userName) {
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
    const loginReq: LoginResquest = new LoginResquest("", userName);

    // create access token
    const accessToken = createAccessToken(loginReq, role);

    // return new LoginResponse(refreshToken, accessToken);
    const loginResponse = new LoginResponse(refreshToken, accessToken);

    res.send(loginResponse);
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
