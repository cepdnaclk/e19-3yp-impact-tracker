import {
  ManagerRequestBody,
  ManagerResponse,
  ManagerExistsResponse,
} from "../models/manager.model";
import ManagerModel from "../db/manager.schema";

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
        password: managerRequestBody.password,
      });

      // Save the manager to the database
      const savedManager = await managerInstance.save();

      // Create a ManagerResponse object
      const managerResponse = new ManagerResponse({
        teamId: savedManager.teamId,
        firstName: savedManager.firstName,
        lastName: savedManager.lastName,
        email: savedManager.email,
        password: "##########",
      });

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
}

export default new ManagerService();
