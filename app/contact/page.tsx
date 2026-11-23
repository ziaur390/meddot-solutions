import Link from "next/link";
import { Suspense } from "react";
import { Mail, ShieldAlert } from "lucide-react";
import { ContactServiceSelect, ContactServiceSelectFallback } from "@/components/contact-service-select";
import { digitalServices, revenueNames } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata = pageMetadata("/contact", "Request a Medical Billing Consultation | Meddot Solutions", "Tell Meddot about your practice and needs. Prepare a consultation request for billing, coding, credentialing, A/R, or digital services.");

const email = CONTACT_EMAIL;
const serviceChoices = {
  revenue: Object.entries(revenueNames).map(([slug, label]) => ({ slug, label })),
  digital: Object.entries(digitalServices).map(([slug, service]) => ({ slug, label: service.name })),
};

export default function Contact() {
  return <main className="interior-page contact-page" id="main-content">
    <section className="contact-intro"><div className="container"><nav className="page-breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><span aria-hidden="true">/</span><span aria-current="page">Request a consultation</span></li></ol></nav><h1>Let’s talk about your practice.</h1><p>Tell us what needs attention. We’ll use your note to prepare a focused first conversation about your goals and next steps.</p></div></section>
    <section className="interior-section contact-form-section" id="consultation-form"><div className="container contact-grid contact-layout"><div className="contact-main"><div className="contact-form-intro"><h2>Prepare your request.</h2><p>Review your details, then open and send an email draft from your email app. Your request reaches Meddot after you send that email.</p></div>
      <form className="consultation-form" action="/api/consultation" method="post">
        <div className="form-row"><div className="form-field"><label htmlFor="full-name">Your name <span>*</span></label><input id="full-name" name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your full name"/></div><div className="form-field"><label htmlFor="practice">Practice or organization <span>*</span></label><input id="practice" name="practice" type="text" autoComplete="organization" maxLength={120} required placeholder="Practice name"/></div></div>
        <div className="form-row"><div className="form-field"><label htmlFor="work-email">Work email <span>*</span></label><input id="work-email" name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@practice.com"/></div><div className="form-field"><label htmlFor="phone">Phone <span className="optional-label">Optional</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="(555) 123-4567"/></div></div>
        <div className="form-field"><label htmlFor="service">What would you like to discuss? <span>*</span></label><Suspense fallback={<ContactServiceSelectFallback choices={serviceChoices}/>}><ContactServiceSelect choices={serviceChoices}/></Suspense></div>
        <div className="form-field"><label htmlFor="message">What is happening at your practice? <span>*</span></label><textarea id="message" name="message" rows={6} maxLength={1000} required aria-describedby="message-help" placeholder="A brief description of the challenge and what you’d like help with"/><p className="field-help" id="message-help">Please keep this general. Do not include patient names, records, or other protected health information.</p></div>
        <div className="form-submit"><button className="button button-teal" type="submit">Review email request <Mail size={17}/></button><span>* Required fields</span></div>
      </form>
    </div><div className="contact-sidebar">
      <aside className="contact-preparation" aria-labelledby="request-process-heading"><h3 id="request-process-heading">A clear first step.</h3><ol><li><span>01</span><div><strong>Share the context</strong><p>Your practice, the issue, and the support you are considering.</p></div></li><li><span>02</span><div><strong>Review your request</strong><p>Check the details before opening your email draft.</p></div></li><li><span>03</span><div><strong>Send from your email app</strong><p>Meddot receives the request only after you send that email.</p></div></li></ol></aside>
      <aside className="contact-aside"><Mail size={28} strokeWidth={1.5} aria-hidden="true" /><h3>Prefer to write directly?</h3><p>A short note about the challenge is enough to start.</p><a className="contact-aside-email" href={`mailto:${email}?subject=Meddot%20Solutions%20consultation%20request`}>{email}</a><div className="contact-privacy"><ShieldAlert size={18} aria-hidden="true" /><span>Please do not send patient information or medical records.</span></div></aside>
    </div></div></section>
  </main>;
}
