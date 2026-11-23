# Meddot Solutions: Cloudflare-first launch plan

**Updated November 23, 2026.** Expected traffic is approximately **100 visits/day, with a planning maximum of 500/day**. The plan uses **free Cloudflare static hosting**, Cloudflare domain/DNS, and a free professional mailbox where eligible or one inexpensive paid mailbox. Your account and GitHub connection are created. The static migration is locally validated; public Cloudflare deployment is being configured and has not yet been verified. The current public website remains on [Vercel](https://meddot-solutions.vercel.app/). No domain or mailbox has been purchased, and no DNS cutover is complete.

**Start here:** follow the [step-by-step migration guide](CLOUDFLARE-MIGRATION.md), also available as a [printable migration guide](docs/meddot-cloudflare-migration-guide.html). It contains the actual Worker address, build settings, and current deployment status.

Open the [printable Cloudflare guide](docs/meddot-cloudflare-launch-guide.html) in a browser and use **Print → Save as PDF**. The existing [Vercel guide](DEPLOY-VERCEL.md) remains the reference for the live deployment and fallback.

## 1. Recommended setup

| Service | Recommended role |
|---|---|
| Cloudflare Registrar and DNS | Own and renew the domain; manage website and email records |
| Cloudflare Workers Free with Static Assets | Locally validated: deliver prebuilt marketing pages without server rendering on every visit |
| A small same-origin Worker | Locally validated consultation review; production CPU/quota monitoring follows deployment |
| Cloudflare Turnstile and scoped rate limiting | Planned form protection; not implemented yet |
| Cloudflare Email Sending Beta | Optional future application notifications; not active and not a full staff mailbox |
| Zoho Mail Free, if eligible; otherwise Mail Lite | Real business inbox for everyday branded sending, receiving, and replies |

**Domain candidate:** `meddotsolutions.com` matches the brand. Cloudflare's public search showed **$11.17 to buy, renewing at $11.17/year**, observed November 22. Availability, checkout price, and tax must be rechecked immediately before payment. The domain is not reserved by this observation. [Live domain search](https://www.cloudflare.com/domains/search?q=meddotsolutions.com)

**Email preference confirmed:** a low-cost professional inbox with sending and receiving. Check Zoho's free custom-domain offer during signup first. If it is unavailable for the account's region/data center or external mail-client access is needed, budget for one Mail Lite user. Workspace remains an alternative if a full Gmail web experience later matters more than minimum cost.

**Hosting recommendation:** use Free with the prepared static build and small Worker; retain Paid only as a fallback for measured resource needs. Your traffic forecast does not justify a $5/month subscription by itself. No subscription is required merely because the site reaches 500 visitors in a day.

## 2. Budget before purchasing

All figures are **USD**, reviewed November 23, 2026; the domain-specific quote was observed November 22. Tax, usage overages, exchange-rate/payment fees, and optional add-ons are extra. These are annual service-cost estimates, excluding migration/development work.

| Item | Published baseline | Billing cadence |
|---|---:|---|
| Candidate standard `.com` domain | $11.17/year observed | Annual registration/renewal |
| Workers Free / ordinary Static Assets hosting | $0 within Free limits | No hosting subscription |
| Zoho Mail Free, if eligible | $0 for up to 5 users, one domain, 5 GB/user | Region/data-center and feature restrictions |
| Zoho Mail Lite 5 GB fallback | $1/user/month; $12/year for one user | Annual subscription |
| Domain + free hosting + eligible free mailbox | **$11.17/year estimated baseline** | Domain only; about $0.93/month equivalent |
| Domain + free hosting + one Mail Lite mailbox | **$23.17/year estimated baseline** | Separate annual bills; about $1.93/month equivalent |
| Optional Workers Paid | Add $5/month minimum; $60/year equivalent | Monthly, plus applicable usage |
| Paid-hosting fallback + domain + one Mail Lite mailbox | $83.17/year estimated baseline | About $6.93/month equivalent |

**Practical budget:** reserve $23.17/year for a domain and one paid mailbox, while using free hosting. If the eligible free mailbox meets your needs, the estimate falls to the domain cost alone. A branded `.com` still requires registration and renewal; free hosting does not include ownership of that domain. Cloudflare's public `.com` list also shows $11.17 registration/renewal; confirm the actual name and checkout total before paying. [Registrar prices](https://pricing.registrar.cloudflare.com/), [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [Zoho pricing](https://www.zoho.com/mail/zohomail-pricing.html)

### Why Free can fit this traffic

100–500 visits/day is approximately **3,000–15,000 visits per 30-day month**. Visits are not server invocations. For illustration only, 500 visits × 3 pages × 10 resource requests would be 15,000 HTTP requests/day. Actual traffic also includes crawlers, prefetching, bots, and repeat requests. Static HTML, CSS, fonts, and images can be served directly without consuming dynamic Worker invocations.

Workers Free currently permits **100,000 dynamic requests/day per account** and **10 ms CPU per invocation**. Ordinary Static Assets requests are free and unlimited. The CPU limit is the important caveat: even one server-rendered request can exceed it at low traffic. This is why testing or static delivery matters more than the visitor forecast alone. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Static Assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)

