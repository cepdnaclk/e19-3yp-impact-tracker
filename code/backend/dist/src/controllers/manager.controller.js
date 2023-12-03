"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManager = exports.checkEmailExist = void 0;
const manager_model_1 = require("../models/manager.model");
function checkEmailExist(teamId) {
    // check email is exists
    return true;
}
exports.checkEmailExist = checkEmailExist;
function createManager(manager) {
    // create a manager
    const managerResponse = new manager_model_1.ManagerResponse(manager);
    return managerResponse;
}
exports.createManager = createManager;
