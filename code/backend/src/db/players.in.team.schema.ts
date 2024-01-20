import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmal: string;
  teamId: string;
  jesryId: string;
  firstName: string;
  lastName: string;
  invitationToken: string;
  isVerified: boolean;
}

const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
  jesryId: String,
  firstName: String,
  lastName: String,
  invitationToken: String, 
  isVerified: Boolean,

});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
