import { sendInvitationEmail } from "../email/managerInviteEmail";
import { Manager, ManagerResponse } from "../models/manager.model";
import managerService from "../services/manager.service";
import { createManagerTeam } from "../services/team.manager.service";
import { sendVerificationEmail } from "../email/managerVerifyEmail";
import { v4 as uuidv4 } from 'uuid';

export async function createManager(
  manager: Manager
): Promise<ManagerResponse | undefined> {
  try {
    // Create a manager with an invitation token
    const invitationToken = generateInvitationToken();
    manager.acceptInvitation = false;
    manager.invitationToken = invitationToken;

    const managerResponse = await managerService.createManager(manager);

    // Send the verification email
    await sendVerificationEmail(manager.email, invitationToken);

    return managerResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create manager");
  }
}

export async function getManager(managerId: string): Promise<ManagerResponse> {
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

    // Generate an invitation token
    const invitationToken = generateInvitationToken();


    // await createManagerTeam(newManagerEmail, teamId);

    // Create the manager and set the invitation token
    // const newManager: Manager = {
    //   email: newManagerEmail,
    //   // invitationToken: invitationToken,
    //   acceptInvitation: false, // Initially set to false
    // };

    const createdManagerResponse = await createManagerTeam(newManagerEmail, teamId);

    // Send an invitation email
    await sendInvitationEmail(newManagerEmail, invitationToken);

    // Add the new manager to the team
    const managerTeamAdded = await createManagerTeam(newManagerEmail, teamId);

    return managerTeamAdded;

  } catch (error) {
    console.error(error);
    throw error;
  }
  return false;
}

// delete manager
export async function deleteManager(
  managerEmail: string,
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

    await managerService.deleteManager(managerEmail, teamId);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return false;
}


function generateInvitationToken(): string {
  // Generate a UUID (v4) using the uuid library
  const uniqueToken = uuidv4();

  // Alternatively, you can generate a random string using characters
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // const tokenLength = 10;
  // const uniqueToken = Array.from({ length: tokenLength }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

  return uniqueToken;
}