import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { revenueServices, revenueNames } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Medical Billing & Revenue Services | Meddot Solutions",
  description: "Explore medical billing, coding, credentialing, AR recovery, specialty billing, audits, and clearinghouse support for independent practices.",
};

export default function RevenueOperations() {
  return <main>
    <section className="inner-hero navy-hero"><div className="container service-hero-layout"><div><h1>Revenue work, made easier to see and manage.</h1><p>From a single claim to the full revenue cycle, explore the areas where Meddot can support your practice.</p><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div><div className="service-hero-photo"><Image src="/revenue-team.webp" alt="Healthcare operations colleagues reviewing billing work together" fill priority sizes="(max-width: 800px) 100vw, 42vw"/><span>Illustrative image</span></div></div></section>
    <section className="section"><div className="container"><div className="section-intro"><div><h2>Find the support you need.</h2></div><p>Each area below has a draft scope to help you explore options. We will confirm deliverables, systems, and responsibilities before any engagement.</p></div><div className="service-directory">{Object.entries(revenueServices).map(([slug, service]) => <a className="directory-row" href={`/services/revenue-operations/${slug}`} key={slug}><div><h3>{revenueNames[slug as keyof typeof revenueNames]}</h3><p>{service.intro}</p></div><span>View service <ArrowUpRight size={17}/></span></a>)}</div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Tell us where your workflow needs attention.</h2><a className="button button-navy" href="/contact">Request a consultation <ArrowUpRight size={17}/></a></div></section>
  </main>;
}
