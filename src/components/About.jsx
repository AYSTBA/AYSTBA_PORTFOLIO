import { Award, FolderGit2, Code, Users, Mail } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function About() {
  const { t } = useLang();
  const stats = [
    { num: '8+', label: t('about.stats.projects') },
    { num: '3', label: t('about.stats.stars') },
    { num: '4+', label: t('about.stats.languages') },
    { num: '2026', label: t('about.stats.started') },
  ];
  const skills = ['Vue', 'React', 'TypeScript', 'Python', 'Rust', 'Tauri', 'Express', 'Tailwind', 'Git', 'Figma'];

  return (
    <section id="about" className="section about">
      <div className="container">
        <p className="section-label">{t('about.label')}</p>
        <h2 className="section-title">Building Digital<br />Experiences</h2>
        <p className="section-desc">{t('about.desc')}</p>
        <div className="about-inner">
          <div>
            <div className="about-avatar-wrap">
              <div className="about-avatar-ring" />
              <img src="https://avatars.githubusercontent.com/u/194509089?v=4" alt="AYSTBA" className="about-avatar" />
            </div>
          </div>
          <div className="about-text">
            <h3>AYSTBA</h3>
            <p className="about-role">{t('about.role')}</p>
            <p className="about-bio">
              {t('about.bio').split('\n').map((para, i, arr) => (
                <span key={i}>{para}{i < arr.length - 1 && <><br /><br /></>}</span>
              ))}
            </p>
            <div className="about-stats">
              {stats.map((s, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat-num">{s.num}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="about-contact">
              {skills.map((skill, i) => (
                <span key={i} className="about-contact-item">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}