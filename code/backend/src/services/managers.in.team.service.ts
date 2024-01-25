import ManagerTeamModel from "../db/managers.in.team.schema";
import PlayerTeamModel from "../db/players.in.team.schema";
import { TeamPlayerResponse } from "../types/types";

class ManagersInTeamService {
  // create team manager instance
  async addManagerToTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // check entry exists
      const managerTeam = await ManagerTeamModel.findOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });

      if (managerTeam) {
        throw new Error("Manager already exists in the team");
      }

      const managerTeamInstance = new ManagerTeamModel({
        managerEmail: managerEmail,
        teamId: teamId,
        accepted: false,
      });

      // Save the manager to the database
      const savedManager = await managerTeamInstance.save();

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // check the manager exits in that team
  async checkManagerExistsInTeamDetails(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // check entry exists
      const managerTeam = await ManagerTeamModel.findOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });

      if (!managerTeam) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // delete manager and team entry
  async deleteManagerFromTeamDetails(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // check entry exists
      const managerTeam = await ManagerTeamModel.findOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });

      if (!managerTeam) {
        throw new Error("Manager does not exist in the team");
      }

      await ManagerTeamModel.deleteOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // get the players in the team
  async getPlayersInTeam(teamId: string):Promise<Array<TeamPlayerResponse>>{

    try{
      const teamPlayers: Array<TeamPlayerResponse> = [];
      const playerTeams = await PlayerTeamModel.find({ teamId: teamId}, 'jerseyId -_id');
      console.log(playerTeams);

      // For each player team, get the player details
    for (const playerTeam of playerTeams) {
      const player = await PlayerTeamModel.findOne({ jerseyId: playerTeam.jerseyId, teamId: teamId }, 'fullName playerEmail isVerified -_id');
      console.log(player);

      if (player){
        // Add the player details to the team players array
      teamPlayers.push({
        jerseyId: playerTeam.jerseyId,
        player: {
          name: player.fullName,
          email: player.playerEmail,
          isVerified: player.isVerified
        }
      });
      }
      
    }
      console.log(teamPlayers);
      return teamPlayers;

    }catch (error) {
      console.error(error);
      throw error;
    }

  }
}

export default new ManagersInTeamService();
