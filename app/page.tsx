"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beer, ArrowRight, RefreshCw } from 'lucide-react';

// Simple smart pairing logic for the starter (we'll upgrade to real AI later)
const getPairings = (meal: string) => {
  const lower = meal.toLowerCase();
  
  if (lower.includes('steak') || lower.includes('ribeye') || lower.includes('burger')) {
    return [
      { name: "Imperial Stout", style: "Stout", abv: "9.5%", ibu: "65", match: 94, why: "The deep roasted malt and chocolate notes complement the charred, savory flavors of the steak while the high ABV stands up to the richness." },
      { name: "West Coast IPA", style: "IPA", abv: "7.2%", ibu: "75", match: 88, why: "Bold hop bitterness cuts through the fat and cleanses the palate between bites of juicy beef." },
      { name: "American Amber Ale", style: "Amber Ale", abv: "5.8%", ibu: "35", match: 82, why: "Balanced caramel malt and gentle hops bridge the savory meat and any vegetable sides beautifully." }
    ];
  }
  
  if (lower.includes('spicy') || lower.includes('wings') || lower.includes('curry') || lower.includes('thai')) {
    return [
      { name: "Hazy IPA", style: "Hazy IPA", abv: "6.8%", ibu: "45", match: 93, why: "The juicy, tropical hop character and soft bitterness tame the heat while refreshing the palate." },
      { name: "German Pilsner", style: "Pilsner", abv: "5.2%", ibu: "38", match: 87, why: "Crisp, snappy bitterness and light body cut through spice and fat without overwhelming delicate flavors." },
      { name: "Witbier", style: "Wheat Beer", abv: "5.5%", ibu: "15", match: 81, why: "Subtle citrus and spice notes from the yeast complement the heat while the cloudy wheat body soothes." }
    ];
  }
  
  if (lower.includes('fish') || lower.includes('chips') || lower.includes('seafood')) {
    return [
      { name: "English Pale Ale", style: "Pale Ale", abv: "5.0%", ibu: "40", match: 91, why: "Classic malt-hop balance stands up to fried fish while the bitterness cuts through batter and tartar sauce." },
      { name: "Czech Pilsner", style: "Pilsner", abv: "4.8%", ibu: "32", match: 89, why: "Light, crisp, and refreshing — the perfect counterpoint to rich fried seafood." },
      { name: "Saison", style: "Farmhouse Ale", abv: "6.5%", ibu: "28", match: 84, why: "Peppery yeast character and high carbonation refresh the palate between bites of fried fish." }
    ];
  }
  
  // Default pairing
  return [
    { name: "American IPA", style: "IPA", abv: "6.5%", ibu: "55", match: 85, why: "Versatile hop character that works well with a wide range of savory and slightly spicy dishes." },
    { name: "Brown Ale", style: "Brown Ale", abv: "5.5%", ibu: "25", match: 80, why: "Nutty malt backbone complements grilled and roasted flavors without overpowering them." },
    { name: "Lager", style: "Lager", abv: "4.8%", ibu: "12", match: 76, why: "Clean, crisp, and sessionable — a safe but enjoyable choice for almost any casual meal." }
  ];
};

const exampleMeals = [
  "Grilled ribeye steak with garlic mashed potatoes",
  "Spicy buffalo wings with ranch",
  "Fish and chips with tartar sauce",
  "Pepperoni pizza",
  "Thai green curry with rice"
];

