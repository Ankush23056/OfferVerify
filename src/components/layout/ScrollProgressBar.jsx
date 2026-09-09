import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

/**
 * ScrollProgressBar
 * A 3px fixed bar at the very top of the viewport that tracks
 * how far the user has scrolled the page.
 */
export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const scaleX = useSpring(scrollProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(scrollTop / docHeight);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left pointer-events-none"
      style={{
        scaleX,
        height: '3px',
        background: 'linear-gradient(90deg, #935073 0%, #F6DBC0 100%)',
        boxShadow: '0 0 8px 1px rgba(147, 80, 115, 0.55)',
      }}
    />
  );
}
