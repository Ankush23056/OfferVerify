import { ArrowLeft, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Terms() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using OfferVerify, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
              <div className="flex gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <h2 className="text-xl font-semibold text-white uppercase tracking-wider text-sm">Legal Disclaimer</h2>
              </div>
              <p className="text-amber-200/80 leading-relaxed font-medium">
                The AI-powered analysis provided by OfferVerify is for informational purposes only and does NOT constitute legal advice, employment counseling, or a guarantee of an offer's legitimacy. We are not responsible for any decisions made based on our analysis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Use of AI</h2>
              <p className="leading-relaxed">
                OfferVerify uses advanced AI models (Groq AI) to identify patterns commonly associated with job scams. AI is not infallible and can produce false positives or false negatives. Users are encouraged to perform their own independent due diligence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibility</h2>
              <p className="leading-relaxed">
                You are solely responsible for verifying the authenticity of any job offer you receive. OfferVerify does not guarantee that our service will detect every possible scam.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
              <p className="leading-relaxed">
                OfferVerify and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the service or reliance on its analysis.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
