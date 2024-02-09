import mongoose, { Document } from 'mongoose';

export interface SessionType extends Document {
  userId: mongoose.Types.ObjectId;
  jwt: string;
  expiresAt: Date;
  createdAt: Date;
}
