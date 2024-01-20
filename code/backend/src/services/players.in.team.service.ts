import PlayerModel from "../db/player.schema";
import PlayerTeamModel from "../db/players.in.team.schema";

class PlayerInTeamService {
  // create team player instance
  async addPlayerToTeam(
    playerEmail: string,
    teamId: string,
    jersyId: string,

  ): Promise<boolean> {
    try {
      // check entry exists
      const playerTeam = await PlayerTeamModel.findOne({
        playerEmail: playerEmail,
        teamId: teamId,
      });

      if (playerTeam) {
        throw new Error("player already exists in the team");
      }

      const playerTeamInstance = new PlayerTeamModel({
        playerEmail: playerEmail,
        teamId: teamId,
        jesryId: jersyId,
        isVerified: false,
      });


      // Save the manager to the database
      const savedManager = await playerTeamInstance.save();

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }

  // async addPlayer(
  //   jersyId: string,
  //   firstName: string,
  //   lastName: string,
  //   playerEmail: string,
  //   teamId: string
  // ): Promise<boolean> {
  //   try {
  //     // check entry exists
  //     const playerTeam = await PlayerTeamModel.findOne({
  //       playerEmail: playerEmail,
  //       teamId: teamId,
  //     });

  //     if (playerTeam) {
  //       throw new Error("player already exists in the team");
  //     }

  //     const playerTeamInstance = new PlayerTeamModel({
  //       playerEmail: playerEmail,
  //       teamId: teamId,
  //     });


  //     // Save the manager to the database
  //     const savedManager = await playerTeamInstance.save();

  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  //   return false;
  // }

  async checkPlayerExistsInTeam(
    playerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // check entry exists
      const playerTeam = await PlayerTeamModel.findOne({
        playerEmail: playerEmail,
        teamId: teamId,
      });

      if (playerTeam) {
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
    return false;
  }
}

export default new PlayerInTeamService();
