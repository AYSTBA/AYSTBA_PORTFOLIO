import { useEffect, useRef, useState } from 'react';
import NavWrapper from './components/NavWrapper';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Grainient from './components/Grainient';
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
        <div className="grainient-bg-wrapper">
          <Grainient
            className="grainient-bg"
            color1="#78cb6e"
            color2="#000000"
            color3="#664b7e"
            timeSpeed={0.15}
            warpStrength={1.2}
            warpFrequency={3.0}
            warpSpeed={1.5}
            warpAmplitude={40.0}
            rotationAmount={300.0}
            noiseScale={1.5}
            grainAmount={0.08}
            contrast={1.3}
            saturation={0.9}
            zoom={1.0}
          />
        </div>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}