import { ArrowRight } from "lucide-react";

export function ServiceWorkbench({ title, stages, variant = "revenue", caption = "An illustrative workflow. The agreed scope and systems determine the final process." }: {
  title: string;
  stages: readonly (readonly [string, string])[];
  variant?: "revenue" | "digital" | "ai";
  caption?: string;
}) {
  return <figure className={`service-workbench workbench-${variant}`}>
    <div className="workbench-heading"><h3>{title}</h3><span>Illustrative workflow</span></div>
    <ol className="workbench-path">
      {stages.map(([name, detail], index) => <li key={name}>
        <div className="workbench-node" aria-hidden="true"><span />{index < stages.length - 1 && <ArrowRight size={17} />}</div>
        <strong>{name}</strong><p>{detail}</p>
      </li>)}
    </ol>
    <figcaption>{caption}</figcaption>
  </figure>;
}
