# Deploy Meddot on Cloudflare Free

**Updated November 23, 2026. Status:** your Cloudflare account is created and connected to the correct GitHub repository and `main` branch. The static migration passed local validation: 26 exported pages, a successful Worker dry run, 12 Cloudflare security tests, and 10 Next.js fallback security tests. Browser checks covered service preselection and a synthetic consultation review. Public deployment is being configured and has not yet been verified. No domain or mailbox has been purchased. The [existing Vercel site](https://meddot-solutions.vercel.app/) remains the fallback.

Open the [printable migration guide](docs/meddot-cloudflare-migration-guide.html) in a browser and use **Print → Save as PDF** for a shareable copy.

The new path serves prebuilt pages, local Satoshi fonts, and images as **Cloudflare Static Assets**. A small same-origin Worker handles the consultation review. The form still prepares an email draft that visitors must send themselves; automatic email delivery and Turnstile are separate pending work.

## 1. Confirm your account and testing address

1. Use your existing Cloudflare account; do not create a duplicate project or account.
2. Confirm your account email is verified. Enable MFA and securely save recovery codes; these account protections have not been verified in this project review.
3. Open **Workers & Pages → meddot-solutions**. Use the **Free** Workers plan. Workers Paid and a payment card are not required for this hosting path; domain registration and optional paid email are separate purchases.
4. The Git connection is `ziaur390/meddot-solutions`, branch `main`. The known account subdomain is `ziaurrahman-26261`. [Subdomain instructions](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

The configured testing URL is:

```text
https://meddot-solutions.ziaurrahman-26261.workers.dev
```

The `workers.dev` route is currently disabled while deployment is prepared. Do not assume this URL is live until the successful deployment and browser checks are confirmed. Cloudflare recommends an owned custom domain for a production business website. Do not share passwords, recovery codes, session cookies, or API tokens.

## 2. Prepare the project locally

Use the reviewed migration commit from [ziaur390/meddot-solutions](https://github.com/ziaur390/meddot-solutions). The local application is `C:\Users\ziaur\OneDrive\Desktop\medot\website`; the GitHub repository root is `./`.

Use Node.js 22 meeting `>=22.13.0`. From the repository root, install the committed dependencies:

```sh
npm ci --ignore-scripts --no-fund
```

For local builds, create or update ignored `.env.local`, preserving unrelated settings. Set `NEXT_PUBLIC_SITE_URL=https://meddot-solutions.ziaurrahman-26261.workers.dev`, with no page path, query, or credentials. Do not leave the Vercel URL or a sample URL in the Cloudflare build. The dashboard Git build needs the same value in its build variables.

The deployment configuration is `wrangler.cloudflare.jsonc`:

| Setting | Current value / action |
|---|---|
| Worker name | `meddot-solutions` |
| Entry point | `cloudflare/worker.ts` |
| Generated static assets | `.cloudflare-build/assets` |
| Compatibility date | `2026-11-09`, supported by the installed runtime |
| Runtime | Standard Worker APIs; no Node compatibility mode required |
| Public and form recipient | `vars.CONTACT_EMAIL`, currently `ziaurrahman.26261@gmail.com` |

The build takes the public contact address from `vars.CONTACT_EMAIL`. If `NEXT_PUBLIC_CONTACT_EMAIL` is also set, it **must match** or the build fails. When changing inbox later, update the configuration, rebuild, and redeploy; do not change only a dashboard runtime value and leave the public pages pointing elsewhere. These email addresses and site URLs are public configuration, never credentials.

## 3. Build and test before deploying

Local validation has passed. Run these checks again after relevant changes:

```sh
npm run build:cloudflare
npm run check:cloudflare
npm run preview:cloudflare
```

The build prepares the verified font and generates the static site. The check performs a deployment dry run without publishing. The preview starts a local Worker; open the URL it prints and use **Ctrl+C** when finished.

In a separate PowerShell session, run the security suite against the Cloudflare runtime:

```powershell
$env:MEDDOT_TEST_RUNTIME = 'cloudflare'
npm run test:security
Remove-Item Env:MEDDOT_TEST_RUNTIME
```

The suite starts its own local server. Test Home, service pages, desktop/mobile navigation, contact service selection, valid/invalid forms, images, fonts, security headers, real 404s, canonicals, and sitemap. A local pass is not proof of Cloudflare production CPU usage; check that after deployment too.

The older `npm start` and default Sites build helpers are not this deployment. Use the explicit `*:cloudflare` commands. Test-only `.test` origins are allowed for local checks, but the deployment wrapper rejects them and the existing Vercel canonical URL. Rebuild with the actual intended origin before publishing.

## 4. Publish through the connected GitHub build

GitHub is already connected. Open **Workers & Pages → meddot-solutions → Settings → Build** and confirm:

| Git build setting | Enter |
|---|---|
| Repository / branch | `ziaur390/meddot-solutions` / `main` |
| Root directory | `./` |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Build variable `NODE_VERSION` | `22` |
| Build variable `NEXT_PUBLIC_SITE_URL` | `https://meddot-solutions.ziaurrahman-26261.workers.dev` |
| `NEXT_PUBLIC_CONTACT_EMAIL`, if supplied | Exact match for configuration `CONTACT_EMAIL` |

The build/deploy commands are saved; build-variable verification and the first public release are in progress. Once the validated commit reaches `main`, trigger or retry the production build. Inspect its build/deployment logs and confirm success before enabling/checking the `workers.dev` route under **Settings → Domains & Routes**.

Keep nonproduction branch/preview deployments disabled initially. Use the explicit deploy wrapper for this nondefault configuration filename. Build-variable changes need a new build. Git authorization does not require a separate local Wrangler login. If reconnecting GitHub later, approve access yourself and select only this repository where possible. [Workers Builds settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)

Visit the public URL in a normal browser and repeat the important checks. Submit synthetic business details; reaching the review page does not send an email. Check production CPU/errors and the deployed canonical domain too.

## 5. Optional alternative: local Wrangler deployment

Local CLI authentication has not been completed and is **not required** for the connected Git build. If you choose CLI deployment instead, authenticate from the repository folder:

```sh
npx wrangler login
npx wrangler whoami
```

Complete browser authorization yourself, review the access, and confirm the intended account. After rebuilding and checking, run `npm run deploy:cloudflare`. Do not bypass its build guards with a bare deployment command. No API token needs to be pasted into chat. [Wrangler authentication](https://developers.cloudflare.com/workers/wrangler/commands/)

## 6. Connect the purchased domain later

1. Recheck the domain's availability, renewal price, and checkout total. Review payment and terms yourself; no purchase is included in deployment.
2. Verify registrant email, auto-renewal, registrar lock, and DNSSEC. Save the existing DNS records.
3. In the Worker, open **Settings → Domains & Routes → Add → Custom Domain** and attach the owned domain. Follow the dashboard's instructions rather than guessing records. [Custom-domain setup](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
4. Choose apex or `www` as the main address and configure the other to redirect. Do not create a redirect loop or replace email records.
5. Update `NEXT_PUBLIC_SITE_URL` to that main origin, rebuild, and deploy. Check HTTPS, redirects, canonicals, Open Graph, `robots.txt`, and `sitemap.xml`.

Keep Vercel available on an eligible plan until rollback and the new site are verified. A DNS change and application rollback are different operations; retain the old records and deployment reference.

## 7. Add the business inbox

Check Zoho Mail Free eligibility first; it depends on region/data center and has web/mobile feature restrictions. If unavailable or external mail-client access is required, consider one Mail Lite user after reviewing its annual price. Follow [Zoho's current setup](https://www.zoho.com/mail/help/adminconsole/domain-verification.html) and exact regional MX/DKIM instructions.

Use **one root MX provider**: Zoho and root Cloudflare Email Routing must not be enabled together. Keep one SPF policy per hostname, enable DKIM, and monitor DMARC before tightening enforcement. Test sending, receiving, replies, and spam placement. Then update `vars.CONTACT_EMAIL`, any matching public email variable, rebuild, and deploy. [Mailbox options and budget](CLOUDFLARE-LAUNCH.md)

## Before announcing the site

- Verify pages, mobile layout, menus, fonts/images, HTTPS, redirects, metadata, 404s, and the consultation draft recipient.
- Inspect Worker requests/CPU errors and Free quotas; 500 daily visits alone is not a reason to buy Paid.
- Keep inquiries general: no patient records or PHI. This setup is not a HIPAA-compliance certification.
- Automatic owner notifications, confirmation emails, and server-verified Turnstile require separate configuration and implementation. Do not describe them as active yet.
- Confirm the inbox owner, renewal reminders, monitoring, and a tested rollback path.
