/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import Image from "next/image";
import { ArrowUpRight, Check, CircleDot, FileCheck2, MessageSquareText, ShieldCheck, ListChecks, UsersRound } from "lucide-react";
import { ProcessTabs } from "@/components/process-tabs";

const moments = [
  ["Visit details", "The information your billing team starts with"],
  ["Claim preparation", "Coding and submission need to line up"],
  ["Payer response", "Rejections and denials need a clear owner"],
  ["Follow-through", "Open claims stay visible until the next action"],
];

const revenueLinks = [
  ["Medical billing", "Prepare, submit, and track claims with attention to the details.", "/services/revenue-operations/medical-billing"],
  ["Medical coding", "Connect documented care to the right billing information.", "/services/revenue-operations/medical-coding"],
  ["A/R recovery", "Put aging and unresolved claims into a workable follow-up plan.", "/services/revenue-operations/ar-recovery"],
  ["Credentialing", "Organize provider enrollment and payer participation work.", "/services/revenue-operations/credentialing"],
];

export default function Home() {
  return (
    <main>
      <section className="hero-section hero-section-refresh">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-context">Medical billing and practice growth for independent care teams</p>
            <h1>Medical billing that moves your practice forward.</h1>
            <p className="hero-lede">Claims, coding, payer follow-up, and the digital details around your practice deserve a clearer plan. Tell us where your team needs support.</p>
            <div className="hero-actions">
              <a className="button button-teal" href="/contact#consultation-form">Talk about your practice <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#start-here">Explore where we can help <ArrowUpRight size={16} /></a>
            </div>
            <p className="hero-reassurance">Start with a focused conversation about your workflow and goals.</p>
          </div>
          <div className="hero-visual">
            <Image src="/billing-team-hero.webp" alt="Illustrative scene of two practice team members reviewing billing work together" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            <div className="hero-visual-label"><span className="label-rule" /> The work behind patient care</div>
            <span className="image-disclosure">Illustrative image</span>
          </div>
        </div>
      </section>

      <section className="journey-section" aria-label="The claim journey">
        <div className="container journey-inner">
          <div className="journey-intro"><span>One connected workflow</span><p>Where a claim moves, your team needs visibility.</p></div>
          <ol className="journey-track">
            {moments.map(([title, detail]) => <li key={title}><span className="journey-dot" aria-hidden="true"/><strong>{title}</strong><small>{detail}</small></li>)}
          </ol>
        </div>
      </section>

      <section className="trust-band" aria-labelledby="trust-heading">
        <div className="container trust-content">
          <div className="trust-heading"><p className="kicker">A CLEAR, CAREFUL START</p><h2 id="trust-heading">Trust starts with the way the work is set up.</h2><p>Know what happens, who is responsible, and how sensitive information will be handled before work begins.</p></div>
          <div className="trust-band-inner">
            <div><ShieldCheck size={23}/><p><strong>HIPAA requirements considered</strong><span>Before services involving PHI begin, we agree on access, approved systems, safeguards, and any required business associate agreement.</span></p></div>
            <div><ListChecks size={23}/><p><strong>Scope and ownership made clear</strong><span>Agree on responsibilities, handoffs, systems, and reporting before an engagement begins.</span></p></div>
            <div><UsersRound size={23}/><p><strong>Your team stays in the loop</strong><span>Questions, exceptions, and next steps stay visible to the people who know your practice.</span></p></div>
          </div>
          <p className="trust-note">Please keep website inquiries general. Do not submit patient names, medical records, or other protected health information.</p>
        </div>
      </section>

      <section className="start-section section" id="start-here">
        <div className="container start-grid">
          <div className="start-intro"><h2>Where is the work getting stuck?</h2><p>Start with the issue closest to yours. We can define the right scope together.</p><a className="text-link" href="/contact#consultation-form">Tell us what you need <ArrowUpRight size={16}/></a></div>
          <div className="need-list">
            <a href="/services/revenue-operations/medical-billing"><div><strong>Claims and billing workflow</strong><small>Submission, tracking, and day-to-day billing support</small></div><ArrowUpRight size={20}/></a>
            <a href="/services/revenue-operations/ar-recovery"><div><strong>Aging or unresolved A/R</strong><small>Follow-up for claims that need a closer look</small></div><ArrowUpRight size={20}/></a>
            <a href="/services/revenue-operations/credentialing"><div><strong>Provider enrollment</strong><small>Credentialing and payer participation support</small></div><ArrowUpRight size={20}/></a>
            <a href="/services/digital-growth"><div><strong>Your digital front door</strong><small>Websites, search, and GoHighLevel workflows</small></div><ArrowUpRight size={20}/></a>
          </div>
        </div>
      </section>

      <section className="revenue-feature section" id="services">
        <div className="container feature-grid">
          <div className="feature-intro">
            <h2>Revenue work is a chain of handoffs. Make each one clearer.</h2>
            <p>Billing is our starting point, with support across coding, aging claims, credentialing, audits, and clearinghouse work. We define responsibilities and systems before an engagement begins.</p>
            <a className="button button-white" href="/services/revenue-operations">Explore all revenue services <ArrowUpRight size={17} /></a>
          </div>
          <div className="revenue-list">
            {revenueLinks.map(([title, description, href]) => <a className="revenue-row" href={href} key={title}><span aria-hidden="true"><CircleDot size={18} strokeWidth={1.4}/></span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={21} strokeWidth={1.6} /></a>)}
          </div>
        </div>
      </section>

      <section className="specialty-fit section" aria-labelledby="specialty-heading">
        <div className="container specialty-fit-grid">
          <div><p className="kicker">SPECIALTY BILLING</p><h2 id="specialty-heading">The details change by specialty.</h2><p>Different practices bring different documentation, coding patterns, authorization needs, payer rules, and systems. We start by understanding your service mix, then define which workflows Meddot can support.</p><a className="text-link" href="/services/revenue-operations/specialty-billing">How specialty billing is scoped <ArrowUpRight size={16}/></a></div>
          <ul className="specialty-checklist"><li><Check size={18}/> Services and visit types</li><li><Check size={18}/> Documentation and coding handoffs</li><li><Check size={18}/> Authorization and payer requirements</li><li><Check size={18}/> EHR, billing tools, and current process</li></ul>
        </div>
      </section>

      <section className="digital-feature section">
        <div className="container digital-grid">
          <div className="digital-photo"><Image src="/digital-strategy.webp" alt="Illustrative scene of a practice owner and strategist reviewing a website" fill sizes="(max-width: 900px) 100vw, 48vw"/><span>Illustrative image</span></div>
          <div className="digital-copy"><h2>A better way for patients to find and reach you.</h2><p>We can help with practice websites, search visibility, GoHighLevel workflows, and EHR or EMR integration planning. The work starts with the patient and team experience you want to improve.</p><div className="digital-capabilities"><span>Practice websites</span><span>Search and ads</span><span>System connections</span></div><a className="button button-navy" href="/services/digital-growth">Explore digital services <ArrowUpRight size={17} /></a></div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container how-grid">
          <div className="how-intro"><h2>Start with the real workflow, not a preset package.</h2><p>We begin with the work your team handles now, where handoffs break down, and what a useful first step would look like. Then we agree on scope before moving forward.</p><a className="text-link" href="/how-we-work">See how we work <ArrowUpRight size={16} /></a></div>
          <ProcessTabs />
        </div>
      </section>

      <section className="ai-strip"><div className="container ai-strip-inner"><div><span className="status-label">IN DEVELOPMENT</span><h2>Healthcare AI is next, with people in control.</h2><p>We’re exploring an AI receptionist and other practice-focused automation. These services are not yet available.</p></div><a className="text-link" href="/services/healthcare-ai">See what we’re exploring <ArrowUpRight size={16} /></a></div></section>

      <section className="closing-section"><div className="container closing-inner"><h2>Tell us what is slowing your team down.</h2><p>Share the issue, your practice type, and the support you are considering. We’ll use that context to discuss a practical scope and next steps.</p><div className="closing-steps"><span><FileCheck2 size={18}/> Describe the need</span><span><MessageSquareText size={18}/> Discuss the workflow</span><span><Check size={18}/> Agree on next steps</span></div><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17} /></a></div></section>
    </main>
  );
}
