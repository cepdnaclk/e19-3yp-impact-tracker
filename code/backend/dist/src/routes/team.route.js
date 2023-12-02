"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const team_model_1 = require("../models/team.model");
const router = (0, express_1.Router)();
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
router.get("/teamId/:id", (req, res) => {
    res.send(new team_model_1.TeamIdExistsResponse((0, team_controller_1.checkTeamExist)(req.params.id)));
});
router.get("/", (req, res) => {
    const teamId = req.query.teamId;
    const email = req.query.email;
    res.send(new team_model_1.TeamIdEmailExistsResponse((0, team_controller_1.checkTeamEmailExist)(teamId, email)));
});
router.post("/", (req, res) => {
    const team = req.body;
    res.send((0, team_controller_1.createTeam)(team));
});
exports.default = router;
