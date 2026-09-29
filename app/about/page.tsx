import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, ListChecks, MoveUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Meddot Solutions",
  description: "Learn about Meddot Solutions and its focus on revenue operations and digital growth for independent healthcare practices.",
};

export default function About() {
  return <main>
    <section className="inner-hero"><div className="container"><p className="kicker">MEDDOT / ABOUT</p><h1>Built for the people behind every practice.</h1><p>Meddot Solutions brings revenue operations and digital services together around a simple belief: practice teams need clear, capable support for the work beyond patient care.</p><a className="button button-teal" href="/contact">Start a conversation <ArrowUpRight size={17} /></a></div></section>
    <section className="section"><div className="container split-section"><div><p className="kicker">OUR FOCUS</p><h2>More focus for care. More clarity for operations.</h2></div><div><p>Independent practices manage clinical work alongside billing, enrollment, online presence, and patient communication. Meddot is being built to help make those operational demands easier to navigate.</p><p>Our service areas bring experienced attention to revenue work, purposeful digital tools, and thoughtful exploration of healthcare AI.</p></div></div></section>
    <section className="section pale-section"><div className="container"><div className="section-intro"><div><p className="kicker">HOW WE THINK</p><h2>Practical principles.</h2></div></div><div className="service-card-grid three-col"><article className="service-card"><ListChecks size={29} strokeWidth={1.5} /><h3>Clarity</h3><p>Define the work, responsibilities, and next steps in terms everyone can understand.</p></article><article className="service-card"><HeartHandshake size={29} strokeWidth={1.5} /><h3>Partnership</h3><p>Learn the practice's needs before recommending how to support them.</p></article><article className="service-card"><MoveUpRight size={29} strokeWidth={1.5} /><h3>Progress</h3><p>Keep attention on useful improvements to the way work moves through the practice.</p></article></div></div></section>
    <section className="mini-cta"><div className="container mini-cta-inner"><h2>Tell us about your practice.</h2><a className="button button-navy" href="/contact">Request a consultation <ArrowUpRight size={17} /></a></div></section>
  </main>;
}
