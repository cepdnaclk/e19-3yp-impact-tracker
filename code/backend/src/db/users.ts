// Import mongoose
import mongoose, { Schema, Document } from 'mongoose';

// Define the Manager schema
interface Manager extends Document {
  teamName: string;
  teamID: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  
}

const managerSchema = new Schema<Manager>({
  teamName: { type: String, required: true },
  teamID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication:{
    password: { type: String, required: true },
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false},
  }
  
});

// Create the Manager model
const ManagerModel = mongoose.model<Manager>('Manager', managerSchema);

// Define the Player schema
interface Player extends Document {
  username: string;
  email: string;
  password: string;
  team: string; 
}

const playerSchema = new Schema<Player>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: String, required: true },
});

// Create the Player model
const PlayerModel = mongoose.model<Player>('Player', playerSchema);

// Export the models
export { ManagerModel, PlayerModel };
