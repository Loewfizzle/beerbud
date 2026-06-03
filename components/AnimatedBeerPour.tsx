"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * Premium Animated Beer Pour — signature micro-interaction for Beer Buddy.
 * 
 * - Seamless ~10s loop (fill + settle + continuous bubbles)
 * - Realistic rising bubbles (varied size/speed/phase)
 * - Creamy foam head that builds then gently settles with natural wobble
 * - Subtle artistic hop/barley elements floating in background
 * - Smooth 60fps via Framer Motion + SVG
 * - Pauses on hover/tap; "Pour again" control
 * - Respects prefers-reduced-motion
 */
export default function AnimatedBeerPour() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycle, setCycle] = useState(0); // key to force clean restart of complex sequences
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const restart = useCallback(() => {
    setCycle((c) => c + 1);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (prefersReduced) {
      restart();
      return;
    }
    setIsPlaying((p) => !p);
  }, [prefersReduced, restart]);

  // Master cycle duration ~10.2s for elegant loop
  const CYCLE_MS = 10200;

  // Auto-restart seamless loop when playing
  useEffect(() => {
    if (!isPlaying || prefersReduced) return;

    const id = setTimeout(() => {
      // Increment cycle to retrigger motion sequences that have finite duration
      setCycle((c) => c + 1);
    }, CYCLE_MS);

    return () => clearTimeout(id);
  }, [isPlaying, prefersReduced, cycle]);

  // When reduced motion, show a beautiful static premium still
  if (prefersReduced) {
    return (
      <div className="glass-container relative mx-auto w-full max-w-[210px] select-none">
        <StaticPremiumGlass />
        <div className="mt-3 flex justify-center">
          <button
            onClick={restart}
            className="btn-secondary flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            aria-label="Replay animation"
          >
            <RotateCcw size={14} /> Show pour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="glass-container group relative mx-auto w-full max-w-[210px] md:max-w-[240px] select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause the beer pour animation" : "Resume the beer pour animation"}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          togglePlay();
        }
      }}
    >
      <div className="relative">
        <BeerPourSVG key={cycle} isPlaying={isPlaying} />

        {/* Subtle glass shine overlay for premium feel */}
        <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>

      {/* Elegant controls */}
      <div className="mt-3 flex items-center justify-center gap-2 opacity-70 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95"
          aria-label={isPlaying ? "Pause animation" : "Resume animation"}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); restart(); }}
          className="flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white active:scale-95"
          aria-label="Pour again"
        >
          <RotateCcw size={14} />
          <span>Pour again</span>
        </button>
      </div>

      {/* Tiny caption */}
      <p className="mt-1.5 text-center text-[10px] tracking-[0.5px] text-white/40">SIGNATURE POUR</p>
    </div>
  );
}

/* ==================== SVG IMPLEMENTATION ==================== */

