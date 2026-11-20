import type { Metadata } from "next";
import "./globals.css";
import "./interior.css";
import "./home.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { canonicalUrl, pageMetadata, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "@/lib/site-metadata";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  ...pageMetadata(
    "/",
    "Medical Billing for Independent Practices | Meddot Solutions",
    "Medical billing, coding, credentialing, A/R follow-up, and practice growth support for independent U.S. practices and small medical groups.",
  ),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: canonicalUrl("/meddot-logo.png"),
  description: "Medical billing, revenue cycle support, coding, credentialing, and digital services for independent healthcare practices.",
  email: CONTACT_EMAIL,
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: SOCIAL_PROFILES,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c");
  return <html lang="en"><head><link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }}/><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
