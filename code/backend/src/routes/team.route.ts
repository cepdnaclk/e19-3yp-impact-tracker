import { Router } from "express";
import {Request, Response } from 'express';
import {checkTeamExist, checkTeamEmailExist, createTeam} from '../controllers/team.controller'
import {TeamIdExistsResponse, TeamManagerInterface, TeamIdEmailExistsResponse, Team} from "../models/team.model";

const router = Router();

/**
 * @swagger
 * /team:
 *      get:
 *          summary: Send the text to the server
 *          tags:
 *              - ExampleEndpoints
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

router.get("/teamId/:id", (req: Request, res: Response) => {
    res.send(new TeamIdExistsResponse(checkTeamExist(req.params.id)));
});


router.get("/", (req: Request<{}, {}, {}, TeamManagerInterface>, res: Response) => {

    const teamId = req.query.teamId;
    const email = req.query.email;

    res.send(new TeamIdEmailExistsResponse(checkTeamEmailExist(teamId, email)));
    
});

router.post("/", (req: Request, res: Response) => {
    
    const team:Team = req.body;
    
    res.send(createTeam(team));
});

export default router;