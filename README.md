# Beer Buddy

Beautiful, premium, mobile-first web app that lets you type what you’re eating and instantly receive the top 3 best beer pairings — with thoughtful, flavor-science-backed explanations.

## Features

- **Signature Animated Pour** — elegant looping SVG + Framer Motion beer glass (8–12s seamless cycle, realistic bubbles, creamy foam with natural wobble, subtle hops). Pauses on hover/tap, “Pour again”, fully respects reduced motion.
- **Instant AI Pairings** — two-stage LLM pipeline (meal → structured profile, then grounded top-3 selection from 55 curated real beers).
- **Premium mobile experience** — large tap targets, buttery interactions, beautiful cards, no layout shift, excellent on every breakpoint.
- **Warm beer-inspired design** — deep amber, rich browns, cream, charcoal + gold accents. Generous whitespace, confident typography.
- **Graceful degradation** — works beautifully even without API keys (curated demo pairings).

## Tech

- Next.js 16 (App Router) + TypeScript + Tailwind
- Framer Motion
- OpenAI SDK (xAI Grok preferred via `XAI_API_KEY`, falls back to OpenAI-compatible)
- Zod validation + excellent engineered prompts
- Sonner toasts

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` (see `.env.example`):

```
XAI_API_KEY=your_xai_key
# or
OPENAI_API_KEY=sk-...
```

Then open http://localhost:3000

## Deployment

Vercel-ready. Add the same env vars in your project settings. Push to main — deploys automatically.

## Philosophy

Every detail is considered: the micro-interactions, the touch targets, the copy, the animation timings, the fallback quality. It should feel like a small luxury.

Drink responsibly.
