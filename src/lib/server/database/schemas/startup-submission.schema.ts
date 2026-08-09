import mongoose, { Schema, Document } from 'mongoose';

export interface IStartupSubmission extends Document {
  user: mongoose.Types.ObjectId;
  founderName: string;
  email: string;
  phone: string;
  teamSize: string;
  startupName: string;
  currentStage: string;
  problemStatement: string;
  proposedSolution: string;
  targetUsers: string;
  differentiator: string;
  supportRequired: string[];
  currentProgress?: string;
  links?: string;
  pitchDeckUrl?: string;
  adminReviewStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const StartupSubmissionSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    founderName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    teamSize: { type: String, required: true },
    startupName: { type: String, required: true, trim: true },
    currentStage: { type: String, required: true },
    problemStatement: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    targetUsers: { type: String, required: true },
    differentiator: { type: String, required: true },
    supportRequired: [{ type: String }],
    currentProgress: { type: String },
    links: { type: String },
    pitchDeckUrl: { type: String },
    adminReviewStatus: {
      type: String,
      enum: [
        'NEW',
        'UNDER REVIEW',
        'CONTACTED',
        'DISCOVERY SCHEDULED',
        'IN DISCUSSION',
        'GUIDANCE',
        'COLLABORATION',
        'BUILDING',
        'LAUNCHED',
        'CLOSED'
      ],
      default: 'NEW'
    }
  },
  {
    timestamps: true
  }
);

export const StartupSubmissionModel = (mongoose.models.StartupSubmission as mongoose.Model<IStartupSubmission>) || mongoose.model<IStartupSubmission>('StartupSubmission', StartupSubmissionSchema);
