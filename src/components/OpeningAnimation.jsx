import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function OpeningAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const topMaskRef = useRef(null);
  const bottomMaskRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { 
          opacity: 0, 
          display: 'none', 
          duration: 0.3 
        });
        if (onComplete) onComplete();
      }
    });

    tl.set([topMaskRef.current, bottomMaskRef.current], { y: 0 })
      .to(topMaskRef.current, { 
        y: '-100%', 
        duration: 1.2, 
        ease: 'power4.out' 
      }, 0)
      .to(bottomMaskRef.current, { 
        y: '100%', 
        duration: 1.2, 
        ease: 'power4.out' 
      }, 0);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="opening-animation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={topMaskRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#0c0c0c',
          transformOrigin: 'top'
        }}
      />
      <div 
        ref={bottomMaskRef} 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#0c0c0c',
          transformOrigin: 'bottom'
        }}
      />
    </div>
  );
}