function BeerPourSVG({ isPlaying }: { isPlaying: boolean }) {
  // Timing tuned for 10.2s elegant loop
  const fillDuration = 4.6; // seconds to fill
  const settleStart = 5.8;

  // Beer fill progress: 0.28 → 0.96 (leaves room for nice head)
  const beerYStart = 218; // bottom of glass in viewBox
  const beerYEnd = 72;    // top fill level (head starts here)
  const beerHeightMax = beerYStart - beerYEnd;

  return (
    <svg
      viewBox="0 0 240 320"
      className="w-full drop-shadow-2xl"
      style={{ filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.35))" }}
      aria-hidden="true"
    >
      <defs>
        {/* Beer gradient - rich golden amber, premium look */}
        <linearGradient id="beerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4C16B" />
          <stop offset="38%" stopColor="#E8A84B" />
          <stop offset="72%" stopColor="#C67D2E" />
          <stop offset="100%" stopColor="#A15E1F" />
        </linearGradient>

        {/* Foam gradient - creamy off-white with slight warmth */}
        <linearGradient id="foamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8F1E3" />
          <stop offset="55%" stopColor="#EDE0C8" />
          <stop offset="100%" stopColor="#D9C9A8" />
        </linearGradient>

        {/* Glass highlight */}
        <linearGradient id="glassGrad" x1="12%" y1="0%" x2="38%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>

        {/* Inner beer surface highlight for realism */}
        <linearGradient id="surfaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F4C16B" stopOpacity="0.0" />
          <stop offset="45%" stopColor="#FFF7E0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F4C16B" stopOpacity="0.0" />
        </linearGradient>

        {/* Clip for beer inside glass walls */}
        <clipPath id="glassClip">
          <path d="M72 58 Q120 52 168 58 L170 262 Q120 272 70 262 Z" />
        </clipPath>

        {/* Subtle hop leaf shape */}
        <g id="hopLeaf">
          <path 
            d="M0 0 Q4 -7 9 -2 Q14 4 11 11 Q6 16 2 9 Q-1 4 0 0" 
            fill="#3F2A1F" 
            opacity="0.18" 
          />
          <circle cx="5" cy="5" r="1.6" fill="#3F2A1F" opacity="0.25" />
        </g>
      </defs>

      {/* Background floating hops / barley - artistic, low opacity, slow motion */}
      <g opacity="0.6">
        {/* Left hop cluster */}
        <motion.g
          animate={isPlaying ? { y: [0, -14, 0], rotate: [-6, 4, -6] } : {}}
          transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <use href="#hopLeaf" x="18" y="68" transform="scale(0.9)" />
          <use href="#hopLeaf" x="26" y="82" transform="scale(0.7) rotate(28)" />
        </motion.g>

        {/* Right hop */}
        <motion.g
          animate={isPlaying ? { y: [0, -11, 0], rotate: [8, -5, 8] } : {}}
          transition={{ duration: 9.1, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        >
          <use href="#hopLeaf" x="198" y="94" transform="scale(0.85) rotate(-18)" />
        </motion.g>

        {/* Top right barley-ish element */}
        <motion.g
          animate={isPlaying ? { y: [0, -8, 0], x: [0, 3, 0] } : {}}
          transition={{ duration: 8.6, repeat: Infinity, ease: "easeInOut", delay: 3.2 }}
        >
          <ellipse cx="205" cy="48" rx="7" ry="2.5" fill="#3F2A1F" opacity="0.13" transform="rotate(-28 205 48)" />
        </motion.g>
      </g>

      {/* Glass body - thick clear walls with premium bevel */}
      <path 
        d="M68 54 Q120 46 172 54 L175 265 Q120 278 65 265 Z" 
        fill="none" 
        stroke="#C5B8A8" 
        strokeWidth="18" 
        strokeLinejoin="round" 
      />
      {/* Inner glass wall */}
      <path 
        d="M74 60 Q120 54 166 60 L168 260 Q120 270 72 260 Z" 
        fill="none" 
        stroke="#EDE6D9" 
        strokeWidth="2.5" 
        opacity="0.35" 
      />

      {/* Beer liquid group - clipped inside glass */}
      <g clipPath="url(#glassClip)">
        {/* Main beer body - animated fill level */}
        <motion.rect
          x="70"
          y={beerYStart}
          width="100"
          height={beerHeightMax}
          fill="url(#beerGrad)"
          animate={isPlaying ? {
            y: [beerYStart, beerYEnd + 18, beerYEnd], // starts low, pours up, settles slightly lower
          } : { y: beerYEnd + 8 }}
          transition={{
            duration: fillDuration,
            ease: [0.22, 1.0, 0.36, 1],
            repeat: isPlaying ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: 5.6,
          }}
        />

        {/* Beer surface highlight bar - moves with level */}
        <motion.rect
          x="71"
          width="98"
          height="5"
          fill="url(#surfaceGrad)"
          animate={isPlaying ? {
            y: [beerYStart - 3, beerYEnd + 13, beerYEnd - 2],
          } : { y: beerYEnd + 5 }}
          transition={{
            duration: fillDuration,
            ease: [0.22, 1.0, 0.36, 1],
            repeat: isPlaying ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: 5.6,
          }}
        />

        {/* Rising bubbles - 11 varied bubbles, continuous independent motion */}
        <Bubbles isPlaying={isPlaying} />
      </g>

      {/* Creamy foam head */}
      <FoamHead isPlaying={isPlaying} fillDuration={fillDuration} settleStart={settleStart} />

      {/* Pouring stream (only during active fill phase of each cycle) */}
      <PourStream isPlaying={isPlaying} />

      {/* Glass rim / lip highlight */}
      <ellipse 
        cx="120" 
        cy="58" 
        rx="52" 
        ry="8" 
        fill="none" 
        stroke="#EDE6D9" 
        strokeWidth="7" 
        opacity="0.6" 
      />
      <ellipse 
        cx="120" 
        cy="57" 
        rx="48" 
        ry="5.5" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        opacity="0.35" 
      />

      {/* Subtle condensation / water droplets on glass */}
      <g opacity="0.18" fill="#EDE6D9">
        <circle cx="82" cy="138" r="1.8" />
        <circle cx="158" cy="171" r="1.3" />
        <circle cx="79" cy="199" r="1.5" />
        <circle cx="161" cy="107" r="1.1" />
      </g>

      {/* Very light inner rim shadow for depth */}
      <path 
        d="M74 60 Q120 54 166 60" 
        fill="none" 
        stroke="#1F1A17" 
        strokeWidth="3" 
        opacity="0.2" 
      />
    </svg>
  );
}

/* Continuous rising bubbles inside the beer */
function Bubbles({ isPlaying }: { isPlaying: boolean }) {
  // Predefined bubble definitions for variety and seamlessness.
  // Each has its own phase so when cycle restarts it still feels organic.
  const bubbleDefs = [
    { x: 88, size: 2.8, delay: 0.0, duration: 1.65, drift: 3.5 },
    { x: 109, size: 1.9, delay: 0.7, duration: 1.35, drift: -2.8 },
    { x: 131, size: 3.4, delay: 1.4, duration: 2.05, drift: 4.2 },
    { x: 96, size: 2.2, delay: 2.1, duration: 1.55, drift: -3.1 },
    { x: 118, size: 1.6, delay: 0.35, duration: 1.9, drift: 2.4 },
    { x: 142, size: 2.6, delay: 2.85, duration: 1.75, drift: -4.0 },
    { x: 83, size: 3.1, delay: 3.6, duration: 2.2, drift: 5.1 },
    { x: 124, size: 1.4, delay: 1.1, duration: 1.45, drift: -1.9 },
    { x: 103, size: 2.4, delay: 4.2, duration: 1.8, drift: 3.8 },
    { x: 148, size: 2.0, delay: 0.9, duration: 2.35, drift: -3.6 },
    { x: 91, size: 1.7, delay: 5.0, duration: 1.6, drift: 2.9 },
  ];

  return (
    <g>
      {bubbleDefs.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={232} // near bottom
          r={b.size}
          fill="#FFF7E0"
          opacity={0.65}
          animate={
            isPlaying
              ? {
                  cy: [232, 82], // rise from near bottom to near top of beer
                  cx: [b.x, b.x + b.drift],
                  opacity: [0.0, 0.72, 0.72, 0.0],
                }
              : { cy: 232, opacity: 0.4 }
          }
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: isPlaying ? Infinity : 0,
            repeatType: "loop",
            ease: [0.32, 0.02, 0.25, 0.98],
          }}
        />
      ))}
    </g>
  );
}

