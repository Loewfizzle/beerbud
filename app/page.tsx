"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";

import AnimatedBeerPour from "@/components/AnimatedBeerPour";
import MealInput from "@/components/MealInput";
import BeerCard from "@/components/BeerCard";
import LoadingState from "@/components/LoadingState";
import { getBeerPairings } from "@/app/actions";
import type { PairingResult } from "@/lib/types";

// Main Beer Buddy App — premium mobile-first experience
export default function BeerBuddy() {
  const [result, setResult] = useState<PairingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMeal, setCurrentMeal] = useState("");
  const [error, setError] = useState<string | null>(null);

  const inputSectionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (meal: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentMeal(meal);

    // Optimistic scroll toward results area
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    try {
      const pairingResult = await getBeerPairings(meal);
      setResult(pairingResult);

      // Gentle success toast on first use
      if (!result) {
        toast.success("Your pairings are ready", {
          description: "Thoughtfully matched to your meal.",
          duration: 2200,
        });
      }
    } catch (e: any) {
      const msg = e?.message || "Something went wrong. Please try again.";
      setError(msg);
      toast.error("Couldn't get pairings", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (currentMeal) {
      handleSubmit(currentMeal);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    setError(null);
    setCurrentMeal("");
    // Focus input
    setTimeout(() => {
      inputSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const handleCopyResults = () => {
    if (!result) return;

    const text = [
      `Beer Buddy pairings for: ${result.analysis.dish}`,
      "",
      ...result.pairings.map(
        (p, i) =>
          `${i + 1}. ${p.beer.name} (${p.beer.style}) — ${p.matchScore}% match\n   ${p.whyItPairs}`
      ),
      "",
      "Generated with care at beerbuddy.app",
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      toast.success("Pairings copied", {
        description: "Share the love (and the beer).",
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#1F1A17] text-[#F5F0E6]">
      {/* Elegant minimal header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1F1A17]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C5A26F] text-[#1F1A17]">
              <span className="text-lg font-bold tracking-tighter">BB</span>
            </div>
            <div>
              <div className="font-semibold tracking-[-0.3px] text-lg leading-none">Beer Buddy</div>
              <div className="text-[10px] text-[#9A8C7B] -mt-0.5">FLAVOR PAIRINGS</div>
            </div>
          </div>

          <a
            href="#how"
            className="text-sm font-medium text-[#C5B8A8] hover:text-[#F5F0E6] transition-colors hidden sm:block"
          >
            How it works
          </a>
        </div>
      </header>

      {/* HERO — integrated with signature animated pour */}
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-16">
          {/* Left: headline + description */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-[1.5px] text-[#C5A26F] mb-4">
              PREMIUM FLAVOR SCIENCE
            </div>

            <h1 className="hero-title text-balance text-4xl font-semibold tracking-[-1.6px] leading-[0.96] sm:text-5xl md:text-[52px]">
              The perfect beer<br />for what you’re eating.
            </h1>

            <p className="mt-4 max-w-[42ch] text-lg text-[#C5B8A8] mx-auto md:mx-0">
              Describe your meal. We’ll instantly recommend the three best beers — with beautiful explanations.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm md:justify-start">
              <div className="rounded-full bg-white/5 px-4 py-1 text-[#C5B8A8]">55 curated beers</div>
              <div className="rounded-full bg-white/5 px-4 py-1 text-[#C5B8A8]">Thoughtful reasoning</div>
              <div className="rounded-full bg-white/5 px-4 py-1 text-[#C5B8A8]">Mobile first</div>
            </div>
          </div>

          {/* Right / below on mobile: The star — Animated Beer Pour */}
          <div className="w-full max-w-[240px] shrink-0 md:w-auto">
            <AnimatedBeerPour />
          </div>
        </div>
      </section>

      {/* INPUT SECTION */}
      <section ref={inputSectionRef} className="mx-auto max-w-3xl px-5 pb-12">
        <div className="rounded-3xl border border-white/10 bg-[#2C2522] p-6 sm:p-8 md:p-9">
          <MealInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            defaultValue={currentMeal}
          />
        </div>
      </section>

      {/* RESULTS + LOADING */}
      <section ref={resultsRef} id="results" className="mx-auto max-w-5xl px-5 pb-16">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-white/10 bg-[#2C2522] py-2"
            >
              <LoadingState />
            </motion.div>
          )}

          {error && !isLoading && (
            <div className="rounded-3xl border border-red-900/30 bg-red-950/20 p-6 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={handleRegenerate}
                className="btn-secondary mt-4 rounded-2xl px-6 text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {result && !isLoading && (
            <motion.div
              key={result.generatedAt}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-8"
            >
              {/* Meal summary */}
              <div className="rounded-3xl border border-white/10 bg-[#2C2522] p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-[1px] text-[#C5A26F] uppercase mb-1">
                      YOUR MEAL
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">{result.analysis.dish}</h2>
                  </div>
                  <button
                    onClick={handleNewSearch}
                    className="btn-secondary flex items-center gap-2 self-start rounded-2xl px-5 text-sm sm:self-center"
                  >
                    <RefreshCw size={15} /> Change meal
                  </button>
                </div>

                {/* Flavor breakdown */}
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 text-xs font-medium text-[#9A8C7B]">KEY INGREDIENTS</div>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.keyIngredients.map((ing, i) => (
                        <span key={i} className="tag">{ing}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-medium text-[#9A8C7B]">FLAVOR PROFILE</div>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.flavorProfile.map((f, i) => (
                        <span key={i} className="tag">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#C5B8A8] border-l-2 border-[#C5A26F]/30 pl-3">
                  {result.analysis.notes}
                </p>
              </div>

              {/* Top 3 Pairings */}
              <div>
                <div className="mb-4 flex items-end justify-between px-1">
                  <div>
                    <div className="text-xs font-semibold tracking-[1.5px] text-[#C5A26F]">TOP 3 PAIRINGS</div>
                    <h3 className="text-2xl font-semibold tracking-tight">Perfect matches for your meal</h3>
                  </div>
                  <button
                    onClick={handleCopyResults}
                    className="hidden items-center gap-1.5 text-sm text-[#C5B8A8] hover:text-[#F5F0E6] md:flex"
                  >
                    Copy <ArrowRight size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {result.pairings.map((pairing, index) => (
                    <BeerCard key={pairing.beer.id} pairing={pairing} index={index} />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={handleRegenerate}
                  className="btn-secondary flex flex-1 items-center justify-center gap-2 rounded-3xl text-base"
                >
                  <RefreshCw size={17} /> Slightly different beers
                </button>
                <button
                  onClick={handleNewSearch}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-3xl text-base"
                >
                  New pairing <ArrowRight size={18} />
                </button>
              </div>

              <p className="px-1 text-center text-xs text-[#9A8C7B]">
                Pairings generated just now • Tap a card for more detail on mobile
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* HOW IT WORKS — friendly & visual */}
      <section id="how" className="border-t border-white/10 bg-[#2C2522]/60 py-14">
        <div className="mx-auto max-w-4xl px-5">
          <div className="text-center">
            <div className="text-xs font-semibold tracking-[2px] text-[#C5A26F]">SIMPLE • DELIGHTFUL • SMART</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">How it works</h2>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Describe your meal",
                desc: "Type anything — a dish, craving, or full dinner. The more specific, the better the pairings.",
              },
              {
                num: "02",
                title: "We analyze the flavors",
                desc: "Our model extracts key ingredients, intensity, and the dominant flavor profile in seconds.",
              },
              {
                num: "03",
                title: "Curated + AI pairing",
                desc: "We match against 55 real beers using both data-driven descriptors and thoughtful LLM reasoning.",
              },
            ].map((step, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-[#1F1A17] p-6">
                <div className="font-mono text-sm text-[#C5A26F]">{step.num}</div>
                <div className="mt-3 text-lg font-semibold tracking-tight">{step.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[#C5B8A8]">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-[#9A8C7B]">
            Everything runs server-side. Your meal description never leaves our secure environment.
          </p>
        </div>
      </section>

      {/* Final CTA / subtle encouragement */}
      <section className="mx-auto max-w-3xl px-5 py-12 text-center">
        <div className="mx-auto max-w-md">
          <p className="text-[#C5B8A8]">
            Great beer makes great meals even better. Share a pairing with someone you love.
          </p>
          <button
            onClick={() => {
              if (result) {
                handleCopyResults();
              } else {
                inputSectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#C5A26F] hover:text-[#E8A84B]"
          >
            {result ? "Copy these pairings" : "Start with an example above"} <Heart size={15} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#1F1A17] py-9">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div className="text-sm text-[#C5B8A8]">
            Beer Buddy — beautiful pairings for real meals.
          </div>
          <div className="footer-note mx-auto mt-3 max-w-md">
            Pairings are suggestions based on flavor science, classic beer-food principles, and popular expert consensus.
            Always drink responsibly. Must be 21+.
          </div>
          <div className="mt-6 text-[10px] text-[#6B5344]">Made with care for people who love great beer.</div>
        </div>
      </footer>
    </div>
  );
}
