import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  userId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    userId: { type: String, required: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Index for conversation history ordering
MessageSchema.index({ conversationId: 1, createdAt: 1 });
MessageSchema.index({ userId: 1, createdAt: -1 });

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
