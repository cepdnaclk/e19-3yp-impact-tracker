import { Manager, ManagerResponse } from "../models/manager.model";
import TeamModel from "../db/team.schema";
import managerService from "../services/manager.service";
import managersInTeamService from "../services/managers.in.team.service";
import { sendVerificationEmail } from "../email/managerVerifyEmail";
import { sendInvitationEmail } from "../email/managerInviteEmail";
import { v4 as uuidv4 } from "uuid";

class ManagerController {
  async createManager(
    manager: Manager,
    teamId: string
  ): Promise<ManagerResponse | undefined> {
    try {
      // Create a manager with an invitation token
      const invitationToken = generateInvitationToken();
      manager.invitationToken = invitationToken;
      manager.isVerified = false; // Initially set to false

      // const teamName = teamResponse.teamName;

      const managerResponse = await managerService.createManager(manager);
      const teamInstance = await TeamModel.findOne({ teamId });
      const teamName = teamInstance?.teamName; // Add null check using optional chaining operator

      // Send the verification email
      await sendVerificationEmail(manager.email, invitationToken, teamName!);

      return managerResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getManager(
    managerId: string,
    teamId: string
  ): Promise<ManagerResponse> {
    try {
      const managerResponse = await managerService.getManager(
        managerId,
        teamId
      );
      return managerResponse;
    } catch (error) {
      console.error(error);
      // Handle the error, either by returning a default value or throwing an error
      throw error;
    }
  }

  async checkManagerExists(email: string): Promise<boolean> {
    try {
      // const email = req.params.email;
      // Call the function in service
      const managerExists = await managerService.checkManagerExists(email);
      // res.status(200).json(managerExists);
      return managerExists.managerExists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async checkManagerExistsInTeam(
    email: string,
    teamId: string
  ): Promise<boolean> {
    try {
      // const email = req.params.email;
      // Call the function in service
      const managerExists = await managerService.checkManagerExistsInTeam(
        email,
        teamId
      );
      // res.status(200).json(managerExists);
      return managerExists;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addNewManager(
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

      // await addManagerToTeam(newManagerEmail, teamId);

      // Create the manager and set the invitation token
      // const newManager: Manager = {
      //   email: newManagerEmail,
      //   // invitationToken: invitationToken,
      //   acceptInvitation: false, // Initially set to false
      // };

      const managerTeamAdded = await managersInTeamService.addManagerToTeam(
        newManagerEmail,
        teamId
      );

      const teamInstance = await TeamModel.findOne({ teamId });
      const teamName = teamInstance?.teamName; // Add null check using optional chaining operator

      // Send an invitation email
      await sendInvitationEmail(newManagerEmail, invitationToken, teamName!);

      return managerTeamAdded;
    } catch (error) {
      console.error(error);

      const exist = await managersInTeamService.checkManagerExistsInTeamDetails(
        newManagerEmail,
        teamId
      );

      if (exist) {
        await managersInTeamService.deleteManagerFromTeamDetails(
          newManagerEmail,
          teamId
        );
      }

      throw error;
    }
    return false;
  }

  // delete manager
  async deleteManager(managerEmail: string, teamId: string): Promise<boolean> {
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

export default new ManagerController();
