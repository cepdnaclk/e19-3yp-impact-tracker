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
  async getPlayersInTeam(teamId: string):Promise<{ [jerseyId: number]: TeamPlayerResponse }>{

    const teamPlayers: { [jerseyId: number]: TeamPlayerResponse } = {};

    try{

      // Get the player teams for the given team ID
      const playerTeams = await PlayerTeamModel.find({ teamId: teamId}, 'jerseyId -_id');

      // For each player team, get the player details
      for (const playerTeam of playerTeams) {
        const player = await PlayerTeamModel.findOne({ jerseyId: playerTeam.jerseyId, teamId: teamId }, 'fullName playerEmail isVerified -_id');

        if (player){
          // Add the player details to the team players object
          teamPlayers[playerTeam.jerseyId] = {
            name: player.fullName,
            email: player.playerEmail,
            verification: player.isVerified
          };
        }
      }

      return teamPlayers;

    } catch (error) {
      console.error(error);
      throw error;
    }

  }
}
export default new ManagersInTeamService();
