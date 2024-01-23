import {
  TeamIdExistsResponse,
  TeamIdEmailExistsResponse,
  TeamResponse,
  Team,
} from "../models/team.model";
Team;
import TeamModel from "../db/team.schema";
import ManagerTeamModel from "../db/managers.in.team.schema";
import managersInTeamService from "./managers.in.team.service";

class TeamService {
  // delete team
  async deleteTeam(teamId: string): Promise<boolean> {
    try {
      // Find and delete the team based on teamId
      const deletedTeam = await TeamModel.findOneAndDelete({
        teamId,
      });

      // If team was found and deleted successfully
      // You can also delete the associated authentication details if needed

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting team");
    }
  }

  async createTeam(team: Team): Promise<TeamResponse> {
    try {
      // Create a new instance of the Manager model
      const teamInstance = new TeamModel({
        teamId: team.teamId,
        teamName: team.teamName,
      });

      // Save the manager to the database
      const savedTeam = await teamInstance.save();

      await managersInTeamService.addManagerToTeam(
        team.teamManager,
        team.teamId
      );

      // Create a TeamResponse object
      const teamResponse = new TeamResponse({
        teamId: savedTeam.teamId,
        teamName: savedTeam.teamName,
        teamManager: team.teamManager,
      });

      return teamResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating manager");
    }
  }

  async getTeam(teamId: string): Promise<TeamResponse> {
    try {
      // Get the team details
      const teamInstance = await TeamModel.findOne({ teamId });

      // Check if teamInstance is null
      if (!teamInstance) {
        throw new Error("Team not found");
      }

      // Create a TeamResponse object
      const teamResponse = new TeamResponse({
        teamId: teamInstance.teamId,
        teamName: teamInstance.teamName,
        teamManager: "",
      });

      return teamResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating manager");
    }
  }

  async checkTeamEmailExist(
    teamId: string,
    email: string
  ): Promise<TeamIdEmailExistsResponse> {
    // check team ID and email of the manager matchers

    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.

    // {
    //     teamExists: true,
    //     managerExists :true
    // }

    // Initialize response with both flags set to false
    const teamIdEmailExistsResponse = new TeamIdEmailExistsResponse(
      false,
      false
    );

    try {
      // Check if team exists
      const team = await TeamModel.findOne({ teamId });
      if (team) {
        teamIdEmailExistsResponse.teamExists = true;

        // Check if manager with provided email exists and is authorized for the team
        const manager = await ManagerTeamModel.findOne({
          managerEmail: email,
          teamId: teamId,
        });
        if (manager) {
          teamIdEmailExistsResponse.managerExists = true;
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error checking team and manager existence");
    }

    return teamIdEmailExistsResponse;
  }

  async checkTeamExist(teamId: string): Promise<TeamIdExistsResponse> {
    // Initialize response with both flags set to false
    const teamIdExistsResponse = new TeamIdExistsResponse(false);

    try {
      // Check if team exists

      const team = await TeamModel.findOne({ teamId: teamId });

      if (team) {
        teamIdExistsResponse.teamExists = true;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error checking team and manager existence");
    }

    return teamIdExistsResponse;
  }
}
export default new TeamService();
