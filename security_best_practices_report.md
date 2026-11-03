# Meddot Solutions security review

**Reviewed:** November 3, 2026. **Scope:** the Next.js marketing website, its consultation endpoint, dependency lockfile, and repository checks.

## Executive summary

The review identified affected framework/dependency versions and missing application-level request and browser protections. Patched dependencies, a bounded same-origin form handler, stronger response policies, and automated checks are now implemented. The production-only npm audit reports **zero known vulnerabilities**. The complete dependency tree has **24 moderate findings**, confined to development dependencies and their transitive chains; these remain tracked below.

This was a source review and production-build regression check, not an infrastructure penetration test, account review, or healthcare-compliance assessment. No claim is made that an installed advisory was successfully exploited.

## Audit results

| npm audit scope | Critical | High | Moderate | Low | Total |
|---|---:|---:|---:|---:|---:|
| Full tree before changes | 1 | 15 | 25 | 1 | 42 |
| Full tree after changes | 0 | 0 | 24 | 0 | 24 |
| Production dependencies after changes | 0 | 0 | 0 | 0 | 0 |

These are affected dependency entries, including propagated parent findings, rather than counts of independently exploitable website flaws. The remaining entries trace to three underlying advisories: esbuild development-server request exposure, minimatch glob amplification, and fflate malformed ZIP64 parsing.

## Remediated findings

### 01 — Critical: affected framework and image-processing versions

**Evidence:** the previous `package.json` pinned Next.js 16.3.4 and the Miniflare sharp override to 0.35.4. npm reported the Next.js package within critical advisory ranges. The site's pages use Next.js Image; the exact exploit preconditions were not reproduced.

**Impact:** under the affected image-processing conditions, the upstream advisory describes possible remote code execution on glibc-based Linux.

