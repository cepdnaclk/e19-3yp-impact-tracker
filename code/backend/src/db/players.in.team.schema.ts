import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmail: string;
  teamId: string;
  jerseyId: number;
  fullName: string;
  invitationToken: string;
  isVerified: string;
}

const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
  jerseyId: Number,
  fullName: String,
  invitationToken: String, 
  isVerified: String,

});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
