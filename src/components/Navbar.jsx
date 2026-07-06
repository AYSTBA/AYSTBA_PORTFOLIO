import { useEffect, useRef } from 'react';
import { Skull, Briefcase, FolderOpen, Star, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
  const navRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      var p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      var el = navRef.current;
      if (el) el.style.setProperty('--np', p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <a href="#hero" className="navbar-logo">
        <Skull size={18} /><span className="nav-label">AYSTBA</span>
      </a>
      <ul className="navbar-links">
        <li><a href="#about"><Briefcase size={16} /><span className="nav-label">{t('nav.work')}</span></a></li>
        <li><a href="#projects"><FolderOpen size={16} /><span className="nav-label">{t('nav.projects')}</span></a></li>
        <li><a href="#skills"><Star size={16} /><span className="nav-label">{t('nav.skills')}</span></a></li>
      </ul>
      <button className="btn-contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
        <MessageCircle size={16} /><span className="nav-label">{t('nav.contact')}</span>
      </button>
    </nav>
  );
}
