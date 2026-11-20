# Satoshi for the Meddot website

Satoshi is designed by Deni Anggara and distributed by Indian Type Foundry through [Fontshare](https://www.fontshare.com/fonts/satoshi). It is proprietary freeware under the ITF Free Font License, not the SIL Open Font License.

The unmodified official license is in `Satoshi-FFL.txt`, and Fontshare's original webfont instructions are in `Satoshi-Webfont-Instructions.txt`. The included license is version 2.0, dated 17 August 2026. Section 01 permits self-hosting the original font on the licensee's own websites and applications. Section 02 restricts redistribution through font libraries, repositories, and other services beyond those permitted uses. Font binaries are therefore ignored by Git and obtained directly from Fontshare during setup/build, rather than repackaged in this public repository.

Run from the website directory:

```sh
node scripts/prepare-fonts.mjs
```

This prepares only `Satoshi-Variable.woff2`: normal style, variable weight range **300–900**, 42,588 bytes. The script verifies a pinned SHA-256 digest and the WOFF2 signature, reuses a valid local file without network access, and otherwise downloads the original font from an HTTPS Fontshare CDN URL with a 30-second timeout and 128 KiB limit. A failed download or integrity check fails setup/build; it never silently accepts changed font data. Font files are not fetched during visitor requests.

Use the local font in the site's stylesheet:

```css
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Variable.woff2") format("woff2");
  font-weight: 300 900;
  font-style: normal;
  font-display: swap;
}
```

## Verified source

Verified on 20 November 2026 against both the [official download package](https://api.fontshare.com/v2/fonts/download/satoshi) and [Fontshare's variable-font CSS](https://api.fontshare.com/v2/css?f%5B%5D=satoshi%40variable&display=swap). The normal variable WOFF2 in both sources is byte-identical.

- Official CDN URL: `https://cdn.fontshare.com/wf/NWBQYJIM7GCZ5XWD7D26ARB3VDY55ZRT/K63EV2KZIGKLE7RANQ2U42S6SVHU5RJ7/X6XYTKIVDUW7GZTZPZNN4EUM5KH54KHF.woff2`
- SHA-256: `e739aff9b4d02c264341d6d4872edcda28e79373aeda936f659566a1cd3eb47f`

Do not subset, convert, rename font metadata, or otherwise modify the font binary. Anyone using the font outside Meddot's permitted website use should obtain their own copy directly from Fontshare. This folder is not a general font download service.
