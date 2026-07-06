import { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <a href="#hero" className="navbar-logo">
        <Skull size={18} /> AYSTBA
      </a>
      <ul className="navbar-links">
        <li><a href="#about">工作经历</a></li>
        <li><a href="#projects">精选作品</a></li>
        <li><a href="#skills">个人优势</a></li>
      </ul>
      <button className="btn-contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
        联系我
      </button>
    </nav>
  );
}