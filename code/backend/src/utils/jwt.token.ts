import jwt from "jsonwebtoken";
import { LoginResquest, LoginResquestManager } from "../models/login.model";

// create refresh token
export function createRefreshToken(credentials: LoginResquest, role: string) {
  const jwtSecret = process.env.JWT_REFRESH_TOKEN_KEY || "";
  const refreshToken = jwt.sign(
    {
      userName: credentials.userName,
      role: role,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME,
    }
  );

  return refreshToken;
}

// create access token
export function createAccessToken(credentials: LoginResquest, role: string) {
  const jwtSecret = process.env.JWT_ACCESS_TOKEN_KEY || "";
  const accessToken = jwt.sign(
    {
      userName: credentials.userName,
      role: role,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME,
    }
  );
  return accessToken;
}

// verify refresh token
export function verifyRefreshToken(token: string) {
  const jwtSecret = process.env.JWT_REFRESH_TOKEN_KEY || "";
  const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
  return decoded;
}

// verify access token
export function verifyAccessToken(token: string) {
  const jwtSecret = process.env.JWT_ACCESS_TOKEN_KEY || "";
  const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
  return decoded;
}
