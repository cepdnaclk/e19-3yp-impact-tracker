import {
  LoginResquest,
  LoginResponse,
  LoginResquestManager,
} from "../models/login.model";
import authService from "../services/auth.service";
import jwtService from "../services/jwt.service";
import {
  createRefreshToken,
  createAccessToken,
  createRefreshTokenManager,
  createAccessTokenManager,
} from "../utils/jwt.token";
import { HttpMsg } from "../exceptions/http.codes.mgs";
import ROLES from "../config/roles";

class LoginController {
  async loginManager(loginReq: LoginResquestManager): Promise<LoginResponse> {
    const role = ROLES.MANAGER;

    // check manager exists
    const authExists = await authService.checkAuthExistsForManager(
      loginReq.userName,
      loginReq.teamId
    );

    if (!authExists) {
      throw new Error(HttpMsg.AUTH_DOES_NOT_EXIST);
    }

    // check auth
    const isMatch = await authService.checkAuthManager(
      loginReq.userName,
      loginReq.password,
      loginReq.teamId
    );

    if (!isMatch) {
      throw new Error(HttpMsg.PASSWORD_INCORRECT);
    }

    try {
      // create refresh token
      const refreshToken = createRefreshTokenManager(loginReq, role);

      // create access token
      const accessToken = createAccessTokenManager(loginReq, role);

      // return new LoginResponse(refreshToken, accessToken);
      const loginResponse = new LoginResponse(refreshToken, accessToken);

      return loginResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginPlayer(loginReq: LoginResquest): Promise<LoginResponse> {
    const role = ROLES.PLAYER;

    // check manager exists
    const authExists = await authService.checkAuthExists(loginReq.userName);

    if (!authExists) {
      throw new Error(HttpMsg.AUTH_DOES_NOT_EXIST);
    }

    // check auth
    const isMatch = await authService.checkAuth(
      loginReq.userName,
      loginReq.password
    );

    if (!isMatch) {
      throw new Error(HttpMsg.PASSWORD_INCORRECT);
    }

    try {
      // create refresh token
      const refreshToken = createRefreshToken(loginReq, role);

      // create access token
      const accessToken = createAccessToken(loginReq, role);

      // create jwt
      const jwt = await jwtService.createJwt(loginReq.userName, refreshToken);

      // return new LoginResponse(refreshToken, accessToken);
      const loginResponse = new LoginResponse(refreshToken, accessToken);

      return loginResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout(email: string): Promise<boolean> {
    try {
      const jwtExists = await jwtService.checkJwtExists(email);

      if (jwtExists) {
        await jwtService.deleteJwt(email);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }

    return false;
  }
}

export default new LoginController();
