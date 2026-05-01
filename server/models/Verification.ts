import mongoose, { Schema, Document } from 'mongoose';

export interface IVerification extends Document {
  userId?: string;
  companyName: string;
  riskScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new Schema<IVerification>(
  {
    userId: { type: String, default: 'anonymous' },
    companyName: { type: String, required: true, index: true },
    riskScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Verification = mongoose.model<IVerification>('Verification', VerificationSchema);
