# Protect the Birthplace — Goa's Trance Heritage

## Overview
A museum/heritage-style website documenting Goa's trance heritage as a cultural preservation initiative. The site follows a timeline documentary format across 4 pages.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Routing**: wouter (client-side)
- **UI Components**: shadcn/ui (Button, Card, Accordion, Dialog)
- **3D Globe**: react-globe.gl (WebGL/Three.js) with WebGL detection fallback
- **Backend**: Express (serves static frontend, no API needed)
- **No database required** — this is a static content site

## Pages
1. `/` — Home: Timeline documentary with hero, 7 chapters, charts, globe visualization
2. `/evidence` — Data Sources & Methodology: charts gallery, data sources by category, hard data vs modeled estimates, methodology & assumptions, defensibility statement, full bibliography with real source URLs
3. `/case` — Preservation plan with 5 pillars
4. `/media` — Press kit, social templates, downloadable assets

## Key Components
- `Navbar` — Sticky nav with mobile hamburger
- `MobileCTA` — Bottom sticky petition button on mobile
- `TimelineRail` — Desktop vertical timeline with active section tracking
- `MobileProgress` — Mobile top progress bar
- `ChartCard` / `ChartModal` — Chart display with modal zoom
- `Globe` — react-globe.gl 3D globe with arcs from Goa to 6 destinations (with WebGL fallback)
- `AskAccordion` — 5 pillars of preservation
- `ScrollReveal` — Framer Motion scroll animation wrapper
- `Footer` — CTA + share buttons + contact

## Config
All site constants in `client/src/lib/constants.ts` (petition link, socials, timeline data, etc.)

## Running
```
npm run dev
```

## Design
- Off-white/paper background, charcoal text, muted blue-green accent
- Inter font family
- Museum/heritage aesthetic — no neon/rave visuals
- Subtle Framer Motion animations (fade-up, scroll reveal)

## Recent Changes
- Added 40+ factual sub-milestones across all 7 chapters via new SubTimeline component and CHAPTER_MILESTONES data in constants.ts
- Created SubTimeline component (client/src/components/SubTimeline.tsx) — vertical timeline with dots, years, titles, descriptions
- Enriched all chapter narratives with researched historical content (Eight Finger Eddie, Goa Gil, record labels, festivals, regulations)
- Fixed Berlin techno heritage status throughout — correctly referenced as Germany's National Inventory of Intangible Cultural Heritage (March 2024), not UNESCO's global Representative List
- Updated Chapter 4 era label from "2010s" to "2000s–10s"
- Updated Evidence page with comprehensive Data Sources & Methodology from official document
- Merged UNESCO/ICH content into Chapter 6 (Detroit to Berlin) — includes Berlin precedent timeline, 4-step pathway for Goa
- Replaced canvas-based globe with react-globe.gl in Chapter 3 (Global Diaspora)
