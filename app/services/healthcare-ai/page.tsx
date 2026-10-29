import { ArrowUpRight, ArrowRight, MessageSquareText, Workflow, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";
import { InteriorHero } from "@/components/interior-hero";
import { PageClose } from "@/components/page-close";
import { ServiceWorkbench } from "@/components/service-workbench";

export const metadata = {
  ...pageMetadata("/services/healthcare-ai", "Healthcare AI Solutions in Development | Meddot Solutions", "Explore Meddot’s developing AI receptionist and healthcare automation concepts for independent medical practices."),
  robots: { index: false, follow: true },
};

export default function HealthcareAI() {
  return <main className="interior-page ai-page" id="main-content">
    <InteriorHero title="Thoughtful automation. People in control." description="We’re developing an AI receptionist and other healthcare-focused solutions, exploring practical ways to support the people who keep practices running." image="/images/healthcare-ai.webp" imageAlt="Concept illustration of a healthcare conversation moving from digital assistance to a human team" variant="ai" breadcrumb={[{ label: "Home", href: "/" }, { label: "Healthcare AI", href: "/services/healthcare-ai" }]}>
      <p className="development-notice"><span className="development-dot" aria-hidden="true"/>In development. These services are not yet available.</p>
      <div className="interior-hero-actions"><a className="button button-teal" href="/contact#consultation-form">Ask about our plans <ArrowUpRight size={17}/></a></div>
    </InteriorHero>
    <section className="interior-section"><div className="container ai-exploration-grid"><div className="ai-exploration-intro"><h2>Useful ideas, carefully developed.</h2><p>These concepts are in development. Final capabilities, availability, and service terms have not yet been set.</p></div><div className="ai-concept-list">
      <article><MessageSquareText size={26} strokeWidth={1.5}/><div><h3>AI receptionist</h3><p>A concept for helping practices respond to routine inquiries and organize the next step for callers or visitors.</p><span>In development</span></div></article>
      <article><Workflow size={26} strokeWidth={1.5}/><div><h3>Workflow assistance</h3><p>Ideas for reducing repetitive administrative work while keeping staff in control of the process.</p><span>Exploring</span></div></article>
      <article><ShieldCheck size={26} strokeWidth={1.5}/><div><h3>Responsible use</h3><p>Healthcare tools need clear boundaries, human oversight, and careful handling of information from the start.</p><span>Design principle</span></div></article>
    </div></div></section>
    <section className="interior-section ai-workflow-section"><div className="container"><ServiceWorkbench variant="ai" title="An idea for a more useful handoff" stages={[["Routine question", "A visitor asks for general practice information."], ["Approved response", "Assistance stays within the information and boundaries defined."], ["Team handoff", "Questions that need people move to the practice team."]]} caption="Concept illustration only. This is not an available product or a demonstration of final capabilities."/><div className="ai-human-note"><ShieldCheck size={22}/><p>Human oversight, approved information, and a clear escalation route belong in the design from the start.</p><ArrowRight size={22} aria-hidden="true"/></div></div></section>
    <PageClose title="Interested in where we’re headed?" description="Share the administrative work you would like to make easier. It can help shape the conversation as we develop these ideas." label="Start a conversation" />
  </main>;
}