This plan uses a Free website/DNS zone. Do not buy Cloudflare Pro, a VPS, a separate SSL certificate, a database, or paid image transformations for this marketing site's present needs. Cloudflare Pages Free is also a valid static-hosting alternative, with 500 builds/month; its Functions share Workers limits. Prefer one hosting path rather than maintaining both. Vercel Hobby is restricted to personal/noncommercial use, so do not choose it as the free commercial hosting solution. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Vercel terms, Hobby plan](https://vercel.com/legal/terms)

Google Workspace Business Starter is an alternative: **$7/user/month with a one-year commitment ($84/year)** or **$8.40/month flexible ($100.80/year)**, before tax and regional variations. Domain plus free hosting plus one Workspace user would therefore start at $95.17/year committed or $111.97/year flexible. It is unnecessary if Zoho meets your needs. [Google billing plans](https://knowledge.workspace.google.com/admin/billing/compare-flexible-and-annual-fixed-term-payment-plans)

## 3. Buy and secure the domain when ready

1. Sign in to your own Cloudflare account, enable MFA, and retain recovery codes securely.
2. Recheck the exact spelling, availability, initial price, renewal price, and final checkout total. Review the purchase and terms yourself.
3. Complete registrant-email verification. Confirm auto-renewal, a valid payment method, registrar lock, and DNSSEC protection.
4. Keep an external recovery address that works if the new domain's email stops working.
5. Record renewal date and account ownership. Keep credentials and recovery codes outside GitHub and shared guides.

Cloudflare Registrar uses Cloudflare nameservers. Buying there does not force immediate website migration: the current Vercel deployment can continue while the Cloudflare version is tested. Do not replace working website or email records during registration. [Registration requirements](https://developers.cloudflare.com/registrar/get-started/register-domain/)

## 4. Migrate the website in stages

### Implemented free architecture

The prepared build keeps the design, content, Satoshi font, images, and crawlable HTML. Next.js exports marketing pages at build time into `.cloudflare-build/assets`; the standalone Worker handles the consultation endpoint. It does not run Next.js server rendering on every visit and does not require Node compatibility mode.

Service preselection, same-origin form validation, private review responses, security headers, metadata, and real 404s have been implemented. Assets are served directly, with Worker-first routing restricted to API paths. Local checks passed for **26 exported pages, a Worker dry run, 12 Cloudflare security tests, and 10 Next.js fallback security tests**. Browser checks covered AI/billing selections, invalid/duplicate selections, service-link navigation, and a synthetic review. Production resource usage still needs measurement. [Static Assets routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)

Use `wrangler.cloudflare.jsonc`, not the retained Sites/Vinext deployment helpers. Its compatibility date is pinned to `2026-11-09` for the installed runtime. The Git connection targets `ziaur390/meddot-solutions/main`; the known testing URL is `https://meddot-solutions.ziaurrahman-26261.workers.dev`, currently disabled while publication is prepared.

1. Follow the [migration guide](CLOUDFLARE-MIGRATION.md) to confirm build/deploy commands and canonical build variables.
2. Publish the validated commit, enable/check the testing route, and verify the public site in a browser.
3. Repeat form, headers, navigation, image/font, sitemap, and 404 checks on Cloudflare itself; monitor request/CPU errors and quotas.
4. Keep the working Vercel deployment and configuration as rollback until the replacement is stable.
5. Buy/connect the custom domain separately, choose apex or `www`, update the canonical URL, rebuild, and verify redirects/HTTPS.

The static path serves existing image files and avoids depending on paid image transformations. If that changes later, review Cloudflare Images limits: Free permits 5,000 unique transformations/month before new transformations can fail. [Images pricing](https://developers.cloudflare.com/images/pricing/)

When changing the business inbox, update `vars.CONTACT_EMAIL` in `wrangler.cloudflare.jsonc`. An optional `NEXT_PUBLIC_CONTACT_EMAIL` must match. Rebuild so static pages and the Worker point to the same recipient. Preserve email DNS and the Vercel rollback path during domain changes.

## 5. Set up the professional mailbox

**Free starting option:** Cloudflare Email Routing forwards a public address to a verified existing inbox such as the current Gmail account. It is not a complete business mailbox, and forwarding alone does not provide ordinary professional-address replies. Do not assume a personal Gmail sending workaround will remain available indefinitely. [Email Routing](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)

Google has announced removal of third-party **Send as**, Gmailify, and POP fetching from January 2027. Forwarding into Gmail can still receive mail, but it does not solve professional outgoing correspondence. Use Zoho's app/a standard supported client, or Workspace for Gmail on the web. [Google announcement](https://support.google.com/mail/answer/17101213?hl=en)

**Best free mailbox to check:** Zoho Mail Free supports branded sending and receiving for one domain, up to five users, and 5 GB per user through its webmail/mobile app. It has no IMAP/POP/ActiveSync, and availability is limited to selected data centers; confirm eligibility through normal signup rather than assuming it is available. Adding a sixth user requires moving all users to a paid plan. It can be a sensible launch option when those restrictions fit. [Zoho free-plan features](https://www.zoho.com/mail/zohomail-pricing.html), [regional eligibility](https://www.zoho.com/mail/help/adminconsole/subscription.html)

**Low-cost fallback:** if Free is unavailable or external client access is required, create one Zoho Mail Lite mailbox after reviewing its final annual price. Use Zoho webmail/app or a supported email client for staff correspondence. Verify the domain, create the mailbox, then copy Zoho's exact regional MX and authentication values from its setup wizard. Use Workspace if you prefer Gmail on the web. Mailbox costs depend on users/features/storage, not website visits.

**Pick one root-domain MX system.** Cloudflare Email Routing requires exclusive root MX records and cannot run alongside Zoho/Workspace MX at the same root. For either a free or paid Zoho mailbox, keep Cloudflare DNS, point root MX to the mailbox provider, and leave root Email Routing disabled. A sending subdomain such as `notify.meddotsolutions.com` can separate application notifications once the domain is owned and verified. [MX conflict guidance](https://developers.cloudflare.com/email-service/reference/troubleshooting/)

Keep one SPF policy per hostname, enable provider-generated DKIM, and begin DMARC with monitored reporting before tightening enforcement. Authenticate the Meddot `From` address and put the visitor's validated address in `Reply-To`; do not spoof the visitor as sender. Test external sending, receiving, replies, and spam placement before updating the site.

## 6. Add application email deliberately

Cloudflare now supports transactional outbound email through Email Sending Beta; it is not receive-only. Workers Paid includes **3,000 sent emails/month**, then **$0.35 per 1,000**. Sending to account-verified destination addresses is free on every plan and does not count toward those sending quotas. This can suit notifications to your verified business inbox; it does not create a staff mailbox or permit marketing campaigns. [Email pricing](https://developers.cloudflare.com/email-service/platform/pricing/) and [sending setup](https://developers.cloudflare.com/email-service/get-started/send-emails/)

For a free launch, consider notifying only the verified Meddot inbox and replying manually from Zoho. Sending automated confirmations to arbitrary visitor addresses through Cloudflare requires Workers Paid; do not enable it silently or confuse visits with email sends. This is an implementation option, not a feature the present form already provides.

The present Meddot form still prepares a draft that the visitor must send. Replacing it requires implemented server-side delivery, authenticated sender DNS, restricted credentials/bindings, error handling, duplicate protection, and a truthful success state. Verify receipt and replies before claiming automatic delivery.

New sending domains have **Email Preview enabled by default**, with message content retained for about seven days. Before real inquiries, review **Compute → Email Service → Email Sending → domain → Settings → Enable email preview** and turn it off when content retention is unnecessary; also review logs and access. Keep the intake general and exclude patient names, records, insurance IDs, and other PHI. This setup does not establish HIPAA compliance. [Preview settings and retention](https://developers.cloudflare.com/email-service/configuration/domains/#email-preview)

## 7. Protect inquiries without overblocking

- Keep platform DDoS protection and the appropriate default managed WAF rules; test legitimate visits after changes.
- Put Turnstile on consultation submission, not every page. Verify its token server-side through Siteverify; a widget alone is insufficient. [Server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- Scope generous rate limits to the form endpoint and monitor false positives before tightening. Preserve accessible errors and the direct-contact fallback.
- Avoid broad country blocks, permanent Under Attack Mode, and blanket bot challenges. Bot Fight Mode can affect legitimate automation; review crawler access if search/AI visibility matters. [WAF setup](https://developers.cloudflare.com/waf/get-started/)
- Use least-privilege account/API access and server-only credentials. Keep mail hostnames DNS-only and authenticate every legitimate sender.

No provider can promise that every visitor and every email will always get through. Measured protections, quotas, authentication, monitoring, and clear fallback paths reduce avoidable failures.

## 8. Control costs and make rollback real

On Free, review dynamic requests, CPU errors, email delivery, and asset routing after launch and during traffic spikes. Upgrade only for a demonstrated need: recurring CPU errors despite sensible optimization, approaching the account's dynamic-request quota, required automated emails to arbitrary recipients, or another necessary paid capability. 500 visits/day alone is not an upgrade trigger. Do not upgrade a broken route or mail configuration without fixing its cause.

If Paid becomes appropriate, start with billing/usage alerts and review request, CPU, email, and image usage. Its $5 baseline includes usage allowances, not unlimited execution. A Workers hard account spending limit can interrupt all Workers, including email invocations; it is not an exact final-bill cap. Choose that tradeoff deliberately if availability is the priority. [Spend management](https://developers.cloudflare.com/workers/platform/spend-management/)

Before DNS cutover, record the prior configuration and prove you can return traffic to Vercel. After switching, retest HTTPS, redirects, pages, images, fonts, forms, email, and crawlable metadata. Keep the old project until the new setup is stable. Review inbox/spam and errors each business day, updates weekly, and domain/payment renewals before expiry.

**Next steps:** review the domain's final checkout quote, confirm whether Zoho Free is available, and prepare/test the free hosting migration. Purchase Mail Lite only if needed. Buy Workers Paid only if runtime testing or required features justify it. Buying the domain does not require switching the live website on the same day.
