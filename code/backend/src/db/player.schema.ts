import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

}

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

});

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
