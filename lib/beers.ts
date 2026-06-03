import { Beer } from "./types";

// Curated high-quality database of 55 popular, widely available beers.
// Grounded data for LLM pairing: real styles, ABV, IBU ranges, accurate tasting notes + descriptors.
export const beers: Beer[] = [
  // IPAs & Pale Ales
  { id: 1, name: "Sierra Nevada Pale Ale", style: "American Pale Ale", abv: 5.6, ibu: 38, tastingNotes: "Piney hops, citrus zest, balanced malt backbone with a crisp finish.", descriptors: ["hoppy", "citrusy", "pine", "crisp", "balanced"], origin: "USA" },
  { id: 2, name: "Stone IPA", style: "American IPA", abv: 6.9, ibu: 77, tastingNotes: "Explosive grapefruit, resinous pine, big bitter finish.", descriptors: ["hoppy", "grapefruit", "pine", "bitter", "aggressive"], origin: "USA" },
  { id: 3, name: "Lagunitas IPA", style: "American IPA", abv: 6.2, ibu: 51, tastingNotes: "Floral hops, orange marmalade, light caramel malt.", descriptors: ["hoppy", "floral", "citrus", "malt", "balanced"], origin: "USA" },
  { id: 4, name: "Russian River Pliny the Elder", style: "Double IPA", abv: 8.0, ibu: 100, tastingNotes: "Massive hop aroma: pine, grapefruit, resin. Dry, bitter, refined.", descriptors: ["hoppy", "pine", "grapefruit", "bitter", "dry"], origin: "USA" },
  { id: 5, name: "Bell's Two Hearted Ale", style: "American IPA", abv: 7.0, ibu: 55, tastingNotes: "Huge Centennial hop aroma, balanced malt, clean bitter finish.", descriptors: ["hoppy", "citrus", "balanced", "floral", "clean"], origin: "USA" },
  { id: 6, name: "Founders Centennial IPA", style: "American IPA", abv: 7.2, ibu: 65, tastingNotes: "Citrus punch, pine resin, sturdy malt base.", descriptors: ["hoppy", "citrus", "pine", "malt", "bold"], origin: "USA" },
  
  // Stouts & Porters
  { id: 7, name: "Guinness Draught", style: "Irish Stout", abv: 4.2, ibu: 45, tastingNotes: "Roasted barley, coffee, subtle sweetness, famously creamy head.", descriptors: ["roasty", "coffee", "creamy", "dry", "light-bodied"], origin: "Ireland" },
  { id: 8, name: "Founders Breakfast Stout", style: "American Stout", abv: 8.3, ibu: 60, tastingNotes: "Coffee, chocolate, oats. Rich, roasty, velvety.", descriptors: ["roasty", "coffee", "chocolate", "creamy", "bold"], origin: "USA" },
  { id: 9, name: "Left Hand Milk Stout Nitro", style: "Sweet Stout", abv: 6.0, ibu: 25, tastingNotes: "Lactose sweetness, chocolate, coffee, silky nitro texture.", descriptors: ["sweet", "chocolate", "creamy", "roasty", "smooth"], origin: "USA" },
  { id: 10, name: "Deschutes Obsidian Stout", style: "American Stout", abv: 6.4, ibu: 55, tastingNotes: "Deep roasted malt, espresso, dark chocolate, clean bitter.", descriptors: ["roasty", "espresso", "chocolate", "bitter", "full"], origin: "USA" },
  { id: 11, name: "Porterhouse Oyster Stout", style: "Stout", abv: 5.2, ibu: 35, tastingNotes: "Roasted malt, subtle brine, dry finish.", descriptors: ["roasty", "briny", "dry", "malt", "savory"], origin: "Ireland" },
  { id: 12, name: "Samuel Smith Oatmeal Stout", style: "Oatmeal Stout", abv: 5.0, ibu: 30, tastingNotes: "Oat silkiness, roasted barley, toffee, chocolate.", descriptors: ["creamy", "roasty", "toffee", "chocolate", "smooth"], origin: "UK" },

  // Lagers & Pilsners
  { id: 13, name: "Pilsner Urquell", style: "Czech Pilsner", abv: 4.4, ibu: 40, tastingNotes: "Crisp, floral Saaz hops, light malt sweetness, snappy finish.", descriptors: ["crisp", "floral", "light", "hoppy", "clean"], origin: "Czech Republic" },
  { id: 14, name: "Trumer Pils", style: "German Pilsner", abv: 4.9, ibu: 38, tastingNotes: "Noble hop spice, cracker malt, bone-dry finish.", descriptors: ["crisp", "spicy", "dry", "light", "noble-hop"], origin: "Austria/USA" },
  { id: 15, name: "Heineken", style: "Euro Pale Lager", abv: 5.0, ibu: 23, tastingNotes: "Clean, lightly hoppy, subtle malt, very refreshing.", descriptors: ["crisp", "light", "malt", "refreshing", "clean"], origin: "Netherlands" },
  { id: 16, name: "Sapporo Premium", style: "Japanese Lager", abv: 4.9, ibu: 18, tastingNotes: "Light, crisp rice and malt, delicate hop character.", descriptors: ["crisp", "light", "delicate", "rice", "clean"], origin: "Japan" },
  { id: 17, name: "Czechvar (Budvar)", style: "Czech Lager", abv: 5.0, ibu: 35, tastingNotes: "Balanced malt and noble hops, full yet crisp.", descriptors: ["balanced", "crisp", "malt", "noble-hop", "full"], origin: "Czech Republic" },

  // Wheat & Wit
  { id: 18, name: "Weihenstephaner Hefeweissbier", style: "German Hefeweizen", abv: 5.4, ibu: 14, tastingNotes: "Banana, clove, bubblegum, soft wheat body, cloudy.", descriptors: ["fruity", "spicy", "banana", "clove", "wheat", "creamy"], origin: "Germany" },
  { id: 19, name: "Hoegaarden", style: "Belgian Witbier", abv: 4.9, ibu: 15, tastingNotes: "Coriander, orange peel, light spice, hazy, refreshing.", descriptors: ["citrusy", "spicy", "light", "wheat", "refreshing"], origin: "Belgium" },
  { id: 20, name: "Allagash White", style: "Belgian-Style Wit", abv: 5.2, ibu: 13, tastingNotes: "Orange zest, coriander, light pepper, silky mouthfeel.", descriptors: ["citrusy", "spicy", "light", "silky", "fruity"], origin: "USA" },
  { id: 21, name: "Blue Moon Belgian White", style: "Belgian-Style Wit", abv: 5.4, ibu: 9, tastingNotes: "Coriander, Valencia orange, hazy, approachable.", descriptors: ["citrusy", "spicy", "light", "approachable", "orange"], origin: "USA" },

  // Belgian & Abbey
  { id: 22, name: "Chimay Blue (Grande Réserve)", style: "Belgian Strong Dark Ale", abv: 9.0, ibu: 35, tastingNotes: "Dark fruit, spice, rich malt, warming alcohol.", descriptors: ["fruity", "spicy", "rich", "dark-fruit", "warming"], origin: "Belgium" },
  { id: 23, name: "Duvel Belgian Golden Ale", style: "Belgian Strong Golden Ale", abv: 8.5, ibu: 32, tastingNotes: "Spicy pepper, pear, light citrus, dry effervescent finish.", descriptors: ["spicy", "fruity", "dry", "effervescent", "pear"], origin: "Belgium" },
  { id: 24, name: "Orval Trappist Ale", style: "Trappist Pale Ale", abv: 6.2, ibu: 32, tastingNotes: "Funky brett, orange, dry, complex, earthy.", descriptors: ["funky", "citrus", "dry", "earthy", "complex"], origin: "Belgium" },
  { id: 25, name: "Westmalle Tripel", style: "Belgian Tripel", abv: 9.5, ibu: 35, tastingNotes: "Spicy, fruity esters, honeyed malt, dry finish.", descriptors: ["spicy", "fruity", "honey", "dry", "complex"], origin: "Belgium" },

  // Sours & Wild
  { id: 26, name: "The Bruery Sour in the Rye", style: "American Wild Ale", abv: 7.8, ibu: 10, tastingNotes: "Tart cherry, oak, spicy rye, complex acidity.", descriptors: ["tart", "fruity", "oak", "spicy", "sour"], origin: "USA" },
  { id: 27, name: "New Belgium La Folie", style: "Flanders Red Ale", abv: 7.0, ibu: 18, tastingNotes: "Cherry, oak, balsamic vinegar, rich sour.", descriptors: ["sour", "fruity", "oak", "vinegar", "tart"], origin: "USA" },
  { id: 28, name: "Russian River Supplication", style: "American Sour Ale", abv: 7.0, ibu: 10, tastingNotes: "Sour cherry, oak, brett funk, elegant.", descriptors: ["sour", "cherry", "oak", "funky", "elegant"], origin: "USA" },

  // Brown Ales & Mild
  { id: 29, name: "Brooklyn Brown Ale", style: "American Brown Ale", abv: 5.6, ibu: 32, tastingNotes: "Toasted nuts, caramel, chocolate, balanced hops.", descriptors: ["nutty", "caramel", "chocolate", "toasty", "balanced"], origin: "USA" },
  { id: 30, name: "Newcastle Brown Ale", style: "English Brown Ale", abv: 4.7, ibu: 18, tastingNotes: "Toffee, nuts, light roast, very sessionable.", descriptors: ["toffee", "nutty", "light-roast", "malt", "smooth"], origin: "UK" },

  // Amber & Red
  { id: 31, name: "Fuller's ESB", style: "Extra Special Bitter", abv: 5.9, ibu: 32, tastingNotes: "Rich malt, floral hops, biscuit, balanced bitterness.", descriptors: ["malty", "floral", "biscuit", "bitter", "balanced"], origin: "UK" },
  { id: 32, name: "Bell's Amber Ale", style: "American Amber Ale", abv: 5.8, ibu: 30, tastingNotes: "Caramel malt, floral hops, toasty, clean.", descriptors: ["caramel", "floral", "toasty", "balanced", "malt"], origin: "USA" },
  { id: 33, name: "North Coast Red Seal Ale", style: "American Amber Ale", abv: 5.6, ibu: 42, tastingNotes: "Toasty malt, citrus hops, dry finish.", descriptors: ["toasty", "citrus", "dry", "hoppy", "malt"], origin: "USA" },

  // Bocks & Doppelbocks
  { id: 34, name: "Weihenstephaner Vitus", style: "Weizenbock", abv: 7.7, ibu: 16, tastingNotes: "Banana bread, clove, rich wheat, warming.", descriptors: ["fruity", "spicy", "rich", "wheat", "warming"], origin: "Germany" },
  { id: 35, name: "Paulaner Salvator", style: "Doppelbock", abv: 7.9, ibu: 16, tastingNotes: "Toffee, dark fruit, bread crust, clean malt.", descriptors: ["malty", "toffee", "fruity", "rich", "clean"], origin: "Germany" },

  // Other greats
  { id: 36, name: "Dogfish Head 60 Minute IPA", style: "American IPA", abv: 6.0, ibu: 60, tastingNotes: "Continuous hopping: pine, citrus, resinous balance.", descriptors: ["hoppy", "pine", "citrus", "resinous", "balanced"], origin: "USA" },
  { id: 37, name: "Firestone Walker Double Jack", style: "Imperial IPA", abv: 9.5, ibu: 85, tastingNotes: "Huge tropical fruit, pine, caramel malt backbone.", descriptors: ["hoppy", "tropical", "pine", "caramel", "bold"], origin: "USA" },
  { id: 38, name: "Rogue Dead Guy Ale", style: "Maibock", abv: 6.5, ibu: 40, tastingNotes: "Rich malt, noble hops, clean, slightly sweet.", descriptors: ["malty", "noble-hop", "clean", "rich", "slightly-sweet"], origin: "USA" },
  { id: 39, name: "Ayinger Celebrator", style: "Doppelbock", abv: 6.7, ibu: 24, tastingNotes: "Dark fruit, toffee, chocolate, elegant malt.", descriptors: ["fruity", "toffee", "chocolate", "elegant", "malt"], origin: "Germany" },
  { id: 40, name: "Saison Dupont", style: "Saison", abv: 6.5, ibu: 32, tastingNotes: "Peppery spice, lemon zest, dry, farmhouse funk.", descriptors: ["spicy", "citrus", "dry", "funky", "farmhouse"], origin: "Belgium" },
  { id: 41, name: "Boulevard Tank 7 Farmhouse Ale", style: "Saison", abv: 8.5, ibu: 38, tastingNotes: "Citrus, pepper, bright acidity, dry finish.", descriptors: ["citrus", "spicy", "dry", "bright", "acidity"], origin: "USA" },
  { id: 42, name: "Goose Island Bourbon County Stout", style: "Imperial Stout", abv: 14.7, ibu: 60, tastingNotes: "Bourbon, vanilla, chocolate, oak, massive.", descriptors: ["roasty", "bourbon", "vanilla", "chocolate", "oak"], origin: "USA" },
  { id: 43, name: "Pliny the Younger (if available, or similar)", style: "Triple IPA", abv: 10.25, ibu: 90, tastingNotes: "Resinous hop bomb, tropical, pine, dry.", descriptors: ["hoppy", "resinous", "tropical", "pine", "dry"], origin: "USA" },
  { id: 44, name: "Mikkeller Beer Geek Breakfast", style: "Oatmeal Stout", abv: 7.5, ibu: 55, tastingNotes: "Oats, coffee, dark chocolate, rich.", descriptors: ["oat", "coffee", "chocolate", "rich", "creamy"], origin: "Denmark" },
  { id: 45, name: "Jai Alai IPA", style: "American IPA", abv: 7.5, ibu: 70, tastingNotes: "Mango, pineapple, grapefruit, big citrus.", descriptors: ["hoppy", "tropical", "citrus", "mango", "bold"], origin: "USA" },
  { id: 46, name: "Kona Big Wave Golden Ale", style: "Golden Ale", abv: 4.4, ibu: 21, tastingNotes: "Light malt, subtle tropical hops, very sessionable.", descriptors: ["light", "tropical", "malt", "crisp", "refreshing"], origin: "USA" },
  { id: 47, name: "Anchor Steam Beer", style: "California Common", abv: 4.9, ibu: 35, tastingNotes: "Toasty malt, woody hops, unique lager-ale hybrid.", descriptors: ["toasty", "woody", "malt", "unique", "balanced"], origin: "USA" },
  { id: 48, name: "Schneider Weisse Tap 6 Unser Aventinus", style: "Weizenbock", abv: 8.2, ibu: 16, tastingNotes: "Dark wheat, banana, clove, dark fruit, rich.", descriptors: ["fruity", "spicy", "dark-wheat", "rich", "banana"], origin: "Germany" },
  { id: 49, name: "The Alchemist Heady Topper", style: "New England IPA", abv: 8.0, ibu: 75, tastingNotes: "Juicy tropical fruit, resin, hazy, massive aroma.", descriptors: ["hoppy", "tropical", "juicy", "hazy", "resinous"], origin: "USA" },
  { id: 50, name: "Tree House Julius", style: "New England IPA", abv: 6.8, ibu: 65, tastingNotes: "Explosive orange, peach, mango, soft bitterness.", descriptors: ["hoppy", "tropical", "peach", "orange", "soft-bitter"], origin: "USA" },
  { id: 51, name: "Brouwerij Westvleteren 12", style: "Quadrupel", abv: 10.2, ibu: 38, tastingNotes: "Dark fruit, caramel, spice, incredibly complex.", descriptors: ["fruity", "caramel", "spicy", "complex", "rich"], origin: "Belgium" },
  { id: 52, name: "Rochefort 10", style: "Belgian Quad", abv: 11.3, ibu: 27, tastingNotes: "Fig, raisin, port wine, chocolate, warming.", descriptors: ["fruity", "port", "chocolate", "warming", "rich"], origin: "Belgium" },
  { id: 53, name: "Firestone Walker Pivo Pils", style: "German Pilsner", abv: 5.3, ibu: 40, tastingNotes: "Crisp, floral, light biscuit, snappy.", descriptors: ["crisp", "floral", "light", "biscuit", "clean"], origin: "USA" },
  { id: 54, name: "Sierra Nevada Torpedo Extra IPA", style: "American IPA", abv: 7.2, ibu: 65, tastingNotes: "Pine, grapefruit, resin, bold malt.", descriptors: ["hoppy", "pine", "grapefruit", "resin", "bold"], origin: "USA" },
  { id: 55, name: "Dogfish Head 90 Minute IPA", style: "Imperial IPA", abv: 9.0, ibu: 90, tastingNotes: "Intense hop character, caramel, piney, complex.", descriptors: ["hoppy", "intense", "caramel", "pine", "complex"], origin: "USA" },
];

// Helper to get a beer by id
export function getBeerById(id: number): Beer | undefined {
  return beers.find((b) => b.id === id);
}

// For prompt grounding: compact string representation
export function formatBeerForPrompt(beer: Beer): string {
  const ibuStr = beer.ibu ? `, IBU ${beer.ibu}` : "";
  const descStr = beer.descriptors.slice(0, 5).join(", ");
  return `${beer.name} (${beer.style}, ${beer.abv}% ABV${ibuStr}) — ${beer.tastingNotes} [${descStr}]`;
}
