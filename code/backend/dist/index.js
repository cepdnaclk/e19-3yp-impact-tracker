"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./src/config/corsOptions"));
const config_1 = __importDefault(require("./src/config/config"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const team_route_1 = __importDefault(require("./src/routes/team.route"));
app.use("/team", team_route_1.default);
const swaggerSpec = (0, swagger_jsdoc_1.default)(config_1.default);
app.get('/', (req, res) => {
    res.send(config_1.default.definition.info);
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
