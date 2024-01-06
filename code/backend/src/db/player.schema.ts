import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const playerSchema = new Schema({
  teamId: String,
  firstName: String,
  lastName: String,
  email: String,
});

const PlayerModel = mongoose.model<PlayerDocument>("Manager", playerSchema);

export default PlayerModel;
