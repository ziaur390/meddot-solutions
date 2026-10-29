/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { digitalServices, type DigitalSlug } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { ServiceStructuredData } from "@/components/service-structured-data";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { ServiceWorkbench } from "@/components/service-workbench";

const digitalTitles: Record<DigitalSlug, string> = {
  "ehr-integration": "EHR Integration for Medical Practices",
  "emr-integration": "EMR Integration for Medical Practices",
  "edi-clearinghouse-setup": "EDI Clearinghouse Setup for Healthcare",
  "healthcare-seo": "Healthcare SEO for Medical Practices",
  "healthcare-google-ads": "Google Ads for Healthcare Practices",
  "healthcare-web-development": "Healthcare Website Development",
  "gohighlevel-services": "GoHighLevel CRM for Medical Practices",
};

const digitalFlow: Record<DigitalSlug, readonly (readonly [string, string])[]> = {
  "ehr-integration": [["Map the workflow", "Identify the information and people involved."], ["Review options", "Confirm vendor interfaces and access."], ["Plan the handoff", "Define fields, ownership, and exceptions."], ["Validate", "Check sample scenarios before a live connection."]],
  "emr-integration": [["Inventory", "List source and destination platforms."], ["Map data", "Document the required record handoffs."], ["Plan exceptions", "Define how missing information is reviewed."], ["Test", "Check representative scenarios with the team."]],
  "edi-clearinghouse-setup": [["Set the scope", "Agree on eligible electronic transactions."], ["Prepare", "Identify enrollment and connectivity needs."], ["Test exchange", "Review submissions and response handling."], ["Confirm handoffs", "Define who resolves remaining exceptions."]],
  "healthcare-seo": [["Understand", "Review real services and patient questions."], ["Prioritize", "Identify useful content and technical issues."], ["Improve", "Apply agreed changes to pages and structure."], ["Review", "Use available search data to guide the next step."]],
  "healthcare-google-ads": [["Plan", "Set geography, service focus, and budget."], ["Prepare", "Review approved messages and landing pages."], ["Launch", "Activate the agreed campaign when ready."], ["Review", "Discuss search terms, spend, and inquiry quality."]],
  "healthcare-web-development": [["Define", "Agree on visitor tasks and site structure."], ["Design", "Shape clear pages around approved content."], ["Build", "Develop responsive, accessible page layouts."], ["Check", "Review forms, links, and mobile before launch."]],
  "gohighlevel-services": [["Map inquiries", "Understand how messages enter the practice."], ["Set stages", "Match the pipeline to real team actions."], ["Plan automation", "Define approved messages and escalation."], ["Handoff", "Document ownership before activation."]],
};

const related: Record<DigitalSlug, DigitalSlug[]> = {
  "ehr-integration": ["emr-integration", "edi-clearinghouse-setup", "gohighlevel-services"],
  "emr-integration": ["ehr-integration", "edi-clearinghouse-setup", "gohighlevel-services"],
  "edi-clearinghouse-setup": ["ehr-integration", "emr-integration", "gohighlevel-services"],
  "healthcare-seo": ["healthcare-web-development", "healthcare-google-ads", "gohighlevel-services"],
  "healthcare-google-ads": ["healthcare-web-development", "healthcare-seo", "gohighlevel-services"],
  "healthcare-web-development": ["healthcare-seo", "healthcare-google-ads", "gohighlevel-services"],
  "gohighlevel-services": ["healthcare-web-development", "healthcare-seo", "ehr-integration"],
};

export function generateStaticParams() { return Object.keys(digitalServices).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = digitalServices[slug as DigitalSlug];
  return service ? pageMetadata(`/services/digital-growth/${slug}`, `${digitalTitles[slug as DigitalSlug]} | Meddot Solutions`, service.intro) : {};
}

export default async function DigitalService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = digitalServices[slug as DigitalSlug];
  if (!service) notFound();
  const serviceSlug = slug as DigitalSlug;
  return <main className="interior-page digital-detail-page" id="main-content">
    <ServiceStructuredData name={service.name} description={service.intro} path={`/services/digital-growth/${slug}`} sectionName="Digital and integration services" sectionPath="/services/digital-growth" />
    <InteriorHero title={service.name} description={service.intro} image="/images/digital-growth.webp" imageAlt="Illustration of a healthcare website and connected digital practice tools" variant="digital" breadcrumb={[{ label: "Home", href: "/" }, { label: "Digital growth", href: "/services/digital-growth" }, { label: service.name, href: `/services/digital-growth/${slug}` }]}>
      <div className="interior-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17}/></a><a className="text-link" href="#service-scope">What’s included <ArrowUpRight size={16}/></a></div>
    </InteriorHero>
    <section className="interior-section service-scope-section" id="service-scope"><div className="container service-overview-grid"><div className="service-overview-copy"><h2>What the work can include.</h2><p>{service.overview}</p><div className="scope-agreement"><h3>Scope tailored to your practice</h3><p>Your platforms, approvals, and vendor capabilities shape the final work. We confirm feasibility, responsibilities, and deliverables together.</p><ul className="scope-agreement-list"><li><Check size={16}/> A defined project scope</li><li><Check size={16}/> Reviewed systems and permissions</li><li><Check size={16}/> Agreed review and handoff points</li></ul></div></div><div className="service-scope-list">{service.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="interior-section service-flow-section"><div className="container"><ServiceWorkbench variant="digital" title={`${service.name} in context`} stages={digitalFlow[serviceSlug]}/></div></section>
    <section className="interior-section related-services"><div className="container"><div className="related-services-heading"><h2>Build on the right foundations.</h2><a className="text-link" href="/services/digital-growth">All digital services <ArrowUpRight size={16}/></a></div><div className="related-service-links">{related[serviceSlug].map(relatedSlug => <a href={`/services/digital-growth/${relatedSlug}`} key={relatedSlug}><h3>{digitalServices[relatedSlug].name}</h3><ArrowUpRight size={22} aria-hidden="true"/></a>)}</div></div></section>
    <PageClose title="Let’s discuss your current setup." description="Share your platforms, your goals, and the experience you would like to improve." label="Talk with Meddot"/>
  </main>;
}
