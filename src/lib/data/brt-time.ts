export function toBrtTime(utcIsoString: string): string {
  const date = new Date(utcIsoString);
  return date.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
}
