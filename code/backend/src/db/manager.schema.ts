import mongoose, { Document, Schema } from "mongoose";

interface ManagerDocument extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const managerSchema = new Schema({
  teamId: String,
  firstName: String,
  lastName: String,
  email: String,
});

const ManagerModel = mongoose.model<ManagerDocument>("Manager", managerSchema);

export default ManagerModel;
