import type { Match } from './types';

export function resolveMatchConflict(sourceA: Partial<Match>, sourceB: Partial<Match>): Partial<Match> {
  // If there's a disagreement on score and both claim it's final, mark as conflicting
  if (sourceA.score?.state === 'final' && sourceB.score?.state === 'final') {
    if (sourceA.score.homeGoals !== sourceB.score.homeGoals || sourceA.score.awayGoals !== sourceB.score.awayGoals) {
      return {
        ...sourceA,
        status: 'data-problem',
        freshnessState: 'conflicting',
        score: { homeGoals: null, awayGoals: null, state: 'source-problem' }
      };
    }
  }
  return sourceA; // Default trust primary source A
}
