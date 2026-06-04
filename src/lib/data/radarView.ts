export interface RadarItemVM {
  id: string;
  title: string;
  summary: string;
  priority: 'high' | 'medium' | 'low';
  relatedLinks: { url: string; label: string }[];
}

// Radar items are static/editorial additions or derived signals.
// We'll mock a structural builder assuming it pulls from an external "notes" or curated list 
export function buildRadarView(): RadarItemVM[] {
  // Hardcoded fallback data until an editorial payload is loaded from JSON.
  return [
    {
      id: 'r1',
      title: 'Atenção aos cruzamentos nas Oitavas',
      summary: 'Caso o Brasil passe em 1º, pode enfrentar o 2º do Grupo H.',
      priority: 'high',
      relatedLinks: [{ url: '/brasil', label: 'Caminho do Brasil' }]
    }
  ];
}
