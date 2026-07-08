import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Cpu, Boxes, Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const skillKeys = [
  { icon: <Boxes size={18} />, titleKey: 'skills.frontend.title', descKey: 'skills.frontend.desc' },
  { icon: <Cpu size={18} />, titleKey: 'skills.backend.title', descKey: 'skills.backend.desc' },
  { icon: <Palette size={18} />, titleKey: 'skills.design.title', descKey: 'skills.design.desc' },
  { icon: <Sparkles size={18} />, titleKey: 'skills.creative.title', descKey: 'skills.creative.desc' },
];

export default function Skills() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const cardsRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: 150,
        scaleX: 0.5,
        skewX: 15
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        x: 50
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 80,
        rotationY: -20
      });

      gsap.set(iconsRef.current, {
        scale: 0,
        rotation: -45
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        x: 0,
        scaleX: 1,
        skewX: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(labelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      cardsRef.current.forEach((card, i) => {
        const icon = iconsRef.current[i];
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container">
        <div className="skills-header">
          <p className="section-label" ref={labelRef}>{t('skills.label')}</p>
          <h2 className="skills-title" ref={titleRef}>CAPABILITIES</h2>
        </div>
        <div className="skills-grid">
          {skillKeys.map((s, i) => (
            <div key={i} className="skill-card" ref={(el) => cardsRef.current[i] = el}>
              <div className="skill-card-icon" ref={(el) => iconsRef.current[i] = el}>
                {s.icon}
              </div>
              <h4>{t(s.titleKey)}</h4>
              <p>{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}