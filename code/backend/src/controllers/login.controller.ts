import { LoginResquest, LoginResponse } from "../models/login.model";
import { checkAuthExists, checkAuth } from "../services/auth,service";
import { createJwt, checkJwtExists, deleteJwt } from "../services/jwt.service";
import { createRefreshToken, createAccessToken } from "../utils/jwt.token";

async function loginManager(loginReq: LoginResquest): Promise<LoginResponse> {
  const role = "manager";

  // check manager exists
  const authExists = await checkAuthExists(loginReq.userName);

  if (!authExists) {
    throw new Error("Auth does not exist");
  }

  // check auth
  const isMatch = await checkAuth(loginReq.userName, loginReq.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  try {
    // create refresh token
    const refreshToken = createRefreshToken(loginReq, role);

    // create access token
    const accessToken = createAccessToken(loginReq, role);

    // create jwt
    const jwt = await createJwt(loginReq.userName, refreshToken);

    // return new LoginResponse(refreshToken, accessToken);
    const loginResponse = new LoginResponse(refreshToken, accessToken);

    return loginResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating login");
  }
}

async function loginPlayer(loginReq: LoginResquest): Promise<LoginResponse> {
  const role = "player";

  // check manager exists
  const authExists = await checkAuthExists(loginReq.userName);

  if (!authExists) {
    throw new Error("Auth does not exist");
  }

  // check auth
  const isMatch = await checkAuth(loginReq.userName, loginReq.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  try {
    // create refresh token
    const refreshToken = createRefreshToken(loginReq, role);

    // create access token
    const accessToken = createAccessToken(loginReq, role);

    // create jwt
    const jwt = await createJwt(loginReq.userName, refreshToken);

    // return new LoginResponse(refreshToken, accessToken);
    const loginResponse = new LoginResponse(refreshToken, accessToken);

    return loginResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating login");
  }
}

async function logout(email: string): Promise<boolean> {
  try {
    const jwtExists = await checkJwtExists(email);

    if (jwtExists) {
      await deleteJwt(email);
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting jwt");
  }

  return false;
}

export { loginManager, loginPlayer, logout };
