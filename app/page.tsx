/* eslint-disable @next/next/no-html-link-for-pages -- Native links support the retained Sites runtime. */
import Image from "next/image";
import { ArrowUpRight, Check, CircleDot, FileCheck2, Globe2, Headset, ListChecks, MessageSquareText, ShieldCheck, UsersRound } from "lucide-react";
import { ProcessTabs } from "@/components/process-tabs";

const revenueLinks = [
  ["Medical billing", "Prepare, submit, and track claims with attention to the details.", "/services/revenue-operations/medical-billing"],
  ["Medical coding", "Connect documented care to the right billing information.", "/services/revenue-operations/medical-coding"],
  ["A/R recovery", "Put aging and unresolved claims into a workable follow-up plan.", "/services/revenue-operations/ar-recovery"],
  ["Credentialing", "Organize provider enrollment and payer participation work.", "/services/revenue-operations/credentialing"],
];

const questions = [
  ["Can we start with one service?", "Yes. The first conversation can focus on a single issue, such as medical billing, aging A/R, credentialing, or a practice website. We agree on responsibilities, systems, and deliverables before work begins."],
  ["What should I share in a consultation request?", "Your practice name, the service you are considering, and a general description of the challenge are enough. Please leave out patient names, medical records, and other protected health information."],
  ["How is pricing determined?", "Pricing depends on the services, practice workflow, systems, and responsibilities included in the engagement. We discuss the scope before proposing a fee."],
  ["Is the AI receptionist available now?", "The AI receptionist and other healthcare AI solutions are in development. You can discuss your needs with us, but these services are not yet available."],
];

