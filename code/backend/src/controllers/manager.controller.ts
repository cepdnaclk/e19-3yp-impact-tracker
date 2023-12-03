import { Manager,ManagerResponse } from "../models/manager.model";

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