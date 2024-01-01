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
 * Login Routes Test Suite
 *
 * 1. POST /login/manager - Login as a manager
 *    - Test scenario: Verifies that a manager can successfully log in with valid credentials.
 *
 * 2. POST /login/manager - Handle invalid manager login
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to log in as a manager with invalid credentials.
 *
 * 3. POST /login/player - Login as a player
 *    - Test scenario: Verifies that a player can successfully log in with valid credentials.
 *
 * 4. POST /login/player - Handle invalid player login
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to log in as a player with invalid credentials.
 *
 */
describe("Login Routes", () => {
    it("should login as a manager", () => __awaiter(void 0, void 0, void 0, function* () {
        const managerCredentials = {
            userName: "manager@example.com",
            password: "securePassword",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login/manager")
            .send(managerCredentials)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        // You can customize the expectations based on the expected response for a successful manager login.
    }));
    //   it("should return a 400 Bad Request for invalid manager login", async () => {
    //     const invalidManagerCredentials = {
    //       userName: "invalid.manager@example.com",
    //       password: "invalidPassword",
    //     };
    //     const response = await request(app)
    //       .post("/login/manager")
    //       .send(invalidManagerCredentials)
    //       .set("Accept", "application/json");
    //     expect(response.status).toBe(HttpCode.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
    //   });
    it("should login as a player", () => __awaiter(void 0, void 0, void 0, function* () {
        const playerCredentials = {
            userName: "player@example.com",
            password: "securePassword",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login/player")
            .send(playerCredentials)
            .set("Accept", "application/json");
        expect(response.status).toBe(appErrorsDefine_1.HttpCode.OK);
        // You can customize the expectations based on the expected response for a successful player login.
    }));
    //   it("should return a 400 Bad Request for invalid player login", async () => {
    //     const invalidPlayerCredentials = {
    //       userName: "invalid.player@example.com",
    //       password: "invalidPassword",
    //     };
    //     const response = await request(app)
    //       .post("/login/player")
    //       .send(invalidPlayerCredentials)
    //       .set("Accept", "application/json");
    //     expect(response.status).toBe(HttpCode.BAD_REQUEST);
    //     expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
    //   });
    // Add more test cases for other scenarios as needed
});
