import type { Tournament, Match, Team } from './types';

export interface CalendarDayVM {
  date: string;
  matches: Match[];
}

export interface PhaseCalendarVM {
  phaseId: string;
  days: CalendarDayVM[];
}

function enrichMatch(match: Match, teams: Team[]): Match {
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);
  return {
    ...match,
    homeTeamName: home?.name || match.homeTeamLabel || 'A definir',
    awayTeamName: away?.name || match.awayTeamLabel || 'A definir',
    homeTeamCode: home?.countryCode || null,
    awayTeamCode: away?.countryCode || null,
  };
}

const phaseLabels: Record<string, string> = {
  'groups': 'Fase de Grupos',
  'knockout': 'Mata-Mata',
};

export function buildCalendarView(tournament: Tournament): PhaseCalendarVM[] {
  const phasesMap = new Map<string, Map<string, Match[]>>();
  
  for (const match of tournament.matches) {
    const phaseId = match.phaseId || 'unknown-phase';
    const date = match.date || 'TBD';
    const enriched = enrichMatch(match, tournament.teams);
    
    if (!phasesMap.has(phaseId)) {
      phasesMap.set(phaseId, new Map());
    }
    const daysMap = phasesMap.get(phaseId)!;
    
    if (!daysMap.has(date)) {
      daysMap.set(date, []);
    }
    daysMap.get(date)!.push(enriched);
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
