import mongoose, { Document, Schema } from "mongoose";

interface PlayerDocument extends Document {
  email: string;
  invitationToken: string;
  isVerified: string;
}

const verificationStatusValidator = function(value: string) {
  if (!['pending', 'verified', 'rejected'].includes(value)) {
    throw new Error('Invalid verification status');
  }
};

const playerSchema = new Schema({
  email: String,
  invitationToken: String,
  isVerified: { type: String, validate: verificationStatusValidator },
});

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
