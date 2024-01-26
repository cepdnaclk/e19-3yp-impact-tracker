import ManagerTeamModel from "../db/managers.in.team.schema";
import PlayerTeamModel from "../db/players.in.team.schema";
import SessionModel from "../db/session.schema";
import { Impact, SessionResponse } from "../models/session.model";
import { AnalyticsSummaryTeam, ImpactStats, TeamPlayerResponse, ImpactDirection } from "../types/types";

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

  //{ [jerseyId: number]: TeamPlayerResponse }
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

  //get the team analytics
  async getTeamAnalytics(teamId: string, duration: number): Promise<AnalyticsSummaryTeam> {

    // Initialize variable to store data
    let analyticsSummary: AnalyticsSummaryTeam = {
      summaryData: [
        {
          title: "Sessions",
          value: 0,
          trend: 0,
        },
        {
          title: "Impacts Recorded",
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
          value: 0
        }
      ],
      tableData: {}
    };
    
    try {
      // Find the all the sessions for the team
      const sessions = await SessionModel.find({ teamId: teamId });
      // console.log(sessions);

      //get all the playrs of the team (players in team)
      const teamPlayers = await this.getPlayersInTeam(teamId);
      // list of jersyIds
      const jerseyIds: number[] = Object.keys(teamPlayers).map(Number);

      // For calculations of trends (previous)
      let tableDataPrev = {} as AnalyticsSummaryTeam["tableData"];


      // Table data with player name
      jerseyIds.forEach((jerseyId) => {
        analyticsSummary.tableData[jerseyId] = {
          playerName: teamPlayers[jerseyId].name,
          impactsRecorded: 0,
          cumulativeImpact: 0,
          averageImpact: 0,
          largestImpact: 0,
          dominantDirection: "",
          concussions: 0
        };
      });

      jerseyIds.forEach((jerseyId) => {
        tableDataPrev[jerseyId] = {
          playerName: teamPlayers[jerseyId].name,
          impactsRecorded: 0,
          cumulativeImpact: 0,
          averageImpact: 0,
          largestImpact: 0,
          dominantDirection: "",
          concussions: 0
        };
      });


      // Get Time period need to be get analytics
      const now = Date.now(); 
      const previous= now - (2 * duration); // timestamp of 2 * duration ago
      const current= now - (duration); // timestamp of 2 * duration ago

      // In previous time period, no of sessions
      let prevSessions : number= 0;
      let filteredSessionsPrevious: SessionResponse[] = [];

      // Sessions in previous time period
      if (previous>=0){
        filteredSessionsPrevious = sessions.filter(session => {
          const createdAt = new Date(session.createdAt).getTime();
          return createdAt >= previous && createdAt <= current;
        });
        // console.log(filteredSessionsPrevious);
        await this.calculationForSessions(filteredSessionsPrevious, tableDataPrev);

        // Get the number of sessions
        prevSessions = filteredSessionsPrevious.length
      }


      // Sessions in cuurent period
      const filteredSessionsCurrent = sessions.filter(session => {
        const createdAt = new Date(session.createdAt).getTime();
        return createdAt >= current && createdAt <= now;
      });

      // Get the number of sessions
      const numberOfSessions = filteredSessionsCurrent.length
      analyticsSummary.summaryData[0].value = numberOfSessions;
      analyticsSummary.summaryData[0].trend = Math.round(((numberOfSessions - prevSessions)*100/prevSessions));


      // Fill up table data
      await this.calculationForSessions(filteredSessionsCurrent, analyticsSummary.tableData);
      await this.calculationForSessions(filteredSessionsPrevious, tableDataPrev);

      // console.log("analyticsSummary.tableData:");
      // console.log(analyticsSummary.tableData);
      // console.log("tableDataPrev:");
      // console.log(tableDataPrev);
      // console.log(filteredSessionsCurrent);

      await this.calculationSummaryData(tableDataPrev, analyticsSummary.tableData, analyticsSummary.summaryData, jerseyIds);


      console.log("analyticsSummary:");
      console.log(analyticsSummary);

      return analyticsSummary;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Calculate the analytics for each sesseions
  async calculationForSessions(
    sessions: SessionResponse[],
    tableData: AnalyticsSummaryTeam["tableData"]
    ): Promise<void> {
    try{

      for (const jerseyId in tableData) {
        // console.log(Number(jerseyId));
        let playerData = tableData[jerseyId];
        // if (jerseyId in tableData) {
        //   // The jerseyId exists in the tableData object, so you can use it
        //   playerData = tableData[jerseyId];
        // } else {
        //   continue;
        // }
        
        // console.log(playerData);

        let directionCount: {
          front: number,
          back: number,
          left: number,
          right: number
        } = {
          front: 0,
          back: 0,
          left: 0,
          right: 0
        };
        
        // For each session
        for (const session of sessions) {
          // console.log("Session: " + session.sessionId);
          // console.log(session.impactHistory);
          for (const impactPlayer of session.impactHistory) {
            // console.log(impactPlayer.jerseyId, Number(jerseyId));
            if (impactPlayer.jerseyId === Number(jerseyId) ){

              // For each impact in the impact Player
              for (const impact of impactPlayer.impact) {
                playerData.impactsRecorded += 1;
                playerData.cumulativeImpact += impact.magnitude;
                if (playerData.largestImpact < impact.magnitude) {
                  playerData.largestImpact = impact.magnitude;
                }

                playerData.averageImpact = playerData.cumulativeImpact / playerData.impactsRecorded;
                directionCount[impact.direction as keyof typeof directionCount] += 1;

                // console.log(playerData)
                // console.log(directionCount);

                if (impact.isConcussion) {
                  playerData.concussions += 1;
                }
              }
            }
          }
        }

        // Round off the average impact
        playerData.averageImpact = Math.round(playerData.averageImpact);

        if (playerData.impactsRecorded > 0) {
            // Find the dominant direction
          const maxValueCurr = Math.max(...Object.values(directionCount));
          const maxKeyCurr = Object.keys(directionCount).find(key => directionCount[key as keyof typeof directionCount] === maxValueCurr);
          playerData.dominantDirection = maxKeyCurr as string;
        }
        

        // console.log(playerData);
      }
    }catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }

  async calculationSummaryData(
    tableDataPrev: AnalyticsSummaryTeam["tableData"],
    tableData: AnalyticsSummaryTeam["tableData"],
    summaryData: AnalyticsSummaryTeam["summaryData"],
    jerseyIds: number[]
    ): Promise<void> {
    try{

      let highestImpactsRecorded = 0;
      let playerNameWithHighestImpactsRecorded = '';
      let summaryDataPrev = [
        {
          title: "Sessions",
          value: 0,
          trend: 0,
        },
        {
          title: "Impacts Recorded",
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
          value: 0
        }
      ];

      // Fill up values for summary data;
      for (const jerseyId of jerseyIds) {

      const playerData = tableData[jerseyId];
      const playerDataPrev = tableDataPrev[jerseyId];

      // Fill up summary data value ==> Sessions (already filled earlier)
      // Fill up summary data value ==> Impacts Recorded
      summaryData[1].value = Number(summaryData[1].value) + playerData.impactsRecorded;
      summaryDataPrev[1].value = Number(summaryDataPrev[1].value) + playerDataPrev.impactsRecorded;


      // Fill up summary data value ==> Contributors
      if ((playerData.impactsRecorded) > 0) {
        summaryData[2].value = Number(summaryData[2].value) + 1;
      }

      if ((playerDataPrev.impactsRecorded) > 0) {
        summaryDataPrev[2].value = Number(summaryDataPrev[2].value) + 1;
      }

      // Fill up summary data value ==> Highest Contributor
      if (playerData.impactsRecorded > highestImpactsRecorded) {
        highestImpactsRecorded = playerData.impactsRecorded;
        playerNameWithHighestImpactsRecorded = playerData.playerName;
      }
      summaryData[3].value = playerNameWithHighestImpactsRecorded;

      }

     
      // Fill up trends

      // // Fill up summary data trend ==> Sessions
      // if (summaryDataPrev[0].value > 0){
      //   summaryData[0].trend = Math.round(((Number(summaryData[0].value) - summaryDataPrev[0].value)*100/summaryDataPrev[0].value));
      // }

      // Fill up summary data trend ==> Impacts Recorded
      if (summaryDataPrev[1].value > 0){
        summaryData[1].trend = Math.round(((Number(summaryData[1].value) - summaryDataPrev[1].value)*100/summaryDataPrev[1].value));
      }

      // Fill up summary data trend ==> Contributors
      if (summaryDataPrev[2].value > 0){
        summaryData[2].trend = Math.round(((Number(summaryData[2].value) - summaryDataPrev[2].value)*100/summaryDataPrev[2].value));
      }

    }catch (error) {
      console.error(error);
      throw new Error("Error while calculation summary data");
    }
  }

}
export default new ManagersInTeamService();
