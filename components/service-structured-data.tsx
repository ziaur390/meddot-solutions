import { canonicalUrl, SITE_NAME, SITE_URL } from "@/lib/site-metadata";

export function ServiceStructuredData({
  name,
  description,
  path,
  sectionName,
  sectionPath,
}: {
  name: string;
  description: string;
  path: string;
  sectionName: string;
  sectionPath: string;
}) {
  const url = canonicalUrl(path);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      serviceType: name,
      description,
      url,
      provider: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
        { "@type": "ListItem", position: 2, name: sectionName, item: canonicalUrl(sectionPath) },
        { "@type": "ListItem", position: 3, name },
      ],
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
