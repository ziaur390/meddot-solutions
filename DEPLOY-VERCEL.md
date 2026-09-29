# Deploy Meddot Solutions on Vercel

This repository contains the Meddot website at its root. It is a Next.js application. The normal `npm run build` script is reserved for the existing Sites/Cloudflare deployment; `vercel.json` directs Vercel to use `npm run build:vercel` (`next build`). The Vercel build has been verified locally.

1. Sign in at [Vercel](https://vercel.com/new) with GitHub, and authorize access to `ziaur390/MEDDOT_SOLUTIONS` if asked.
2. Choose **Add New → Project**, import `ziaur390/MEDDOT_SOLUTIONS`, and select `main` as the production branch.
3. Keep **Root Directory** at the repository root (`./`) and **Framework Preset** as **Next.js**. The committed `vercel.json` supplies the correct build command; leave the Output Directory at the Next.js default.
4. Select **Deploy**. No environment variables or database are required for the current brochure site. Consultation links use a `mailto:` link to `ziaurrahman.26261@gmail.com`; there is no form backend yet.
5. Open the assigned `*.vercel.app` URL. Check the home page, both Services menu groups, a detail page in each group, the mobile menu, images, and the email button.
6. Before sharing the Vercel URL publicly, replace the sample New York location and pending social profiles with verified details, review every draft service scope, and decide whether your personal email should remain on the contact page. The AI services are correctly marked in development.
7. When you own a domain, add it under **Project → Settings → Domains**. Follow the DNS records shown for that project; do not guess A or CNAME values. Choose one primary domain and redirect the other variant if you add both apex and `www`.

Vercel's official guides: [deploying Git repositories](https://vercel.com/docs/git), [build settings](https://vercel.com/docs/builds/configure-a-build), and [custom domains](https://vercel.com/docs/domains/set-up-custom-domain).
