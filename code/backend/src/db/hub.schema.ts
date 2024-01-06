import mongoose, { Document, Schema } from "mongoose";

interface HubDocument extends Document {
  mqttUsername: string;
  mqttPassword: string;
  mqttCA: string;
  hubKey: string;
  hubId: string;
}

const hubSchema = new Schema({
  mqttUsername: String,
  mqttPassword: String,
  mqttCA: String,
  hubKey: String,
  hubId: String,
});

const HubModel = mongoose.model<HubDocument>("Hub", hubSchema);

export default HubModel;
