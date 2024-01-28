import playersInTeamService from "../services/players.in.team.service";
import managerService from "../services/manager.service";
import playerService from "../services/player.service";
import { HttpMsg } from "../exceptions/http.codes.mgs";
import { TeamIdEmailExistsResponse, TeamResponse} from "../models/team.model";
import teamService from "../services/team.service";
import { v4 as uuidv4 } from "uuid";
import PlayerModel from "../db/player.schema";
import TeamModel from "../db/team.schema";
import { sendInvitationEmail } from "../email/playerInviteEmail";
import { sendVerificationEmail } from "../email/playerVerifyEmail";
import { findSourceMap } from "module";
import { Player, PlayerInTeamResponse, PlayerRequestBody, PlayerResponse, PlayerTeamRequest } from "../models/player.model";
import PlayerTeamModel from "../db/players.in.team.schema";
import { AnalyticsSummary } from "../types/types";

class PlayerController {
  
  // add player to the player team collection
  async addNewPlayer(
    jerseyId: number,
    fullName: string,
    newPlayerEmail: string,
    teamId: string,
    managerEmail: string,

  ): Promise<PlayerInTeamResponse> {
    try {
      // check the team exist
      const teamIdEmailExistsResponse: TeamIdEmailExistsResponse = await teamService.checkTeamEmailExist(teamId,managerEmail);
      if (!teamIdEmailExistsResponse.teamExists) {
        throw new Error(HttpMsg.TEAM_NOT_FOUND);
      }
      if (!teamIdEmailExistsResponse.managerExists) {
        throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      }
      // check if player already exists in the team
      const playerExistsInTeam = await playersInTeamService.checkPlayerExistsInTeam(
        jerseyId,
        teamId,
      );

      
      if (playerExistsInTeam) {
        throw new Error(HttpMsg.PLAYER_ALREADY_EXISTS_IN_TEAM);

      // If player not exist in that team => added to the team (player in teams)
      }else{
        // Create a player with an invitation token
        const invitationToken = generateInvitationToken();
        const teamInstance = await TeamModel.findOne({ teamId });
        const teamName = teamInstance?.teamName; // Add null check using optional chaining operator


        const playerInTeamResponse = await playersInTeamService.addPlayerToTeam(
          newPlayerEmail, 
          teamId,
          jerseyId,
          fullName,
          invitationToken
        );

        // Send the invitation email
        
        await sendInvitationEmail(fullName, newPlayerEmail, invitationToken, teamName!);
        
        return playerInTeamResponse
      }

      
      // // check if new player already has an account 
      // //TODO: Remove if user will not be able to create an account within 30 days 
      // const playerExists = await playerService.checkPlayerExists(newPlayerEmail);

      // // If player not exist in the player collection => added to the player collection
      // if (!playerExists) {

      //   await playerService.addPlayer(
      //     firstName,
      //     lastName,
      //     newPlayerEmail
      //   );
      // }


    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  // create player 
  async createPlayer(
    email: string, 
    password: string
    ): Promise<PlayerResponse> {
    try {
      // check if player already has an account
      const exists: boolean = await playerService.checkPlayerExists(email);

      if (exists) {
        throw new Error(HttpMsg.PLAYER_ALREADY_HAS_ACCOUNT);

      } else {
        // Create a new player account
        // const playerRequestBody: PlayerRequestBody  = new PlayerRequestBody(
        //   email,
        //   password
        // );
        
  
        // Create a player with an invitation token
        const invitationToken = generateInvitationToken();
        const playerResponse = await playerService.createPlayer(email, password, invitationToken);
        // Send the verification email
        await sendVerificationEmail(email, invitationToken);

        return playerResponse;
        
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
   
  }

  //get player details
  async getPlayer(
    playerEmail: string
  ): Promise<PlayerResponse> {
    try {
      const playerResponse = await playerService.getPlayer(
        playerEmail
      );
      return playerResponse;
    } catch (error) {
      console.error(error);
      // Handle the error, either by returning a default value or throwing an error
      throw error;
    }
  }
  // player exists
  async checkPlayerExists(email: string): Promise<boolean> {
    try {
      // const email = req.params.email;
      // Call the function in service
      const playerExists = await playerService.checkPlayerExists(email);
      // res.status(200).json(managerExists);
      return playerExists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Update player in Team
  async updatePlayer(
  playerTeamRequest: PlayerTeamRequest,
  managerEmail: string,
  teamId: string,

): Promise<PlayerInTeamResponse> {

    try{ 
      // check the team exist and manager exist
      const teamIdEmailExistsResponse: TeamIdEmailExistsResponse = await teamService.checkTeamEmailExist(teamId,managerEmail);
      if (!teamIdEmailExistsResponse.teamExists) {
        throw new Error(HttpMsg.TEAM_NOT_FOUND);
      }
      if (!teamIdEmailExistsResponse.managerExists) {
        throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      }
      // check if player exists in the team
      const playerExistsInTeam = await playersInTeamService.checkPlayerExistsInTeam(
        playerTeamRequest.jerseyId,
        teamId,
      );

      if (playerExistsInTeam){
        const playerInTeamResponse = await playersInTeamService.updatePlayerInTeam(playerTeamRequest);

        //If the email get changed => send verification email
        if (playerInTeamResponse.playerEmail != playerTeamRequest.playerEmail){

          // Create a player with an invitation token
          const invitationToken = generateInvitationToken();
          const teamInstance = await TeamModel.findOne({ teamId });
          const teamName = teamInstance?.teamName; // Add null check using optional chaining operator

            // Send the invitation email
          await sendInvitationEmail(playerInTeamResponse.fullName, playerInTeamResponse.playerEmail, invitationToken, teamName!);
        }

        
        return playerInTeamResponse;
      }else{
        throw new Error(HttpMsg.PLAYER_NOT_EXISTS_IN_TEAM)
      }

    }catch(error){
      console.error(error);
      throw error;
    }
    
  }

  // Remove player in team
  async removePlayer(
    jerseyId: number,
    teamId: string,
    managerEmail: string

  ): Promise<boolean>{

    try{
      // check the team exist
      const teamIdEmailExistsResponse: TeamIdEmailExistsResponse = await teamService.checkTeamEmailExist(teamId,managerEmail);
      if (!teamIdEmailExistsResponse.teamExists) {
        throw new Error(HttpMsg.TEAM_NOT_FOUND);
      }
      if (!teamIdEmailExistsResponse.managerExists) {
        throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      }
      // check if player already exists in the team
      const playerExistsInTeam = await playersInTeamService.checkPlayerExistsInTeam(
        jerseyId,
        teamId,
      );
      if (playerExistsInTeam){
        const isRemoved = await playersInTeamService.removePlayerInTeam(
          jerseyId,
          teamId
        );
        return isRemoved;
      }else{
        throw new Error(HttpMsg.PLAYER_NOT_EXISTS_IN_TEAM);
      }  
      
      
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  // Get all the teams of player
  async getTeamsForPlayer(
    playerEmail: string
    ): Promise<Array<TeamResponse>>{
     
      try {
        const teams = await playerService.getTeamsForPlayer(playerEmail);
        return teams;
      } catch (error) {
        console.error(error);
        throw new Error("Error in player service");
      }
  }
  
  async getAnalyticsSummary(
    email: string,
    duration: string
  ): Promise<AnalyticsSummary>{
    // 'Last Week' , 'Last Month' , 'All Time'
    let durationNumber: number = 0;

    if (duration == "All Time"){
      durationNumber = Date.now();
    } else if (duration == "Last Month"){
      durationNumber = 30 * 24 * 60 * 60 * 1000;
    } else if (duration == "Last Week"){
      durationNumber = 7 * 24 * 60 * 60 * 1000;
    }
    // console.log(durationNumber);

    try {
      const analyticsSummary = await playerService.getAnalyticsSummary(email, durationNumber);
      return analyticsSummary;
    } catch (error) {
      console.error(error);
      throw new Error("Error in player service");
    }

  }
  
}
function generateInvitationToken(): string {
  // Generate a UUID (v4) using the uuid library
  const uniqueToken = uuidv4();

  return uniqueToken;
}
export default new PlayerController();
