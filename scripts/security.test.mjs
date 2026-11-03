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
const validFields = { name: "Security review", practice: "Example practice", email: "preview@example.com", phone: "", service: "Not sure yet", message: "A general consultation inquiry. No patient information." };

before(async () => {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  for (const stream of [server.stdout, server.stderr]) stream.on("data", chunk => { startupLog = (startupLog + chunk).slice(-10000); });
  server.on("error", error => { startupLog += error.message; });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Production server exited: ${startupLog}`);
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
      await response.arrayBuffer();
      if (response.ok) return;
    } catch { /* Wait for the local production server to become ready. */ }
    await delay(100);
  }
  throw new Error(`Production server was not ready: ${startupLog}`);
}, { timeout: 30000 });

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill();
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
  assert.match(html, /mailto:ziaurrahman\.26261@gmail\.com\?subject=/);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.match(response.headers.get("x-robots-tag"), /noindex/);
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  const csp = response.headers.get("content-security-policy");
  assert.match(csp, /script-src 'none'/);
  const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  assert.ok(style);
  assert.ok(csp.includes(`'sha256-${createHash("sha256").update(style).digest("base64")}'`));
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
