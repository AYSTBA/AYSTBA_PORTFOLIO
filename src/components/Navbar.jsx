import { useEffect, useRef, useState, useCallback } from "react";
import { Skull, Briefcase, FolderOpen, Star, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { useLang } from "../context/LanguageContext";
import GlassSurface from "./GlassSurface";
import LanguageToggle from "./LanguageToggle";

// 胶囊的尺寸：宽度交给 CSS（100%，外面套一层 960px 的 .nav-shell），
// 高度写死 56 —— GlassSurface 的位移贴图是按元素实际像素算的，高度必须是确定值。
const NAV_HEIGHT = 56;

// displace 管"透过玻璃的光有多糊"。组件示例给 0.5（基本不糊），但导航是浮在正文
// 之上的：0.5 时背后的正文能直接读出来、和导航项打架。4 左右既糊掉正文，
// 又保得住边缘那一圈折射。
const NAV_DISPLACE = 4;

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  // --np 是滚动进度（0 → 1）。写得轻一点：只写一个 CSS 变量，不触发 React 重渲染。
  // 它乘进 .nav-shell 的 --nav-frost，滚动越远，胶囊的暗色染色越重，
  // 白色导航文字从明亮的内容区上方划过时也不会糊掉。
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      const el = navRef.current;
      if (el) el.style.setProperty("--np", p.toFixed(3));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goTo = useCallback(
    (e, href) => {
      e.preventDefault();
      closeMenu();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    [closeMenu]
  );

  // 移动端抽屉开合动画，关闭时给卸载留出时间
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen) {
      const links = el.querySelectorAll(".nav-menu-link");
      gsap.set(el, { opacity: 0 });
      gsap.set(links, { x: 24, opacity: 0 });
      gsap.to(el, { opacity: 1, duration: 0.24, ease: "power2.out" });
      gsap.to(links, {
        x: 0,
        opacity: 1,
        duration: 0.36,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.06,
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => el.remove(),
      });
    }
  }, [menuOpen]);

  const navItems = [
    { href: "#about", icon: Briefcase, key: "nav.work" },
    { href: "#projects", icon: FolderOpen, key: "nav.projects" },
    { href: "#skills", icon: Star, key: "nav.skills" },
  ];

  return (
    <div ref={navRef} className="nav-wrapper">
      {/* .nav-shell 只负责"和胶囊同宽同中心"，移动端抽屉挂在这一层：
          GlassSurface 的根节点是 overflow: hidden，抽屉放进去会被裁掉。 */}
      <div className="nav-shell">
        <GlassSurface
          width="100%"
          height={NAV_HEIGHT}
          borderRadius={NAV_HEIGHT / 2}
          borderWidth={0.07}
          brightness={50}
          opacity={0.93}
          blur={11}
          displace={NAV_DISPLACE}
          distortionScale={-180}
          greenOffset={10}
          blueOffset={20}
          saturation={1.1}
          backgroundOpacity="var(--nav-frost)"
          className="navbar"
        >
          <div className="navbar-inner">
            <a href="#hero" className="navbar-logo">
              <Skull size={16} />
              <span className="nav-label">AYSTBA</span>
            </a>

            <ul className="navbar-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <item.icon size={15} />
                    <span className="nav-label">{t(item.key)}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="navbar-right">
              <button
                className="btn-contact"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <MessageCircle size={15} />
                <span className="nav-label">{t("nav.contact")}</span>
              </button>
              <LanguageToggle scrollProgress={1} />
              <button
                className={`navbar-mobile-toggle${menuOpen ? " active" : ""}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </GlassSurface>

        {/* 移动端下拉：贴着胶囊底部弹出 */}
        {menuOpen && (
          <div className="nav-menu" ref={menuRef}>
            <ul className="nav-menu-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="nav-menu-link" href={item.href} onClick={(e) => goTo(e, item.href)}>
                    <item.icon size={20} />
                    <span>{t(item.key)}</span>
                  </a>
                </li>
              ))}
              <li>
                <a className="nav-menu-link" href="#contact" onClick={(e) => goTo(e, "#contact")}>
                  <MessageCircle size={20} />
                  <span>{t("nav.contact")}</span>
                </a>
              </li>
            </ul>
            <div className="nav-menu-footer">
              <LanguageToggle scrollProgress={1} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
