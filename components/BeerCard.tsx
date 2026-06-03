"use client";

import React from "react";
import { motion } from "framer-motion";
import { Beer, BeerPairing } from "@/lib/types";
import { Award, MapPin } from "lucide-react";

interface BeerCardProps {
  pairing: BeerPairing;
  index: number;
}

export default function BeerCard({ pairing, index }: BeerCardProps) {
  const { beer, matchScore, whyItPairs } = pairing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="beer-card group flex flex-col rounded-3xl p-5 sm:p-6"
    >
      {/* Header row: name + match */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.015em] text-[#F5F0E6] sm:text-[19px]">
            {beer.name}
          </h3>
          <p className="mt-0.5 text-sm text-[#C5B8A8]">{beer.style}</p>
        </div>

        {/* Match score */}
        <div className="match-score flex shrink-0 items-center gap-1 rounded-2xl px-3 py-1 text-sm tabular-nums">
          <Award size={15} className="text-[#C5A26F]" />
          <span>{matchScore}%</span>
        </div>
      </div>

      {/* Specs row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <div className="font-mono text-[#E8A84B] tabular-nums">
          {beer.abv}% ABV
        </div>
        {beer.ibu && (
          <div className="font-mono text-[#C5B8A8] tabular-nums">
            {beer.ibu} IBU
          </div>
        )}
        {beer.origin && (
          <div className="flex items-center gap-1 text-[#9A8C7B]">
            <MapPin size={13} />
            <span className="text-xs">{beer.origin}</span>
          </div>
        )}
      </div>

      {/* Tasting note */}
      <div className="mt-3.5 border-l-2 border-[#C5A26F]/40 pl-3 text-[13.5px] leading-snug text-[#C5B8A8]">
        {beer.tastingNotes}
      </div>

      {/* Why it pairs — the heart of the experience */}
      <div className="mt-4 flex-1">
        <div className="mb-1.5 text-[10px] font-semibold tracking-[1px] text-[#C5A26F] uppercase">
          Why this pairs
        </div>
        <p className="text-[14.2px] leading-relaxed text-[#EDE6D9]">
          {whyItPairs}
        </p>
      </div>

      {/* Subtle bottom accent */}
      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#C5A26F]/20 to-transparent" />
    </motion.div>
  );
}
