/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { revenueServices, revenueNames, type RevenueSlug } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { ServiceStructuredData } from "@/components/service-structured-data";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { ServiceWorkbench } from "@/components/service-workbench";

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

const revenueFlow: Record<RevenueSlug, readonly (readonly [string, string])[]> = {
  "medical-billing": [["Prepare", "Organize documentation and billing information."], ["Submit", "Send claims through the agreed workflow."], ["Track", "Review payer status and response details."], ["Follow through", "Document the next action or open question."]],
  "revenue-cycle-management": [["Front office", "Review the patient and payer information handoff."], ["Coding", "Connect documentation to claim preparation."], ["Claims", "Follow submissions and payer responses."], ["Review", "Discuss outstanding work and recurring issues."]],
  "medical-coding": [["Documentation", "Begin with the recorded patient encounter."], ["Code review", "Apply requirements within the agreed scope."], ["Clarification", "Return documentation questions to the practice."], ["Quality review", "Check the coding work before its next handoff."]],
  credentialing: [["Gather", "Organize provider and practice information."], ["Prepare", "Coordinate the agreed payer application tasks."], ["Follow up", "Review pending requests and payer responses."], ["Update", "Keep changes and remaining tasks visible."]],
  "ar-recovery": [["Review aging", "Segment the available open-balance data."], ["Prioritize", "Agree on claims and payers needing attention."], ["Investigate", "Follow status, denials, and correction needs."], ["Record outcomes", "Keep resolutions and next actions visible."]],
  "specialty-billing": [["Service mix", "Understand the practice’s encounters and procedures."], ["Requirements", "Review documentation and payer considerations."], ["Workflow", "Define coding, authorization, and billing handoffs."], ["Follow-up", "Track exceptions within the agreed scope."]],
  "monthly-billing-audit": [["Define a sample", "Agree on claims, encounters, and review measures."], ["Review", "Compare information within the defined scope."], ["Find patterns", "Group recurring questions and payer responses."], ["Plan actions", "Discuss findings, ownership, and next steps."]],
  "clearinghouse-solutions": [["Map connections", "Document software and payer routing needs."], ["Define submissions", "Agree on transactions and response handling."], ["Review exceptions", "Identify corrections and resubmission owners."], ["Check reporting", "Make response files and unresolved errors visible."]],
};

const related: Record<RevenueSlug, RevenueSlug[]> = {
  "medical-billing": ["medical-coding", "revenue-cycle-management", "ar-recovery"],
  "revenue-cycle-management": ["medical-billing", "ar-recovery", "monthly-billing-audit"],
  "medical-coding": ["medical-billing", "specialty-billing", "monthly-billing-audit"],
  credentialing: ["medical-billing", "specialty-billing", "clearinghouse-solutions"],
  "ar-recovery": ["medical-billing", "revenue-cycle-management", "monthly-billing-audit"],
  "specialty-billing": ["medical-coding", "medical-billing", "credentialing"],
  "monthly-billing-audit": ["medical-coding", "ar-recovery", "revenue-cycle-management"],
  "clearinghouse-solutions": ["medical-billing", "revenue-cycle-management", "credentialing"],
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
  const serviceSlug = slug as RevenueSlug;
  return <main className="interior-page revenue-detail-page" id="main-content">
    <ServiceStructuredData name={revenueNames[slug as RevenueSlug]} description={service.intro} path={`/services/revenue-operations/${slug}`} sectionName="Revenue operations" sectionPath="/services/revenue-operations" />
    <InteriorHero title={service.title} description={service.intro} image="/images/revenue-operations.webp" imageAlt="Illustration of organized claim documents and connected healthcare revenue tasks" variant="revenue" breadcrumb={[{ label: "Home", href: "/" }, { label: "Revenue operations", href: "/services/revenue-operations" }, { label: revenueNames[serviceSlug], href: `/services/revenue-operations/${slug}` }]}>
      <div className="interior-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17}/></a><a className="text-link" href="#service-scope">What’s included <ArrowUpRight size={16}/></a></div>
    </InteriorHero>
    <section className="interior-section service-scope-section" id="service-scope"><div className="container service-overview-grid"><div className="service-overview-copy"><h2>What the work can include.</h2><p>{service.overview}</p><div className="scope-agreement"><h3>Scope tailored to your practice</h3><p>These are common work areas. We agree on responsibilities, systems, and deliverables together.</p><ul className="scope-agreement-list"><li><Check size={16}/> Defined responsibilities</li><li><Check size={16}/> Agreed systems and access</li><li><Check size={16}/> Clear communication and reporting</li></ul></div></div><div className="service-scope-list">{service.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="interior-section service-flow-section"><div className="container"><ServiceWorkbench title={`${revenueNames[serviceSlug]} in context`} stages={revenueFlow[serviceSlug]}/></div></section>
    <section className="interior-section related-services"><div className="container"><div className="related-services-heading"><h2>See how the work connects.</h2><a className="text-link" href="/services/revenue-operations">All revenue services <ArrowUpRight size={16}/></a></div><div className="related-service-links">{related[serviceSlug].map(relatedSlug => <a href={`/services/revenue-operations/${relatedSlug}`} key={relatedSlug}><h3>{revenueNames[relatedSlug]}</h3><ArrowUpRight size={22} aria-hidden="true"/></a>)}</div></div></section>
    <PageClose title={service.question} description="Tell us about your current workflow. We’ll discuss where focused support could fit." label="Talk with Meddot"/>
  </main>;
}
