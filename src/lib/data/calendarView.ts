import type { Tournament, Match, Team } from './types';
import { classifyMatchEmphasis } from './emphasis';
import { groupKnockoutMatchesByRound } from './knockoutPhases';
import { translateSlotLabel } from './slotLabels';

export interface CalendarDayVM {
  date: string;
  matches: Match[];
}

export interface PhaseCalendarVM {
  phaseId: string;
  label: string;
  days: CalendarDayVM[];
}

function enrichMatch(match: Match, teams: Team[]): Match {
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);
  const emphasis = classifyMatchEmphasis(match, teams);
  return {
    ...match,
    homeTeamName: home?.name || translateSlotLabel(match.homeTeamLabel),
    awayTeamName: away?.name || translateSlotLabel(match.awayTeamLabel),
    homeTeamCode: home?.countryCode || null,
    awayTeamCode: away?.countryCode || null,
    stadiumLabel: match.venue || null,
    stadiumMapUrl: buildStadiumMapUrl(match),
    emphasisLevel: emphasis.level,
    emphasisAriaLabel: emphasis.ariaLabel,
  };
}

const phaseLabels: Record<string, string> = {
  'groups': 'Fase de Grupos',
  'knockout': 'Fase Eliminatória',
};

function buildStadiumMapUrl(match: Match): string | null {
  if (!match.venue) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${match.venue} ${match.city || ''}`.trim())}`;
}

function pushMatch(phasesMap: Map<string, Map<string, Match[]>>, phaseId: string, date: string, match: Match) {
  if (!phasesMap.has(phaseId)) phasesMap.set(phaseId, new Map());
  const daysMap = phasesMap.get(phaseId)!;
  if (!daysMap.has(date)) daysMap.set(date, []);
  daysMap.get(date)!.push(match);
}

export function buildCalendarView(tournament: Tournament): PhaseCalendarVM[] {
  const phasesMap = new Map<string, Map<string, Match[]>>();
  
  for (const match of tournament.matches) {
    const phaseId = match.phaseId || 'unknown-phase';
    if (phaseId === 'knockout') continue;
    const date = match.date || 'TBD';
    const enriched = enrichMatch(match, tournament.teams);
    pushMatch(phasesMap, phaseId, date, enriched);
  }

  for (const group of groupKnockoutMatchesByRound(tournament.matches)) {
    for (const match of group.matches) {
      pushMatch(phasesMap, group.label, match.date || 'TBD', enrichMatch(match, tournament.teams));
    }
  }

  const result: PhaseCalendarVM[] = [];
  for (const [phaseId, daysMap] of Array.from(phasesMap.entries())) {
    const days = Array.from(daysMap.entries()).map(([date, matches]) => ({
      date,
      matches: matches.sort((a, b) => (a.kickoffBrt || '').localeCompare(b.kickoffBrt || ''))
    })).sort((a, b) => a.date.localeCompare(b.date));
    
    result.push({ phaseId, label: phaseLabels[phaseId] || phaseId, days });
  }

  return result;
}
