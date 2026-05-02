import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, ShieldAlert, CheckCircle2, 
  AlertTriangle, Loader2, Globe, Calendar, MapPin, ExternalLink,
  Sparkles, ShieldCheck, Brain, AlertCircle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import API_BASE_URL from '../config/api';

/* ─── Trust Score Ring ─────────────────────────────────────────────────── */
function TrustScoreRing({ score }) {
  if (score == null) return null;

  const isHigh = score >= 75;
  const isMid  = score >= 45;

  const ringColor  = isHigh ? '#10b981' : isMid ? '#f59e0b' : '#ef4444';
  const textColor  = isHigh ? 'text-emerald-400' : isMid ? 'text-amber-400' : 'text-red-400';
  const bgColor    = isHigh ? 'bg-emerald-500/10 border-emerald-500/30' : isMid ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30';
  const badgeColor = isHigh ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : isMid ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30';
  const label      = isHigh ? 'Trusted' : isMid ? 'Caution' : 'High Risk';

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${bgColor} min-w-[160px]`}>
      <div className="relative w-32 h-32 flex items-center justify-center mb-3">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={ringColor} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="text-center z-10">
          <div className={`text-4xl font-black tracking-tighter ${textColor}`}>{score}</div>
          <div className="text-slate-500 text-xs font-bold">/ 100</div>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>{label}</div>
    </div>
  );
}

/* ─── Risk Score Pill (for Verification history) ────────────────────────── */
function RiskPill({ riskScore }) {
  // riskScore: 0 = safest, 100 = most dangerous
  const trustEquiv = 100 - riskScore;
  const isGood = trustEquiv >= 75;
  const isMid  = trustEquiv >= 45;

  const cls = isGood
    ? 'text-emerald-400'
    : isMid
    ? 'text-amber-400'
    : 'text-red-400';

  return (
    <div>
      <div className={`text-lg font-bold ${cls}`}>
        {riskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Risk Score</div>
    </div>
  );
}

/* ─── Meta Info Chip ─────────────────────────────────────────────────────── */
function MetaChip({ icon: Icon, label, href }) {
  const cls = "flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 transition-colors";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className={`${cls} hover:bg-white/10 hover:text-white group`}>
        <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="truncate max-w-[200px]">{label}</span>
        <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 shrink-0 ml-auto" />
      </a>
    );
  }

  return (
    <div className={cls}>
      <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
      <span>{label}</span>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export function SearchPage() {
  const { companyName } = useParams();
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [ragPhase, setRagPhase] = useState('searching');

  useEffect(() => {
    if (companyName) fetchData();
  }, [companyName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setRagPhase('searching');
      setError(null);

      const phaseTimer = setTimeout(() => setRagPhase('analyzing'), 2800);
      const res = await fetch(`${API_BASE_URL}/api/companies/${encodeURIComponent(companyName)}`);
      clearTimeout(phaseTimer);

      if (!res.ok) throw new Error('Failed to fetch company data');
      const json = await res.json();

      // Debug: log the full API response shape so we can verify the data
      console.log('[Search] API response:', JSON.stringify(json, null, 2));

      setData(json);
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
      setRagPhase(null);
    }
  };

  // Safely destructure — the API returns { companyProfile, reports, verifications, freshlyVerified }
  const profile  = data?.companyProfile ?? null;
  const reports  = Array.isArray(data?.reports)        ? data.reports        : [];
  const verifs   = Array.isArray(data?.verifications)  ? data.verifications  : [];

  // isEmpty = truly nothing to show: no profile, no reports, no verifications
  const hasContent = !!profile || reports.length > 0 || verifs.length > 0;
  const isEmpty    = !loading && !error && !hasContent;

  const websiteHref = profile?.officialWebsite
    ? (profile.officialWebsite.startsWith('http')
        ? profile.officialWebsite
        : `https://${profile.officialWebsite}`)
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── Back link ── */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Results for: <span className="text-cyan-400">"{companyName}"</span>
            </h1>
            <p className="text-slate-400 text-sm">
              {data?.freshlyVerified
                ? '✦ Freshly researched via Exa AI web search — cached for future visitors.'
                : 'Community reports and AI verification data for this company.'}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">{reports.length}</div>
              <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Reports</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">{verifs.length}</div>
              <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Verifications</div>
            </div>
          </div>
        </div>

        {/* ── Loading ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-28"
            >
              {ragPhase === 'analyzing' ? (
                <>
                  <Brain className="w-14 h-14 text-indigo-400 animate-pulse mb-5" />
                  <p className="text-white font-semibold text-lg mb-1">Analyzing with Groq AI…</p>
                  <p className="text-slate-500 text-sm">Extracting company profile from web sources</p>
                </>
              ) : (
                <>
                  <Globe className="w-14 h-14 text-cyan-400 mb-5" style={{ animation: 'spin 3s linear infinite' }} />
                  <p className="text-white font-semibold text-lg mb-1">Searching the web…</p>
                  <p className="text-slate-500 text-sm">Checking databases, Reddit & news sources</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Error ── */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Search failed</h3>
            <p className="text-red-400 mb-6">{error}</p>
            <button onClick={fetchData} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
              Try again
            </button>
          </div>
        )}

        {/* ── Truly empty ── */}
        {isEmpty && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-14 rounded-3xl text-center"
          >
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Data Found</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              We couldn't find any information on "{companyName}".
              Try verifying an offer letter directly for an AI-powered analysis.
            </p>
            <Link to="/verify"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
              Verify an offer letter instead
            </Link>
          </motion.div>
        )}

        {/* ── Results ── */}
        {!loading && !error && hasContent && (
          <div className="space-y-8">

            {/* ════════ COMPANY PROFILE CARD ════════ */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm"
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* ─ Left: Company identity ─ */}
                  <div className="flex-1 space-y-5">
                    
                    {/* Name + badges */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-white">{profile.companyName}</h2>
                        {data.freshlyVerified && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                            <Sparkles className="w-3 h-3" /> Freshly Verified by AI
                          </span>
                        )}
                        {profile.source === 'seed' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                            <ShieldCheck className="w-3 h-3" /> Verified Company
                          </span>
                        )}
                      </div>

                      {/* Meta chips row */}
                      <div className="flex flex-wrap gap-3">
                        {websiteHref && (
                          <MetaChip icon={Globe} label={profile.officialWebsite} href={websiteHref} />
                        )}
                        {profile.yearEstablished && (
                          <MetaChip icon={Calendar} label={`Est. ${profile.yearEstablished}`} />
                        )}
                        {profile.headquarters && (
                          <MetaChip icon={MapPin} label={profile.headquarters} />
                        )}
                      </div>
                    </div>

                    {/* ─ Trust Summary ─ */}
                    {profile.redFlagSummary ? (
                      <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-red-300 text-xs font-bold uppercase tracking-wider">AI Trust Summary</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{profile.redFlagSummary}</p>
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">AI Trust Summary</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          No significant red flags detected. This company appears to be a legitimate organisation based on available web data.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ─ Right: Trust Score Ring ─ */}
                  <div className="shrink-0 flex justify-center md:justify-end">
                    <TrustScoreRing score={profile.trustScore} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════ COMMUNITY + HISTORY GRID ════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ─ Community Reports ─ */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Community Reports
                </h3>

                {reports.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">No scam reports found for this company.</p>
                  </div>
                ) : (
                  reports.map((report) => (
                    <motion.div
                      key={report._id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl hover:bg-red-500/10 transition-all"
                    >
                      <p className="text-slate-200 mb-4 leading-relaxed">{report.reportDetails}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>Reported by {report.userId}</span>
                        <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* ─ Verification History + CTA ─ */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Verification History
                </h3>

                {verifs.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center">
                    <p className="text-slate-500 italic text-sm">No verification history yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {verifs.map((v) => (
                      <div key={v._id}
                        className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                        <RiskPill riskScore={v.riskScore} />
                        <div className="text-xs text-slate-500">
                          {new Date(v.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info note about risk score */}
                <div className="flex gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Risk Score: 0 = safest, 100 = most dangerous. This is derived from each individual offer letter scan.
                  </p>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-xl">
                  <h4 className="text-white font-bold mb-2">Have an offer letter?</h4>
                  <p className="text-indigo-100 text-sm mb-4">
                    Get a detailed AI analysis and trust score in under 60 seconds.
                  </p>
                  <Link to="/verify"
                    className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-cyan-50 transition-colors">
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
