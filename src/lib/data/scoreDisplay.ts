import type { Match, Score } from './types';

export function getScoreDisplay(match: Match): string {
  const score = match.score;

  if (!score || score.state === 'unavailable') return '- x -';
  if (score.state === 'source-problem' || score.state === 'disputed') return 'Placar em revisão';
  if (hasGoals(score)) return `${score.homeGoals} x ${score.awayGoals}`;

  return '- x -';
}

function hasGoals(score: Score): score is Score & { homeGoals: number; awayGoals: number } {
  return typeof score.homeGoals === 'number' && typeof score.awayGoals === 'number';
}
