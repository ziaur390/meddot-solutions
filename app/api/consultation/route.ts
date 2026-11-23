import { handleConsultation } from "@/lib/consultation";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const runtime = "nodejs";

export function POST(request: Request) {
  return handleConsultation(request, CONTACT_EMAIL);
}
