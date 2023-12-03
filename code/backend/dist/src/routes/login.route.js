"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const router = (0, express_1.Router)();
router.post("/manager", (req, res) => {
    const loginReq = req.body;
    const status = (0, login_controller_1.loginManager)(loginReq);
    res.send();
});
router.post("/player", (req, res) => {
    const loginReq = req.body;
    const status = (0, login_controller_1.loginPlayer)(loginReq);
    res.send();
});
exports.default = router;
