export const ROUND_LABELS: Record<string, string> = {
  r32: '32 avos de final',
  'Round of 32': '32 avos de final',
  r16: 'Oitavas de final',
  'Round of 16': 'Oitavas de final',
  qf: 'Quartas de final',
  'Quartas de Final': 'Quartas de final',
  sf: 'Semifinal',
  Semifinal: 'Semifinal',
  third: 'Disputa de 3º lugar',
  'Disputa de 3º lugar': 'Disputa de 3º lugar',
  final: 'Final',
  Final: 'Final',
};

export function getRoundLabel(round: string | null | undefined): string {
  if (!round) return 'Fase Eliminatória';
  return ROUND_LABELS[round] || round;
}

export function getRoundOrder(round: string | null | undefined): number {
  const label = getRoundLabel(round);
  return ['32 avos de final', 'Oitavas de final', 'Quartas de final', 'Semifinal', 'Disputa de 3º lugar', 'Final'].indexOf(label);
}
