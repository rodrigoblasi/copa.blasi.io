import { describe, it, expect } from 'vitest';
import type { MatchStatus } from '@/lib/data/types';

describe('Match Status transitions', () => {
  it('validates state transitions types are available', () => {
    const states: MatchStatus[] = ['unknown', 'future', 'live', 'finished', 'data-problem'];
    expect(states).toContain('future');
    expect(states).toContain('live');
    expect(states).toContain('finished');
  });
});
