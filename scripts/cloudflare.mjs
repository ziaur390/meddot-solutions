import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const action = process.argv[2];
if (!["dev", "check", "deploy"].includes(action)) throw new Error("Choose dev, check, or deploy.");
const build = JSON.parse(await readFile(new URL("../.cloudflare-build/build-info.json", import.meta.url), "utf8"));
const parsedConfig = ts.parseConfigFileTextToJson("wrangler.cloudflare.jsonc", await readFile(new URL("../wrangler.cloudflare.jsonc", import.meta.url), "utf8"));
if (parsedConfig.error) throw new Error("Fix the JSONC syntax in wrangler.cloudflare.jsonc before proceeding.");
const config = parsedConfig.config;
if (config.vars.CONTACT_EMAIL !== build.contactEmail) throw new Error("The contact inbox changed. Rebuild with npm run build:cloudflare before proceeding.");
if (action === "deploy") {
  const hostname = new URL(build.siteUrl).hostname;
  if (/(?:^|\.)(?:test|invalid|example|localhost)$/.test(hostname) || /(?:^|\.)example\.(?:com|net|org)$/.test(hostname) || hostname.endsWith(".vercel.app") || /^127\./.test(hostname) || hostname === "[::1]") {
    throw new Error("This build uses a test or Vercel canonical URL. Set NEXT_PUBLIC_SITE_URL to the intended Cloudflare/custom-domain origin and rebuild before deploying.");
  }
}
const args = ["node_modules/wrangler/bin/wrangler.js", action === "dev" ? "dev" : "deploy", "--config", "wrangler.cloudflare.jsonc"];
const extra = process.argv.slice(3);
if (extra.length && !(action === "dev" && extra.length === 2 && extra[0] === "--port" && /^\d+$/.test(extra[1]) && Number(extra[1]) >= 1024 && Number(extra[1]) <= 65535)) {
  throw new Error("Only preview --port is supported. Edit and rebuild the checked configuration instead of overriding deployment settings.");
}
if (action === "dev") args.push("--local", "--ip", "127.0.0.1", "--inspector-port", "0");
if (action === "check") args.push("--dry-run", "--outdir", ".cloudflare-build/bundle");
const child = spawn(process.execPath, [...args, ...extra], {
  cwd: root,
  env: {
    ...process.env, WRANGLER_SEND_METRICS: "false", CLOUDFLARE_CF_FETCH_ENABLED: "false", WRANGLER_LOG_PATH: ".wrangler/logs",
    WRANGLER_REGISTRY_PATH: fileURLToPath(new URL("../.wrangler/dev-registry", import.meta.url)),
    MINIFLARE_REGISTRY_PATH: fileURLToPath(new URL("../.wrangler/registry", import.meta.url)),
    // Local checks need no account credentials. Actual deployment keeps the
    // caller's normal authentication location for Wrangler login/API access.
    ...(action !== "deploy" ? { XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || fileURLToPath(new URL("../.wrangler/local-config", import.meta.url)) } : {}),
  },
  stdio: "inherit", windowsHide: true,
});
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code ?? 1; });
