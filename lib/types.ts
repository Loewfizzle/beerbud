export interface Beer {
  id: number;
  name: string;
  style: string;
  abv: number;
  ibu?: number;
  tastingNotes: string;
  descriptors: string[]; // flavor profile keywords for grounding LLM
  origin?: string;
}

export interface MealAnalysis {
  dish: string;
  keyIngredients: string[];
  flavorProfile: string[];
  cuisine: string;
  intensity: "light" | "medium" | "bold";
  notes: string;
}

export interface BeerPairing {
  beer: Beer;
  matchScore: number; // 0-100
  whyItPairs: string; // 2-4 thoughtful sentences
  tastingNoteHighlight?: string;
}

export interface PairingResult {
  analysis: MealAnalysis;
  pairings: BeerPairing[];
  generatedAt: string;
}