**Resolution:** [package.json](package.json#L29) and `package-lock.json` now pin Next.js 16.4.4, React/React DOM/React Server DOM 19.3.1, Zod 4.6.7, and the patched sharp override 0.35.5. Compatible Vite, Vinext, Wrangler, Cloudflare plugin/types, and transitive updates were applied. Install lifecycle scripts were disabled. Coupled peer requirements were aligned rather than bypassed with `--force` or `--legacy-peer-deps`.

The Zod migration required the explicit key schema in [the connector protocol](scripts/connector-preview/protocol.mjs#L13); representative valid and invalid schema checks pass. `npm ls --depth=0` is clean. The Vinext CLI entry still loads. The current Vercel/Next.js production build is verified; the legacy Cloudflare deployment pipeline was not published or fully exercised.

### 02 — Medium: no application-specific byte bound before form parsing

**Evidence:** the former consultation handler called `request.formData()` before imposing application-specific request limits and silently truncated individual strings afterward.

**Resolution:** [route.ts](app/api/consultation/route.ts#L7) now limits both declared and actual streamed request bodies to 16 KiB, permits URL-encoded form input only, and rejects duplicate/unknown fields, invalid controls, unexpected single-line breaks, overlong values, and unsupported services. Required fields and email shape remain checked server-side. Error pages do not echo submitted fields or internal errors.

[Origin validation](app/api/consultation/route.ts#L42) requires a matching origin and rejects explicit cross-site submissions. Only local loopback aliases are normalized to account for NextRequest's localhost normalization; protocol and port must still match. Origin checks are browser cross-site defenses, not authentication or a replacement for durable rate limiting.

### 03 — Low: missing browser and reflected-response defenses

**Live baseline:** Vercel already supplied HTTPS transport security. The selected response-header check found no CSP, frame policy, MIME-sniffing policy, referrer policy, or permissions policy on the public homepage.

**Resolution:** [next.config.ts](next.config.ts#L4) adds MIME-sniffing prevention, framing denial, permissions restrictions, a referrer policy, and a CSP covering base URLs, plugins, framing, and form destinations. The framework-identifying header is disabled at the application level.

The [consultation review response](app/api/consultation/route.ts#L25) has a separate stricter policy: scripts are disabled, its fixed inline stylesheet is authorized by a SHA-256 hash, and only the required font hosts are permitted. Responses are private/no-store, no-referrer, unindexed, and unframed. Existing HTML escaping and fixed-recipient, URL-encoded email drafts are preserved. The response does not send email or store the request.

The public static pages intentionally have **no `script-src` directive**. Their CSP does not provide strict script-injection isolation. React escaping and patched framework behavior remain primary controls. A site-wide nonce or build-hash CSP needs a separate rendering/performance design and browser review; this pass does not claim it is implemented.

### 04 — Low: no repository update and security regression checks

**Resolution:** [the workflow](.github/workflows/security-and-quality.yml#L1) runs locked installs without lifecycle scripts, a production dependency audit, source lint, a complete production build, and the form/header security tests on changes and weekly. Official GitHub Actions are pinned to verified commit hashes, token permissions are read-only, and checkout does not persist credentials.

[Dependabot](.github/dependabot.yml#L1) proposes weekly npm and Action updates, with bounded open-PR counts and no automatic merging. [SECURITY.md](SECURITY.md) documents private vulnerability reporting. These repository files do not by themselves enable branch protection or guarantee that account-level Actions/security settings are enabled.

## Remaining findings and boundaries

1. **Moderate — development dependencies:** 24 affected entries remain in the ESLint/minimatch, Drizzle/esbuild, and Vinext/OG/fflate chains. npm's remaining suggested actions include downgrading current tools to old, incompatible major lines. Those suggestions were not forced. Production-only auditing is clean, but development/build dependencies still deserve review when upstream-compatible fixes are available. Do not expose development servers publicly or feed them untrusted projects/archives.
2. **Platform controls not verified:** repository inspection cannot establish Vercel WAF/rate rules, account MFA, GitHub branch protection, organization permissions, secret scanning status, or provider logging/retention. Review these in the relevant accounts. The configured workflow detects failures; required-status checks and protected branches are needed to enforce them before merging.
3. **Limited credential scan:** no tracked `.env`/private-key files or targeted key-format matches were found in the scanned application/tooling paths. This is not an entropy scan or full Git-history audit, and does not establish that all credentials are absent.
4. **Healthcare data:** this public form is for general business inquiries. Repository hardening does not establish Meddot's operational HIPAA compliance, staff procedures, or vendor agreements. No PHI intake or client portal was added.

## Verification performed

- Website source lint and TypeScript checks passed.
- A complete Next.js 16.4.4 webpack production build generated all routes successfully.
- Eight production-server security tests passed, including subcases for origin/port/path spoofing, HTML-shaped content, real byte limits on chunked requests, duplicate/unknown fields, invalid controls, and response-header precedence.
- Zod 4 connector-schema compatibility checks and the Vinext CLI smoke check passed.
- Workflow and Dependabot YAML parsed successfully.
- npm's production-only audit reports zero findings; the full-tree result is recorded above.

The focused tests run with `npm run test:security` after building the project. They exercise a temporary local production server and never send an email. The current security check covers the application behavior; deployment headers should also be checked after a Vercel release.

## Highest-value next website work

1. Set up a business mailbox and custom domain, then update the recipient/canonical configuration with verified details.
2. Add reviewed server-side lead delivery or CRM intake when the destination, credentials, retention, and data boundaries are agreed. The current mailto flow requires the visitor to send the draft.
3. Add verifiable staff credentials, specialty experience, and real case studies. Evidence will do more for trust and conversion than additional visual effects.
4. Connect search/conversion measurement with appropriate privacy choices, self-host the existing Satoshi font, and evaluate a strict public-page script policy against caching and rendering performance.

## Installed agent skills

Installed locally under `C:/Users/ziaur/.codex/skills/`; they are available for invocation from the next user turn:

- `security-best-practices` — OpenAI's framework-specific security review guidance; used in this review.
- `security-threat-model` — OpenAI's repository-based threat-modeling workflow, installed for a future explicit threat-modeling task.
- `vercel-react-best-practices` — Vercel's React/Next.js performance guidance; applied to cheap request checks before asynchronous body parsing and available for future performance work.

Sources: [Next.js image-optimization advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw), [React Server Functions advisory](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g), [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy), [Next.js headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers), [Zod 4 migration](https://zod.dev/v4/changelog), [OpenAI skills](https://github.com/openai/skills), [Vercel agent skills](https://github.com/vercel-labs/agent-skills).
