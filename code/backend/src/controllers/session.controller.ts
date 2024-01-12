import { SessionRequest } from "../models/session.model";
import sessionService from "../services/session.service";

class SessionController {
  // create session
  async createSession(sessionRes: SessionRequest) {
    try {
      await sessionService.createSession(
        sessionRes.teamId,
        sessionRes.sessionId,
        sessionRes.sessionName,
        sessionRes.createdAt,
        sessionRes.updatedAt,
        sessionRes.impactHistory
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // check session exists
  async checkSessionExists(sessionId: string): Promise<boolean> {
    try {
      const session = await sessionService.checkSessionExists(sessionId);
      return session;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // delete session
  async deleteSession(sessionId: string): Promise<void> {
    try {
      await sessionService.deleteSession(sessionId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new SessionController();
