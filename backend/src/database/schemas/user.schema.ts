import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  role: string;
  password?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ['USER', 'ADMIN', 'SUPER_ADMIN', 'GUEST'], default: 'USER' },
    password: { type: String, select: false },
    refreshToken: { type: String, select: false },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);
// Indexes for faster queries
UserSchema.index({ role: 1, isDeleted: 1 });
UserSchema.index({ email: 1, isDeleted: 1 });

export const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
