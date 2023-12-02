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
    constructor(status) {
        this.status = status;
    }
}
exports.TeamIdEmailExistsResponse = TeamIdEmailExistsResponse;
class Team {
    constructor(teamId, name) {
        this.teamId = teamId;
        this.name = name;
    }
}
exports.Team = Team;
