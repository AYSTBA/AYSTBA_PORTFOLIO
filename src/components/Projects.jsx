import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { tag: 'AI + Robotics', title: 'World Robot Contest - National Silver', desc: 'Competed in multiple national-level robotics championships across Kunming, Nanning, Sanya and the finals.', color: '#1a2a1a' },
  { tag: 'AI + Smart Home', title: 'Intelligent Home Automation System', desc: 'Silver medal at the China Automation & AI Education Conference.', color: '#2a1a1a' },
  { tag: 'Creative Design', title: 'Cyberpunk Creative Design - National First Prize', desc: 'First-place winner at the Longgang District AI Innovation competition.', color: '#1a1a2a' },
  { tag: 'Brand + Studio', title: 'UPCHIS Studio Brand Identity', desc: 'Founded and branded UPCHIS Studio with complete visual identity system.', color: '#2a2a1a' },
  { tag: 'Open Source', title: 'Open Source Tools & Libraries', desc: 'Active contributor to the open-source community building design-dev tools.', color: '#1a2a2a' },
];

const v = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <p className="section-label">Featured Work</p>
        <h2 className="section-title">Selected Projects</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div key={i} className="project-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={v}>
              <div className="project-card-img">
                <div className="project-card-img-placeholder" style={{ background: 'linear-gradient(135deg,' + p.color + ',' + p.color + 'ee)' }}>
                  <ArrowUpRight size={28} style={{ opacity: 0.15 }} />
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-card-tag">{p.tag}</p>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}