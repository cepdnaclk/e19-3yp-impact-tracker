import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmal: string;
  teamId: string;
  jesryId: string;
  isVerified: boolean;
}

const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
  jesryId: String,
  isVerified: Boolean,

});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
