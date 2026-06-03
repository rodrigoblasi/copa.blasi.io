# Feature Specification: Copa Folheto MVP

**Feature Branch**: `001-use-issues-abertas`

**Created**: 2026-06-03

**Status**: Draft

**Input**: User description: "use as issues abertas em https://github.com/rodrigoblasi/copa.blasi.io para criar a spec, todas as issues 1 até 7 contém informações uteis. faça o registro do uso delas na propria issue depois da criação da spec". Revision note: "leve em consideração o arquivo \"/starlog/01. Projects/copa-do-mundo-fifa-2026/input/tabelão.jpg\" como exemplo o site na sua home precisa ter uma visão geral (grupos e jogos + fase de grupos e jogos) que vai se preenchendo conforme os updates de dados chegam das fontes oficiais. paginas detalhadas são bem vindas mas o principal é ter a visão geral em pagina unica e bem organizada visualmente"

**GitHub Issue**: https://github.com/rodrigoblasi/copa.blasi.io/issues/1, https://github.com/rodrigoblasi/copa.blasi.io/issues/2, https://github.com/rodrigoblasi/copa.blasi.io/issues/3, https://github.com/rodrigoblasi/copa.blasi.io/issues/4, https://github.com/rodrigoblasi/copa.blasi.io/issues/5, https://github.com/rodrigoblasi/copa.blasi.io/issues/6, https://github.com/rodrigoblasi/copa.blasi.io/issues/7

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver a Copa inteira na home (Priority: P1)

Como visitante do site, quero abrir a home de `copa.blasi.io` e ver uma visão geral organizada da Copa do Mundo FIFA 2026 em página única, com grupos, jogos da fase de grupos, estrutura do mata-mata, fase atual, próximos jogos, jogos recentes e destaque do Brasil, sem precisar navegar primeiro por páginas detalhadas.

**Why this priority**: A home em formato de tabelão é o ponto de entrada principal e entrega o valor mínimo do produto como folheto digital vivo; páginas detalhadas são apoio, mas a consulta central deve acontecer na visão geral.

**Independent Test**: Pode ser testado abrindo a home em desktop e celular e confirmando que uma pessoa entende em até 45 segundos quais grupos existem, onde estão os jogos da fase de grupos, como a competição avança para o mata-mata, quais jogos vêm a seguir, quais resultados recentes importam e onde consultar Brasil ou detalhes de partidas.

**Acceptance Scenarios**:

1. **Given** que há grupos e jogos conhecidos, **When** o visitante abre a home, **Then** ele vê todos os grupos, jogos principais da fase de grupos, fase atual, próximos jogos, jogos recentes e estrutura do mata-mata em uma visão geral organizada.
2. **Given** que algum dado importante está pendente ou incerto, **When** o visitante consulta a home, **Then** o dado aparece como pendente, desconhecido ou problemático, sem informação inventada.
3. **Given** que a fase eliminatória ainda não tem todos os classificados, **When** o visitante consulta a home, **Then** os espaços da chave aparecem reservados e marcados como pendentes ou condicionais.
4. **Given** que o visitante acessa a home em celular, **When** ele navega pelo tabelão, **Then** a leitura permanece legível e a orientação espacial entre grupos, jogos e mata-mata continua compreensível.

---

### User Story 2 - Acompanhar preenchimento progressivo por dados oficiais (Priority: P1)

Como visitante, quero que a home vá se preenchendo conforme atualizações confiáveis chegam de fontes oficiais, para acompanhar jogos, placares, classificados e chaveamento sem ver informações inventadas.

**Why this priority**: O tabelão só é confiável se refletir a evolução real do torneio e sinalizar claramente o que ainda não foi confirmado.

**Independent Test**: Pode ser testado simulando estados de dados incompletos, atualizados, obsoletos e conflitantes, verificando se a home mostra cada estado no bloco correto de grupo, jogo ou chave.

**Acceptance Scenarios**:

