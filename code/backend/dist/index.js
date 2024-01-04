"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import app
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectdb_1 = require("./src/db/connectdb"); // Adjust the path
(0, connectdb_1.connectToDatabase)();
// Define the port for the server to listen on
const port = process.env.PORT || 5000;
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB!!!");
    app_1.default.listen(port, () => {
        console.log(`[server]: Server is  running at http://localhost:${port}`);
    });
});
