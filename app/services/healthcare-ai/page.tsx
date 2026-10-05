import { ArrowUpRight, Bot, ShieldCheck, Workflow } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = {
  ...pageMetadata("/services/healthcare-ai", "Healthcare AI Solutions in Development | Meddot Solutions", "Explore Meddot’s developing AI receptionist and healthcare automation concepts for independent medical practices."),
  robots: { index: false, follow: true },
};

export default function HealthcareAI() {
  return <main>
    <section className="inner-hero navy-hero"><div className="container"><p className="kicker">MEDDOT / HEALTHCARE AI <span className="status-label">IN DEVELOPMENT</span></p><h1>Thoughtful automation for a more responsive practice.</h1><p>We&apos;re developing an AI receptionist and other healthcare-focused solutions. Our aim is to explore practical ways technology can support the people who keep practices running.</p><a className="button button-teal" href="/contact">Ask about our plans <ArrowUpRight size={17} /></a></div></section>
    <section className="section"><div className="container"><div className="section-intro"><div><p className="kicker">WHAT WE&apos;RE EXPLORING</p><h2>Useful ideas, carefully developed.</h2></div><p>These concepts are in development. Their final capabilities, availability, and service terms have not yet been set.</p></div><div className="service-card-grid three-col">
      <article className="service-card"><Bot size={28} strokeWidth={1.5} /><h3>AI receptionist</h3><p>A concept for helping practices respond to routine inquiries and organize the next step for callers or visitors.</p><span className="card-status">IN DEVELOPMENT</span></article>
      <article className="service-card"><Workflow size={28} strokeWidth={1.5} /><h3>Workflow assistance</h3><p>Ideas for reducing repetitive administrative work while keeping staff in control of the process.</p><span className="card-status">EXPLORING</span></article>
      <article className="service-card"><ShieldCheck size={28} strokeWidth={1.5} /><h3>Responsible use</h3><p>Healthcare tools need clear boundaries, human oversight, and careful handling of information from the start.</p><span className="card-status">DESIGN PRINCIPLE</span></article>
    </div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Interested in where we&apos;re headed?</h2><a className="button button-navy" href="/contact">Start a conversation <ArrowUpRight size={17} /></a></div></section>
  </main>;
}
