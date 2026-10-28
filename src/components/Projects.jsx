import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import moxImg from '../assets/mox.png';
import portfolioImg from '../assets/AYSTBAP.png';
import upchisImg from '../assets/upchis.png';
import encryptionImg from '../assets/SKILL.png';

// 我的项目：四张真实截图。首张跨两列，三列网格刚好铺满、不留空格。
// contain: true 表示截图比卡片框更高/更窄，用 contain 完整显示而不是裁切。
// 卡片图片就在资源目录里，改图只需要替换 src/assets 下对应的 png。
const items = [
  { tag: 'Rust + Vue', title: 'moX', descKey: 'projects.mox.desc', url: 'https://github.com/AYSTBA/moX', img: moxImg },
  { tag: 'React + GSAP + WebGL', title: 'AYSTBA_PORTFOLIO', descKey: 'projects.danci.desc', url: 'https://github.com/AYSTBA/AYSTBA_PORTFOLIO', img: portfolioImg },
  { tag: 'Astro + GSAP', title: 'UPCHIS', descKey: 'projects.upchis.desc', url: 'https://upchis.work/', img: upchisImg, contain: true },
  { tag: 'Python + Security', title: 'Encryption Suite', descKey: 'projects.encryption.desc', url: 'https://github.com/AYSTBA/Multi-AlgorithmEncryptioSoftware', img: encryptionImg, contain: true },
];

export default function Projects() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  // 卡片跟随滚动依次落位，一次性触发；动画本身写在 .projects.is-in 里
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -12% 0px' });

  return (
    <section
      id="projects"
      className={`section projects${inView ? ' is-in' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="projects-header">
          <p className="section-label">{t('nav.projects')}</p>
          <h2 className="section-title projects-title">{t('projects.title')}</h2>
        </div>
        <div className="projects-grid">
          {items.map((p, i) => {
            // 第一张跨两列做主角；后两张竖版截图用 contain 完整展示
            const extra = i === 0 ? ' project-featured' : p.contain ? ' project-contain' : '';
            return (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                key={p.title}
                className={`project-card${extra}`}
              >
                <div className="project-media">
                  <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="project-body">
                  <p className="project-tag">{p.tag}</p>
                  <h3 className="project-name">{p.title}</h3>
                  <p className="project-desc">{t(p.descKey)}</p>
                  <span className="project-go" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
