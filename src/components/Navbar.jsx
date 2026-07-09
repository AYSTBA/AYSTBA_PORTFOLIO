import { useEffect, useRef, useState, useCallback } from "react";
import { Skull, Briefcase, FolderOpen, Star, MessageCircle, X } from "lucide-react";
import { gsap } from "gsap";
import { useLang } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const navRef = useRef(null);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      var p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      var el = navRef.current;
      if (el) el.style.setProperty("--np", p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      if (panelRef.current && overlayRef.current) {
        gsap.set(panelRef.current, { x: "100%" });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(linksRef.current, { x: 30, opacity: 0 });

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(panelRef.current, { x: "0%", duration: 0.4, ease: "power3.out" });
        gsap.to(linksRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.15,
        });
      }
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (panelRef.current && overlayRef.current) {
      gsap.to(linksRef.current, { x: 30, opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(panelRef.current, { x: "100%", duration: 0.3, ease: "power3.in", delay: 0.1 });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => setMenuOpen(false),
      });
    } else {
      setMenuOpen(false);
    }
  }, []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      closeMenu();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    },
    [closeMenu]
  );

  return (
    <>
      <nav ref={navRef} className="navbar">
        <a href="#hero" className="navbar-logo">
          <Skull size={18} />
          <span className="nav-label">AYSTBA</span>
        </a>
        <ul className="navbar-links">
          <li>
            <a href="#about">
              <Briefcase size={16} />
              <span className="nav-label">{t("nav.work")}</span>
            </a>
          </li>
          <li>
            <a href="#projects">
              <FolderOpen size={16} />
              <span className="nav-label">{t("nav.projects")}</span>
            </a>
          </li>
          <li>
            <a href="#skills">
              <Star size={16} />
              <span className="nav-label">{t("nav.skills")}</span>
            </a>
          </li>
        </ul>
        <button
          className="btn-contact"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <MessageCircle size={16} />
          <span className="nav-label">{t("nav.contact")}</span>
        </button>
        <button
          className={`navbar-mobile-toggle ${menuOpen ? "active" : ""}`}
          onClick={menuOpen ? closeMenu : openMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuOpen && <div className="navbar-mobile-overlay" ref={overlayRef} onClick={closeMenu} />}
      <div className={`navbar-mobile-panel ${menuOpen ? "open" : ""}`} ref={panelRef}>
        <div className="navbar-mobile-header">
          <span className="navbar-mobile-title">Menu</span>
          <button className="navbar-mobile-close" onClick={closeMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <ul className="navbar-mobile-links">
          <li ref={(el) => (linksRef.current[0] = el)}>
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              <Briefcase size={20} />
              <span>{t("nav.work")}</span>
            </a>
          </li>
          <li ref={(el) => (linksRef.current[1] = el)}>
            <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
              <FolderOpen size={20} />
              <span>{t("nav.projects")}</span>
            </a>
          </li>
          <li ref={(el) => (linksRef.current[2] = el)}>
            <a href="#skills" onClick={(e) => handleNavClick(e, "#skills")}>
              <Star size={20} />
              <span>{t("nav.skills")}</span>
            </a>
          </li>
          <li ref={(el) => (linksRef.current[3] = el)}>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              <MessageCircle size={20} />
              <span>{t("nav.contact")}</span>
            </a>
          </li>
        </ul>
        <div className="navbar-mobile-footer">
          <LanguageToggle scrollProgress={1} />
        </div>
      </div>
    </>
  );
}
