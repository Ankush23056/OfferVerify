import mongoose, { Schema, Document } from 'mongoose';

export interface IScamReport {
  userId?: string;
  reportDetails: string;
  reportedAt: Date;
}

export interface ICompany extends Document {
  name: string;
  verificationDetails?: string;
  scamReports: IScamReport[];
  createdAt: Date;
  updatedAt: Date;
}

const ScamReportSchema = new Schema<IScamReport>({
  userId: { type: String, default: 'anonymous' },
  reportDetails: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
});

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, unique: true, index: true },
    verificationDetails: { type: String },
    scamReports: [ScamReportSchema],
  },
  { timestamps: true }
);

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
