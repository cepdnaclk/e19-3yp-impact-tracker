import PlayerModel from "../db/player.schema";
import authService from "./auth.service";
import { PlayerRequestBody, PlayerResponse } from "../models/player.model";
import { TeamResponseWithIsVerified, TeamResponseWithJerseyId } from "../models/team.model";
import PlayerTeamModel from "../db/players.in.team.schema";
import TeamModel from "../db/team.schema";
import { AnalyticsSummary, ImpactStats, ImpactDirection, SessionAnalytics } from "../types/types";
import { Impact, ImpactPlayer, SessionResponse } from "../models/session.model";
import SessionModel from "../db/session.schema";

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
      
      console.log(teamsWithIsVerified);
      return teamsWithIsVerified;
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }
  
  async getAnalyticsSummary(email: string, duration:number): Promise<AnalyticsSummary>{

    let analyticsSummary: AnalyticsSummary = {
      summaryData: [
        {
          title: "Cumulative Impacts",
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
          title: "Highest Impact",
          value: 0,
          trend: 0,
        },
        {
          title: "Dominant Direction",
          value: 0,
          trend: 0,
        }
      ],
      histogramData: {
        left: new Array(10).fill(0),
        right: new Array(10).fill(0),
        front: new Array(10).fill(0),
        back: new Array(10).fill(0),
      },
      criticalSessions: [],
    };

    try{
      
      // Fetch playerTeams
      const playerTeams = await PlayerTeamModel.find({ playerEmail: email }, 'teamId jerseyId');
  
      if (playerTeams.length === 0) {
        // Should be change after finish this all
        // return [];
        console.log("No teams found for player");
      }

      const teamIds = playerTeams.map(playerTeam => playerTeam.teamId);
      
      // Fetch teams from TeamModel
      const teams = await TeamModel.find({ teamId: { $in: teamIds } }, 'teamId jerseyId -_id');

      //Array of player's Team id and jerseyId in the team
      const teamResponsesWithJerseyId: Array<TeamResponseWithJerseyId> = teams
        .map(team => {
          const matchingPlayerTeam = playerTeams.find(playerTeam => playerTeam.teamId === team.teamId);
          return matchingPlayerTeam
            ? new TeamResponseWithJerseyId(team.teamId, matchingPlayerTeam.jerseyId)
            : null;
        })
        .filter((teamWithJerseyId): teamWithJerseyId is TeamResponseWithJerseyId => teamWithJerseyId !== null);
  
      // console.log(teamResponsesWithJerseyId);
      
      // Initialize To store Impact stats for previous and current duration
      let impactStatsPrev: ImpactStats = {
        impactsCumulative: 0,
        impactsRecorded: 0,
        highestImpact: 0,
        directionCount: {
          front: 0,
          back: 0,
          left: 0,
          right: 0
        },
        sessionAnalytics: []
      };

      let impactStatsCurr: ImpactStats = {
        impactsCumulative: 0,
        impactsRecorded: 0,
        highestImpact: 0,
        directionCount: {
          front: 0,
          back: 0,
          left: 0,
          right: 0
        },
        sessionAnalytics: []
      };

      // Get Time period need to be get analytics
      const now = Date.now(); 
      const previous= now - (2 * duration); // timestamp of 2 * duration ago
      const current= now - (duration); // timestamp of 2 * duration ago

      //get sessions by teamId in teamResponsesWithJerseyId
      for (const team of teamResponsesWithJerseyId) {
        // console.log(team.teamId);
        //Get all the sessions created in Team by teamId
        let sessions: Array<SessionResponse> = [];
        sessions = sessions.concat(await getSessionsForTeam(team.teamId));

        
        
        // console.log(previous);

        if (previous>=0){
          const filteredSessionsPrevious = sessions.filter(session => {
            const createdAt = new Date(session.createdAt).getTime();
            return createdAt >= previous && createdAt <= current;
          });

          impactStatsPrev = await calculationForSessionsPrev(filteredSessionsPrevious, impactStatsPrev, team.jerseyId);
        }else{

        }
        
        // console.log("Previous" + team.teamId );
        // console.log(filteredSessionsPrevious);
        
        
        const filteredSessionsCurrent = sessions.filter(session => {
          const createdAt = new Date(session.createdAt).getTime();
          return createdAt >= current && createdAt <= now;
        });
        // console.log("Current" + team.teamId );
        // console.log(filteredSessionsCurrent);

        

        impactStatsCurr = await calculationForSessions(
          filteredSessionsCurrent, 
          impactStatsCurr, 
          team.jerseyId, 
          analyticsSummary.histogramData,
          analyticsSummary.criticalSessions);
        
        
      }


      // console.log("impactStatsPrev:");
      // console.log(impactStatsPrev);
      // console.log("impactStatsCurr:");
      // console.log(impactStatsCurr);
     
      // Fill up the analytics summary from impact stats ==> values
      analyticsSummary.summaryData[0].value = impactStatsCurr.impactsCumulative;
      analyticsSummary.summaryData[1].value = impactStatsCurr.impactsRecorded;
      analyticsSummary.summaryData[2].value = Math.round(impactStatsCurr.impactsCumulative / impactStatsCurr.impactsRecorded);
      analyticsSummary.summaryData[3].value = impactStatsCurr.highestImpact;

      const maxValueCurr = Math.max(...Object.values(impactStatsCurr.directionCount));
      const maxKeyCurr = Object.keys(impactStatsCurr.directionCount).find(key => impactStatsCurr.directionCount[key as keyof typeof impactStatsCurr.directionCount] === maxValueCurr);
      analyticsSummary.summaryData[4].value = maxKeyCurr as string;
      // console.log("maxKey:");
      // console.log(maxKeyCurr, maxValueCurr);


      // All time no need of trend
      if (previous>=0){


        // Fill up the analytics summary from impact stats ==> trends
        analyticsSummary.summaryData[0].trend = Math.round((impactStatsCurr.impactsCumulative - impactStatsPrev.impactsCumulative)*100/impactStatsPrev.impactsCumulative);
        analyticsSummary.summaryData[1].trend = Math.round((impactStatsCurr.impactsRecorded - impactStatsPrev.impactsRecorded)*100/impactStatsPrev.impactsRecorded);

        const averageImpactPrev = impactStatsPrev.impactsCumulative / impactStatsPrev.impactsRecorded;
        const averageImpactCurr = impactStatsCurr.impactsCumulative / impactStatsCurr.impactsRecorded;
        analyticsSummary.summaryData[2].trend = Math.round((averageImpactCurr - averageImpactPrev)*100/averageImpactPrev);
        analyticsSummary.summaryData[3].trend = Math.round((impactStatsCurr.highestImpact - impactStatsPrev.highestImpact)*100/impactStatsPrev.highestImpact);

        const maxValuePrev = Math.max(...Object.values(impactStatsPrev.directionCount));
        const maxKeyPrev = Object.keys(impactStatsPrev.directionCount).find(key => impactStatsPrev.directionCount[key as keyof typeof impactStatsPrev.directionCount] === maxValuePrev);
        analyticsSummary.summaryData[4].trend = maxKeyPrev as ImpactDirection;
        // console.log("maxKey:");
        // console.log(maxKeyPrev, maxValuePrev);
        
        // Sort the critical sessions array by cumulative impact in descending order
        analyticsSummary["criticalSessions"].sort((a, b) => b.cumulativeImpact - a.cumulativeImpact);
        // console.log( analyticsSummary["criticalSessions"]);

        // console.log("analyticsSummary:");
        // console.log(analyticsSummary);
      
      
      }


      return analyticsSummary;
}catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }   
}

  // Map the sessions to SessionResponse objects
  async function getSessionsForTeam(teamId: string): Promise<Array<SessionResponse>> {
    try {
      // Fetch sessions from the database
      const sessions = await SessionModel.find({ teamId });
  
      // Map the sessions to SessionResponse objects
      const sessionResponses = sessions.map(session => {
        return new SessionResponse(
          session.teamId,
          session.sessionId,
          session.sessionName,
          session.createdAt,
          session.updatedAt,
          session.impactHistory.map(player => {
            return new ImpactPlayer(
              player.jerseyId,
              player.impact.map(impact => {
                return new Impact(
                  impact.magnitude,
                  impact.direction,
                  impact.timestamp,
                  impact.isConcussion
                );
              })
            );
          })
        );
      });
  
      return sessionResponses;
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetching sessions for team");
    }
  }

  //Calculate the analytics for each sesseions
  async function calculationForSessions(
    sessions: Array<SessionResponse>, 
    stats: ImpactStats, 
    jerseyId: Number,
    histogramData: AnalyticsSummary["histogramData"],
    criticalSessions: AnalyticsSummary["criticalSessions"]
    ): Promise<ImpactStats> {
    try{

      // console.log("Curr#####");
      // For each session
      for (const session of sessions) {
        // console.log("Session: " + session.sessionId);

        //For storing session analytics
        let sessionAnalyticsItem: SessionAnalytics = {
          sessionName: session.sessionName,
          sessionDate: new Date(session.createdAt).toLocaleDateString("en-US", {
            
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          cumulativeImpact: 0,
          averageImpact: 0,
          largestImpact: 0,
        };

        let impactCountForSession:number = 0;
        for (const impactPlayer of session.impactHistory) {
          if (impactPlayer.jerseyId === jerseyId) {

            // For each impact in the impact Player
            for (const impact of impactPlayer.impact) {

              //Session Analytics
              impactCountForSession += 1;
              sessionAnalyticsItem.cumulativeImpact += impact.magnitude;

              if (sessionAnalyticsItem.largestImpact < impact.magnitude){
                sessionAnalyticsItem.largestImpact = impact.magnitude;
              }
              sessionAnalyticsItem.averageImpact = sessionAnalyticsItem.cumulativeImpact/impactCountForSession;

              // Update the impact stats
              stats.impactsCumulative += impact.magnitude;
              stats.impactsRecorded += 1;
              if (stats.highestImpact < impact.magnitude) {
                stats.highestImpact = impact.magnitude;
              }
              stats.directionCount[impact.direction as keyof typeof stats.directionCount] += 1;

              const index = Math.floor(impact.magnitude / 20);
              histogramData[impact.direction as keyof typeof histogramData][index] += 1;
              // console.log("histogramData:");
              // console.log(impact.magnitude, impact.direction);
              // console.log(histogramData);
              

              // console.log(stats)
            }

            // Round off the average impact
            sessionAnalyticsItem.averageImpact = Math.round(sessionAnalyticsItem.averageImpact);
          }
        }
        
        // If length of crirtical sessions<3 => directly push to the critical sessions
        // Else: sort by cumulative impact => remove the least one and push only if least<current cumulative
        if (criticalSessions.length < 3) {
          criticalSessions.push(sessionAnalyticsItem);

        }else {
          // Sort the critical sessions array by cumulative impact in descending order
          criticalSessions.sort((a, b) => b.cumulativeImpact - a.cumulativeImpact);
              // console.log(sessionAnalyticsItem);

          if (sessionAnalyticsItem.cumulativeImpact > criticalSessions[criticalSessions.length - 1].cumulativeImpact) {
            criticalSessions.pop();
            criticalSessions.push(sessionAnalyticsItem);
          }
        }

        // console.log(criticalSessions);
      }
      return stats;
    }catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }

  //Calculate the analytics for each sesseions for previous
  async function calculationForSessionsPrev(
    sessions: Array<SessionResponse>, 
    stats: ImpactStats, 
    jerseyId: Number
    ): Promise<ImpactStats> {
    try{
      // console.log("Previous##")
      // console.log(sessions);
      for (const session of sessions) {
        // console.log("Session: " + session.sessionId);
        for (const impactPlayer of session.impactHistory) {
          if (impactPlayer.jerseyId === jerseyId) {

            // For each impact in the impact Player
            for (const impact of impactPlayer.impact) {

              // Update the impact stats
              stats.impactsCumulative += impact.magnitude;
              stats.impactsRecorded += 1;
              if (stats.highestImpact < impact.magnitude) {
                stats.highestImpact = impact.magnitude;
              }
              stats.directionCount[impact.direction as keyof typeof stats.directionCount] += 1;
              

              // console.log(stats)
            }
          }
        }
      }
      return stats;
    }catch (error) {
      console.error(error);
      throw new Error("Error while fetching teams for player");
    }
  }

export default new PlayerService();
