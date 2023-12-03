"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerResponse = exports.Manager = exports.ManagerExistsResponse = void 0;
class ManagerExistsResponse {
    constructor(managerExists) {
        this.managerExists = managerExists;
    }
}
exports.ManagerExistsResponse = ManagerExistsResponse;
// // Team ID, First Name, Last Name, Email Address, Password
class Manager {
    constructor(teamId, firstName, lastName, email, password) {
        this.teamId = teamId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
exports.Manager = Manager;
class ManagerResponse {
    constructor(manager) {
        this.teamId = manager.teamId;
        this.firstName = manager.firstName;
        this.lastName = manager.lastName;
        this.email = manager.email;
    }
}
exports.ManagerResponse = ManagerResponse;
