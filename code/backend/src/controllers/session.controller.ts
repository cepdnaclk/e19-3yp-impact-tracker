import { SessionRequest } from "../models/session.model";
import sessionService from "../services/session.service";

// create session
async function createSession(sessionRes: SessionRequest) {
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
async function checkSessionExists(sessionId: string): Promise<boolean> {
  try {
    const session = await sessionService.checkSessionExists(sessionId);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// delete session
async function deleteSession(sessionId: string): Promise<void> {
  try {
    await sessionService.deleteSession(sessionId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { createSession, checkSessionExists, deleteSession };
