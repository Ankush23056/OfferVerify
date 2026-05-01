import { useState } from 'react';
import { ShieldCheck, ArrowRight, AlertTriangle, Shield, Zap, Search } from 'lucide-react';
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
                <button onClick={() => setActiveModal('how')} className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                  How it works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('features')} className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                  Features
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActiveModal('redflags')} className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                  Red flags
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('faq')} className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
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

      <InfoModal 
        isOpen={activeModal === 'redflags'} 
        onClose={closeModal} 
        title="Common Job Scam Red Flags"
      >
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong className="text-white">Equipment Payments:</strong> Any request to pay for a laptop, software, or "training" upfront is a 100% confirmed scam.</span>
          </li>
          <li className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong className="text-white">Chat-Only Interviews:</strong> Legitimate companies will rarely conduct entire hiring processes exclusively via Telegram, WhatsApp, or Signal.</span>
          </li>
          <li className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong className="text-white">Suspicious Domains:</strong> Use of public domains (@gmail.com, @outlook.com) or mis-spelled corporate domains.</span>
          </li>
          <li className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong className="text-white">High Salary, Low Requirement:</strong> Offers that seem "too good to be true" for your experience level.</span>
          </li>
        </ul>
      </InfoModal>

      <InfoModal 
        isOpen={activeModal === 'faq'} 
        onClose={closeModal} 
        title="Frequently Asked Questions"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-2">How accurate is the check?</h4>
            <p className="text-sm">Our AI model (Llama 3.3) is specifically trained on thousands of verified scam patterns. While it reaches 98%+ accuracy for known scams, we always recommend human caution.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Is my data stored?</h4>
            <p className="text-sm">No. Uploaded documents are processed in memory and immediately discarded. We only store the company name and high-level risk score to help the community track emerging scam trends.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Is this really free?</h4>
            <p className="text-sm">Yes. OfferVerify is a non-profit tool dedicated to protecting the community from financial exploitation. We will never charge job seekers for our verification services.</p>
          </div>
        </div>
      </InfoModal>
    </footer>
  );
}