1. **Given** que uma fonte oficial confirma placar ou classificação, **When** a atualização chega, **Then** a home passa a mostrar o novo dado no grupo, jogo ou chave correspondente.
2. **Given** que um dado ainda não foi confirmado, **When** a home renderiza o espaço correspondente, **Then** ela indica pendência, incerteza ou ausência em vez de preencher com suposição.
3. **Given** que uma atualização oficial muda horário, placar, status ou classificado, **When** a home é consultada depois da atualização, **Then** o dado anterior não aparece como atual sem sinal de frescor ou revisão.

---

### User Story 3 - Navegar pelo calendário completo (Priority: P2)

Como visitante, quero consultar o calendário completo por fase, dia e grupo, com horários em BRT, para planejar acompanhamento pré-jogo, durante o jogo e pós-jogo.

**Why this priority**: O calendário sustenta a home, Brasil, páginas de jogo e radar, mas é uma navegação complementar à visão geral em página única.

**Independent Test**: Pode ser testado filtrando ou percorrendo a lista de jogos por fase, dia e grupo, verificando se cada jogo tem horário em BRT, seleções, estádio quando disponível, status e caminho para sua página individual.

**Acceptance Scenarios**:

1. **Given** que o calendário da Copa está disponível, **When** o visitante acessa a página de calendário, **Then** ele consegue localizar jogos por fase, dia e grupo com horários em BRT.
2. **Given** que um jogo envolve o Brasil, **When** o visitante consulta o calendário, **Then** esse jogo recebe destaque visual sem prejudicar a leitura dos demais jogos.
3. **Given** que um jogo tem data, local ou status indefinido, **When** ele aparece no calendário, **Then** a incerteza é indicada de forma explícita e compreensível.

---

### User Story 4 - Acompanhar o caminho do Brasil (Priority: P2)

Como proprietário e visitante interessado no Brasil, quero uma página dedicada ao caminho do Brasil, com jogos da fase de grupos, resultados, contexto curto, notas pré e pós-jogo e possíveis adversários futuros, para acompanhar a seleção sem perder o contexto do torneio.

**Why this priority**: O destaque do Brasil é uma prioridade pessoal do produto e aparece em todas as issues de direção de conteúdo e visual, mas deve complementar a home sem obscurecer o torneio inteiro.

**Independent Test**: Pode ser testado acessando a página do Brasil e confirmando que todos os jogos conhecidos do Brasil aparecem com dados principais, contexto curto, status, placar quando aplicável e indicação de próximos caminhos ou incertezas.

**Acceptance Scenarios**:

1. **Given** que os jogos conhecidos do Brasil estão cadastrados, **When** o visitante acessa a página do Brasil, **Then** ele vê o caminho da seleção com fase, adversários, horários em BRT, estádio, status e placar quando disponível.
2. **Given** que o adversário futuro do Brasil ainda depende de cruzamentos, **When** o visitante consulta a página do Brasil, **Then** o possível cenário aparece como futuro, condicional ou pendente, sem afirmar o que ainda não está confirmado.
3. **Given** que há notas curtas pré ou pós-jogo, **When** o visitante lê a página do Brasil, **Then** as notas ajudam a entender o contexto sem transformar a página em análise longa.

---

### User Story 5 - Consultar uma partida específica (Priority: P2)

Como visitante, quero abrir uma página de jogo para ver fase, seleções, horário, estádio, cidade, status, placar, fatos úteis, notas curtas e links de retorno ao contexto maior.

**Why this priority**: Páginas de jogo tornam o site compartilhável e preservam consulta pré-jogo, ao vivo e pós-jogo.

**Independent Test**: Pode ser testado abrindo uma página de jogo futuro, uma página de jogo ao vivo ou em andamento simulado, e uma página de jogo encerrado, confirmando que cada estado apresenta informações adequadas ao momento.

**Acceptance Scenarios**:

