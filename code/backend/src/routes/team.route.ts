import { Router } from "express";
import {Request, Response } from 'express';
import {checkTeamExist, checkTeamEmailExist, createTeam} from '../controllers/team.controller'
import {TeamIdExistsResponse, TeamManagerInterface, TeamIdEmailExistsResponse, Team} from "../models/team.model";

const router = Router();

// validate the Tean ID exits
router.get("/exists/teamId/:id", (req: Request, res: Response) => {

    const exists:boolean = checkTeamExist(req.params.id);
    const existsResponse:TeamIdExistsResponse = new TeamIdExistsResponse(exists);

    res.send(existsResponse);
});


// validate both Team ID and email 
router.get("/exists", (req: Request<{}, {}, {}, TeamManagerInterface>, res: Response) => {

    const teamId = req.query.teamId;
    const email = req.query.email;

    const status:string = checkTeamEmailExist(teamId, email);
    const teamIdEmailExistResponse:TeamIdEmailExistsResponse = new TeamIdEmailExistsResponse(status);

    res.send(teamIdEmailExistResponse);
    
});

// create a Team
router.post("/", (req: Request, res: Response) => {

    const team:Team = req.body;

    const TeamResponse:Team = createTeam(team);
    
    res.send(TeamResponse);
});

export default router;