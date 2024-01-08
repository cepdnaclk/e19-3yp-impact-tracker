import { verifyRefreshToken, verifyAccessToken } from "../utils/jwt.token";
import { Request, Response, NextFunction } from "express";
import excludedRoutes from "../config/allowEndPoints";
import ROLES from "../config/roles";
import { checkManagerExists } from "../controllers/manager.controller";
import { checkPlayerExists } from "../controllers/player.controller";
import { validateEmail } from "../utils/utils";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";

// check the role and userName, and check the user exists from the database
export async function checkRoleAndUserName(
  role: string,
  userName: string
): Promise<boolean> {
  if (role == ROLES.MANAGER) {
    // check manager exists
    return await checkManagerExists(userName);
  } else if (role == ROLES.PLAYER) {
    // check player exists
    return await checkPlayerExists(userName);
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
    req.path.startsWith("/team/exists/teamId") ||
    req.path.startsWith("/manager/exists/email")
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
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  // Verify the access token
  try {
    const decoded = verifyAccessToken(token);

    // If the access token is valid, set the userName and role in the request
    req.body.userName = decoded.userName;
    req.body.role = decoded.role;
    req.body.refreshToken = token;

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

    const status = await checkRoleAndUserName(decoded.role, decoded.userName);
    if (!status) {
      return res.status(401).json({ message: "Invalid user" });
    }

    next();
  } catch (err) {
    // If the access token is invalid, send an error message
    res.status(401).send({ message: "Invalid access token" });
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
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  // Verify the refresh token
  try {
    const decoded = verifyRefreshToken(token);
    // If the refresh token is valid, set the userName and role in the request
    req.body.userName = decoded.userName;
    req.body.role = decoded.role;

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

    const status = await checkRoleAndUserName(decoded.role, decoded.userName);
    if (!status) {
      return res.status(401).json({ message: "Invalid user" });
    }

    next();
  } catch (err) {
    // If the refresh token is invalid, send an error message
    res.status(401).send({ message: "Invalid refresh token" });
  }
}
