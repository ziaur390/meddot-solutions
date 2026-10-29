import { ArrowUpRight, ListChecks, MessagesSquare, ScanLine, ShieldCheck } from "lucide-react";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/about", "About Meddot Solutions | Medical Billing Support", "Learn how Meddot Solutions supports independent practices with medical billing, revenue cycle workflows, and practical digital services.");

const principles = [
  { icon: ListChecks, title: "Clear scope", body: "Define the work, responsibilities, deliverables, and review points before an engagement begins. A useful working relationship starts with knowing who owns the next step." },
  { icon: MessagesSquare, title: "Useful communication", body: "Keep questions and exceptions close to the people who can resolve them. Your team should be able to see what needs input and what happens next." },
  { icon: ScanLine, title: "Practical improvement", body: "Start with the bottleneck your team actually experiences. Understand the current process before deciding where a service, system connection, or new workflow belongs." },
];

export default function About() {
  return <main className="interior-page" id="main-content">
    <InteriorHero
      title="Built for the work behind patient care."
      description="Independent practices carry more than clinical work. Billing, payer follow-up, enrollment, and patient communication all need attention. Meddot brings those operational needs into a clearer conversation."
      image="/images/practice-partnership.webp"
      imageAlt="Illustrative editorial photograph of a practice owner and operations advisor reviewing a workflow together"
      imageLabel="Illustrative editorial image"
      breadcrumb={[{ label: "About Meddot", href: "/about" }]}
      variant="company"
    ><a className="button button-teal" href="/contact#consultation-form">Tell us about your practice <ArrowUpRight size={17} /></a></InteriorHero>

    <section className="interior-section">
      <div className="container about-story-grid">
        <div className="about-story-copy">
          <h2>Support should fit the practice.</h2>
          <p>We focus on independent practices and small medical groups that want a clearer way to manage the business side of care.</p>
          <p>Our first step is to understand the systems, people, and handoffs already in place. Then we can define the work Meddot should take on, what stays with your team, and how progress will be reviewed.</p>
          <a className="text-link" href="/how-we-work">See how we work <ArrowUpRight size={17} /></a>
        </div>
        <aside className="about-practice-note" aria-labelledby="practice-context-heading">
          <h3 id="practice-context-heading">Your practice, in context.</h3>
          <dl>
            <div><dt>The work</dt><dd>Claims, coding, payer follow-up, enrollment, and digital needs.</dd></div>
            <div><dt>The people</dt><dd>The team members who know your practice and own each handoff.</dd></div>
            <div><dt>The systems</dt><dd>The tools, permissions, and processes you already use.</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section className="interior-section interior-section-tint">
      <div className="container">
        <div className="interior-section-heading"><h2>What guides the work.</h2><p>Three practical principles for defining useful support.</p></div>
        <div className="principle-list">
          {principles.map(({ icon: Icon, title, body }) => <article className="principle-row" key={title}>
            <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3><p>{body}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="interior-section">
      <div className="container partnership-note">
        <ShieldCheck size={34} strokeWidth={1.4} aria-hidden="true" />
        <div><h2>Careful setup comes first.</h2><p>Before services involving protected health information begin, the scope needs to address access, approved systems, safeguards, and any required business associate agreement. Keep website inquiries general so the first conversation can focus on fit.</p></div>
        <a className="text-link" href="/contact#consultation-form">Start a conversation <ArrowUpRight size={17} /></a>
      </div>
    </section>

    <PageClose title="Tell us what your practice needs." description="Bring the challenge, your current workflow, and the questions you want to answer. We can discuss a practical first step together." />
  </main>;
}
