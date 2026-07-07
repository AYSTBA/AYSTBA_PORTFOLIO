import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const projects = [
  { tag: 'Rust + Vue', title: 'moX', descKey: 'projects.mox.desc', color: '#2a1a2a', url: 'https://github.com/AYSTBA/moX' },
  { tag: 'Vue + Express', title: 'danci007.com', descKey: 'projects.danci.desc', color: '#1a2a2a', url: 'https://github.com/AYSTBA/danci007.com' },
  { tag: 'Python + AI', title: 'IdeaButler', descKey: 'projects.ideabutler.desc', color: '#2a2a1a', url: 'https://github.com/AYSTBA/IdeaButler-AiSkill' },
  { tag: 'Python + Security', title: 'Encryption Suite', descKey: 'projects.encryption.desc', color: '#1a1a2a', url: 'https://github.com/AYSTBA/Multi-AlgorithmEncryptioSoftware' },
];

const v = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <p className="section-label">{t('projects.label')}</p>
        <h2 className="section-title">Selected Projects</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.a href={p.url} target="_blank" rel="noopener noreferrer" key={i} className="project-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={v}>
              <div className="project-card-img">
                <div className="project-card-img-placeholder" style={{ background: 'linear-gradient(135deg,' + p.color + ',' + p.color + 'ee)' }}>
                  <ArrowUpRight size={28} style={{ opacity: 0.15 }} />
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-card-tag">{p.tag}</p>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{t(p.descKey)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}