'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = [
  'Chain-stitched', 'Hand-finished', 'Numbered & signed',
  'Heavyweight 240gsm cotton', 'Made in small batches',
  'Chain-stitched', 'Hand-finished', 'Numbered & signed',
  'Heavyweight 240gsm cotton', 'Made in small batches',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mm.matches) return;

    // Duplicate items so loop is seamless
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 32,
      ease: 'none',
      repeat: -1,
    });

    const marquee = track.parentElement;
    const pause = () => tween.pause();
    const play = () => tween.play();
    marquee?.addEventListener('mouseenter', pause);
    marquee?.addEventListener('mouseleave', play);

    return () => {
      tween.kill();
      marquee?.removeEventListener('mouseenter', pause);
      marquee?.removeEventListener('mouseleave', play);
    };
  }, []);

  const content = items.map((item, i) => (
    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
      <span style={{ fontStyle: i === 2 || i === 7 ? 'italic' : undefined }}>{item}</span>
      <span className="star">✦</span>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {content}{content}
      </div>
    </div>
  );
}
