import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  email: string;
  invitationToken: string;
  isVerified: string;
}

const playerSchema = new Schema({
  email: String,
  invitationToken: String,
  isVerified: String,
});

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
