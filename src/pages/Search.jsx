import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, Building2, MessageSquare, ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function SearchPage() {
  const { companyName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (companyName) {
      fetchData();
    }
  }, [companyName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/companies/${encodeURIComponent(companyName)}`);
      if (!res.ok) throw new Error('Failed to fetch company data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Results for: <span className="text-cyan-400">"{companyName}"</span>
            </h1>
            <p className="text-slate-400">
              Community reports and verification history for this company.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center">
                <div className="text-2xl font-bold text-white">{data?.reports?.length || 0}</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Reports</div>
             </div>
             <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center">
                <div className="text-2xl font-bold text-white">{data?.verifications?.length || 0}</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Verifications</div>
             </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-slate-400">Searching global scam database...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
             <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Error searching database</h3>
             <p className="text-red-400 mb-6">{error}</p>
             <button onClick={fetchData} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">Try again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Reports List */}
            <div className="lg:col-span-2 space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-indigo-400" />
                 Community Reports
               </h3>

               {data?.reports?.length === 0 ? (
                 <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center">
                   <p className="text-slate-500 italic">No scam reports found for this company.</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {data.reports.map((report) => (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       key={report._id} 
                       className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all"
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

            {/* Verification History */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                 Verification History
               </h3>

               {data?.verifications?.length === 0 ? (
                 <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center">
                   <p className="text-slate-500 italic">No verification history.</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {data.verifications.map((v) => (
                     <div key={v._id} className="bg-black/20 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                       <div>
                         <div className={`text-lg font-bold ${v.riskScore < 40 ? 'text-red-400' : v.riskScore < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                           {v.riskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                         </div>
                         <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Risk Score</div>
                       </div>
                       <div className="text-xs text-slate-500">
                         {new Date(v.createdAt).toLocaleDateString()}
                       </div>
                     </div>
                   ))}
                 </div>
               )}

               {/* CTA Card */}
               <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-xl">
                  <h4 className="text-white font-bold mb-2">Have an offer letter?</h4>
                  <p className="text-indigo-100 text-sm mb-4">Get a detailed AI analysis and trust score in seconds.</p>
                  <Link to="/verify" className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-cyan-50 transition-colors">
                    Verify now
                  </Link>
               </div>
            </div>

          </div>
        ) }
      </div>
    </div>
  );
}
