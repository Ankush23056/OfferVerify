import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MessageSquare, ShieldAlert, CheckCircle2, 
  AlertTriangle, Loader2, Globe, Calendar, MapPin, ExternalLink,
  Sparkles, ShieldCheck, Brain, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import API_BASE_URL from '../config/api';

const TrustBadge = ({ score }) => {
  if (score == null) return null;
  const isHigh  = score >= 75;
  const isMid   = score >= 45;
  const color   = isHigh ? 'emerald' : isMid ? 'amber' : 'red';
  const label   = isHigh ? 'Trusted' : isMid ? 'Caution' : 'High Risk';

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-${color}-500/10 border border-${color}-500/30`}>
      <div className={`text-5xl font-black tracking-tighter text-${color}-400 mb-1`}>{score}</div>
      <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">/ 100</div>
      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
        {label}
      </div>
    </div>
  );
};

export function SearchPage() {
  const { companyName } = useParams();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [ragPhase, setRagPhase] = useState(null); // null | 'searching' | 'analyzing'

  useEffect(() => {
    if (companyName) fetchData();
  }, [companyName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setRagPhase('searching');

      // After 2.5s with no response, show "Analyzing with AI" phase
      const phaseTimer = setTimeout(() => setRagPhase('analyzing'), 2500);

      const res = await fetch(`${API_BASE_URL}/api/companies/${encodeURIComponent(companyName)}`);
      clearTimeout(phaseTimer);

      if (!res.ok) throw new Error('Failed to fetch company data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
      setRagPhase(null);
    }
  };

  const profile = data?.companyProfile;
  const isEmpty = !loading && !error && !profile && !data?.reports?.length && !data?.verifications?.length;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Results for: <span className="text-cyan-400">"{companyName}"</span>
            </h1>
            <p className="text-slate-400">
              {data?.freshlyVerified
                ? 'Freshly researched via AI web search — saved for future visitors.'
                : 'Community reports and verification history for this company.'}
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">{data?.reports?.length ?? 0}</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Reports</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">{data?.verifications?.length ?? 0}</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Verifications</div>
            </div>
          </div>
        </div>

        {/* Loading — with smart phase messages */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-28"
            >
              {ragPhase === 'analyzing' ? (
                <>
                  <div className="relative mb-6">
                    <Brain className="w-14 h-14 text-indigo-400 animate-pulse" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Analyzing with Groq AI…</p>
                  <p className="text-slate-500 text-sm">Extracting company data from web sources</p>
                </>
              ) : (
                <>
                  <div className="relative mb-6">
                    <Globe className="w-14 h-14 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Searching the web…</p>
                  <p className="text-slate-500 text-sm">Checking global databases and news sources</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Error searching database</h3>
            <p className="text-red-400 mb-6">{error}</p>
            <button onClick={fetchData} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
              Try again
            </button>
          </div>
        )}

        {/* Truly empty — no data anywhere */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center"
          >
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Data Found</h3>
            <p className="text-slate-500 mb-6">
              We couldn't find any information on "{companyName}". Try verifying an offer letter directly for an AI-powered analysis.
            </p>
            <Link to="/verify" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
              Verify an offer letter instead
            </Link>
          </motion.div>
        )}

        {/* Results grid */}
        {!loading && !error && (profile || data?.reports?.length > 0 || data?.verifications?.length > 0) && (
          <div className="space-y-8">

            {/* Company Profile Card — from cache or freshly built by Exa RAG */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left: identity */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <h2 className="text-2xl font-bold text-white">{profile.companyName}</h2>
                      {data.freshlyVerified && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                          <Sparkles className="w-3 h-3" />
                          Freshly Verified by AI
                        </span>
                      )}
                      {profile.source === 'seed' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Company
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {profile.officialWebsite && (
                        <a
                          href={profile.officialWebsite.startsWith('http') ? profile.officialWebsite : `https://${profile.officialWebsite}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="text-slate-300 text-sm truncate group-hover:text-white transition-colors">{profile.officialWebsite}</span>
                          <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 shrink-0" />
                        </a>
                      )}
                      {profile.yearEstablished && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                          <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span className="text-slate-300 text-sm">Est. {profile.yearEstablished}</span>
                        </div>
                      )}
                      {profile.headquarters && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-slate-300 text-sm">{profile.headquarters}</span>
                        </div>
                      )}
                    </div>

                    {profile.redFlagSummary && (
                      <div className="flex gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-sm leading-relaxed">{profile.redFlagSummary}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Trust Score */}
                  <div className="shrink-0">
                    <TrustBadge score={profile.trustScore} />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Community Reports */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Community Reports
                </h3>
                {data?.reports?.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <p className="text-slate-400">No scam reports found for this company.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.reports.map((report) => (
                      <motion.div
                        key={report._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl hover:bg-red-500/10 transition-all"
                      >
                        <p className="text-slate-200 mb-4 leading-relaxed">{report.reportDetails}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span>Reported by {report.userId}</span>
                          <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verification History + CTA */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Verification History
                </h3>
                {data?.verifications?.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                    <p className="text-slate-500 italic text-sm">No verification history.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.verifications.map((v) => (
                      <div key={v._id} className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <div className={`text-lg font-bold ${v.riskScore < 40 ? 'text-red-400' : v.riskScore < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {v.riskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Risk Score</div>
                        </div>
                        <div className="text-xs text-slate-500">{new Date(v.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-xl">
                  <h4 className="text-white font-bold mb-2">Have an offer letter?</h4>
                  <p className="text-indigo-100 text-sm mb-4">Get a detailed AI analysis and trust score in under 60 seconds.</p>
                  <Link to="/verify" className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-cyan-50 transition-colors">
                    Verify now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
