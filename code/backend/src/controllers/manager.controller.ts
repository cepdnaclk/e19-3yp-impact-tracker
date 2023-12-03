import { Manager,ManagerResponse } from "../models/manager.model";

function checkEmailExist(teamId: string): boolean {

    return true;
}


function createManager(manager:Manager):ManagerResponse {

    const managerResponse: ManagerResponse = new ManagerResponse(manager);

    return managerResponse;
}


export {checkEmailExist, createManager};