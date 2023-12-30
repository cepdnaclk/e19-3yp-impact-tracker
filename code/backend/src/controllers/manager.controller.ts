import { Manager,ManagerRequestBody, ManagerExistsResponse, ManagerResponse } from "../models/manager.model";
import { Request, Response } from 'express';
import managerService from '../services/manager.service';

// function checkEmailExist(teamId: string): boolean {

//     // check email is exists

//     return true;
// }


// function createManager(manager:Manager):ManagerResponse {

//     // create a manager


//     const managerResponse: ManagerResponse = new ManagerResponse(manager);

//     return managerResponse;
// }

export async function createManager(manager: Manager): Promise<ManagerResponse | undefined> {
    try {
        const managerResponse = await managerService.createManager(manager);
        return managerResponse;
    } catch (error) {
        console.error(error);
    }
    return;
}
  
export    async function getManager(req: Request, res: Response): Promise<void> {
        try {
          const managerId = req.params.managerId; // Assuming "managerId" is the parameter name
          const manager = await managerService.getManager(managerId);
          res.status(200).json(manager);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

export    async function addManagerToTeam(req: Request, res: Response): Promise<void> {
        try {
            const currentManagerTeamId = req.params.teamId; // Assuming "teamId" is the parameter name
            const managerRequestBody: ManagerRequestBody = {
                ...req.body,
                teamId: currentManagerTeamId,
            };

            const manager = await managerService.addManagerToTeam(currentManagerTeamId, managerRequestBody); // Pass both arguments
            res.status(200).json(manager);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  

export    async function checkManagerExists(email: string): Promise<boolean> {
        try {
            // const email = req.params.email;
            // Call the function in service
            const managerExists = await managerService.checkManagerExists(email);
            // res.status(200).json(managerExists);
            return managerExists.managerExists;

        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
