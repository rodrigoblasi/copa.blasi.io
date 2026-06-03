import type { Tournament, Match, Team, KnockoutBlock, KnockoutSlot } from './types';

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

export interface BrazilPathVM {
  groupMatches: Match[];
  knockoutPath: Array<{
    block: KnockoutBlock;
    opponentInfo: { type: 'confirmed' | 'conditional' | 'unknown'; label: string };
    matchDetails: Match | null;
  }>;
}

export function buildBrazilPath(tournament: Tournament): BrazilPathVM {
  const brazil = tournament.teams.find(t => t.isBrazil);
  if (!brazil) return { groupMatches: [], knockoutPath: [] };

  const groupMatches = tournament.matches
    .filter(m => (m.homeTeamId === brazil.id || m.awayTeamId === brazil.id) && m.phaseId !== 'knockout')
    .map(m => enrichMatch(m, tournament.teams));

  // Simplified traversal for MVP finding blocks linked to Brazil directly or indirectly
  const knockoutPath: BrazilPathVM['knockoutPath'] = [];
  
  // Look for any knockout slots brazil is in or could be in
  for (const block of tournament.knockoutBlocks) {
    const isBrazilInBlock = block.slotIds.some(sid => {
      const slot = tournament.knockoutSlots.find(s => s.id === sid);
      return slot?.teamId === brazil.id;
    });

    if (isBrazilInBlock) {
      const opponentSlotId = block.slotIds.find(sid => {
        const slot = tournament.knockoutSlots.find(s => s.id === sid);
        return slot?.teamId !== brazil.id;
      });
      
      const oppSlot = tournament.knockoutSlots.find(s => s.id === opponentSlotId);
      let oppType: 'confirmed' | 'conditional' | 'unknown' = 'unknown';
      let oppLabel = 'A definir';

      if (oppSlot) {
        if (oppSlot.status === 'confirmed' && oppSlot.teamId) {
          oppType = 'confirmed';
          oppLabel = tournament.teams.find(t => t.id === oppSlot.teamId)?.name || 'A definir';
        } else if (oppSlot.status === 'conditional') {
          oppType = 'conditional';
          oppLabel = `Vencedor do ${oppSlot.id}`; // Simple conditional string for MVP
        }
      }

      knockoutPath.push({
        block,
        opponentInfo: { type: oppType, label: oppLabel },
        matchDetails: tournament.matches.find(m => m.id === block.matchId) || null
      });
    }
  }

  return { groupMatches, knockoutPath };
}
