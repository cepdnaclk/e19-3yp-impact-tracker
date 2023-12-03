"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeam = exports.checkTeamEmailExist = exports.checkTeamExist = void 0;
function checkTeamExist(teamId) {
    // check team exists
    return true;
}
exports.checkTeamExist = checkTeamExist;
function checkTeamEmailExist(teamId, email) {
    // check team ID and email of the manager matchers
    // Team ID does not exist => Create new team
    // Team ID exists && email has authorization as a valid manager => Login
    // Team ID exists && email has no authorization => Send message that you are not authorized.
    // {
    //     teamExists: true,
    //     managerExists :true
    // }
    return "log";
}
exports.checkTeamEmailExist = checkTeamEmailExist;
function createTeam(team) {
    // create a team
    return team;
}
exports.createTeam = createTeam;
