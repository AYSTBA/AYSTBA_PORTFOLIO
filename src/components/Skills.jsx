import { motion } from 'framer-motion';
import { Palette, Cpu, Brush, Boxes, Layers, Sparkles } from 'lucide-react';

const skills = [
  { icon: <Palette size={22} />, title: 'Visual Design', desc: 'Creating cohesive visual systems with hierarchy, color, and typography.', tags: ['UI Design', 'Brand Identity', 'Typography', 'Color Theory'] },
  { icon: <Cpu size={22} />, title: 'AI & Automation', desc: 'Building intelligent systems bridging human intent and machine execution.', tags: ['AI Agents', 'Automation', 'Robotics', 'Distributed Systems'] },
  { icon: <Brush size={22} />, title: 'Brand Design', desc: 'Crafting brand narratives from scratch for creative studios and tech projects.', tags: ['Logo Design', 'Visual Identity', 'Brand Strategy', 'Guidelines'] },
  { icon: <Boxes size={22} />, title: 'Creative Development', desc: 'Bringing designs to life with Python, JavaScript, HTML/CSS, and Godot.', tags: ['Python', 'JavaScript', 'HTML/CSS', 'Godot', 'React'] },
  { icon: <Layers size={22} />, title: '3D & Game Design', desc: 'Exploring spatial design through 3D tools and game engines.', tags: ['3D Design', 'Godot Engine', 'Game Dev', 'Cyberpunk'] },
  { icon: <Sparkles size={22} />, title: 'Open Source & Community', desc: 'Building in public and fostering a community of creative technologists.', tags: ['Open Source', 'GitHub', 'Community', 'Studio Founder'] },
];

const v = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] } }),
};

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <p className="section-label">Capabilities</p>
        <h2 className="section-title">What I Bring</h2>
        <p className="section-desc">A multidisciplinary skill set spanning design, engineering, and strategy.</p>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <motion.div key={i} className="skill-card" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={v}>
              <div className="skill-card-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="skill-card-tags">{s.tags.map((t, j) => <span key={j} className="skill-tag">{t}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}