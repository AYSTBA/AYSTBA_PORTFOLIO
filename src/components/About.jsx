import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import BorderGlow from './BorderGlow';
import Grainient from './Grainient';

gsap.registerPlugin(ScrollTrigger);

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState('0');
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const num = parseFloat(target);
          const suffix = target.replace(num.toString(), '');
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(num * eased);
            setValue(current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [value, ref];
}

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const avatarCardRef = useRef(null);
  const contentRef = useRef(null);
  const infoItemsRef = useRef([]);
  const statItemsRef = useRef([]);
  const tagItemsRef = useRef([]);
  const careerItemsRef = useRef([]);

  const [stat1Val, stat1Ref] = useCountUp('8+');
  const [stat2Val, stat2Ref] = useCountUp('30+');
  const [stat3Val, stat3Ref] = useCountUp('500+');

  const stats = [
    { num: stat1Val, label: t('about.stats.experience'), ref: stat1Ref },
    { num: stat2Val, label: t('about.stats.projects'), ref: stat2Ref },
    { num: stat3Val, label: t('about.stats.deliverables'), ref: stat3Ref },
  ];

  const info = [
    { label: t('about.identityLabel'), value: t('about.identity') },
    { label: t('about.servicesLabel'), value: t('about.services') },
    { label: t('about.phoneLabel'), value: '176****0062' },
    { label: t('about.emailLabel'), value: 'AYSTBA_aystba@outlook.com' },
  ];

  const tags = [t('about.tag1'), t('about.tag2'), t('about.tag3'), t('about.tag4')];

  const career = [
    {
      date: t('about.career.past2.date'),
      company: t('about.career.past2.company'),
      role: t('about.career.past2.role'),
      desc: t('about.career.past2.desc'),
    },
    {
      date: t('about.career.past1.date'),
      company: t('about.career.past1.company'),
      role: t('about.career.past1.role'),
      desc: t('about.career.past1.desc'),
    },
    {
      date: t('about.career.now.date'),
      company: t('about.career.now.company'),
      role: t('about.career.now.role'),
      desc: t('about.career.now.desc'),
    },
  ];

  const cardProps = {
    backgroundColor: '#121212',
    glowColor: '50 80 80',
    colors: ['#ffd85f', '#c8ff00', '#ff8c00'],
    borderRadius: 24,
  };

  const bioParts = t('about.bio').split('\n\n').filter(p => p.trim());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: -150,
        scaleX: 0.6,
        skewX: -15
      });

      gsap.set(avatarCardRef.current, {
        opacity: 0,
        y: 80,
        rotateX: -15
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 60
      });

      gsap.set(infoItemsRef.current, { opacity: 0, x: -30 });
      gsap.set(statItemsRef.current, { opacity: 0, y: 40 });
      gsap.set(tagItemsRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(careerItemsRef.current, { opacity: 0, x: -50 });

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
          scrub: false
        }
      });

      sectionTl.to(titleRef.current, {
        opacity: 1,
        x: 0,
        scaleX: 1,
        skewX: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      .to(avatarCardRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out'
      }, 0.3)
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
      }, 0.5);

      gsap.to(infoItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(statItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(tagItemsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(careerItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.career-path',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about about-resume" ref={sectionRef}>
      <div className="about-resume-bg">
        <Grainient
          color1="#1a3a1a"
          color2="#0a0a0a"
          color3="#2a1a3a"
          timeSpeed={0.3}
          colorBalance={0.31}
          warpStrength={0.75}
          warpFrequency={5.7}
          warpSpeed={2.8}
          warpAmplitude={50.0}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.08}
          grainScale={2.0}
          contrast={1.3}
          saturation={0.7}
          zoom={0.9}
        />
        <div className="about-resume-bg-frost" />
      </div>

      <div className="container">
        <h2 className="about-resume-section-title" ref={titleRef}>
          {t('about.resumeTitle')}
        </h2>

        <div className="about-resume-grid">
          <BorderGlow {...cardProps} className="about-resume-avatar-card" ref={avatarCardRef}>
            <div className="about-resume-avatar-wrap">
              <div className="about-resume-avatar-rings">
                <div className="avatar-ring ring-outer" />
                <div className="avatar-ring ring-mid" />
                <div className="avatar-ring ring-inner" />
              </div>
              <img
                src="https://avatars.githubusercontent.com/u/194509089?v=4"
                alt="AYSTBA"
                className="about-resume-avatar"
              />
              <div className="about-resume-avatar-badge">
                <span className="badge-name">AYSTBA</span>
                <span className="badge-role">Dev & Design</span>
              </div>
            </div>
          </BorderGlow>

          <div className="about-resume-content" ref={contentRef}>
            <p className="section-label">{t('about.label')}</p>
            <h2 className="about-resume-greeting">{t('about.greeting')}</h2>
            <div className="about-resume-bio">
              {bioParts.map((part, i) => (
                <p key={i}>{part}</p>
              ))}
            </div>

            <div className="about-resume-info">
              {info.map((item, i) => (
                <div key={i} className="about-resume-info-item" ref={(el) => infoItemsRef.current[i] = el}>
                  <span className="about-resume-info-label">{item.label}</span>
                  <span className="about-resume-info-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="about-resume-stats">
              {stats.map((stat, i) => (
                <div key={i} className="about-resume-stat" ref={(el) => statItemsRef.current[i] = el}>
                  <span className="about-resume-stat-num" ref={stat.ref}>{stat.num}</span>
                  <div className="about-resume-stat-bar" />
                  <span className="about-resume-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-resume-building">
              <span className="about-resume-building-label">{t('about.howBuilding')}</span>
              <div className="about-resume-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="about-resume-tag" ref={(el) => tagItemsRef.current[i] = el}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="career-path">
          <div className="career-path-header">
            <span className="career-path-label">{t('about.careerLabel')}</span>
            <span className="career-path-title">{t('nav.work')}</span>
          </div>
          <div className="career-timeline">
            <div className="career-timeline-line" />
            <div className="career-timeline-items">
              {career.map((job, i) => (
                <div key={i} className="career-item" ref={(el) => careerItemsRef.current[i] = el}>
                  <div className="career-marker">
                    {i === 0 ? <span className="career-origin" /> : <span className="career-star">✦</span>}
                  </div>
                  <div className="career-content">
                    <span className="career-date">{job.date}</span>
                    <h4 className="career-company">{job.company}</h4>
                    <span className="career-role">{job.role}</span>
                    <p className="career-desc">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
