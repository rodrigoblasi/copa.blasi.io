import { describe, it, expect } from 'vitest';
import { buildCalendarView } from '@/lib/data/calendarView';
import type { Tournament } from '@/lib/data/types';

describe('Calendar View Builder', () => {
  it('groups matches by phase and date correctly', () => {
    const t = {
      id: 'wc', name: 'WC', teams: [], groups: [], knockoutBlocks: [], knockoutSlots: [],
      matches: [
        { id: 'm1', slug: 'm1', phaseId: 'groups', date: '2026-06-12', kickoffBrt: '16:00', status: 'future', homeTeamId: 'a', awayTeamId: 'b', score: null, freshnessState: 'fresh' },
        { id: 'm2', slug: 'm2', phaseId: 'groups', date: '2026-06-11', kickoffBrt: '19:00', status: 'future', homeTeamId: 'c', awayTeamId: 'd', score: null, freshnessState: 'fresh' },
      ]
    } as unknown as Tournament;
    
    const vm = buildCalendarView(t);
    expect(vm.length).toBe(1);
    expect(vm[0].phaseId).toBe('groups');
    expect(vm[0].days.length).toBe(2);
    // Should be sorted by date naturally
    expect(vm[0].days[0].date).toBe('2026-06-11');
    expect(vm[0].days[1].date).toBe('2026-06-12');
  });
});
