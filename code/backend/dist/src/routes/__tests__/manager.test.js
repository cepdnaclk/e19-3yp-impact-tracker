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
 * Manager Routes Test Suite
 *
 * 1. POST /manager - Create a new manager
 *    - Test scenario: Verifies that a new manager can be successfully created with valid data.
 *
 * 2. POST /manager - Handle invalid manager data
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to create a manager with missing required fields.
 *
 * 3. GET /manager/exists/email/:email - Check if a manager email exists
 *    - Test scenario: Validates that the server correctly identifies the existence of a manager by email.
 *
 * 4. GET /manager/exists/email/:email - Handle invalid manager email
 *    - Test scenario: Confirms that the server responds with a 400 Bad Request status when checking the existence of a manager with an invalid email.
 *
 */
describe("Manager Routes", () => {
    it("should create a new manager", () => __awaiter(void 0, void 0, void 0, function* () {
        const managerData = {
            teamId: "exampleTeamId",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "securePassword",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/manager")
            .send(managerData)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        expect(response.body).toHaveProperty("teamId", managerData.teamId);
        expect(response.body).toHaveProperty("firstName", managerData.firstName);
        expect(response.body).toHaveProperty("lastName", managerData.lastName);
        expect(response.body).toHaveProperty("email", managerData.email);
    }));
    it("should return a 400 Bad Request for invalid manager data", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidManagerData = {
        // Missing required fields
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/manager")
            .send(invalidManagerData)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", appErrorsDefine_1.HttpMsg.BAD_REQUEST);
    }));
    it("should check if a manager email exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingManagerEmail = "john.doe@example.com";
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/manager/exists/email/${existingManagerEmail}`)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        expect(response.body).toHaveProperty("managerExists", true);
    }));
    it("should return a 400 Bad Request for an invalid manager email", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidManagerEmail = "invalid.email@example";
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/manager/exists/email/${invalidManagerEmail}`)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", appErrorsDefine_1.HttpMsg.INVALID_EMAIL);
    }));
    // Add more test cases for other scenarios as needed
});
