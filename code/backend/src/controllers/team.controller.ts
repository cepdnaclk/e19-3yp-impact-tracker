import {Request, Response } from 'express';
import { Team } from '../models/team.model';

function checkTeamExist(teamId: string): boolean {

    return true;
}

function checkTeamEmailExist(teamId: string, email: string): string {

    return "log";
}

function createTeam(team: Team): Team{


    return team;
}

export {checkTeamExist, checkTeamEmailExist, createTeam};