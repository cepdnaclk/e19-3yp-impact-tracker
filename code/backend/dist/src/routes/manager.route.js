"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_model_1 = require("../models/manager.model");
const manager_controller_1 = require("../controllers/manager.controller");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
const team_controller_1 = require("../controllers/team.controller");
const router = (0, express_1.Router)();
router.get("/exists/email/:email", (req, res) => {
    const email = req.params.email;
    if (!email) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    if (!(0, utils_1.validateEmail)(email)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        const exits = (0, manager_controller_1.checkEmailExist)(req.params.email);
        const existsResponse = new manager_model_1.ManagerExistsResponse(exits);
        res.send(existsResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
router.post("/", (req, res) => {
    const teamId = req.body.teamId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !teamId || !firstName || !lastName || !password) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    if (!(0, utils_1.validateEmail)(email)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    console.log(teamId, firstName);
    if (!(0, team_controller_1.checkTeamExist)(teamId)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_TEAMID);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_TEAMID });
        return;
    }
    try {
        const manager = new manager_model_1.Manager(teamId, firstName, lastName, email, password);
        const managerResponse = (0, manager_controller_1.createManager)(manager);
        res.send(managerResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
exports.default = router;
