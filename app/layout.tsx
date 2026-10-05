import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { canonicalUrl, pageMetadata, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "@/lib/site-metadata";

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
  email: "ziaurrahman.26261@gmail.com",
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
  return <html lang="en"><head><link rel="preconnect" href="https://api.fontshare.com"/><link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"/></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }}/><SiteHeader />{children}<SiteFooter /></body></html>;
}
