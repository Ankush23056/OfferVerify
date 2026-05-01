import { useState } from 'react';
import { ShieldCheck, ArrowRight, AlertTriangle, Shield, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InfoModal } from './InfoModal';

export function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

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
                <button onClick={() => setActiveModal('how')} className="text-slate-400 hover:text-white text-sm transition-colors text-left cursor-pointer">
                  How it works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('features')} className="text-slate-400 hover:text-white text-sm transition-colors text-left cursor-pointer">
                  Features
                </button>
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
              <li><Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} OfferVerify. 100% Free for job seekers.</p>
        </div>
      </div>


      {/* Modals */}
      <InfoModal 
        isOpen={activeModal === 'how'} 
        onClose={closeModal} 
        title="How it Works"
      >
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">1. Domain Analysis</h4>
              <p className="text-sm">We verify the sender's email domain against official company registries to detect "look-alike" domains (e.g., @google-careers.com vs @google.com).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">2. Digital Signature Verification</h4>
              <p className="text-sm">Our AI scans for embedded metadata and digital signatures to ensure the document hasn't been modified or generated from a known scam template.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">3. Cross-Referencing</h4>
              <p className="text-sm">We validate the CIN (Corporate Identity Number) and company registration details against national business databases.</p>
            </div>
          </div>
        </div>
      </InfoModal>

      <InfoModal 
        isOpen={activeModal === 'features'} 
        onClose={closeModal} 
        title="Our Security Scanners"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-medium mb-2">Offer Letter Scanner</h4>
            <p className="text-sm text-slate-400">Deep OCR analysis to find hidden clauses, suspicious payment requests, and non-standard employment terms.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-medium mb-2">Company Legitimacy Check</h4>
            <p className="text-sm text-slate-400">Real-time lookup of company ratings, registered office addresses, and official contact information.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-medium mb-2">Email Header Analysis</h4>
            <p className="text-sm text-slate-400">Validation of SPF, DKIM, and DMARC records to ensure the communication originated from the real company server.</p>
          </div>
        </div>
      </InfoModal>

    </footer>
  );
}


