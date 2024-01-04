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
const manager_model_1 = require("../models/manager.model");
const manager_schema_1 = __importDefault(require("../db/manager.schema"));
class ManagerService {
    createManager(managerRequestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new instance of the Manager model
                const managerInstance = new manager_schema_1.default({
                    teamId: managerRequestBody.teamId,
                    firstName: managerRequestBody.firstName,
                    lastName: managerRequestBody.lastName,
                    email: managerRequestBody.email,
                    password: managerRequestBody.password,
                });
                // Save the manager to the database
                const savedManager = yield managerInstance.save();
                // Create a ManagerResponse object
                const managerResponse = new manager_model_1.ManagerResponse({
                    teamId: savedManager.teamId,
                    firstName: savedManager.firstName,
                    lastName: savedManager.lastName,
                    email: savedManager.email,
                    password: "##########",
                });
                return managerResponse;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error creating manager");
            }
        });
    }
    checkManagerExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingManager = yield manager_schema_1.default.findOne({ email });
                const managerExists = !!existingManager;
                return new manager_model_1.ManagerExistsResponse(managerExists);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error checking manager existence");
            }
        });
    }
}
exports.default = new ManagerService();