1. **Given** que o jogo ainda não começou, **When** o visitante abre a página da partida, **Then** ele vê horário em BRT, fase, seleções, local, status futuro e contexto pré-jogo curto.
2. **Given** que o jogo está em andamento, **When** o visitante abre a página da partida, **Then** ele vê status atual, placar disponível e informações rápidas úteis sem excesso de conteúdo.
3. **Given** que o jogo terminou, **When** o visitante abre a página da partida, **Then** ele vê placar final, fatos relevantes, notas curtas e caminho de retorno para calendário, fase ou Brasil quando aplicável.

---

### User Story 6 - Ver radar resumido do momento (Priority: P3)

Como visitante, quero uma visão de radar com jogos que merecem atenção, resultados recentes, possíveis cruzamentos e mudanças relevantes, para entender o que observar sem entrar em análise pesada.

**Why this priority**: O radar aumenta o valor editorial do folheto, mas pode ser entregue depois das consultas essenciais de home, calendário, Brasil e jogos.

**Independent Test**: Pode ser testado acessando o radar e confirmando que ele apresenta no máximo uma seleção curta de alertas e mudanças relevantes, com links para páginas relacionadas.

**Acceptance Scenarios**:

1. **Given** que há jogos relevantes próximos ou resultados recentes, **When** o visitante acessa o radar, **Then** ele vê uma lista curta e priorizada do que merece atenção.
2. **Given** que há cruzamentos ainda indefinidos, **When** o visitante consulta o radar, **Then** os cenários aparecem como possíveis ou condicionais, não como fatos confirmados.
3. **Given** que não há mudança relevante, **When** o visitante acessa o radar, **Then** ele vê uma mensagem simples de estabilidade ou ausência de alertas.

---

### User Story 7 - Operar dados confiáveis e registros públicos limpos (Priority: P3)

Como mantenedor, quero que dados, atualizações, saúde interna, governança e higiene pública estejam definidos, para operar o site com confiança sem expor conteúdo sensível ou transformar observabilidade em produto público.

**Why this priority**: Confiabilidade, governança e higiene são essenciais para publicação, mas sustentam a experiência pública em vez de serem fluxos principais do visitante.

**Independent Test**: Pode ser testado revisando registros de governança, fontes, atualização, fallback, privacidade e visão interna, confirmando que o site nunca inventa dados e que informações internas não aparecem na interface pública.

**Acceptance Scenarios**:

1. **Given** que uma fonte de dados falha ou diverge, **When** o conteúdo público é consultado, **Then** o site mostra ausência, pendência ou problema de fonte de forma clara.
2. **Given** que uma mudança relevante é feita no projeto, **When** ela afeta conteúdo, dados, operação ou publicação, **Then** há registro público em issue, branch, commit, PR ou comentário apropriado.
3. **Given** que métricas internas de acesso ou saúde existem, **When** o visitante usa o site público, **Then** essas métricas não aparecem como recurso público nem poluem a navegação.

### Edge Cases

