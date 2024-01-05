import { verifyRefreshToken, verifyAccessToken } from "../utils/jwt.token";
import { Request, Response, NextFunction } from "express";
import excludedRoutes from "../config/allowEndPoints";

// Middleware to verify access token
export function accessTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    excludedRoutes.some((route) => {
      return route.method === req.method && req.path.startsWith(route.path);
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

    next();
  } catch (err) {
    // If the access token is invalid, send an error message
    res.status(401).send({ message: "Invalid access token" });
  }
}

// Middleware to verify refresh token
export function refreshTokenMiddleware(
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

    next();
  } catch (err) {
    // If the refresh token is invalid, send an error message
    res.status(401).send({ message: "Invalid refresh token" });
  }
}
