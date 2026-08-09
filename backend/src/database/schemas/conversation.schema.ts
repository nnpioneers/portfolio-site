import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const ConversationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, default: 'New Conversation' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

// Index for faster queries per user
ConversationSchema.index({ userId: 1, createdAt: -1 });

export const ConversationModel = mongoose.model<IConversation>('Conversation', ConversationSchema);
