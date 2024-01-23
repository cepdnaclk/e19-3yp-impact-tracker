import mongoose, { Document, Schema } from "mongoose";

interface ManagerTeamDocument extends Document {
  managerEmail: string;
  teamId: string;
  accepted: boolean;
}

const managerTeamSchema = new Schema({
  managerEmail: String,
  teamId: String,
  accepted: Boolean,
});

const ManagerTeamModel = mongoose.model<ManagerTeamDocument>(
  "ManagersInTeam",
  managerTeamSchema
);

export default ManagerTeamModel;
