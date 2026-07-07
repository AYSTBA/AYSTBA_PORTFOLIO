import { useEffect, useRef, useMemo, useState } from "react";
import DotField from "./DotField";

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

export default function Hero() {
  var trackRef = useRef(null);
  var containerRef = useRef(null);
  var itemsRef = useRef([]);

  var autoOffsetRef = useRef(0);
  var dragOffsetRef = useRef(0);
  var momentumVel = useRef(0);
  var phaseRef = useRef(0);

  var dragStartX = useRef(0);
  var dragStartOffset = useRef(0);
  var lastDragX = useRef(0);
  var lastDragT = useRef(0);

  var [selectedItem, setSelectedItem] = useState(null);
  var [modalStyle, setModalStyle] = useState({});
  var [startRect, setStartRect] = useState(null);

  var doubled = useMemo(function() { return carouselItems.concat(carouselItems); }, []);

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

  var animateModal = function(startRect, isOpening) {
    var targetW = 400;
    var targetH = 500;
    var targetX = (window.innerWidth - targetW) / 2;
    var targetY = (window.innerHeight - targetH) / 2;

    var startX = startRect.left;
    var startY = startRect.top;
    var startW = startRect.width;
    var startH = startRect.height;

    var duration = 400;
    var startTime = performance.now();

    var easeOutBack = function(t) {
      var c1 = 1.70158;
      var c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    var animate = function(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = isOpening ? easeOutBack(progress) : 1 - progress;

      var x = startX + (targetX - startX) * eased;
      var y = startY + (targetY - startY) * eased;
      var w = startW + (targetW - startW) * eased;
      var h = startH + (targetH - startH) * eased;
      var r = isOpening ? 15 * (1 - eased) : 0;

      setModalStyle({
        left: x + 'px',
        top: y + 'px',
        width: w + 'px',
        height: h + 'px',
        borderRadius: (12 + (8 * eased)) + 'px',
        transform: 'rotate(' + r + 'deg)',
        opacity: eased
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (!isOpening) {
        setSelectedItem(null);
      }
    };

    requestAnimationFrame(animate);
  };

  var handleCardClick = function(item, index) {
    var el = itemsRef.current[index];
    if (el) {
      var rect = el.getBoundingClientRect();
      setStartRect(rect);
      setModalStyle({
        left: rect.left + 'px',
        top: rect.top + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        borderRadius: '12px',
        transform: 'rotate(0deg)',
        opacity: 1
      });
      setSelectedItem(item);
      setTimeout(function() {
        animateModal(rect, true);
      }, 50);
    }
  };

  var handleClose = function() {
    if (startRect) {
      animateModal(startRect, false);
    } else {
      setSelectedItem(null);
    }
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
        <img src="https://picsum.photos/seed/herobg/1920/1080" alt="Hero Background" />
      </div>
      <div className="hero-bg">
        <DotField
          dotRadius={3}
          dotSpacing={16}
          bulgeStrength={40}
          glowRadius={200}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.15}
          gradientFrom="rgba(255, 216, 95, 0.9)"
          gradientTo="rgba(200, 255, 0, 0.5)"
          glowColor="#ffd85f"
        />
      </div>
      <div className="hero-frost" />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line accent">AYSTBA</span>
          <span className="hero-title-line outline">PORTFOLIO</span>
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

      {selectedItem && (
        <div className="hero-card-modal" onClick={handleClose}>
          <div 
            className="hero-card-modal-content" 
            style={modalStyle}
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