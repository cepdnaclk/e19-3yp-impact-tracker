import playersInTeamService from "../services/players.in.team.service";
import managerService from "../services/manager.service";
import playerService from "../services/player.service";
import { HttpMsg } from "../exceptions/http.codes.mgs";
import { TeamIdEmailExistsResponse} from "../models/team.model";
import teamService from "../services/team.service";
import { v4 as uuidv4 } from "uuid";
import PlayerModel from "../db/player.schema";
import TeamModel from "../db/team.schema";
import { sendInvitationEmail } from "../email/playerInviteEmail";
import { findSourceMap } from "module";
import { PlayerRequestBody, PlayerResponse } from "../models/player.model";

class PlayerController {
  
  // add player to the player team collection
  async addNewPlayer(
    jersyId: string,
    firstName: string,
    lastName: string,
    newPlayerEmail: string,
    teamId: string,
    managerEmail: string,

  ): Promise<boolean> {
    try {
      // check the team exist
      const teamIdEmailExistsResponse: TeamIdEmailExistsResponse = await teamService.checkTeamEmailExist(teamId,managerEmail);
      if (!teamIdEmailExistsResponse.teamExists) {
        throw new Error(HttpMsg.TEAM_NOT_FOUND);
      }
      if (!teamIdEmailExistsResponse.managerExists) {
        throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      }

      // // check the manager exits in that team
      // const managerExists = await managerService.checkManagerExistsInTeam(
      //   managerEmail,
      //   teamId
      // );

      // if (!managerExists) {
      //   throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
      // }

      // check player exist in that team
      const playerExistsInTeam = await playersInTeamService.checkPlayerExistsInTeam(
        newPlayerEmail,
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

        await playersInTeamService.addPlayerToTeam(
          newPlayerEmail, 
          teamId,
          jersyId,
          firstName,
          lastName,
          invitationToken
        );

        // Send the verification email
        await sendInvitationEmail(firstName, lastName, newPlayerEmail, invitationToken, teamName!);
      }

      
      // check if new player already has an account 
      //TODO: Remove if user will not be able to create an account within 30 days 
      const playerExists = await playerService.checkPlayerExists(newPlayerEmail);

      // If player not exist in the player collection => added to the player collection
      if (!playerExists) {

        await playerService.addPlayer(
          firstName,
          lastName,
          newPlayerEmail
        );
      }


      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // create player 
  async createPlayer(
    firstName: string,
    lastName: string,
    email: string, 
    password: string
    ): Promise<boolean> {
    try {
      // check if player already has an account
      const exists: boolean = await playerService.checkPlayerExists(email);

      if (exists) {
        // Update the password for an existing player
        const playerResponse = await playerService.updatePlayerPassword(email, password);
        return playerResponse;

      } else {
        // Create a new player account
        const playerRequestBody: PlayerRequestBody  = new PlayerRequestBody(
          firstName,
          lastName,
          email,
          password
        );
        const playerResponse = await playerService.createPlayer(playerRequestBody);
        if(playerResponse) {
          return true;
        }
        
      }

      return false;
    } catch (error) {
      console.error(error);
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

  
}
function generateInvitationToken(): string {
  // Generate a UUID (v4) using the uuid library
  const uniqueToken = uuidv4();

  return uniqueToken;
}
export default new PlayerController();
