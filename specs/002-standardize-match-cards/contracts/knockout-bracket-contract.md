# UI Contract: Fase Eliminatória Bracket

## Scope

This contract applies to the public Fase Eliminatória bracket and any supporting knockout match cards affected by issue #21.

## Terminology

- Public phase name: `Fase Eliminatória`.
- Public rounds: `32 avos de final`, `Oitavas de final`, `Quartas de final`, `Semifinal`, `Disputa de 3º lugar`, `Final`.
- Informal visible terminology such as `Mata-Mata` must not appear in affected public UI or metadata.

## Structure

- Wide layout uses two sides converging to a center.
- Left side progresses from 32 avos through Semifinal.
- Right side mirrors the other path from Semifinal back through 32 avos.
- Center contains Final and Disputa de 3º lugar.
- Mobile layout may scroll horizontally or collapse by round, but must preserve round order and match context.

## Match Coverage

- M73-M88: 32 avos de final.
- M89-M96: Oitavas de final.
- M97-M100: Quartas de final.
- M101-M102: Semifinais.
- M103: Disputa de 3º lugar.
- M104: Final.

## Unresolved Slot Labels

- Group winner labels display as `1º Grupo X`.
- Group runner-up labels display as `2º Grupo X`.
- Third-place group path labels display as `3º Grp X/Y/Z`.
- Prior-match winner labels display as `Venc. Jogo N`.
- Prior-match loser labels display as `Perd. Jogo N`.

## Acceptance Review

- Every knockout match with known date, time, and city must show those values.
- Unknown teams must show conditional labels, not `?` where a meaningful source label exists.
- The bracket must remain understandable without requiring users to know FIFA source IDs or internal data IDs.
