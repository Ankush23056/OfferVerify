import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Features', href: '/#features' },
    { name: 'Red flags', href: '/#red-flags', className: 'text-red-400 hover:text-red-300' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">OfferVerify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${link.className || 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/verify" className="px-5 py-2.5 bg-white text-slate-950 text-sm font-semibold rounded-full hover:bg-cyan-50 transition-colors shadow-lg shadow-white/10 cursor-pointer text-center block">
              Verify offer
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 pt-2 pb-6 space-y-4 fixed w-full shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-base font-medium transition-colors block px-2 py-1 ${link.className || 'text-slate-300 hover:text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 flex flex-col space-y-3">
              <Link to="/verify" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:brightness-110 text-center px-4 py-3 rounded-xl text-base font-medium transition-all w-full shadow-lg block">
                Verify offer
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
