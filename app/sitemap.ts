import type { MetadataRoute } from "next";
import { digitalServices, revenueServices } from "@/lib/service-content";
import { SITE_URL } from "@/lib/site-metadata";

const staticPages = [
  "",
  "/about",
  "/how-we-work",
  "/contact",
  "/services/revenue-operations",
  "/services/digital-growth",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = [
    ...Object.keys(revenueServices).map((slug) => `/services/revenue-operations/${slug}`),
    ...Object.keys(digitalServices).map((slug) => `/services/digital-growth/${slug}`),
  ];

  return [...staticPages, ...servicePages].map((path) => ({ url: new URL(path || "/", SITE_URL).toString() }));
}
