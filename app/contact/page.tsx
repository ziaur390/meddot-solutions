import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Meddot Solutions",
  description: "Contact Meddot Solutions to discuss medical billing, revenue operations, practice websites, GoHighLevel services, or healthcare AI plans.",
};

const email = "ziaurrahman.26261@gmail.com";
const mailto = `mailto:${email}?subject=Meddot%20Solutions%20consultation%20request`;

export default function Contact() {
  return <main>
    <section className="inner-hero contact-hero"><div className="container"><p className="kicker">MEDDOT / CONTACT</p><h1>Let's talk about your practice.</h1><p>Tell us what you're working on and where you need support. We'll start with a conversation about your goals and the right next step.</p><a className="button button-teal" href={mailto}><Mail size={18} /> Request a consultation</a></div></section>
    <section className="section"><div className="container contact-grid"><div className="contact-main"><p className="kicker">REQUEST A CONSULTATION</p><h2>Start with an email.</h2><p>Share your practice name, the services you're interested in, and a good way to reach you. We’ll reply to discuss the next step.</p><a className="button button-teal" href={mailto}><Mail size={18} /> Email Meddot Solutions</a><p className="contact-email"><a href={mailto}>{email}</a></p><div className="privacy-note"><ShieldAlert size={18} /><span>Please do not include patient information or medical records in your message.</span></div></div><aside className="contact-aside"><MessageCircle size={32} strokeWidth={1.5} /><h3>Not sure where to begin?</h3><p>A short note about the challenge is enough. We can discuss whether revenue operations, digital services, or a combination makes sense.</p><a className="text-link" href="/#services">Explore service areas <ArrowUpRight size={17} /></a></aside></div></section>
  </main>;
}
