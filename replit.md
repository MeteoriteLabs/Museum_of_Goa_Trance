# Protect the Birthplace — Goa's Trance Heritage

## Overview
An open-source, non-profit museum/heritage-style website documenting Goa's trance heritage as a public-interest cultural preservation initiative. The site follows a timeline documentary format across 6 pages.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Routing**: wouter (client-side)
- **UI Components**: shadcn/ui (Button, Card, Accordion, Dialog)
- **3D Globe**: react-globe.gl (WebGL/Three.js) with WebGL detection fallback
- **Backend**: Express (serves static frontend, no API needed)
- **No database required** — this is a static content site

## Pages
1. `/` — Home: Timeline documentary with hero, 8 chapters, charts, globe visualization
2. `/experience` — Experience: Immersive full-screen WebGL fluid animation with mouse/touch interaction, rotating quotes, ambient audio toggle, key stats, and petition CTA
3. `/culture` — Culture & Heritage: Sanatan Dharma connections (Nada Brahma parallels, East-West fusion timeline, 7 living tradition tabs including Flow States & Art/Craft, scientific evidence section with 8 peer-reviewed citations, era-tabbed Notable Figures section with 15 key people and external links, India's cultural exports with animated counters)
4. `/evidence` — Data Sources & Methodology: charts gallery, data sources by category, hard data vs modeled estimates, methodology & assumptions, defensibility statement, full bibliography with real source URLs
5. `/case` — Preservation plan with 5 pillars
6. `/media` — Press kit, social templates, downloadable assets

## Key Components
- `Navbar` — Sticky nav with mobile hamburger, shrink-on-scroll effect
- `MobileCTA` — Bottom sticky petition button on mobile
- `TimelineRail` — Desktop vertical timeline with active section tracking, entrance animation
- `MobileProgress` — Mobile top progress bar with entrance animation
- `StaggerReveal` — StaggerContainer/StaggerItem for staggered card animations
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
- Subtle Framer Motion animations (fade-up, scroll reveal, page transitions, parallax heroes, staggered cards)

## Recent Changes
- Added "Why Now" section as the first entry in the home page timeline (before Chapter 1) — includes brief Goa birthplace content, 3-column visual comparison card (Detroit → Berlin → Goa) showing heritage precedent, urgency bullet points, and "THE BIRTHPLACE" highlighted label on Goa card
- Restructured timeline from 7 to 8 chapters: split old Ch5 (2017–2025) into Ch5 (2010s–20s: Regulatory Pressure Builds) and Ch6 (2020–2026: Crisis & Response); renumbered Detroit/Berlin → Ch7, The Ask → Ch8
- Added "Initiative for Museum of Goa Trance, February 2026" as highlighted milestone in new Chapter 6
- Added 40+ factual sub-milestones across all 8 chapters via new SubTimeline component and CHAPTER_MILESTONES data in constants.ts
- Created SubTimeline component (client/src/components/SubTimeline.tsx) — vertical timeline with dots, years, titles, descriptions
- Enriched all chapter narratives with researched historical content (Eight Finger Eddie, Goa Gil, record labels, festivals, regulations)
- Fixed Berlin techno heritage status throughout — correctly referenced as Germany's National Inventory of Intangible Cultural Heritage (March 2024), not UNESCO's global Representative List
- Updated Chapter 4 era label from "2010s" to "2000s–10s"
- Updated Evidence page with comprehensive Data Sources & Methodology — 37 bibliography entries, 6 data source categories (Goa Tourism, Economic Dependence, Global Festivals, Historical & Cultural Origins, Regulatory & Policy Context, Cultural Heritage Precedents), real news source URLs (Herald Goa, Scroll.in, RDX Goa, Music Ally, Travel and Tour World, Gomantak Times), Wikipedia, Discogs, documentary links, and label sites
- Expanded Notable Figures from 15 to 21 people: added Charanjit Singh (Indian electronic pioneer, 1982), Tsuyoshi Suzuki (Matsuri Productions), Man With No Name (Martin Freeland), Mark Allen (Return to the Source), Transwave (French duo), Electric Universe (German duo)
- Fixed timeline State Action Plan date from 2022 to March 2024 based on Herald Goa reporting
- Merged UNESCO/ICH content into Chapter 7 (Detroit to Berlin, formerly Ch6) — includes Berlin precedent timeline, 4-step pathway for Goa
- Replaced canvas-based globe with react-globe.gl in Chapter 3 (Global Diaspora)
- Added AnimatePresence page transitions between routes (fade effect)
- Added parallax scroll effect on hero images (Home, Case, Culture pages)
- Added navbar shrink-on-scroll behavior (padding/logo reduce after 50px scroll)
- Added entrance animations to TimelineRail (slide-in) and MobileProgress (fade-down)
- Created StaggerReveal component (StaggerContainer/StaggerItem) for staggered card animations
- Applied staggered animations to Case page quick facts and "Why it Matters" cards
- Fixed tablet responsiveness: Home page left padding (lg:pl-28 xl:pl-36), Case hero min-height, Evidence chart grid (2-col), Footer mobile spacer (h-20), Media download card min-w-0
