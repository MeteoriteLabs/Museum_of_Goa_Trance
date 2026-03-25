# 🎧 Museum of Goa Trance

<p align="center">
  <strong>Protect the Birthplace — Preserve Goa's Trance Heritage</strong><br/>
  Open-source • Non-profit • Cultural preservation initiative
</p>

<p align="center">
  <a href="#-mission">Mission</a> •
  <a href="#-project-highlights">Highlights</a> •
  <a href="#-pages">Pages</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌍 Mission

**Museum of Goa Trance** is an open-source, non-profit digital museum and advocacy platform documenting Goa trance as living cultural heritage.

The project brings together:
- **History** — a timeline from the 1960s to 2026
- **Culture** — links to Indian spiritual and artistic traditions
- **Evidence** — transparent sources, references, and methodology
- **Policy context** — a structured case for preservation

Our goal is to support **public understanding, responsible preservation, and cultural recognition**.

---

## ✨ Project Highlights

- 🧭 **Museum-style narrative experience** (not a commercial nightlife portal)
- 📚 **Evidence-first structure** with methodology and bibliography
- 🌐 **Global diaspora visualization** with an interactive 3D globe
- 🧠 **Science + heritage framing** (musicology, anthropology, neuroscience)
- 🏛️ **Policy-ready storytelling** for institutions, researchers, press, and community members

---

## 🗺️ Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Timeline documentary with 8 chapters, charts, globe, and key figure links |
| `/culture` | Culture & Heritage | Spiritual, artistic, and social roots of Goa trance |
| `/evidence` | Data Sources & Methodology | Evidence catalog, assumptions, bibliography |
| `/case` | The Case for Preservation | Structured preservation framework and recommendations |
| `/media` | Media & Press Kit | Reusable media resources and outreach assets |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | wouter |
| UI Components | shadcn/ui |
| Data Viz | Recharts |
| 3D Visualization | react-globe.gl (WebGL/Three.js) |
| Backend | Express (static serving) |
| Deployment | Netlify / Replit |

> This project is content-focused and does **not require a database**.

---

## 📁 Project Structure

```text
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/constants.ts   # Primary content/config source
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
├── server/
│   ├── index.ts
│   ├── routes.ts
│   └── vite.ts
├── shared/
├── netlify.toml
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Install

```bash
git clone <repository-url>
cd Museum_of_Goa_Trance
npm install
```

### Run locally

```bash
npm run dev
```

App runs at: `http://localhost:5000`

### Production build

```bash
npm run build
```

---

## 🌐 Deployment

### Netlify
1. Push repository to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist/public`

### Replit
1. Import/open project in Replit
2. Use **Publish**
3. Optionally connect custom domain

---

## 🤝 Contributing

Contributions are welcome and encouraged.

### Great contributions include:
- Historical corrections with credible citations
- Additional references and bibliography improvements
- Accessibility and UX enhancements
- Translation and localization support
- Code quality and performance improvements

### Basic flow
1. Fork the repo
2. Create a branch (`feature/my-change`)
3. Commit with a clear message
4. Open a Pull Request with context and sources

---

## 🕊️ Non-Profit & Open-Source Commitment

This repository is maintained as a **non-profit public-interest cultural preservation initiative**.

- **No commercial objective**: no product sales, no growth-hacking agenda
- **Open collaboration**: community, artists, archives, scholars, and developers are welcome
- **Evidence-first**: factual claims should be verifiable
- **Respectful stewardship**: avoid sensationalism, erasure, or cultural misrepresentation

If you represent an archive, venue, label, artist collective, or institution, we welcome collaboration via Issues and PRs.

---

## 📜 License

- **Code**: MIT License
- **Content**: Educational and cultural preservation use; reuse should keep attribution and factual integrity

---

## 🙏 Acknowledgments

With respect to the Goa trance community — artists, DJs, organizers, venue teams, local workers, researchers, and cultural custodians — whose living history shaped this movement.
