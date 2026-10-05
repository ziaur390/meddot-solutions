import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProcessTabs } from "@/components/process-tabs";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/how-we-work", "How Medical Billing Support Works | Meddot Solutions", "See how Meddot scopes medical billing and practice operations support around your workflows, systems, responsibilities, and goals.");

export default function HowWeWork() {
  return <main>
    <section className="inner-hero"><div className="container service-hero-layout"><div><h1>A clearer way to move forward.</h1><p>Useful support begins with understanding your practice. We start by discussing the work, the handoffs, and the people involved.</p><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div><div className="service-hero-photo"><Image src="/practice-process.webp" alt="Practice manager and receptionist reviewing a workflow at the front desk" fill priority sizes="(max-width: 800px) 100vw, 42vw"/><span>Illustrative image</span></div></div></section>
    <section className="section"><div className="container how-grid"><div className="how-intro"><p className="kicker">OUR PROCESS</p><h2>Four steps to a stronger working relationship.</h2><p>These stages describe how we approach a new conversation. The exact onboarding plan depends on the services you choose.</p></div><ProcessTabs /></div></section>
    <section className="section pale-section"><div className="container split-section"><div><p className="kicker">THE FIRST CONVERSATION</p><h2>Tell us what needs attention.</h2></div><div><p>Share the services you’re interested in, your practice size, the tools you use today, and the challenges you want to solve. From there, we can discuss fit and a practical next step.</p><a className="text-link" href="/contact">Get in touch <ArrowUpRight size={17} /></a></div></div></section>
  </main>;
}
