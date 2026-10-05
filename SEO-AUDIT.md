# Meddot Solutions SEO and GEO audit

**Scope:** Source review plus a live browser check of the home and medical billing detail pages at `https://meddot-solutions.vercel.app/` on 2026-10-05. The browser blocked direct inspection of `robots.txt` and `sitemap.xml`; production response headers, index status, Core Web Vitals, rankings, and AI citations were not independently verified. Scores and recommendations are not Google metrics; no Search Console or analytics data was available.

## What changed in this pass

- Added `app/robots.ts` to allow public search crawling, keep `/api/` out of search, and advertise the sitemap.
- Added `app/sitemap.ts` with the home, company, consultation, service hub, and 15 service detail routes. The healthcare AI concept page remains linked for visitors but is `noindex` and excluded from the sitemap while it is in development.
- Added a shared metadata helper for route-specific canonical URLs, Open Graph previews, and X cards, using the current Vercel domain and existing healthcare image.
- Added JSON-LD for `Organization` and `WebSite`, linking the company entity to the four owner-provided social profiles. Added `Service` and visible `BreadcrumbList` data to service detail pages.
- Rewrote revenue service titles and descriptions around actual buyer searches such as medical billing, coding, credentialing, A/R recovery, and specialty billing.

## Findings and priorities

### High: establish real business and expertise signals

The site explains its approach, but does not yet provide verifiable founder or team experience, medical billing/coding credentials, client results, references, or an address. These signals matter for a healthcare revenue-cycle company because buyers need to assess who will handle their work. Add only confirmed details. Do not create fake case studies, ratings, certifications, or a borrowed competitor location.

### High: make the service pages operationally specific

The service pages explain the general purpose of each service and common tasks. They still need confirmed details about what Meddot actually performs, client inputs, exclusions, system access, handoffs, reporting, and how success is reviewed. Add that detail to the core medical billing, coding, credentialing, and A/R pages first. Use real anonymized examples only with permission.

### High: document privacy practices before claiming HIPAA compliance

The site appropriately tells prospects not to submit PHI through its inquiry form. It says HIPAA requirements, approved systems, safeguards, and any required BAA will be agreed before work involving PHI begins. Keep that qualified wording until the company can substantiate its procedures, vendor agreements, access controls, training, incident handling, and retention practices. Do not describe Meddot as “HIPAA certified.”

### Medium: choose a specialty only after confirming experience

The new specialty section describes how coding, authorization, payer rules, visit types, and tools affect billing scope. It deliberately does not list named specialties as proven capabilities. Once actual experience is confirmed, focus on one or two specialties and build useful, reviewed pages around their real workflows.

### Medium: set up Search Console and verify production

Submit `https://meddot-solutions.vercel.app/sitemap.xml` in Google Search Console and check indexing, canonical selection, crawl errors, the Search generative AI inclusion setting, and the Generative AI performance report where available. The live homepage and a service detail page now return the expected titles, descriptions, canonicals, Open Graph tags, Organization/WebSite schema, and Service/Breadcrumb schema. Direct inspection of `/robots.txt` and `/sitemap.xml` was blocked in the browser, so verify those endpoints in Search Console after deployment.

### Medium: publish expert-led resources, not generic volume

Build a small library from questions Meddot can answer from real experience: how a practice can review an aging A/R list, what to confirm before changing billing vendors, how to prepare for provider enrollment, and how coding questions should be handed off. Have a qualified team member review and attribute content. Avoid mass-produced specialty or city pages.

### Low: local business markup and city targeting

No verified business address or local office was supplied. The implementation therefore uses `Organization` and a U.S. service area, not `LocalBusiness` markup or invented city pages. Add a precise service location only after confirming the public address and whether it serves customers.

## GEO guidance

Google’s current guidance says generative AI visibility relies on the same crawlability, indexing, helpful-content, and page-quality foundations as Search. It does not require `llms.txt`, special AI schema, content chunking, or AI-specific rewrites. The site now has a clearer company entity and service relationships; the main remaining citation opportunity is original, experience-based content and verifiable expertise. [Google’s generative AI search guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Validation limits

- Targeted ESLint and `tsc --noEmit` passed for the SEO changes.
- Next.js compiled the application and passed TypeScript during the production build, but static prerender stopped on a Windows `EPERM` error creating a generated `.next` segment directory. A complete production build is not confirmed.
- The live homepage and medical billing service page were checked after the push; both show the updated metadata and schema. The local Next.js build compiled and passed TypeScript but static prerender stopped on a Windows `EPERM` error creating a generated `.next` segment directory. The Vercel deployment is serving the updated routes, but inspect the crawler files through Search Console because the browser blocked their direct text endpoints.
