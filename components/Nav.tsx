'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LAUNCH = new Date('2026-06-18T10:00:00Z').getTime();

function getCountdown() {
  let delta = Math.max(0, LAUNCH - Date.now());
  const d = Math.floor(delta / 86400000); delta -= d * 86400000;
  const h = Math.floor(delta / 3600000); delta -= h * 3600000;
  const m = Math.floor(delta / 60000); delta -= m * 60000;
  return { d, h: String(h).padStart(2,'0'), m: String(m).padStart(2,'0') };
}

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState('Launches in …');

  useEffect(() => {
    const update = () => {
      const { d, h, m } = getCountdown();
      setCompact(`Launches in ${d}d ${h}h ${m}m`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  // Scroll condensation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mm.matches) return;
    gsap.fromTo(nav,
      { y: -104, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.05 }
    );
  }, []);

  const active = (href: string) => pathname === href ? 'active' : '';

  return (
    <header className="nav" ref={navRef}>
      <div className="nav-inner">
        <Link className="brandmark" href="/">
          <span className="wm">The Worst Company<em>EMB</em></span>
        </Link>
        <nav className="nav-links">
          <Link href="/" className={active('/')}>Home</Link>
          <Link href="/services" className={active('/services')}>Services</Link>
          <Link href="/about" className={active('/about')}>About</Link>
        </nav>
        <div className="nav-right">
          <span className="nav-countdown">{compact}</span>
          <Link className="nav-waitlist" href="/profile">
            <span className="hidden sm:inline">Join the&nbsp;</span>waitlist
          </Link>
          <Link
            className="nav-account"
            href="/profile"
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
