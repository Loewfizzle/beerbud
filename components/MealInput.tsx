"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

interface MealInputProps {
  onSubmit: (meal: string) => void;
  isLoading: boolean;
  defaultValue?: string;
}

const EXAMPLES = [
  "Grilled ribeye",
  "Spicy buffalo wings",
  "Fish & chips",
  "Pepperoni pizza",
  "Thai green curry",
  "Chocolate dessert",
  "Smoked brisket",
  "Fish tacos",
  "Mushroom risotto",
  "BBQ pulled pork",
  "Caesar salad",
  "Beef burger",
];

export default function MealInput({ onSubmit, isLoading, defaultValue = "" }: MealInputProps) {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(Math.max(el.scrollHeight, 96), 240);
    el.style.height = `${newHeight}px`;
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length < 3 || isLoading) return;
    onSubmit(trimmed);
  };

  const handleExampleClick = (example: string) => {
    setValue(example);
    // Small delay so user sees it populate, then submit
    setTimeout(() => {
      onSubmit(example);
    }, 80);
  };

  const canSubmit = value.trim().length >= 3 && !isLoading;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Large inviting input */}
        <div className="relative">
          <label htmlFor="meal" className="mb-2 block text-sm font-medium text-[#C5B8A8]">
            What are you eating or craving tonight?
          </label>
          <textarea
            id="meal"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Grilled ribeye with garlic butter... or spicy Thai basil chicken..."
            className="input textarea-auto w-full rounded-3xl px-5 py-4 text-[15.5px] leading-relaxed placeholder:text-[#9A8C7B] focus:ring-1 focus:ring-[#C5A26F]/30"
            disabled={isLoading}
            maxLength={280}
          />
          <div className="absolute bottom-3 right-4 text-[10px] text-[#6B5344]">
            {value.length}/280
          </div>
        </div>

        {/* Prominent primary CTA */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary w-full rounded-3xl px-8 text-[15px] active:scale-[0.985] disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Finding your perfect beers…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Find my perfect beers
              <ArrowRight size={18} />
            </span>
          )}
        </button>
      </form>

      {/* Example chips — delightful quick starts */}
      <div className="mt-5">
        <div className="mb-2 text-xs font-medium tracking-wide text-[#9A8C7B]">TRY THESE</div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {EXAMPLES.map((ex, idx) => (
              <motion.button
                key={idx}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => handleExampleClick(ex)}
                disabled={isLoading}
                className="chip disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ex}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
