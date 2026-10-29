import { ArrowUpRight, MessageSquareText } from "lucide-react";

type PageCloseProps = { title: string; description?: string; label?: string; href?: string };

export function PageClose({ title, description = "Tell us about your practice, the work that needs attention, and what a useful next step would look like.", label = "Request a consultation", href = "/contact#consultation-form" }: PageCloseProps) {
  return <section className="page-close"><div className="container page-close-inner">
    <div className="page-close-symbol" aria-hidden="true"><MessageSquareText size={30} strokeWidth={1.4}/></div>
    <div className="page-close-copy"><h2>{title}</h2><p>{description}</p></div>
    <a className="button button-white" href={href}>{label}<ArrowUpRight size={18}/></a>
  </div></section>;
}
