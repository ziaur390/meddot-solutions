# Meddot Solutions launch guide

**Prepared November 20, 2026.** Publish the website, connect a domain, set up business email, and maintain the launch. The companion [printable guide](docs/meddot-launch-guide.html) opens in a browser; use **Print → Save as PDF** for a shareable copy.

## Your setup at a glance

| Part | What it does | Meddot's current position |
|---|---|---|
| GitHub | Stores source and change history | [ziaur390/meddot-solutions](https://github.com/ziaur390/meddot-solutions), production branch `main` |
| Vercel | Builds and hosts the website | [meddot-solutions.vercel.app](https://meddot-solutions.vercel.app/) |
| Domain registrar | Registers and renews the name you buy | Choose a registrar and a name you can own |
| DNS host | Connects that name to website and email services | Usually the registrar; can be a separate provider |
| Email provider | Provides the actual inbox and sending service | Currently using `ziaurrahman.26261@gmail.com` |
| Consultation form | Validates an inquiry and prepares an email draft | Visitor must send the draft; no automatic email or storage |

These are separate services. Buying a domain does not create a mailbox, and connecting Vercel does not enable email delivery. `your-domain.com` and `hello@your-domain.com` below are placeholders, not claims of ownership or availability.

## 1. Make the small decisions first

- Choose one main domain and the person who owns its account.
- Choose the mailbox provider your team wants: Google Workspace for Gmail, or Microsoft 365 with Exchange Online for Outlook.
- Decide who checks inquiries, the receiving address, and a response schedule you can meet.
- Use accounts you control for GitHub, Vercel, the registrar, and email. Enable MFA, save recovery codes in a password manager, and keep a working external recovery email.
- Record initial and renewal prices, billing intervals, taxes, and any usage charges before approving purchases.

**Hosting plan:** Meddot is a commercial business website. Vercel's Hobby plan is for personal, noncommercial use; choose a business-eligible plan such as Pro and review current terms, included usage, and spend controls. See [Vercel plan restrictions](https://vercel.com/docs/plans/hobby) and [live pricing](https://vercel.com/pricing). Changing this repository does not purchase a plan.

## 2. Buy a domain

1. Search for a short, easy-to-say name matching Meddot Solutions. Check availability at checkout and check for conflicting brands before buying.
2. Compare registrars. [Vercel Domains](https://vercel.com/domains) keeps hosting and domain management together. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) is another option; it requires Cloudflare nameservers, so DNS records stay in Cloudflare while your website can run on Vercel.
3. Compare **renewal** pricing, not only a discounted first year. Review privacy options, transfer rules, support, and whether the quoted name has premium pricing. Prices depend on the name and extension; use the registrar's current quote.
4. Register in an account you control. Review the final charge and terms yourself before paying. Skip hosting, website-builder, SSL, or email bundles unless you intend to use them.
5. Complete the registrar's contact-verification email. Enable auto-renewal, keep billing details current, and enable the registrar lock and MFA.
6. Record the domain, registrar, renewal date, authoritative nameservers, and DNS login location. Keep passwords outside this guide and GitHub.

You can buy before or after deploying. Vercel supplies HTTPS for a correctly configured domain, so a separate SSL purchase is normally unnecessary. Read the registrar's [domain registration instructions](https://developers.cloudflare.com/registrar/get-started/register-domain/) before choosing its DNS workflow.

## 3. Deploy or update the Vercel project

The site is already deployed. **Use the existing project** when it belongs to your account; duplicate projects can cause confusing domains and deployments. In Vercel, open Meddot and check **Settings → Git** for the repository and production branch.

If you need to create it again:

1. Sign in at [vercel.com/new](https://vercel.com/new) and import `ziaur390/meddot-solutions`. Grant GitHub access to this repository when prompted.
2. Set production branch `main`. The application is at the GitHub repository root, so **Root Directory is `./`**. The local folder being named `website` does not make the GitHub root setting `website`.
3. Use the following settings. The committed `vercel.json` already selects Next.js and the Vercel build command.

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | `./` |
| Node.js | Supported Vercel Node 22 release meeting `>=22.13.0` |
| Build command | `npm run build:vercel` |
| Output directory | Leave the Next.js default; do not enter `dist` |
| Install command | Prefer `npm ci --ignore-scripts --no-fund` for the committed lockfile |
| Database | Not required for the current marketing site |

4. Add the public configuration in section 5, or keep its current fallbacks while testing the Vercel URL.
5. Select **Deploy**, wait for **Ready**, then open the deployment. If it fails, inspect the first meaningful build-log error before changing settings.

For later changes, commit and push to `main`; the Git integration creates a production deployment. Use a branch/pull request for a preview when you want review before release. Confirm the deployed commit matches the intended change. See [Git deployments](https://vercel.com/docs/git) and [build configuration](https://vercel.com/docs/builds/configure-a-build).

**Project detail:** `npm run build` and `npm start` belong to the existing Sites/Cloudflare workflow. Vercel uses `npm run build:vercel`; do not substitute the Cloudflare output directory or start command.

The Vercel build prepares the official Satoshi font before Next.js builds the pages. It checks a pinned integrity hash and downloads the variable font only when a valid local cached file is unavailable. Visitors load the font from this website rather than a third-party font server. The font preparation step needs access to the official provider during a fresh build.

## 4. Connect the domain to Vercel

1. In the Meddot project, open **Settings → Domains** and add your purchased domain.
2. Add apex (`your-domain.com`) and `www.your-domain.com` if you want both. Choose one main address and redirect the other to it in Vercel. Keep this choice consistent with section 5.
3. Copy the exact DNS records Vercel displays for **your project**, including any ownership-verification TXT record. Do not reuse an old tutorial IP or assume every project uses the same CNAME.
4. Find the authoritative DNS host: the provider named by the domain's active nameservers. Add records there, even if you bought the domain elsewhere.
5. Save the existing DNS zone first. Edit only conflicting website records. Preserve email MX, verification, SPF, DKIM, and DMARC records.
6. Refresh Vercel until the domain shows valid configuration. Certificate provisioning follows successful validation. Test both variants over HTTPS and check the redirect.

| Purpose | Name/host usually looks like | Type/value |
|---|---|---|
| Website apex | `@` or provider's blank/root field | Exact A/ALIAS/other record shown by Vercel |
| Website `www` | `www` | Exact CNAME target shown by Vercel |
| Ownership verification, if requested | Name in verification panel | Exact TXT value shown by Vercel |
| Email delivery | Usually `@` | Mail provider's MX targets and priorities |
| Sender authentication | `@`, selector under `_domainkey`, `_dmarc` | Provider values or reviewed policy |

DNS targets are hostnames or addresses, not URLs: no `https://` or page paths. Some dashboards append the domain automatically; avoid `www.your-domain.com.your-domain.com`. Keep default/automatic TTL unless instructed otherwise.

Moving nameservers is optional for Vercel hosting. If you move them, recreate and verify **all** existing records first, especially email. Cloudflare Registrar domains retain Cloudflare nameservers. On Cloudflare DNS, begin with website records set to **DNS only** while verifying Vercel.

DNS caches can update at different times; allow the provider's stated propagation window rather than repeatedly recreating records. Resolve certificate warnings instead of bypassing them. See [custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain) and [DNS/email records](https://vercel.com/docs/domains/managing-dns-records).

## 5. Set the website's domain and email

Public launch settings are centralized in `lib/site-config.ts`. Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | What to enter | Current fallback |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Main HTTPS origin, e.g. `https://your-domain.com`; no page path | `https://meddot-solutions.vercel.app` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | One real, tested inbox address, e.g. `hello@your-domain.com` | `ziaurrahman.26261@gmail.com` |

Apply intended values to **Production**, then create a **new deployment**. Environment changes do not modify old deployments. These public values are built into the site, so changing the domain or recipient requires rebuilding. Set Preview values intentionally; do not use a temporary preview URL as the production canonical. See [Vercel environment variables](https://vercel.com/docs/environment-variables).

Locally, copy `.env.example` to ignored `.env.local` and edit it. Never commit `.env.local`. `NEXT_PUBLIC_` values are public configuration, **not a place for passwords, API tokens, or SMTP credentials**.

After deployment, check contact links and the draft recipient. Confirm canonicals, Open Graph URLs, `robots.txt`, and `sitemap.xml` use the main domain. Add it to [Google Search Console](https://search.google.com/search-console/about), verify ownership, and submit `https://your-domain.com/sitemap.xml`. If replacing an indexed domain, plan redirects and the move before disabling the old address.

## 6. Create business email

Choose **one primary mailbox host**. Do not mix unrelated Google and Microsoft MX sets. The website can stay on Vercel while email lives elsewhere.

| Option | Best fit | Check before paying |
|---|---|---|
| [Google Workspace](https://workspace.google.com/pricing.html) | Gmail, Calendar, Drive, custom-domain business inbox | Per-user price, commitment, storage, country/tax rules, required features |
| [Microsoft 365 Business](https://www.microsoft.com/en-us/microsoft-365/business/compare-all-microsoft-365-business-products) | Outlook and Microsoft collaboration tools | A plan with Exchange Online/custom-domain email, per-user price, web vs desktop apps |

Personal Gmail differs from a Workspace business mailbox. A personal Microsoft subscription differs from a business plan with Exchange Online. Domain registration, mailbox subscription, and hosting have separate renewals.

For a small launch, one named mailbox plus a public alias such as `hello@your-domain.com` may suffice. An alias delivers to an existing mailbox; it has no separate sign-in or independent inbox. For separate staff access, use licensed users or properly configured shared mailboxes instead of sharing a password. Confirm the provider's alias/shared-mailbox rules.

### Google Workspace path

1. Start Workspace with your owned domain; review the subscription terms yourself.
2. Add the admin wizard's verification TXT record at the DNS host and verify ownership.
3. Create the mailbox and aliases. Plan migration first if replacing existing email.
4. Copy the current Google MX targets and priorities from the wizard to DNS. Remove old-provider MX records as part of the planned cutover.
5. Configure SPF, DKIM, and DMARC below. Add the mailbox to your email app and test external mail in both directions.

Use Google's current [MX setup](https://support.google.com/a/answer/16004259), [SPF guide](https://support.google.com/a/answer/33786), [DKIM guide](https://support.google.com/a/answer/180504), and [DMARC guide](https://support.google.com/a/answer/2466580). Copy values from your own admin wizard.

### Microsoft 365 path

1. In the admin center, open **Settings → Domains → Add domain** and complete the ownership check.
2. Create intended users/mailboxes **before** changing MX, so mail has a destination.
3. Apply the domain wizard's Exchange Online DNS records: MX, supporting records, and SPF. Keep Vercel website records.
4. Publish tenant-specific DKIM selector records, enable DKIM in admin settings, and add a reviewed DMARC policy.
5. Test external sending, receiving, replies, and aliases.

Follow Microsoft's [domain setup](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain?view=o365-worldwide) and [DNS walkthrough](https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider?view=o365-worldwide).

## 7. Authenticate outgoing email

These records reduce spoofing and help receiving systems evaluate mail. They do not guarantee inbox placement.

| Record | Role | Practical rule |
|---|---|---|
| MX | Routes incoming mail | Copy exact provider targets and priorities |
| SPF | Lists authorized senders | Publish **one** SPF record per name; combine legitimate senders instead of adding another `v=spf1` record |
| DKIM | Signs mail for verification | Generate provider selector/value, publish DNS, then enable signing |
| DMARC | Sets handling/reporting for failed aligned checks | Start with monitored reporting; validate legitimate senders before quarantine/reject |

If you later add a transactional sender, update authentication with its instructions instead of overwriting business-mail settings. A sender subdomain can separate app mail from ordinary staff mail.

An illustrative monitoring record is `v=DMARC1; p=none; rua=mailto:dmarc@your-domain.com` at `_dmarc`. **Do not paste it unchanged:** first choose a monitored reporting destination, replace the placeholder, and review provider requirements. Reports can be technical XML; a reporting service may help. Do not move to `p=reject` before legitimate senders are authenticated and aligned. See [Microsoft SPF guidance](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-spf-in-office-365-to-help-prevent-spoofing?view=o365-worldwide) and Google's authentication guides above.

Send from your business address to an external Gmail/Outlook inbox and reply. Inspect headers/provider results for SPF, DKIM, and DMARC. Check spam, mobile access, alias delivery, and sender name before updating the website recipient.

## 8. Understand consultation delivery

**Available now:** visitors complete the form, the server validates it, and a private review page offers **Open email draft**. Visitors must send that email from their own app. Meddot receives nothing until it is sent. The website does not store inquiries or call an email API. Buying a domain, changing MX, or setting `NEXT_PUBLIC_CONTACT_EMAIL` does not change this behavior.

**Recommended next implementation:** server-side delivery to the verified business inbox, with clear success/error states and direct-email fallback. Before enabling it:

- Select the provider and approve destination, access, and retention.
- Authenticate the sending domain. Use an authenticated Meddot address as `From` and the validated visitor email as `Reply-To`; do not spoof the visitor as sender.
- Store API credentials in server-only Vercel environment variables (mark sensitive where supported). Never use `NEXT_PUBLIC_` for credentials, commit them, or log them. Use a restricted key and deliberate Preview configuration.
- Add durable rate limiting/abuse controls, delivery failure handling, and duplicate-submission protection. A provider failure must not display false success.
- Test receipt, replies, spam placement, and any confirmation email. For CRM intake such as GoHighLevel, map fields and permissions deliberately.

No provider, API key, database, CRM integration, or automatic sending is added by this guide. Keep this form for general business discussions: no patient records, insurance IDs, or other PHI. Marketing-site setup does not establish HIPAA compliance; a patient-data workflow needs its own approved systems and operational review.

## 9. Run the launch checks

### Website and deployment

- Test Home, Services dropdown, both groups, detail pages, About, How we work, and Contact on desktop and mobile.
- Check sticky header, keyboard menu closing, visible focus, and no narrow-screen overflow.
- Check images, readable text, and correct Meddot social profiles.
- Verify HTTPS and apex/`www` redirects without a loop.
- Confirm canonicals/sitemap use the chosen domain. AI remains in development until available.
- Publish only verified locations, staff credentials, specialty experience, testimonials, and results.

### Email and inquiries

- Verify sending, receiving, aliases, and assigned inbox monitoring.
- Confirm displayed email and consultation draft recipient.
- Use synthetic business details to test the review page; send a deliberate test from your own email app if checking delivery.
- Check that visitors without an email app can see the direct address.
- Do not describe the current mailto flow as automatically sent or saved.

### Repository checks

Run from the repository root:

```sh
npm ci --ignore-scripts --no-fund
npx eslint app components lib next.config.ts scripts/security.test.mjs scripts/prepare-fonts.mjs
npm run build:vercel
npm run test:security
npm audit --omit=dev --audit-level=high
```

If restricted Windows workers cannot start Turbopack, first run `npm run fonts:prepare`, then `node node_modules/next/dist/bin/next build --webpack`. The normal `npm run build:vercel` command already prepares fonts. Preview the Next.js production build with `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100`. Security tests start their own temporary production server and send no email.

Service-specific consultation links can preselect an allowlisted service on the server. The Contact page renders that selection without extra browser JavaScript; other marketing pages remain static.

GitHub Actions runs checks on changes and weekly; Dependabot proposes updates. Review failures and update PRs before merging. Enable branch protection/required status checks in GitHub settings if you want enforcement. See [SECURITY.md](SECURITY.md) and the [security review](security_best_practices_report.md) for controls and review boundaries.

## 10. Troubleshoot without guessing

| Symptom | First checks |
|---|---|
| Build fails | Repo/root, Node version, `build:vercel`, lockfile, then first meaningful build error |
| Font preparation fails | Check build-network access to the official font provider and retry. If the integrity hash still fails, investigate the provider asset; do not disable integrity verification |
| Domain invalid | Active nameservers, exact Vercel records, conflicting A/AAAA/CNAME, duplicated suffix, Cloudflare proxy |
| Old site appears | Production deployment/commit, then DNS/browser cache and propagation window |
| HTTPS pending | Domain validation, stale DNS, restrictive CAA with provider support; never bypass certificate warnings |
| Cannot receive email | Mailboxes exist, authoritative DNS/MX priorities, no old-provider conflicts, completed verification |
| Mail goes to spam | SPF/DKIM/DMARC, valid sender, reputation/content; authentication is no guarantee |
| Two SPF records | Combine authorized mechanisms into one reviewed policy |
| Personal email still shown | Correct Production value, new deployment, correct deployed commit |
| Form ready but no inquiry | Visitor must open and send the draft; review page sends nothing |
| Form rejects a request | Same-site form, field limits, then browser/server errors using synthetic data |

Keep the last working DNS configuration. Change and test one stage at a time instead of moving nameservers, MX, app settings, and the main domain together.

## 11. Maintain the launch

| When | Action |
|---|---|
| Business days | Check consultation inbox, spam, delivery alerts, response queue |
| Weekly | Review GitHub updates/checks and Vercel errors; test public contact path with synthetic details |
| Monthly | Review access, spend, mobile layout, links, service claims, Search Console indexing |
| Before renewal | Check auto-renewal, payment validity, contacts, email seats, hosting plan |
| Before release | Review preview, run checks, record production commit, retain last working deployment |

GitHub keeps code history; securely retain recovery codes and DNS records separately. Use a previous Vercel deployment/rollback when a release breaks the site, then fix the source change. A rollback does not restore DNS or mailboxes. Review [Vercel rollback instructions](https://vercel.com/docs/instant-rollback) before using them.

Choose analytics deliberately, define necessary events, and review privacy behavior. Useful events include service visits, form starts, draft opens, and confirmed inquiries. A draft open is not proof of a received lead. Configure required privacy/consent choices for the selected tool and audience rather than adding an empty cookie banner.

## Launch worksheet

| Decision | Fill in before custom-domain launch |
|---|---|
| Purchased main domain | ______________________________ |
| Registrar / renewal date | ______________________________ |
| DNS host / nameservers | ______________________________ |
| Main URL: apex or `www` | ______________________________ |
| Vercel project / plan | ______________________________ |
| Mail provider / licensed owner | ______________________________ |
| Public email / alias destination | ______________________________ |
| Inbox owner / response schedule | ______________________________ |
| DNS backup location, no credentials | ______________________________ |
| Deployment commit / launch date | ______________________________ |

**Suggested order:** test Vercel URL → buy chosen domain → connect website DNS → create/authenticate business mailbox → set public environment values → redeploy → complete launch checks → announce.
