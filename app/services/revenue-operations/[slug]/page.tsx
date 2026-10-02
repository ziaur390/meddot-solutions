/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { revenueServices, revenueNames, type RevenueSlug } from "@/lib/service-content";

export function generateStaticParams() { return Object.keys(revenueServices).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = revenueServices[slug as RevenueSlug];
    return service ? { title: `${service.title} | Meddot Solutions`, description: service.intro } : {};
  });
}

export default async function RevenueService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = revenueServices[slug as RevenueSlug];
  if (!service) notFound();
  return <main>
    <section className="inner-hero"><div className="container"><p className="service-parent"><a href="/services/revenue-operations">Revenue operations</a> / {revenueNames[slug as RevenueSlug]}</p><h1>{service.title}</h1><p>{service.intro}</p><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17} /></a></div></section>
    <section className="section"><div className="container service-detail-grid"><div><h2>What the work can include.</h2><p>{service.overview}</p><div className="draft-note"><strong>Scope tailored to your practice</strong><span>These are common work areas. We will agree on responsibilities, systems, and deliverables together.</span></div></div><div className="scope-list">{service.items.map(([title, body]) => <div className="scope-row" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>{service.question}</h2><a className="button button-navy" href="/contact">Talk with Meddot <ArrowUpRight size={17} /></a></div></section>
    <div className="container back-link"><a href="/services/revenue-operations">← All revenue services</a></div>
  </main>;
}
