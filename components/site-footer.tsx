/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { ArrowUpRight, Mail } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand">
        <a href="/" className="brand-logo footer-logo" aria-label="Meddot Solutions home"><img src="/meddot-logo.png" alt="Meddot Solutions" /></a>
        <p>Medical billing and practical support for independent U.S. practices.</p>
        <a className="footer-direct-email" href="mailto:ziaurrahman.26261@gmail.com"><Mail size={17}/> Email Meddot</a>
        <nav className="footer-socials" aria-label="Meddot Solutions social profiles">
          <a href="https://x.com/MeddotSolution" target="_blank" rel="noopener noreferrer" aria-label="Meddot Solutions on X"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"/></svg><span>X</span></a>
          <a href="https://www.instagram.com/meddotsolutions/" target="_blank" rel="noopener noreferrer" aria-label="Meddot Solutions on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.7" r="1.2" fill="currentColor"/></svg><span>Instagram</span></a>
          <a href="https://web.facebook.com/profile.php?id=61594681335314" target="_blank" rel="noopener noreferrer" aria-label="Meddot Solutions on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8z"/><path fill="currentColor" d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22m0 2a9 9 0 1 1 0 18 9 9 0 0 1 0-18"/></svg><span>Facebook</span></a>
          <a href="https://www.linkedin.com/company/meddot-solutions/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="Meddot Solutions on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52M7.93 18.45H4.96V9.02h2.97zm-1.49-10.7a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44m12.58 10.7h-2.97v-4.59c0-1.09-.02-2.5-1.53-2.5-1.54 0-1.78 1.2-1.78 2.42v4.67H9.77V9.02h2.85v1.29h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58z"/></svg><span>LinkedIn</span></a>
        </nav>
      </div>
      <div className="footer-links"><h2>Explore</h2><a href="/services/revenue-operations">Revenue operations</a><a href="/services/digital-growth">Digital growth</a><a href="/services/healthcare-ai">Healthcare AI</a></div>
      <div className="footer-links"><h2>Company</h2><a href="/how-we-work">How we work</a><a href="/about">About Meddot</a><a href="/contact">Contact</a></div>
      <div className="footer-contact"><span>LET’S START A CONVERSATION</span><h2>Build a stronger practice, together.</h2><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Meddot Solutions</span><span>Serving practices across the U.S.</span></div>
  </footer>;
}
