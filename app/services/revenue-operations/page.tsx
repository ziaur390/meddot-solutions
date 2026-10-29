import { ArrowDown, ArrowUpRight } from "lucide-react";
import { revenueServices, revenueNames, type RevenueSlug } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { ServiceWorkbench } from "@/components/service-workbench";

export const metadata = pageMetadata("/services/revenue-operations", "Medical Billing & RCM Services | Meddot Solutions", "Explore medical billing, revenue cycle management, coding, credentialing, A/R recovery, specialty billing, audits, and clearinghouse support.");

const groups: { title: string; description: string; slugs: RevenueSlug[] }[] = [
  { title: "Connect the everyday work.", description: "Support the handoffs between documentation, coding, claims, and payer responses.", slugs: ["medical-billing", "revenue-cycle-management", "medical-coding", "clearinghouse-solutions"] },
  { title: "Give the details more attention.", description: "Define a focused engagement around open balances, enrollment, quality review, or your service mix.", slugs: ["ar-recovery", "credentialing", "monthly-billing-audit", "specialty-billing"] },
];

export default function RevenueOperations() {
  return <main className="interior-page revenue-page" id="main-content">
    <InteriorHero title="Revenue work, made easier to see and manage." description="From a single claim to the full revenue cycle, explore the areas where Meddot can support your practice." image="/images/revenue-operations.webp" imageAlt="Illustration of connected claim documents and a coordinated healthcare revenue workflow" variant="revenue" breadcrumb={[{ label: "Home", href: "/" }, { label: "Revenue operations", href: "/services/revenue-operations" }]}>
      <div className="interior-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17} /></a><a className="text-link" href="#revenue-services">Explore services <ArrowDown size={16}/></a></div>
    </InteriorHero>
    <section className="interior-section service-system-section"><div className="container">
      <div className="interior-section-heading"><h2>The handoffs matter as much as the claim.</h2><p>Each task depends on the information before it. We define responsibilities, systems, and communication with your team before work begins.</p></div>
      <ServiceWorkbench title="A connected view of revenue work" stages={[["Visit details", "Start with documentation and practice information."], ["Claim preparation", "Bring coding and submission requirements together."], ["Payer response", "Review acknowledgments, rejections, and denials."], ["Follow-through", "Keep open questions and next actions visible."]]} />
    </div></section>
    <section className="interior-section service-index-section" id="revenue-services"><div className="container service-index">
      {groups.map(group => <div className="service-index-group" key={group.title}><div className="service-index-intro"><h2>{group.title}</h2><p>{group.description}</p></div><div className="service-index-list">{group.slugs.map(slug => <a className="service-index-row" href={`/services/revenue-operations/${slug}`} key={slug}><div><h3>{revenueNames[slug]}</h3><p>{revenueServices[slug].intro}</p></div><ArrowUpRight size={22} aria-hidden="true"/></a>)}</div></div>)}
    </div></section>
    <PageClose title="Tell us where your workflow needs attention." description="Share the work that needs support. We’ll discuss a practical scope around your practice." />
  </main>;
}
