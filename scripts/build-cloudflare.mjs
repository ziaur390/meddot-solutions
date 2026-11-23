import { cp, lstat, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const buildRoot = path.join(root, ".cloudflare-build");
const staging = path.join(buildRoot, "site");
const assets = path.join(buildRoot, "assets");
const { loadEnvConfig } = nextEnv;
loadEnvConfig(root, false);

function run(args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, env, stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("exit", code => code === 0 ? resolve() : reject(new Error(`Build command exited with status ${code}.`)));
  });
}

function checkOwnedBuildPath(target) {
  const relative = path.relative(root, target);
  if (!relative.startsWith(`.cloudflare-build${path.sep}`) || path.isAbsolute(relative) || relative.includes(`..${path.sep}`)) {
    throw new Error("Refusing to clear a path outside the generated Cloudflare build directory.");
  }
}

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!configuredUrl) throw new Error("Set NEXT_PUBLIC_SITE_URL to the intended HTTPS website origin before building for Cloudflare. See CLOUDFLARE-MIGRATION.md.");
const siteUrl = new URL(configuredUrl);
if (siteUrl.protocol !== "https:" || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash || siteUrl.pathname !== "/") {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, query, or credentials.");
}
const parsedConfig = ts.parseConfigFileTextToJson("wrangler.cloudflare.jsonc", await readFile(path.join(root, "wrangler.cloudflare.jsonc"), "utf8"));
if (parsedConfig.error) throw new Error("Fix the JSONC syntax in wrangler.cloudflare.jsonc before building.");
const config = parsedConfig.config;
const recipient = config.vars.CONTACT_EMAIL;
if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(recipient)) throw new Error("Set a valid CONTACT_EMAIL in wrangler.cloudflare.jsonc.");
if (process.env.NEXT_PUBLIC_CONTACT_EMAIL && process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim() !== recipient) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL and wrangler.cloudflare.jsonc CONTACT_EMAIL must match, so the form and public Contact page use the same inbox.");
}

await run(["scripts/prepare-fonts.mjs"]);
for (const target of [staging, assets]) {
  checkOwnedBuildPath(target);
  await rm(target, { recursive: true, force: true });
}
await mkdir(staging, { recursive: true });
for (const directory of ["app", "components", "hooks", "lib", "vendor"]) {
  await cp(path.join(root, directory), path.join(staging, directory), {
    recursive: true,
    filter: source => source !== path.join(root, "app", "api") && source !== path.join(root, "app", "chatgpt-auth.ts"),
  });
}
// Publish only the website's asset types, not stray HTML drafts in public/.
await cp(path.join(root, "public"), path.join(staging, "public"), {
  recursive: true,
  filter: async source => {
    const entry = await lstat(source);
    if (entry.isSymbolicLink()) throw new Error("Public asset symlinks are not supported. Keep website assets inside public/.");
    return entry.isDirectory() || (entry.isFile() && /\.(?:png|jpe?g|webp|avif|svg|ico|woff2|txt)$/i.test(source));
  },
});
for (const filename of ["tsconfig.json", "postcss.config.mjs"]) {
  await cp(path.join(root, filename), path.join(staging, filename));
}
await writeFile(path.join(staging, "package.json"), JSON.stringify({ private: true, type: "module" }));
await writeFile(path.join(staging, "next.config.mjs"), 'export default { output: "export", poweredByHeader: false, images: { unoptimized: true } };\n');
const env = { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", NEXT_PUBLIC_SITE_URL: siteUrl.origin, NEXT_PUBLIC_CONTACT_EMAIL: recipient };
await run(["node_modules/next/dist/bin/next", "build", staging, "--webpack"], env);
await cp(path.join(staging, "out"), assets, { recursive: true });
await cp(path.join(root, "cloudflare", "_headers"), path.join(assets, "_headers"));
for (const filename of ["index.html", "contact.html", "404.html", "robots.txt", "sitemap.xml", "fonts/Satoshi-Variable.woff2"]) {
  await readFile(path.join(assets, filename));
}
const contactHtml = await readFile(path.join(assets, "contact.html"), "utf8");
if (!contactHtml.includes('action="/api/consultation"')) throw new Error("Static export lost the consultation form.");
await writeFile(path.join(buildRoot, "build-info.json"), JSON.stringify({ siteUrl: siteUrl.origin, contactEmail: recipient, builtAt: new Date().toISOString() }, null, 2) + "\n");
console.log(`Cloudflare static export ready: ${assets}`);
console.log(`Canonical origin: ${siteUrl.origin}. Contact recipient: ${recipient}.`);
