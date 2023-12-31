import mongoose, { Document, Schema } from "mongoose";

interface TeamDocument extends Document {
    teamId: string;
    teamName: string;

  }
  
  const teamSchema = new Schema({
    teamId: String,
    teamName: String,
  });
  
  const TeamModel = mongoose.model<TeamDocument>("Team", teamSchema);
  
  export default TeamModel;
