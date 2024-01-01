"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../../app"));
const appErrorsDefine_1 = require("../../exceptions/appErrorsDefine");
const supertest_1 = __importDefault(require("supertest"));
/**
 * Team Routes Test Suite
 *
 * 1. POST /team - Create a new team
 *    - Test scenario: Verifies that a new team can be successfully created with valid data.
 *
 * 2. POST /team - Handle invalid team data
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to create a team with missing required fields.
 *
 * 3. GET /team/exists/teamId/:id - Check if a team ID exists
 *    - Test scenario: Validates that the server correctly identifies the existence of a team by ID.
 *
 * 4. GET /team/exists/teamId/:id - Handle invalid team ID
 *    - Test scenario: Confirms that the server responds with a 400 Bad Request status when checking the existence of a team with an invalid ID.
 */
describe("Team Routes", () => {
    it("should create a new team", () => __awaiter(void 0, void 0, void 0, function* () {
        const teamData = {
            teamId: "exampleTeamId",
            teamName: "Example Team",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/team")
            .send(teamData)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        expect(response.body).toHaveProperty("teamId", teamData.teamId);
        expect(response.body).toHaveProperty("teamName", teamData.teamName);
    }));
    it("should return a 400 Bad Request for invalid team data", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidTeamData = {
        // Missing required fields
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/team")
            .send(invalidTeamData)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }));
    it("should check if a team ID exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingTeamId = "exampleTeamId";
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/team/exists/teamId/${existingTeamId}`)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        expect(response.body).toHaveProperty("teamExists", true);
    }));
    //   it("should return a 400 Bad Request for an invalid team ID", async () => {
    //     const invalidTeamId = "invalidTeamId";
    //     const response = await request(app)
    //       .get(`/team/exists/teamId/${invalidTeamId}`)
    //       .set("Accept", "application/json");
    //     expect(response.status).toBe(HttpCode.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
    //   });
    // Add more test cases for other scenarios as needed
});
