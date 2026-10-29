"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native links and logo rendering are intentional in Sites. */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { digitalServices, revenueNames } from "@/lib/service-content";

const revenueLinks = Object.entries(revenueNames).map(([slug, label]) => ({ href: `/services/revenue-operations/${slug}`, label }));
const digitalLinks = Object.entries(digitalServices).map(([slug, service]) => ({ href: `/services/digital-growth/${slug}`, label: service.name }));

function ServiceLinks({ group, overviewHref, links, pathname }: { group: string; overviewHref: string; links: { href: string; label: string }[]; pathname: string | null }) {
  return <div className="menu-group">
    <a className="menu-group-title" href={overviewHref} aria-current={pathname === overviewHref ? "page" : undefined} data-active={pathname?.startsWith(overviewHref) || undefined}>{group} <ArrowUpRight size={15} aria-hidden="true" /></a>
    <div className="menu-link-list">{links.map(link => <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</a>)}</div>
  </div>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const desktopMenuRef = useRef<HTMLDetailsElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  function closeMenus() {
    if (desktopMenuRef.current) desktopMenuRef.current.open = false;
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
      mobileMenuRef.current.querySelectorAll("details[open]").forEach(detail => detail.removeAttribute("open"));
    }
  }

  useEffect(() => {
    const header = headerRef.current;
    const desktopMenu = desktopMenuRef.current;
    const mobileMenu = mobileMenuRef.current;
    if (!header || !desktopMenu || !mobileMenu) return;

    const closeAll = () => {
      desktopMenu.open = false;
      mobileMenu.open = false;
      mobileMenu.querySelectorAll("details[open]").forEach(detail => detail.removeAttribute("open"));
    };
    const onOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.contains(event.target)) closeAll();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || (!desktopMenu.open && !mobileMenu.open)) return;
      const openMenu = mobileMenu.open ? mobileMenu : desktopMenu;
      event.preventDefault();
      closeAll();
      openMenu.querySelector("summary")?.focus();
    };
    const breakpoint = window.matchMedia("(min-width: 801px)");
    const onBreakpointChange = () => closeAll();

    document.addEventListener("pointerdown", onOutsidePointer);
    document.addEventListener("keydown", onEscape);
    breakpoint.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.removeEventListener("keydown", onEscape);
      breakpoint.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return <header className="site-header" ref={headerRef} onClickCapture={event => {
    if (event.target instanceof Element && event.target.closest("a[href]")) closeMenus();
  }}><div className="container header-inner">
    <a href="/" aria-label="Meddot Solutions home" aria-current={pathname === "/" ? "page" : undefined} className="brand-logo"><img src="/meddot-logo.png" alt="Meddot Solutions" /></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      <details className="services-menu" ref={desktopMenuRef} data-active={pathname?.startsWith("/services") || undefined} onToggle={event => {
        if (event.currentTarget.open && mobileMenuRef.current) mobileMenuRef.current.open = false;
      }} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}>
        <summary aria-controls="desktop-service-links">Services <ChevronDown size={16} strokeWidth={2} aria-hidden="true" /></summary>
        <div className="services-dropdown" id="desktop-service-links">
          <div className="services-menu-heading"><div><strong>Explore services</strong><p>Find focused support for your practice.</p></div><a href="/contact">Discuss your needs <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          <div className="services-menu-grid"><ServiceLinks group="Revenue operations" overviewHref="/services/revenue-operations" links={revenueLinks} pathname={pathname} /><ServiceLinks group="Digital growth" overviewHref="/services/digital-growth" links={digitalLinks} pathname={pathname} /></div>
          <a className="menu-ai-link" href="/services/healthcare-ai" aria-current={pathname === "/services/healthcare-ai" ? "page" : undefined}><span>Healthcare AI <small>In development</small></span><ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </details>
      <a href="/how-we-work" aria-current={pathname === "/how-we-work" ? "page" : undefined}>How we work</a>
      <a href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</a>
    </nav>
    <div className="header-actions">
      <a className="button button-navy header-cta" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Request a consultation <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" /></a>
      <details className="mobile-menu" ref={mobileMenuRef} onToggle={event => {
        if (event.currentTarget.open && desktopMenuRef.current) desktopMenuRef.current.open = false;
      }}>
        <summary aria-controls="mobile-navigation"><span>Menu</span><Menu className="menu-open-icon" size={22} aria-hidden="true" /><X className="menu-close-icon" size={22} aria-hidden="true" /></summary>
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          <a href="/services/revenue-operations" aria-current={pathname === "/services/revenue-operations" ? "page" : undefined} data-active={pathname?.startsWith("/services/revenue-operations") || undefined}>Medical billing &amp; revenue <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href="/services/digital-growth" aria-current={pathname === "/services/digital-growth" ? "page" : undefined} data-active={pathname?.startsWith("/services/digital-growth") || undefined}>Digital growth <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href="/services/healthcare-ai" aria-current={pathname === "/services/healthcare-ai" ? "page" : undefined}>Healthcare AI <small>In development</small></a>
          <details className="mobile-services"><summary aria-controls="mobile-individual-services">Explore individual services <ChevronDown size={17} aria-hidden="true" /></summary><div className="mobile-services-content" id="mobile-individual-services"><p>Revenue operations</p>{revenueLinks.map(link => <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</a>)}<p>Digital growth</p>{digitalLinks.map(link => <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</a>)}</div></details>
          <a href="/how-we-work" aria-current={pathname === "/how-we-work" ? "page" : undefined}>How we work</a>
          <a href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</a>
          <a className="mobile-nav-cta" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Request a consultation <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>
      </details>
    </div>
  </div></header>;
}
