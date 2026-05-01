import { useState, useEffect } from 'react';
import { Users, AlertCircle, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityReports({ companyName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportDetails, setReportDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!companyName || companyName === 'Unknown Company') {
      setLoading(false);
      return;
    }
    fetchData();
  }, [companyName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/companies/${encodeURIComponent(companyName)}`);
      if (!res.ok) throw new Error('Failed to fetch community data');
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

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, reportDetails }),
      });
      if (!res.ok) throw new Error('Failed to submit report');
      setReportDetails('');
      setShowReportForm(false);
      fetchData(); // Refresh data
    } catch (err) {
      alert(err.message || 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (!companyName || companyName === 'Unknown Company') {
    return null;
  }

  if (loading) {
    return <div className="mt-8 text-slate-400 text-center text-sm py-4">Loading community data...</div>;
  }

  const reports = data?.reports || [];
  const verificationsCount = data?.verifications?.length || 0;
  const avgScore = verificationsCount > 0 
    ? Math.round(data.verifications.reduce((acc, v) => acc + v.riskScore, 0) / verificationsCount)
    : null;

  return (
    <div className="mt-8 border border-white/10 bg-white/5 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white tracking-tight">
            Community Insights for {companyName}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
           {verificationsCount > 0 && (
             <span className="bg-white/10 px-3 py-1 rounded-full border border-white/5">
                {verificationsCount} Verifications
             </span>
           )}
           {avgScore !== null && (
             <span className={`px-3 py-1 rounded-full border border-white/5 ${avgScore < 40 ? 'bg-red-500/20 text-red-400' : avgScore < 70 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                Avg Score: {avgScore}
             </span>
           )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
             <h4 className="text-slate-300 font-semibold flex items-center gap-2">
                 <MessageSquare className="w-4 h-4 text-slate-400"/>
                 User Reports
             </h4>
             {!showReportForm && (
               <button 
                 onClick={() => setShowReportForm(true)}
                 className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 border border-blue-500/20"
               >
                 <Plus className="w-3 h-3" /> Add Report
               </button>
             )}
          </div>

          {showReportForm && (
             <motion.form 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="mb-6 p-4 rounded-xl bg-black/20 border border-white/5"
               onSubmit={handleSubmitReport}
             >
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 min-h-[100px] mb-3 resize-none"
                  placeholder={`Share your experience with ${companyName}... Did they ask for money? Was it a scam?`}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  required
                />
                <div className="flex justify-end gap-2">
                   <button 
                     type="button"
                     onClick={() => setShowReportForm(false)}
                     className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-white/5 transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit"
                     disabled={submitting}
                     className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50"
                   >
                     {submitting ? 'Submitting...' : 'Submit Report'}
                   </button>
                </div>
             </motion.form>
          )}

          {reports.length === 0 ? (
            <p className="text-slate-500 text-sm italic">No scam reports found for this company yet.</p>
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {reports.map((report) => (
                <div key={report._id} className="bg-black/20 p-4 rounded-xl border border-white/5">
                   <p className="text-slate-300 text-sm leading-relaxed mb-2">{report.reportDetails}</p>
                   <div className="text-xs text-slate-500 font-medium tracking-wide">
                     Reported on {new Date(report.reportedAt).toLocaleDateString()}
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
