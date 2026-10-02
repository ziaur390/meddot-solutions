import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { digitalServices } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Healthcare Digital & Integration Services | Meddot Solutions",
  description: "Explore EHR and EMR integration, EDI setup, healthcare SEO, Google Ads, website development, and GoHighLevel services.",
};

export default function DigitalGrowth() {
  return <main>
    <section className="inner-hero"><div className="container service-hero-layout"><div><h1>A clearer digital front door for your practice.</h1><p>Make it easier for people to find your practice, understand your services, and reach the right team. Connect the systems behind that experience.</p><a className="button button-teal" href="/contact#consultation-form">Discuss your project <ArrowUpRight size={17}/></a></div><div className="service-hero-photo"><Image src="/digital-strategy.webp" alt="Illustrative scene of a practice owner and strategist reviewing a website" fill priority sizes="(max-width: 800px) 100vw, 42vw"/><span>Illustrative image</span></div></div></section>
    <section className="section"><div className="container"><div className="section-intro"><div><h2>From systems to first impressions.</h2></div><p>Explore the work Meddot can plan with your team. Integration feasibility and marketing deliverables depend on your systems, approvals, and goals.</p></div><div className="service-directory">{Object.entries(digitalServices).map(([slug, service]) => <a className="directory-row" href={`/services/digital-growth/${slug}`} key={slug}><div><h3>{service.name}</h3><p>{service.intro}</p></div><span>View service <ArrowUpRight size={17}/></span></a>)}</div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Have a system or website project in mind?</h2><a className="button button-navy" href="/contact">Request a consultation <ArrowUpRight size={17}/></a></div></section>
  </main>;
}
