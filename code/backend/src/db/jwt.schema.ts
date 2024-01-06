import mongoose, { Document, Schema } from "mongoose";

interface JwtDocument extends Document {
  token: string;
  email: string;
}

const jwtSchema = new Schema({
  token: String,
  email: String,
});

const JwtModel = mongoose.model<JwtDocument>("Jwt", jwtSchema);

export default JwtModel;