- Uma partida tem horário alterado depois de já publicada.
- Alguns grupos estão completos e outros ainda têm seleções, jogos ou horários pendentes.
- Uma partida tem estádio, cidade, grupo, adversário ou fase ainda indefinidos.
- A chave eliminatória ainda não tem classificados definidos, mas precisa manter espaços visuais para futuros confrontos.
- Um classificado ou cruzamento depende de critérios ainda não resolvidos.
- A fonte primária fica indisponível durante período de atualização.
- Fontes confiáveis mostram valores conflitantes para placar, horário ou status.
- Um jogo é futuro, ao vivo, encerrado, adiado, cancelado, desconhecido ou com problema de dados.
- A home recebe muitas atualizações em curto período e precisa manter o usuário orientado.
- A densidade visual fica alta demais em telas pequenas.
- O Brasil é eliminado ou tem caminho futuro sem adversário definido.
- Não há jogos recentes, próximos jogos ou alertas de radar no momento da consulta.
- O conteúdo editorial fica longo demais e ameaça a leitura rápida.
- O visitante compartilha uma URL direta de jogo, calendário, Brasil ou radar.
- Páginas detalhadas existem para alguns jogos, mas não para todos.
- Arquivos, textos, metadados ou registros de governança contêm informação que não ajuda o produto ou pode expor dados sensíveis.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST make the public home page the primary tournament overview, showing groups, group-stage matches, current phase, next matches, recent results, knockout-stage structure, and shortcuts to Brazil, calendar, match pages, and radar when available.
- **FR-002**: System MUST represent every known group on the home with teams, group-stage matches, match status, kickoff time in BRT when known, score when available, and source/freshness state.
- **FR-003**: System MUST reserve visible home spaces for knockout-stage matches, including round of 16, quarterfinals, semifinals, third-place match, final, and champion, even before all teams are known.
- **FR-004**: System MUST update the home overview as official or documented reliable data confirms teams, games, statuses, scores, classifications, and knockout pairings.
- **FR-005**: System MUST keep the home useful when only partial data is available by preserving layout structure and filling known facts without inventing missing facts.
- **FR-006**: System MUST visually communicate progression from group stage to knockout rounds so visitors understand how the tournament advances.
- **FR-007**: System MUST provide a complete calendar view organized by phase and understandable by date, group when applicable, and kickoff time in BRT as a secondary detailed consultation surface.
- **FR-008**: System MUST visually identify Brazil matches across home, calendar, match pages, and radar without making the whole tournament harder to read.
- **FR-009**: System MUST provide a dedicated Brazil page showing known Brazil matches, current path, match context, scores, short notes, and future or conditional opponent scenarios when applicable.
- **FR-010**: System MUST provide a shareable page for each match with phase, group when applicable, teams, date, BRT kickoff time, stadium, city, status, score, useful highlights, short notes, source state, and links back to related context.
- **FR-011**: System MUST distinguish at least these match states when applicable: future, live, finished, postponed, cancelled, unknown, and data-problem.
- **FR-012**: System MUST support short pre-match, live-context, and post-match notes for relevant matches while keeping them concise and clearly separated from factual match data.
- **FR-013**: System MUST provide a summarized radar view for important upcoming matches, recent results, possible crossings, and relevant changes, limited to concise editorial signals.
- **FR-014**: System MUST use a visual language inspired by the referenced Starlog `tabelão.jpg`: compact match blocks, visible group sections, bracket areas, strong hierarchy, intentional density, flags and colors used with restraint, and print-like World Cup character.
- **FR-015**: System MUST avoid a generic dashboard feel, excessive analytical widgets, social features, authentication flows, or interaction patterns that distract from the one-page overview.
- **FR-016**: System MUST remain readable and navigable on mobile and desktop, with clear public URLs suitable for sharing.
- **FR-017**: System MUST support public-site basics for discoverability and hygiene, including meaningful page titles, short descriptions, and explicit crawl guidance for the public subdomain.
- **FR-018**: System MUST identify the source and freshness state for dynamic calendar, score, status, venue, and note-driving data.
- **FR-019**: System MUST never invent missing, stale, conflicting, or uncertain data; it MUST present these states as pending, unknown, conditional, stale, conflicting, or source-problematic.
- **FR-020**: System MUST define fallback behavior for source failure, including preserving the last known reliable value only when it can be labeled with its freshness state.
- **FR-021**: System MUST support review of public content and repository artifacts to exclude secrets, credentials, private notes, unnecessary personal data, sensitive metadata, local artifacts, and content that does not help the product.
- **FR-022**: System MUST keep observability, access metrics, route health, and operational diagnostics separate from the public user interface unless a simple public status message helps users understand missing or problematic data.
- **FR-023**: System MUST maintain a GitHub governance trail for public content, data-source decisions, scheduled refresh behavior, deployment impact, and observability decisions through issues, branches, commits, PRs, or reviewable comments.
- **FR-024**: System MUST include validation coverage or documented validation steps for progressive filling of groups, match statuses, scores, classifications, bracket slots, uncertainty labels, match state changes, data transformations, fallback decisions, and public result displays.

### Copa Constitution Requirements *(mandatory)*

