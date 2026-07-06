import { Award, FolderGit2, Code, Users, Mail, ExternalLink } from 'lucide-react';

export default function About() {
  const stats = [
    { num: '13+', label: 'Competition Awards' },
    { num: '4+', label: 'Years Building' },
    { num: '20+', label: 'Projects Shipped' },
    { num: '5+', label: 'Team Members' },
  ];
  const contacts = [
    { label: 'Bilibili', href: 'https://space.bilibili.com/3546948852255258', icon: <ExternalLink size={13} /> },
    { label: 'GitHub', href: 'https://github.com/AYSTBA', icon: <ExternalLink size={13} /> },
    { label: 'Outlook', href: 'mailto:AYSTBA_aystba@outlook.com', icon: <Mail size={13} /> },
    { label: 'QQ: 298638937', href: '#', icon: <ExternalLink size={13} /> },
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <p className="section-label">About Me</p>
        <h2 className="section-title">Designer. Developer.<br />Studio Founder.</h2>
        <p className="section-desc">A three-time national champion who blends visual design with AI to build compelling digital experiences.</p>
        <div className="about-inner">
          <div>
            <div className="about-avatar-wrap">
              <div className="about-avatar-ring" />
              <div className="about-avatar-placeholder">A</div>
            </div>
          </div>
          <div className="about-text">
            <h3>AYSTBA</h3>
            <p className="about-role">Visual Designer / AI Designer / Brand Designer — Shenzhen, China</p>
            <p className="about-bio">
              Founder of UPCHIS Studio. A creator passionate about building from zero to one. With a background spanning visual design, AI engineering, and brand strategy, I help projects find their visual voice. My work has been recognized across national-level competitions including the World Robot Contest and China Automation & AI Education Conference.
              <br /><br />
              Currently exploring: Distributed Computing, AI Agents, and DJI-RoboMaster. ENFP-T personality — I thrive on creative collaboration and open-source.
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
              {contacts.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="about-contact-item">
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}