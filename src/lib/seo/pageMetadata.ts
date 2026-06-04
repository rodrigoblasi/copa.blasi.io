export function getPageMetadata(path: string, site: string) {
  const url = new URL(path, site).toString();
  return {
    canonicalUrl: url,
    defaultTitle: 'Copa Folheto',
    defaultDescription: 'Acompanhe a Copa do Mundo 2026'
  };
}

export function getHomeMetadata(site: string) {
  return {
    title: 'Copa Folheto — Guia da Copa do Mundo 2026',
    description: 'Acompanhe todos os jogos, chaves e o caminho do Brasil na Copa do Mundo 2026.',
    canonicalUrl: new URL('/', site).toString()
  };
}

export function getCalendarMetadata(site: string) {
  return {
    title: 'Calendário Completo — Copa Folheto',
    description: 'Todos os jogos da Copa do Mundo 2026 organizados por data e fase.',
    canonicalUrl: new URL('/calendario', site).toString()
  };
}

export function getBrazilMetadata(site: string) {
  return {
    title: 'Caminho do Brasil — Copa Folheto',
    description: 'Acompanhe os jogos da Seleção Brasileira na Copa do Mundo 2026.',
    canonicalUrl: new URL('/brasil', site).toString()
  };
}

export function getRadarMetadata(site: string) {
  return {
    title: 'Radar da Copa — Copa Folheto',
    description: 'Avisos e sinais editoriais curtos sobre o momento do torneio.',
    canonicalUrl: new URL('/radar', site).toString()
  };
}

export function getMatchMetadata(slug: string, site: string, homeTeamName?: string, awayTeamName?: string) {
  const matchDesc = homeTeamName && awayTeamName ? `${homeTeamName} x ${awayTeamName}` : 'Partida da Copa';
  return {
    title: `${matchDesc} — Copa Folheto`,
    description: `Acompanhe informações, horários e detalhes de ${matchDesc} pela Copa do Mundo 2026.`,
    canonicalUrl: new URL(`/jogos/${slug}`, site).toString()
  };
}
