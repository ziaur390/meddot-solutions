/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { ArrowUpRight, Mail } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand">
        <a href="/" className="brand-logo footer-logo" aria-label="Meddot Solutions home"><img src="/meddot-logo.png" alt="Meddot Solutions" /></a>
        <p>Medical billing and practical support for independent U.S. practices.</p>
        <a className="footer-direct-email" href="mailto:ziaurrahman.26261@gmail.com"><Mail size={17}/> Email Meddot</a>
      </div>
      <div className="footer-links"><h2>Explore</h2><a href="/services/revenue-operations">Revenue operations</a><a href="/services/digital-growth">Digital growth</a><a href="/services/healthcare-ai">Healthcare AI</a></div>
      <div className="footer-links"><h2>Company</h2><a href="/how-we-work">How we work</a><a href="/about">About Meddot</a><a href="/contact">Contact</a></div>
      <div className="footer-contact"><span>LET’S START A CONVERSATION</span><h2>Build a stronger practice, together.</h2><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Meddot Solutions</span><span>Serving practices across the U.S.</span></div>
  </footer>;
}
