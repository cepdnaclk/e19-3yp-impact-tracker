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
import { AnalyticsSummaryTeam, ImpactStats, ImpactDirection } from "../types/types";
import SessionModel from "../db/session.schema";

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
      // const team = await TeamModel.findOne({ teamId: teamId , managerEmail: email});
      // console.log(team, email, teamId);

      
      const teams = await ManagerTeamModel.find({ managerEmail: email });

      const team = teams.find(team => team.teamId === teamId);

      if (team) {
        console.log(team);
      } else {
        console.log('Team not found');
      }
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

  async getAnalyticsSummary(teamId: string, duration:number): Promise<void>{

    let analyticsSummary: AnalyticsSummaryTeam = {
      summaryData: [
        {
          title: "Session Count",
          value: 0,
          trend: 0,
        },
        {
          title: "Impacts Recorded",
          value: 0,
          trend: 0,
        },
        {
          title: "Average Impact",
          value: 0,
          trend: 0,
        },
        {
          title: "Contributing Players",
          value: 0,
          trend: 0,
        },
        {
          title: "Highest Contributor",
          value: " "
        }
      ],
      tableData: {}
    };

    try{
      
      // Fetch sessions of the team
      const sessions = await SessionModel.find({ teamId: teamId });
      console.log(sessions);
      // if (playerTeams.length === 0) {
      //   // Should be change after finish this all
      //   // return [];
      //   console.log("No teams found for player");
      // }

      // const teamIds = playerTeams.map(playerTeam => playerTeam.teamId);
      
      // // Fetch teams from TeamModel
      // const teams = await TeamModel.find({ teamId: { $in: teamIds } }, 'teamId jerseyId -_id');

      // //Array of player's Team id and jerseyId in the team
      // const teamResponsesWithJerseyId: Array<TeamResponseWithJerseyId> = teams
      //   .map(team => {
      //     const matchingPlayerTeam = playerTeams.find(playerTeam => playerTeam.teamId === team.teamId);
      //     return matchingPlayerTeam
      //       ? new TeamResponseWithJerseyId(team.teamId, matchingPlayerTeam.jerseyId)
      //       : null;
      //   })
      //   .filter((teamWithJerseyId): teamWithJerseyId is TeamResponseWithJerseyId => teamWithJerseyId !== null);
  
      // // console.log(teamResponsesWithJerseyId);
      
      // // Initialize To store Impact stats for previous and current duration
      // let impactStatsPrev: ImpactStats = {
      //   impactsCumulative: 0,
      //   impactsRecorded: 0,
      //   highestImpact: 0,
      //   directionCount: {
      //     front: 0,
      //     back: 0,
      //     left: 0,
      //     right: 0
      //   },
      //   sessionAnalytics: []
      // };

      // let impactStatsCurr: ImpactStats = {
      //   impactsCumulative: 0,
      //   impactsRecorded: 0,
      //   highestImpact: 0,
      //   directionCount: {
      //     front: 0,
      //     back: 0,
      //     left: 0,
      //     right: 0
      //   },
      //   sessionAnalytics: []
      // };

      // // Get Time period need to be get analytics
      // const now = Date.now(); 
      // const previous= now - (2 * duration); // timestamp of 2 * duration ago
      // const current= now - (duration); // timestamp of 2 * duration ago

      // //get sessions by teamId in teamResponsesWithJerseyId
      // for (const team of teamResponsesWithJerseyId) {
      //   // console.log(team.teamId);
      //   //Get all the sessions created in Team by teamId
      //   let sessions: Array<SessionResponse> = [];
      //   sessions = sessions.concat(await getSessionsForTeam(team.teamId));

        
        
      //   // console.log(previous);

      //   if (previous>=0){
      //     const filteredSessionsPrevious = sessions.filter(session => {
      //       const createdAt = new Date(session.createdAt).getTime();
      //       return createdAt >= previous && createdAt <= current;
      //     });

      //     impactStatsPrev = await calculationForSessionsPrev(filteredSessionsPrevious, impactStatsPrev, team.jerseyId);
      //   }else{

      //   }
        
      //   // console.log("Previous" + team.teamId );
      //   // console.log(filteredSessionsPrevious);
        
        
      //   const filteredSessionsCurrent = sessions.filter(session => {
      //     const createdAt = new Date(session.createdAt).getTime();
      //     return createdAt >= current && createdAt <= now;
      //   });
      //   // console.log("Current" + team.teamId );
      //   // console.log(filteredSessionsCurrent);

        

      //   impactStatsCurr = await calculationForSessions(
      //     filteredSessionsCurrent, 
      //     impactStatsCurr, 
      //     team.jerseyId, 
      //     analyticsSummary.histogramData,
      //     analyticsSummary.criticalSessions);
        
        
      // }


      // // console.log("impactStatsPrev:");
      // // console.log(impactStatsPrev);
      // // console.log("impactStatsCurr:");
      // // console.log(impactStatsCurr);
     
      // // Fill up the analytics summary from impact stats ==> values
      // analyticsSummary.summaryData[0].value = impactStatsCurr.impactsCumulative;
      // analyticsSummary.summaryData[1].value = impactStatsCurr.impactsRecorded;
      // analyticsSummary.summaryData[2].value = Math.round(impactStatsCurr.impactsCumulative / impactStatsCurr.impactsRecorded);
      // analyticsSummary.summaryData[3].value = impactStatsCurr.highestImpact;

      // const maxValueCurr = Math.max(...Object.values(impactStatsCurr.directionCount));
      // const maxKeyCurr = Object.keys(impactStatsCurr.directionCount).find(key => impactStatsCurr.directionCount[key as keyof typeof impactStatsCurr.directionCount] === maxValueCurr);
      // analyticsSummary.summaryData[4].value = maxKeyCurr as string;
      // // console.log("maxKey:");
      // // console.log(maxKeyCurr, maxValueCurr);


      // // All time no need of trend
      // if (previous>=0){


      //   // Fill up the analytics summary from impact stats ==> trends
      //   analyticsSummary.summaryData[0].trend = Math.round((impactStatsCurr.impactsCumulative - impactStatsPrev.impactsCumulative)*100/impactStatsPrev.impactsCumulative);
      //   analyticsSummary.summaryData[1].trend = Math.round((impactStatsCurr.impactsRecorded - impactStatsPrev.impactsRecorded)*100/impactStatsPrev.impactsRecorded);

      //   const averageImpactPrev = impactStatsPrev.impactsCumulative / impactStatsPrev.impactsRecorded;
      //   const averageImpactCurr = impactStatsCurr.impactsCumulative / impactStatsCurr.impactsRecorded;
      //   analyticsSummary.summaryData[2].trend = Math.round((averageImpactCurr - averageImpactPrev)*100/averageImpactPrev);
      //   analyticsSummary.summaryData[3].trend = Math.round((impactStatsCurr.highestImpact - impactStatsPrev.highestImpact)*100/impactStatsPrev.highestImpact);

      //   const maxValuePrev = Math.max(...Object.values(impactStatsPrev.directionCount));
      //   const maxKeyPrev = Object.keys(impactStatsPrev.directionCount).find(key => impactStatsPrev.directionCount[key as keyof typeof impactStatsPrev.directionCount] === maxValuePrev);
      //   analyticsSummary.summaryData[4].trend = maxKeyPrev as ImpactDirection;
      //   // console.log("maxKey:");
      //   // console.log(maxKeyPrev, maxValuePrev);
        
      //   // Sort the critical sessions array by cumulative impact in descending order
      //   analyticsSummary["criticalSessions"].sort((a, b) => b.cumulativeImpact - a.cumulativeImpact);
      //   // console.log( analyticsSummary["criticalSessions"]);

      //   // console.log("analyticsSummary:");
      //   // console.log(analyticsSummary);
      
      
      // }


      // return analyticsSummary;
}catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  } 
}
export default new TeamService();
