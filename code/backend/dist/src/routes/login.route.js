"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_model_1 = require("../models/login.model");
const login_controller_1 = require("../controllers/login.controller");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
// Create an instance of the Express Router
const router = (0, express_1.Router)();
// Endpoint to handle login for a manager
router.post("/manager", (req, res) => {
    // Extract password and userName from the request body
    const password = req.body.password;
    const userName = req.body.userName;
    // Check if password or userName is missing
    if (!password || !userName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    // Validate email format
    if (!(0, utils_1.validateEmail)(userName)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        // Create a LoginRequest instance for manager login
        const loginReq = new login_model_1.LoginResquest(password, userName);
        // Perform manager login and get the status
        const status = (0, login_controller_1.loginManager)(loginReq);
        // Send a response (you may want to send the status or additional data here)
        res.send();
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Endpoint to handle login for a player
router.post("/player", (req, res) => {
    // Extract password and userName from the request body
    const password = req.body.password;
    const userName = req.body.userName;
    // Check if password or userName is missing
    if (!password || !userName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    // Validate email format
    if (!(0, utils_1.validateEmail)(userName)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        // Create a LoginRequest instance for player login
        const loginReq = new login_model_1.LoginResquest(password, userName);
        // Perform player login and get the status
        const status = (0, login_controller_1.loginPlayer)(loginReq);
        // Send a response (you may want to send the status or additional data here)
        res.send();
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// Export the router for use in other files
exports.default = router;
