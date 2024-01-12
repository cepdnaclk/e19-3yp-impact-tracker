import PlayerTeamModel from "../db/players.in.team.schema";

class PlayerInTeamService {
  // create team manager instance
  async createPlayerTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // check entry exists
      const managerTeam = await PlayerTeamModel.findOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });

      if (managerTeam) {
        throw new Error("player already exists in the team");
      }

      const playerTeamInstance = new PlayerTeamModel({
        managerEmail: managerEmail,
        teamId: teamId,
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
}

export default new PlayerInTeamService();
