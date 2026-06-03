export interface SourceRegistryEntry {
  id: string;
  name: string;
  url: string;
  priority: number;
}

export const SOURCE_REGISTRY: SourceRegistryEntry[] = [
  { id: 'fifa-official', name: 'FIFA Official Data', url: 'https://api.fifa.com/api/v3', priority: 1 },
  { id: 'secondary-fallback', name: 'Reliable Public Fallback', url: 'https://api.example.com/fallback', priority: 2 }
];
