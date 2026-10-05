import type { Metadata } from "next";

export const SITE_URL = "https://meddot-solutions.vercel.app";
export const SITE_NAME = "Meddot Solutions";

export const SOCIAL_PROFILES = [
  "https://x.com/MeddotSolution",
  "https://www.instagram.com/meddotsolutions/",
  "https://web.facebook.com/profile.php?id=61594681335314",
  "https://www.linkedin.com/company/meddot-solutions/about/?viewAsMember=true",
];

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = canonicalUrl(path);
  const image = canonicalUrl("/hero-clinic.png");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1536, height: 1024, alt: "Healthcare practice team at work" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
