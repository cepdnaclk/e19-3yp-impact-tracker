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
const supertest_1 = __importDefault(require("supertest"));
describe("Manager Routes", () => {
    it("should create a new manager", () => __awaiter(void 0, void 0, void 0, function* () {
        // Define a sample manager data for testing
        const managerData = {
            teamId: "exampleTeamId",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "securePassword",
        };
        // Use Supertest to make a POST request to the /manager endpoint
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/manager")
            .send(managerData)
            .set("Accept", "application/json");
        // Check the response status code and body
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("teamId", managerData.teamId);
        expect(response.body).toHaveProperty("firstName", managerData.firstName);
        expect(response.body).toHaveProperty("lastName", managerData.lastName);
        expect(response.body).toHaveProperty("email", managerData.email);
    }));
    // Add more test cases as needed for other scenarios (e.g., handling bad requests, validation errors, etc.)
});
