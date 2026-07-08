import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import BorderGlow from './BorderGlow';
import Grainient from './Grainient';

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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function About() {
  const { t } = useLang();

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

  return (
    <section id="about" className="section about about-resume">
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
        <motion.h2
          className="about-resume-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {t('about.resumeTitle')}
        </motion.h2>

        <div className="about-resume-grid">
          <BorderGlow {...cardProps} className="about-resume-avatar-card">
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

          <div className="about-resume-content">
            <motion.p className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t('about.label')}</motion.p>
            <motion.h2 className="about-resume-greeting" variants={fadeUpSlow} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t('about.greeting')}</motion.h2>
            <motion.div className="about-resume-bio" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {bioParts.map((part, i) => (
                <p key={i}>{part}</p>
              ))}
            </motion.div>

            <motion.div className="about-resume-info" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              {info.map((item, i) => (
                <motion.div key={i} className="about-resume-info-item" variants={fadeUp}>
                  <span className="about-resume-info-label">{item.label}</span>
                  <span className="about-resume-info-value">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="about-resume-stats" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              {stats.map((stat, i) => (
                <motion.div key={i} className="about-resume-stat" variants={fadeUp}>
                  <span className="about-resume-stat-num" ref={stat.ref}>{stat.num}</span>
                  <div className="about-resume-stat-bar" />
                  <span className="about-resume-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="about-resume-building" variants={fadeUpSlow} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="about-resume-building-label">{t('about.howBuilding')}</span>
              <motion.div className="about-resume-tags" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {tags.map((tag, i) => (
                  <motion.span key={i} className="about-resume-tag" variants={fadeUp}>{tag}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="career-path">
          <div className="career-path-header">
            <span className="career-path-label">{t('about.careerLabel')}</span>
            <span className="career-path-title">{t('nav.work')}</span>
          </div>
          <div className="career-timeline">
            <div className="career-timeline-line" />
            <motion.div className="career-timeline-items" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
              {career.map((job, i) => (
                <motion.div key={i} className="career-item" variants={fadeUpSlow}>
                  <div className="career-marker">
                    {i === 0 ? <span className="career-origin" /> : <span className="career-star">✦</span>}
                  </div>
                  <div className="career-content">
                    <span className="career-date">{job.date}</span>
                    <h4 className="career-company">{job.company}</h4>
                    <span className="career-role">{job.role}</span>
                    <p className="career-desc">{job.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
