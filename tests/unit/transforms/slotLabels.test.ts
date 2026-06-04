import { describe, expect, it } from 'vitest';
import { translateSlotLabel } from '@/lib/data/slotLabels';

describe('translateSlotLabel', () => {
  it('translates English source labels to Portuguese public labels', () => {
    expect(translateSlotLabel('Winner Group A')).toBe('1º Grupo A');
    expect(translateSlotLabel('Runner-up Group B')).toBe('2º Grupo B');
    expect(translateSlotLabel('3rd Group C/D/E/F')).toBe('3º Grp C/D/E/F');
    expect(translateSlotLabel('Winner Match 74')).toBe('Venc. Jogo 74');
    expect(translateSlotLabel('Loser Match 101')).toBe('Perd. Jogo 101');
  });

  it('passes already-Portuguese labels through unchanged', () => {
    expect(translateSlotLabel('1º Grupo A')).toBe('1º Grupo A');
    expect(translateSlotLabel('2º Grupo C')).toBe('2º Grupo C');
    expect(translateSlotLabel('3º Grp C/D/F/G/H')).toBe('3º Grp C/D/F/G/H');
    expect(translateSlotLabel('Venc. Jogo 89')).toBe('Venc. Jogo 89');
  });

  it('uses the uncertainty fallback for unknown patterns', () => {
    expect(translateSlotLabel('slot_w_g')).toBe('A definir');
    expect(translateSlotLabel(null)).toBe('A definir');
  });
});
