import mongoose, { Schema } from 'mongoose';

const ScamReportSchema = new Schema(
  {
    companyName: { type: String, required: true, index: true },
    reportDetails: { type: String, required: true },
    userId: { type: String, default: 'anonymous' },
    reportedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ScamReport = mongoose.model('ScamReport', ScamReportSchema);
