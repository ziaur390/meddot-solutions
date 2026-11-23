# Meddot Solutions owner launch handbook

**Prepared November 23, 2026.** Use this handbook to finish the launch and run the website. Account procedures and prices were checked against the linked official documentation. Dashboard labels can move; use the named feature or dashboard search when a menu differs.

Open the [printable owner handbook](docs/meddot-owner-handbook.html). In your browser, choose **Print → Save as PDF** for an offline copy. These instructions do not purchase services or activate the features marked pending.

## 1. Start here

Your website is hosted at [meddot-solutions.ziaurrahman-26261.workers.dev](https://meddot-solutions.ziaurrahman-26261.workers.dev/). GitHub `ziaur390/meddot-solutions`, branch `main`, supplies the deployment. The last verified release is `7479602f5678a5a7efa39e0b82f32510490ff0d4`. Cloudflare deployment, GitHub checks, and the Vercel fallback passed during migration.

| Item | Last verified position | Next action |
|---|---|---|
| Cloudflare hosting | Live; prebuilt pages plus a small Worker | Check the appearance on your devices |
| Domain | Purchase and connection not verified | Complete section 2 |
| Business inbox | Site uses `ziaurrahman.26261@gmail.com` | Complete section 3 |
| Consultation form | Reviews details and prepares an email draft | Visitor must still send that email |
| Automatic form delivery and Turnstile | Pending implementation | Complete the owner preparation in section 4 |
| Operational logs | Enabled; query strings redacted | Review errors and usage |
| Search Console and visitor analytics | Setup not verified | Complete section 6 after choosing the final domain |

**Follow this order:** secure your accounts → buy and connect the domain → verify the business inbox → implement and test automatic inquiries → finish search setup → announce the website. Keep the current direct-email contact available during the transition.

Jump to [domain setup](#2-domain-and-dns), [email setup](#3-professional-email), [automatic inquiries](#4-automatic-inquiries-and-turnstile), [security](#5-security-and-healthcare-trust), [search](#6-search-visibility-and-visitor-measurement), [maintenance](#7-updates-backups-and-maintenance), or [troubleshooting](#8-troubleshooting-and-rollback).

### What you handle and what needs implementation

You handle account sign-ins, terms, payments, registrant details, recovery codes, mailbox creation, and approvals for account access. A developer handles website configuration, server-side email delivery, Turnstile integration, release checks, and any custom redirects. Creating an account or widget does not complete its website integration.

Use a password manager for credentials. This handbook can hold public configuration and completion dates; keep passwords, authentication codes, payment details, API tokens, and patient information out of it.

### Budget for the current scale

At approximately 100 visits/day, occasionally 500, keep the tested Free hosting architecture and monitor it. A visitor can make several requests; static asset traffic and dynamic Worker invocations are different measures. Free Workers currently allow 100,000 dynamic requests/day per account and 10 ms CPU/invocation. Upgrade for measured resource requirements or a necessary paid feature. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)

| Setup | Estimated annual baseline |
|---|---:|
| Domain + free hosting + eligible Zoho Free mailbox | $11.17 |
| Domain + free hosting + one Zoho Mail Lite mailbox | $23.17 |
| Optional Workers Paid | Add $60/year equivalent, plus applicable usage |

These are USD estimates before tax and payment fees. The `meddotsolutions.com` quote was observed on November 22 at $11.17 registration and renewal; it is not reserved. Mail Lite's published 5 GB price is $1/user/month billed annually. Confirm eligibility, checkout totals, and renewals before paying. No Cloudflare Pro, VPS, paid SSL bundle, or database is needed for the present marketing site. [Registrar pricing](https://pricing.registrar.cloudflare.com/), [mailbox pricing](https://www.zoho.com/mail/zohomail-pricing.html)

These totals exclude any separately paid Vercel fallback. After Cloudflare is stable and recovery is proven, review whether that extra hosting is worth retaining; save the source and configuration before retiring an unused service. Review cancellation and billing consequences in your own account.

## 2. Domain and DNS

**Goal:** visitors use one Meddot domain, with working HTTPS and the same pages and consultation form.

### Buy the name in your own account

1. Sign in to the existing Cloudflare account. Verify its email and secure its sign-in before purchasing.
2. Open **Domain Registration → Register Domains**, or search the dashboard for **Register domains**. Search `meddotsolutions.com`, or your chosen alternative.
3. Read the exact spelling, extension, initial price, renewal price, term, and final total. Check that the name fits your business and does not misleadingly copy another brand.
4. Enter accurate registrant information and review the terms and payment yourself. Choose only the term and services you intend to buy.
5. Open the registrant-verification email and complete it. Record the renewal date, confirm auto-renewal and a valid payment method, and check the registrar lock and DNSSEC status.

Cloudflare Registrar keeps the domain on Cloudflare nameservers. Registrant-email verification matters: an unverified or expired verification can put the domain on hold. Buying the name does not create a mailbox or attach it to this Worker. [Registration instructions](https://developers.cloudflare.com/registrar/get-started/register-domain/)

### Connect the website

1. Confirm that the purchased domain appears as an **Active** zone in Cloudflare.
2. Open **Workers & Pages → meddot-solutions → Domains**, or **Settings → Domains & Routes → Add → Custom Domain**.
3. Enter the owned hostname, such as the root domain without `www`, and choose the production custom-domain option. Let Cloudflare provision its DNS record and certificate.
4. Wait for the certificate/domain status to become active, then visit the HTTPS address in a normal browser. Check Home, a service page, Contact, and a deliberately missing page.

Use the Worker Custom Domain flow rather than inventing an IP address. An existing CNAME on that exact hostname can conflict: identify its purpose and save the existing DNS configuration before replacing a website record. Preserve mail and verification records. [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

### Choose the main address and finish the configuration

For Meddot, the root domain is a simple main address. Make `www` work too, with a redirect to the main address that preserves each page path and query string. A developer should configure the exact host match and test for loops. The redirecting hostname needs Cloudflare-proxied DNS; attaching both owned hostnames as Worker Custom Domains is one way to establish them before adding the host-specific redirect. Never redirect every service-page visit to the homepage.

Then change the Cloudflare **build variable** `NEXT_PUBLIC_SITE_URL` to the main HTTPS origin and rebuild. This updates canonicals, social metadata, structured data, robots, and sitemap. If custom domains are managed in `wrangler.cloudflare.jsonc`, record them as `routes` with `custom_domain: true`; if managed only in the dashboard, keep that choice consistent rather than adding a contradictory routes list. [Routing configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)

Test the root and `www` versions with a real service path, and test a URL containing `?service=medical-billing`. Open the Contact page on the final domain and submit synthetic details to verify its same-origin checks. Leave the temporary Worker URL and fallback available during verification; coordinate their canonical/redirect handling after the final domain is stable.

**Done when:** both public hostnames behave deliberately, HTTPS is valid, service URLs retain their paths, and the deployed sitemap/canonical URLs use the final domain.

**If it fails:** check zone activation, hostname conflicts, certificate status, and the exact Worker binding. A certificate warning needs investigation; do not bypass it or downgrade HTTPS.

## 3. Professional email

**Goal:** receive and reply using a branded address such as `hello@YOUR_DOMAIN`. Replace `YOUR_DOMAIN` everywhere with the name you actually own.

### Select the mailbox

Check Zoho's **Forever Free** custom-domain plan first. It supports one domain, up to five users, and 5 GB/user, with webmail/mobile access. Availability depends on the data center, and it excludes IMAP, POP, and ActiveSync. Use Mail Lite if Free is unavailable or you need a supported external email client. Adding a sixth Free user moves the organization to a paid plan. [Free-plan eligibility](https://www.zoho.com/mail/help/adminconsole/subscription.html), [plan comparison](https://www.zoho.com/mail/compare/overview.html)

Cloudflare Email Routing is free forwarding into another inbox. It does not supply the full everyday branded mailbox you requested. For this setup, let Cloudflare host DNS and Zoho host the inbox. Keep root Cloudflare Email Routing disabled when using Zoho's root MX records. [MX conflict guidance](https://developers.cloudflare.com/email-service/reference/troubleshooting/)

### Verify the domain, then create the inbox

1. Start from Zoho's business-mail pricing/signup page. Choose the custom-domain organization option, enter your owned domain, and use accurate account information.
2. Open the Zoho Admin Console, select the domain, and choose TXT domain verification.
3. Copy the exact verification name/value supplied for your account. In **Cloudflare → your domain → DNS → Records → Add record**, select TXT and enter those values. Cloudflare may append the zone name, so inspect the resulting hostname to avoid duplicating your domain.
4. Return to Zoho and choose **Verify**. If pending, check the record and allow time for DNS rather than repeatedly replacing it.
5. Create the mailbox user and set its password and MFA yourself. Sign in to Zoho webmail before changing incoming-mail records. Add extra public aliases only if the selected plan supports them and someone will monitor them.

TXT verification establishes ownership without requiring a broad automatic DNS authorization. Zoho also offers an automatic connection; review its requested DNS access before choosing it. [Domain verification](https://www.zoho.com/mail/help/adminconsole/domain-verification.html)

### Add the mail DNS records

Use the exact **regional** records from the Zoho wizard. The table explains their purposes; it is not a set of values to paste.

| Record | What to enter |
|---|---|
| MX | Every mail-server hostname and priority supplied by Zoho |
| SPF TXT | The authorized-sender policy for this account/data center |
| DKIM TXT | The selector name and public-key value generated by Zoho |
| DMARC TXT | The policy for `_dmarc` at your domain |

Create the user first, then replace only the previous provider's MX records when ready to switch delivery. MX/TXT records are not proxied. Any separate SMTP/IMAP hostname using an A, AAAA, or CNAME record should be DNS-only as required by the provider. [Hosting setup sequence](https://www.zoho.com/mail/help/adminconsole/email-hosting-setup.html)

Keep **one SPF record per hostname**. If more than one service sends mail, combine the authorized mechanisms correctly instead of publishing a second `v=spf1` record. Publish the DKIM public key in DNS and enable the selector in Zoho; keep private keys private. [SPF setup](https://www.zoho.com/mail/help/adminconsole/spf-configuration.html), [DKIM setup](https://www.zoho.com/mail/help/adminconsole/dkim-configuration.html)

Start DMARC in monitored `p=none` mode while identifying all legitimate senders. A template is `v=DMARC1; p=none; rua=mailto:hello@YOUR_DOMAIN;`. Replace the address with an actual working mailbox you control; aggregate reports can be technical and noisy. After legitimate mail passes alignment, plan a reviewed move to quarantine/reject. Check for an existing DMARC record before adding one. [DMARC setup](https://www.zoho.com/mail/help/adminconsole/dmarc-policy.html)

### Test before changing the website

Send a simple business test from Zoho to an external Gmail or Outlook inbox. Reply back. Send a fresh message from that external account to the branded address. Check inbox and spam, and inspect authentication results for SPF, DKIM, and DMARC. Repeat with another provider when practical. Authentication improves delivery; no provider guarantees inbox placement.

After these tests, update `vars.CONTACT_EMAIL` in `wrangler.cloudflare.jsonc`. If `NEXT_PUBLIC_CONTACT_EMAIL` is set, it must match. Rebuild and deploy so the public address and draft recipient change together. Keep the personal address as a temporary recovery/fallback until delivery is proven. [Project configuration steps](CLOUDFLARE-MIGRATION.md)

**Done when:** branded sending, receiving, and replies work; authentication passes; and the website's visible email and prepared-draft recipient match the tested mailbox.

**If it fails:** receiving problems usually point to MX/user setup; authentication failures need SPF/DKIM/DMARC review. Do not delete unrelated website records to troubleshoot email.

## 4. Automatic inquiries and Turnstile

**Current behavior:** the form validates details, shows a private review page, and opens an email draft. Meddot receives the inquiry only after the visitor sends it. Automatic delivery and Turnstile are not implemented. There is no saved lead database to recover an unsent draft from.

My recommendation is to finish reliable server-side delivery before spending on ads. This removes the extra email-app step from the visitor's journey.

### Owner preparation

1. Finish the domain and receiving-inbox tests above. Decide who owns incoming requests and the response schedule you can meet.
2. In **Cloudflare → Turnstile → Add widget**, use a descriptive name such as **Meddot consultation**. For the U.S. audience, select **Rest of World** and **Managed** mode. Add the exact production hostname; add the temporary Worker hostname only while it is used for testing. General form protection does not require site-wide pre-clearance.
3. Save the public sitekey and private secret in appropriate places. The sitekey can be used in frontend configuration. Store the secret only in the Worker's **Variables and Secrets** when the implementation specifies its exact name. Never put it in a `NEXT_PUBLIC_` variable, source file, or chat.
4. Choose the notification route with the developer. Cloudflare currently permits free sending to account-verified destination addresses on all plans; arbitrary-recipient sending requires Workers Paid. A notification to your verified inbox with manual branded replies can suit a free launch. Confirm account/Beta availability and compatible DNS before relying on it. [Widget setup](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/), [email pricing](https://developers.cloudflare.com/email-service/platform/pricing/)

### Developer implementation still required

The developer must add the widget, pass its token with the form, and verify it server-side through Siteverify before any notification is sent. Validate the returned hostname/action as appropriate. Tokens expire after five minutes, and reuse detection is eventually consistent, so add application-level duplicate protection as well. Preserve the existing origin, size, field, and HTML-escaping protections. [Server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

Delivery needs a restricted email binding or server-only credentials, authenticated Meddot sender, validated visitor `Reply-To`, safe timeouts/retries, and an accessible failure state. Do not use the visitor's address as a spoofed `From`. Show a truthful accepted/failed result and distinguish provider acceptance from confirmed inbox receipt. Update the form's copy only when its behavior actually changes.

Keep Zoho's root MX records. Configure only the additional sender/subdomain records the selected notification service requires. Review DMARC during onboarding: Cloudflare can add a rejecting policy if none exists. Its new sending-domain **Email Preview** is on by default and retains content for about seven days; review **Email Service → Email Sending → domain → Settings → Enable email preview** and turn it off when that retention is unnecessary. [Sending-domain settings](https://developers.cloudflare.com/email-service/configuration/domains/)

### Acceptance checks

- A normal request from desktop and mobile reaches the intended inbox, with correct service, sender, and reply behavior.
- Missing/expired/invalid Turnstile tokens, cross-site submissions, and oversized fields are rejected without sending mail.
- Double-clicking and network retries do not create duplicate alerts.
- A mail-provider failure produces a useful retry/direct-email option, without a false success message.
- Private responses remain uncacheable and unindexed; logs and analytics exclude the inquiry body.
- The test data contains no patient names, records, insurance IDs, or other PHI.

**Done when:** the deployed form delivers a synthetic request to the inbox, the failure paths work, and the website accurately describes the new flow. A created widget or verified sending domain alone is not completion.

## 5. Security and healthcare trust

### Secure the accounts

Enable strong sign-in protection on Cloudflare, GitHub, the recovery email, and Zoho. Use passkeys/security keys where supported or an authenticator app, and keep recovery codes in a password manager with an offline recovery plan. If the account signs in through Google/SSO, secure that identity provider too; available MFA controls can differ. [Cloudflare 2FA guidance](https://developers.cloudflare.com/learning-paths/application-security/account-security/set-up-2fa/)

Review members and connected apps. Give access to the required project/repository instead of sharing your login. Keep a working external recovery address, so losing access to the business domain does not also remove the way to recover its account. Review a developer's requested access and remove it when no longer needed.

### Protect visitors without unnecessary challenges

The site already has browser protections and strict consultation validation. Once automatic sending is implemented, apply Turnstile and measured rate limits to that endpoint. Preserve usable errors and a direct-contact fallback. Avoid blanket country blocks, permanent Under Attack Mode, and broad challenges without observed abuse. Do not switch off TLS validation or remove origin checks to make a failing test pass.

Monitor dynamic request/CPU failures and operational logs. Query-string redaction is configured; inquiry contents should not be logged. Keep log access limited and review the provider's current retention/allowances. Cloudflare's Observability pricing changes on December 1, 2026; the current official page explains Free-plan ingestion limits and what happens at the limit. [Observability pricing](https://developers.cloudflare.com/observability/pricing/)

### Publish trust statements you can support

Use confirmed contact details, real social profiles, and only locations you can accurately represent. Keep AI receptionist and other healthcare AI offerings labeled **in development** until available. Name specialties as proven experience only when you can substantiate that experience. Publish case studies and testimonials with permission and real evidence; agree on response hours before promising them.

Keep consultation intake limited to general business needs. This website deployment, a domain, and an inexpensive mailbox do not establish HIPAA compliance. Billing work involving PHI can make a company a business associate; HHS identifies billing among relevant activities and describes the required safeguards/agreements. Before accepting PHI, arrange a reviewed client onboarding process, appropriate contracts/BAAs, approved systems, access controls, and staff procedures. [HHS business-associate guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html)

Prepare privacy/contact information that matches the website's actual form, mailbox, analytics, providers, and retention. Update it when automatic delivery or tracking is introduced; obtain qualified advice for the business's applicable obligations. Do not publish an invented compliance certification or promise that nothing can ever be blocked.

**Done when:** account recovery is workable, access is reviewed, public claims are supported, and the intake/handling instructions match the services actually operating.

## 6. Search visibility and visitor measurement

Do this on the final domain after HTTPS and canonical URLs are stable. The migration checked page accessibility and metadata; it did not verify ownership of your Search Console or analytics accounts.

### Google Search Console

1. Open [Search Console](https://search.google.com/search-console/). Sign in with an account the business will retain.
2. Add a **Domain property** for the owned domain, without `https://` or a page path.
3. Copy its verification TXT value. Add it as a separate TXT record in Cloudflare DNS; preserve existing SPF, DKIM, and mail records.
4. Return to Search Console and verify. Keep the verification record after success.
5. Open **Sitemaps** and submit the final domain's `/sitemap.xml`.
6. Use **URL Inspection** for the homepage and important service pages. Check the selected canonical, crawl/indexing information, and live test. Request indexing for key ready pages when offered.

Verification and sitemap submission do not guarantee indexing or rankings. Check reported issues, allow processing time, and avoid repeatedly submitting the same URL as a substitute for fixing a problem. [Ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### Analytics

Start with one measurement approach. Cloudflare Web Analytics can provide a simple first view of visits and performance. Open **Web Analytics → Add a site**, select/enter the final hostname, and inspect its setup status. Eligible proxied sites can use automatic injection; otherwise a developer must add the supplied snippet. Verify real data arrives and avoid installing a second copy. These account and code steps have not been performed for Meddot. [Analytics setup](https://developers.cloudflare.com/web-analytics/get-started/)

If advertising later needs GA4 conversions, plan that integration separately. Track general events such as a successful inquiry acceptance; never send form text, email addresses, names, patient details, or other sensitive content as event parameters or page URLs. Account for appropriate privacy/consent requirements before enabling tracking.

### Content and AI visibility

For each service page, explain the work, who it suits, the information needed to start, and the next step. Use clear descriptions and link related services. Add useful resources when you can maintain and substantiate them. Keep structured data consistent with the visible facts. Google says its ordinary SEO principles apply to AI features; special AI text files or markup are not required, and inclusion is not guaranteed. [Google AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features)

Check Google Business Profile eligibility before creating one. Google generally requires in-person customer contact and excludes online-only businesses; do not add a borrowed address, mailbox, or invented office to qualify. Use the real business model. [Eligibility rules](https://support.google.com/business/answer/13763036?hl=en)

**Done when:** domain ownership is verified, the sitemap is submitted, important URLs are inspected, and the selected analytics setup records visits without collecting inquiry contents. Review results over time rather than promising immediate traffic.

## 7. Updates, backups, and maintenance

### A routine you can sustain

| Frequency | Action | Evidence to keep |
|---|---|---|
| Each business day | Check inbox/spam and reply to real inquiries; glance at site availability/errors | Inquiry owner and next action |
| Each week | Test the consultation path with synthetic details; review Worker CPU/errors, builds, and relevant dependency alerts | Date, result, and any issue |
| Each month | Check search trends, mobile usability, slow pages, contact details, costs, and account access | A short change/action log |
| Before renewals | Confirm domain/mailbox dates, payment method, and account recovery | Renewal confirmation |
| After a significant change | Check affected pages, delivery, metadata, permissions, and rollback | Release reference and checks |

Choose response hours you can actually support. Use a small inquiry tracker with business-only details, owner, status, and next action. Keep PHI out of this marketing workflow.

### Publish changes through the existing project

Keep the current repository and Worker rather than creating duplicates. Review changes on a branch when practical; merge/push to `main` after the required checks. Cloudflare's saved commands are `npm run build:cloudflare` and `npm run deploy:cloudflare`. Inspect the resulting build and active deployment before announcing a release. The [migration guide](CLOUDFLARE-MIGRATION.md) contains the exact current variables and local checks.

For a source/configuration change, the local verification sequence is:

```text
npm run build:cloudflare
npm run check:cloudflare
```

Then run the applicable tests. The connected Git build performs publishing; you do not need a separate Wrangler login for that route. Treat a failed build as an issue to diagnose, not a reason to bypass the checked deploy wrapper.

### Keep separate backups

GitHub preserves source and history. It does not back up your mailbox, DNS, account recovery codes, or future lead data. Keep an additional repository copy in a controlled location. Export DNS before significant changes through **DNS → Records → Import and Export → Export**; store the export privately and record when it was taken. [DNS export](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/)

Follow the mailbox provider's supported export/backup options for your selected plan, and test that an export can be read. Keep credentials out of Git and backups encrypted where appropriate. Record the last working deployment and public settings, so recovery is a procedure you can repeat rather than a screenshot you cannot reconstruct.

**Done when:** someone owns the routine, a recent source/DNS/mail recovery reference exists, and a release can be verified and recovered without guessing.

## 8. Troubleshooting and rollback

| Symptom | Check first | Next action |
|---|---|---|
| Cloudflare build failed | First meaningful error; build variables and matching contact email | Fix the cause and retry the reviewed build |
| Domain cannot be reached | Registration verification, Active zone, Worker Custom Domain, certificate | Correct the specific configuration; preserve mail DNS |
| Too many redirects | Opposing root/`www` or HTTP/HTTPS rules | Retain one intended direction and test a full service path |
| Worker resource error, including 1102 | CPU/error metrics and recent code changes | Optimize/restore working code; consider Paid only for a demonstrated need |
| Email will not receive | Created user and exact regional MX records | Correct MX/provider setup; check for conflicting root Email Routing |
| Mail arrives in spam or bounces | SPF, DKIM, DMARC alignment and provider reason | Correct authentication and review the actual rejection |
| Form shows review but no message arrives | Current draft flow requires visitor to send | Check the email draft/send step; automatic delivery is pending |
| Future automatic delivery fails | Provider response, verified recipient, Turnstile result, duplicate handling | Keep a useful error/direct-email fallback and fix the failing component |
| In-app browser fails but normal HTTPS checks pass | Try a regular browser/device/network | Record the difference; do not weaken security settings without evidence |

### Roll back a bad release

1. Identify the last known working version and what changed. Check whether the problem is application code, configuration, DNS, or mail.
2. In **Workers & Pages → meddot-solutions → Deployments**, open the chosen version's menu and select the available rollback action. Review the target before applying it.
3. Retest Home, a service page, Contact, static assets, and the affected behavior. Previously opened pages can request assets from a newer version, so include a fresh load and normal navigation.
4. Reconcile the source on GitHub with a reviewed corrective/revert commit. A later `main` build can otherwise reintroduce the broken change. Do not force-push or delete repository history as a routine repair.

A Worker rollback does not restore every connected resource or DNS/mail setting. Record and restore those separately when needed. [Cloudflare rollback behavior](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)

The [Vercel guide](DEPLOY-VERCEL.md) describes the retained fallback. Confirm it still works and that any business site retained there complies with its plan terms, including a public fallback. Vercel Hobby is restricted to personal/noncommercial use. Retire unnecessary paid hosting only after Cloudflare and the recovery plan are stable. [Vercel terms](https://vercel.com/legal/terms)

For suspected account compromise, act from a trusted device: secure the controlling email/account, review sessions and access, revoke affected credentials, and investigate changes. Keep a record of what happened and seek appropriate incident support for any sensitive-data exposure. [Cloudflare account recovery steps](https://developers.cloudflare.com/fundamentals/account/account-security/secure-a-compromised-account/)

## 9. Final launch checklist

Use this as a review worksheet, not a claim that these steps are already complete.

- The domain is owned in your account, verified, renewed correctly, and recoverable.
- The main HTTPS address, `www` behavior, service URLs, and missing-page responses work.
- Canonicals, social previews, robots, and sitemap use the final domain.
- The branded inbox passes sending, receiving, reply, and authentication checks.
- The website uses the tested contact address throughout.
- Consultation behavior is accurately described; automatic sending is claimed only after receipt testing.
- Turnstile and delivery failure/duplicate tests pass when those features are implemented.
- Mobile, keyboard navigation, readable text, and image/font loading are checked in a normal browser.
- Services, specialties, social links, location information, testimonials, and compliance statements are accurate.
- Search Console and the selected analytics approach are verified, without collecting inquiry contents.
- Account MFA/recovery, monitoring ownership, backups, and rollback references are recorded.

Record these **non-secret** handover details: final domain; public inbox; person checking inquiries; agreed response hours; domain/mail renewal dates; most recent working release; date of last form test; date of last DNS export; outstanding implementation tasks. Save secrets in the password manager instead.

For the next assisted step, provide the purchased domain, chosen mailbox provider/plan, and which stage is complete. Public hostnames and the exact error text are useful; passwords, tokens, recovery codes, and patient data are not needed in chat.

Keep the [migration guide](CLOUDFLARE-MIGRATION.md), [cost/options guide](CLOUDFLARE-LAUNCH.md), and [Vercel fallback guide](DEPLOY-VERCEL.md) alongside this handbook. Recheck provider instructions and prices when making a purchase or changing the architecture.
