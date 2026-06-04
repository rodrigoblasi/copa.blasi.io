import type { Tournament, GroupSection, KnockoutBlock, Team, Match } from './types';
import { classifyMatchEmphasis } from './emphasis';
import { translateSlotLabel } from './slotLabels';

export interface HomeOverviewVM {
  header: { tournamentName: string };
  brazilHighlight: { nextMatch: Match | null; status: string };
  groups: Array<GroupSection & { matchesDetails: Match[] }>;
  knockout: KnockoutBlock[];
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

function buildStadiumMapUrl(match: Match): string | null {
  if (!match.venue) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${match.venue} ${match.city || ''}`.trim())}`;
}

export function buildHomeOverview(tournament: Tournament): HomeOverviewVM {
  const brazilTeam = tournament.teams.find(t => t.isBrazil);
  const brazilMatch = brazilTeam 
    ? tournament.matches.find(m => (m.homeTeamId === brazilTeam.id || m.awayTeamId === brazilTeam.id) && m.status !== 'finished') 
    : null;

  return {
    header: { tournamentName: tournament.name },
    brazilHighlight: {
      nextMatch: brazilMatch ? enrichMatch(brazilMatch, tournament.teams) : null,
      status: brazilMatch ? 'Próximo jogo do Brasil' : 'Aguardando definição'
    },
    groups: tournament.groups.map(g => ({
      ...g,
      matchesDetails: g.matchIds
        .map(mid => tournament.matches.find(m => m.id === mid)!)
        .filter(Boolean)
        .map(m => enrichMatch(m, tournament.teams))
    })),
    knockout: tournament.knockoutBlocks
  };
}

export function enrichMatchForHome(match: Match, teams: Team[]): Match {
  return enrichMatch(match, teams);
}
