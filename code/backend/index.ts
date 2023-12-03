import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import options from './src/config/corsOptions';
import apiInfo from './src/config/config';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT||5000;

import teamRoutes from "./src/routes/team.route";
import managerRoutes from "./src/routes/manager.route";
import login from "./src/routes/login.route";

app.use("/team" ,teamRoutes);
app.use("/manager" ,managerRoutes);
app.use("/login" ,login);

const swaggerSpec = swaggerJSDoc(apiInfo);

app.get('/', (req: Request, res: Response) => {
  res.send(apiInfo.definition.info);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});