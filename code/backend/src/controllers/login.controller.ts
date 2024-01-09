import {
  LoginResquest,
  LoginResponse,
  LoginResquestManager,
} from "../models/login.model";
import { checkAuthExists, checkAuth } from "../services/auth.service";
import { createJwt, checkJwtExists, deleteJwt } from "../services/jwt.service";
import { createRefreshToken, createAccessToken } from "../utils/jwt.token";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import ROLES from "../config/roles";

async function loginManager(
  loginReq: LoginResquestManager
): Promise<LoginResponse> {
  const role = ROLES.MANAGER;

  // check manager exists
  const authExists = await checkAuthExists(loginReq.userName);

  if (!authExists) {
    throw new Error(HttpMsg.AUTH_DOES_NOT_EXIST);
  }

  // check auth
  const isMatch = await checkAuth(loginReq.userName, loginReq.password);

  if (!isMatch) {
    throw new Error(HttpMsg.PASSWORD_INCORRECT);
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
    throw new Error(HttpMsg.ERROR_CREATING_LOGIN);
  }
}

async function loginPlayer(loginReq: LoginResquest): Promise<LoginResponse> {
  const role = ROLES.PLAYER;

  // check manager exists
  const authExists = await checkAuthExists(loginReq.userName);

  if (!authExists) {
    throw new Error(HttpMsg.AUTH_DOES_NOT_EXIST);
  }

  // check auth
  const isMatch = await checkAuth(loginReq.userName, loginReq.password);

  if (!isMatch) {
    throw new Error(HttpMsg.PASSWORD_INCORRECT);
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
    throw new Error(HttpMsg.ERROR_CREATING_LOGIN);
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
    throw new Error(HttpMsg.ERROR_CREATING_JWT);
  }

  return false;
}

export { loginManager, loginPlayer, logout };
