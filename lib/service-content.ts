export const revenueServices = {
  "medical-billing": {
    eyebrow: "REVENUE OPERATIONS / 01",
    title: "Medical billing services for independent practices.",
    intro: "Meddot supports independent practices with claim preparation, submission tracking, payer follow-up, and clear billing communication. We agree on workflows and responsibilities before work begins.",
    overview: "Billing is more than sending a claim. It involves preparing information, tracking submissions, responding to rejections, and keeping the practice informed about what needs attention.",
    items: [
      ["Claim preparation", "Organize the information needed for accurate claim creation and submission."],
      ["Submission and tracking", "Follow claim status and identify issues that need a response."],
      ["Payment follow-up", "Keep outstanding claims visible so next actions are easier to manage."],
      ["Practice communication", "Give your team a clearer view of billing work and open questions."],
    ],
    question: "Could your billing workflow be easier to follow?",
  },
  "revenue-cycle-management": {
    eyebrow: "REVENUE OPERATIONS / 02",
    title: "Revenue cycle management for medical practices.",
    intro: "Revenue cycle management connects patient and payer information, coding, claims, denials, and payment follow-up. Meddot helps small practices make these handoffs easier to see and manage.",
    overview: "A practice needs each handoff to work: patient and payer information, coding, claims, denials, and reporting. Meddot brings an operational view to these connected tasks.",
    items: [
      ["Connected workflows", "Identify how front-office information, coding, and billing depend on one another."],
      ["Claim visibility", "Track work that is pending, rejected, denied, or awaiting payment."],
      ["Denial attention", "Surface recurring issues so the practice can discuss causes and next steps."],
      ["Useful reporting", "Focus conversations on the measures and open work that matter to your team."],
    ],
    question: "Want to understand where revenue work gets stuck?",
  },
  "medical-coding": {
    eyebrow: "REVENUE OPERATIONS / 03",
    title: "Medical coding support for healthcare practices.",
    intro: "Medical coding translates documented services into codes used for billing. Meddot’s scope starts with the clinical record, agreed coding responsibilities, and a clear path for documentation questions.",
    overview: "Meddot's coding service is designed to support consistent review of documentation and the codes used for billing. Final scope depends on your specialty and workflow.",
    items: [
      ["Documentation review", "Work from the information recorded for the patient encounter."],
      ["Code selection", "Apply the coding requirements relevant to the agreed work."],
      ["Clarification", "Identify gaps or questions that need input from the practice."],
      ["Quality focus", "Build review into the process rather than treating coding as a handoff without context."],
    ],
    question: "Need a coding partner who understands your workflow?",
  },
  credentialing: {
    eyebrow: "REVENUE OPERATIONS / 04",
    title: "Provider credentialing and payer enrollment support.",
    intro: "Provider credentialing and payer enrollment require accurate practice information, payer-specific applications, and status follow-up. Meddot helps organize those tasks within an agreed scope.",
    overview: "Meddot can help organize the information and tasks involved in provider enrollment. Timing and requirements vary by payer, so each engagement begins with a defined scope.",
    items: [
      ["Information gathering", "Identify provider and practice details needed for the enrollment work."],
      ["Application support", "Prepare and coordinate agreed payer enrollment tasks."],
      ["Status follow-up", "Keep pending requests and responses visible to the practice."],
      ["Change management", "Discuss updates when provider or practice information changes."],
    ],
    question: "Preparing to enroll a provider or grow your practice?",
  },
  "ar-recovery": {
    eyebrow: "Revenue operations", title: "A/R recovery and aged claim follow-up.",
    intro: "A/R recovery reviews unpaid claims by age, payer status, and next action. Meddot helps practices organize follow-up and keep unresolved balances visible.",
    overview: "Accounts receivable recovery works best when the backlog is segmented. A proposed engagement would review available aging data, agree on priorities, and document follow-up outcomes.",
    items: [["Aging review", "Group open balances to see where attention is needed first."], ["Payer follow-up", "Investigate claim status and document responses."], ["Denial resolution", "Route correctable denials into an agreed appeal or resubmission process."], ["Outcome tracking", "Show what was resolved, remains open, or needs practice input."]],
    question: "Want a clearer picture of outstanding claims?",
  },
  "specialty-billing": {
    eyebrow: "Revenue operations", title: "Specialty medical billing shaped around your workflow.",
    intro: "Specialty medical billing depends on the services, documentation, coding, authorizations, and payer rules involved. Meddot scopes support after reviewing your actual service mix and workflow.",
    overview: "Specialties differ in visit types, coding patterns, and payer requirements. We would review your service lines and define a scope around them rather than assume one process fits all.",
    items: [["Service-line review", "Understand common encounters and billing requirements."], ["Documentation handoffs", "Identify what billing needs from the clinical team."], ["Authorization checks", "Clarify how referrals and prior authorizations enter the process where relevant."], ["Payer exceptions", "Track recurring specialty-specific issues and their resolution paths."]],
    question: "Need billing support shaped to your service mix?",
  },
  "monthly-billing-audit": {
    eyebrow: "Revenue operations", title: "Medical billing audits and quality review.",
    intro: "A billing audit reviews an agreed sample of claims and workflow signals to identify patterns for follow-up. Meddot defines the sample, measures, access, and reporting scope with your team.",
    overview: "A monthly audit makes patterns easier to see. We would agree on the sample, measures, access, and reporting format so findings can lead to action.",
    items: [["Sample selection", "Define which claims or encounters should be reviewed."], ["Accuracy checks", "Compare documentation, coding, charges, and claim data within scope."], ["Denial themes", "Highlight repeated errors or payer responses."], ["Action summary", "Share findings, owners, and suggested next steps."]],
    question: "Would a monthly review help your team?",
  },
  "clearinghouse-solutions": {
    eyebrow: "Revenue operations", title: "Clearinghouse setup and electronic claim support.",
    intro: "Clearinghouse support covers agreed electronic claim submissions, payer responses, and rejection workflows. Setup depends on your practice software, clearinghouse, and payer requirements.",
    overview: "The clearinghouse links your billing system and payers. We would define transaction types, connections, and exception handling around the systems your practice uses.",
    items: [["Connection planning", "Document billing system and payer routing needs."], ["Submission workflow", "Define how claims are sent and acknowledgments are reviewed."], ["Rejection handling", "Assign ownership for corrections and resubmission."], ["Reporting checks", "Make response files and outstanding errors visible to the team."]],
    question: "Need to improve your electronic claims workflow?",
  },
} as const;

