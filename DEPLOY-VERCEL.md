# Deploy Meddot Solutions on Vercel

This repository contains the Meddot website at its root. It is a Next.js application. The normal `npm run build` script is reserved for the existing Sites/Cloudflare deployment; `vercel.json` directs Vercel to use `npm run build:vercel` (`next build`). The Vercel build has been verified locally.

1. Sign in at [Vercel](https://vercel.com/new) with GitHub, and authorize access to `ziaur390/MEDDOT_SOLUTIONS` if asked.
2. Choose **Add New → Project**, import `ziaur390/MEDDOT_SOLUTIONS`, and select `main` as the production branch.
3. Keep **Root Directory** at the repository root (`./`) and **Framework Preset** as **Next.js**. The committed `vercel.json` supplies the correct build command; leave the Output Directory at the Next.js default.
4. Select **Deploy**. No environment variables or database are required for the current brochure site. The consultation form validates details and prepares an email draft for the visitor to review and send to `ziaurrahman.26261@gmail.com`. It does not send automatically or store submissions.
5. Open the assigned `*.vercel.app` URL. Check the home page, both Services menu groups, a detail page in each group, the mobile menu, images, and the consultation form.
6. Review the service scopes and decide whether the current personal email should be replaced with a business mailbox. Publish only verified locations, staff credentials, specialties, testimonials, and results. The AI services are marked in development.
7. When you own a domain, add it under **Project → Settings → Domains**. Follow the DNS records shown for that project; do not guess A or CNAME values. Choose one primary domain and redirect the other variant if you add both apex and `www`.

Vercel's official guides: [deploying Git repositories](https://vercel.com/docs/git), [build settings](https://vercel.com/docs/builds/configure-a-build), and [custom domains](https://vercel.com/docs/domains/set-up-custom-domain).

## Security and update checks

The consultation endpoint accepts same-origin, URL-encoded browser form submissions only. Request bodies are limited to 16 KiB, and each field is checked against its character limit. The response is private, unindexed, and script-free. It prepares a mailto draft; the visitor still needs to send that draft from their email app.

Run these checks after dependency or form changes:

```sh
npm ci --ignore-scripts --no-fund
npx eslint app components lib next.config.ts scripts/security.test.mjs
npm run build:vercel
node --test scripts/security.test.mjs
npm audit --omit=dev --audit-level=high
```

On a restricted Windows worker, use `node node_modules/next/dist/bin/next build --webpack` if the sandbox prevents Turbopack from starting its worker processes. The deployed Vercel build continues to use the normal Next.js build command.

GitHub Actions runs the build, application security checks, and production dependency audit on changes and weekly. Dependabot proposes package and Action updates. These configurations do not enable automatic merging or branch protection; check their status in the GitHub repository after the first push.

Vercel provides HTTPS and transport security. Verify the project's WAF/rate-limit settings and account protections in Vercel; they cannot be established from repository files alone. Before changing the consultation flow to store data or send directly to an external system, review the data destination, access controls, retention, and applicable healthcare requirements. Keep patient information out of this public form.
