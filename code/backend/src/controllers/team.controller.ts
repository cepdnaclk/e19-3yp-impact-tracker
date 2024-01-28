import {
  TeamIdExistsResponse,
  TeamIdEmailExistsResponse,
  TeamResponse,
  Team,
  TeamIdEmailExistsResponseWithIsVerified,
} from "../models/team.model";
import teamService from "../services/team.service";
import managersInTeamService from "../services/managers.in.team.service";

class TeamController {
  async checkTeamExist(teamId: string): Promise<TeamIdExistsResponse> {
    // check team exists

    try {
      // Check if Team ID and email combination exists
      const teamIdExistResponse: TeamIdExistsResponse =
        await teamService.checkTeamExist(teamId);
      return teamIdExistResponse;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async checkTeamEmailExist(
    teamId: string, 
    email: string
  ): Promise<TeamIdEmailExistsResponseWithIsVerified> {
    // check team ID and email of the manager matchers

    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.

    // {
    //     teamExists: true,
    //     managerExists :true
    // }

    try {
      // Check if Team ID and email combination exists
      const teamIdEmailExistsResponseWithIsVerified: TeamIdEmailExistsResponseWithIsVerified =
        await teamService.checkTeamEmailExist(teamId, email);
      return teamIdEmailExistsResponseWithIsVerified;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createTeam(team: Team): Promise<TeamResponse | undefined> {
    try {
      const teamResponse = await teamService.createTeam(team);
      return teamResponse;
    } catch (error) {
      console.error(error);
      // Handle the error, either by returning a default value or throwing an error
      throw error;
    }
  }

  async getTeam(teamId: string): Promise<TeamResponse | undefined> {
    try {
      const teamResponse = await teamService.getTeam(teamId);
      return teamResponse;
    } catch (error) {
      console.error(error);
      // Handle the error, either by returning a default value or throwing an error
      throw error;
    }
  }

  // delete team
  async deleteTeam(teamId: string): Promise<boolean> {
    try {
      await teamService.deleteTeam(teamId);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // check the manager team exits
  async checkManagerExistsInTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      const managerExists =
        await managersInTeamService.checkManagerExistsInTeamDetails(
          managerEmail,
          teamId
        );
      return managerExists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // delete manager and team entry using deleteManagerFromTeam
  async deleteManagerFromTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      await managersInTeamService.deleteManagerFromTeamDetails(
        managerEmail,
        teamId
      );
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // async getAnalyticsSummary(
  //   teamId: string,
  //   duration: string
  // ): Promise<void>{
  //   // 'Last Week' , 'Last Month' , 'All Time'
  //   let durationNumber: number = 0;

  //   if (duration == "All Time"){
  //     durationNumber = Date.now();
  //   } else if (duration == "Last Month"){
  //     durationNumber = 30 * 24 * 60 * 60 * 1000;
  //   } else if (duration == "Last Week"){
  //     durationNumber = 7 * 24 * 60 * 60 * 1000;
  //   }
  //   // console.log(durationNumber);

  //   try {
  //     const analyticsSummary = await teamService.getAnalyticsSummary(teamId, durationNumber);
  //     // return analyticsSummary;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error in player service");
  //   }

  // }
}

export default new TeamController();
