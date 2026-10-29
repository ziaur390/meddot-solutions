import { ArrowUpRight, Check, FileText, SlidersHorizontal, UsersRound } from "lucide-react";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/how-we-work", "How Medical Billing Support Works | Meddot Solutions", "See how Meddot scopes medical billing and practice operations support around your workflows, systems, responsibilities, and goals.");

const stages = [
  { id: "understand", number: "01", title: "Understand the practice.", body: "We begin with the work your team handles today. The goal is to understand where a handoff becomes difficult, what information is available, and what useful support would look like.", details: ["Your practice and service mix", "Current billing and digital tools", "The bottleneck you want to address"], takeaway: "A shared view of the current workflow." },
  { id: "define", number: "02", title: "Define a useful scope.", body: "Together, we identify the services that fit the issue. Responsibilities, systems, deliverables, and review points should be clear before the engagement moves forward.", details: ["Services and responsibilities", "Access and information requirements", "Reporting and communication needs"], takeaway: "An agreed scope with clear ownership." },
  { id: "prepare", number: "03", title: "Prepare the handoffs.", body: "The onboarding plan depends on the services you choose. We identify the information, permissions, approvals, and practice contacts needed for the agreed work.", details: ["Practice and provider information", "Approved systems and permissions", "Safeguards and any required BAA"], takeaway: "A practical plan for getting started." },
  { id: "review", number: "04", title: "Review and adjust.", body: "The working relationship should make it easier to discuss open issues, review the work, and adjust priorities. The review cadence and information shared are part of the engagement scope.", details: ["Open questions and exceptions", "Progress and next actions", "Priorities that need to change"], takeaway: "A clear conversation about what comes next." },
];

export default function HowWeWork() {
  return <main className="interior-page" id="main-content">
    <InteriorHero
      title="A clearer way to move forward."
      description="Useful support begins with understanding your practice. We start by discussing the work, the handoffs, and the people involved, then agree on a practical scope together."
      image="/images/revenue-operations.webp"
      imageAlt="Editorial illustration of connected documentation, claim preparation, and payer follow-up workflows"
      imageLabel="Illustrative workflow study"
      breadcrumb={[{ label: "How we work", href: "/how-we-work" }]}
      variant="company"
    ><a className="button button-teal" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17} /></a><a className="text-link" href="#our-process">Explore the process <ArrowUpRight size={17} /></a></InteriorHero>

    <section className="interior-section" id="our-process">
      <div className="container">
        <div className="interior-section-heading"><h2>From the first conversation to the next step.</h2><p>These stages describe our approach. The onboarding plan depends on the service and the needs of your practice.</p></div>
        <nav className="engagement-nav" aria-label="Engagement stages">{stages.map(stage => <a key={stage.id} href={`#${stage.id}`}><span>{stage.number}</span>{stage.id === "understand" ? "Understand" : stage.id === "define" ? "Define scope" : stage.id === "prepare" ? "Prepare" : "Review"}</a>)}</nav>
        <div className="engagement-timeline">
          {stages.map(stage => <article className="engagement-stage" id={stage.id} key={stage.id}>
            <span className="stage-number" aria-label={`Step ${stage.number}`}>{stage.number}</span>
            <div className="stage-main"><h3>{stage.title}</h3><p>{stage.body}</p><p className="stage-takeaway">{stage.takeaway}</p></div>
            <div className="stage-details"><h4>What we clarify</h4><ul>{stage.details.map(detail => <li key={detail}><Check size={16} aria-hidden="true" />{detail}</li>)}</ul></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="interior-section interior-section-tint">
      <div className="container first-conversation-grid">
        <div><h2>Bring the context. We’ll start there.</h2><p>A general overview is enough for a first conversation. Please leave patient names, records, and other protected health information out of your inquiry.</p><a className="text-link" href="/contact#consultation-form">Tell us what needs attention <ArrowUpRight size={17} /></a></div>
        <ul className="conversation-prompts">
          <li><UsersRound size={24} strokeWidth={1.5} aria-hidden="true" /><div><strong>Your practice</strong><p>The type of practice and the team involved.</p></div></li>
          <li><SlidersHorizontal size={24} strokeWidth={1.5} aria-hidden="true" /><div><strong>Your current setup</strong><p>The tools and workflows you use today.</p></div></li>
          <li><FileText size={24} strokeWidth={1.5} aria-hidden="true" /><div><strong>The issue to solve</strong><p>What needs attention and the support you are considering.</p></div></li>
        </ul>
      </div>
    </section>

    <PageClose title="Let’s find a useful place to start." description="Share the work that is slowing your team down. We’ll use that context to discuss fit and next steps." />
  </main>;
}
