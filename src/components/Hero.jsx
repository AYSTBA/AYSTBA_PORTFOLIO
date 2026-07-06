import { useEffect, useRef, useMemo } from "react";

var carouselItems = [
  { color: "#2a3a2a", label: "Photography" },
  { color: "#3a2a2a", label: "3D Render" },
  { color: "#2a2a3a", label: "Brand Identity" },
  { color: "#3a3a2a", label: "AI Art" },
  { color: "#2a3a3a", label: "UI Design" },
  { color: "#3a2a3a", label: "Game Art" },
  { color: "#2a3a2a", label: "Poster" },
  { color: "#2a3a3a", label: "Illustration" },
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
  var phaseRef = useRef(0); // 0=auto, 1=drag, 2=coast

  var dragStartX = useRef(0);
  var dragStartOffset = useRef(0);
  var lastDragX = useRef(0);
  var lastDragT = useRef(0);

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
        // dragOffset stays ? no bounce back
      }

      // infinite scroll: wrap combined offset
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

  useEffect(function() {
    var el = containerRef.current;
    if (!el) return;

    var onWheel = function(e) {
      if (Math.abs(e.deltaX) < 2 && Math.abs(e.deltaY) < 2) return;
      dragOffsetRef.current -= (e.deltaX || e.deltaY) * 1.2;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return function() { el.removeEventListener("wheel", onWheel); };
  }, []);

  useEffect(function() {
    var el = containerRef.current;
    if (!el) return;

    var onDown = function(e) {
      phaseRef.current = 1;
      dragStartX.current = e.clientX;
      dragStartOffset.current = dragOffsetRef.current;
      lastDragX.current = e.clientX;
      lastDragT.current = performance.now();
      el.setPointerCapture(e.pointerId);
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

    var onUp = function() { phaseRef.current = 2; };

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
      <div className="hero-bg" />
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
              <div key={i} className="hero-carousel-item" ref={function(el) { setItemRef(el, i); }}>
                <div className="hero-carousel-placeholder" style={{ background: item.color }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
