"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://impax-user:impax1234@3ypcluster.grcuqte.mongodb.net/?retryWrites=true&w=majority";
// Define the serverApi options
const serverApiOptions = {
    version: mongodb_1.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
};
// Create a MongoClient with the combined MongoClientOptions
const client = new mongodb_1.MongoClient(uri, {
    serverApi: serverApiOptions,
    // Other MongoClientOptions properties can be included here
});
exports.client = client;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//run().catch(console.dir);
