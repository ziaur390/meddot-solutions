import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

let origin;
let server;
let startupLog = "";
const root = fileURLToPath(new URL("../", import.meta.url));
const testRuntime = process.env.MEDDOT_TEST_RUNTIME || "next";
assert.ok(["next", "cloudflare"].includes(testRuntime), "MEDDOT_TEST_RUNTIME must be next or cloudflare");
const isCloudflare = testRuntime === "cloudflare";
const validFields = { name: "Security review", practice: "Example practice", email: "preview@example.com", phone: "", service: "Not sure yet", message: "A general consultation inquiry. No patient information." };

before(async () => {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  const serverArguments = isCloudflare
    ? [fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url)), "dev", "--config", "wrangler.cloudflare.jsonc", "--local", "--ip", "127.0.0.1", "--port", String(port), "--inspector-port", "0"]
    : [fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)), "start", "--hostname", "127.0.0.1", "--port", String(port)];
  server = spawn(process.execPath, serverArguments, { cwd: root, env: { ...process.env, NODE_ENV: "production", ...(isCloudflare ? {
    WRANGLER_SEND_METRICS: "false", CLOUDFLARE_CF_FETCH_ENABLED: "false", WRANGLER_LOG_PATH: ".wrangler/logs",
    WRANGLER_REGISTRY_PATH: fileURLToPath(new URL("../.wrangler/dev-registry", import.meta.url)),
    MINIFLARE_REGISTRY_PATH: fileURLToPath(new URL("../.wrangler/registry", import.meta.url)),
    XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || fileURLToPath(new URL("../.wrangler/local-config", import.meta.url)),
  } : {}) }, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  for (const stream of [server.stdout, server.stderr]) stream.on("data", chunk => { startupLog = (startupLog + chunk).slice(-10000); });
  server.on("error", error => { startupLog += error.message; });
  const startupDeadline = Date.now() + (isCloudflare ? 45000 : 25000);
  while (Date.now() < startupDeadline) {
    if (server.exitCode !== null) throw new Error(`Production server exited: ${startupLog}`);
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
      await response.arrayBuffer();
      if (response.ok) return;
    } catch { /* Wait for the local production server to become ready. */ }
    await delay(100);
  }
  throw new Error(`Production server was not ready: ${startupLog}`);
}, { timeout: isCloudflare ? 60000 : 30000 });

after(async () => {
  if (!server || server.exitCode !== null) return;
  if (isCloudflare && process.platform === "win32") {
    // Wrangler owns a workerd subprocess. Terminate only this test server's tree.
    const termination = spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    await Promise.race([new Promise(resolve => { termination.once("exit", resolve); termination.once("error", resolve); }), delay(5000)]);
  } else server.kill();
  await Promise.race([once(server, "exit"), delay(2000)]);
  if (server.exitCode === null) server.kill("SIGKILL");
});

function submit({ fields = {}, headers = {}, body } = {}) {
  const requestHeaders = new Headers({ "Content-Type": "application/x-www-form-urlencoded", Origin: origin, "Sec-Fetch-Site": "same-origin" });
  for (const [name, value] of Object.entries(headers)) {
    if (value === null) requestHeaders.delete(name);
    else requestHeaders.set(name, value);
  }
  return fetch(`${origin}/api/consultation`, { method: "POST", headers: requestHeaders, body: body ?? new URLSearchParams({ ...validFields, ...fields }), ...(body instanceof ReadableStream ? { duplex: "half" } : {}), signal: AbortSignal.timeout(10000) });
}

test("public pages send browser protections without exposing the framework header", async () => {
  const response = await fetch(`${origin}/contact`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.match(response.headers.get("content-security-policy"), /frame-ancestors 'none'/);
  assert.match(response.headers.get("permissions-policy"), /microphone=\(\)/);
  assert.match(await response.text(), /action="\/api\/consultation"/);
});

test("a valid inquiry reaches review and remains private, unindexed, and script-free", async () => {
  const response = await submit();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Your request is ready/);
  assert.match(html, /mailto:[A-Za-z0-9._%+@-]+\?subject=/);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.match(response.headers.get("x-robots-tag"), /noindex/);
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  const csp = response.headers.get("content-security-policy");
  assert.match(csp, /script-src 'none'/);
  assert.match(csp, /font-src 'self'/);
  assert.doesNotMatch(html, /https:\/\/(?:api|cdn)\.fontshare\.com/);
  const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  assert.ok(style);
  assert.ok(csp.includes(`'sha256-${createHash("sha256").update(style).digest("base64")}'`));
});

