import { Router } from "express";
import {Request, Response } from 'express';
import {checkTeamExist, checkTeamEmailExist, createTeam} from '../controllers/team.controller';
import {TeamIdExistsResponse, TeamManagerInterface, TeamIdEmailExistsResponse, Team} from "../models/team.model";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";

const router = Router();

// validate the Tean ID exits
router.get("/exists/teamId/:id", (req: Request, res: Response) => {

    if (!req.params.id){
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    try{
        const exists:boolean = checkTeamExist(req.params.id);
        const existsResponse:TeamIdExistsResponse = new TeamIdExistsResponse(exists);
    
        res.send(existsResponse);

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
    }

});


// validate both Team ID and email 
router.get("/exists", (req: Request<{}, {}, {}, TeamManagerInterface>, res: Response) => {

    const teamId = req.query.teamId;
    const email = req.query.email;

    if (!teamId || !email) {
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    if (!validateEmail(email)) {
        console.log(HttpMsg.INVALID_EMAIL);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.INVALID_EMAIL});
        return;
    }

    try{
        const teamIdEmailExistResponse:TeamIdEmailExistsResponse = checkTeamEmailExist(teamId, email);
    
        res.send(teamIdEmailExistResponse);

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }
    
});

// create a Team
router.post("/", (req: Request, res: Response) => {

    const teamId = req.body.teamId;
    const teamName = req.body.teamName;

    if (!teamId || !teamName) {
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    try{
        const team:Team = new Team(teamId, teamName);

        const TeamResponse:Team = createTeam(team);
        
        res.send(TeamResponse);

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }

});

export default router;