import {Request, Response } from 'express';
import { Team } from '../models/team.model';

function checkTeamExist(teamId: string): boolean {

    // check team exists

    return true;
}

function checkTeamEmailExist(teamId: string, email: string): string {

    // check team ID and email of the manager matchers

    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.

    // {
    //     teamExists: true,
    //     managerExists :true
    // }

    return "log";
}

function createTeam(team: Team): Team{

    // create a team

    return team;
}

export {checkTeamExist, checkTeamEmailExist, createTeam};