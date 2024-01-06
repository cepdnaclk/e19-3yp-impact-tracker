import PlayerModel from "../db/player.schema";

class PlayerService {
  async checkPlayerExistsInTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      const player = await PlayerModel.findOne({
        email: managerEmail,
        teamId: teamId,
      });
      const playerExists = !!player;
      return playerExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking manager existence");
    }
  }
}

export default new PlayerService();
