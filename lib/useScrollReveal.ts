'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector = '[data-reveal]',
  options: { stagger?: number; y?: number } = {}
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mm.matches) return;

    const container = containerRef.current;
    if (!container) return;

    const els = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const delay = options.stagger ? i * options.stagger : 0;
        gsap.fromTo(
          el,
          { opacity: 0, y: options.y ?? 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector, options.stagger, options.y]);
}
