import {
  ManagerRequestBody,
  ManagerResponse,
  ManagerExistsResponse,
} from "../models/manager.model";
import ManagerModel from "../db/manager.schema";
import authService from "./auth.service";
import ManagerTeamModel from "../db/managers.in.team.schema";

class ManagerService {
  // delete manager
  async deleteManager(email: string, teamId: string): Promise<boolean> {
    try {
      // Find and delete the manager based on email and teamId
      const deletedManager = await ManagerModel.findOneAndDelete({
        email,
        teamId,
      });

      // If manager was found and deleted successfully
      // You can also delete the associated authentication details if needed

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting manager");
    }
  }

  async createManager(
    managerRequestBody: ManagerRequestBody
  ): Promise<ManagerResponse> {
    try {
      // Create a new instance of the Manager model
      const managerInstance = new ManagerModel({
        teamId: managerRequestBody.teamId,
        firstName: managerRequestBody.firstName,
        lastName: managerRequestBody.lastName,
        email: managerRequestBody.email,
        invitationToken: managerRequestBody.invitationToken,
        isVerified: managerRequestBody.isVerified,
      });

      // Save the manager to the database
      const savedManager = await managerInstance.save();

      // save the manager auth
      await authService.createAuthManager(
        managerRequestBody.email,
        managerRequestBody.password,
        managerRequestBody.teamId
      );

      // Create a ManagerResponse object
      const managerResponse: ManagerResponse = new ManagerResponse(
        managerRequestBody
      );

      return managerResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating manager");
    }
  }

  async getManager(email: string, teamId: string): Promise<ManagerResponse> {
    try {
      // Get the team details
      const managerInstance = await ManagerModel.findOne({ email, teamId });

      // Check if teamInstance is null
      if (!managerInstance) {
        throw new Error("Manager not found");
      }

      // Create a ManagerResponse object
      const managerResponse = new ManagerResponse({
        teamId: managerInstance.teamId,
        firstName: managerInstance.firstName,
        lastName: managerInstance.lastName,
        email: managerInstance.email,
        password: "#########",
        invitationToken: managerInstance.invitationToken,
        isVerified: managerInstance.isVerified,
      });
      
      return managerResponse;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting manager details");
    }
  }

  async checkManagerExists(email: string): Promise<ManagerExistsResponse> {
    try {
      const existingManager = await ManagerModel.findOne({ email });
      const managerExists = !!existingManager;
      return new ManagerExistsResponse(managerExists);
    } catch (error) {
      console.error(error);
      throw new Error("Error checking manager existence");
    }
  }

  async checkManagerExistsInTeam(
    managerEmail: string,
    teamId: string
  ): Promise<boolean> {
    try {
      const manager = await ManagerTeamModel.findOne({
        managerEmail: managerEmail,
        teamId: teamId,
      });
      const managerExists = !!manager;
      return managerExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking manager existence");
    }
  }
}

// delete manager

// check manager exists in given teamID

export default new ManagerService();
