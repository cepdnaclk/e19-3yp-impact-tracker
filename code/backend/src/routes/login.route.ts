import { Router } from "express";
import {Request, Response } from 'express';
import { LoginResquest } from "../models/login.model";
import { loginManager, loginPlayer } from "../controllers/login.controller";

const router = Router();


router.post("/manager", (req:Request, res:Response) => {

    const loginReq:LoginResquest = req.body;

    const status = loginManager(loginReq);

    res.send();

});


router.post("/player", (req:Request, res:Response) => {

    const loginReq:LoginResquest = req.body;

    const status = loginPlayer(loginReq);

    res.send();

});


export default router;