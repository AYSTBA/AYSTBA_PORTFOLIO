import { Award, FolderGit2, Code, Users, Mail } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import BorderGlow from './BorderGlow';

export default function About() {
  const { t } = useLang();
  const stats = [
    { num: '8+', label: t('about.stats.projects') },
    { num: '3', label: t('about.stats.stars') },
    { num: '4+', label: t('about.stats.languages') },
    { num: '2026', label: t('about.stats.started') },
  ];
  const bioParts = t('about.bio').split('\n\n').filter(p => p.trim());

  const cardProps = {
    backgroundColor: '#121212',
    glowColor: '50 80 80',
    colors: ['#ffd85f', '#c8ff00', '#ff8c00'],
  };

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <BorderGlow {...cardProps} className="about-card about-card-avatar">
            <div className="about-avatar-wrap">
              <div className="about-avatar-ring" />
              <img src="https://avatars.githubusercontent.com/u/194509089?v=4" alt="AYSTBA" className="about-avatar" />
            </div>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-title">
            <p className="section-label">{t('about.label')}</p>
            <h2 className="section-title">Building Digital<br />Experiences</h2>
            <p className="section-desc">{t('about.desc')}</p>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-name">
            <h3>AYSTBA</h3>
            <p className="about-role">{t('about.role')}</p>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-stat about-card-stat-lg">
            <span className="about-stat-num">{stats[0].num}</span>
            <span className="about-stat-label">{stats[0].label}</span>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-stat about-card-stat-sm">
            <span className="about-stat-num">{stats[1].num}</span>
            <span className="about-stat-label">{stats[1].label}</span>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-bio">
            {bioParts.map((part, i) => (
              <p key={i} className="about-bio">{part}</p>
            ))}
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-stat about-card-stat-md">
            <span className="about-stat-num">{stats[2].num}</span>
            <span className="about-stat-label">{stats[2].label}</span>
          </BorderGlow>

          <BorderGlow {...cardProps} className="about-card about-card-stat about-card-stat-sm">
            <span className="about-stat-num">{stats[3].num}</span>
            <span className="about-stat-label">{stats[3].label}</span>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}