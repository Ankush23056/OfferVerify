import mongoose, { Schema } from 'mongoose';

/**
 * Company profile: populated either from seeding or the Exa RAG pipeline.
 * Once saved, subsequent searches are served instantly from this cache.
 */
const CompanySchema = new Schema(
  {
    companyName:    { type: String, required: true, index: true },
    officialWebsite:{ type: String, default: null },
    yearEstablished:{ type: String, default: null },
    headquarters:   { type: String, default: null },
    trustScore:     { type: Number, default: null },  // 1-100 scale
    redFlagSummary: { type: String, default: null },  // Groq-generated summary
    source:         { type: String, enum: ['seed', 'exa-rag', 'manual'], default: 'manual' },
    freshlyVerified:{ type: Boolean, default: false },
    exaSearchedAt:  { type: Date, default: null },
  },
  { timestamps: true }
);

// Case-insensitive text index for fuzzy matching
CompanySchema.index({ companyName: 'text' });

export const Company = mongoose.model('Company', CompanySchema);
