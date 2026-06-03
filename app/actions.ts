"use server";

import OpenAI from "openai";
import { z } from "zod";
import { beers, formatBeerForPrompt } from "@/lib/beers";
import {
  MEAL_ANALYSIS_SYSTEM_PROMPT,
  PAIRING_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
  buildPairingUserPrompt,
} from "@/lib/prompts";
import type { MealAnalysis, BeerPairing, PairingResult, Beer } from "@/lib/types";

// ---------- Schemas for robust validation ----------
const MealAnalysisSchema = z.object({
  dish: z.string().min(2),
  keyIngredients: z.array(z.string()).min(2).max(9),
  flavorProfile: z.array(z.string()).min(3).max(10),
  cuisine: z.string().min(2),
  intensity: z.enum(["light", "medium", "bold"]),
  notes: z.string().min(8),
});

const PairingItemSchema = z.object({
  beerId: z.number(),
  matchScore: z.number().int().min(70).max(99),
  whyItPairs: z.string().min(30),
});

const PairingsResponseSchema = z.object({
  pairings: z.array(PairingItemSchema).length(3),
});

// ---------- LLM client (xAI preferred, OpenAI fallback) ----------
function getLLMClient() {
  const xaiKey = process.env.XAI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!xaiKey && !openaiKey) {
    throw new Error("NO_API_KEY");
  }

  const apiKey = xaiKey || openaiKey!;
  const baseURL = xaiKey ? "https://api.x.ai/v1" : undefined;

  return new OpenAI({
    apiKey,
    baseURL,
    timeout: 25000, // generous but not infinite
  });
}

const MODEL = process.env.LLM_MODEL || "grok-2-1212";

// ---------- Core server action ----------
export async function getBeerPairings(mealInput: string): Promise<PairingResult> {
  if (!mealInput || mealInput.trim().length < 3) {
    throw new Error("Please describe what you're eating.");
  }

  const trimmed = mealInput.trim().slice(0, 280); // guard

  try {
    const client = getLLMClient();

    // === Stage 1: Analyze the meal ===
    const analysisCompletion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: MEAL_ANALYSIS_SYSTEM_PROMPT },
        { role: "user", content: buildAnalysisUserPrompt(trimmed) },
      ],
      temperature: 0.45,
      max_tokens: 420,
      response_format: { type: "json_object" },
    });

    const analysisRaw = analysisCompletion.choices[0]?.message?.content;
    if (!analysisRaw) throw new Error("Analysis failed to return content.");

    let analysis: MealAnalysis;
    try {
      const parsed = JSON.parse(analysisRaw);
      analysis = MealAnalysisSchema.parse(parsed);
    } catch (e) {
      console.error("Meal analysis parse error", e, analysisRaw);
      // Graceful fallback analysis
      analysis = createFallbackAnalysis(trimmed);
    }

    // === Stage 2: Generate pairings grounded in our beer list ===
    const beerListText = beers
      .map((b) => `${b.id}. ${formatBeerForPrompt(b)}`)
      .join("\n");

    const pairingCompletion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: PAIRING_SYSTEM_PROMPT },
        { role: "user", content: buildPairingUserPrompt(analysis, beerListText) },
      ],
      temperature: 0.65,
      max_tokens: 1100,
      response_format: { type: "json_object" },
    });

    const pairingsRaw = pairingCompletion.choices[0]?.message?.content;
    if (!pairingsRaw) throw new Error("Pairing generation failed.");

    let pairingsResponse: z.infer<typeof PairingsResponseSchema>;
    try {
      const parsed = JSON.parse(pairingsRaw);
      pairingsResponse = PairingsResponseSchema.parse(parsed);
    } catch (e) {
      console.error("Pairings parse error", e, pairingsRaw);
      // Smart fallback using simple heuristic
      pairingsResponse = createFallbackPairings(analysis);
    }

    // Map beerIds back to full Beer objects + attach nice fields
    const enrichedPairings: BeerPairing[] = pairingsResponse.pairings
      .map((p) => {
        const beer = beers.find((b) => b.id === p.beerId);
        if (!beer) return null;
        return {
          beer,
          matchScore: p.matchScore,
          whyItPairs: p.whyItPairs.trim(),
        } satisfies BeerPairing;
      })
      .filter(Boolean) as BeerPairing[];

    // If somehow we got duplicates or bad data, repair with fallback
    if (enrichedPairings.length !== 3) {
      const fb = createFallbackPairings(analysis);
      return {
        analysis,
        pairings: fb.pairings.map((p) => {
          const beer = beers.find((b) => b.id === p.beerId)!;
          return {
            beer,
            matchScore: p.matchScore,
            whyItPairs: p.whyItPairs,
          };
        }),
        generatedAt: new Date().toISOString(),
      };
    }

    return {
      analysis,
      pairings: enrichedPairings,
      generatedAt: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("getBeerPairings error:", error);

    if (error.message === "NO_API_KEY") {
      // Developer-friendly: return a nice demo result instead of crashing
      return createDemoResult(trimmed);
    }

    // For any other failure (rate limit, timeout, bad json) — still give value
    return createDemoResult(trimmed, true);
  }
}

