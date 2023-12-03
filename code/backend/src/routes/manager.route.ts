import { Router } from "express";
import {Request, Response } from 'express';
import {ManagerExistsResponse, Manager, ManagerResponse} from "../models/manager.model"
import { checkEmailExist, createManager} from "../controllers/manager.controller"
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";
import {checkTeamExist} from '../controllers/team.controller';

const router = Router();

router.get("/exists/email/:email", (req:Request, res:Response) => {

    const email = req.params.email;

    if (!email) {
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
        const exits:boolean = checkEmailExist(req.params.email);
        const existsResponse:ManagerExistsResponse = new ManagerExistsResponse(exits);

        res.send(existsResponse);

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }

});

router.post("/", (req:Request, res:Response) => {

    const teamId = req.body.teamId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !teamId || !firstName || !lastName || !password) {
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    if (!validateEmail(email)) {
        console.log(HttpMsg.INVALID_EMAIL);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.INVALID_EMAIL});
        return;
    }
    
    console.log(teamId, firstName);

    if (!checkTeamExist(teamId)) {
        console.log(HttpMsg.INVALID_TEAMID);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.INVALID_TEAMID});
        return;
    }

    try{
        const manager:Manager = new Manager(teamId, firstName, lastName, email, password);

        const managerResponse:ManagerResponse = createManager(manager);

        res.send(managerResponse);

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }

});



export default router;



