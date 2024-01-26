import mongoose, { Document, Schema } from "mongoose";

interface ManagerDocument extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  invitationToken: string;
  isVerified: string;
}
const verificationStatusValidator = function(value: string) {
  if (!['pending', 'verified', 'rejected'].includes(value)) {
    throw new Error('Invalid verification status');
  }
};

const managerSchema = new Schema({
  teamId: String,
  firstName: String,
  lastName: String,
  email: String,
  invitationToken: String,
  isVerified: { type: String, validate: verificationStatusValidator },
});

const ManagerModel = mongoose.model<ManagerDocument>("Manager", managerSchema);

export default ManagerModel;
