"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_model_1 = require("../models/manager.model");
const manager_controller_1 = require("../controllers/manager.controller");
const router = (0, express_1.Router)();
router.get("/exists/email/:email", (req, res) => {
    const exits = (0, manager_controller_1.checkEmailExist)(req.params.email);
    const existsResponse = new manager_model_1.ManagerExistsResponse(exits);
    res.send(existsResponse);
});
router.post("/", (req, res) => {
    const manager = req.body;
    const managerResponse = (0, manager_controller_1.createManager)(manager);
    res.send(managerResponse);
});
exports.default = router;
