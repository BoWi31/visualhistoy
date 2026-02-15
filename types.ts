
export interface PageEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  imageUrl: string;
  thumbUrl?: string;
  year: number;
  tags: string[];
  focusTag: string;
  difficulty: 1 | 2 | 3;
  shortText: string;
  comparisonTarget?: string; // ID des Bildes für den Vergleich
}

export interface ConfigData {
  title: string;
  subtitle: string;
  pages: PageEntry[];
}
