import ManagerTeamModel from "../db/manager.team.schema";

// create team manager instance
export async function createManagerTeam(
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
    });

    // Save the manager to the database
    const savedManager = await managerTeamInstance.save();

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}
