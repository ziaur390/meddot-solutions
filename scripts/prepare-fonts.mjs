import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Fetch only at build/setup time. Fontshare's FFL permits self-hosting for this
// website, while font binaries stay out of the public source repository.
const fontUrl = "https://cdn.fontshare.com/wf/NWBQYJIM7GCZ5XWD7D26ARB3VDY55ZRT/K63EV2KZIGKLE7RANQ2U42S6SVHU5RJ7/X6XYTKIVDUW7GZTZPZNN4EUM5KH54KHF.woff2";
const expectedSha256 = "e739aff9b4d02c264341d6d4872edcda28e79373aeda936f659566a1cd3eb47f";
const expectedBytes = 42_588;
const maximumBytes = 128 * 1024;
const fontDirectory = fileURLToPath(new URL("../public/fonts/", import.meta.url));
const fontPath = fileURLToPath(new URL("../public/fonts/Satoshi-Variable.woff2", import.meta.url));

function validFont(bytes) {
  return bytes.length === expectedBytes
    && bytes.subarray(0, 4).equals(Buffer.from("wOF2"))
    && createHash("sha256").update(bytes).digest("hex") === expectedSha256;
}

async function verifiedLocalFont() {
  try {
    if ((await stat(fontPath)).size !== expectedBytes) return false;
    return validFont(await readFile(fontPath));
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function downloadFont() {
  const response = await fetch(fontUrl, {
    redirect: "error",
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok || !response.body) {
    throw new Error(`Official Satoshi download failed (HTTP ${response.status}).`);
  }
  const length = response.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > maximumBytes)) {
    await response.body.cancel();
    throw new Error("Official Satoshi download exceeds the expected size bound.");
  }

  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBytes) {
        await reader.cancel();
        throw new Error("Official Satoshi download exceeds the size bound.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = Buffer.concat(chunks, size);
  if (!validFont(bytes)) {
    throw new Error("Satoshi integrity verification failed. Review the official font and pinned hash before updating them.");
  }
  return bytes;
}

async function prepareFonts() {
  if (await verifiedLocalFont()) {
    console.log("Satoshi variable font verified locally; no download needed.");
    return;
  }
  const bytes = await downloadFont();
  await mkdir(fontDirectory, { recursive: true });
  const temporaryPath = `${fontPath}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, bytes, { flag: "wx", mode: 0o644 });
    await rename(temporaryPath, fontPath);
  } finally {
    await unlink(temporaryPath).catch(() => {});
  }
  console.log("Official Satoshi variable font downloaded and SHA-256 verified for this website.");
}

try {
  await prepareFonts();
} catch (error) {
  console.error(`Font preparation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
