import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, GitBranch, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);
  const linksRef = useRef([]);
  const footerRef = useRef(null);

  const links = [
    { label: 'Bilibili', href: 'https://space.bilibili.com/3546948852255258', icon: <Monitor size={18} /> },
    { label: 'GitHub', href: 'https://github.com/AYSTBA', icon: <GitBranch size={18} /> },
    { label: 'Outlook', href: 'mailto:AYSTBA_aystba@outlook.com', icon: <Mail size={18} /> },
    { label: 'QQ', href: 'https://qm.qq.com/q/WiCGnZNoQs', icon: <MessageCircle size={18} /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.9,
        skewY: -5
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        x: -30
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(linksRef.current, {
        opacity: 0,
        x: -40,
        scaleX: 0.8
      });

      gsap.set(footerRef.current, {
        opacity: 0
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        skewY: 0,
        duration: 1.3,
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

      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(linksRef.current, {
        opacity: 1,
        x: 0,
        scaleX: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(footerRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-bg" />
      <div className="container contact-inner">
        <p className="section-label" ref={labelRef}>{t('contact.label')}</p>
        <h2 className="contact-title" ref={titleRef}>Let's build<br />something together.</h2>
        <p className="contact-subtitle" ref={subtitleRef}>
          {t('contact.desc').split('\n').map((line, i) => (
            <span key={i}>{line}{i < t('contact.desc').split('\n').length - 1 && <br />}</span>
          ))}
        </p>
        <div className="contact-links">
          {links.map((l, i) => (
            <a 
              key={i} 
              href={l.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link"
              ref={(el) => linksRef.current[i] = el}
            >
              {l.icon} {l.label} <ArrowUpRight size={14} style={{ opacity: 0.3 }} />
            </a>
          ))}
        </div>
        <p className="contact-footer" ref={footerRef}>&copy; 2025 AYSTBA &middot; UPCHIS Studio</p>
      </div>
    </section>
  );
}