/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
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
      <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={23}/></summary><nav className="mobile-nav" aria-label="Mobile navigation"><details className="mobile-services"><summary aria-label="Services">Services <ChevronDown size={17}/></summary><div className="mobile-services-content"><a className="mobile-group-title" href="/services/revenue-operations">Revenue operations</a>{revenueLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a className="mobile-group-title" href="/services/digital-growth">Digital growth</a>{digitalLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a className="mobile-group-title" href="/services/healthcare-ai">Healthcare AI · In development</a></div></details><a href="/how-we-work">How we work</a><a href="/about">About</a><a href="/contact">Contact</a><a className="mobile-nav-cta" href="/contact">Request a consultation <ArrowUpRight size={16}/></a></nav></details>
    </div>
  </div></header>;
}
