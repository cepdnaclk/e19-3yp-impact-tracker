import { Manager, ManagerResponse } from "../models/manager.model";
import managerService from "../services/manager.service";
import { createManagerTeam } from "../services/team.manager.service";

export async function createManager(
  manager: Manager
): Promise<ManagerResponse | undefined> {
  try {
    const managerResponse = await managerService.createManager(manager);
    return managerResponse;
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function getManager(
  managerId: string
): Promise<ManagerResponse> {
  try {
    const managerResponse = await managerService.getManager(managerId);
    return managerResponse;
  } catch (error) {
    console.error(error);
    // Handle the error, either by returning a default value or throwing an error
    throw new Error("Failed to get manager");
  }
}

export async function checkManagerExists(email: string): Promise<boolean> {
  try {
    // const email = req.params.email;
    // Call the function in service
    const managerExists = await managerService.checkManagerExists(email);
    // res.status(200).json(managerExists);
    return managerExists.managerExists;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

export async function addNewManager(
  managerEmail: string,
  newManagerEmail: string,
  teamId: string
): Promise<boolean> {
  try {
    // check the manager exits in that team
    const managerExists = await managerService.checkManagerExistsInTeam(
      managerEmail,
      teamId
    );

    if (!managerExists) {
      throw new Error("Manager does not exist in the team");
    }

    await createManagerTeam(newManagerEmail, teamId);

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