- **CCR-001**: Public user experience MUST support fast personal consultation and simple sharing without unnecessary account, social, or heavy analytics features.
- **CCR-002**: User-facing design MUST preserve the editorial folheto/tabelao direction and explain any deviation from that visual language.
- **CCR-003**: Any dynamic match data MUST specify source, refresh schedule, freshness signal, fallback behavior, and handling for unknown, stale, conflicting, or missing values.
- **CCR-004**: Public content and repository changes MUST exclude secrets, private notes, unnecessary personal data, sensitive metadata, and local artifacts.
- **CCR-005**: Governance and operation MUST be tracked through GitHub issues, branches, commits, PRs, or reviewable repository records.
- **CCR-006**: Work that affects `copa.blasi.io` MUST document public subdomain impact, including routes, metadata, SEO, robots.txt, deployment, or operational notes when applicable.
- **CCR-007**: Backend or scheduled work MUST define structured logs for source access, scheduler runs, parsing, fallback decisions, errors, and health.
- **CCR-008**: Critical data transformations, match state changes, fallbacks, and public result displays MUST have automated tests or documented validation.

### Key Entities *(include if feature involves data)*

- **Competition**: The FIFA World Cup 2026 context represented by name, current phase, public summary, and overall freshness state.
- **Home Overview**: The one-page public tournament overview containing group sections, group-stage matches, knockout bracket areas, update state, and navigation to optional details.
- **Phase**: A tournament stage such as group stage or knockout round, used to organize calendar, home summary, Brazil path, and radar.
- **Group Section**: A compact visual block for one group, including teams, group-stage matches, status, and filling progress.
- **Team**: A national team, with special presentation rules for Brazil and neutral presentation for other teams.
- **Match**: A scheduled or completed game, with phase, group when applicable, teams, date, BRT kickoff time, stadium, city, status, score, source, freshness, highlights, and notes.
- **Knockout Slot**: A reserved visual position in the bracket for a team, winner, loser, conditional qualifier, or pending value.
- **Knockout Match Block**: A concise representation of an elimination match, including round, teams or pending slots, date/time when known, status, score, and advancement consequence.
- **Champion Block**: The final resolved winner area, shown as pending until officially determined.
- **Venue**: Stadium and city information attached to matches when known.
- **Score**: The goals or result state for a match, including final, live/current, unavailable, or disputed values.
- **Editorial Note**: A short contextual note, highlight, fact, or post-match observation that helps reading without replacing sourced factual data.
- **Radar Item**: A concise signal about an upcoming match, recent result, possible crossing, or notable change that links back to match, phase, Brazil, or calendar context.
- **Data Source Record**: A record of source identity, last checked time, freshness state, and fallback state for dynamic information.
- **Operational Health Signal**: Internal-only indication of access, route health, refresh health, source failure, parsing problem, or public-site status.

### Data Provenance *(include if feature uses Copa data)*

- **Primary Source**: The authoritative tournament source for calendar, venues, match status, and results SHOULD be FIFA or another official competition source documented in GitHub before implementation planning.
- **Secondary Source**: A second reliable public source MAY be used to verify or recover results, schedule changes, venue updates, and match status when the primary source is unavailable or disputed.
- **Refresh Schedule**: The home overview and calendar SHOULD update whenever official data changes are detected; live or recently finished match status SHOULD have a more frequent refresh window during match periods; exact cadence must be finalized during planning and recorded in GitHub.
- **Fallback Rule**: If the primary source fails, the public site SHOULD preserve the last known reliable value only with a visible freshness or stale marker; if sources conflict, the public site MUST show a conflict or pending state until resolved; unconfirmed bracket slots MUST remain pending or conditional rather than inferred.
- **Uncertainty Display**: Unknown teams, unconfirmed qualifiers, missing scores, changed times, stale values, conflicts, postponed matches, cancelled matches, and source problems MUST appear directly in the relevant home, group, match, calendar, Brazil, or bracket area in language understandable to public visitors.

### GitHub Governance *(mandatory)*

