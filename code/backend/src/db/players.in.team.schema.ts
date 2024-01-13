import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmal: string;
  teamId: string;
}

const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
