const defaultSiteUrl = "https://meddot-solutions.vercel.app";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
const siteUrl = new URL(configuredUrl);

if (siteUrl.protocol !== "https:" || siteUrl.username || siteUrl.password || siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin, for example https://your-domain.com, without a path, query, or credentials.");
}

export const SITE_URL = siteUrl.origin;
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "ziaurrahman.26261@gmail.com";

if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(CONTACT_EMAIL)) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must contain one email address without a display name or additional parameters.");
}
