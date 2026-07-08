import { useEffect, useRef, useState } from 'react';
import NavWrapper from './components/NavWrapper';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [openingComplete, setOpeningComplete] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    gsap.set('body', { overflow: '' });
    ScrollTrigger.defaults({
      scroller: window,
      markers: false,
      toggleActions: 'play none none reverse'
    });
    return () => {
      gsap.set('body', { overflow: '' });
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={appRef}>
      <NavWrapper />
      <main>
        <Hero openingComplete={openingComplete} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}