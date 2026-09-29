/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { digitalServices, type DigitalSlug } from "@/lib/service-content";

export function generateStaticParams() { return Object.keys(digitalServices).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = digitalServices[slug as DigitalSlug];
  return service ? { title: `${service.name} | Meddot Solutions`, description: service.intro } : {};
}

export default async function DigitalService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = digitalServices[slug as DigitalSlug];
  if (!service) notFound();
  return <main>
    <section className="inner-hero"><div className="container"><p className="service-parent"><a href="/services/digital-growth">Digital and integration services</a> / {service.name}</p><h1>{service.name}</h1><p>{service.intro}</p><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17}/></a></div></section>
    <section className="section"><div className="container service-detail-grid"><div><h2>How this could work for your practice.</h2><p>{service.overview}</p><div className="draft-note"><strong>Draft service scope</strong><span>These details are examples for planning. We will confirm feasibility, exact responsibilities, and deliverables with you.</span></div></div><div className="scope-list">{service.items.map(([title, body]) => <div className="scope-row" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Let’s discuss your current setup.</h2><a className="button button-navy" href="/contact">Talk with Meddot <ArrowUpRight size={17}/></a></div></section>
    <div className="container back-link"><a href="/services/digital-growth">← All digital services</a></div>
  </main>;
}
