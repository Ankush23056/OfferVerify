import { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, History, ArrowRight, Building2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function GlobalScamSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative z-10 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">
              Is this company legitimate? <span className="text-cyan-400">Search our database.</span>
            </h3>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter company name (e.g. Google, Tata, or suspicious startups)"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-32 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-6 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                Search
              </button>
            </form>
            
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-400" />
                 <span>1,200+ Verified companies</span>
               </div>
               <div className="flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-red-400" />
                 <span>450+ Scam reports</span>
               </div>
               <div className="flex items-center gap-2">
                 <History className="w-4 h-4 text-indigo-400" />
                 <span>Real-time updates</span>
               </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        </div>
      </div>
    </section>
  );
}
