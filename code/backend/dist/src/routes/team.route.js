"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const team_model_1 = require("../models/team.model");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
const router = (0, express_1.Router)();
// validate the Tean ID exits
router.get("/exists/teamId/:id", (req, res) => {
    if (!req.params.id) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    try {
        const exists = (0, team_controller_1.checkTeamExist)(req.params.id);
        const existsResponse = new team_model_1.TeamIdExistsResponse(exists);
        res.send(existsResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
    }
});
// validate both Team ID and email 
router.get("/exists", (req, res) => {
    const teamId = req.query.teamId;
    const email = req.query.email;
    if (!teamId || !email) {
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
        const teamIdEmailExistResponse = (0, team_controller_1.checkTeamEmailExist)(teamId, email);
        res.send(teamIdEmailExistResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
// create a Team
router.post("/", (req, res) => {
    const teamId = req.body.teamId;
    const teamName = req.body.teamName;
    if (!teamId || !teamName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    try {
        const team = new team_model_1.Team(teamId, teamName);
        const TeamResponse = (0, team_controller_1.createTeam)(team);
        res.send(TeamResponse);
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
exports.default = router;