/* Creamy foam head with build + gentle natural wobble/settle */
function FoamHead({
  isPlaying,
  fillDuration,
  settleStart,
}: {
  isPlaying: boolean;
  fillDuration: number;
  settleStart: number;
}) {
  // Foam is positioned relative to the top of the beer fill.
  // We use a combination of a soft rect + floating micro-bubbles inside foam.
  return (
    <g>
      {/* Main foam body - builds during pour then settles */}
      <motion.g
        animate={
          isPlaying
            ? {
                // y moves upward (less negative) as foam builds, then tiny wobble
                y: [26, 4, 7, 3.5, 6.5, 4],
              }
            : { y: 7 }
        }
        transition={{
          duration: fillDuration + 3.4,
          ease: [0.2, 1, 0.3, 1],
          repeat: isPlaying ? Infinity : 0,
          times: [0, 0.42, 0.58, 0.71, 0.86, 1],
        }}
      >
        {/* Foam pillow shape - slightly irregular for realism */}
        <motion.ellipse
          cx="120"
          cy="68"
          rx="47"
          ry="15"
          fill="url(#foamGrad)"
          animate={isPlaying ? { ry: [4, 15.5, 14, 15, 14.2] } : { ry: 14 }}
          transition={{
            duration: fillDuration + 2.2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeOut",
          }}
        />
        {/* Second layer for creamy texture / depth */}
        <ellipse cx="120" cy="66" rx="39" ry="9" fill="#F8F1E3" opacity="0.7" />
      </motion.g>

      {/* Delicate foam bubbles / lacing texture that wobbles naturally */}
      <motion.g
        animate={
          isPlaying
            ? {
                y: [26, 4, 7, 3.5, 6.5, 4],
              }
            : { y: 7 }
        }
        transition={{
          duration: fillDuration + 3.4,
          ease: [0.2, 1, 0.3, 1],
          repeat: isPlaying ? Infinity : 0,
          times: [0, 0.42, 0.58, 0.71, 0.86, 1],
        }}
      >
        {[
          { cx: 88, cy: 61, r: 3.2 },
          { cx: 102, cy: 57, r: 2.1 },
          { cx: 119, cy: 54, r: 3.8 },
          { cx: 137, cy: 59, r: 2.5 },
          { cx: 152, cy: 64, r: 2.9 },
          { cx: 95, cy: 69, r: 1.8 },
          { cx: 128, cy: 70, r: 2.3 },
        ].map((fb, idx) => (
          <motion.circle
            key={idx}
            cx={fb.cx}
            cy={fb.cy}
            r={fb.r}
            fill="#FFFFFF"
            opacity={0.65}
            animate={
              isPlaying
                ? {
                    cy: [fb.cy + 18, fb.cy - 1, fb.cy + 3, fb.cy - 0.5],
                    r: [fb.r * 0.6, fb.r, fb.r * 0.85, fb.r],
                  }
                : {}
            }
            transition={{
              duration: 2.8 + idx * 0.07,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
              delay: 4.8 + idx * 0.03,
            }}
          />
        ))}
      </motion.g>
    </g>
  );
}

