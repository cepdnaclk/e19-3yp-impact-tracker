import { verifyRefreshToken, verifyAccessToken } from "../utils/jwt.token";
import { Request, Response, NextFunction } from "express";
import {
  excludedRoutes,
  excludedRoutesStartWith,
} from "../config/allowEndPoints";
import ROLES from "../config/roles";
import playerController from "../controllers/player.controller";
import teamController from "../controllers/team.controller";
import { validateEmail } from "../utils/utils";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";

// check the role and userName, and check the user exists from the database
export async function checkRoleAndUserName(
  role: string,
  userName: string,
  teamId: string
): Promise<boolean> {
  if (role == ROLES.MANAGER) {
    // check manager exists
    return await teamController.checkManagerExistsInTeam(userName, teamId);
  } else if (role == ROLES.PLAYER) {
    // check player exists
    return await playerController.checkPlayerExists(userName);
  }

  return false;
}

// Middleware to verify access token
export async function accessTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    excludedRoutesStartWith.some((route) => {
      return req.path.startsWith(route.path) && req.method === route.method;
    })
  ) {
    // Skip token verification for specified routes
    return next();
  }

  if (
    excludedRoutes.some((route) => {
      return route.method === req.method && req.path === route.path;
    })
  ) {
    // Skip token verification for specified routes
    return next();
  }

  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: HttpMsg.AUTHENTICATION_TOKEN_NOT_FOUND });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: HttpMsg.AUTHENTICATION_TOKEN_NOT_FOUND });
  }

  // Verify the access token
  try {
    const decoded = verifyAccessToken(token);

    // If the access token is valid, set the userName and role in the request
    req.body.userName = decoded.userName;
    req.body.role = decoded.role;
    req.body.refreshToken = token;
    req.body.teamId = decoded.teamId || "";

    if (!decoded.userName) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Validate email format
    if (!validateEmail(decoded.userName)) {
      console.log(HttpMsg.INVALID_EMAIL);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
      return;
    }

    let status = false;

    if (req.body.role == ROLES.MANAGER) {
      req.body.teamId = decoded.teamId;
      status = await checkRoleAndUserName(
        decoded.role,
        decoded.userName,
        decoded.teamId
      );
    } else if (req.body.role == ROLES.PLAYER) {
      status = await checkRoleAndUserName(decoded.role, decoded.userName, "");
    }

    if (!status) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: HttpMsg.INVALID_USER });
    }

    next();
  } catch (err) {
    // If the access token is invalid, send an error message
    res
      .status(HttpCode.UNAUTHORIZED)
      .send({ message: HttpMsg.INVALID_ACCESS_TOKEN });
  }
}

// Middleware to verify refresh token
export async function refreshTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: HttpMsg.AUTHENTICATION_TOKEN_NOT_FOUND });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: HttpMsg.AUTHENTICATION_TOKEN_NOT_FOUND });
  }

  // Verify the refresh token
  try {
    const decoded = verifyRefreshToken(token);
    // If the refresh token is valid, set the userName and role in the request
    req.body.userName = decoded.userName;
    req.body.role = decoded.role;
    req.body.teamId = decoded.teamId || "";

    // Check if password or userName is missing
    if (!decoded.userName) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Validate email format
    if (!validateEmail(decoded.userName)) {
      console.log(HttpMsg.INVALID_EMAIL);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
      return;
    }

    let status = false;

    if (req.body.role == ROLES.MANAGER) {
      status = await checkRoleAndUserName(
        decoded.role,
        decoded.userName,
        decoded.teamId
      );
    } else if (req.body.role == ROLES.PLAYER) {
      status = await checkRoleAndUserName(decoded.role, decoded.userName, "");
    }

    if (!status) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: HttpMsg.INVALID_USER });
    }

    next();
  } catch (err) {
    // If the refresh token is invalid, send an error message
    res
      .status(HttpCode.UNAUTHORIZED)
      .send({ message: HttpMsg.INVALID_REFRESH_TOKEN });
  }
}
