import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmail: string;
  teamId: string;
  jesryId: string;
  fullName: string;
  invitationToken: string;
  isVerified: string;
}

const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
  jesryId: String,
  fullName: String,
  invitationToken: String, 
  isVerified: String,

});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
