import { motion } from 'framer-motion';
import { Palette, Cpu, Boxes, Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const skillKeys = [
  { icon: <Boxes size={18} />, titleKey: 'skills.frontend.title', descKey: 'skills.frontend.desc' },
  { icon: <Cpu size={18} />, titleKey: 'skills.backend.title', descKey: 'skills.backend.desc' },
  { icon: <Palette size={18} />, titleKey: 'skills.design.title', descKey: 'skills.design.desc' },
  { icon: <Sparkles size={18} />, titleKey: 'skills.creative.title', descKey: 'skills.creative.desc' },
];

const v = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="skills-header">
          <p className="section-label">{t('skills.label')}</p>
          <h2 className="skills-title">CAPABILITIES</h2>
        </div>
        <div className="skills-grid">
          {skillKeys.map((s, i) => (
            <motion.div key={i} className="skill-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={v}>
              <div className="skill-card-icon">{s.icon}</div>
              <h4>{t(s.titleKey)}</h4>
              <p>{t(s.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}