import mongoose, { Document, Schema } from 'mongoose';

interface ManagerDocument extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const managerSchema = new Schema({
  firstName: String,
  lastName: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  authentication: { email: String, password: String },
});

const ManagerModel = mongoose.model<ManagerDocument>('Manager', managerSchema);

export default ManagerModel;
