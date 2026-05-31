import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-mark">
              The <em>Worst</em><br/>Company.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
              Studio · Anonymous<br/>
              Online · Open 24/7
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <Link href="/">The First Drop</Link>
            <Link href="/services">Services</Link>
            <a href="#">Lookbook (soon)</a>
            <a href="#">Care &amp; repair</a>
          </div>
          <div>
            <h4>Studio</h4>
            <Link href="/about">About</Link>
            <Link href="/about">Founder note</Link>
            <Link href="/services">Services</Link>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <a href="https://www.instagram.com/theworstcompany.in/" target="_blank" rel="noopener">Instagram</a>
            <a href="#">Are.na</a>
            <a href="#">Substack</a>
            <a href="mailto:founder@theworstcompany.in">founder@theworstcompany.in</a>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 The Worst Company · All rights almost reserved</div>
          <div>India · INR ₹</div>
        </div>
      </div>
    </footer>
  );
}
