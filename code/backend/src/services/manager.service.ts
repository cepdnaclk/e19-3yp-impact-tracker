import {
  ManagerRequestBody,
  ManagerResponse,
  ManagerExistsResponse,
} from "../models/manager.model";
import ManagerModel from "../db/manager.schema";
import { createAuth } from "./auth.service";

class ManagerService {
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
      });

      // Save the manager to the database
      const savedManager = await managerInstance.save();

      // save the manager auth
      await createAuth(managerRequestBody.email, managerRequestBody.password);

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
      console.log(managerEmail, teamId);
      const manager = await ManagerModel.findOne({
        email: managerEmail,
        teamId: teamId,
      });
      console.log(manager);
      const managerExists = !!manager;
      return managerExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking manager existence");
    }
  }
}

// check manager exists in given teamID

export default new ManagerService();
