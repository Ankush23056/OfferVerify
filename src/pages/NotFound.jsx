import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: 'easeOut' },
});

export function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#1B1222' }}
    >
      {/* ── Minimal branding header ───────────────────────────────────────── */}
      <header className="px-6 py-5 flex items-center relative z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ backgroundColor: '#935073' }}>
            <ShieldCheck className="w-5 h-5" style={{ color: '#F8F4E9' }} />
          </div>
          <span className="text-lg font-bold tracking-tight"
                style={{ color: '#F8F4E9' }}>
            OfferVerify
          </span>
        </Link>
      </header>

      {/* ── Main centred content ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative z-10">

        {/* Status badge */}
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase mb-8 border"
            style={{
              borderColor: '#502D55',
              color: '#F6DBC0',
              backgroundColor: 'rgba(80, 45, 85, 0.25)',
              letterSpacing: '0.18em',
            }}
          >
            404 : ROUTE_UNVERIFIED
          </span>
        </motion.div>

        {/* Big 404 display number */}
        <motion.div {...fadeUp(0.07)}>
          <p
            className="font-serif font-bold leading-none mb-6 select-none"
            style={{
              fontSize: 'clamp(7rem, 22vw, 14rem)',
              color: '#F8F4E9',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            404
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.14)}
          className="font-serif font-bold mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#F8F4E9',
            lineHeight: 1.2,
          }}
        >
          This page failed verification.
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          {...fadeUp(0.21)}
          className="max-w-md mx-auto mb-10"
          style={{
            color: '#F6DBC0',
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          The link you followed does not exist, has been revoked, or moved to
          another domain. Check the URL or head back to the scanner.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.28)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary — Back to Home */}
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-lg"
            style={{
              backgroundColor: '#935073',
              color: '#F8F4E9',
              boxShadow: '0 8px 24px rgba(147, 80, 115, 0.35)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A25B81')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#935073')}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Secondary — Verify an Offer */}
          <Link
            to="/verify"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: '#F6DBC0' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F4E9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F6DBC0')}
          >
            Verify an Offer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>

      {/* ── Subtle radial glow decoration ────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
          style={{
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, #935073 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
