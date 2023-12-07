import { Manager, ManagerResponse } from '../models/manager.model';

// Mock database to store manager data
const managerDatabase: Manager[] = [];

// Function to check if a manager with a given teamId already exists
function checkEmailExist(teamId: string): boolean {
  return managerDatabase.some((manager) => manager.teamId === teamId);
}

// Function to create a new manager
function createManager(manager: Manager): ManagerResponse {
  managerDatabase.push(manager);
  return new ManagerResponse(manager);
}

export { checkEmailExist, createManager };
