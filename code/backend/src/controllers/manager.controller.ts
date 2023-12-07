import { Manager,ManagerResponse } from "../models/manager.model";
import { Request, Response } from 'express';
//import { checkEmailExist as checkEmailExistService, createManager } from '../services/manager.service';

function checkEmailExist(teamId: string): boolean {

    // check email is exists

    return true;
}


function createManager(manager:Manager):ManagerResponse {

    // create a manager


    const managerResponse: ManagerResponse = new ManagerResponse(manager);

    return managerResponse;
}


export {checkEmailExist, createManager};