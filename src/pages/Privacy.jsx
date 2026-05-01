import { ArrowLeft, ShieldCheck, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Privacy() {
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
            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Information We Process</h2>
              <p className="leading-relaxed">
                When you upload a document for verification, the content is processed in memory on our secure servers to perform AI analysis. We do NOT store your uploaded files permanently.
              </p>
            </section>

            <section className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex gap-3 mb-3">
                <Eye className="w-5 h-5 text-indigo-400 shrink-0" />
                <h2 className="text-xl font-semibold text-white uppercase tracking-wider text-sm">Community Contributions</h2>
              </div>
              <p className="text-indigo-200/80 leading-relaxed font-medium">
                To protect the wider community, we store submitted scam reports (including company names, scam details, and trust scores) in our MongoDB database. This help others search for known scams.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Data Usage</h2>
              <p className="leading-relaxed">
                Your data is used solely to provide the verification service and maintain the global scam database. We do not sell or share your personal information with third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. AI Processing</h2>
              <p className="leading-relaxed">
                Document text is sent to Groq AI via encrypted channels for pattern recognition. This data is not used by the AI provider to train their models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Your Rights</h2>
              <p className="leading-relaxed">
                Since we do not require account creation, we do not store traditional user profiles. You have the right to request deletion of any specific scam report you have submitted.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