export default function Home() {
  return <main className="home-page" id="main-content">
    <section className="home-hero">
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <h1>Medical billing that moves your practice forward.</h1>
          <p>Billing, coding, credentialing, and digital growth support for independent practices and small medical groups. Let’s find a clearer way through the work.</p>
          <div className="home-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Request a consultation</a><a className="home-explore" href="#start-here">Explore services</a></div>
          <div className="home-practice-note"><UsersRound size={21} strokeWidth={1.5} aria-hidden="true"/><span>Built around your practice.<br/><strong>Serving healthcare teams across the U.S.</strong></span></div>
        </div>
        <figure className="home-hero-media">
          <div className="home-hero-photo"><Image src="/billing-team-hero.webp" alt="Illustrative scene of two practice team members reviewing billing work together" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <figcaption><span>The work behind patient care.</span><small>Illustrative image</small></figcaption>
        </figure>
      </div>
    </section>

    <nav className="home-service-paths" id="start-here" aria-label="Find the right support">
      <div className="container home-service-paths-grid">
        <a href="/services/revenue-operations"><FileCheck2 size={27} strokeWidth={1.4} aria-hidden="true"/><div><h2>Medical billing &amp; RCM</h2><p>Claims, coding, A/R, and enrollment.</p></div><ArrowUpRight size={20} aria-hidden="true"/></a>
        <a href="/services/digital-growth"><Globe2 size={27} strokeWidth={1.4} aria-hidden="true"/><div><h2>Practice growth</h2><p>Websites, search, and connected systems.</p></div><ArrowUpRight size={20} aria-hidden="true"/></a>
        <a href="/services/healthcare-ai"><Headset size={27} strokeWidth={1.4} aria-hidden="true"/><div><h2>Healthcare AI <small>In development</small></h2><p>Explore what we’re working toward.</p></div><ArrowUpRight size={20} aria-hidden="true"/></a>
      </div>
    </nav>

    <section className="revenue-feature section" id="services">
      <div className="container feature-grid">
        <div className="feature-intro"><h2>Give the business side of care a clearer path.</h2><p>Billing is our starting point, with support across coding, aging claims, credentialing, audits, and clearinghouse work. We define responsibilities and systems before an engagement begins.</p><a className="button button-white" href="/services/revenue-operations">Explore revenue services</a></div>
        <div className="revenue-list">{revenueLinks.map(([title, description, href]) => <a className="revenue-row" href={href} key={title}><span aria-hidden="true"><CircleDot size={18} strokeWidth={1.4}/></span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={21} strokeWidth={1.6} aria-hidden="true"/></a>)}</div>
      </div>
    </section>

    <section className="trust-band" aria-labelledby="trust-heading">
      <div className="container trust-content">
        <div className="trust-heading"><h2 id="trust-heading">Good support starts with trust.</h2><p>Know what happens, who is responsible, and how sensitive information will be handled before work begins.</p></div>
        <div className="trust-band-inner">
          <div><ShieldCheck size={23} aria-hidden="true"/><p><strong>HIPAA requirements considered</strong><span>Before services involving PHI begin, we agree on access, approved systems, safeguards, and any required business associate agreement.</span></p></div>
          <div><ListChecks size={23} aria-hidden="true"/><p><strong>Scope and ownership made clear</strong><span>Agree on responsibilities, handoffs, systems, and reporting before an engagement begins.</span></p></div>
          <div><UsersRound size={23} aria-hidden="true"/><p><strong>Your team stays in the loop</strong><span>Questions, exceptions, and next steps stay visible to the people who know your practice.</span></p></div>
        </div>
        <p className="trust-note">Please keep website inquiries general. Do not submit patient names, medical records, or other protected health information.</p>
      </div>
    </section>

    <section className="digital-feature section">
      <div className="container digital-grid">
        <div className="digital-photo"><Image src="/digital-strategy.webp" alt="Illustrative scene of a practice owner and strategist reviewing a website" fill sizes="(max-width: 800px) 100vw, 48vw"/><span>Illustrative image</span></div>
        <div className="digital-copy"><h2>A better way for patients to find and reach you.</h2><p>We can help with practice websites, search visibility, GoHighLevel workflows, and EHR or EMR integration planning. The work starts with the patient and team experience you want to improve.</p><div className="digital-capabilities"><span>Practice websites</span><span>Search and ads</span><span>System connections</span></div><a className="button button-navy" href="/services/digital-growth">Explore digital services</a></div>
      </div>
    </section>

    <section className="specialty-fit section" aria-labelledby="specialty-heading">
      <div className="container specialty-fit-grid"><div><h2 id="specialty-heading">The details change by specialty.</h2><p>Different practices bring different documentation, coding patterns, authorization needs, payer rules, and systems. We start by understanding your service mix, then define which workflows Meddot can support.</p><a className="text-link" href="/services/revenue-operations/specialty-billing">How specialty billing is scoped <ArrowUpRight size={16} aria-hidden="true"/></a></div><ul className="specialty-checklist"><li><Check size={18} aria-hidden="true"/> Services and visit types</li><li><Check size={18} aria-hidden="true"/> Documentation and coding handoffs</li><li><Check size={18} aria-hidden="true"/> Authorization and payer requirements</li><li><Check size={18} aria-hidden="true"/> EHR, billing tools, and current process</li></ul></div>
    </section>

    <section className="section how-section"><div className="container how-grid"><div className="how-intro"><h2>Start with the real workflow, not a preset package.</h2><p>We begin with the work your team handles now, where handoffs break down, and what a useful first step would look like. Then we agree on scope before moving forward.</p><a className="text-link" href="/how-we-work">See how we work <ArrowUpRight size={16} aria-hidden="true"/></a></div><ProcessTabs /></div></section>

    <section className="home-questions section" aria-labelledby="questions-heading"><div className="container home-questions-grid"><div><h2 id="questions-heading">A few things you may be wondering.</h2><p>A useful first conversation starts with clear expectations.</p><a className="text-link" href="/contact#consultation-form">Ask us about your practice</a></div><div className="home-question-list">{questions.map(([question, answer]) => <details name="practice-questions" key={question}><summary>{question}<span aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="ai-strip"><div className="container ai-strip-inner"><div><span className="status-label">In development</span><h2>Healthcare AI, with people in control.</h2><p>We’re exploring an AI receptionist and other practice-focused automation. These services are not yet available.</p></div><a className="text-link" href="/services/healthcare-ai">See what we’re exploring <ArrowUpRight size={16} aria-hidden="true"/></a></div></section>

    <section className="closing-section"><div className="container closing-inner"><h2>Let’s make room for what your practice does best.</h2><p>Share the issue, your practice type, and the support you are considering. We’ll use that context to discuss a practical scope and next steps.</p><div className="closing-steps"><span><FileCheck2 size={18} aria-hidden="true"/> Describe the need</span><span><MessageSquareText size={18} aria-hidden="true"/> Discuss the workflow</span><span><Check size={18} aria-hidden="true"/> Agree on next steps</span></div><a className="button button-teal" href="/contact#consultation-form">Request a consultation</a></div></section>
  </main>;
}