- **Issue**: This spec is governed by https://github.com/rodrigoblasi/copa.blasi.io/issues/1 and uses pre-spec inputs from https://github.com/rodrigoblasi/copa.blasi.io/issues/2, https://github.com/rodrigoblasi/copa.blasi.io/issues/3, https://github.com/rodrigoblasi/copa.blasi.io/issues/4, https://github.com/rodrigoblasi/copa.blasi.io/issues/5, https://github.com/rodrigoblasi/copa.blasi.io/issues/6, and https://github.com/rodrigoblasi/copa.blasi.io/issues/7.
- **Branch**: `001-use-issues-abertas`
- **Records**: The spec file, quality checklist, follow-up issue comments, future commits, PRs, deployment notes, source decisions, and validation records must preserve decisions and operational history.
- **Privacy Review**: Before publishing or committing related work, review public pages, issue comments, metadata, source records, assets, logs, and generated artifacts for secrets, credentials, private notes, unnecessary personal data, sensitive metadata, local paths, and irrelevant personal context.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the tournament structure, all visible groups, group-stage match areas, knockout bracket area, current phase, next relevant matches, recent results, and overall update state from the home in 45 seconds or less.
- **SC-002**: 100% of known groups and known group-stage matches are represented on the home overview or explicitly marked as pending if not yet available.
- **SC-003**: 100% of knockout rounds have reserved visual space on the home before qualifiers are known, with pending or conditional labels until official confirmation arrives.
- **SC-004**: 100% of listed matches show phase, teams, date, BRT kickoff time or an explicit unknown state, status, and source/freshness state.
- **SC-005**: 100% of Brazil matches and conditional future Brazil paths are discoverable from the home and Brazil page, and visually distinguishable in calendar and home contexts.
- **SC-006**: 100% of public match pages are reachable through clear shareable URLs and include a path back to calendar, phase, Brazil when applicable, or home.
- **SC-007**: At least 90% of reviewed users can complete the primary consultation tasks on mobile without instructions: find Brazil, find a specific group, find a group-stage match, find the final bracket area, open a match page, and understand a result or pending state.
- **SC-008**: No public page or repository artifact introduced by this feature contains secrets, credentials, private notes, unnecessary personal data, sensitive metadata, or local artifacts during review.
- **SC-009**: 100% of missing, stale, conflicting, unconfirmed, or failed-source data cases in validation are represented publicly as unknown, pending, conditional, stale, conflicting, or source-problematic instead of fabricated values.
- **SC-010**: Internal operation can answer whether the public site is reachable, which public routes are receiving access, whether data refresh is healthy, and whether source failures occurred within the last scheduled refresh period, without exposing those details as public product features.
- **SC-011**: The MVP preserves a distinct digital World Cup tabelao or folheto overview in stakeholder review, with no reviewed primary page classified as a generic dashboard, list page, or analytics interface.
- **SC-012**: The public site supports direct sharing and basic discoverability for home, calendar, Brazil, radar, and individual match pages under `copa.blasi.io`.

## Assumptions

- The primary audience is the owner and people receiving shared public links, not a community of authenticated users.
- The MVP includes home, calendar, Brazil page, match pages, and a concise radar if it can remain lightweight, but the home tabelao overview is the central public experience.
- Portugal may appear as secondary context only if it does not compete with the Brazil-first emphasis or pollute the first cut.
- Heavy statistics, social features, accounts, community mechanics, long-form analysis, and complex dashboards are out of scope for this spec.
- The visual starting point is `/starlog/01. Projects/copa-do-mundo-fifa-2026/input/tabelão.jpg`, interpreted as direction for composition, density, hierarchy, group blocks, bracket areas, and tournament-at-a-glance behavior, not as a requirement to copy the image exactly or publish the local file.
- Detailed pages for matches, groups, Brazil, calendar, or phases are useful secondary surfaces, but the home must remain sufficient for the main tournament overview.
- The first implementation may launch with partially filled data as long as unknown and pending areas are explicit and the visual structure is already present.
- Source selection and exact refresh cadence require planning work, but this spec requires official-or-reliable provenance, freshness labels, fallback behavior, and no invented facts.
- Observability is internal and operational; public users only see simple status or uncertainty messages when those messages improve trust in the data shown.
