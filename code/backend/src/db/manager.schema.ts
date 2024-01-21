import mongoose, { Document, Schema } from "mongoose";

interface ManagerDocument extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  invitationToken: string;
  isVerified: boolean;
}

const managerSchema = new Schema({
  teamId: String,
  firstName: String,
  lastName: String,
  email: String,
  invitationToken: String,
  isVerified: Boolean,
});

const ManagerModel = mongoose.model<ManagerDocument>("Manager", managerSchema);

export default ManagerModel;
