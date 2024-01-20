import playersInTeamService from "../services/players.in.team.service";
import managerService from "../services/manager.service";
import playerService from "../services/player.service";
import { HttpMsg } from "../exceptions/http.codes.mgs";
import { TeamIdEmailExistsResponse} from "../models/team.model";
import teamService from "../services/team.service";

class PlayerController {
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

      // If player not exist in that team => added to the team (player in teams)
      if (playerExistsInTeam) {
        throw new Error(HttpMsg.PLAYER_ALREADY_EXISTS_IN_TEAM);
      }else{
        await playersInTeamService.addPlayerToTeam(newPlayerEmail, teamId,jersyId);
      }
      // check if new player already has an account
      const playerExists = await playerService.checkPlayerExists(newPlayerEmail);

      // If player not exist in the player collection => added to the player collection
      if (!playerExists) {
        await playerService.addPlayer(
          firstName,
          lastName,
          newPlayerEmail,
        );
      }


      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
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

export default new PlayerController();
