"use client";

import { useSearchParams } from "next/navigation";

type ServiceOption = { slug: string; label: string };
type ServiceChoices = { revenue: ServiceOption[]; digital: ServiceOption[] };
const healthcareAi = { slug: "healthcare-ai", label: "Healthcare AI (in development)" };

function ServiceSelect({ choices, initialValue = "" }: { choices: ServiceChoices; initialValue?: string }) {
  return <select id="service" name="service" required defaultValue={initialValue}>
    <option value="" disabled>Select a service</option>
    <option value="Not sure yet">Not sure yet</option>
    <optgroup label="Medical billing and RCM">{choices.revenue.map(({ slug, label }) => <option key={slug} value={label}>{label}</option>)}</optgroup>
    <optgroup label="Digital and integration">{choices.digital.map(({ slug, label }) => <option key={slug} value={label}>{label}</option>)}</optgroup>
    <option value={healthcareAi.label}>{healthcareAi.label}</option>
  </select>;
}

// Static HTML includes every choice, so visitors can use the form without JavaScript.
export function ContactServiceSelectFallback({ choices }: { choices: ServiceChoices }) {
  return <ServiceSelect choices={choices}/>;
}

export function ContactServiceSelect({ choices }: { choices: ServiceChoices }) {
  const searchParams = useSearchParams();
  const requestedServices = searchParams.getAll("service");
  const selectedService = requestedServices.length === 1
    ? [...choices.revenue, ...choices.digital, healthcareAi].find(({ slug }) => slug === requestedServices[0])?.label ?? ""
    : "";

  // Reset only when service intent changes. Ordinary rerenders retain a visitor's
  // manual selection; client navigation and back/forward apply the new intent.
  return <ServiceSelect key={JSON.stringify(requestedServices)} choices={choices} initialValue={selectedService}/>;
}
