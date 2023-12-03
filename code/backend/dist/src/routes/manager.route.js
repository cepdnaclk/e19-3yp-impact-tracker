"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_model_1 = require("../models/manager.model");
const manager_controller_1 = require("../controllers/manager.controller");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
const team_controller_1 = require("../controllers/team.controller");
// Create an instance of the Express Router
const router = (0, express_1.Router)();
// Endpoint to check if a manager with a specific email exists
router.get("/exists/email/:email", (req, res) => {
    // Extract email parameter from the request
    const email = req.params.email;
    // Check if email parameter is missing
    if (!email) {
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
        // Check if a manager with the given email exists
        const exists = (0, manager_controller_1.checkEmailExist)(req.params.email);
        const existsResponse = new manager_model_1.ManagerExistsResponse(exists);
        res.send(existsResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Endpoint to create a new manager
router.post("/", (req, res) => {
    // Extract manager details from the request body
    const teamId = req.body.teamId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    // Check if any required field is missing
    if (!email || !teamId || !firstName || !lastName || !password) {
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
    // Check if the specified team exists
    if (!(0, team_controller_1.checkTeamExist)(teamId)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_TEAMID);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_TEAMID });
        return;
    }
    try {
        // Create a new Manager instance
        const manager = new manager_model_1.Manager(teamId, firstName, lastName, email, password);
        // Create the manager and get the response
        const managerResponse = (0, manager_controller_1.createManager)(manager);
        res.send(managerResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Export the router for use in other files
exports.default = router;
