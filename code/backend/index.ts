import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import options from './src/config/corsOptions';
import apiInfo from './src/config/config';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { connectToDatabase } from './src/db/connectdb'; // Adjust the path

const app: Express = express();
connectToDatabase();

dotenv.config();
app.use(bodyParser.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT||5000;


import exampleRoutes from "./src/routes/example";
app.use(exampleRoutes);

const swaggerSpec = swaggerJSDoc(apiInfo);

app.get('/', (req: Request, res: Response) => {
  res.send(apiInfo.definition.info);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});