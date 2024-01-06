import { createPlayerTeam } from "../services/player.manager.service";
import managerService from "../services/manager.service";

export async function addNewPlayer(
  managerEmail: string,
  newManagerEmail: string,
  teamId: string
): Promise<boolean> {
  try {
    // check the manager exits in that team
    // check the manager exits in that team
    const managerExists = await managerService.checkManagerExistsInTeam(
      managerEmail,
      teamId
    );

    if (!managerExists) {
      throw new Error("Manager does not exist in the team");
    }

    await createPlayerTeam(newManagerEmail, teamId);

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}
