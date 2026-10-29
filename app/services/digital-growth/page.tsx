import { ArrowDown, ArrowUpRight } from "lucide-react";
import { digitalServices, type DigitalSlug } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { ServiceWorkbench } from "@/components/service-workbench";

export const metadata = pageMetadata("/services/digital-growth", "Healthcare SEO & Website Services | Meddot Solutions", "Explore healthcare website development, SEO, Google Ads, GoHighLevel workflows, and EHR, EMR, and EDI integration planning.");

const groups: { title: string; description: string; slugs: DigitalSlug[] }[] = [
  { title: "Help patients find their next step.", description: "Make the path from discovering your practice to getting in touch easier to understand.", slugs: ["healthcare-web-development", "healthcare-seo", "healthcare-google-ads", "gohighlevel-services"] },
  { title: "Connect the work behind the screen.", description: "Review how your platforms exchange information, with feasibility and permissions defined first.", slugs: ["ehr-integration", "emr-integration", "edi-clearinghouse-setup"] },
];

export default function DigitalGrowth() {
  return <main className="interior-page digital-page" id="main-content">
    <InteriorHero title="A clearer digital front door for your practice." description="Make it easier for people to find your practice, understand your services, and reach the right team. Connect the systems behind that experience." image="/images/digital-growth.webp" imageAlt="Illustration of a healthcare website, search discovery, and connected practice tools" variant="digital" breadcrumb={[{ label: "Home", href: "/" }, { label: "Digital growth", href: "/services/digital-growth" }]}>
      <div className="interior-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Discuss your project <ArrowUpRight size={17}/></a><a className="text-link" href="#digital-services">Explore services <ArrowDown size={16}/></a></div>
    </InteriorHero>
    <section className="interior-section service-system-section"><div className="container">
      <div className="interior-section-heading"><h2>Design the whole path to an inquiry.</h2><p>A useful digital experience connects the information patients need with a clear contact route and a practical team handoff.</p></div>
      <ServiceWorkbench variant="digital" title="From discovery to a team response" stages={[["Find", "Search and advertising introduce the practice."], ["Understand", "A useful website explains services and next steps."], ["Reach out", "A clear inquiry route helps visitors get in touch."], ["Follow through", "Agreed workflows help the team handle responses."]]} />
    </div></section>
    <section className="interior-section service-index-section" id="digital-services"><div className="container service-index">
      {groups.map(group => <div className="service-index-group" key={group.title}><div className="service-index-intro"><h2>{group.title}</h2><p>{group.description}</p></div><div className="service-index-list">{group.slugs.map(slug => <a className="service-index-row" href={`/services/digital-growth/${slug}`} key={slug}><div><h3>{digitalServices[slug].name}</h3><p>{digitalServices[slug].intro}</p></div><ArrowUpRight size={22} aria-hidden="true"/></a>)}</div></div>)}
    </div></section>
    <PageClose title="Have a system or website project in mind?" description="Tell us about your current setup and the experience you want to improve." />
  </main>;
}
