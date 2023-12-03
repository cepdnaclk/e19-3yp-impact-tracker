"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = exports.TeamIdEmailExistsResponse = exports.TeamIdExistsResponse = void 0;
class TeamIdExistsResponse {
    constructor(teamExists) {
        this.teamExists = teamExists;
    }
}
exports.TeamIdExistsResponse = TeamIdExistsResponse;
class TeamIdEmailExistsResponse {
    constructor() {
        this.teamExists = false;
        this.managerExists = false;
    }
}
exports.TeamIdEmailExistsResponse = TeamIdEmailExistsResponse;
class Team {
    constructor(teamId, teamName) {
        this.teamId = teamId;
        this.teamName = teamName;
    }
}
exports.Team = Team;
