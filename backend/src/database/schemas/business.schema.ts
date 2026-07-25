import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  industry: string;
  ownerId: mongoose.Types.ObjectId;
  stage: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const BusinessSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stage: { type: String, required: true, default: 'IDEA' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
BusinessSchema.index({ ownerId: 1, isDeleted: 1 });
BusinessSchema.index({ industry: 1 });

export const BusinessModel = mongoose.model<IBusiness>('Business', BusinessSchema);
