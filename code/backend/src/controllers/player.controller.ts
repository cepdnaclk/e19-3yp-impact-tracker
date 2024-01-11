import { createPlayerTeam } from "../services/players.in.teams.service";
import managerService from "../services/manager.service";
import playerService from "../services/player.service";
import { HttpMsg } from "../exceptions/http.codes.mgs";

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
      throw new Error(HttpMsg.MANAGER_DEOS_NOT_EXIST);
    }

    await createPlayerTeam(newManagerEmail, teamId);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return false;
}

// player exists
export async function checkPlayerExists(email: string): Promise<boolean> {
  try {
    // const email = req.params.email;
    // Call the function in service
    const playerExists = await playerService.checkPlayerExists(email);
    // res.status(200).json(managerExists);
    return playerExists;
  } catch (error) {
    console.error(error);
    throw new Error(HttpMsg.PLAYER_EXIT_ERROR);
  }
}
