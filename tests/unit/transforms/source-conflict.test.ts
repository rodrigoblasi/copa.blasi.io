import { describe, it, expect } from 'vitest';
import { resolveMatchConflict } from '@/lib/data/sourceConflicts';
import type { Match } from '@/lib/data/types';

describe('Source Conflict Resolution', () => {
  it('marks conflict when two final scores disagree', () => {
    const srcA: Partial<Match> = { id: 'm1', score: { homeGoals: 1, awayGoals: 0, state: 'final' } };
    const srcB: Partial<Match> = { id: 'm1', score: { homeGoals: 2, awayGoals: 0, state: 'final' } };
    
    const resolved = resolveMatchConflict(srcA, srcB);
    expect(resolved.status).toBe('data-problem');
    expect(resolved.freshnessState).toBe('conflicting');
    expect(resolved.score?.state).toBe('source-problem');
  });
  
  it('trusts primary source if scores agree', () => {
    const srcA: Partial<Match> = { id: 'm1', score: { homeGoals: 1, awayGoals: 0, state: 'final' } };
    const srcB: Partial<Match> = { id: 'm1', score: { homeGoals: 1, awayGoals: 0, state: 'final' } };
    
    const resolved = resolveMatchConflict(srcA, srcB);
    expect(resolved.status).toBeUndefined(); // Returns unmodified source A structure fragment
  });
});
