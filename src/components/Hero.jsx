import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import DotField from "./DotField";
import heroBg from "../assets/hero-bg.jpg";
import { useLang } from "../context/LanguageContext";

var carouselItems = [
  { color: "#2a3a2a", label: "Photography", img: "https://picsum.photos/seed/photography/400/500" },
  { color: "#3a3a2a", label: "3D Render", img: "https://picsum.photos/seed/3drender/400/500" },
  { color: "#2a2a3a", label: "Brand Identity", img: "https://picsum.photos/seed/brand/400/500" },
  { color: "#3a3a2a", label: "AI Art", img: "https://picsum.photos/seed/aiart/400/500" },
  { color: "#2a3a3a", label: "UI Design", img: "https://picsum.photos/seed/uidesign/400/500" },
  { color: "#3a2a3a", label: "Game Art", img: "https://picsum.photos/seed/gameart/400/500" },
  { color: "#2a3a2a", label: "Poster", img: "https://picsum.photos/seed/poster/400/500" },
  { color: "#2a3a3a", label: "Illustration", img: "https://picsum.photos/seed/illustration/400/500" },
];

var CARD_W = 180;
var CARD_GAP = 52;
var CARD_STEP = CARD_W + CARD_GAP;
var TOTAL_W = carouselItems.length * CARD_STEP;

