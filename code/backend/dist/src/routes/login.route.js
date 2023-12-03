"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_model_1 = require("../models/login.model");
const login_controller_1 = require("../controllers/login.controller");
const appErrorsDefine_1 = require("../exceptions/appErrorsDefine");
const utils_1 = require("../utils/utils");
const router = (0, express_1.Router)();
router.post("/manager", (req, res) => {
    const password = req.body.password;
    const userName = req.body.userName;
    if (!password || !userName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    if (!(0, utils_1.validateEmail)(userName)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        const loginReq = new login_model_1.LoginResquest(password, userName);
        const status = (0, login_controller_1.loginManager)(loginReq);
        res.send();
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
router.post("/player", (req, res) => {
    const password = req.body.password;
    const userName = req.body.userName;
    if (!password || !userName) {
        console.log(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.BAD_REQUEST });
        return;
    }
    if (!(0, utils_1.validateEmail)(userName)) {
        console.log(appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send({ message: appErrorsDefine_1.HttpMsg.INVALID_EMAIL });
        return;
    }
    try {
        const loginReq = new login_model_1.LoginResquest(password, userName);
        const status = (0, login_controller_1.loginPlayer)(loginReq);
        res.send();
    }
    catch (err) {
        console.log(err);
        res.status(appErrorsDefine_1.HttpCode.BAD_REQUEST).send(appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }
});
exports.default = router;
