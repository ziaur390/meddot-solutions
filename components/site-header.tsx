/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { digitalServices, revenueNames } from "@/lib/service-content";

const revenueLinks = Object.entries(revenueNames).map(([slug, label]) => ({ href: `/services/revenue-operations/${slug}`, label }));
const digitalLinks = Object.entries(digitalServices).map(([slug, service]) => ({ href: `/services/digital-growth/${slug}`, label: service.name }));

function ServiceLinks({ group, overviewHref, links }: { group: string; overviewHref: string; links: { href: string; label: string }[] }) {
  return <div className="menu-group"><a className="menu-group-title" href={overviewHref}>{group} <ArrowUpRight size={15}/></a><div className="menu-link-list">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div></div>;
}

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner">
    <a href="/" aria-label="Meddot Solutions home" className="brand-logo"><img src="/meddot-logo.png" alt="Meddot Solutions" /></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      <details className="services-menu"><summary>Services <ChevronDown size={16} strokeWidth={2}/></summary><div className="services-dropdown"><div className="services-menu-heading"><div><strong>Explore services</strong><p>Find focused support for your practice.</p></div><a href="/contact">Discuss your needs <ArrowUpRight size={16}/></a></div><div className="services-menu-grid"><ServiceLinks group="Revenue operations" overviewHref="/services/revenue-operations" links={revenueLinks}/><ServiceLinks group="Digital growth" overviewHref="/services/digital-growth" links={digitalLinks}/></div><a className="menu-ai-link" href="/services/healthcare-ai"><span>Healthcare AI <small>In development</small></span><ArrowUpRight size={17}/></a></div></details>
      <a href="/how-we-work">How we work</a><a href="/about">About</a>
    </nav>
    <div className="header-actions"><a className="button button-navy header-cta" href="/contact">Request a consultation <ArrowUpRight size={16} strokeWidth={2}/></a>
      <details className="mobile-menu"><summary><span>Menu</span><Menu className="menu-open-icon" size={22}/><X className="menu-close-icon" size={22}/></summary><nav className="mobile-nav" aria-label="Mobile navigation"><a href="/services/revenue-operations">Medical billing &amp; revenue <ArrowUpRight size={17}/></a><a href="/services/digital-growth">Digital growth <ArrowUpRight size={17}/></a><a href="/services/healthcare-ai">Healthcare AI <small>In development</small></a><details className="mobile-services"><summary>Explore individual services <ChevronDown size={17}/></summary><div className="mobile-services-content"><p>Revenue operations</p>{revenueLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<p>Digital growth</p>{digitalLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div></details><a href="/how-we-work">How we work</a><a href="/about">About</a><a className="mobile-nav-cta" href="/contact">Request a consultation <ArrowUpRight size={16}/></a></nav></details>
    </div>
  </div></header>;
}
