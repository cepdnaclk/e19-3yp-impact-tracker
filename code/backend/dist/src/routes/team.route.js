"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const team_model_1 = require("../models/team.model");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
// Create an instance of the Express Router
const router = (0, express_1.Router)();
// Endpoint to validate if a Team ID exists
router.get("/exists/teamId/:id", (req, res) => {
    // Check if the Team ID parameter is missing
    if (!req.params.id) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    try {
        // Check if the Team ID exists
        const exists = (0, team_controller_1.checkTeamExist)(req.params.id);
        const existsResponse = new team_model_1.TeamIdExistsResponse(exists);
        res.send(existsResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
    }
});
// Endpoint to validate both Team ID and email existence
router.get("/exists", (req, res) => {
    // Extract Team ID and email from query parameters
    const teamId = req.query.teamId;
    const email = req.query.email;
    // Check if either Team ID or email is missing
    if (!teamId || !email) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    // Validate email format
    if (!(0, utils_1.validateEmail)(email)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        // Check if Team ID and email combination exists
        const teamIdEmailExistResponse = (0, team_controller_1.checkTeamEmailExist)(teamId, email);
        res.send(teamIdEmailExistResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Endpoint to create a Team
router.post("/", (req, res) => {
    // Extract Team ID and Team Name from the request body
    const teamId = req.body.teamId;
    const teamName = req.body.teamName;
    // Check if either Team ID or Team Name is missing
    if (!teamId || !teamName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    try {
        // Create a new Team instance
        const team = new team_model_1.Team(teamId, teamName);
        // Create the Team and get the response
        const TeamResponse = (0, team_controller_1.createTeam)(team);
        res.send(TeamResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Export the router for use in other files
exports.default = router;
