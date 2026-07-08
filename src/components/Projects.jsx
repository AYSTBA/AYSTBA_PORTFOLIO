import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import moxImg from '../assets/mox.png';
import portfolioImg from '../assets/AYSTBAP.png';
import ideaButlerImg from '../assets/A.png';
import encryptionImg from '../assets/SKILL.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { tag: 'Rust + Vue', title: 'moX', descKey: 'projects.mox.desc', color: '#2a1a2a', url: 'https://github.com/AYSTBA/moX', img: moxImg },
  { tag: 'Vue + Express', title: 'AYSTBA_PORTFOLIO', descKey: 'projects.danci.desc', color: '#1a2a2a', url: 'https://github.com/AYSTBA/AYSTBA_PORTFOLIO', img: portfolioImg },
  { tag: 'Python + AI', title: 'IdeaButler', descKey: 'projects.ideabutler.desc', color: '#2a2a1a', url: 'https://github.com/AYSTBA/IdeaButler-AiSkill', img: ideaButlerImg },
  { tag: 'Python + Security', title: 'Encryption Suite', descKey: 'projects.encryption.desc', color: '#1a1a2a', url: 'https://github.com/AYSTBA/Multi-AlgorithmEncryptioSoftware', img: encryptionImg },
];

export default function Projects() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const cardsRef = useRef([]);
  const cardImagesRef = useRef([]);
  const loadedImagesRef = useRef(new Set());

  useEffect(() => {
    const lazyLoadImages = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.getAttribute('data-src');
              if (src && !loadedImagesRef.current.has(src)) {
                img.src = src;
                loadedImagesRef.current.add(src);
              }
              observer.unobserve(img);
            }
          });
        },
        { threshold: 0.1, rootMargin: '200px' }
      );

      cardImagesRef.current.forEach((img) => {
        if (img && img.getAttribute('data-src')) {
          observer.observe(img);
        }
      });

      return () => observer.disconnect();
    };

    const cleanupLazyLoad = lazyLoadImages();

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -80,
        scaleY: 1.5,
        skewY: -10
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        x: -50
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 100,
        rotationX: -10
      });

      gsap.set(cardImagesRef.current, {
        scale: 1.3,
        y: 50
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scaleY: 1,
        skewY: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(labelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      cardsRef.current.forEach((card, i) => {
        const img = cardImagesRef.current[i];
        if (img) {
          gsap.to(img, {
            scale: 1,
            y: 0,
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          });

          gsap.to(img, {
            y: -20,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%',
              end: 'bottom 0%',
              scrub: 0.5
            }
          });
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      cleanupLazyLoad();
    };
  }, []);

  return (
    <section id="projects" className="section projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header">
          <p className="section-label" ref={labelRef}>{t('projects.label')}</p>
          <h2 className="section-title projects-title" ref={titleRef}>Selected Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <a 
              href={p.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={i} 
              className={`project-card${i % 2 === 1 ? ' project-card-reverse' : ''}`}
              ref={(el) => cardsRef.current[i] = el}
            >
              <div className="project-card-img">
                <img 
                  data-src={p.img} 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a1a' width='400' height='300'/%3E%3C/svg%3E"
                  alt={p.title} 
                  className="project-card-image"
                  ref={(el) => cardImagesRef.current[i] = el}
                />
                <div className="project-card-image-reveal" />
              </div>
              <div className="project-card-body">
                <span className="project-card-number">{String(i + 1).padStart(2, '0')}</span>
                <p className="project-card-tag">{p.tag}</p>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{t(p.descKey)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}