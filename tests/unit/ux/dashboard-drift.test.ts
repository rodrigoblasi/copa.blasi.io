import { describe, it, expect } from 'vitest';
import { UX_GUARDRAILS } from '@/lib/ux/guardrails';

describe('Dashboard Drift Protection', () => {
  it('explicitly forbids dashboard framing in guardrails', () => {
    expect(UX_GUARDRAILS.NO_DASHBOARD.toLowerCase()).toContain('dashboard');
    expect(UX_GUARDRAILS.NO_DASHBOARD.toLowerCase()).toContain('avoid');
  });
});
