import mongoose, { Document, Schema } from "mongoose";

interface ManagerTeamDocument extends Document {
  managerEmail: string;
  teamId: string;
  accepted: string;
}

const verificationStatusValidator = function(value: string) {
  if (!['pending', 'verified', 'rejected'].includes(value)) {
    throw new Error('Invalid verification status');
  }
}; 

const managerTeamSchema = new Schema({
  managerEmail: String,
  teamId: String,
  accepted: { type: String, validate: verificationStatusValidator },
});

const ManagerTeamModel = mongoose.model<ManagerTeamDocument>(
  "ManagersInTeam",
  managerTeamSchema
);

export default ManagerTeamModel;
