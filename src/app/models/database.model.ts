export type DatabaseType = 'items' | 'recipes' | 'monsters' | 'maps';

export interface SearchResult {
  id: number;
  name: string;
  info: string;
}

export interface ItemStat {
  label: string;
  value: number;
}

export interface RecipeInfo {
  product: { id: number; name: string; amount: number; stats: ItemStat[] } | null;
  materials: { id: number; name: string; amount: number }[];
}

export interface ItemInfo {
  id: number;
  name: string;
  type: string;
  group: string;
  minLevel: number;
  stats: ItemStat[];
  recipe: RecipeInfo | null;
  droppedBy: { id: number; name: string; level: number; chance: number }[];
}

export interface MonsterDrop {
  itemId: number;
  itemName: string;
  chance: number;
  minAmount: number;
  maxAmount: number;
}

export interface MonsterInfo {
  id: number;
  foundIn: { id: number; name: string; level: number }[];
  name: string;
  level: number;
  rank: string;
  race: string;
  element: string;
  hp: number;
  exp: number;
  jobExp: number;
  silver: { chance: number; minAmount: number; maxAmount: number } | null;
  drops: MonsterDrop[];
}

export interface MapInfo {
  id: number;
  name: string;
  className: string;
  level: number;
  type: string;
  monsters: { id: number; name: string; level: number; rank: string }[];
}