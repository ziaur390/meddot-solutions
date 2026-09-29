/* eslint-disable @next/next/no-html-link-for-pages -- Native links work reliably in the current Sites runtime. */
import Image from "next/image";
import { ArrowUpRight, HeartPulse, Layers3, Sparkles, Check, CircleDot, Monitor, MessageSquareText, MapPin, Mail, ClipboardCheck } from "lucide-react";
import { ProcessTabs } from "@/components/process-tabs";

const pillars = [
  {
    icon: HeartPulse,
    title: "Revenue operations",
    description: "Billing, coding, credentialing, AR recovery, audits, and clearinghouse support for independent practices.",
    href: "/services/revenue-operations",
    link: "Explore revenue services",
  },
  {
    icon: Layers3,
    title: "Digital growth",
    description: "Practice websites, search marketing, GoHighLevel, and clinical system integrations.",
    href: "/services/digital-growth",
    link: "Explore digital services",
  },
  {
    icon: Sparkles,
    title: "Healthcare AI",
    description: "An AI receptionist and practical healthcare automation solutions are in development.",
    href: "/services/healthcare-ai",
    link: "See what's coming",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> FOR THE PRACTICES MOVING CARE FORWARD</div>
            <h1>Better operations.<br /><em>More room to care.</em></h1>
            <p className="hero-lede">Meddot brings billing, revenue cycle support, and practical digital services together for independent healthcare practices.</p>
            <div className="hero-actions">
              <a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#services">Explore our services <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <Image src="/hero-clinic.png" alt="A receptionist at the front desk of a contemporary medical practice" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
            <div className="hero-visual-label"><span className="label-rule" /> Built around your practice</div>
          </div>
        </div>
        <div className="container hero-footer"><span>BETTER SYSTEMS. BETTER FOCUS.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="trust-band" aria-label="About Meddot"><div className="container trust-band-inner"><div><MapPin size={20}/><p><strong>Focused on U.S. practices</strong><span>Sample location: New York, NY · to be confirmed</span></p></div><div><ClipboardCheck size={20}/><p><strong>Scope before promises</strong><span>Clear responsibilities and systems for every engagement</span></p></div><div><Mail size={20}/><p><strong>A direct way to connect</strong><span>Start with a consultation by email</span></p></div></div></section>

      <section className="services-section section" id="services">
        <div className="container">
          <div className="section-intro"><div><p className="kicker">WHAT WE DO</p><h2>One partner for the work<br />behind better care.</h2></div><p>From the revenue cycle to your digital front door, we help independent practices build the support they need to grow.</p></div>
          <div className="pillar-grid">
            {pillars.map(({ icon: Icon, title, description, href, link }) => (
              <article className="pillar-card" key={title}>
                <div className="pillar-top"><Icon size={25} strokeWidth={1.6} /></div>
                <div><h3>{title}</h3><p>{description}</p></div>
                <a href={href}>{link} <ArrowUpRight size={17} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="revenue-feature section" id="approach">
        <div className="container feature-grid">
          <div className="feature-intro">
            <p className="kicker">REVENUE OPERATIONS</p>
            <h2>Because every part of the cycle matters.</h2>
            <p>Claims, coding, follow-up, enrollment, audits, and clearinghouse work all affect the way a practice runs. Explore the support that fits your current needs.</p>
            <a className="button button-white" href="/services/revenue-operations">See revenue services <ArrowUpRight size={17} /></a>
          </div>
          <div className="revenue-list">
            {[["Medical billing", "The day-to-day work of preparing, submitting, and tracking claims."],["Medical coding", "Turning documented care into usable claim information."],["AR recovery", "A focused plan for aging and unresolved claims."],["Credentialing", "Supporting provider enrollment and payer participation."]].map(([title, description]) => <div className="revenue-row" key={title}><span aria-hidden="true"><CircleDot size={18} strokeWidth={1.4}/></span><div><h3>{title}</h3><p>{description}</p></div><CircleDot size={21} strokeWidth={1.4} /></div>)}
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container how-grid">
          <div className="how-intro"><p className="kicker">HOW WE WORK</p><h2>Progress starts with a clear plan.</h2><p>Every practice is different. The best starting point is a conversation about the work you need handled and the experience you want for your team.</p><a className="text-link" href="/how-we-work">More about our approach <ArrowUpRight size={16} /></a></div>
          <ProcessTabs />
        </div>
      </section>

      <section className="digital-feature section">
        <div className="container digital-grid">
          <div className="digital-card"><div className="digital-card-top"><span>YOUR DIGITAL FRONT DOOR</span><span>MEDDOT / 02</span></div><div className="digital-card-icons"><Monitor size={42} strokeWidth={1.15} /><MessageSquareText size={42} strokeWidth={1.15} /></div><div className="digital-card-caption"><span>Websites</span><span>GoHighLevel</span></div></div>
          <div className="digital-copy"><p className="kicker">DIGITAL GROWTH</p><h2>Your practice online, with purpose.</h2><p>Websites, search marketing, EHR and EMR connections, and GoHighLevel workflows can each solve a different practice problem. We’ll start with the one your team needs to address.</p><a className="button button-navy" href="/services/digital-growth">Explore digital services <ArrowUpRight size={17} /></a></div>
        </div>
      </section>

      <section className="ai-strip"><div className="container ai-strip-inner"><div><span className="status-label">IN DEVELOPMENT</span><h2>Practical AI for the next chapter of care.</h2><p>We’re developing an AI receptionist and other healthcare-focused solutions. Follow the ideas as they take shape.</p></div><a className="text-link" href="/services/healthcare-ai">Explore what’s coming <ArrowUpRight size={16} /></a></div></section>

      <section className="section fit-section" id="about"><div className="container fit-grid"><div><p className="kicker">WHO WE SERVE</p><h2>Built around independent practice life.</h2></div><div><p>We focus on physicians, practice managers, and small medical groups who need capable support without adding more complexity to their day.</p><ul><li><Check size={18} /> Independent practices</li><li><Check size={18} /> Small medical groups</li><li><Check size={18} /> Teams planning their next stage of growth</li></ul><a className="text-link" href="/about">Get to know Meddot <ArrowUpRight size={16} /></a></div></div></section>

      <section className="closing-section"><div className="container closing-inner"><p className="kicker">Let’s connect</p><h2>Make more space for the work that matters.</h2><p>Tell us about your practice and what you want to improve. We can explore whether Meddot is the right fit.</p><a className="button button-teal" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div></section>
    </main>
  );
}
