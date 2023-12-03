"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const team_model_1 = require("../models/team.model");
const router = (0, express_1.Router)();
// validate the Tean ID exits
router.get("/exists/teamId/:id", (req, res) => {
    const exists = (0, team_controller_1.checkTeamExist)(req.params.id);
    const existsResponse = new team_model_1.TeamIdExistsResponse(exists);
    res.send(existsResponse);
});
// validate both Team ID and email 
router.get("/exists", (req, res) => {
    const teamId = req.query.teamId;
    const email = req.query.email;
    const status = (0, team_controller_1.checkTeamEmailExist)(teamId, email);
    const teamIdEmailExistResponse = new team_model_1.TeamIdEmailExistsResponse(status);
    res.send(teamIdEmailExistResponse);
});
// create a Team
router.post("/", (req, res) => {
    const team = req.body;
    const TeamResponse = (0, team_controller_1.createTeam)(team);
    res.send(TeamResponse);
});
exports.default = router;
