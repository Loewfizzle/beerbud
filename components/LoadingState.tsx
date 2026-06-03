"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="relative mb-6">
        {/* Mini elegant pouring glass indicator */}
        <svg width="72" height="92" viewBox="0 0 72 92" className="mx-auto">
          <defs>
            <linearGradient id="miniBeer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F4C16B" />
              <stop offset="100%" stopColor="#C67D2E" />
            </linearGradient>
          </defs>
          {/* Glass outline */}
          <path
            d="M14 12 Q36 7 58 12 L59 76 Q36 82 13 76 Z"
            fill="none"
            stroke="#C5B8A8"
            strokeWidth="5"
          />
          {/* Animated beer level */}
          <motion.rect
            x="16"
            y="70"
            width="40"
            height="0"
            fill="url(#miniBeer)"
            animate={{ y: [70, 26], height: [0, 46] }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 0.35 }}
          />
          {/* Tiny foam */}
          <motion.ellipse
            cx="36"
            cy="28"
            rx="17"
            ry="5"
            fill="#F8F1E3"
            animate={{ cy: [32, 26], rx: [12, 17] }}
            transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity, repeatDelay: 0.35 }}
          />
        </svg>
      </div>

      <div className="space-y-1.5">
        <p className="text-lg font-semibold tracking-tight text-[#F5F0E6]">Pouring your pairings…</p>
        <p className="text-sm text-[#C5B8A8]">Analyzing flavors • Matching against our cellar • Crafting explanations</p>
      </div>

      {/* Subtle progress dots */}
      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full bg-[#C5A26F]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, delay: i * 0.18, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}
