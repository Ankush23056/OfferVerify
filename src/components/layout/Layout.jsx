import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressBar } from './ScrollProgressBar';

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-vd-secondary bg-vd-bg selection:bg-vd-accent/30 selection:text-white relative overflow-x-hidden no-scrollbar">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1 pt-20 relative z-10 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
