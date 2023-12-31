import mongoose, { Document, Schema } from "mongoose";

interface ManagerTeamDocument extends Document {
  managerEmail: string;
  teamId: string;
}

const managerTeamSchema = new Schema({
  managerEmail: String,
  teamId: String,
});

const ManagerTeamModel = mongoose.model<ManagerTeamDocument>(
  "ManagerTeam",
  managerTeamSchema
);

export default ManagerTeamModel;
