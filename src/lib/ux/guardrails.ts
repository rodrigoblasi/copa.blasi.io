export const UX_GUARDRAILS = {
  HIERARCHY: 'One dominant reading path with strong hierarchy. No flat card grids.',
  MOBILE: 'Mobile layout must preserve tournament logic and readability. No infinite horizontal scroll.',
  PENDING_STATES: 'Pending knockout slots and matches must look intentional and labeled, not broken.',
  NO_DASHBOARD: 'Avoid dashboard-drift. No unnecessary badges, widgets, or analytics framing.',
  CONTRAST: 'High contrast and legible typography must be maintained across all states.'
};

export const UX_REVIEW_QUESTIONS = [
  { id: 'Q1', guardrail: 'HIERARCHY', question: 'Is there one dominant reading path?' },
  { id: 'Q2', guardrail: 'NO_DASHBOARD', question: 'Does the UI avoid generic card grids or analytics widgets?' },
  { id: 'Q3', guardrail: 'MOBILE', question: 'Does the layout collapse gracefully without horizontal scrolling?' },
  { id: 'Q4', guardrail: 'PENDING_STATES', question: 'Are unknown or pending values explicitly labeled?' },
  { id: 'Q5', guardrail: 'CONTRAST', question: 'Is typography legible with high contrast?' }
];
