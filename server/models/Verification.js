import mongoose, { Schema } from 'mongoose';

const VerificationSchema = new Schema(
  {
    userId: { type: String, default: 'anonymous' },
    companyName: { type: String, required: true, index: true },
    riskScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Verification = mongoose.model('Verification', VerificationSchema);
