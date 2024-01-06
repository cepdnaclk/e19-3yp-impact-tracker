import PlayerTeamModel from "../db/player.team.schema";

// create team manager instance
export async function createPlayerTeam(
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
