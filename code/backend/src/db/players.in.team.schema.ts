import mongoose, { Document, Schema } from "mongoose";

interface PlayerTeamDocument extends Document {
  playerEmail: string;
  teamId: string;
  jerseyId: number;
  fullName: string;
  invitationToken: string;
  isVerified: string;
}

const verificationStatusValidator = function(value: string) {
  if (!['pending', 'verified', 'rejected'].includes(value)) {
    throw new Error('Invalid verification status');
  }
};
const playerTeamSchema = new Schema({
  playerEmail: String,
  teamId: String,
  jerseyId: Number,
  fullName: String,
  invitationToken: String, 
  isVerified: { type: String, validate: verificationStatusValidator },

});

const PlayerTeamModel = mongoose.model<PlayerTeamDocument>(
  "PlayersInTeam",
  playerTeamSchema
);

export default PlayerTeamModel;
