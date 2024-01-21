import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