test("static contact HTML keeps a complete accessible service selector for every inquiry URL", async () => {
  for (const query of [
    "",
    "service=medical-billing",
    "service=healthcare-web-development",
    "service=healthcare-ai",
    "service=not-a-service",
    "service=medical-billing&service=credentialing",
  ]) {
    const response = await fetch(`${origin}/contact?${query}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const select = html.match(/<select\b[^>]*id="service"[\s\S]*?<\/select>/)?.[0];
    assert.ok(select);
    assert.match(html, /<label\b[^>]*for="service"/);
    assert.match(select, /<select\b[^>]*\bname="service"[^>]*\brequired(?:="")?/);
    for (const label of ["Not sure yet", "Medical billing", "Revenue cycle management", "Medical coding", "Credentialing", "AR recovery", "Specialty billing", "Monthly billing audit", "Clearinghouse solutions", "EHR integration", "EMR integration", "EDI clearinghouse setup", "Healthcare SEO", "Healthcare Google Ads", "Healthcare web development", "GoHighLevel services", "Healthcare AI (in development)"]) {
      assert.ok(select.includes(`value="${label}"`), `Missing service choice: ${label}`);
    }
    const option = [...select.matchAll(/<option\b([^>]*)>/g)].find(match => /\bselected(?:="")?/.test(match[1]));
    assert.ok(option);
    // Query-based preselection is a browser enhancement. Static/no-JS HTML must
    // always offer the same usable blank selector rather than depend on SSR.
    assert.equal(option[1].match(/\bvalue="([^"]*)"/)?.[1], "");
  }
});

test("Satoshi is served locally as the prepared WOFF2 font", async () => {
  const response = await fetch(`${origin}/fonts/Satoshi-Variable.woff2`);
  assert.equal(response.status, 200);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "e739aff9b4d02c264341d6d4872edcda28e79373aeda936f659566a1cd3eb47f");
});

test("HTML-shaped input is displayed as escaped text", async () => {
  const response = await submit({ fields: { name: '<img src=x onerror="alert(1)">' } });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(html, /<img src=x/);
});

test("cross-site and origin-less submissions are rejected", async () => {
  const otherPort = new URL(origin);
  otherPort.port = otherPort.port === "65535" ? "65534" : String(Number(otherPort.port) + 1);
  for (const headers of [{ Origin: "https://example.invalid", "Sec-Fetch-Site": "cross-site" }, { Origin: null }, { Origin: origin, "Sec-Fetch-Site": "cross-site" }, { Origin: otherPort.origin }, { Origin: `${origin}/unexpected-path` }, { Origin: "http://localhost.example.invalid" }]) {
    const response = await submit({ headers });
    assert.equal(response.status, 403);
    await response.text();
  }
});

test("unsupported content types are rejected", async () => {
  const response = await submit({ headers: { "Content-Type": "application/json" }, body: JSON.stringify(validFields) });
  assert.equal(response.status, 415);
  await response.text();
});

test("oversized requests are rejected before field parsing", async () => {
  const response = await submit({ fields: { message: "x".repeat(17000) } });
  assert.equal(response.status, 413);
  await response.text();
});

test("the byte limit also covers chunked bodies without Content-Length", async () => {
  const bytes = new TextEncoder().encode(new URLSearchParams({ ...validFields, message: "x".repeat(18000) }).toString());
  const body = new ReadableStream({ start(controller) { controller.enqueue(bytes.subarray(0, 9000)); controller.enqueue(bytes.subarray(9000)); controller.close(); } });
  const response = await submit({ body });
  assert.equal(response.status, 413);
  await response.text();
});

test("invalid, duplicate, unknown, and overlong fields cannot bypass validation", async () => {
  const duplicate = new URLSearchParams(validFields);
  duplicate.append("name", "Another name");
  const cases = [
    { fields: { name: "" } },
    { fields: { name: "x".repeat(101) } },
    { fields: { name: "Name\r\nInjected" } },
    { fields: { email: "not-an-email" } },
    { fields: { service: "Unlisted service" } },
    { fields: { message: "bad\u0000input" } },
    { fields: { unknown: "value" } },
    { body: duplicate },
    { body: new Uint8Array([255]) },
  ];
  for (const request of cases) {
    const response = await submit(request);
    assert.equal(response.status, 400);
    await response.text();
  }
});

test("Cloudflare static assets retain security headers and missing routes stay missing", { skip: !isCloudflare }, async () => {
  const asset = await fetch(`${origin}/billing-team-hero.webp`);
  assert.equal(asset.status, 200);
  assert.equal(asset.headers.get("x-content-type-options"), "nosniff");
  assert.match(asset.headers.get("content-type"), /^image\/webp(?:;|$)/);
  await asset.arrayBuffer();

  for (const path of ["/this-page-does-not-exist", "/_next/static/this-script-does-not-exist.js"]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 404, `${path} must not fall back to the homepage`);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    await response.text();
  }
});

test("Cloudflare rejects unsupported consultation methods and protects unknown API responses", { skip: !isCloudflare }, async () => {
  function assertPrivateApiResponse(response) {
    assert.match(response.headers.get("cache-control"), /no-store/);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    assert.equal(response.headers.get("referrer-policy"), "no-referrer");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.match(response.headers.get("content-security-policy"), /script-src 'none'/);
  }

  for (const method of ["GET", "HEAD", "PUT", "OPTIONS"]) {
    const response = await fetch(`${origin}/api/consultation`, { method });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "POST");
    assertPrivateApiResponse(response);
    await response.text();
  }

  const response = await fetch(`${origin}/api/this-route-does-not-exist`);
  assert.equal(response.status, 404);
  assertPrivateApiResponse(response);
  await response.text();
});
