// Import app
import app from "./app";
import mongoose from "mongoose";

import { connectToDatabase } from "./src/db/connectdb"; // Adjust the path
connectToDatabase();

// Define the port for the server to listen on
const port = process.env.PORT || 5000;

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!!!");
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});

// comments
