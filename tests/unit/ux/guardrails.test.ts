import { describe, it, expect } from 'vitest';
import { UX_GUARDRAILS } from '@/lib/ux/guardrails';

describe('UX Guardrails', () => {
  it('defines the necessary guardrails', () => {
    expect(UX_GUARDRAILS.HIERARCHY).toBeDefined();
    expect(UX_GUARDRAILS.MOBILE).toBeDefined();
    expect(UX_GUARDRAILS.PENDING_STATES).toBeDefined();
    expect(UX_GUARDRAILS.NO_DASHBOARD).toBeDefined();
  });
});
