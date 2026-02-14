# Protect the Birthplace — Goa's Trance Heritage

A museum-style documentary website advocating for the cultural preservation of Goa's trance music heritage. The site positions Goa trance within the framework of Sanatan Dharma and Indian spiritual philosophy, backed by scientific research and historical evidence, to make a compelling case to government officials and policymakers.

**Live Site:** [Deploy on Netlify or Replit]

---

## Table of Contents

- [About the Project](#about-the-project)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Notable Figures](#notable-figures)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

Goa has been the birthplace of an entire genre of electronic music — Goa trance — which emerged from the convergence of 1960s counterculture, Indian spirituality, and electronic music technology. This website documents that heritage across a timeline spanning the 1960s to 2026 and makes the case for formal cultural preservation, drawing parallels to Berlin's successful recognition of techno as intangible cultural heritage.

The site is designed to appeal to policymakers and government officials, not just music fans. It frames Goa trance through:

- **Sanatan Dharma connections** — Nada Brahma (sound as creation), dhyana (meditation/flow states), raga structures
- **Scientific evidence** — 8 peer-reviewed citations covering neuroscience, musicology, anthropology, and UNESCO heritage frameworks
- **Economic data** — Tourism revenue, festival economics, cultural export value
- **Historical precedent** — Berlin techno's recognition as Germany's intangible cultural heritage (March 2024)

---

## Pages

### 1. Home (`/`)
Timeline documentary with an animated hero section, 8 chronological chapters (1960s to 2026), interactive data charts, a 3D WebGL globe showing the global diaspora of Goa trance, and key figure chips linking to the Culture page.

### 2. Culture & Heritage (`/culture`)
Deep exploration of Goa trance's roots in Indian spiritual traditions:
- **Nada Brahma parallels** — Sound-as-creation philosophy connecting Vedic traditions to electronic music
- **East-West fusion timeline** — How Indian and Western musical traditions converged
- **7 Living Tradition tabs** — Dance & Ritual, Sound Design, Communal Living, Spiritual Practice, Visual Culture, Flow States, Art & Craft
- **Scientific evidence section** — 8 peer-reviewed research citations
- **Notable Figures** — 21 key people across 3 eras (Pioneers, Architects, Global Wave) with external links
- **India's Cultural Exports** — Animated counters showing global reach

### 3. Data Sources & Methodology (`/evidence`)
Transparency and credibility section featuring:
- Charts gallery with modal zoom
- 6 data source categories (Goa Tourism, Economic Dependence, Global Festivals, Historical & Cultural Origins, Regulatory & Policy Context, Cultural Heritage Precedents)
- Hard data vs modeled estimates distinction
- Methodology and assumptions documentation
- Defensibility statement
- Full bibliography with 37 entries and real source URLs

### 4. The Case for Preservation (`/case`)
Structured preservation plan with 5 pillars presented in an accordion format.

### 5. Media & Press Kit (`/media`)
Press resources, social media templates, and downloadable assets for advocacy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | wouter (client-side) |
| UI Components | shadcn/ui (Button, Card, Accordion, Dialog) |
| 3D Globe | react-globe.gl (WebGL/Three.js) |
| Charts | Recharts |
| Backend | Express (static file serving only) |
| Deployment | Netlify / Replit |

No database is required — this is a static content site.

---

## Project Structure

```
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AskAccordion.tsx      # 5 pillars of preservation
│   │   │   ├── Charts.tsx            # Recharts data visualizations
│   │   │   ├── ChartCard.tsx         # Chart display with modal zoom
│   │   │   ├── ChartModal.tsx        # Fullscreen chart modal
│   │   │   ├── Footer.tsx            # CTA + share buttons + contact
│   │   │   ├── Globe.tsx             # react-globe.gl 3D visualization
│   │   │   ├── MobileCTA.tsx         # Bottom sticky petition button
│   │   │   ├── MobileProgress.tsx    # Mobile top progress bar
│   │   │   ├── Navbar.tsx            # Sticky nav with mobile hamburger
│   │   │   ├── ScrollReveal.tsx      # Framer Motion scroll wrapper
│   │   │   ├── SubTimeline.tsx       # Chapter milestone sub-timeline
│   │   │   ├── TimelineDots.tsx      # Timeline navigation dots
│   │   │   ├── TimelineRail.tsx      # Desktop vertical timeline rail
│   │   │   └── ui/                   # shadcn/ui base components
│   │   ├── hooks/
│   │   │   └── use-toast.ts
│   │   ├── lib/
│   │   │   ├── constants.ts          # All site data and configuration
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── home.tsx              # Timeline documentary (8 chapters)
│   │   │   ├── culture.tsx           # Culture & Heritage deep dive
│   │   │   ├── evidence.tsx          # Data sources & methodology
│   │   │   ├── case.tsx              # Preservation plan
│   │   │   ├── media.tsx             # Press kit & assets
│   │   │   └── not-found.tsx
│   │   ├── App.tsx                   # Router and layout
│   │   └── index.css                 # Tailwind + custom styles
│   └── index.html
├── server/
│   ├── index.ts                      # Express server entry
│   ├── routes.ts                     # API routes (minimal)
│   └── vite.ts                       # Vite dev middleware
├── shared/
│   └── schema.ts                     # Shared types
├── netlify.toml                      # Netlify deployment config
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json
└── package.json
```

---

## Key Features

### Interactive Timeline
8 chronological chapters with a vertical timeline rail (desktop) and progress bar (mobile). Each chapter includes expandable sub-milestones with dates and descriptions.

### 3D Globe Visualization
WebGL-powered interactive globe (via react-globe.gl) showing arc connections from Goa to 6 global destinations, demonstrating the cultural diaspora. Includes a graceful fallback for devices without WebGL support.

### Scientific Evidence Cards
8 research citations from peer-reviewed sources covering:
- **Neuroscience** — Rhythmic entrainment, endocannabinoid release
- **Musicology** — Drone structures, Indian classical parallels
- **Anthropology** — Communal dance rituals, social bonding
- **Cultural Heritage** — UNESCO ICH frameworks

### Notable Figures Section
21 historically significant people organized by era:
- **Pioneers (1960s–80s):** Eight Finger Eddie, Goa Gil, DJ Laurent, Fred Disko, Charanjit Singh
- **Architects (1990s):** Youth, Raja Ram, Simon Posford, Paul Oakenfold, Astral Projection, Juno Reactor, Steve D'Souza, Shpongle, Tsuyoshi Suzuki, Man With No Name, Mark Allen, Transwave, Electric Universe
- **Global Wave (2000s+):** Infected Mushroom, Astrix, Vini Vici

Each entry includes external links to Wikipedia, Discogs, or official sites.

### Cross-Page Navigation
"Key Figures" chips on Home page timeline chapters link directly to the Culture page's Notable People section, creating narrative flow between the timeline and biographical content.

### Data Transparency
Full methodology disclosure with 37 bibliography entries, distinction between hard data and modeled estimates, and real source URLs from Herald Goa, Scroll.in, RDX Goa, and academic publications.

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
git clone <repository-url>
cd goa-trance-heritage
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5000`.

### Production Build

```bash
npx vite build
```

Static files are output to `dist/public/`.

---

## Deployment

### Netlify (Recommended for Static Hosting)

1. Push this repository to GitHub
2. Connect your GitHub repo to [Netlify](https://app.netlify.com)
3. Netlify will auto-detect the `netlify.toml` configuration:
   - **Build command:** `npx vite build`
   - **Publish directory:** `dist/public`
   - **Node version:** 20
4. SPA redirect rules are pre-configured for client-side routing
5. Deploy automatically on every push to `main`

### Replit

1. Click the "Publish" button in Replit
2. Replit handles build, hosting, SSL, and provides a `.replit.app` URL
3. Optional: Connect a custom domain

---

## Data Sources

The site references data from the following categories:

| Category | Example Sources |
|----------|----------------|
| Goa Tourism | Goa Tourism Department, WTTC reports |
| Economic Dependence | Herald Goa, Travel and Tour World |
| Global Festivals | IMS Business Report, IFPI Global Music Report |
| Historical & Cultural Origins | Wikipedia, Discogs, academic papers |
| Regulatory & Policy Context | Gomantak Times, RDX Goa, Scroll.in |
| Cultural Heritage Precedents | UNESCO ICH, German Cultural Heritage documentation |

Full bibliography with 37 entries available on the [Evidence page](/evidence).

---

## Design Philosophy

- **Museum/heritage aesthetic** — No neon or rave visuals; clean, authoritative presentation
- **Off-white/paper background** with charcoal text and muted blue-green accent
- **Inter font family** for readability
- **Subtle animations** — Framer Motion fade-up and scroll reveal effects
- **Mobile-first responsive** — Full mobile support with adapted navigation and progress indicators
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation support

---

## Contributing

Contributions are welcome. If you have historical corrections, additional sources, or suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-source`)
3. Commit your changes (`git commit -m 'Add new historical source'`)
4. Push to the branch (`git push origin feature/add-source`)
5. Open a Pull Request

Please ensure any factual claims are backed by verifiable sources.

---

## License

This project is open source. Content is provided for educational and cultural preservation purposes.

---

## Acknowledgments

This project documents the work and legacy of the Goa trance community — the DJs, producers, venue owners, and travelers who created a unique cultural movement at the intersection of Indian spirituality and electronic music. Special recognition to the 21 notable figures documented on the site whose contributions shaped this heritage.