export type RevenueSlug = keyof typeof revenueServices;

export const revenueNames: Record<RevenueSlug, string> = {
  "medical-billing": "Medical billing", "revenue-cycle-management": "Revenue cycle management",
  "medical-coding": "Medical coding", credentialing: "Credentialing", "ar-recovery": "AR recovery",
  "specialty-billing": "Specialty billing", "monthly-billing-audit": "Monthly billing audit",
  "clearinghouse-solutions": "Clearinghouse solutions",
};

export const digitalServices = {
  "ehr-integration": { name: "EHR integration", intro: "Plan the handoff of relevant data between your EHR and administrative tools.", overview: "Integration options depend on the EHR, interfaces, and permissions. We would review the workflow and vendor capabilities before choosing an approach.", items: [["Workflow mapping", "Identify information that needs to move and who uses it."], ["Vendor review", "Confirm available APIs, exports, and interface options."], ["Field planning", "Agree on required fields, ownership, and data checks."], ["Validation", "Test sample scenarios before a live handoff."]] },
  "emr-integration": { name: "EMR integration", intro: "Reduce repeated entry between your EMR and other practice systems.", overview: "EMR platforms vary widely. The proposed work begins by clarifying the source and destination systems and what each one permits.", items: [["System inventory", "List platforms and access available to the practice."], ["Data handoffs", "Document where encounter and demographic data should go."], ["Exception handling", "Plan how missing or mismatched records are reviewed."], ["Testing", "Check representative records with the practice before launch."]] },
  "edi-clearinghouse-setup": { name: "EDI clearinghouse setup", intro: "Coordinate setup for eligible electronic claim and payer transactions.", overview: "EDI work depends on your software, clearinghouse, and payer relationships. We would define supported transactions and test a small set before routine use.", items: [["Transaction scope", "Agree on the electronic transactions in scope."], ["Enrollment needs", "Identify payer or clearinghouse enrollment steps."], ["Connectivity checks", "Confirm file exchange and response handling."], ["Test cycle", "Review test submissions and exceptions with the team."]] },
  "healthcare-seo": { name: "Healthcare SEO", intro: "Improve site structure, service content, and local search basics around what your practice actually offers.", overview: "Search work begins with the information patients need and services the practice can substantiate. We would prioritize useful pages and technical issues without promising rankings.", items: [["Content review", "Identify the questions and services each page should answer."], ["Local presence", "Review consistent practice information where relevant."], ["Technical basics", "Check page titles, indexing, internal links, and mobile experience."], ["Content plan", "Recommend a manageable publishing schedule."]] },
  "healthcare-google-ads": { name: "Healthcare Google Ads", intro: "Plan paid search around relevant services, location, budget, and a useful path to inquiry.", overview: "Healthcare advertising requires careful claims and platform policy review. We would define campaign goals, approved language, landing pages, and reporting before launch.", items: [["Campaign plan", "Set geography, service focus, budget, and goals."], ["Message review", "Draft ads aligned with real services and platform policies."], ["Landing pages", "Connect ads to pages that answer patient questions."], ["Performance review", "Review search terms, spend, and inquiry quality."]] },
  "healthcare-web-development": { name: "Healthcare web development", intro: "A responsive practice site with clear services, accessible navigation, and an obvious contact path.", overview: "A useful healthcare website reflects the real practice. We would gather approved content, define visitor tasks, and build within an agreed scope.", items: [["Information architecture", "Organize services, locations, team details, and contact paths."], ["Design and development", "Build a responsive site with accessible fundamentals."], ["Content setup", "Place approved copy and images in a consistent page system."], ["Launch checks", "Review mobile layouts, forms, links, and performance basics."]] },
  "gohighlevel-services": { name: "GoHighLevel services", intro: "Configure agreed workflows for inquiries, follow-up, and team visibility.", overview: "Healthcare use requires appropriate platform configuration, vendor agreements, and privacy review. We would plan only the workflows your practice is ready to use.", items: [["Inquiry workflow", "Map how messages arrive and who responds."], ["Pipeline setup", "Create stages that match real team actions."], ["Automation planning", "Use approved, non-sensitive messages and escalation rules."], ["Team handoff", "Document ownership and review points before activation."]] },
} as const;

export type DigitalSlug = keyof typeof digitalServices;