export default function Hero({ openingComplete }) {
  var { t } = useLang();
  var trackRef = useRef(null);
  var containerRef = useRef(null);
  var itemsRef = useRef([]);
  var titleLine1Ref = useRef(null);
  var titleLine2Ref = useRef(null);
  var modalRef = useRef(null);
  var modalContentRef = useRef(null);

  var autoOffsetRef = useRef(0);
  var dragOffsetRef = useRef(0);
  var momentumVel = useRef(0);
  var phaseRef = useRef(0);

  var dragStartX = useRef(0);
  var dragStartOffset = useRef(0);
  var lastDragX = useRef(0);
  var lastDragT = useRef(0);

  var [selectedItem, setSelectedItem] = useState(null);
  var [showModal, setShowModal] = useState(false);
  var [isAnimating, setIsAnimating] = useState(false);

  var startRectRef = useRef(null);
  var startTransformRef = useRef({ scale: 1, rotate: 0 });

  var doubled = useMemo(function() { return carouselItems.concat(carouselItems); }, []);

  useEffect(() => {
    if (!openingComplete) return;

    gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
      opacity: 0,
      x: -100,
      scaleX: 0.8,
      skewX: -10
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
        duration: 0.8
      }
    });

    tl.to(titleLine1Ref.current, {
      opacity: 1,
      x: 0,
      scaleX: 1,
      skewX: 0,
      duration: 1
    })
    .to(titleLine2Ref.current, {
      opacity: 1,
      x: 0,
      scaleX: 1,
      skewX: 0,
      duration: 1
    }, 0.2);

  }, [openingComplete]);

  useEffect(function() {
    var prev = 0;
    var raf;

    var tick = function(now) {
      if (!prev) prev = now;
      var dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      var speed = 25 + 18 * Math.sin(now * 0.00035 + 1.2);
      var phase = phaseRef.current;

      if (phase === 2) {
        var absV = Math.abs(momentumVel.current);
        var friction = absV > 250 ? 0.86 : (absV > 80 ? 0.93 : 0.97);
        momentumVel.current *= friction;
        dragOffsetRef.current += momentumVel.current * dt;
        if (absV < 6) { phaseRef.current = 0; }
      } else if (phase === 0) {
        autoOffsetRef.current += speed * dt;
        if (autoOffsetRef.current >= TOTAL_W) autoOffsetRef.current -= TOTAL_W;
      }

      var raw = autoOffsetRef.current + dragOffsetRef.current;
      var offset = ((raw % TOTAL_W) + TOTAL_W) % TOTAL_W;

      var cw = containerRef.current?.offsetWidth || window.innerWidth;
      if (cw === 0) { raf = requestAnimationFrame(tick); return; }
      var cx = cw / 2;

      var items = itemsRef.current;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (!el) continue;

        var left = i * CARD_STEP - offset;
        var cardCx = left + CARD_W / 2;
        var nx = 2 * cardCx / cw - 1;

        var scale = 1 - Math.abs(nx) * 0.05;
        var rot = nx * 1.8;

        el.style.transform = "scale(" + scale + ") rotate(" + rot + "deg)";
        el.style.transition = "none";
      }

      if (trackRef.current) {
        trackRef.current.style.transform = "translateX(" + (-offset) + "px)";
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return function() { cancelAnimationFrame(raf); };
  }, []);

  var setItemRef = useMemo(function() {
    return function(el, i) { itemsRef.current[i] = el; };
  }, []);

  var animateOpen = function() {
    if (!modalContentRef.current || !startRectRef.current) return;

    var rect = startRectRef.current;
    var transform = startTransformRef.current;
    var targetW = Math.min(520, window.innerWidth - 40);
    var targetH = Math.min(650, window.innerHeight - 80);
    var targetX = (window.innerWidth - targetW) / 2;
    var targetY = (window.innerHeight - targetH) / 2;

    gsap.set(modalContentRef.current, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      scale: transform.scale,
      rotate: transform.rotate,
      borderRadius: 12,
      opacity: 1,
      x: 0,
      y: 0
    });

    gsap.to(modalRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    var tl = gsap.timeline({
      defaults: {
        ease: 'power4.out'
      },
      onComplete: function() {
        setIsAnimating(false);
      }
    });

    tl.to(modalContentRef.current, {
      duration: 0.7,
      left: targetX,
      top: targetY - 60,
      width: targetW,
      height: targetH,
      scale: 1.15,
      rotate: 0,
      borderRadius: 28
    })
    .to(modalContentRef.current, {
      duration: 0.4,
      top: targetY,
      scale: 1,
      borderRadius: 24,
      ease: 'power2.out'
    });
  };

  var animateClose = function() {
    if (!modalContentRef.current || !startRectRef.current) {
      setShowModal(false);
      setSelectedItem(null);
      setIsAnimating(false);
      return;
    }

    var rect = startRectRef.current;
    var transform = startTransformRef.current;

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    });

    var tl = gsap.timeline({
      defaults: {
        ease: 'power4.inOut'
      },
      onComplete: function() {
        setShowModal(false);
        setSelectedItem(null);
        setIsAnimating(false);
      }
    });

    tl.to(modalContentRef.current, {
      duration: 0.15,
      top: '+=30',
      scale: 0.95,
      ease: 'power2.in'
    })
    .to(modalContentRef.current, {
      duration: 0.5,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      scale: transform.scale,
      rotate: transform.rotate,
      borderRadius: 12
    });
  };

  var handleCardClick = function(item, index) {
    if (isAnimating || showModal) return;

    var target = itemsRef.current[index];
    if (!target) return;

    var rect = target.getBoundingClientRect();
    var computedStyle = window.getComputedStyle(target);
    var transform = computedStyle.transform || 'none';
    
    var scale = 1;
    var rotate = 0;
    if (transform !== 'none') {
      var match = transform.match(/matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),/);
      if (match) {
        var a = parseFloat(match[1]);
        var b = parseFloat(match[2]);
        scale = Math.sqrt(a * a + b * b);
        rotate = Math.atan2(b, a) * (180 / Math.PI);
      }
    }
    
    startRectRef.current = rect;
    startTransformRef.current = { scale: scale, rotate: rotate };
    setSelectedItem(item);
    setShowModal(true);
    setIsAnimating(true);

    requestAnimationFrame(function() {
      animateOpen();
    });
  };

  var handleClose = function(e) {
    if (e) e.stopPropagation();
    if (isAnimating || !showModal) return;
    setIsAnimating(true);
    animateClose();
  };

  useEffect(function() {
    var el = containerRef.current;
    if (!el) return;

    var onDown = function(e) {
      phaseRef.current = 1;
      dragStartX.current = e.clientX;
      dragStartOffset.current = dragOffsetRef.current;
      lastDragX.current = e.clientX;
      lastDragT.current = performance.now();
    };

    var onMove = function(e) {
      if (phaseRef.current !== 1) return;
      dragOffsetRef.current = dragStartOffset.current - (e.clientX - dragStartX.current);
      var now = performance.now();
      var dt = now - lastDragT.current;
      if (dt > 0) {
        momentumVel.current = (e.clientX - lastDragX.current) / dt * 16;
      }
      lastDragX.current = e.clientX;
      lastDragT.current = now;
    };

    var onUp = function(e) {
      phaseRef.current = 2;
      var dragDistance = Math.abs(e.clientX - dragStartX.current);
      if (dragDistance < 10) {
        var target = e.target.closest('.hero-carousel-item');
        if (target) {
          var index = Array.from(target.parentElement.children).indexOf(target);
          var item = doubled[index];
          if (item) {
            handleCardClick(item, index);
          }
        }
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return function() {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-image">
        <img src={heroBg} alt="" />
      </div>
      <div className="hero-bg" />
      <div className="hero-frost" />
      <div className="hero-dotfield">
        <DotField
          dotRadius={1.5}
          dotSpacing={21}
          cursorRadius={500}
          cursorForce={0.15}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(200, 255, 0, 0.35)"
          gradientTo="rgba(120, 200, 150, 0.25)"
          glowColor="#c8ff00"
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line accent" ref={titleLine1Ref}>{t("hero.title1")}</span>
          <span className="hero-title-line outline" ref={titleLine2Ref}>{t("hero.title2")}</span>
        </h1>
      </div>
      <div className="hero-carousel" ref={containerRef}>
        <div className="hero-carousel-track" ref={trackRef}>
          {doubled.map(function(item, i) {
            return (
              <div 
                key={i} 
                className="hero-carousel-item" 
                ref={function(el) { setItemRef(el, i); }}
              >
                <img src={item.img} alt={item.label} className="hero-carousel-image" />
                <div className="hero-carousel-label">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && selectedItem && (
        <div 
          ref={modalRef} 
          className="hero-card-modal" 
          style={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div 
            ref={modalContentRef} 
            className="hero-card-modal-content"
            onClick={function(e) { e.stopPropagation(); }}
          >
            <img src={selectedItem.img} alt={selectedItem.label} className="hero-card-modal-image" />
            <div className="hero-card-modal-label">{selectedItem.label}</div>
            <button className="hero-card-modal-close" onClick={handleClose}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