/* Animated pour stream from "tap" into glass during fill phase */
function PourStream({ isPlaying }: { isPlaying: boolean }) {
  return (
    <g>
      {/* The stream — thin, slightly irregular golden line that "pours" */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={
          isPlaying
            ? {
                opacity: [0, 0.9, 0.95, 0, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 4.9,
          repeat: isPlaying ? Infinity : 0,
          times: [0, 0.08, 0.38, 0.47, 1],
          ease: "easeInOut",
        }}
      >
        {/* Main pour column */}
        <motion.line
          x1="120"
          y1="8"
          x2="120"
          y2="52"
          stroke="#E8A84B"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={
            isPlaying
              ? {
                  y2: [18, 52, 52],
                  strokeWidth: [2.2, 3.8, 1.5],
                }
              : {}
          }
          transition={{
            duration: 4.6,
            repeat: isPlaying ? Infinity : 0,
            times: [0, 0.42, 1],
            ease: [0.2, 0.9, 0.3, 1],
            repeatDelay: 5.6,
          }}
        />
        {/* Secondary highlight on stream */}
        <motion.line
          x1="118"
          y1="12"
          x2="118"
          y2="50"
          stroke="#FFF7E0"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
          animate={
            isPlaying
              ? {
                  y2: [22, 50, 50],
                }
              : {}
          }
          transition={{
            duration: 4.6,
            repeat: isPlaying ? Infinity : 0,
            times: [0, 0.42, 1],
            ease: [0.2, 0.9, 0.3, 1],
            repeatDelay: 5.6,
          }}
        />
      </motion.g>
    </g>
  );
}

/* Beautiful static version shown when user prefers reduced motion */
function StaticPremiumGlass() {
  return (
    <svg viewBox="0 0 240 320" className="w-full drop-shadow-2xl" aria-hidden="true">
      <defs>
        <linearGradient id="beerStatic" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4C16B" />
          <stop offset="38%" stopColor="#E8A84B" />
          <stop offset="72%" stopColor="#C67D2E" />
          <stop offset="100%" stopColor="#A15E1F" />
        </linearGradient>
        <linearGradient id="foamStatic" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8F1E3" />
          <stop offset="55%" stopColor="#EDE0C8" />
          <stop offset="100%" stopColor="#D9C9A8" />
        </linearGradient>
        <clipPath id="glassClipStatic">
          <path d="M72 58 Q120 52 168 58 L170 262 Q120 272 70 262 Z" />
        </clipPath>
      </defs>

      {/* Glass */}
      <path d="M68 54 Q120 46 172 54 L175 265 Q120 278 65 265 Z" fill="none" stroke="#C5B8A8" strokeWidth="18" strokeLinejoin="round" />
      <path d="M74 60 Q120 54 166 60 L168 260 Q120 270 72 260 Z" fill="none" stroke="#EDE6D9" strokeWidth="2.5" opacity="0.35" />

      {/* Full beautiful beer */}
      <g clipPath="url(#glassClipStatic)">
        <rect x="70" y="72" width="100" height="148" fill="url(#beerStatic)" />
        <rect x="71" y="70" width="98" height="4" fill="#FFF7E0" opacity="0.45" />
      </g>

      {/* Gorgeous settled foam */}
      <ellipse cx="120" cy="71" rx="47" ry="14" fill="url(#foamStatic)" />
      <ellipse cx="120" cy="69" rx="39" ry="8" fill="#F8F1E3" opacity="0.65" />
      
      {/* Foam bubbles */}
      <circle cx="88" cy="64" r="3.1" fill="#FFFFFF" opacity="0.6" />
      <circle cx="119" cy="59" r="3.6" fill="#FFFFFF" opacity="0.55" />
      <circle cx="137" cy="65" r="2.3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="102" cy="60" r="2" fill="#FFFFFF" opacity="0.5" />
      <circle cx="152" cy="68" r="2.7" fill="#FFFFFF" opacity="0.45" />

      {/* Rim */}
      <ellipse cx="120" cy="58" rx="52" ry="8" fill="none" stroke="#EDE6D9" strokeWidth="7" opacity="0.6" />
      <ellipse cx="120" cy="57" rx="48" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35" />

      {/* Subtle hops */}
      <g opacity="0.22">
        <path d="M18 68 Q22 61 27 66 Q32 72 29 79 Q24 84 20 77 Q17 72 18 68" fill="#3F2A1F" />
        <path d="M205 92 Q210 85 216 90 Q222 96 218 102 Q212 106 209 99 Q206 94 205 92" fill="#3F2A1F" />
      </g>
    </svg>
  );
}
