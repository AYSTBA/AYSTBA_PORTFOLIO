import { Monitor, GitBranch, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const links = [
    { label: 'Bilibili', href: 'https://space.bilibili.com/3546948852255258', icon: <Monitor size={18} /> },
    { label: 'GitHub', href: 'https://github.com/AYSTBA', icon: <GitBranch size={18} /> },
    { label: 'Outlook', href: 'mailto:AYSTBA_aystba@outlook.com', icon: <Mail size={18} /> },
    { label: 'QQ', href: '#', icon: <MessageCircle size={18} /> },
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact-bg" />
      <div className="container contact-inner">
        <p className="section-label">Get in Touch</p>
        <h2 className="contact-title">Let's build<br />something together.</h2>
        <p className="contact-subtitle">Open for collaborations, creative projects, and interesting conversations.<br />Based in Shenzhen, China — available worldwide.</p>
        <div className="contact-links">
          {links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
              {l.icon} {l.label} <ArrowUpRight size={14} style={{ opacity: 0.3 }} />
            </a>
          ))}
        </div>
        <p className="contact-footer">&copy; 2025 AYSTBA &middot; UPCHIS Studio</p>
      </div>
    </section>
  );
}