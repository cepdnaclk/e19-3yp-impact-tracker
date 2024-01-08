import SessionModel from "../db/session.schema";
import { ImpactPlayer } from "../models/session.model";

// create session object
class SessionService {
  async createSession(
    teamId: string,
    sessionId: string,
    sessionName: string,
    createdAt: number,
    updatedAt: number,
    impactHistory: ImpactPlayer[]
  ): Promise<void> {
    try {
      const session = new SessionModel({
        teamId: teamId,
        sessionId: sessionId,
        sessionName: sessionName,
        createdAt: createdAt,
        updatedAt: updatedAt,
        impactHistory: impactHistory,
      });
      await session.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // check session exists
  async checkSessionExists(sessionId: string): Promise<boolean> {
    try {
      const session = await SessionModel.findOne({ sessionId: sessionId });
      const sessionExists = !!session;
      return sessionExists;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking session existence");
    }
  }

  // delete sesion using sessionId
  async deleteSession(sessionId: string): Promise<void> {
    try {
      await SessionModel.deleteOne({ sessionId: sessionId });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new SessionService();
