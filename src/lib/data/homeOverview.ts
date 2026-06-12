import type { Tournament, GroupSection, KnockoutBlock, Team, Match } from './types';
import { classifyMatchEmphasis } from './emphasis';
import { translateSlotLabel } from './slotLabels';

export interface HomeOverviewVM {
  header: { tournamentName: string };
  brazilHighlight: {
    nextMatch: Match | null;
    status: string;
    brazilGroupMatches: Match[];
    todayMatches: Match[];
    todayLabel: string;
  };
  groups: Array<GroupSection & { matchesDetails: Match[] }>;
  knockout: KnockoutBlock[];
}

function enrichMatch(match: Match, teams: Team[], groups: GroupSection[] = []): Match {
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);
  const group = groups.find(g => g.id === match.groupId);
  const emphasis = classifyMatchEmphasis(match, teams);
  return {
    ...match,
    homeTeamName: home?.name || translateSlotLabel(match.homeTeamLabel),
    awayTeamName: away?.name || translateSlotLabel(match.awayTeamLabel),
    homeTeamCode: home?.countryCode || null,
    awayTeamCode: away?.countryCode || null,
    groupLabel: group?.label || null,
    stadiumLabel: match.venue || null,
    stadiumMapUrl: buildStadiumMapUrl(match),
    emphasisLevel: emphasis.level,
    emphasisAriaLabel: emphasis.ariaLabel,
  };
}

function buildStadiumMapUrl(match: Match): string | null {
  if (!match.venue) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${match.venue} ${match.city || ''}`.trim())}`;
}

function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayLabel(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return `${day} de ${new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(year, month - 1, day))}`;
}

function compareMatchesByDate(a: Match, b: Match): number {
  return `${a.date || '9999-99-99'} ${a.kickoffBrt || '99:99'}`.localeCompare(`${b.date || '9999-99-99'} ${b.kickoffBrt || '99:99'}`);
}

export function buildHomeOverview(tournament: Tournament, todayDate = getTodayDate()): HomeOverviewVM {
  const brazilTeam = tournament.teams.find(t => t.isBrazil);
  const isBrazilMatch = (match: Match) => brazilTeam && (match.homeTeamId === brazilTeam.id || match.awayTeamId === brazilTeam.id);
  const brazilGroupMatches = brazilTeam
    ? tournament.matches
        .filter(m => isBrazilMatch(m) && m.phaseId === 'groups')
        .sort(compareMatchesByDate)
        .map(m => enrichMatch(m, tournament.teams, tournament.groups))
    : [];
  const brazilMatch = brazilTeam
    ? tournament.matches
        .filter(m => isBrazilMatch(m) && m.status !== 'finished')
        .sort(compareMatchesByDate)[0]
    : null;
  const todayMatches = tournament.matches
    .filter(m => m.date === todayDate)
    .sort(compareMatchesByDate)
    .map(m => enrichMatch(m, tournament.teams, tournament.groups));

  return {
    header: { tournamentName: tournament.name },
    brazilHighlight: {
      nextMatch: brazilMatch ? enrichMatch(brazilMatch, tournament.teams, tournament.groups) : null,
      status: brazilMatch ? 'Jogos do Brasil e agenda do dia' : 'Aguardando definição',
      brazilGroupMatches,
      todayMatches,
      todayLabel: getTodayLabel(todayDate)
    },
    groups: tournament.groups.map(g => ({
      ...g,
      matchesDetails: g.matchIds
        .map(mid => tournament.matches.find(m => m.id === mid)!)
        .filter(Boolean)
        .map(m => enrichMatch(m, tournament.teams, tournament.groups))
    })),
    knockout: tournament.knockoutBlocks
  };
}

export function enrichMatchForHome(match: Match, teams: Team[]): Match {
  return enrichMatch(match, teams);
}
