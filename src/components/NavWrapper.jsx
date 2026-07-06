import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LanguageToggle from './LanguageToggle';

export default function NavWrapper() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      var p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      setScrollProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  const justifyContent = scrollProgress > 0.5 ? 'center' : 'space-between';

  return (
    <div 
      className="nav-wrapper" 
      style={{ 
        '--np': scrollProgress,
        justifyContent: justifyContent
      }}
    >
      <Navbar />
      <LanguageToggle scrollProgress={scrollProgress} />
    </div>
  );
}
