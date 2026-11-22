# Meddot Solutions: Cloudflare-first launch plan

**Updated November 22, 2026.** The preferred direction is Cloudflare for the domain, DNS, website, and application email, plus an inexpensive professional mailbox for sending and receiving. The current production website remains on [Vercel](https://meddot-solutions.vercel.app/). This is a staged plan: no domain purchase, mailbox purchase, account migration, or DNS cutover has been completed by this guide.

Open the [printable Cloudflare guide](docs/meddot-cloudflare-launch-guide.html) in a browser and use **Print → Save as PDF**. The existing [Vercel guide](DEPLOY-VERCEL.md) remains the reference for the live deployment and fallback.

## 1. Recommended setup

| Service | Recommended role |
|---|---|
| Cloudflare Registrar and DNS | Own and renew the domain; manage website and email records |
| Cloudflare Workers Paid | Host the tested application after migration validation |
| Cloudflare Turnstile and scoped rate limiting | Protect consultation submission without challenging ordinary page browsing |
| Cloudflare Email Sending Beta | Send application notifications; not a full staff mailbox |
| Zoho Mail Lite, if approved | Low-cost business inbox for everyday sending, receiving, and replies |

**Domain candidate:** `meddotsolutions.com` matches the brand. Cloudflare's public search showed **$11.17 to buy, renewing at $11.17/year**, observed November 22. Availability, checkout price, and tax must be rechecked immediately before payment. The domain is not reserved by this observation. [Live domain search](https://www.cloudflare.com/domains/search?q=meddotsolutions.com)

**Email preference confirmed:** a low-cost professional inbox with sending and receiving. Zoho Mail Lite is the recommended provider for that architecture; its subscription purchase has not been approved or completed. Workspace remains an alternative if a full Gmail web experience later matters more than minimum cost.

## 2. Budget before purchasing

All figures are **USD**, checked November 22, 2026; tax, usage overages, exchange-rate/payment fees, and optional add-ons are extra.

| Item | Published baseline | Billing cadence |
|---|---:|---|
| Candidate standard `.com` domain | $11.17/year observed | Annual registration/renewal |
| Workers Paid | $5/month minimum; $60/year equivalent | Monthly, plus applicable usage |
| Recommended Zoho Mail Lite 5 GB | $1/user/month; $12/year for one user | Annual subscription |
| Recommended one-mailbox total | **$83.17/year baseline** | Separate bills; about $6.93/month equivalent |
| Workers/domain with free forwarding | $71.17/year baseline | No complete professional mailbox included |

Workers Paid includes usage allowances, not unlimited dynamic execution. Ordinary static-asset requests are free; dynamic request/CPU overages and other services can add charges. Review [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [Zoho pricing](https://www.zoho.com/mail/zohomail-pricing.html) at purchase.

This budget uses a Free website/DNS zone with a separate Workers Paid subscription; it does not include or require budgeting for a website Pro upgrade. Workers Free is cheaper, but its 100,000 dynamic requests/day and 10 ms CPU/request can interrupt server-rendered pages when limits are reached. The $5 Workers baseline is the recommended balance for this application; preview testing and monitoring are still necessary. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)

Google Workspace Business Starter is an alternative: **$7/user/month with a one-year commitment ($84/year)** or **$8.40/month flexible ($100.80/year)**, before tax and regional variations. Domain plus Workers plus one Workspace user would therefore start at $155.17/year committed or $171.97/year flexible. [Google billing plans](https://knowledge.workspace.google.com/admin/billing/compare-flexible-and-annual-fixed-term-payment-plans)

## 3. Buy and secure the domain first

1. Sign in to your own Cloudflare account, enable MFA, and retain recovery codes securely.
2. Recheck the exact spelling, availability, initial price, renewal price, and final checkout total. Review the purchase and terms yourself.
3. Complete registrant-email verification. Confirm auto-renewal, a valid payment method, registrar lock, and DNSSEC protection.
4. Keep an external recovery address that works if the new domain's email stops working.
5. Record renewal date and account ownership. Keep credentials and recovery codes outside GitHub and shared guides.

Cloudflare Registrar uses Cloudflare nameservers. Buying there does not force immediate website migration: the current Vercel deployment can continue while the Cloudflare version is tested. Do not replace working website or email records during registration. [Registration requirements](https://developers.cloudflare.com/registrar/get-started/register-domain/)

## 4. Migrate the website in stages

Cloudflare's November 5 Next.js guide recommends **vinext**, which is still beta. Current deployment guidance uses a compatibility review and a `cloudflare.config.ts` workflow. Meddot's older Sites/Vinext/Wrangler helpers are **not proof that direct customer-managed Workers deployment is ready**. Follow the current [Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) and [Vercel-to-Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nextjs/), rather than copying old deployment commands.

The installed Vinext 1.4.2 static scan on November 22 reported **15 supported checks, no partial support, and no issues**. This was not a Workers production build or deployment test. The current Vite configuration also contains Sites-specific plugins/bindings that need review before a personal Cloudflare deployment.

1. Preserve the working Vercel project, source commit, and DNS records. Build the migration on a branch.
2. Run the current compatibility checks, review unsupported features, and configure the current adapter/deployment tooling. If needed, evaluate Cloudflare's [OpenNext alternative](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/).
3. Deploy to a Cloudflare preview address first. Verify server-rendered Contact behavior, form origin checks, security headers, static routes, canonicals, sitemap, fonts, images, and error responses.
4. Test desktop/mobile, keyboard navigation, valid/invalid inquiries, body limits, and the direct-email fallback. Adapt runtime tests for Workers: the existing security launcher starts a Node/Next server and does not test Workers by itself. A Next.js/Vercel pass alone does not verify Workers compatibility.
5. Confirm rollback, logs, usage alerts, and the previous working deployment before assigning the purchased domain.

Keep the existing preoptimized WebP assets where practical. If the image adapter depends on Cloudflare Images transformations, review that dependency: the Free allowance is 5,000 unique transformations/month, after which new transformations can fail. Test original-image fallback or approve explicit Images billing before relying on it. [Images pricing](https://developers.cloudflare.com/images/pricing/)

When ready, attach the domain through the chosen Workers custom-domain workflow, choose apex or `www` as primary, and redirect the other. Apply only the records the platform requires. Set `NEXT_PUBLIC_SITE_URL` to the owned HTTPS origin and `NEXT_PUBLIC_CONTACT_EMAIL` to the tested receiving inbox, then rebuild. Preserve email DNS and the Vercel rollback path until the replacement is stable.

## 5. Set up the professional mailbox

**Free starting option:** Cloudflare Email Routing forwards a public address to a verified existing inbox such as the current Gmail account. It is not a complete business mailbox, and forwarding alone does not provide ordinary professional-address replies. Do not assume a personal Gmail sending workaround will remain available indefinitely. [Email Routing](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)

Google has announced removal of third-party **Send as**, Gmailify, and POP fetching from January 2027. Forwarding into Gmail can still receive mail, but it does not solve professional outgoing correspondence. Use Zoho's app/a standard supported client, or Workspace for Gmail on the web. [Google announcement](https://support.google.com/mail/answer/17101213?hl=en)

**Recommended low-cost setup:** after approving the provider purchase, create one Zoho Mail Lite mailbox with an appropriate public alias. Use Zoho webmail/app or a supported email client for staff correspondence. Verify the domain, create the mailbox, then copy Zoho's exact regional MX and authentication values from its setup wizard. Use Workspace if you prefer Gmail on the web.

**Pick one root-domain MX system.** Cloudflare Email Routing requires exclusive root MX records and cannot run alongside Zoho/Workspace MX at the same root. For a paid mailbox, keep Cloudflare DNS, point root MX to the mailbox provider, and leave root Email Routing disabled. A sending subdomain such as `notify.meddotsolutions.com` can separate application notifications once the domain is owned and verified. [MX conflict guidance](https://developers.cloudflare.com/email-service/reference/troubleshooting/)

Keep one SPF policy per hostname, enable provider-generated DKIM, and begin DMARC with monitored reporting before tightening enforcement. Authenticate the Meddot `From` address and put the visitor's validated address in `Reply-To`; do not spoof the visitor as sender. Test external sending, receiving, replies, and spam placement before updating the site.

## 6. Add application email deliberately

Cloudflare now supports transactional outbound email through Email Sending Beta; it is not receive-only. Workers Paid includes **3,000 sent emails/month**, then **$0.35 per 1,000**. Sending to account-verified destination addresses is free on every plan and does not count toward those sending quotas. This can suit notifications to your verified business inbox; it does not create a staff mailbox or permit marketing campaigns. [Email pricing](https://developers.cloudflare.com/email-service/platform/pricing/) and [sending setup](https://developers.cloudflare.com/email-service/get-started/send-emails/)

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

Start with billing/usage alerts and review request, CPU, email, and image usage. A Workers hard account spending limit can interrupt all Workers, including email invocations; it is not an exact final-bill cap. Choose that tradeoff deliberately if availability is the priority. [Spend management](https://developers.cloudflare.com/workers/platform/spend-management/)

Before DNS cutover, record the prior configuration and prove you can return traffic to Vercel. After switching, retest HTTPS, redirects, pages, images, fonts, forms, email, and crawlable metadata. Keep the old project until the new setup is stable. Review inbox/spam and errors each business day, updates weekly, and domain/payment renewals before expiry.

**Next decisions:** approve the domain at its final checkout quote and the recommended mailbox subscription, then authorize the tested application migration. Buying the domain does not require switching the live website on the same day.
