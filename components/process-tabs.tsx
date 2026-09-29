const steps = [
  { id: "01", title: "Understand", heading: "Start with the whole practice.", body: "We begin by learning your current billing workflow, technology, goals, and the points where your team needs support." },
  { id: "02", title: "Plan", heading: "Define the right scope.", body: "Together, we identify the services that fit your practice and make responsibilities, handoffs, and next steps clear." },
  { id: "03", title: "Launch", heading: "Move with a practical plan.", body: "A clear onboarding plan helps your team prepare the information, access, and approvals required for the agreed services." },
  { id: "04", title: "Improve", heading: "Stay close to what matters.", body: "The working relationship should make it easier to discuss issues, review progress, and adjust priorities as your practice grows." },
];

export function ProcessTabs() {
  return <div className="process-steps">
    {steps.map((step, index) => <details className="process-step" key={step.id} open={index === 0}>
      <summary><span>{step.id}</span><strong>{step.title}</strong><span className="process-plus">+</span></summary>
      <div className="process-step-body"><h3>{step.heading}</h3><p>{step.body}</p></div>
    </details>)}
  </div>;
}
