'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Countdown from '@/components/Countdown';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
  { num: 'N° 01', title: 'No <em>prints</em>, ever.', body: "If it can be sublimated or screen-printed, we don't want it on a tee with our name. Chain, satin, or back-stitch — that's the whole alphabet." },
  { num: 'N° 02', title: 'Sign every <em>shirt.</em>', body: "Whoever stitches the final pass also signs the inside tag. The buyer knows the maker; the maker knows the buyer's name." },
  { num: 'N° 03', title: 'Repair, <em>never</em> replace.', body: "Any tee we've made, in any condition, comes back into the studio for restitch or repair, for the rest of our working lives." },
  { num: 'N° 04', title: 'Small <em>on purpose</em>.', body: "We will never employ more than twelve people, never run more than four drops a year, and never make more than 60 pieces of any one design." },
];

const STATS = [
  { big: '<em>4</em>', lab: 'People in the studio' },
  { big: '120', lab: 'Pieces in Vol. 01' },
  { big: '90<small style="font-size:0.4em;opacity:0.7;"> min</small>', lab: 'Avg. stitch time / tee' },
  { big: '<em>1</em>', lab: 'Cornely from 1953' },
];

const TEAM = [
  { name: 'Void', role: 'Co-founder · Pattern', bio: "Designs every motif. Started on her grandmother's hand-frame at seven; switched to a Cornely at twenty-three." },
  { name: 'Echo', role: 'Co-founder · Operations', bio: 'Sources the blanks, runs the books, manages shipping. The only one of us with a working knowledge of GST.' },
  { name: 'Stale', role: 'Lead stitch', bio: 'Twenty-one years on Cornely machines, six of them in Tirupur. The fastest hands in the studio. Signs more than half our tags.' },
  { name: 'Pixel', role: 'Design · Identity', bio: 'Drew the wordmark, runs the website, takes every studio photograph. Came to Goa for a month in 2025 and forgot to go home.' },
];

