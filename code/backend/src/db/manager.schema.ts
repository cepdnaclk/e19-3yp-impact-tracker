import mongoose, { Schema, Document } from 'mongoose';

interface Manager extends Document {
  teamId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const managerSchema = new Schema<Manager>({
  teamId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ManagerModel = mongoose.model<Manager>('Manager', managerSchema);

export default ManagerModel;
