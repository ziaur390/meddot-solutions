import { createHash } from "node:crypto";
import { digitalServices, revenueNames } from "@/lib/service-content";

export const runtime = "nodejs";

const recipient = "ziaurrahman.26261@gmail.com";
const maximumBodyBytes = 16 * 1024;
const fieldLimits = { name: 100, practice: 120, email: 160, phone: 40, service: 100, message: 1000 } as const;
const allowedServices = new Set([
  "Not sure yet",
  ...Object.values(revenueNames),
  ...Object.values(digitalServices).map((service) => service.name),
  "Healthcare AI (in development)",
]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

const pageStyles = "body{margin:0;background:#f2f8f9;color:#071a42;font:16px/1.6 Satoshi,Arial,sans-serif}main{max-width:700px;margin:7vh auto;padding:36px;background:#fff}a{color:#00777b}h1{font-size:clamp(32px,6vw,49px);line-height:1.12;letter-spacing:-.035em;margin:0 0 16px}p{color:#536479}.button{display:inline-block;background:#008f91;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;margin:16px 0}.summary{border-top:1px solid #d8e4e9;margin-top:23px;padding-top:20px}.summary div{padding:8px 0}.summary strong{display:block;font-size:13px;color:#3c5267}.summary p{white-space:pre-wrap;margin:5px 0}.note{font-size:14px;border-top:1px solid #d8e4e9;padding-top:18px;margin-top:22px}@media(max-width:760px){main{margin:0;padding:28px 20px;min-height:100vh}}";
const styleHash = createHash("sha256").update(pageStyles).digest("base64");

function page(title: string, content: string, status = 200) {
  // This response reflects form fields, so it runs no scripts and authorizes only its fixed stylesheet.
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>${escapeHtml(title)} | Meddot Solutions</title><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&amp;display=swap"><style>${pageStyles}</style></head><body><main><a href="/" aria-label="Meddot Solutions home">Meddot Solutions</a>${content}</main></body></html>`, { status, headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Content-Security-Policy": `default-src 'none'; script-src 'none'; style-src 'sha256-${styleHash}' https://api.fontshare.com; font-src https://cdn.fontshare.com; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'`,
  } });
}

class SubmissionError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return false;
  try {
    const supplied = new URL(origin);
    const expected = new URL(request.url);
    if (supplied.origin !== origin) return false;
    // NextRequest normalizes loopback hosts to localhost. Normalize only those
    // local aliases; protocol and port must still match and cross-site is denied.
    const loopback = new Set(["localhost", "127.0.0.1", "[::1]"]);
    if (loopback.has(supplied.hostname) && loopback.has(expected.hostname)) {
      supplied.hostname = "localhost";
      expected.hostname = "localhost";
    }
    return supplied.origin === expected.origin;
  } catch { return false; }
}

async function readSubmission(request: Request) {
  // Check browser origin and format before reading attacker-controlled request bytes.
  if (!hasSameOrigin(request)) {
    throw new SubmissionError(403, "Open the consultation form on this website and try again.");
  }
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/x-www-form-urlencoded") {
    throw new SubmissionError(415, "Use the consultation form to prepare your request. File uploads are not accepted.");
  }
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > maximumBodyBytes)) {
    throw new SubmissionError(413, "Keep your request brief and within the form’s character limits.");
  }
  if (!request.body) throw new SubmissionError(400, "Complete the consultation form and try again.");

  // Enforce the real byte limit too: Content-Length may be missing or untrustworthy.
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBodyBytes) {
        await reader.cancel().catch(() => {});
        throw new SubmissionError(413, "Keep your request brief and within the form’s character limits.");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }

  const text = new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks));
  const form = new URLSearchParams(text);
  for (const key of form.keys()) {
    if (!Object.hasOwn(fieldLimits, key)) throw new SubmissionError(400, "Use only the fields provided in the consultation form.");
  }
  const read = (key: keyof typeof fieldLimits) => {
    const values = form.getAll(key);
    if (values.length > 1) throw new SubmissionError(400, "Each form field must have only one value.");
    const value = values[0] ?? "";
    if (value.length > fieldLimits[key] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value) || (key !== "message" && /[\r\n\t\u2028\u2029]/.test(value))) {
      throw new SubmissionError(400, "Check the form’s character limits and remove unexpected line breaks or control characters.");
    }
    return value.trim();
  };
  return { name: read("name"), practice: read("practice"), email: read("email"), phone: read("phone"), service: read("service"), message: read("message") };
}

export async function POST(request: Request) {
  let submission: Awaited<ReturnType<typeof readSubmission>>;
  try { submission = await readSubmission(request); }
  catch (error) {
    const status = error instanceof SubmissionError ? error.status : 400;
    const message = error instanceof SubmissionError ? error.message : "The request could not be read. Return to the form and check your entries.";
    return page("Check your request", `<h1>Check your request.</h1><p>${escapeHtml(message)}</p><a class="button" href="/contact#consultation-form">Return to form</a>`, status);
  }
  const { name, practice, email, phone, service, message } = submission;
  if (!name || !practice || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !allowedServices.has(service) || !message) {
    return page("Check your request", '<h1>Check the required fields.</h1><p>Please enter your name, practice, a valid email, a service, and a short message.</p><a class="button" href="/contact#consultation-form">Return to form</a>', 400);
  }

  const subject = `Meddot consultation request — ${practice}`;
  const body = [`Name: ${name}`, `Practice: ${practice}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Service: ${service}`, "", "What they would like to discuss:", message].join("\n");
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return page("Review your request", `<h1>Your request is ready.</h1><p>Review the details below, then open the email draft and send it from your email app. Meddot has not received anything yet.</p><div class="summary"><div><strong>Name</strong>${escapeHtml(name)}</div><div><strong>Practice</strong>${escapeHtml(practice)}</div><div><strong>Email</strong>${escapeHtml(email)}</div>${phone ? `<div><strong>Phone</strong>${escapeHtml(phone)}</div>` : ""}<div><strong>Service</strong>${escapeHtml(service)}</div><div><strong>Message</strong><p>${escapeHtml(message)}</p></div></div><a class="button" href="${escapeHtml(mailto)}">Open email draft</a><p class="note">If no email app opens, send these details to <a href="mailto:${recipient}">${recipient}</a>. Please do not include patient information or medical records.</p><a href="/contact#consultation-form">Start over</a>`);
}
