import PlayerModel from "../db/player.schema";
import authService from "./auth.service";
import { PlayerRequestBody, PlayerResponse } from "../models/player.model";
import { TeamResponseWithIsVerified } from "../models/team.model";
import PlayerTeamModel from "../db/players.in.team.schema";
import TeamModel from "../db/team.schema";
import { AnalyticsSummary } from "../types/types";

class PlayerService {
  // async checkPlayerExistsInTeam(
  //   managerEmail: string,
  //   teamId: string
  // ): Promise<boolean> {
  //   try {
  //     const player = await PlayerModel.findOne({
  //       email: managerEmail,
  //       teamId: teamId,
  //     });
  //     const playerExists = !!player;
  //     return playerExists;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error checking manager existence");
  //   }
  // }

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
  async createPlayer(
    email: string, 
    password: string,
    invitationToken: string
    ): Promise<PlayerResponse> {
      try {
        const playerInstance = new PlayerModel({
          email: email,
          invitationToken: invitationToken,
          isVerified: "Pending",
        });
  
        // Save the player to the database
        const savedPlayer = await playerInstance.save();

        await authService.createAuth(
          email,
          password,
        );

      // Create a PalyerResponse object
      const playerResponse: PlayerResponse = new PlayerResponse(
        playerInstance.email,
        playerInstance.isVerified,
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
        playerInstance.email,
        playerInstance.isVerified,
      );

      return playerResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting manager details");
    }
  }

  async getTeamsForPlayer(email: string): Promise<Array<TeamResponseWithIsVerified>> {
    try {
      // Fetch playerTeams
      const playerTeams = await PlayerTeamModel.find({ playerEmail: email }, 'teamId isVerified');
  
      if (playerTeams.length === 0) {
        return [];
      }

      const teamIds = playerTeams.map(playerTeam => playerTeam.teamId);
      
      // Fetch teams from TeamModel
      const teams = await TeamModel.find({ teamId: { $in: teamIds } }, 'teamId teamName isVerified -_id');

      const teamsWithIsVerified: Array<TeamResponseWithIsVerified> = teams
        .map(team => {
          const matchingPlayerTeam = playerTeams.find(playerTeam => playerTeam.teamId === team.teamId);
          return matchingPlayerTeam
            ? new TeamResponseWithIsVerified(team.teamId, team.teamName, matchingPlayerTeam.isVerified)
            : null;
        })
        .filter((teamWithIsVerified): teamWithIsVerified is TeamResponseWithIsVerified => teamWithIsVerified !== null);
  
      return teamsWithIsVerified;
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }
  
  async getAnalyticsSummary(email: string, duration:number): Promise<void>{
    try{
      const playerTeams = await PlayerTeamModel.find({ playerEmail: email }, 'teamId jerseyId');

    // if (playerTeams.length === 0) {
    //   return [];
    // }

    const jerseyIdsByTeam: Record<string, number[]> = {};

    playerTeams.forEach(playerTeam => {
      const { teamId, jerseyId } = playerTeam;
      jerseyIdsByTeam[teamId] = jerseyIdsByTeam[teamId] || [];
      jerseyIdsByTeam[teamId].push(jerseyId);
    });

    // Now jerseyIdsByTeam is an object where each teamId is associated with an array of jerseyIds
    console.log(jerseyIdsByTeam);

    }catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }   
}
export default new PlayerService();
