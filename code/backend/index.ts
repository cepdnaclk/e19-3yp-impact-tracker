// Import app
import app from "./app";

import { connectToDatabase } from "./src/db/connectdb"; // Adjust the path
connectToDatabase();

// Define the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
