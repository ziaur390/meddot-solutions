import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type InteriorHeroProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  breadcrumb: { label: string; href: string }[];
  children?: ReactNode;
  variant?: "revenue" | "digital" | "company" | "ai";
  imageLabel?: string;
};

export function InteriorHero({ title, description, image, imageAlt, breadcrumb, children, variant = "company", imageLabel = "Illustrative concept" }: InteriorHeroProps) {
  const trail = breadcrumb.filter(item => item.href !== "/");
  return <section className={`interior-hero interior-hero--${variant}`}>
    <div className="container">
      <nav className="page-breadcrumbs" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li>{trail.map((item, index) => <li key={item.href}><ChevronRight size={13} aria-hidden="true"/>{index === trail.length - 1 ? <span aria-current="page">{item.label}</span> : <a href={item.href}>{item.label}</a>}</li>)}</ol>
      </nav>
      <div className="interior-hero-grid">
        <div className="interior-hero-copy"><h1>{title}</h1><p>{description}</p>{children && <div className="interior-hero-actions">{children}</div>}</div>
        <figure className="interior-hero-figure">
          <div className="interior-hero-art"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 800px) 100vw, 48vw"/></div>
          <figcaption><span className="artwork-line" aria-hidden="true"/>{imageLabel}<span className="artwork-origin">Meddot Solutions</span></figcaption>
        </figure>
      </div>
    </div>
  </section>;
}
