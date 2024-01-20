import PlayerModel from "../db/player.schema";
import authService from "./auth.service";
import { PlayerRequestBody, PlayerResponse } from "../models/player.model";

class PlayerService {
  async checkPlayerExistsInTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      const player = await PlayerModel.findOne({
        email: managerEmail,
        teamId: teamId,
      });
      const playerExists = !!player;
      return playerExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking manager existence");
    }
  }

  async checkPlayerExists(email: string): Promise<boolean> {
    try {
      const player = await PlayerModel.findOne({ email: email });
      const playerExists = !!player;
      return playerExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking player existence");
    }
  }

  async addPlayer(
    firstName: string,
    lastName: string,
    email: string,) {
    try {
      const playerInstanceNoPassword = new PlayerModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: null
      });

      // Save the player to the database
      const savedPlayer = await playerInstanceNoPassword.save();

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error adding player");
    }

  }
  async createPlayer(playerRequestBody: PlayerRequestBody) {
      try {
        const playerInstance = new PlayerModel({
          firstName: playerRequestBody.firstName,
          lastName: playerRequestBody.lastName,
          email: playerRequestBody.email,
          password: playerRequestBody.password,
        });
  
        // Save the player to the database
        const savedPlayer = await playerInstance.save();

        await authService.createAuth(
          playerRequestBody.email,
          playerRequestBody.password,
        );

      // Create a PalyerResponse object
      const playerResponse: PlayerResponse = new PlayerResponse(
        playerRequestBody
      );
  
        return playerResponse;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding player");
      }
  
  }
  async updatePlayerPassword(email: string, password: string): Promise<void> {
      const player = await PlayerModel.findOne({ email: email });
  
      if (player) {
        // player.password = password;
        // await player.save();
        await authService.createAuth(
          player.email,
          password,
        );
      }
    }
}

export default new PlayerService();
