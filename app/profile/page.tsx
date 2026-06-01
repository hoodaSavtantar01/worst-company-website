'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProfilePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    gsap.registerPlugin(ScrollTrigger);

    if (!mm.matches) {
      // Hero entrance
      const heroEls = heroRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
      heroEls.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.1 + i * 0.12 }
        );
      });

      // Card entrance
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.35 }
        );
      }

      // Email mock
      const emailEl = document.querySelector<HTMLElement>('.email-mock');
      if (emailEl) {
        gsap.fromTo(emailEl,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: emailEl, start: 'top 85%', once: true } }
        );
      }
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div ref={pageRef}>
      {/* Announcement */}
      <div className="announce">
        Free shipping on the first drop · Reserved buyers <span className="pill">VOL.01</span>
      </div>

      {/* Hero + signup */}
      <section className="profile-hero">
        <div ref={heroRef}>
          <div data-reveal style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block', animation: 'futurePulse 2.4s ease-out infinite' }} />
            Vol. 01 · Reveal soon
          </div>
          <h1
            data-reveal
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(56px,9vw,128px)', lineHeight: 0.92,
              letterSpacing: '-0.025em', color: 'var(--color-ink)', textWrap: 'balance',
            }}
          >
            The drawer<br/>opens at the<br/><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>reveal.</em>
          </h1>
          <p data-reveal style={{ marginTop: 28, font: '400 18px/1.55 var(--font-sans)', color: 'var(--color-muted)', maxWidth: '46ch' }}>
            Four hand-stitched tees, hours and hours on a 1953 Cornely, and one quiet morning when we hit send.
            Sign up below and we&apos;ll write to you the moment the shirts are revealed — once, from a real inbox,
            no marketing after.
          </p>
          <div data-reveal style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 28, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
            {[['Designs','04'],['Pieces','120'],['Reveal','Soon'],['Notice','One email']].map(([lbl,val]) => (
              <div key={lbl}>
                {lbl}
                <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--color-ink)', letterSpacing: '-0.01em', marginTop: 4 }}>{val}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Signup card */}
        <aside ref={cardRef} className="profile-card">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', marginBottom: 8 }}>
            Be on the <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>list.</em>
          </h2>
          <p style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--color-muted)', marginBottom: 28 }}>
            One email, one moment. We&apos;ll let you know the second the shirts go live — and you&apos;ll get a 24-hour head start over the public.
          </p>

          {submitted ? (
            <div style={{ background: 'rgba(42,122,58,0.08)', border: '1px solid rgba(42,122,58,0.25)', borderRadius: 2, padding: '18px 20px', color: '#1f5a2a', font: '400 13px/1.5 var(--font-sans)' }}>
              <strong style={{ color: '#134a1d' }}>You&apos;re on the list.</strong> Watch your inbox for an email from{' '}
              <em>founder@theworstcompany.in</em> on reveal morning — sample preview below.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>Your name</label>
                <input
                  name="name" type="text" placeholder="First and last" required
                  style={{ width: '100%', height: 48, padding: '0 16px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', borderRadius: 2, font: '400 15px/1 var(--font-sans)', color: 'var(--color-ink)', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-ink)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>Email address</label>
                <input
                  name="email" type="email" placeholder="you@somewhere.com" required
                  style={{ width: '100%', height: 48, padding: '0 16px', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', borderRadius: 2, font: '400 15px/1 var(--font-sans)', color: 'var(--color-ink)', outline: 'none' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-ink)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, font: '400 12px/1.5 var(--font-sans)', color: 'var(--color-muted)', margin: '8px 0 4px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: 'var(--color-primary)' }} />
                <span>I&apos;d like one reveal-day email from The Worst Company. Nothing else.</span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', height: 52, borderRadius: 2, fontSize: 14, letterSpacing: '0.02em', background: 'var(--color-primary)' }}
              >
                {submitting ? 'Adding you to the list…' : 'Notify me at reveal →'}
              </button>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                No marketing · No partners · Unsubscribe in one click
              </div>
            </form>
          )}
        </aside>
      </section>

      {/* Email preview */}
      <section style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '32px var(--gutter) 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block', animation: 'futurePulse 2.4s ease-out infinite' }} />
              The notification
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(38px,5vw,64px)', lineHeight: 0.98, letterSpacing: '-0.02em', color: '#f4f4f1' }}>
              What you&apos;ll<br/>find in your <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>inbox.</em>
            </h2>
          </div>
          <p style={{ font: '400 15px/1.55 var(--font-sans)', color: 'var(--color-muted)', maxWidth: '42ch' }}>
            Plain text, plain English, on real letterhead. Sent the morning the shirts go live — and only that morning.
          </p>
        </div>

        {/* Email mock */}
        <article
          className="email-mock"
          aria-label="Sample reveal-day email"
          style={{ border: '1px solid rgba(0,0,0,0.10)', borderRadius: 6, overflow: 'hidden', background: '#fffefb', boxShadow: '0 24px 60px -32px rgba(0,0,0,0.18)' }}
        >
          {/* Client bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#f1efea', borderBottom: '1px solid rgba(0,0,0,0.10)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a72' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#d6d2cb','#d6d2cb','#d6d2cb'].map((c,i) => <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
            </div>
            Inbox · Reveal morning · 1 new
          </div>

          {/* Meta */}
          <div style={{ padding: '24px 32px 0', display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: 6, columnGap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a72', borderBottom: '1px solid rgba(0,0,0,0.10)', paddingBottom: 20 }}>
            {[
              ['From', <span key="from" style={{ color: '#1a1a1a', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}><strong>The Worst Company</strong> &lt;founder@theworstcompany.in&gt;</span>],
              ['To', <span key="to" style={{ color: '#1a1a1a', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>you@somewhere.com</span>],
              ['Subject', <span key="sub" style={{ color: '#1a1a1a', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}><em style={{ color: 'var(--color-primary)', fontStyle: 'normal' }}>Vol. 01 is live</em> — your 24-hour head start starts now.</span>],
              ['Date', <span key="date" style={{ color: '#1a1a1a', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>Reveal morning · 09:00 IST</span>],
            ].map(([lbl, val]) => (
              <>
                <div key={String(lbl)}>{lbl}</div>
                <div>{val}</div>
              </>
            ))}
          </div>

          {/* Body */}
          <div style={{ background: '#fffefb' }}>
            {/* Letterhead */}
            <div style={{ padding: '36px 48px 28px', borderBottom: '1px solid rgba(0,0,0,0.10)', display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, lineHeight: 1, letterSpacing: '-0.01em', color: '#1a1a1a' }}>
                The <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Worst</em> Company
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7a7a72', marginLeft: 14 }}>EMB · est. 2025</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7a7a72', textAlign: 'right', lineHeight: 1.6 }}>
                <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: '#1a1a1a', letterSpacing: 0, textTransform: 'none' }}>Letter N° 01</strong>
                Reveal day · Vol. 01
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px 48px 36px', font: '400 15px/1.65 var(--font-sans)', color: '#2a2a2a' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: 22, maxWidth: '22ch' }}>
                The shirts are<br/><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>finally</em> here.
              </h3>
              <p style={{ marginBottom: 18 }}>Hello —</p>
              <p style={{ marginBottom: 18 }}>
                You signed up some time ago, on a quieter day, and we&apos;ve been carrying your email around ever since.
                This morning, the first four shirts of Vol. 01 went live on the site. There are one hundred and twenty
                pieces, all stitched on the noisy uncle, all signed and numbered.
              </p>
              <p style={{ marginBottom: 18 }}>
                You have the next <strong>twenty-four hours</strong> to look, choose, and reserve before we open the
                doors to the public. After that, what&apos;s left is what&apos;s left.
              </p>
              <p style={{ marginBottom: 18 }}>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', font: '500 14px/1 var(--font-sans)', letterSpacing: '0.02em', borderRadius: 2, margin: '14px 0 10px' }}>
                  See Vol. 01 →
                </a>
              </p>
              <p style={{ marginBottom: 18 }}>
                As promised: this is the only email we owe you. If you&apos;d like a second one when Vol. 02 is ready,
                you can stay on the list at the bottom of this letter. Otherwise, one click and we&apos;ll quietly
                forget your address.
              </p>
              <p>Thank you for waiting. We hope a shirt finds you.</p>
              <div style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, color: '#1a1a1a' }}>— Void &amp; Echo</div>
              <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7a7a72' }}>Founders · The Worst Company</div>
            </div>

            {/* Footer */}
            <div style={{ padding: '24px 48px 32px', borderTop: '1px solid rgba(0,0,0,0.10)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', background: '#f8f6f1', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a72', lineHeight: 1.7 }}>
              <div>
                The Worst Company · Studio at an undisclosed address<br/>
                You&apos;re receiving this because you signed up for the reveal of Vol. 01.<br/>
                <a href="#" style={{ color: '#7a7a72', textDecoration: 'underline' }}>Stay on for Vol. 02</a> &nbsp;·&nbsp; <a href="#" style={{ color: '#7a7a72', textDecoration: 'underline' }}>Unsubscribe</a>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: '#1a1a1a', textTransform: 'none', letterSpacing: 0 }}>founder@theworstcompany.in</strong>
                © 2026 The Worst Co.
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
