import type { Match } from './types';
import { getRoundLabel, getRoundOrder } from './roundLabels';

export interface KnockoutPhaseGroup {
  round: string;
  label: string;
  matches: Match[];
}

export function groupKnockoutMatchesByRound(matches: Match[]): KnockoutPhaseGroup[] {
  const groups = new Map<string, Match[]>();

  for (const match of matches) {
    if (match.phaseId !== 'knockout') continue;
    const label = getRoundLabel(match.round);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(match);
  }

  return Array.from(groups.entries())
    .map(([label, roundMatches]) => ({
      round: label,
      label,
      matches: roundMatches.sort(compareMatchesByKickoff),
    }))
    .sort((a, b) => getRoundOrder(a.label) - getRoundOrder(b.label));
}

function compareMatchesByKickoff(a: Match, b: Match): number {
  return `${a.date || ''} ${a.kickoffBrt || ''}`.localeCompare(`${b.date || ''} ${b.kickoffBrt || ''}`);
}
