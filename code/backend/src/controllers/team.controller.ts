import {Request, Response } from 'express';
import { Team } from '../models/team.model';
import {TeamIdEmailExistsResponse} from '../models/team.model'

function checkTeamExist(teamId: string): boolean {

    // check team exists

    return true;
}

function checkTeamEmailExist(teamId: string, email: string): TeamIdEmailExistsResponse {

    // check team ID and email of the manager matchers

    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.

    // {
    //     teamExists: true,
    //     managerExists :true
    // }

    const teamIdEmailExistsResponse:TeamIdEmailExistsResponse = new TeamIdEmailExistsResponse();
    teamIdEmailExistsResponse.managerExists = true;

    return teamIdEmailExistsResponse;
}

function createTeam(team: Team): Team{

    // create a team

    return team;
}

export {checkTeamExist, checkTeamEmailExist, createTeam};