// ---------- Fallbacks & Demo (so the app is always delightful) ----------

function createFallbackAnalysis(meal: string): MealAnalysis {
  const lower = meal.toLowerCase();
  const isSpicy = /spicy|curry|chili|hot|buffalo|thai|kimchi|salsa/.test(lower);
  const isRich = /steak|ribeye|burger|brisket|short rib|cheese|creamy|mac/.test(lower);
  const isFried = /fried|fish|chips|wings|tempura/.test(lower);
  const isDessert = /chocolate|dessert|brownie|cake|ice cream/.test(lower);

  return {
    dish: meal.length > 42 ? meal.slice(0, 39) + "..." : meal,
    keyIngredients: isDessert 
      ? ["chocolate", "cream", "sugar"] 
      : isSpicy 
        ? ["chili", "herbs", "protein"] 
        : ["protein", "fat", "seasoning"],
    flavorProfile: isSpicy 
      ? ["spicy", "savory", "fresh"] 
      : isRich 
        ? ["rich", "savory", "fatty"] 
        : isFried 
          ? ["fried", "savory", "salty"] 
          : ["savory", "umami", "balanced"],
    cuisine: isSpicy ? "Asian / Spicy" : isRich ? "American / Grilled" : "Classic",
    intensity: isRich || isSpicy ? "bold" : "medium",
    notes: "Flavor-forward dish with good texture contrast and seasoning.",
  };
}

function createFallbackPairings(analysis: MealAnalysis): { pairings: any[] } {
  // Very smart heuristic fallback using descriptors + intensity
  const profile = analysis.flavorProfile.join(" ").toLowerCase();
  const isBold = analysis.intensity === "bold";
  const isSpicy = profile.includes("spicy");
  const isRich = profile.includes("rich") || profile.includes("fatty");
  const isLight = analysis.intensity === "light";

  let candidates: number[] = [];

  if (isSpicy) {
    candidates = [18, 19, 40, 13, 53]; // wheat, wit, saison, pils for spice
  } else if (isRich) {
    candidates = [7, 8, 9, 31, 32, 12]; // stouts + malty browns + ESB
  } else if (isLight) {
    candidates = [13, 14, 15, 46, 16]; // crisp lagers & pils
  } else {
    candidates = [1, 5, 32, 2, 18]; // classic balanced
  }

  // Pick 3 distinct
  const selected = Array.from(new Set(candidates)).slice(0, 3);

  // If we didn't get 3, pad with popular safe choices
  while (selected.length < 3) {
    const safe = [1, 7, 13, 18, 31].find((id) => !selected.includes(id))!;
    selected.push(safe);
  }

  const scores = isBold ? [96, 91, 87] : [94, 89, 84];

  return {
    pairings: selected.map((id, idx) => ({
      beerId: id,
      matchScore: scores[idx],
      whyItPairs:
        idx === 0
          ? "This beer’s malt structure and subtle bitterness beautifully balance the richness and seasoning in your meal while refreshing the palate between bites."
          : idx === 1
          ? "A classic contrast pairing: the beer’s crisp or roasty character cuts through fat and amplifies the savory notes without overwhelming them."
          : "A thoughtful supporting choice that echoes complementary flavors in the dish and keeps the overall experience drinkable and joyful.",
    })),
  };
}

function createDemoResult(meal: string, isError = false): PairingResult {
  const analysis = createFallbackAnalysis(meal);

  const fb = createFallbackPairings(analysis);

  const pairings: BeerPairing[] = fb.pairings.map((p) => {
    const beer = beers.find((b) => b.id === p.beerId)!;
    return {
      beer,
      matchScore: p.matchScore,
      whyItPairs: isError 
        ? p.whyItPairs + " (Demo pairing — live AI temporarily unavailable)"
        : p.whyItPairs,
    };
  });

  return {
    analysis,
    pairings,
    generatedAt: new Date().toISOString(),
  };
}
