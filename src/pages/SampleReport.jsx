import { ArrowLeft, ShieldAlert, AlertTriangle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function SampleReport() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ════════ Left Column: AI Assessment (60%) ════════ */}
          <div className="lg:w-[60%] space-y-8 order-1">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">AI Assessment Report</h1>
              <p className="text-slate-400">Sample analysis of a fraudulent job offer letter.</p>
            </div>
             
            {/* Trust Score Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-xl"
            >
              <div className="shrink-0">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                    {/* Dasharray = 2*PI*52 = 326.72. Dashoffset for 18% = 326.72 - (0.18*326.72) = 267.91 */}
                    <circle 
                      cx="60" cy="60" r="52" fill="none" 
                      stroke="#ef4444" strokeWidth="10" strokeLinecap="round" 
                      strokeDasharray="326.72" strokeDashoffset="267.91" 
                    />
                  </svg>
                  <div className="text-center z-10">
                    <div className="text-5xl font-black tracking-tighter text-red-500">18</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">/ 100 Score</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold mb-3 uppercase tracking-wider">
                  Critical Danger
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-7 h-7 text-red-500" />
                  High Risk Scam Detected
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  This offer letter exhibits multiple severe scam indicators. It is highly recommended that you do not engage with the sender, share personal documents, or fulfill any payment requests.
                </p>
              </div>
            </motion.div>
             
            {/* Red Flags List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Identified Red Flags
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-red-500/20 rounded-xl p-5 flex gap-4 hover:bg-white/10 transition-colors">
                  <div className="text-2xl mt-0.5">🚩</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Generic 'Dear Candidate' greeting</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Legitimate companies will address you by your full name in an official offer letter. Generic greetings are used in mass-mailed phishing campaigns.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-red-500/20 rounded-xl p-5 flex gap-4 hover:bg-white/10 transition-colors">
                  <div className="text-2xl mt-0.5">🚩</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Requirement for advance payment</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Asking for a "security deposit," "equipment fee," or "training fee" is a definitive scam indicator. No real employer requires payment to start working.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-red-500/20 rounded-xl p-5 flex gap-4 hover:bg-white/10 transition-colors">
                  <div className="text-2xl mt-0.5">🚩</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Sender email domain mismatch</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">The email originated from a free service (e.g., @gmail.com) rather than the official corporate domain, indicating impersonation.</p>
                  </div>
                </div>
              </div>
            </motion.div>
             
            {/* Detailed Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Detailed Breakdown
              </h3>
              <div className="space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  The AI analyzed the uploaded PDF and cross-referenced it with known scam typologies. The typography and letterhead appear superficially professional, mimicking a well-known enterprise. However, the linguistic patterns heavily lean on urgency and immediate financial transactions, classic hallmarks of employment fraud.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Furthermore, the designated HR contact information does not align with any publicly listed directories for the purported company. Proceeding with this offer carries an extreme risk of financial loss and identity theft.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* ════════ Right Column: Document Viewer (40%) ════════ */}
          <div className="lg:w-[40%] order-2 mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-28"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Document Viewer</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Evidence</span>
              </div>
              
              {/* Paper-like container */}
              <div className="bg-white p-2 sm:p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mb-4">
                <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200" style={{ height: '700px' }}>
                  <iframe 
                    src="/sample-offer.pdf" 
                    title="Sample Offer Letter PDF"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>

              {/* Fallback link */}
              <div className="text-center">
                <a 
                  href="/sample-offer.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/20"
                >
                  <FileText className="w-4 h-4" />
                  PDF not loading? Click here to view it directly
                </a>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
