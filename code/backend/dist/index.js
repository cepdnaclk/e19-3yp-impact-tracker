"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries and modules
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./src/config/corsOptions"));
const config_1 = __importDefault(require("./src/config/config"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));

// Create an instance of the Express application
const app = (0, express_1.default)();

const connectdb_1 = require("./src/db/connectdb"); // Adjust the path
(0, connectdb_1.connectToDatabase)();

// Load environment variables from a .env file
dotenv_1.default.config();

// Middleware setup
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Define the port for the server to listen on
const port = process.env.PORT || 5000;
// Import route modules
const team_route_1 = __importDefault(require("./src/routes/team.route"));
const manager_route_1 = __importDefault(require("./src/routes/manager.route"));
const login_route_1 = __importDefault(require("./src/routes/login.route"));
// Use the defined routes for specific endpoints
app.use("/team", team_route_1.default);
app.use("/manager", manager_route_1.default);
app.use("/login", login_route_1.default);
// Serve Swagger UI documentation at the '/api-docs' endpoint
const swaggerDocument = __importStar(require("./swagger.json"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Define a basic route for the root endpoint
app.get('/', (req, res) => {
    res.send(config_1.default.definition.info);
});
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
