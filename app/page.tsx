'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '@/components/Marquee';
import Countdown from '@/components/Countdown';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LOCKED_CARDS = [
  { no: '01', tone: '' },
  { no: '02', tone: 'rausch' },
  { no: '03', tone: 'dark' },
  { no: '04', tone: 'ivory' },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const heroTagRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroBotRef = useRef<HTMLDivElement>(null);
  const photoBgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const waitlistRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    gsap.registerPlugin(ScrollTrigger);

    if (!mm.matches) {
      // Hero h1 curtain wipe
      if (h1Ref.current) {
        gsap.fromTo(h1Ref.current,
          { clipPath: 'inset(0 0 112% 0)', opacity: 0, y: 10 },
          { clipPath: 'inset(-12% 0 -12% 0)', opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.15 }
        );
      }
      // Hero sub + CTA fade in
      const heroFadeEls = [heroTagRef.current, heroCTARef.current, heroBotRef.current].filter(Boolean);
      gsap.fromTo(heroFadeEls, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.55 });

      // Hero photo slow drift (GSAP continuous)
      if (photoBgRef.current) {
        gsap.fromTo(photoBgRef.current,
          { scale: 1.06, x: 0, y: 0 },
          { scale: 1.12, x: '-1.4%', y: '-1.2%', duration: 26, ease: 'none', repeat: -1, yoyo: true }
        );
      }

      // Glow breathe
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { opacity: 0.55, scale: 1 },
          { opacity: 1, scale: 1.08, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
      }
    }

    // Drop section reveals
    const dropEls = dropRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
    dropEls.forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true } }
      );
    });

    // Manifesto photo curtain
    const manifestoImg = manifestoRef.current?.querySelector<HTMLElement>('.ph');
    if (manifestoImg && !mm.matches) {
      gsap.fromTo(manifestoImg,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: manifestoImg, start: 'top 88%', once: true } }
      );
    }
    const manifestoText = manifestoRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
    manifestoText.forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    // Process steps stagger
    const processSteps = processRef.current?.querySelectorAll<HTMLElement>('.process-step') ?? [];
    processSteps.forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    // Waitlist section
    const waitlistEls = waitlistRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
    waitlistEls.forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const handleWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    const btn = form.querySelector('button') as HTMLButtonElement;
    input.value = '';
    btn.textContent = 'Saved ✓';
    setTimeout(() => { btn.textContent = 'Reserve'; }, 2400);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="hero"
        ref={heroRef}
        style={{
          position: 'relative',
          height: 'calc(100vh - 72px)',
          minHeight: 640,
          overflow: 'hidden',
          background: '#0c0c0c',
          color: '#fff',
        }}
      >
        {/* Background texture */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(120% 80% at 80% 10%, rgba(255,56,92,0.18) 0%, rgba(255,56,92,0) 55%),
            radial-gradient(80% 60% at 10% 90%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%),
            repeating-linear-gradient(135deg, #0e0e0e 0 28px, #131313 28px 56px)`,
        }} />

        {/* Hero photo */}
        <div
          ref={photoBgRef}
          aria-hidden="true"
          className="hero-photo-bg"
          style={{
            position: 'absolute',
            zIndex: 1,
            backgroundImage: 'url(/assets/hero.jpg)',
            backgroundSize: 'cover',
            filter: 'brightness(1.1) contrast(1.04) saturate(1.05)',
            transformOrigin: '75% 40%',
            willChange: 'transform',
          }}
        />

        {/* Pink glow */}
        <div ref={glowRef} aria-hidden="true" className="hero-glow" />

        {/* Veil */}
        <div aria-hidden="true" className="hero-veil" />

        {/* Bottom overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Inner content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 'var(--page-max)', margin: '0 auto',
          padding: '56px var(--gutter) 40px',
          height: '100%', display: 'grid', gridTemplateRows: '1fr auto',
        }}>
          {/* Headline block */}
          <div className="hero-headline" style={{ alignSelf: 'end' }}>
            <h1
              ref={h1Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(44px, 5.4vw, 92px)',
                lineHeight: 0.96,
                letterSpacing: '-0.02em',
                margin: '0 0 24px',
                color: '#fff',
                textWrap: 'balance',
              }}
            >
              Embroidered tees,<br/>
              by the <em style={{ fontStyle: 'italic', color: '#ffd0d8' }}>worst</em> hands<br/>
              in the business.
            </h1>
            <p
              ref={heroTagRef}
              style={{ maxWidth: '44ch', fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: '0 0 28px' }}
            >
              A small atelier making heavyweight cotton tees with chain-stitch embroidery,
              run by people too stubborn to print. First drop of four designs, 120 pieces,
              hand-finished and numbered.
            </p>
            <div ref={heroCTARef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" href="#waitlist">Join the waitlist</Link>
              <Link className="btn btn-light" href="/services">Our services</Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div ref={heroBotRef} style={{ color: '#fff', paddingTop: 32 }}>
            <div className="hero-bot-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                Launching · 18 June 2026 · 10:00 GMT
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                Limited to 120 pieces worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== THE FIRST DROP ===== */}
      <section className="section" ref={dropRef} style={{ paddingTop: 80, paddingBottom: 80 }}>
        {/* Drop head */}
        <div className="drop-head">
          <h2 className="h-section" data-reveal style={{ maxWidth: '14ch' }}>
            The first<br/><em>drop</em>.
          </h2>
          <div className="rule" data-reveal>Vol. 01 — June 2026</div>
          <div data-reveal style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)', textAlign: 'right' }}>
            Four designs.<br/>
            <strong style={{ display: 'block', fontFamily: 'var(--font-display)', color: 'var(--color-ink)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', marginTop: 6 }}>120 / 120</strong>
            <span style={{ display: 'block', marginTop: 4 }}>reserved units</span>
          </div>
        </div>

        {/* Product grid */}
        <div className="drop-grid">
          {LOCKED_CARDS.map((card) => (
            <div key={card.no} className="product locked" data-reveal role="group" aria-label={`No. ${card.no} — releasing soon`}>
              <div className={`ph ${card.tone}`} style={{ aspectRatio: '4/5' }}>
                <span className="lock-tag"><span className="pulse" />Releasing soon</span>
                <div className="lock-body">
                  <div className="lock-no"><em>No.</em> {card.no}</div>
                  <div className="lock-sub">Vol. 01 · TBA</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future frame */}
        <FutureFrame />

        {/* CTA */}
        <div data-reveal style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <Link className="btn btn-ghost" href="#waitlist">Reserve a piece →</Link>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section
        ref={manifestoRef}
        style={{ background: '#15140f' }}
      >
        <div className="manifesto-inner">
          <div
            className="ph photo"
            style={{
              aspectRatio: '4/5',
              backgroundImage: 'url(/assets/founders.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          <div>
            <div className="eyebrow" data-reveal style={{ marginBottom: 24 }}>A note from the founder</div>
            <h2
              data-reveal
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(40px,5.4vw,84px)', lineHeight: 0.98,
                letterSpacing: '-0.02em', margin: '0 0 28px', textWrap: 'balance',
              }}
            >
              We started a clothing<br/>brand on a <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>bad bet.</em>
            </h2>
            <p data-reveal style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '52ch', marginBottom: 16 }}>
              The bet was this: that in a world drowning in printed tees, twelve people
              would care about a shirt stitched by a hand they could write back to. Eight
              months later, we have a studio in Goa, three machines older than I am, and
              a wall of failed samples we cannot bear to throw out.
            </p>
            <p data-reveal style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '52ch' }}>
              Every piece is chain-stitched on a 240gsm cotton blank, finished with a
              hand-signed tag, and shipped in a recycled cotton wrap. Nothing here is fast.
              Nothing here is cheap. We think you&apos;ll like that.
            </p>
            <div data-reveal style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--color-ink)' }}>
              — Void &amp; Echo, founders
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section" ref={processRef} style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" data-reveal style={{ marginBottom: 18 }}>How we make a tee</div>
            <h2 className="h-section" data-reveal>Stitched,<br/>not <em>printed</em>.</h2>
          </div>
          <p className="lede" data-reveal style={{ maxWidth: '42ch' }}>
            Each piece passes through three pairs of hands before it earns a number and your name on the tag.
          </p>
        </div>

        <div className="process-grid">
          {[
            { num: 'Step 01 — Draft', title: '<em>Drawn</em> on paper.', body: "We start with a pencil sketch and a one-line idea. No mood boards, no AI. If it doesn't survive a week on the studio wall, it doesn't make the drop." },
            { num: 'Step 02 — Stitch', title: 'Set on a <em>Cornely</em>.', body: 'The pattern is transferred to a 240gsm cotton blank and run through a 1953 Cornely chain-stitch machine. Average run time per shirt: 90 minutes.' },
            { num: 'Step 03 — Finish', title: 'Signed, <em>numbered</em>.', body: 'Each shirt is hand-washed, pressed flat, tagged with its number out of 120, and signed by whoever stitched it. Shipped in a recycled cotton wrap.' },
          ].map((step, i) => (
            <div key={i} className="process-step" style={{ opacity: 1 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--color-muted)', textTransform: 'uppercase', paddingBottom: 14, borderBottom: '1px solid var(--color-hairline)', display: 'block', marginBottom: 18 }}>{step.num}</span>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em', fontWeight: 400, margin: '0 0 12px' }}
                dangerouslySetInnerHTML={{ __html: step.title.replace('<em>', '<em style="font-style:italic;color:var(--color-primary)">') }}
              />
              <p style={{ color: 'var(--color-body)', fontSize: 15, lineHeight: 1.55 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WAITLIST ===== */}
      <section
        id="waitlist"
        ref={waitlistRef}
        style={{ background: '#000', color: '#fff' }}
      >
        <div className="waitlist-inner">
          <div>
            <div className="eyebrow" data-reveal style={{ marginBottom: 24, color: 'rgba(255,255,255,0.6)' }}>Vol. 01 reservation</div>
            <h2
              data-reveal
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(40px,5.4vw,80px)', lineHeight: 0.98,
                letterSpacing: '-0.02em', margin: 0, color: '#fff', textWrap: 'balance',
              }}
            >
              Be on the<br/>list for the<br/><em style={{ fontStyle: 'italic', color: '#ffb8c4' }}>first drop.</em>
            </h2>
            <p data-reveal style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6, margin: '20px 0 0', maxWidth: '44ch' }}>
              120 pieces, 4 designs. The waitlist gets first access 24 hours before public release,
              plus a one-page letter from the studio on launch morning. We do not send anything else.
            </p>
          </div>
          <div data-reveal>
            <form
              onSubmit={handleWaitlist}
              style={{
                display: 'flex', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)', borderRadius: 'var(--radius-full)',
                padding: 6, alignItems: 'center',
              }}
            >
              <input
                type="email"
                placeholder="your@email"
                required
                style={{
                  flex: 1, background: 'transparent', border: 0, outline: 0,
                  padding: '14px 18px', color: '#fff',
                  font: '400 15px/1 var(--font-sans)',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ height: 44, padding: '0 22px', borderRadius: 'var(--radius-full)', fontSize: 14 }}
              >
                Reserve
              </button>
            </form>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 18 }}>
              No spam. No marketing emails. One letter, one drop.
            </div>
            <div className="waitlist-stats" style={{ marginTop: 48, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {[['4','designs'],['120','pieces'],['1','letter']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 36, fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 4 }}>{n}</div>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FutureFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mm.matches) return;

    gsap.fromTo(frame,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: frame, start: 'top 90%', once: true } }
    );
  }, []);

  return (
    <div
      ref={frameRef}
      className="future-frame"
      style={{
        position: 'relative', marginTop: 28,
        borderRadius: 2, overflow: 'hidden', isolation: 'isolate',
        cursor: 'not-allowed',
        background: `radial-gradient(120% 80% at 20% 20%, rgba(255,255,255,0.06), transparent 60%),
          linear-gradient(135deg, #1b1b1d 0%, #2a2a2d 50%, #18181a 100%)`,
        border: '1px solid var(--color-hairline)',
        transition: 'transform 520ms cubic-bezier(.22,.61,.36,1), box-shadow 520ms cubic-bezier(.22,.61,.36,1)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 30px 60px -30px rgba(0,0,0,0.45)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
    >
      {/* texture layer */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px),
          radial-gradient(60% 80% at 70% 50%, rgba(217,119,87,0.22), transparent 70%),
          radial-gradient(50% 70% at 30% 60%, rgba(255,255,255,0.05), transparent 70%)`,
        filter: 'blur(14px)', opacity: 0.9, zIndex: 0,
      }} />
      {/* scrim */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)',
        backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', zIndex: 1,
      }} />
      {/* content */}
      <div className="future-frame-body">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block', animation: 'futurePulse 2.4s ease-out infinite' }} />
          Future release · locked
        </div>
        <h3 style={{ alignSelf: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(36px,5.2vw,76px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', maxWidth: '18ch' }}>
          Vol. 02 is on<br/>the <em style={{ color: 'var(--color-primary)' }}>hoop.</em>
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
          {[['Next drop','Winter 2026'],['Pieces','008 / TBA'],['Reveal','Waitlist first']].map(([lbl,val]) => (
            <div key={lbl}>
              {lbl}
              <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: '#fff', letterSpacing: '-0.01em', marginTop: 4 }}>{val}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