const PRESS = [
  { src: 'The Voice\nof Fashion', head: '"A studio betting that the future of small fashion isn\'t faster — it\'s <em>slower, signed,</em> and probably from Goa."', date: 'March 2026 — Profile' },
  { src: 'Are.na\nAnnual', head: '"The most-saved channel of the quarter was a folder of <em>Void\'s pencil drafts</em> for a label nobody had heard of."', date: 'Feb 2026 — Editor\'s pick' },
  { src: 'Verve\nMagazine', head: '"If you put Bode and Cottonworld in a kiln, you would <em>almost</em> get The Worst Company — though they would, of course, prefer you didn\'t."', date: 'Jan 2026 — On the radar' },
  { src: 'Mid-day', head: '"Four people, one machine, a wall of mistakes. <em>Goa\'s quietest fashion launch</em> is also its most over-subscribed."', date: 'Dec 2025 — Style desk' },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    gsap.registerPlugin(ScrollTrigger);

    // Global reveals
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 36, filter: 'blur(7px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true } }
      );
    });

    // Hero photo curtain
    if (heroPhotoRef.current && !mm.matches) {
      gsap.fromTo(heroPhotoRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: heroPhotoRef.current, start: 'top 88%', once: true } }
      );
    }

    // Stats count up
    const statEls = statsRef.current?.querySelectorAll<HTMLElement>('.stat .big') ?? [];
    statEls.forEach((el) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    // Values grid stagger
    document.querySelectorAll<HTMLElement>('.value').forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    // Team cards stagger
    document.querySelectorAll<HTMLElement>('.member').forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    // Studio images stagger
    if (studioRef.current) {
      const imgs = studioRef.current.querySelectorAll<HTMLElement>('.ph');
      imgs.forEach((img, i) => {
        if (mm.matches) return;
        gsap.fromTo(img,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0.35 },
          { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.2, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: img, start: 'top 88%', once: true } }
        );
      });
    }

    // Press rows
    document.querySelectorAll<HTMLElement>('.press-row').forEach((el, i) => {
      if (mm.matches) return;
      gsap.fromTo(el,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div ref={pageRef}>
      {/* About hero */}
      <section style={{ position: 'relative', borderBottom: '1px solid var(--color-hairline-soft)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '80px var(--gutter) 0' }}>
          <div className="breadcrumbs" data-reveal>
            <Link href="/">Home</Link> &nbsp;/&nbsp; <span>About</span>
          </div>
          <h1
            data-reveal
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(64px,11vw,200px)', lineHeight: 0.9,
              letterSpacing: '-0.03em', margin: '24px 0 56px', textWrap: 'balance',
            }}
          >
            A small atelier<br/>making <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>slow</em> shirts<br/>in a fast country.
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', paddingBottom: 56 }} className="about-hero-grid">
            <div
              ref={heroPhotoRef}
              className="ph photo"
              style={{ aspectRatio: '3/4', backgroundImage: 'url(/assets/founders.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
            />
            <div>
              <div className="eyebrow" data-reveal style={{ marginBottom: 18 }}>Studio, est. 2025</div>
              <p data-reveal style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '50ch' }}>
                The Worst Company is a four-person embroidery studio at an undisclosed location, started by Void
                and Echo — two friends who&apos;d rather hand-stitch one shirt for a long time than print a thousand for nobody.
              </p>
              <p data-reveal style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6, color: 'var(--color-body)' }}>
                We launch our first ready-to-wear drop on{' '}
                <strong style={{ color: 'var(--color-ink)' }}>18 June 2026</strong>: four embroidered tees,
                one hundred and twenty pieces, all stitched on a 1953 Cornely machine our grandmother used
                to call &quot;the noisy uncle.&quot; This page is here to explain why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pullquote */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '96px var(--gutter)' }}>
        <blockquote data-reveal style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05, letterSpacing: '-0.015em',
          margin: 0, textWrap: 'balance', color: 'var(--color-ink)',
        }}>
          &ldquo;We named ourselves{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-primary)', background: 'linear-gradient(transparent 68%, rgba(255,56,92,0.18) 68%, rgba(255,56,92,0.18) 92%, transparent 92%)', padding: '0 4px' }}>
            The Worst Company
          </em>{' '}
          so the bar was on the floor and we could only go upward. So far, it&apos;s been working — mostly
          because nobody has dared to be worse than us.&rdquo;
        </blockquote>
        <div data-reveal style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          — Void &amp; Echo, founders · letter to a friend, March 2025
        </div>
      </section>

      {/* Story */}
      <section style={{ background: '#15140f' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '120px var(--gutter)', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>
          <div>
            <div className="eyebrow" data-reveal>How it began</div>
            <h2 data-reveal style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '16px 0 0' }}>
              An apology<br/>that became a<br/><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>company.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p data-reveal style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-body)', marginBottom: 14 }}>
                In the autumn of 2024, Rhea botched a wedding-gift shirt for her oldest friend: misspelled
                name, crooked hem, thread snapped on the second wear. She apologised by sending six more —
                each one a little better, each one signed with the date and a small confession of what
                she&apos;d improved.
              </p>
              <p data-reveal style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-body)' }}>
                The seventh shirt was good. The eighth was given away to a stranger on the train to Margao
                because Rhea wanted to see what a person would say when handed a hand-stitched tee for free.
                (The stranger said: &quot;this is the worst gift I&apos;ve ever received, please send me three more.&quot;)
              </p>
            </div>
            <div>
              <p data-reveal style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-body)', marginBottom: 14 }}>
                By early 2025 we were four — Rhea, her cousin Aman, a Cornely operator from Tirupur who goes
                by Stale, and a graphic designer from Lisbon known as Pixel who answered a Craigslist ad. We
                rented a one-room studio above a tile shop in a quiet lane, bought the noisy uncle off a tailor
                in Madurai, and started a list of four shirts that, between us, we thought worth making.
              </p>
              <p data-reveal style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-body)' }}>
                That list became the first drop. It launches on 18 June 2026. You can put your name on it from
                the home page. We promise nothing — except that the shirts will be slow, the thread will be
                real, and the company will, as ever, be the worst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" data-reveal>House rules</div>
            <h2 className="h-section" data-reveal>Four things<br/>we won&apos;t <em>budge</em> on.</h2>
          </div>
          <p className="lede" data-reveal style={{ maxWidth: '42ch' }}>
            We are slow, opinionated, and have made every mistake at least once. These four we&apos;ve stopped making.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, marginTop: 56 }}>
          {VALUES.map((v) => (
            <div key={v.num} className="value" style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>{v.num}</div>
              <h3
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '12px 0 12px', letterSpacing: '-0.01em' }}
                dangerouslySetInnerHTML={{ __html: v.title.replace('<em>', '<em style="font-style:italic;color:var(--color-primary)">') }}
              />
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--color-body)' }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} style={{ background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '80px var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          {STATS.map((stat) => (
            <div key={stat.lab} className="stat">
              <div
                className="big"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px,7vw,112px)', lineHeight: 0.9, letterSpacing: '-0.025em', color: '#fff' }}
                dangerouslySetInnerHTML={{ __html: stat.big.replace('<em>', '<em style="font-style:italic;color:#ffb8c4">') }}
              />
              <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{stat.lab}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio */}
      <section className="section" ref={studioRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" data-reveal>The studio</div>
            <h2 className="h-section" data-reveal>One room,<br/>one machine,<br/><em>seven</em> windows.</h2>
          </div>
          <p className="lede" data-reveal style={{ maxWidth: '42ch' }}>
            A studio at an undisclosed address. Online · open 24/7. Tea always on.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 40 }}>
          <div className="ph photo" style={{ aspectRatio: '3/4', backgroundImage: 'url(/assets/studio.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="ph photo" style={{ aspectRatio: '3/4', backgroundImage: 'url(/assets/hands-at-work.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="ph photo" style={{ aspectRatio: '3/4', backgroundImage: 'url(/assets/thread-wall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="ph photo" style={{ gridColumn: '1/-1', aspectRatio: '16/6', backgroundImage: 'url(/assets/tee-label.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
      </section>

      {/* Team */}
      <section className="section section-tight">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" data-reveal>The four of us</div>
            <h2 className="h-section" data-reveal>Who&apos;s <em>actually</em><br/>stitching.</h2>
          </div>
          <p className="lede" data-reveal style={{ maxWidth: '46ch' }}>
            We keep every face here withheld — the four of us and the founders alike. It&apos;s a small studio
            in a small place, and the people who stitch your shirt have lives, families, and quiet that
            we&apos;d rather not trade for a portrait on a website.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginTop: 40 }}>
          {TEAM.map((m) => (
            <div key={m.name} className="member">
              <div
                style={{
                  aspectRatio: '4/5', marginBottom: 14, borderRadius: 'var(--radius-md)',
                  background: 'radial-gradient(120% 90% at 50% 8%, rgba(255,255,255,0.06), transparent 60%), #15140f',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
                  border: '1px solid var(--color-hairline)',
                }}
                role="img"
                aria-label="Portrait withheld"
              >
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', position: 'relative', marginTop: 8 }}>
                  <div aria-hidden style={{ position: 'absolute', left: '50%', bottom: -34, transform: 'translateX(-50%)', width: 88, height: 56, borderRadius: '9999px 9999px 0 0', background: 'rgba(255,255,255,0.10)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 1, marginTop: 46, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)', border: '1px solid rgba(255,255,255,0.18)', padding: '5px 10px', borderRadius: 999 }}>Identity withheld</div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, lineHeight: 1.1, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{m.name}</h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>{m.role}</div>
              <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, color: 'var(--color-body)' }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="section section-tight">
        <div className="eyebrow" data-reveal style={{ marginBottom: 16 }}>Said about us</div>
        <h2 className="h-section" data-reveal>Press<br/>&amp; <em>mentions.</em></h2>
        <div style={{ borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)', padding: '48px 0', marginTop: 32 }}>
          {PRESS.map((p, i) => (
            <div key={i} className="press-row" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: '28px 0', alignItems: 'center', borderBottom: i < PRESS.length - 1 ? '1px solid var(--color-hairline-soft)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, letterSpacing: '-0.01em', whiteSpace: 'pre-line' }}>{p.src}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.25, color: 'var(--color-body)' }} dangerouslySetInnerHTML={{ __html: p.head.replace(/<em>/g, '<em style="color:var(--color-primary);font-style:italic">') }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)', marginTop: 4 }}>{p.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section section-tight">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" data-reveal>Get in touch</div>
            <h2 data-reveal style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '16px 0 0' }}>
              Write to us.<br/>We <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>write back.</em>
            </h2>
            <p className="lede" data-reveal style={{ marginTop: 20 }}>
              One inbox, one human reading it (usually Aman, sometimes Rhea on Sundays). Average reply time: a day and a half.
            </p>
          </div>
          <div data-reveal style={{ background: '#15140f', borderRadius: 'var(--radius-lg)', padding: 40 }}>
            {[
              { lbl: 'Email', name: 'founder@theworstcompany.in', href: 'mailto:founder@theworstcompany.in', desc: 'For everything — orders, press, hellos, complaints, marriage proposals.' },
              { lbl: 'Call', name: '+91 99718 13098', href: 'tel:+919971813098', desc: "Studio line. We'll usually let it ring twice while we get off a machine." },
            ].map((item) => (
              <div key={item.lbl} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, padding: '24px 0', borderBottom: '1px solid var(--color-hairline)', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)', paddingTop: 6 }}>{item.lbl}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, margin: '0 0 4px' }}>
                    <a href={item.href} style={{ color: 'var(--color-ink)', borderBottom: '1px solid var(--color-primary)' }}>{item.name}</a>
                  </h4>
                  <p style={{ color: 'var(--color-body)', fontSize: 15, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown strip */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center', padding: '64px 0', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)' }}>
          <div>
            <div className="eyebrow" data-reveal style={{ marginBottom: 18 }}>Vol. 01 — The Stitch Issue</div>
            <h2 className="h-section" data-reveal>Launching<br/>18 <em>June</em> 2026.</h2>
          </div>
          <Countdown />
        </div>
      </section>
    </div>
  );
}
