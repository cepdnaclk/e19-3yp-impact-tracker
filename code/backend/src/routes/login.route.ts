import { Router } from "express";
import {Request, Response } from 'express';
import { LoginResquest } from "../models/login.model";
import { loginManager, loginPlayer } from "../controllers/login.controller";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";

const router = Router();


router.post("/manager", (req:Request, res:Response) => {

    const password = req.body.password;
    const userName = req.body.userName;

    if (!password || !userName) {
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    if (!validateEmail(userName)) {
        console.log(HttpMsg.INVALID_EMAIL);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.INVALID_EMAIL});
        return;
    }

    try{
        const loginReq:LoginResquest = new LoginResquest(password, userName);

        const status = loginManager(loginReq);
    
        res.send();

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }

});


router.post("/player", (req:Request, res:Response) => {

    const password = req.body.password;
    const userName = req.body.userName;

    if (!password || !userName) {
        console.log(HttpMsg.BAD_REQUEST);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.BAD_REQUEST});
        return;
    }

    if (!validateEmail(userName)) {
        console.log(HttpMsg.INVALID_EMAIL);
        res.status(HttpCode.BAD_REQUEST).send({message: HttpMsg.INVALID_EMAIL});
        return;
    }

    try{
        const loginReq:LoginResquest = new LoginResquest(password, userName);

        const status = loginPlayer(loginReq);
    
        res.send();

    } catch (err) {
        console.log(err);
        res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
    }

});


export default router;