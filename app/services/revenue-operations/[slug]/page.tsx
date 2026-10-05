/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { revenueServices, revenueNames, type RevenueSlug } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { ServiceStructuredData } from "@/components/service-structured-data";

const revenueMeta: Record<RevenueSlug, { title: string; description: string }> = {
  "medical-billing": { title: "Medical Billing for Practices", description: "Medical billing support for independent practices: claim preparation, submission tracking, payer follow-up, and clear billing communication." },
  "revenue-cycle-management": { title: "Revenue Cycle Management for Practices", description: "Revenue cycle support connects patient and payer information, coding, claims, denials, and payment follow-up for small practices." },
  "medical-coding": { title: "Medical Coding Support", description: "Medical coding support based on provider documentation, agreed responsibilities, and clear follow-up for questions that affect claims." },
  credentialing: { title: "Provider Credentialing Support", description: "Organize provider credentialing and payer enrollment tasks, application details, and status follow-up within a defined scope." },
  "ar-recovery": { title: "Medical A/R Recovery", description: "Review aging claims by payer status and next action, then keep medical accounts receivable follow-up visible." },
  "specialty-billing": { title: "Specialty Medical Billing", description: "Scope medical billing around your specialty’s services, documentation, coding, authorization needs, and payer requirements." },
  "monthly-billing-audit": { title: "Medical Billing Audits", description: "Review an agreed sample of claims and billing workflows to identify patterns, open questions, and practical next steps." },
  "clearinghouse-solutions": { title: "Medical Clearinghouse Support", description: "Coordinate electronic claim submissions, payer responses, clearinghouse setup, and rejection workflows around your systems." },
};

export function generateStaticParams() { return Object.keys(revenueServices).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = revenueServices[slug as RevenueSlug];
    const search = revenueMeta[slug as RevenueSlug];
    return service && search ? pageMetadata(`/services/revenue-operations/${slug}`, `${search.title} | Meddot Solutions`, search.description) : {};
  });
}

export default async function RevenueService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = revenueServices[slug as RevenueSlug];
  if (!service) notFound();
  return <main>
    <ServiceStructuredData name={revenueNames[slug as RevenueSlug]} description={service.intro} path={`/services/revenue-operations/${slug}`} sectionName="Revenue operations" sectionPath="/services/revenue-operations" />
    <section className="inner-hero"><div className="container"><p className="service-parent"><a href="/services/revenue-operations">Revenue operations</a> / {revenueNames[slug as RevenueSlug]}</p><h1>{service.title}</h1><p>{service.intro}</p><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17} /></a></div></section>
    <section className="section"><div className="container service-detail-grid"><div><h2>What the work can include.</h2><p>{service.overview}</p><div className="draft-note"><strong>Scope tailored to your practice</strong><span>These are common work areas. We will agree on responsibilities, systems, and deliverables together.</span></div></div><div className="scope-list">{service.items.map(([title, body]) => <div className="scope-row" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>{service.question}</h2><a className="button button-navy" href="/contact">Talk with Meddot <ArrowUpRight size={17} /></a></div></section>
    <div className="container back-link"><a href="/services/revenue-operations">← All revenue services</a></div>
  </main>;
}
