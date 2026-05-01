import { AlertTriangle, CheckCircle2, ShieldAlert, RefreshCw } from 'lucide-react';
import { useVerificationStore } from '../../store/useVerificationStore';
import { motion } from 'motion/react';

export function ResultsDashboard() {
  const result = useVerificationStore((state) => state.result);
  const reset = useVerificationStore((state) => state.reset);

  if (!result) return null;

  const { riskScore } = result;
  const isHighRisk = riskScore < 40;
  const isMediumRisk = riskScore >= 40 && riskScore < 80;
  const isLowRisk = riskScore >= 80;

  const recommendation = isHighRisk 
    ? "Critical Risk! Likely a scam." 
    : isMediumRisk 
      ? "Exercise Caution. Review anomalies." 
      : "Looks Legitimate and Safe.";

  const scoreColor = isHighRisk 
    ? 'text-red-500' 
    : isMediumRisk 
      ? 'text-amber-500' 
      : 'text-emerald-500';

  const scoreBgColor = isHighRisk 
    ? 'bg-red-500' 
    : isMediumRisk 
      ? 'bg-amber-500' 
      : 'bg-emerald-500';
      
  const HeaderIcon = isHighRisk 
    ? ShieldAlert 
    : isMediumRisk 
      ? AlertTriangle 
      : CheckCircle2;

  const headerColor = isHighRisk
    ? 'text-red-500'
    : isMediumRisk
      ? 'text-amber-500'
      : 'text-emerald-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 w-full max-w-4xl mx-auto flex flex-col p-6 sm:p-10"
    >
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <HeaderIcon className={`w-8 h-8 ${headerColor}`} />
          <h2 className="text-2xl font-bold text-white tracking-tight">Verification Complete</h2>
        </div>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl font-medium text-slate-300 tracking-wide text-sm flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Start Over
        </button>
      </div>

      {/* Recommendation Banner */}
      <div className={`mb-8 p-4 sm:p-5 rounded-2xl border ${isHighRisk ? 'bg-red-500/10 border-red-500/30' : isMediumRisk ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'} flex items-start sm:items-center gap-4 shadow-lg`}>
         <div className="flex-1">
           <p className="text-white font-bold text-lg sm:text-xl tracking-tight">
             {recommendation}
           </p>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Score Card */}
        <div className="md:col-span-1 border border-white/10 bg-white/5 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden backdrop-blur-xl">
          <div className={`absolute top-0 w-full h-1 ${scoreBgColor}`} />
          <h3 className="text-slate-400 font-semibold mb-4 uppercase tracking-widest text-xs">Trust Score</h3>
          <div className={`text-7xl font-black ${scoreColor} tracking-tighter mb-2`}>{result.riskScore}</div>
          <div className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-6">out of 100</div>
          
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.riskScore}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className={`h-full ${scoreBgColor}`} 
              />
          </div>
          <p className="text-slate-400 text-xs mt-4 font-medium uppercase tracking-widest">
            {isHighRisk ? 'Critical Danger' : isMediumRisk ? 'Exercise Caution' : 'Looks Safe'}
          </p>
        </div>
        
        {/* Detailed Analysis Breakdown */}
        <div className="md:col-span-2 space-y-6">

          {/* CRITICAL RED FLAGS */}
          {result.redFlags.length > 0 && (
            <div className="border border-red-500/20 bg-red-500/5 rounded-3xl p-6 shadow-lg">
              <h3 className="text-red-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Critical Red Flags
              </h3>
              <div className="space-y-3">
                {result.redFlags.map((flag, idx) => (
                  <div key={idx} className="flex gap-3 text-slate-300 text-sm bg-black/20 p-3 rounded-xl border border-red-500/10">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WARNINGS */}
          {result.warnings.length > 0 && (
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-3xl p-6 shadow-lg">
              <h3 className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Warnings & Anomalies
              </h3>
              <div className="space-y-3">
                {result.warnings.map((warning, idx) => (
                  <div key={idx} className="flex gap-3 text-slate-300 text-sm bg-black/20 p-3 rounded-xl border border-amber-500/10">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POSITIVE SIGNS */}
          {result.positives.length > 0 && (
             <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-3xl p-6 shadow-lg">
             <h3 className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4" /> Positive Signs
             </h3>
             <div className="space-y-3">
               {result.positives.map((positive, idx) => (
                 <div key={idx} className="flex gap-3 text-slate-300 text-sm bg-black/20 p-3 rounded-xl border border-emerald-500/10">
                   <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                   <span className="leading-relaxed">{positive}</span>
                 </div>
               ))}
             </div>
           </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
