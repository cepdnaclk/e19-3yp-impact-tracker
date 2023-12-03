import { Router } from "express";
import {Request, Response } from 'express';
import {ManagerExistsResponse, Manager, ManagerResponse} from "../models/manager.model"
import { checkEmailExist, createManager} from "../controllers/manager.controller"


const router = Router();

router.get("/exists/email/:email", (req:Request, res:Response) => {

    const exits:boolean = checkEmailExist(req.params.email);
    const existsResponse:ManagerExistsResponse = new ManagerExistsResponse(exits);

    res.send(existsResponse);

});

router.post("/", (req:Request, res:Response) => {

    const manager:Manager = req.body;

    const managerResponse:ManagerResponse = createManager(manager);

    res.send(managerResponse);

});



export default router;



