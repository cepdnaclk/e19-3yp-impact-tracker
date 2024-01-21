import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  email: string;
}

const playerSchema = new Schema({
  email: String,
});

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
