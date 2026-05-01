import { ShieldCheck, ArrowRight, AlertTriangle, Shield, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 backdrop-blur-md bg-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">OfferVerify</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Protecting job seekers from employment scams.<br />
              Don't pay to get paid.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#how-it-works" className="text-slate-400 hover:text-white text-sm transition-colors text-left block">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-slate-400 hover:text-white text-sm transition-colors text-left block">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#red-flags" className="text-slate-400 hover:text-white text-sm transition-colors text-left block">
                  Red flags
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-slate-400 hover:text-white text-sm transition-colors text-left block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} OfferVerify. 100% Free for job seekers.</p>
        </div>
      </div>

    </footer>
  );
}
