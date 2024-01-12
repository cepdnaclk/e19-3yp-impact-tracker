import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import {
  createAccessToken,
  createAccessTokenManager,
} from "../utils/jwt.token";
import {
  LoginResquest,
  LoginResponse,
  LoginResquestManager,
} from "../models/login.model";
import { refreshTokenMiddleware } from "../middleware/auth.middleware";
import ROLES from "../config/roles";

// Create an instance of the Express Router
const router = Router();

// get the access token
router.get("/", refreshTokenMiddleware, async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const role = req.body.role;
  const refreshToken = req.body.refreshToken;
  const teamId = req.body.teamId;

  try {
    const loginResponse = new LoginResponse(refreshToken, "");
    if (role == ROLES.PLAYER) {
      // Create a LoginRequest instance for manager login
      const loginReq: LoginResquest = new LoginResquest("", userName);

      // create access token
      const accessToken = createAccessToken(loginReq, role);
      loginResponse.accessToken = accessToken;
    } else if (role == ROLES.MANAGER) {
      const loginReq: LoginResquestManager = new LoginResquestManager(
        "",
        userName,
        teamId
      );

      // create access token for manager
      const accessToken = createAccessTokenManager(loginReq, role);
      loginResponse.accessToken = accessToken;
    }

    // return new LoginResponse(refreshToken, accessToken);

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
