import {Request, Response } from 'express';
import TeamModel  from "../db/team.schema";
import ManagerModel  from "../db/manager.schema";

import {
    TeamIdEmailExistsResponse, 
    TeamResponse,
    Team
} from '../models/team.model'

import teamService from "../services/team.service";



export async function checkTeamExist(teamId: string): Promise<boolean> {

    // check team exists

    try {
        // Check if team exists
        const team = await TeamModel.findById(teamId);
        return !!team;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking team existence');
    }
}

export async function checkTeamEmailExist(teamId: string, email: string): Promise<TeamIdEmailExistsResponse> {

    // check team ID and email of the manager matchers

    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.

    // {
    //     teamExists: true,
    //     managerExists :true
    // }


    // Initialize response with both flags set to false
    // TeamIdEmailExistsResponse constuctor
    const teamIdEmailExistsResponse = new TeamIdEmailExistsResponse(false, false);

    try {
        // Check if team exists
        const team = await TeamModel.findById(teamId);
        if (team) {
            teamIdEmailExistsResponse.teamExists = true;

            // Check if manager with provided email exists and is authorized for the team
            const manager = await ManagerModel.findOne({ email, teamId });
            if (manager) {
                teamIdEmailExistsResponse.managerExists = true;
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error checking team and manager existence');
    }

    // const teamIdEmailExistsResponse:TeamIdEmailExistsResponse = new TeamIdEmailExistsResponse();
    // teamIdEmailExistsResponse.managerExists = true;

    return teamIdEmailExistsResponse;
}

export async function createTeam(team: Team): Promise<TeamResponse | undefined> {
    try {
        const teamResponse = await teamService.createTeam(team);
        return teamResponse;
      } catch (error) {
        console.error(error);
        // Handle the error, either by returning a default value or throwing an error
        throw new Error('Failed to create team');
      }
  }

