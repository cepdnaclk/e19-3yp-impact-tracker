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
        playerRequestBody.firstName,
        playerRequestBody.lastName,
        playerRequestBody.email
      );
  
        return playerResponse;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding player");
      }
  
  }
  async updatePlayerPassword(email: string, password: string): Promise<boolean> {
      const player = await PlayerModel.findOne({ email: email });
  
      if (player) {
        const playerResponse = await authService.createAuth(
          player.email,
          password,
        );
        return playerResponse;
      }
      return false;
  }
  async getPlayer(email: string): Promise<PlayerResponse> {
    try {
      // Get the player details
      const playerInstance = await PlayerModel.findOne({ email });

      // Check if playerInstance is null
      if (!playerInstance) {
        throw new Error("Player not found");
      }

      // Create a ManagerResponse object
      const playerResponse = new PlayerResponse(
        playerInstance.firstName,
        playerInstance.lastName,
        playerInstance.email
      );

      return playerResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting manager details");
    }
  }
}

export default new PlayerService();
