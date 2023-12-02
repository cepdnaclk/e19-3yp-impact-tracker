import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://impax-user:impax1234@3ypcluster.grcuqte.mongodb.net/impax?retryWrites=true&w=majority";

// Define the serverApi options
const serverApiOptions = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  };
  
  // Create a MongoClient with the combined MongoClientOptions
  const client = new MongoClient(uri, {
    serverApi: serverApiOptions,
    // Other MongoClientOptions properties can be included here
  } as MongoClientOptions);

async function connectToDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export { connectToDatabase, client };
//run().catch(console.dir);