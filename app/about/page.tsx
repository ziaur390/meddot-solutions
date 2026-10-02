import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Meddot Solutions",
  description: "Why Meddot Solutions focuses on medical billing, practice operations, and digital support for independent healthcare teams.",
};

export default function About() {
  return <main>
    <section className="inner-hero about-hero"><div className="container service-hero-layout"><div><h1>Built for the work behind patient care.</h1><p>Independent practices carry more than clinical work. Billing, payer follow-up, enrollment, and patient communication all need attention. Meddot brings those operational needs into a clearer conversation.</p><a className="button button-teal" href="/contact#consultation-form">Tell us about your practice <ArrowUpRight size={17}/></a></div><div className="service-hero-photo"><Image src="/practice-process.webp" alt="Illustrative scene of practice staff reviewing a front-desk workflow" fill priority sizes="(max-width: 800px) 100vw, 42vw"/><span>Illustrative image</span></div></div></section>
    <section className="section"><div className="container split-section"><div><h2>Support should fit the practice, not the other way around.</h2></div><div><p>We focus on independent practices and small medical groups that want a clearer way to manage the business side of care.</p><p>Our first step is to understand the systems, people, and handoffs already in place. Then we can define the work Meddot should take on, what stays with your team, and how progress will be reviewed.</p><a className="text-link" href="/how-we-work">See how we work <ArrowUpRight size={17}/></a></div></div></section>
    <section className="section pale-section"><div className="container about-principles"><h2>What guides the work</h2><div><article><h3>Clear scope</h3><p>Define responsibilities and deliverables before work begins.</p></article><article><h3>Useful communication</h3><p>Keep open questions and next actions visible to the right people.</p></article><article><h3>Practical improvement</h3><p>Start with the bottleneck your team actually experiences.</p></article></div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Tell us what your practice needs.</h2><a className="button button-navy" href="/contact#consultation-form">Request a consultation <ArrowUpRight size={17}/></a></div></section>
  </main>;
}
