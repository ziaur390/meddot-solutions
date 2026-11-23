import { handleConsultation } from "../lib/consultation";
import { validateContactEmail } from "../lib/contact-email";

interface MeddotEnvironment {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_EMAIL: string;
}

function apiError(message: string, status: number, allow?: string) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Content-Security-Policy": "default-src 'none'; script-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'",
      ...(allow ? { Allow: allow } : {}),
    },
  });
}

const worker = {
  async fetch(request: Request, env: MeddotEnvironment): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/api/consultation" || pathname === "/api/consultation/") {
      if (request.method !== "POST") return apiError("Use the consultation form to prepare an email request.", 405, "POST");
      let recipient: string;
      try { recipient = validateContactEmail(env.CONTACT_EMAIL); }
      catch { return apiError("The consultation form is temporarily unavailable. Please return to the Contact page.", 503); }
      return handleConsultation(request, recipient);
    }
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return apiError("This endpoint does not exist.", 404);
    }
    // Existing static files bypass this Worker. Missing pages use the asset
    // service's real 404 behavior rather than falling back to the homepage.
    return env.ASSETS.fetch(request);
  },
};

export default worker;
