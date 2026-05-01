import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-100 bg-slate-950 selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* Mesh Gradient Background Elements */}
      <div className="fixed top-[-100px] left-[-100px] w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-30 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-50px] right-[-50px] w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-10 pointer-events-none z-0"></div>

      <Navbar />
      <main className="flex-1 pt-20 relative z-10 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
