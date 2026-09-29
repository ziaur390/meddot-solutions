import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Meddot Solutions | Revenue Operations & Digital Growth for Healthcare",
  description: "Medical billing, revenue cycle management, coding, credentialing, websites, and GoHighLevel services for independent healthcare practices.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://api.fontshare.com"/><link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"/></head><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
