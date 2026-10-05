import { ArrowDown, Mail, ShieldAlert } from "lucide-react";
import { digitalServices, revenueNames } from "@/lib/service-content";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/contact", "Request a Medical Billing Consultation | Meddot Solutions", "Tell Meddot about your practice and needs. Prepare a consultation request for billing, coding, credentialing, A/R, or digital services.");

const email = "ziaurrahman.26261@gmail.com";

export default function Contact() {
  return <main>
    <section className="inner-hero contact-hero"><div className="container"><h1>Let’s talk about your practice.</h1><p>Tell us what needs attention. We’ll use your note to prepare a focused first conversation about your goals and next steps.</p><a className="button button-teal" href="#consultation-form">Start your request <ArrowDown size={17}/></a></div></section>
    <section className="section" id="consultation-form"><div className="container contact-grid"><div className="contact-main"><h2>Request a consultation</h2><p>Complete the short form below. You’ll review an email draft before sending it to Meddot.</p>
      <form className="consultation-form" action="/api/consultation" method="post">
        <div className="form-row"><div className="form-field"><label htmlFor="full-name">Your name <span>*</span></label><input id="full-name" name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your full name"/></div><div className="form-field"><label htmlFor="practice">Practice or organization <span>*</span></label><input id="practice" name="practice" type="text" autoComplete="organization" maxLength={120} required placeholder="Practice name"/></div></div>
        <div className="form-row"><div className="form-field"><label htmlFor="work-email">Work email <span>*</span></label><input id="work-email" name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@practice.com"/></div><div className="form-field"><label htmlFor="phone">Phone <span className="optional-label">Optional</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="(555) 123-4567"/></div></div>
        <div className="form-field"><label htmlFor="service">What would you like to discuss? <span>*</span></label><select id="service" name="service" required defaultValue=""><option value="" disabled>Select a service</option><option value="Not sure yet">Not sure yet</option><optgroup label="Revenue operations">{Object.values(revenueNames).map(name => <option key={name} value={name}>{name}</option>)}</optgroup><optgroup label="Digital and integration">{Object.values(digitalServices).map(service => <option key={service.name} value={service.name}>{service.name}</option>)}</optgroup><option value="Healthcare AI (in development)">Healthcare AI (in development)</option></select></div>
        <div className="form-field"><label htmlFor="message">What is happening at your practice? <span>*</span></label><textarea id="message" name="message" rows={6} maxLength={1000} required placeholder="A brief description of the challenge and what you’d like help with"/><p className="field-help">Please keep this general. Do not include patient names, records, or other protected health information.</p></div>
        <div className="form-submit"><button className="button button-teal" type="submit">Review email request <Mail size={17}/></button><span>* Required fields</span></div>
      </form>
    </div><aside className="contact-aside"><Mail size={31} strokeWidth={1.5}/><h3>Prefer to write directly?</h3><p>Email us instead. A short note about the challenge is enough to start.</p><a className="contact-aside-email" href={`mailto:${email}?subject=Meddot%20Solutions%20consultation%20request`}>{email}</a><div className="contact-privacy"><ShieldAlert size={18}/><span>Please do not send patient information or medical records.</span></div></aside></div></section>
  </main>;
}
