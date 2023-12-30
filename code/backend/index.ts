// Import necessary libraries and modules
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import options from "./src/config/corsOptions";
import apiInfo from "./src/config/config";
import swaggerUi from "swagger-ui-express";
import mongoose  from 'mongoose';

// Create an instance of the Express application
const app: Express = express();

import { connectToDatabase } from './src/db/connectdb'; // Adjust the path
connectToDatabase();

// Load environment variables from a .env file
dotenv.config();

// Middleware setup
app.use(bodyParser.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define the port for the server to listen on
const port = process.env.PORT || 5000;

// Import route modules
import teamRoutes from "./src/routes/team.route";
import managerRoutes from "./src/routes/manager.route";
import login from "./src/routes/login.route";

// Use the defined routes for specific endpoints
app.use("/team", teamRoutes);
app.use("/manager", managerRoutes);
app.use("/login", login);

// Serve Swagger UI documentation at the '/api-docs' endpoint
import * as swaggerDocument from "./swagger.json";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define a basic route for the root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send(apiInfo.definition.info);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// const uri = "mongodb+srv://impax-user:impax1234@3ypcluster.grcuqte.mongodb.net/impax?retryWrites=true&w=majority";
// mongoose.Promise = Promise;
// mongoose.connect(uri);
// mongoose.connection.on('connected', () => {
//   console.log("Connected to MongoDB!!!");
// });

// // Event listener for connection errors
// mongoose.connection.on('error', (error) => {
//   console.error("Error connecting to MongoDB:", error);
// });
