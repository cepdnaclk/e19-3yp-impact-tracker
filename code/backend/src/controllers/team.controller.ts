import { Request, Response } from "express";
import TeamModel from "../db/team.schema";
import ManagerModel from "../db/manager.schema";

import {
  TeamIdExistsResponse,
  TeamIdEmailExistsResponse,
  TeamResponse,
  Team,
} from "../models/team.model";

import teamService from "../services/team.service";

export async function checkTeamExist(
  teamId: string
): Promise<TeamIdExistsResponse> {
  // check team exists

  try {
    // Check if Team ID and email combination exists
    const teamIdExistResponse: TeamIdExistsResponse =
      await teamService.checkTeamExist(teamId);
    return teamIdExistResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Error checking Team existence.");
  }
}

export async function checkTeamEmailExist(
  teamId: string,
  email: string
): Promise<TeamIdEmailExistsResponse> {
  // check team ID and email of the manager matchers

  // Team ID does not exist => Create new team
  // Team ID exists && email has authorization as a valid manager => Login
  // Team ID exists && email has no authorization => Send message that you are not authorized.

  // {
  //     teamExists: true,
  //     managerExists :true
  // }

  try {
    // Check if Team ID and email combination exists
    const teamIdEmailExistResponse: TeamIdEmailExistsResponse =
      await teamService.checkTeamEmailExist(teamId, email);
    return teamIdEmailExistResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Error checking Team and Manager existence.");
  }
}

export async function createTeam(
  team: Team
): Promise<TeamResponse | undefined> {
  try {
    const teamResponse = await teamService.createTeam(team);
    return teamResponse;
  } catch (error) {
    console.error(error);
    // Handle the error, either by returning a default value or throwing an error
    throw new Error("Failed to create team");
  }
}

export async function getTeam(
  teamId: string
): Promise<TeamResponse | undefined> {
  try {
    const teamResponse = await teamService.getTeam(teamId);
    return teamResponse;
  } catch (error) {
    console.error(error);
    // Handle the error, either by returning a default value or throwing an error
    throw new Error("Failed to get team");
  }
}
