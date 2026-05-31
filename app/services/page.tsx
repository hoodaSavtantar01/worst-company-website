'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    num: 'S / 01',
    title: 'Bespoke <em>monogram</em>.',
    body: 'Initials, a wordmark, a date. Stitched in satin or chain on the chest, sleeve, or hem of a tee, sweat, or jacket you bring us. The most-asked, the least-expensive, the easiest to ruin.',
    chips: ['Bring your own garment', 'Up to 6 characters', '2 weeks'],
    price: '₹3,200',
    priceLabel: 'per garment',
    cta: 'Book a slot →',
    tone: 'ivory',
  },
  {
    num: 'S / 02',
    title: 'Made-to-order <em>drop tees</em>.',
    body: "Want one of the four drop pieces in a size or thread color we didn't make? Pre-pay and we'll add it to the next stitching round. Same chain-stitch, same heavyweight cotton, signed and numbered in continuation.",
    chips: ['XS – 3XL', '3 thread variants', '5 – 6 weeks'],
    price: '₹7,400',
    priceLabel: 'per tee',
    cta: 'Request a size →',
    tone: 'dark',
  },
  {
    num: 'S / 03',
    title: 'Repair &amp; <em>restitch</em>.',
    body: "Send us a tee you've worn until it threadbares — ours or anyone else's — and we'll patch, restitch, or embroider over the damage. Most jobs come back better than new and meaningfully worse than they started.",
    chips: ['All garments welcome', 'Pay-what-it\'s-worth', '3 – 4 weeks'],
    price: '₹800',
    priceLabel: 'from',
    cta: 'Send a piece →',
    tone: '',
  },
];

const TIMELINE = [
  { week: 'Day 0 · Mon', title: 'Order in', body: 'You reserve a piece or send us a garment. We confirm size, thread, and any letters within a day.' },
  { week: 'Week 1 · Wed', title: 'Thread sampling', body: 'We run a test stitch on offcut cotton so you can see tension and color before we commit.' },
  { week: 'Week 2 · Sat', title: 'On the Cornely', body: 'Final stitch. Between sixty and one-eighty minutes on the noisy uncle, photographed at each pass.', accent: true },
  { week: 'Week 3 · Thu', title: 'Wash & press', body: 'Hand-washed in cold, line-dried, pressed flat. Every imperfection given a last chance to behave.' },
  { week: 'Week 4 · Mon', title: 'Sign & ship', body: 'Tagged with its number, signed by the stitcher, wrapped in recycled cotton with a one-page note.' },
];

