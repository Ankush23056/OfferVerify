import mongoose, { Schema } from 'mongoose';

const ScamReportSchema = new Schema({
  userId: { type: String, default: 'anonymous' },
  reportDetails: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
});

const CompanySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    verificationDetails: { type: String },
    scamReports: [ScamReportSchema],
  },
  { timestamps: true }
);

export const Company = mongoose.model('Company', CompanySchema);
