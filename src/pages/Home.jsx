import { Upload, ArrowRight, BadgeInfo, CheckCircle2, FileText, AlertTriangle, FileSearch, Building2, Users, Globe, TrendingUp, Bot, IndianRupee, Mail, Clock, VideoOff, MapPin, AlertCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const MotionLink = motion.create(Link);
import { motion } from 'motion/react';
import { GlobalScamSearch } from '../components/verify/GlobalScamSearch';
import API_BASE_URL from '../config/api';

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({ verifications: '10k+', reports: '2.5k+', moneySaved: '₹38Cr' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/stats`);
        const data = await res.json();
        if (data && !data.error) {
          setStats({
            verifications: `${data.verifications}+`,
            reports: `${data.reports}+`,
            moneySaved: data.moneySaved > 10000000 ? `₹${(data.moneySaved / 10000000).toFixed(1)}Cr` : `₹${(data.moneySaved / 100000).toFixed(1)}L`
          });
        }
      } catch (err) {
        // Silently fallback to default stats on error
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-vd-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
            
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vd-surface border border-vd-border text-vd-secondary/70 text-xs font-semibold mb-6">
              <span className="font-sans">Built by a victim, for job seekers</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif text-vd-primary tracking-tight leading-[1.1] mb-6">
              Don't get scammed.<br className="hidden sm:block" />
              <span className="text-vd-accent">Verify your job offer.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl font-sans text-vd-secondary/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Upload your offer letter and we'll identify scam patterns, fake
              companies, and illegal money demands — so you never get tricked
              into a fake job.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <MotionLink whileHover={{ scale: 1.02 }} to="/verify" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-vd-accent text-vd-primary font-bold font-serif rounded-xl hover:bg-vd-accent/90 active:scale-95 transition-all duration-300 cursor-pointer">
                <Upload className="w-5 h-5" />
                Verify your offer free
              </MotionLink>
              <MotionLink whileHover={{ scale: 1.02 }} to="/sample" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-vd-surface border border-vd-border text-vd-primary hover:bg-vd-surface/80 active:scale-95 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 cursor-pointer">
                See sample report
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-vd-secondary/70 font-medium">
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
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Graphic / Mock Report */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex-1 w-full max-w-lg lg:max-w-none relative mt-10 lg:mt-0">
            {/* Main Card */}
            <div className="bg-vd-surface border border-vd-border p-6 sm:p-8 rounded-2xl relative hover:border-vd-accent hover:-translate-y-[2px] transition-all duration-300">
              
              {/* Inner Header */}
              <div className="flex justify-between items-center mb-8 border-b border-vd-border pb-4">
                <div className="flex items-center gap-2 text-vd-accent font-medium">
                  <FileText className="w-5 h-5" />
                  <span>Verification Report</span>
                </div>
                <span className="px-3 py-1 bg-rose-400/10 text-rose-400 border border-rose-400/20 text-xs font-bold font-serif rounded-full tracking-wide">
                  HIGH RISK
                </span>
              </div>

              {/* Score */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-rose-400 tracking-tighter">35</span>
                  <span className="text-vd-secondary/70 font-medium">/ 100 trust score</span>
                </div>
                {/* Progress bar visual */}
                <div className="h-3 w-full bg-vd-border rounded-full overflow-hidden flex">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '35%' }} transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} className="h-full bg-rose-400" />
                </div>
              </div>

              {/* Finding Items */}
              <div className="space-y-3 mb-8">
                {/* Red Item 1 */}
                <div className="flex space-x-3 bg-rose-400/10 border border-rose-400/20 p-4 rounded-xl">
                  <AlertTriangle className="text-rose-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-vd-primary font-medium">Asks for ₹5,000 "registration fee" — illegal</span>
                </div>
                {/* Red Item 2 */}
                <div className="flex space-x-3 bg-rose-400/10 border border-rose-400/20 p-4 rounded-xl">
                  <AlertTriangle className="text-rose-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-vd-primary font-medium">Email is @gmail.com, not company domain</span>
                </div>
                {/* Yellow Item */}
                <div className="flex space-x-3 bg-amber-400/10 border border-amber-400/20 p-4 rounded-xl">
                  <BadgeInfo className="text-amber-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-vd-primary font-medium">No company CIN / registration number</span>
                </div>
                {/* Green Item */}
                <div className="flex space-x-3 bg-emerald-400/10 border border-emerald-400/20 p-4 rounded-xl">
                  <CheckCircle2 className="text-emerald-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-vd-primary font-medium">Professional formatting maintained</span>
                </div>
              </div>

              {/* Summary Recommendation */}
              <div className="bg-rose-400/10 border border-rose-400/20 p-4 rounded-xl">
                <p className="text-vd-primary text-sm">
                  <span className="font-semibold text-rose-400 mr-2">Recommendation:</span>
                  Do not accept. Multiple scam indicators detected.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <GlobalScamSearch />

      {/* Stats Section */}
      <section className="relative z-10 border-y border-vd-border bg-vd-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-800">
            <div className="text-center px-4">
              <div className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mb-2 tracking-tight">{stats.verifications}</div>
              <div className="text-vd-secondary/70 font-medium text-sm lg:text-base">Offers verified</div>
            </div>

            <div className="text-center px-4">
              <div className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mb-2 tracking-tight">{stats.reports}</div>
              <div className="text-vd-secondary/70 font-medium text-sm lg:text-base">Scams reported</div>
            </div>

            <div className="text-center px-4">
              <div className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mb-2 tracking-tight">{stats.moneySaved}</div>
              <div className="text-vd-secondary/70 font-medium text-sm lg:text-base">Saved by job seekers</div>
            </div>

            <div className="text-center px-4">
              <div className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mb-2 tracking-tight">100%</div>
              <div className="text-vd-secondary/70 font-medium text-sm lg:text-base">Free for job seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Concrete Proof Section */}
      <section id="proof" className="relative z-10 py-24 bg-vd-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-vd-accent font-semibold text-sm tracking-wide uppercase">Real Results</span>
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mt-4 mb-6 tracking-tight">
            See exactly what we find
          </h2>
          <p className="text-lg text-vd-secondary/70 mb-12">
            Upload your offer letter and get a detailed, line-by-line breakdown of any suspicious clauses.
          </p>
          
          <div className="bg-vd-surface border border-vd-border rounded-2xl p-4 shadow-xl mx-auto aspect-video flex items-center justify-center text-vd-secondary/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000')] opacity-30 bg-cover bg-center"></div>
            <div className="relative z-10 bg-vd-bg/80 p-8 rounded-xl border border-vd-border max-w-md">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-serif text-vd-primary mb-2">Detailed Analysis Report</h3>
                <p className="text-vd-secondary/70">Our system scans for illegal clauses, mismatched domains, and missing corporate registrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 border-t border-vd-border bg-vd-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-vd-accent font-semibold text-sm tracking-wide uppercase">Features</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mt-4 mb-6 tracking-tight">
              What we check for
            </h2>
            <p className="text-lg text-vd-secondary/70">
              A complete toolkit to verify any job offer before you commit, pay, or quit your current job.
            </p>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={containerVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
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
                variants={itemVariants}
                key={i}
                className="p-8 rounded-3xl bg-vd-surface border border-vd-border hover:bg-vd-surface/80 hover:border-vd-accent hover:-translate-y-[2px] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-vd-accent/10 text-vd-accent rounded-xl flex items-center justify-center mb-6 border border-mauve/20">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-vd-primary mb-3">{feature.title}</h3>
                <p className="text-vd-secondary/70 leading-relaxed text-sm lg:text-base">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section id="red-flags" className="relative z-10 py-24 border-t border-vd-border bg-vd-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-400 font-semibold text-sm tracking-wide uppercase">Red flags we catch</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mt-4 mb-6 tracking-tight">
              Common red flags
            </h2>
            <p className="text-lg text-vd-secondary/70">
              These are the exact patterns that have scammed thousands of Indian job seekers.
            </p>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={containerVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
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
                variants={itemVariants}
                key={i}
                className="flex gap-5 p-6 sm:p-8 rounded-3xl bg-vd-surface border border-vd-border hover:bg-vd-surface/80 hover:border-vd-accent hover:-translate-y-[2px] transition-all duration-300"
              >
                <div className="shrink-0 mt-0.5">
                  <flag.icon className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-vd-primary mb-2 leading-tight">{flag.title}</h3>
                  <p className="text-vd-secondary/70 text-sm leading-relaxed">
                    {flag.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 border-t border-vd-border bg-vd-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-vd-accent font-semibold text-sm tracking-wide uppercase">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-vd-primary mt-4 tracking-tight">
              Common questions
            </h2>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={containerVariants} 
            className="space-y-4"
          >
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
                a: "Our system is trained on thousands of verified scam patterns in the Indian job market and cross-references live data like MCA registration and domain age. It is highly accurate at catching patterns humans miss."
              }
            ].map((faq, i) => (
              <motion.div 
                variants={itemVariants}
                key={i}
                className="rounded-2xl bg-vd-surface border border-vd-border hover:border-vd-accent hover:-translate-y-[2px] transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-vd-surface/80 transition-colors"
                >
                  <span className="text-vd-primary font-medium text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-vd-secondary/70 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-vd-secondary/70 leading-relaxed border-t border-vd-border pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 bg-vd-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 lg:p-16 rounded-[2.5rem] bg-vd-surface border border-vd-border text-center">
            
            <h2 className="text-4xl lg:text-6xl font-bold font-serif text-vd-primary tracking-tight mb-6 leading-[1.1]">
              Got an offer? <span className="text-vd-accent">Verify it.</span>
            </h2>
            <p className="text-xl text-vd-secondary mb-10 max-w-2xl mx-auto">
              Takes 60 seconds. No signup. Could save you ₹5,000 — or your career.
            </p>
            <MotionLink whileHover={{ scale: 1.02 }} to="/verify" className="flex items-center justify-center mx-auto gap-2 px-8 py-5 bg-vd-accent hover:bg-vd-accent/90 text-vd-primary font-bold font-serif rounded-2xl active:scale-95 transition-all duration-300 text-lg cursor-pointer w-fit">
              <Upload className="w-6 h-6" />
              Verify my offer now
            </MotionLink>
          </div>
        </div>
      </section>
    </>
  );
}
