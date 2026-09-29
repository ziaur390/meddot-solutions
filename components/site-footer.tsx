/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { ArrowUpRight, MapPin, UsersRound, Camera } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand">
        <a href="/" className="brand-logo footer-logo" aria-label="Meddot Solutions home"><img src="/meddot-logo.png" alt="Meddot Solutions" /></a>
        <p>Practical support for the business side of care.</p>
        <div className="footer-presence"><MapPin size={17}/><span>New York, NY <small>Sample location · to be confirmed</small></span></div>
        <div className="footer-socials" aria-label="Social profiles being prepared"><span><UsersRound size={17}/> LinkedIn <small>Coming soon</small></span><span><Camera size={17}/> Instagram <small>Coming soon</small></span></div>
      </div>
      <div className="footer-links"><h2>Explore</h2><a href="/services/revenue-operations">Revenue operations</a><a href="/services/digital-growth">Digital growth</a><a href="/services/healthcare-ai">Healthcare AI</a></div>
      <div className="footer-links"><h2>Company</h2><a href="/how-we-work">How we work</a><a href="/about">About Meddot</a><a href="/contact">Contact</a></div>
      <div className="footer-contact"><span>LET’S START A CONVERSATION</span><h2>Build a stronger practice, together.</h2><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Meddot Solutions</span><span>Location and social profiles are draft placeholders.</span></div>
  </footer>;
}
