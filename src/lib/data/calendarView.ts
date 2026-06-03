import type { Tournament, Match } from './types';

export interface CalendarDayVM {
  date: string;
  matches: Match[];
}

export interface PhaseCalendarVM {
  phaseId: string;
  days: CalendarDayVM[];
}

export function buildCalendarView(tournament: Tournament): PhaseCalendarVM[] {
  // Simple grouping by phaseId and date
  const phasesMap = new Map<string, Map<string, Match[]>>();
  
  for (const match of tournament.matches) {
    const phaseId = match.phaseId || 'unknown-phase';
    const date = match.date || 'TBD';
    
    if (!phasesMap.has(phaseId)) {
      phasesMap.set(phaseId, new Map());
    }
    const daysMap = phasesMap.get(phaseId)!;
    
    if (!daysMap.has(date)) {
      daysMap.set(date, []);
    }
    daysMap.get(date)!.push(match);
  }

  const result: PhaseCalendarVM[] = [];
  for (const [phaseId, daysMap] of Array.from(phasesMap.entries())) {
    const days = Array.from(daysMap.entries()).map(([date, matches]) => ({
      date,
      matches: matches.sort((a, b) => (a.kickoffBrt || '').localeCompare(b.kickoffBrt || ''))
    })).sort((a, b) => a.date.localeCompare(b.date));
    
    result.push({ phaseId, days });
  }

  return result;
}
