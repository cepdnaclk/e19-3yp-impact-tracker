import mongoose, { Document, Schema } from "mongoose";

interface AuthDocument extends Document {
  email: string;
  password: string;
  teamId: string;
}

const authSchema = new Schema({
  email: String,
  password: String,
  teamId: String,
});

const AuthModelManager = mongoose.model<AuthDocument>(
  "ManagerAuth",
  authSchema
);

export default AuthModelManager;
