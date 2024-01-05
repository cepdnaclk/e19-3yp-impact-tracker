// Import necessary libraries and modules
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import options from "./src/config/corsOptions";
import apiInfo from "./src/config/config";
import swaggerUi from "swagger-ui-express";

// Create an instance of the Express application
const app: Express = express();

// Load environment variables from a .env file
dotenv.config();

// Middleware setup
app.use(cors(options));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import route modules
import teamRoutes from "./src/routes/team.route";
import managerRoutes from "./src/routes/manager.route";
import login from "./src/routes/login.route";
import auth from "./src/routes/auth.route";
import { accessTokenMiddleware } from "./src/middleware/auth.middleware";

// Serve Swagger UI documentation at the '/api-docs' endpoint
import * as swaggerDocument from "./swagger.json";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// auth route to get access token
app.use("/auth", auth);

// Verify access token for all routes except the login route
app.use(accessTokenMiddleware);

// Use the defined routes for specific endpoints
app.use("/login", login);
app.use("/team", teamRoutes);
app.use("/manager", managerRoutes);

// Define a basic route for the root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send(apiInfo.definition.info);
});

export default app; // Export the Express application to be used by serverless Function
