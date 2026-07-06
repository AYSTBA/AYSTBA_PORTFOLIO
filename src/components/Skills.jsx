import { motion } from 'framer-motion';
import { Palette, Cpu, Brush, Boxes, Layers, Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const skillKeys = [
  { icon: <Boxes size={22} />, titleKey: 'skills.frontend.title', descKey: 'skills.frontend.desc', tags: ['Vue', 'React', 'JavaScript', 'HTML/CSS', 'TypeScript'] },
  { icon: <Cpu size={22} />, titleKey: 'skills.backend.title', descKey: 'skills.backend.desc', tags: ['Python', 'AI', 'Security', 'Encryption', 'Automation'] },
  { icon: <Palette size={22} />, titleKey: 'skills.design.title', descKey: 'skills.design.desc', tags: ['UI/UX', 'Brand Identity', 'Figma', 'Color Theory'] },
  { icon: <Layers size={22} />, titleKey: 'skills.desktop.title', descKey: 'skills.desktop.desc', tags: ['Tauri', 'Rust', 'Vue', 'Win32', 'Desktop'] },
  { icon: <Sparkles size={22} />, titleKey: 'skills.opensource.title', descKey: 'skills.opensource.desc', tags: ['GitHub', 'Git', 'Open Source', 'MIT License'] },
  { icon: <Brush size={22} />, titleKey: 'skills.creative.title', descKey: 'skills.creative.desc', tags: ['Design', 'Creativity', 'AI Art', 'Prototyping'] },
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
        <p className="section-label">{t('skills.label')}</p>
        <h2 className="section-title">What I Bring</h2>
        <p className="section-desc">{t('skills.desc')}</p>
        <div className="skills-grid">
          {skillKeys.map((s, i) => (
            <motion.div key={i} className="skill-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={v}>
              <div className="skill-card-icon">{s.icon}</div>
              <h4>{t(s.titleKey)}</h4>
              <p>{t(s.descKey)}</p>
              <div className="skill-card-tags">{s.tags.map((tag, j) => <span key={j} className="skill-tag">{tag}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}