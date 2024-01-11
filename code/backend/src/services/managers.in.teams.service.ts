import ManagerTeamModel from "../db/managers.in.teams.schema";

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
    throw error;
  }
  return false;
}

// check the manager exits in that team
export async function checkManagerExistsInTeamDetails(
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
export async function deleteManagerFromTeamDetails(
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
