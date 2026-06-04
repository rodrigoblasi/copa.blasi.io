const PORTUGUESE_SLOT_PATTERNS = [
  /^\dº (Grupo|Grp) [A-L](?:\/[A-L])*$/,
  /^(Venc\.|Vencedor do|Perd\.|Perdedor do) (Jogo|jogo|M) ?\d+$/,
  /^A definir$/,
];

export function translateSlotLabel(label: string | null | undefined): string {
  const value = label?.trim();
  if (!value) return 'A definir';

  if (PORTUGUESE_SLOT_PATTERNS.some(pattern => pattern.test(value))) {
    return value;
  }

  const winnerGroup = value.match(/^Winner Group ([A-L])$/i);
  if (winnerGroup) return `1º Grupo ${winnerGroup[1].toUpperCase()}`;

  const runnerUpGroup = value.match(/^Runner-up Group ([A-L])$/i);
  if (runnerUpGroup) return `2º Grupo ${runnerUpGroup[1].toUpperCase()}`;

  const thirdGroup = value.match(/^3rd Group ([A-L](?:\/[A-L])*)$/i);
  if (thirdGroup) return `3º Grp ${thirdGroup[1].toUpperCase()}`;

  const winnerMatch = value.match(/^Winner Match (\d+)$/i);
  if (winnerMatch) return `Venc. Jogo ${winnerMatch[1]}`;

  const loserMatch = value.match(/^Loser Match (\d+)$/i);
  if (loserMatch) return `Perd. Jogo ${loserMatch[1]}`;

  return 'A definir';
}