const FAQS = [
  { q: 'How many of each design do you make?', a: "Every design is unique and extremely rare — stitched in tiny, numbered runs and never reprinted or restocked. Once a piece is gone, it's gone for good, so choose from the current collection while it's still on the hoop." },
  { q: 'Will two of the same design look identical?', a: "No. Each piece is hand-stitched on a 1953 Cornely machine, so the tension, thread, and the occasional honest wobble differ every single time. Yours will sit a little apart from the photo — that's exactly the point." },
  { q: 'How do I pick the right size?', a: 'Our tees are a boxy, dropped-shoulder cut on 240gsm cotton, XS – 3XL. The pre-shrunk fabric loses about 3% in the first wash and we cut for it — size up if you like a little more room.' },
  { q: "Can I return a piece if I change my mind?", a: "We don't take returns — every piece is unique and made in a tiny run, so we can't resell it. But if a piece reaches you faulty or we've made a mistake on our end, we'll stitch you a replacement at no cost." },
  { q: 'Can I visit the studio?', a: "No. The studio's location is anonymous and we don't take visitors. Write or call instead — the website is open 24/7." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    gsap.to(body, { height: open ? 'auto' : 0, duration: 0.4, ease: 'power2.inOut' });
  }, [open]);

  return (
    <div style={{ borderTop: '1px solid var(--color-hairline)', padding: '24px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none', border: 0, padding: 0, cursor: 'pointer', width: '100%',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
          fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.2,
          letterSpacing: '-0.01em', color: 'var(--color-ink)', textAlign: 'left',
        }}
      >
        {q}
        <span style={{ fontSize: 24, color: open ? 'var(--color-primary)' : 'var(--color-muted)', transition: 'transform 0.25s ease, color 0.25s ease', transform: open ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden' }}>
        <p style={{ marginTop: 14, color: 'var(--color-body)', maxWidth: '60ch', fontSize: 15, lineHeight: 1.6, paddingBottom: 8 }}>{a}</p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mm.matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal all data-reveal elements
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 36, filter: 'blur(7px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true } }
        );
      });

      // Timeline nodes stagger
      const steps = timelineRef.current?.querySelectorAll<HTMLElement>('.tl-step') ?? [];
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: step, start: 'top 90%', once: true } }
        );
        // Animate the dot
        const dot = step.querySelector<HTMLElement>('::before') || step;
        gsap.fromTo(dot,
          { scale: 0 },
          { scale: 1, duration: 0.4, ease: 'back.out(2)', delay: i * 0.1 + 0.2,
            scrollTrigger: { trigger: step, start: 'top 90%', once: true } }
        );
      });

      // Service rows
      document.querySelectorAll<HTMLElement>('.svc-row').forEach((row) => {
        const children = row.querySelectorAll<HTMLElement>('.svc-copy, .svc-img');
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: row, start: 'top 85%', once: true } }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Page hero */}
      <section style={{ borderBottom: '1px solid var(--color-hairline-soft)', background: 'var(--color-surface-soft)' }}>
        <div style={{
          maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px var(--gutter) 80px',
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'end',
        }} className="page-hero-inner">
          <div>
            <div className="breadcrumbs" data-reveal>
              <Link href="/">Home</Link> &nbsp;/&nbsp; <span>Services</span>
            </div>
            <h1
              data-reveal
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(56px,8vw,128px)', lineHeight: 0.92,
                letterSpacing: '-0.025em', margin: '24px 0 0', textWrap: 'balance',
              }}
            >
              What we&apos;ll<br/>stitch for <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>you.</em>
            </h1>
          </div>
          <div>
            <p className="lede" data-reveal style={{ marginTop: 20 }}>
              Beyond the seasonal drop, the atelier takes on a small slate of added-on work —
              monograms, made-to-order sizes, and repair. Below is what we make and what it costs.
            </p>
            <div data-reveal style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="chip"><span className="dot" />Booking June onward</span>
              <span className="chip">4 – 6 week turnaround</span>
              <span className="chip">Goa-based</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services list — locked */}
      <section className="section" style={{ position: 'relative', paddingTop: 0, paddingBottom: 0 }}>
        {SERVICES.map((svc) => (
          <div key={svc.num} className="svc-row" style={{
            display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48,
            alignItems: 'stretch', padding: '56px 0',
            borderBottom: '1px solid var(--color-hairline)',
          }}>
            <div className="svc-copy" style={{ filter: 'blur(6px) saturate(85%)', opacity: 0.55, userSelect: 'none', pointerEvents: 'none' }}>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(36px,4.4vw,64px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '0 0 16px', textWrap: 'balance' }}
                dangerouslySetInnerHTML={{ __html: svc.title.replace('<em>', '<em style="font-style:italic;color:var(--color-primary)">') }}
              />
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '48ch', margin: '0 0 20px' }}>{svc.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                {svc.chips.map(c => <span key={c} className="chip" style={{ background: 'transparent', border: '1px solid var(--color-hairline)' }}>{c}</span>)}
              </div>
              <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                  {svc.price}<small style={{ fontFamily: 'var(--font-mono)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)', marginLeft: 4 }}>{svc.priceLabel}</small>
                </div>
                <a className="btn btn-ghost" href="#enquire">{svc.cta}</a>
              </div>
            </div>
            <div className="svc-img" style={{ filter: 'blur(6px) saturate(85%)', opacity: 0.55, userSelect: 'none', pointerEvents: 'none' }}>
              <div className={`ph ${svc.tone}`} style={{ aspectRatio: '5/4', height: '100%' }} />
            </div>
          </div>
        ))}

        {/* Lock overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', gap: 18, padding: 24,
          background: 'linear-gradient(180deg, rgba(11,11,12,0.35) 0%, rgba(11,11,12,0.65) 50%, rgba(11,11,12,0.35) 100%)',
          backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', zIndex: 2,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px',
            background: 'rgba(0,0,0,0.78)', color: '#fff', borderRadius: 999,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block', animation: 'futurePulse 2.4s ease-out infinite' }} />
            Revealing soon
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic',
            fontSize: 'clamp(34px,5vw,64px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--color-ink)', maxWidth: '18ch',
          }}>
            Services open<br/>after the <em style={{ color: 'var(--color-primary)' }}>reveal.</em>
          </h3>
          <p style={{ font: '400 15px/1.5 var(--font-sans)', color: 'var(--color-muted)', maxWidth: '44ch' }}>
            Monogram, made-to-order and repair all go live the morning the shirts do. Get on the list and we&apos;ll write to you.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#15140f' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px var(--gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 56 }}>
            <div>
              <div className="eyebrow" data-reveal>From order to doorstep</div>
              <h2
                data-reveal
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,72px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '16px 0 0' }}
              >
                How a <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>piece</em><br/>reaches you.
              </h2>
            </div>
            <p className="lede" data-reveal>
              We are slow on purpose. Every monogram, made-to-order tee, or repair passes through
              five rooms of the studio before it earns a postage stamp.
            </p>
          </div>
          <div
            ref={timelineRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 32, position: 'relative' }}
          >
            {/* Horizontal line */}
            <div aria-hidden style={{ position: 'absolute', top: 24, left: 0, right: 0, height: 1, background: 'var(--color-hairline)' }} />
            {TIMELINE.map((step) => (
              <div key={step.week} className="tl-step" style={{ position: 'relative', paddingTop: 56 }}>
                {/* Dot */}
                <div aria-hidden style={{
                  position: 'absolute', top: 20, left: 0,
                  width: 9, height: 9, borderRadius: '50%',
                  background: step.accent ? 'var(--color-primary)' : '#000',
                  border: `1px solid ${step.accent ? 'var(--color-primary)' : 'var(--color-hairline)'}`,
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 8 }}>{step.week}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, lineHeight: 1.1, margin: '0 0 6px' }}>{step.title}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--color-body)', margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64 }} className="faq-grid">
          <div>
            <div className="eyebrow" data-reveal style={{ marginBottom: 16 }}>Things people ask</div>
            <h2 className="h-section" data-reveal>Frequently<br/><em>worried</em> about.</h2>
            <p className="lede" data-reveal style={{ marginTop: 20 }}>
              If your worry isn&apos;t here, write to us at{' '}
              <a href="mailto:founder@theworstcompany.in" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                founder@theworstcompany.in
              </a>{' '}
              and we&apos;ll answer in a day or two.
            </p>
          </div>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
            <div style={{ borderBottom: '1px solid var(--color-hairline)' }} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="enquire" style={{ background: 'var(--color-primary)', color: '#fff' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '120px var(--gutter)', textAlign: 'center' }}>
          <div className="eyebrow" data-reveal style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 20, justifyContent: 'center', display: 'inline-flex' }}>
            Booking from 18 June
          </div>
          <h2
            data-reveal
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(48px,7vw,112px)', lineHeight: 0.95, letterSpacing: '-0.025em', margin: '0 0 24px', color: '#fff', textWrap: 'balance' }}
          >
            Place an order,<br/>send a <em style={{ fontStyle: 'italic', color: '#2a0d12' }}>question.</em>
          </h2>
          <p data-reveal style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: '50ch', margin: '0 auto 32px', lineHeight: 1.55 }}>
            One short note from you, one short reply from us. The studio inbox is read by a human, usually on the same day.
          </p>
          <div data-reveal style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-light" href="mailto:founder@theworstcompany.in">Email the studio</a>
            <Link className="btn" href="/about" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>Read about us →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