export default function BeerBuddy() {
  const [meal, setMeal] = useState("");
  const [pairings, setPairings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!meal.trim()) return;

    setLoading(true);
    setHasSearched(true);

    // Simulate quick AI thinking
    setTimeout(() => {
      const results = getPairings(meal);
      setPairings(results);
      setLoading(false);
    }, 650);
  };

  const useExample = (example: string) => {
    setMeal(example);
    // Auto-submit after a short delay so user sees it
    setTimeout(() => {
      const results = getPairings(example);
      setPairings(results);
      setHasSearched(true);
      setLoading(false);
    }, 120);
  };

  const reset = () => {
    setMeal("");
    setPairings([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0804] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0c0804]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#d97706] rounded-full flex items-center justify-center">
              <Beer className="w-5 h-5 text-[#0c0804]" />
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-tight">Beer Buddy</div>
              <div className="text-[10px] text-white/50 -mt-1">FIND THE PERFECT POUR</div>
            </div>
          </div>
          <div className="text-sm text-white/60 hidden md:block">Made for people who love good food &amp; better beer</div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        {/* Hero + Animated Beer Pour */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-sm mb-6 border border-white/10">
            <div className="w-2 h-2 bg-[#d97706] rounded-full animate-pulse" /> New • AI-powered pairings
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter mb-4">
            What are you<br />eating tonight?
          </h1>
          <p className="text-xl text-white/70 max-w-md">
            Tell us what you&#39;re craving and we&#39;ll recommend the three best beers to go with it.
          </p>

          {/* Animated Beer Pour */}
          <div className="mt-10 mb-8 relative">
            <AnimatedBeerPour />
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="relative">
              <textarea
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                placeholder="Grilled ribeye with garlic butter... or spicy wings... or fish and chips"
                className="w-full bg-[#1a140f] border border-white/15 focus:border-[#d97706] rounded-3xl px-7 py-5 text-lg placeholder:text-white/40 resize-y min-h-[120px] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!meal.trim() || loading}
                className="absolute bottom-5 right-5 bg-[#d97706] hover:bg-[#b45309] disabled:opacity-50 text-[#0c0804] font-semibold px-8 py-3 rounded-2xl flex items-center gap-2 transition-all active:scale-[0.985]"
              >
                Find my beers
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {exampleMeals.map((ex, i) => (
              <button
                key={i}
                onClick={() => useExample(ex)}
                className="px-4 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Results */}
          <AnimatePresence>
            {hasSearched && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="flex items-center gap-3 text-white/60">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Finding your perfect pours...
                    </div>
                  </div>
                ) : pairings.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6 px-1">
                      <div>
                        <div className="text-sm text-white/50">TOP MATCHES FOR</div>
                        <div className="font-medium text-lg">{meal}</div>
                      </div>
                      <button onClick={reset} className="text-sm flex items-center gap-1.5 text-white/60 hover:text-white">
                        <RefreshCw className="w-4 h-4" /> New search
                      </button>
                    </div>

                    <div className="grid gap-4">
                      {pairings.map((beer, index) => (
                        <div key={index} className="beer-card bg-[#1a140f] border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-1">
                              <div className="text-2xl font-semibold tracking-tight">{beer.name}</div>
                              <div className="text-[#d97706] text-sm font-medium">{beer.style}</div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                              <div>ABV {beer.abv}</div>
                              <div>IBU {beer.ibu}</div>
                              <div className="px-2.5 py-0.5 bg-[#d97706]/10 text-[#d97706] rounded font-medium text-xs">{beer.match}% MATCH</div>
                            </div>
                            <p className="text-white/80 leading-relaxed">{beer.why}</p>
                          </div>
                          <div className="md:w-40 flex-shrink-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-5xl font-semibold text-[#d97706] tabular-nums">{beer.match}</div>
                              <div className="text-xs tracking-[2px] text-white/50 -mt-1">MATCH</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-center text-xs text-white/40 mt-8">This is a starter demo. Full AI version coming soon.</p>
                  </>
                ) : null}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        Drink responsibly • Pairings are suggestions based on classic flavor principles
      </footer>
    </div>
  );
}

function AnimatedBeerPour() {
  return (
    <div className="relative w-[220px] h-[280px] flex items-end justify-center">
      {/* Glass */}
      <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="glass">
        {/* Glass outline */}
        <path d="M35 40 Q35 20 55 20 L125 20 Q145 20 145 40 L145 230 Q145 250 125 250 L55 250 Q35 250 35 230 Z" stroke="#d1d5db" strokeWidth="8" strokeLinejoin="round"/>
        {/* Inner glass highlight */}
        <path d="M45 35 Q45 25 60 25 L120 25 Q135 25 135 35" stroke="white" strokeWidth="3" strokeOpacity="0.15"/>

        {/* Beer liquid - animated fill */}
        <motion.rect
          x="42"
          y="45"
          width="96"
          height="195"
          rx="8"
          fill="#d97706"
          initial={{ height: 40 }}
          animate={{ height: 195 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 1.8 }}
        />

        {/* Bubbles */}
        {[0,1,2,3,4,5].map((i) => (
          <motion.circle
            key={i}
            cx={55 + (i % 3) * 28}
            cy={220 - (i % 4) * 35}
            r={i % 2 === 0 ? 3.5 : 2.5}
            fill="white"
            opacity={0.35}
            animate={{
              cy: [220 - (i % 4) * 35, 70],
              opacity: [0.35, 0.1, 0]
            }}
            transition={{
              duration: 2.2 + (i % 3) * 0.4,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Foam head */}
        <motion.ellipse
          cx="90"
          cy="52"
          rx="48"
          ry="18"
          fill="#f5e8c7"
          initial={{ ry: 8 }}
          animate={{ ry: [8, 17, 16] }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
        />
        <ellipse cx="90" cy="48" rx="42" ry="10" fill="#fffbeb" opacity="0.6" />
      </svg>

      <div className="absolute -bottom-2 text-[10px] tracking-[3px] text-white/40 font-mono">POUR • SIP • REPEAT</div>
    </div>
  );
}
