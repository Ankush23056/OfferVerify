import { Upload, ArrowRight, BadgeInfo, CheckCircle2, FileText, AlertTriangle, Sparkles, Brain, ShieldCheck, FileSearch, Building2, Users, Globe, TrendingUp, Bot, IndianRupee, Mail, Clock, VideoOff, MapPin, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
          >
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>NEW: AI-powered scam detection · Built by a victim, for job seekers</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Don't get scammed.<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Verify your job offer.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Upload your offer letter and we'll instantly flag scam patterns, fake
              companies, and illegal money demands — so you never get tricked
              into a fake job again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link to="/verify" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer">
                <Upload className="w-5 h-5" />
                Verify your offer free
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                See sample report
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>No signup needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>100% private</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic / Mock Report */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative mt-10 lg:mt-0"
          >
            {/* Main Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl relative transform transition-transform hover:-translate-y-1 duration-500">
              
              {/* Inner Header */}
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-indigo-300 font-medium">
                  <FileText className="w-5 h-5" />
                  <span>Verification Report</span>
                </div>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold rounded-full tracking-wide">
                  HIGH RISK
                </span>
              </div>

              {/* Score */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-red-400 tracking-tighter">35</span>
                  <span className="text-slate-400 font-medium">/ 100 trust score</span>
                </div>
                {/* Progress bar visual */}
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-red-500 w-[35%]" />
                </div>
              </div>

              {/* Finding Items */}
              <div className="space-y-3 mb-8">
                {/* Red Item 1 */}
                <div className="flex space-x-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  <AlertTriangle className="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">Asks for ₹5,000 "registration fee" — illegal</span>
                </div>
                {/* Red Item 2 */}
                <div className="flex space-x-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  <AlertTriangle className="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">Email is @gmail.com, not company domain</span>
                </div>
                {/* Yellow Item */}
                <div className="flex space-x-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                  <BadgeInfo className="text-amber-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">No company CIN / registration number</span>
                </div>
                {/* Green Item */}
                <div className="flex space-x-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <CheckCircle2 className="text-emerald-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">Professional formatting maintained</span>
                </div>
              </div>

              {/* Summary Recommendation */}
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <p className="text-slate-200 text-sm">
                  <span className="font-semibold text-red-400 mr-2">Recommendation:</span>
                  Do not accept. Multiple scam indicators detected.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="relative z-10 border-y border-white/10 backdrop-blur-md bg-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2 tracking-tight">60s</div>
              <div className="text-slate-400 font-medium text-sm lg:text-base">Average verification time</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2 tracking-tight">20+</div>
              <div className="text-slate-400 font-medium text-sm lg:text-base">Scam patterns detected</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center px-4"
            >
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2 tracking-tight">₹38Cr</div>
              <div className="text-slate-400 font-medium text-sm lg:text-base">Lost to job scams in 2024</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center px-4"
            >
              <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2 tracking-tight">100%</div>
              <div className="text-slate-400 font-medium text-sm lg:text-base">Free for job seekers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">How it works</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              From offer to verdict in 3 steps
            </h2>
            <p className="text-lg text-slate-400">
              No login. No fees. Just answers when you need them most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all"
            >
              <div className="absolute -top-4 left-8">
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  STEP 1
                </span>
              </div>
              <div className="w-12 h-12 bg-white/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 mt-2 border border-white/5">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Upload your offer</h3>
              <p className="text-slate-400 leading-relaxed">
                Drop the PDF, image, or paste the text. Works with screenshots from WhatsApp too.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all"
            >
              <div className="absolute -top-4 left-8">
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  STEP 2
                </span>
              </div>
              <div className="w-12 h-12 bg-white/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 mt-2 border border-white/5">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI scans instantly</h3>
              <p className="text-slate-400 leading-relaxed">
                We check 20+ scam patterns, verify the company online, and cross-reference our scam database.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all"
            >
              <div className="absolute -top-4 left-8">
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  STEP 3
                </span>
              </div>
              <div className="w-12 h-12 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 mt-2 border border-white/5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get a clear verdict</h3>
              <p className="text-slate-400 leading-relaxed">
                Trust score, red flags, and a plain-English recommendation — in under a minute.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 lg:py-32 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-400 font-semibold text-sm tracking-wide uppercase">Features</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              Everything a scammer hopes you don't have
            </h2>
            <p className="text-lg text-slate-400">
              A complete toolkit to verify any job offer before you commit, pay, or quit your current job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: FileSearch,
                title: "Offer letter analysis",
                desc: "Detects fake letterheads, missing CIN, suspicious clauses, and illegal payment demands."
              },
              {
                icon: Building2,
                title: "Company verification",
                desc: "Cross-checks MCA registry, LinkedIn, domain age, and online footprint automatically."
              },
              {
                icon: Users,
                title: "Crowdsourced reports",
                desc: "Tap into thousands of scam reports submitted by other job seekers across India."
              },
              {
                icon: Globe,
                title: "Website & domain check",
                desc: "Flags brand-new domains, fake client logos, and copy-pasted content."
              },
              {
                icon: TrendingUp,
                title: "Salary benchmarking",
                desc: "Compares your offered salary with market rates to spot 'too good to be true' bait."
              },
              {
                icon: Bot,
                title: "AI assistant",
                desc: "Ask anything: 'Is paying training fees normal?' Get instant, honest answers."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 text-cyan-400 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section id="red-flags" className="relative z-10 py-20 lg:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-400 font-semibold text-sm tracking-wide uppercase">Red flags we catch</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              If you see any of these, stop.
            </h2>
            <p className="text-lg text-slate-400">
              These are the exact patterns that have scammed thousands of Indian job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: IndianRupee,
                title: '"Pay registration / training fee"',
                desc: "Legitimate companies NEVER ask candidates for money. Ever."
              },
              {
                icon: Mail,
                title: "Generic Gmail / Yahoo email",
                desc: "Real companies use @company.com domains, not free email services."
              },
              {
                icon: Clock,
                title: '"Offer expires in 24 hours"',
                desc: "Pressure tactics are designed to stop you from doing due diligence."
              },
              {
                icon: VideoOff,
                title: "Offer without a real interview",
                desc: "No company hires someone for ₹8 LPA after a 10-minute chat."
              },
              {
                icon: MapPin,
                title: "No physical address or CIN",
                desc: "Every registered Indian company has a CIN. If it's missing, run."
              },
              {
                icon: AlertCircle,
                title: "Salary too good to be true",
                desc: "If a 15-person company offers double the market rate — it's bait."
              }
            ].map((flag, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5 p-6 sm:p-8 rounded-3xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  <flag.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{flag.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {flag.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-400 font-semibold text-sm tracking-wide uppercase">Real stories</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tight">
              Built by someone who got scammed too
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg flex flex-col justify-between h-full"
            >
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                "I almost paid ₹7,500 for a 'laptop deposit'. OfferVerify flagged it instantly — the company didn't even exist on MCA."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  P
                </div>
                <div>
                  <h4 className="text-white font-bold">Priya S.</h4>
                  <p className="text-slate-400 text-sm">Final-year student, Pune</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg flex flex-col justify-between h-full"
            >
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                "Got an offer for ₹12 LPA from a company I'd never heard of. Trust score: 22/100. Saved me from quitting my actual job."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  R
                </div>
                <div>
                  <h4 className="text-white font-bold">Rahul M.</h4>
                  <p className="text-slate-400 text-sm">Backend dev, Bangalore</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg flex flex-col justify-between h-full"
            >
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                "Built this because it happened to me. Lost ₹5,000 to a fake offer. Never again — for me or anyone else."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  F
                </div>
                <div>
                  <h4 className="text-white font-bold">Founder</h4>
                  <p className="text-slate-400 text-sm">OfferVerify</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 lg:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tight">
              Common questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is OfferVerify really free?",
                a: "Yes. 100% free for job seekers. We aim to help people avoid scams, not charge them when they are looking for work."
              },
              {
                q: "Do you store my offer letter?",
                a: "No. Your documents are analyzed in memory and immediately discarded. We do not store, share, or train our models on your private data."
              },
              {
                q: "What file types do you support?",
                a: "We support PDF, PNG, JPG, and raw text paste. You can even upload screenshots of WhatsApp messages."
              },
              {
                q: "Can I report a scam company?",
                a: "Yes! If you identify a scam, you can submit the company details to our database to help protect others from falling into the same trap."
              },
              {
                q: "How accurate is the AI?",
                a: "Our AI is trained on thousands of verified scam patterns in the Indian job market and cross-references live data like MCA registration and domain age. It is highly accurate at catching patterns humans miss."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-white font-medium text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 text-slate-400 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-20 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 lg:p-16 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-center"
          >
            {/* Inner Glow/Mesh for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                Got an offer? <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Verify it before you celebrate.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Takes 60 seconds. No signup. Could save you ₹5,000 — or your career.
              </p>
              <Link to="/verify" className="flex items-center justify-center mx-auto gap-2 px-8 py-5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-1 text-lg cursor-pointer w-fit">
                <Upload className="w-6 h-6" />
                Verify my offer now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
