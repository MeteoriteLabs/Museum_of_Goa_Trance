export const PETITION_LINK = "https://www.change.org/p/protect-goa-s-trance-heritage-birthplace-of-a-global-music-culture";
export const CONTACT_EMAIL = "museumofgoatrance@gmail.com";
export const SOCIAL_IG = "https://www.instagram.com/museumofgoatrance?igsh=MW9sOWY5cTNrd25tdQ==";
export const SOCIAL_X = "https://x.com/PLACEHOLDER";

export const TIMELINE_ERAS = [
  { label: "1960s\u201370s", id: "chapter-1" },
  { label: "1980s", id: "chapter-2" },
  { label: "1990s\u20132000s", id: "chapter-3" },
  { label: "2000s\u201310s", id: "chapter-4" },
  { label: "2010s\u201320s", id: "chapter-5" },
  { label: "2020\u20132026", id: "chapter-6" },
  { label: "Precedent", id: "chapter-7" },
  { label: "The Ask", id: "chapter-8" },
];

export interface SubMilestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const CHAPTER_MILESTONES: Record<string, SubMilestone[]> = {
  "chapter-1": [
    { year: "Mid-1960s", title: "Eight Finger Eddie Discovers Anjuna", description: "Yertward Mazamanian, an American hippie of Armenian descent, arrives at Anjuna Beach and establishes the first communal gathering point. His house in South Anjuna becomes the focal point for incoming travelers and musicians." },
    { year: "Late 1960s", title: "Goa Joins the Hippie Trail", description: "Goa becomes a key destination on the overland Hippie Trail from Europe through Turkey, Iran, and Afghanistan to South Asia. Travelers are drawn by the beaches, low cost of living, and spiritual openness." },
    { year: "1969", title: "Goa Gil Arrives in Goa", description: "Gilbert Levey, later known as Goa Gil, arrives at age 18 after traveling from San Francisco via the Hippie Trail. He stays at Eight Finger Eddie\u2019s house before embarking on a spiritual journey across India, eventually becoming a Sadhu.", highlight: true },
    { year: "Early 1970s", title: "Full Moon Parties Begin", description: "Informal full moon gatherings emerge on Goa\u2019s beaches, blending Western psychedelic rock with Eastern spirituality. Artists and musicians from around the world converge for campfire sessions featuring Pink Floyd, Grateful Dead, and Led Zeppelin." },
    { year: "~1973\u201374", title: "Hilltop Founded in Vagator", description: "Steve D\u2019Souza opens a small roadside restaurant on a hilltop between Vagator and Anjuna beaches. The first Hilltop New Year\u2019s party is held in 1974, launching what would become one of Goa\u2019s most iconic and enduring cultural venues \u2014 still operating over 50 years later.", highlight: true },
    { year: "1975", title: "Anjuna Flea Market Founded", description: "Eight Finger Eddie starts the Anjuna Flea Market as a barter platform for traveling hippies. It becomes a cultural hub connecting travelers, locals, and artisans \u2014 and still operates today.", highlight: true },
    { year: "1979", title: "First Electronic Music in Goa", description: "Kraftwerk tracks are played for the first time on Goa\u2019s beaches by visiting DJs, marking the earliest shift from acoustic rock to electronic sounds. This pivotal moment planted the seed for the genre that would follow.", highlight: true },
  ],
  "chapter-2": [
    { year: "1983", title: "The Electronic Switch", description: "Goa Gil, DJ Laurent, and Fred Disko transition from psychedelic rock to electronic music, introducing EBM (Electronic Body Music), acid house, and industrial sounds to the beach party circuit.", highlight: true },
    { year: "Mid-1980s", title: "Trance Dance as Active Meditation", description: "Goa Gil develops the philosophy of \u201Ctrance dance as active meditation,\u201D framing all-night DJ sets as spiritual journeys from darkness to light. Music becomes more than entertainment \u2014 it becomes ritual." },
    { year: "Mid-1980s", title: "Custom Mix Culture Emerges", description: "DJs begin creating unique sets by looping melodies, removing vocals, and extending tracks. Artists like Front 242 and Nitzer Ebb influence the evolving sound alongside emerging acid house from Europe." },
    { year: "Late 1980s", title: "Party Circuit Established", description: "Regular party venues emerge across North Goa \u2014 Bamboo Forest (Anjuna), Disco Valley (Vagator), Hilltop (Vagator), and beaches in Arambol. The Goa party circuit becomes a seasonal institution attracting international travelers. Hilltop, founded as a restaurant in the early 1970s, evolves into a key electronic music venue." },
    { year: "Late 1980s", title: "Goa Gil\u2019s Music House", description: "Goa Gil founds the Music House in Vagator, a rehearsal and party hub hosting up to 20 musicians. Bands like the Anjuna Jam Band form here, bridging the rock era with the electronic future." },
  ],
  "chapter-3": [
    { year: "1990", title: "First Goa-Style Party Outside India", description: "On December 16, the first Goa-style party is held in London. This event later gives rise to TIP Records and marks the beginning of Goa trance\u2019s international spread.", highlight: true },
    { year: "1992", title: "Goa Trance Gains Its Own Identity", description: "The scene establishes an independent musical identity. Parties at Bamboo Forest, Disco Valley, and across Anjuna attract global attention. The genre begins to crystallise as something distinct from techno or house." },
    { year: "1993", title: "First Dedicated Labels Founded", description: "Dragonfly Records is established by Youth (Martin Glover of Killing Joke) at Butterfly Studios in Brixton, London \u2014 the first label dedicated to the Goa trance sound. The first Goa trance album, Project II Trance, is released.", highlight: true },
    { year: "1994", title: "Global Mainstream Recognition", description: "Paul Oakenfold\u2019s BBC Radio 1 \u201CGoa Mix\u201D (Essential Mix) brings the genre to millions. TIP Records is officially founded by Raja Ram. The term \u201CGoa trance\u201D becomes widely used. The golden age begins.", highlight: true },
    { year: "1995", title: "Documentaries Air Worldwide", description: "Channel 4 broadcasts the documentary Goa Trance, featuring TIP Records pioneers and Hallucinogen. A second documentary, Psychedelic Trance: Music Is My Drug, traces the genre\u2019s spread to Israel, the UK, and Japan." },
    { year: "1996\u201397", title: "Commercial Peak of Goa Trance", description: "The genre reaches its zenith with artists like Astral Projection, Juno Reactor, Hallucinogen, and Man With No Name. Key labels \u2014 TIP, Dragonfly, Flying Rhino, Transient, Matsuri \u2014 release landmark albums. Tempo ranges from 130\u2013150 BPM." },
    { year: "1997", title: "Boom Festival Launches in Portugal", description: "The first edition of Boom Festival is held at Herdade do Zambujal, Aguas de Moura, directly inspired by Goa\u2019s beach parties. It would grow into one of the world\u2019s largest transformational festivals, attracting 40,000+ attendees from 150+ countries.", highlight: true },
    { year: "1997\u201398", title: "Genre Evolves into Psytrance", description: "Matsuri Productions declares the \u201Ccommercial death\u201D of Goa trance. The sound evolves into psychedelic trance (psytrance) \u2014 faster tempos, more complex rhythms, and digital production tools. The cultural DNA of Goa remains at its core." },
    { year: "2000", title: "India\u2019s Noise Pollution Rules Enacted", description: "The Noise Pollution (Regulation and Control) Rules are enacted under the Environment Protection Act, establishing a 10 PM cutoff for amplified music. This begins the regulatory pressure on Goa\u2019s open-air party culture." },
  ],
  "chapter-4": [
    { year: "2003", title: "Neo-Goa Revival Movement", description: "The Neo-Goa (New School Goa) movement begins with Tranceform Records in Finland releasing the first Neo-Goa album, Anima Mundi by Ethereal. Artists return to the melodic aesthetics of classic Goa trance with modern production." },
    { year: "2007", title: "Sunburn Festival Launches in Goa", description: "India\u2019s first commercial EDM festival debuts at Candolim Beach with headliners Carl Cox, Above & Beyond, and Axwell. Sunburn becomes Asia\u2019s largest electronic music festival and a defining element of Goa\u2019s modern music identity.", highlight: true },
    { year: "2009", title: "CNN Top 10 Festival Recognition", description: "CNN ranks Sunburn Festival among the Top 10 festivals in the world, reinforcing Goa\u2019s position as a globally recognised music destination." },
    { year: "2010s", title: "Global Festival Ecosystem Matures", description: "Boom Festival (Portugal) grows to 40,000+ attendees from 150+ countries. Ozora Festival (Hungary) draws ~30,000. Over 35 major psytrance festivals operate globally, all tracing cultural lineage to Goa." },
    { year: "2010s", title: "Psytrance Enters Mainstream EDM", description: "Artists like Vini Vici, Astrix, and Infected Mushroom bring psytrance to mainstream festivals including Tomorrowland, Ultra, and EDC. The Goa-origin sound reaches audiences who may never have heard the term \u201CGoa trance.\u201D" },
    { year: "~2012", title: "Hilltop Festival Launches", description: "Hilltop in Vagator launches its own multi-day psytrance festival, featuring international artists across multiple stages. By 2026, it reaches its 15th edition, becoming one of the few major psytrance festivals still rooted in Goa \u2014 the genre\u2019s birthplace.", highlight: true },
    { year: "2012", title: "Goa Hippie Tribe Documentary", description: "Interactive documentary Goa Hippie Tribe (Darius Devas, SBS) reunites original Goa hippies via social media, documenting the living memory of the scene\u2019s founders." },
  ],
  "chapter-5": [
    { year: "2017", title: "Peak Foreign Arrivals", description: "Goa records approximately 8.9 lakh foreign tourist arrivals, the highest in recent history. This becomes the benchmark against which subsequent decline is measured.", highlight: true },
    { year: "2010s\u201320s", title: "Regulatory Pressure Intensifies", description: "Government crackdowns on unregulated outdoor parties in Goa increase. Police raids, stricter licensing requirements, and noise pollution enforcement disrupt the traditional open-air scene that defined Goa\u2019s cultural identity." },
    { year: "March 2024", title: "Revised State Action Plan for Noise Pollution", description: "The Goa Government notifies a revised State Action Plan under the Noise Pollution Rules, establishing updated enforcement protocols that further constrain cultural event spaces." },
    { year: "2024", title: "Venue Crackdowns in North Goa", description: "North Goa Police register cases against 11+ establishments including prominent venues. Equipment seizures, penalties, and enforcement actions target the remaining cultural infrastructure.", highlight: true },
    { year: "2024", title: "Charter Flight Decline", description: "Charter flights to Goa drop from 266 (in the previous year) to 189 \u2014 a significant decline in the primary channel for high-value international cultural tourists." },
  ],
  "chapter-6": [
    { year: "2025", title: "Sunburn Exits Goa", description: "After nearly two decades, Sunburn Festival relocates to Mumbai due to sound pollution complaints, outstanding payments, and local opposition. India\u2019s largest EDM festival leaving its birthplace signals a turning point.", highlight: true },
    { year: "2025", title: "Foreign Arrivals Continue to Decline", description: "Foreign tourist arrivals drop to approximately 5.17 lakh, down from the 2017 peak of 8.9 lakh. While domestic tourism reaches 1.08 crore, the high-value international cultural segment continues to erode." },
    { year: "2025\u201326", title: "Hilltop Endures as Cultural Anchor", description: "While Sunburn leaves and venues face crackdowns, Hilltop in Vagator continues operating \u2014 hosting its 15th annual festival in February 2026 with international psytrance artists. Founded in the early 1970s, it remains one of the last original cultural venues still active in Goa, representing over 50 years of unbroken heritage." },
    { year: "Feb 2026", title: "Initiative for Museum of Goa Trance", description: "The Museum of Goa Trance initiative launches as a cultural preservation project dedicated to documenting, archiving, and celebrating Goa\u2019s trance heritage. The initiative combines a petition for formal recognition with plans for a dedicated museum and digital archive \u2014 ensuring the birthplace\u2019s story is preserved for future generations.", highlight: true },
  ],
  "chapter-7": [
    { year: "1980s", title: "Techno Originates in Detroit", description: "The techno genre emerges in Detroit, USA through pioneers like Juan Atkins, Derrick May, and Kevin Saunderson. However, lack of structured support and declining infrastructure would later cause its cultural centre to shift." },
    { year: "1989", title: "Berlin Wall Falls", description: "The fall of the Berlin Wall opens abandoned East Berlin industrial spaces. Young people occupy warehouses and factories for raves, giving techno a new home and cultural context." },
    { year: "1991", title: "Tresor Club Opens in Berlin", description: "Tresor, one of the world\u2019s most iconic techno clubs, opens in a former department store vault in East Berlin. It becomes a symbol of Berlin\u2019s emerging techno identity." },
    { year: "2011", title: "Heritage Campaign Begins", description: "Hans Cousto proposes the idea of recognising Berlin\u2019s techno culture as intangible cultural heritage. The campaign would take over a decade to succeed." },
    { year: "Nov 2022", title: "Heritage Application Submitted", description: "Rave The Planet submits an application to recognise Berlin\u2019s techno culture as intangible cultural heritage. The application is revised in May 2023 following feedback from the German UNESCO Commission.", highlight: true },
    { year: "March 2024", title: "Germany\u2019s National ICH Inventory", description: "Berlin\u2019s techno culture is officially inscribed on Germany\u2019s National Inventory of Intangible Cultural Heritage. Dr. Motte (founder of Love Parade) and Rave The Planet lead the recognition after a 13-year campaign originating with Hans Cousto\u2019s 2011 proposal.", highlight: true },
  ],
  "chapter-8": [
    { year: "Oct 2023", title: "Passing of Goa Gil", description: "Goa Gil (Gilbert Levey), widely known as the \u201CGodfather of Goa Trance,\u201D passes away at age 72. His death underscores the urgency of preserving the living memory and cultural heritage he helped create.", highlight: true },
    { year: "2026", title: "This Petition", description: "A formal call for recognition, documentation, balanced policy, designated cultural zones, and sustainability standards. The petition represents a structured, responsible path toward preserving Goa\u2019s trance heritage as a globally significant cultural legacy.", highlight: true },
  ],
};

export const QUICK_FACTS = [
  { stat: "~16.43%", label: "Tourism contribution to Goa GSDP" },
  { stat: "~2.5 lakh", label: "Tourism-linked livelihoods" },
  { stat: "~8.9L \u2192 ~5.17L", label: "Foreign arrivals (2017 \u2192 2025)" },
  { stat: "266 \u2192 189", label: "Charter flights (2024 \u2192 2025)" },
];

export const ASK_PILLARS = [
  {
    title: "Cultural Recognition",
    summary: "Frame Goa\u2019s trance heritage as living cultural heritage deserving formal acknowledgement.",
    detail: "Establish a formal recognition process through state cultural bodies, documenting the heritage\u2019s origins, evolution, and ongoing cultural significance. This includes oral histories, archival material, and community testimonials.",
  },
  {
    title: "Documentation & Archiving",
    summary: "Create a dedicated museum and digital archive initiative.",
    detail: "Develop a physical museum space and comprehensive digital archive capturing the musical, artistic, and social history of Goa\u2019s trance heritage. Partner with universities, cultural institutions, and community stakeholders.",
  },
  {
    title: "Balanced Policy for Responsible Cultural Tourism",
    summary: "Develop tourism policies that support heritage tourism alongside community wellbeing.",
    detail: "Work with tourism authorities to create policies that balance cultural tourism revenue with community needs, environmental sustainability, and heritage preservation. Include stakeholder consultation processes.",
  },
  {
    title: "Designated Cultural Zones",
    summary: "Establish managed, non-residential, licensed cultural event spaces.",
    detail: "Identify and develop designated areas for cultural events that are away from residential zones, properly licensed, and managed with clear operational standards. This ensures minimal community disruption while preserving cultural expression.",
  },
  {
    title: "Sustainability Standards & Working Group",
    summary: "Form a multi-stakeholder working group with clear sustainability benchmarks.",
    detail: "Create a formal working group comprising government officials, community leaders, cultural practitioners, tourism operators, and environmental experts. Establish measurable sustainability standards and regular review cycles.",
  },
];

export const BIBLIOGRAPHY = [
  { label: "Goa Tourism Department \u2014 2025 Tourist Arrivals Statistical Release", url: "https://goatourism.gov.in/blog-list/goa-records-strong-and-sustained-growth-in-tourist-arrivals-2025-figures-reflect-continued-momentum/" },
  { label: "Goa Tourism \u2014 Historical Arrival Data (up to Aug 2020)", url: "https://www.goatourism.gov.in/wp-content/uploads/2019/09/Tourist-Statistic_till_aug_2020.pdf" },
  { label: "Times of India \u2014 Foreign Arrivals Below Pre-COVID Levels", url: "https://timesofindia.indiatimes.com/city/goa/goa-saw-one-crore-tourists-in-2025-but-foreign-arrivals-below-pre-covid-levels/articleshow/126457882.cms" },
  { label: "Press Information Bureau (PIB) \u2014 India Tourism Factsheet", url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=150362" },
  { label: "Boom Festival \u2014 Municipal Economic Impact Report (PDF)", url: "https://www.idanha.pt/media/6404/boom-festival_relatoriofinal.pdf" },
  { label: "Ozora Festival \u2014 Attendance & Community Reference", url: "https://en.wikipedia.org/wiki/Ozora_Festival" },
  { label: "FestivalPro \u2014 The Emergence of the Psy-Trance Festival", url: "https://www.festivalpro.com/festival-management/1323/news/2021/4/6/The-Emergence-of-the-PSY-Trance%20Festival.html" },
  { label: "Sunburn Festival \u2014 Economic Contribution to Goa (The Goan)", url: "https://www.thegoan.net/goa-news/sunburn-music-spins-money-rolls/2078.html" },
  { label: "Berlin Techno Culture \u2014 Added to Germany\u2019s National ICH Inventory (March 2024)", url: "https://www.berlin.de/en/news/8311297-5559700-berlin-techno-culture-added-to-germanys.en.html" },
  { label: "Goa Trance \u2014 Genre History & Evolution (Wikipedia)", url: "https://en.wikipedia.org/wiki/Goa_trance" },
  { label: "Psychedelic Trance \u2014 Genre Overview & Global Spread (Wikipedia)", url: "https://en.wikipedia.org/wiki/Psychedelic_trance" },
  { label: "Goa Gil \u2014 Biography & Cultural Legacy (Wikipedia)", url: "https://en.wikipedia.org/wiki/Goa_Gil" },
  { label: "Eight Finger Eddie \u2014 Pioneer of Goa\u2019s Hippie Era (Wikipedia)", url: "https://en.wikipedia.org/wiki/Eight_Finger_Eddie" },
  { label: "Anjuna Flea Market \u2014 History & Cultural Significance (Wikipedia)", url: "https://en.wikipedia.org/wiki/Anjuna_flea_market" },
  { label: "Dragonfly Records \u2014 First Goa Trance Label (Wikipedia)", url: "https://en.wikipedia.org/wiki/Dragonfly_Records" },
  { label: "TIP Records \u2014 Founded by Raja Ram (Wikipedia)", url: "https://en.wikipedia.org/wiki/TIP_Records" },
  { label: "Paul Oakenfold \u2014 1994 Essential Mix / Goa Mix (Wikipedia)", url: "https://en.wikipedia.org/wiki/Paul_Oakenfold" },
  { label: "Boom Festival \u2014 History & Cultural Impact (Wikipedia)", url: "https://en.wikipedia.org/wiki/Boom_Festival" },
  { label: "Sunburn Festival \u2014 History & Timeline (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sunburn_Festival" },
  { label: "Tresor Club \u2014 Berlin Techno Landmark (Wikipedia)", url: "https://en.wikipedia.org/wiki/Tresor_(club)" },
  { label: "Rave The Planet \u2014 Berlin Techno Heritage Campaign (Wikipedia)", url: "https://en.wikipedia.org/wiki/Rave_The_Planet" },
  { label: "Noise Pollution (Regulation and Control) Rules, 2000 \u2014 India (Wikipedia)", url: "https://en.wikipedia.org/wiki/Noise_Pollution_(Regulation_and_Control)_Rules,_2000" },
  { label: "Hippie Trail \u2014 Overland Route to South Asia (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hippie_trail" },
  { label: "Goa Hippie Tribe \u2014 Interactive Documentary (SBS/Darius Devas)", url: "https://www.sbs.com.au/goahippietribe/" },
  { label: "Scroll.in \u2014 In North Goa\u2019s \u2018Party\u2019 Villages, a Fight Against Deafening Pub Noise", url: "https://scroll.in/article/1072200/in-the-party-villages-of-north-goa-a-quiet-fight-against-deafening-pub-noise" },
  { label: "RDX Goa \u2014 Police Intensify Crackdown on Noise Pollution, Book 11 Establishments", url: "https://rdxgoa.com/goa-police-intensify-crackdown-on-noise-pollution-book-11-establishments/" },
  { label: "Herald Goa \u2014 Goa Govt\u2019s Revised State Action Plan for Noise Pollution (March 2024)", url: "https://www.heraldgoa.in/goa/is-the-goa-govt-following-its-own-revised-%E2%80%9Cstate-action-plan%E2%80%9D-for-noise-pollution-notified-on-march-14-2024/224706" },
  { label: "Travel and Tour World \u2014 Why Sunburn Festival Is Moving from Goa to Mumbai in 2025", url: "https://www.travelandtourworld.com/news/article/why-sunburn-festival-is-moving-from-goa-to-mumbai-in-2025-the-future-of-music-tourism-in-india-and-how-it-impacts-local-travel-and-culture/" },
  { label: "Music Ally \u2014 India\u2019s Biggest EDM Festival Sunburn Is Moving to Mumbai", url: "https://musically.com/2025/08/07/indias-biggest-edm-festival-sunburn-is-moving-to-mumbai/" },
  { label: "Gomantak Times \u2014 The Persistent Battle Against Noise Pollution in Goa", url: "https://www.gomantaktimes.com/opinion/the-never-ending-battle-against-noise-pollution-in-goa" },
  { label: "Herald Goa \u2014 Bombay HC Uncovers Major Noise Pollution Breaches at Xmas-New Year Parties", url: "https://www.heraldgoa.in/goa/exposed-in-hc-shocking-violation-of-sound-curb-norms-at-xmas-new-year-party-spots/417778" },
  { label: "Channel 4 \u2014 Goa Trance Documentary (1995, feat. TIP Records, Hallucinogen)", url: "https://dmt-fm.com/qtvideo/goa-trance-a-channel-4-documentary-feat-rare-footage-from-1995/" },
  { label: "Tranceform Records \u2014 Anima Mundi by Ethereal (First Neo-Goa Album, 2003)", url: "https://tranceformrecords.bandcamp.com/album/anima-mundi" },
  { label: "Discogs \u2014 TIP Records Full Discography", url: "https://www.discogs.com/label/2542-TIP-Records" },
  { label: "TIP Records \u2014 Official Site (Since 1994)", url: "https://www.tiprecords.com/label/" },
  { label: "Matsuri Productions \u2014 History & Label Profile (Discogs)", url: "https://www.discogs.com/label/2621-Matsuri-Productions" },
  { label: "Flying Rhino Records \u2014 Label Profile (Discogs)", url: "https://www.discogs.com/label/1710-Flying-Rhino-Records" },
  { label: "Hilltop Goa \u2014 Venue History & Party Guide (Holidify)", url: "https://www.holidify.com/places/goa/hill-top-sightseeing-125321.html" },
  { label: "Hilltop Goa \u2014 Trance Party Destination Guide (Tripoto)", url: "https://www.tripoto.com/vagator/places-to-visit/hill-top-goa" },
  { label: "Hilltop Festival 2026 \u2014 15th Edition (Madvibes)", url: "https://tickets.madvibes.in/product/hilltopfestivalgoa/" },
  { label: "Hilltop Goa \u2014 Official Instagram (@hilltopgoa)", url: "https://www.instagram.com/hilltopgoa/" },
];

export const METHODOLOGY_ASSUMPTIONS = [
  "Average major festival attendance: 10,000\u201340,000 (from published capacity data)",
  "Average ticket price range: $150\u2013$350 (from publicly available pricing)",
  "Tourism multiplier applied conservatively: 1.5x\u20132.5x direct spend",
  "All estimates conservatively rounded downward where uncertain",
  "No underground or informal/unreported economy included in estimates",
  "Assumptions based on published festival pricing, tourism economics studies, and event impact reports",
  "Boom Festival annualized: \u20ac55M biennial impact \u00f7 2 \u2248 \u20ac27\u201330M annual equivalent",
  "Boom lifetime estimate: ~13 editions since 1997 \u2248 \u20ac700M+ cumulative impact",
];

export const DATA_SOURCES = [
  {
    category: "Goa Tourism Data",
    sources: [
      { label: "Total tourists 2025: ~1.08 crore", detail: "Domestic: ~1.02 crore | Foreign: ~5.17 lakh" },
      { label: "Foreign tourists 2017 peak: ~8.9 lakh", detail: "Significant decline in high-value international segment" },
      { label: "Charter flights 2024: 266 | 2025: 189", detail: "Declining charter tourism access" },
    ],
    urls: [
      { label: "Goa Tourism Dept \u2014 2025 Arrivals", url: "https://goatourism.gov.in/blog-list/goa-records-strong-and-sustained-growth-in-tourist-arrivals-2025-figures-reflect-continued-momentum/" },
      { label: "Times of India \u2014 Foreign Arrivals Report", url: "https://timesofindia.indiatimes.com/city/goa/goa-saw-one-crore-tourists-in-2025-but-foreign-arrivals-below-pre-covid-levels/articleshow/126457882.cms" },
    ],
  },
  {
    category: "Economic Dependence on Tourism",
    sources: [
      { label: "Tourism contributes ~16.43% to Goa GSDP", detail: "Government of India PIB data" },
      { label: "~2.5 lakh jobs depend on tourism", detail: "Direct and indirect employment" },
      { label: "~40% workforce direct/indirect dependence", detail: "Livelihood dependency context" },
    ],
    urls: [
      { label: "PIB India \u2014 Tourism Factsheet", url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=150362" },
    ],
  },
  {
    category: "Global Festival Economic Data",
    sources: [
      { label: "Boom Festival: ~\u20ac55.3M total regional impact per edition", detail: "~\u20ac29M value added | ~951 jobs supported | Biennial" },
      { label: "Ozora Festival: ~30,000 attendance capacity", detail: "Modeled from avg ticket prices \u20ac250\u2013\u20ac350 + on-site spending" },
      { label: "~35+ major psytrance festivals globally", detail: "Large international attendance patterns" },
      { label: "Sunburn Festival: \u20b930\u201340 crore local economic contribution", detail: "Media-reported estimate per edition" },
    ],
    urls: [
      { label: "Boom Festival \u2014 Impact Report (PDF)", url: "https://www.idanha.pt/media/6404/boom-festival_relatoriofinal.pdf" },
      { label: "Ozora Festival \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Ozora_Festival" },
      { label: "FestivalPro \u2014 Psy-Trance Festival Emergence", url: "https://www.festivalpro.com/festival-management/1323/news/2021/4/6/The-Emergence-of-the-PSY-Trance%20Festival.html" },
      { label: "Sunburn \u2014 The Goan", url: "https://www.thegoan.net/goa-news/sunburn-music-spins-money-rolls/2078.html" },
    ],
  },
  {
    category: "Historical & Cultural Origins",
    sources: [
      { label: "Eight Finger Eddie established Anjuna as hippie hub (mid-1960s)", detail: "First communal gathering point for international travelers in South Anjuna" },
      { label: "Goa Gil arrived 1969, pioneered trance-dance philosophy", detail: "Transitioned from psychedelic rock to electronic music in 1983; developed \u201Ctrance dance as active meditation\u201D" },
      { label: "Anjuna Flea Market founded 1975 by Eight Finger Eddie", detail: "Cultural barter hub for traveling hippies, still operating today" },
      { label: "First electronic music on Goa beaches (1979)", detail: "Kraftwerk tracks played by visiting DJs, marking the shift from acoustic rock to electronic sounds" },
      { label: "First Goa-style party outside India (London, Dec 1990)", detail: "Gave rise to TIP Records and launched the genre\u2019s international spread" },
      { label: "Dragonfly Records (1993) \u2014 first dedicated Goa trance label", detail: "Founded by Youth (Martin Glover) at Butterfly Studios, Brixton, London" },
      { label: "Paul Oakenfold\u2019s BBC Radio 1 \u201CGoa Mix\u201D (1994)", detail: "Essential Mix broadcast brought Goa trance to millions; term \u201CGoa trance\u201D became widely used" },
      { label: "Boom Festival launched 1997, inspired by Goa beach parties", detail: "Grew to 40,000+ attendees from 150+ countries; biennial transformational festival in Portugal" },
      { label: "Sunburn Festival launched 2007 at Candolim Beach, Goa", detail: "Asia\u2019s largest EDM festival; CNN Top 10 worldwide (2009); DJ Mag #8 globally (2025)" },
      { label: "Channel 4 Goa Trance documentary (1995)", detail: "UK broadcast featuring TIP Records, Hallucinogen, Dragonfly Records pioneers; introduced genre to mainstream audiences" },
      { label: "Neo-Goa revival: Tranceform Records, Ethereal \u2014 Anima Mundi (2003)", detail: "Finnish label released the first Neo-Goa album, returning to melodic aesthetics of classic Goa trance with modern production" },
      { label: "CNN ranked Sunburn in Top 10 festivals worldwide (2009)", detail: "Reinforced Goa\u2019s position as a globally recognised music destination" },
      { label: "Goa Hippie Tribe documentary (2012, SBS/Darius Devas)", detail: "Interactive documentary reuniting original Goa hippies via social media" },
      { label: "Goa Gil passes away Oct 2023, aged 72", detail: "Known as the \u201CGodfather of Goa Trance\u201D; underscored urgency of heritage preservation" },
      { label: "Hilltop founded ~1973\u201374 in Vagator by Steve D\u2019Souza", detail: "Started as roadside restaurant; evolved into iconic trance venue; first NYE party in 1974; still operating 50+ years later" },
      { label: "Hilltop Festival launched ~2012, now in 15th edition (Feb 2026)", detail: "Multi-day psytrance festival with international artists; one of the few major festivals still rooted in Goa\u2019s birthplace" },
    ],
    urls: [
      { label: "Goa Trance \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Goa_trance" },
      { label: "Psychedelic Trance \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Psychedelic_trance" },
      { label: "Goa Gil \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Goa_Gil" },
      { label: "Eight Finger Eddie \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Eight_Finger_Eddie" },
      { label: "Anjuna Flea Market \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Anjuna_flea_market" },
      { label: "Dragonfly Records \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Dragonfly_Records" },
      { label: "TIP Records \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/TIP_Records" },
      { label: "Paul Oakenfold \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Paul_Oakenfold" },
      { label: "Hippie Trail \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Hippie_trail" },
      { label: "Boom Festival \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Boom_Festival" },
      { label: "Sunburn Festival \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Sunburn_Festival" },
      { label: "Goa Hippie Tribe \u2014 SBS Documentary", url: "https://www.sbs.com.au/goahippietribe/" },
      { label: "Channel 4 Goa Trance Documentary (1995)", url: "https://dmt-fm.com/qtvideo/goa-trance-a-channel-4-documentary-feat-rare-footage-from-1995/" },
      { label: "Tranceform Records \u2014 Anima Mundi (Neo-Goa, 2003)", url: "https://tranceformrecords.bandcamp.com/album/anima-mundi" },
      { label: "TIP Records \u2014 Discogs Discography", url: "https://www.discogs.com/label/2542-TIP-Records" },
      { label: "TIP Records \u2014 Official Site", url: "https://www.tiprecords.com/label/" },
      { label: "Hilltop Goa \u2014 Venue History (Holidify)", url: "https://www.holidify.com/places/goa/hill-top-sightseeing-125321.html" },
      { label: "Hilltop Goa \u2014 Guide (Tripoto)", url: "https://www.tripoto.com/vagator/places-to-visit/hill-top-goa" },
      { label: "Hilltop Festival 2026 \u2014 15th Edition", url: "https://tickets.madvibes.in/product/hilltopfestivalgoa/" },
    ],
  },
  {
    category: "Regulatory & Policy Context",
    sources: [
      { label: "Noise Pollution Rules enacted in 2000", detail: "Environment Protection Act provisions establishing 10 PM cutoff for amplified music" },
      { label: "Goa State Action Plan revised March 2024", detail: "Revised enforcement protocols under Noise Pollution Rules; Herald Goa coverage" },
      { label: "North Goa venue crackdowns (2024)", detail: "11+ establishments booked; Bombay HC directives; equipment seizures; Thalassa, Noah, Diez licenses revoked" },
      { label: "Anjuna & Vagator resident protests (Aug 2024)", detail: "Candlelight marches to Anjuna Police Station after repeated venue violations" },
      { label: "Sunburn Festival exits Goa (2025)", detail: "Relocated to Mumbai after 18 years due to logistical challenges, noise complaints, and regulatory issues" },
    ],
    urls: [
      { label: "Noise Pollution Rules, 2000 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Noise_Pollution_(Regulation_and_Control)_Rules,_2000" },
      { label: "RDX Goa \u2014 Police Book 11 Establishments", url: "https://rdxgoa.com/goa-police-intensify-crackdown-on-noise-pollution-book-11-establishments/" },
      { label: "Scroll.in \u2014 North Goa\u2019s Fight Against Pub Noise", url: "https://scroll.in/article/1072200/in-the-party-villages-of-north-goa-a-quiet-fight-against-deafening-pub-noise" },
      { label: "Herald Goa \u2014 Revised State Action Plan", url: "https://www.heraldgoa.in/goa/is-the-goa-govt-following-its-own-revised-%E2%80%9Cstate-action-plan%E2%80%9D-for-noise-pollution-notified-on-march-14-2024/224706" },
      { label: "Herald Goa \u2014 Bombay HC Noise Violation Findings", url: "https://www.heraldgoa.in/goa/exposed-in-hc-shocking-violation-of-sound-curb-norms-at-xmas-new-year-party-spots/417778" },
      { label: "Travel and Tour World \u2014 Why Sunburn Is Moving to Mumbai", url: "https://www.travelandtourworld.com/news/article/why-sunburn-festival-is-moving-from-goa-to-mumbai-in-2025-the-future-of-music-tourism-in-india-and-how-it-impacts-local-travel-and-culture/" },
      { label: "Music Ally \u2014 Sunburn Moving to Mumbai", url: "https://musically.com/2025/08/07/indias-biggest-edm-festival-sunburn-is-moving-to-mumbai/" },
      { label: "Gomantak Times \u2014 Noise Pollution Battle", url: "https://www.gomantaktimes.com/opinion/the-never-ending-battle-against-noise-pollution-in-goa" },
    ],
  },
  {
    category: "Cultural Heritage Precedents",
    sources: [
      { label: "Berlin techno inscribed on Germany\u2019s National ICH Inventory (March 2024)", detail: "150th entry in Germany\u2019s National Inventory of Intangible Cultural Heritage" },
      { label: "Rave The Planet led the heritage application (Nov 2022)", detail: "Application submitted Nov 2022, revised May 2023 after feedback from German UNESCO Commission" },
      { label: "Heritage campaign originated with Hans Cousto (2011)", detail: "Over a decade of documentation and community engagement before inscription" },
      { label: "Tresor club opened 1991 as Berlin techno landmark", detail: "Opened in former department store vault in East Berlin; symbol of the city\u2019s techno identity" },
    ],
    urls: [
      { label: "Berlin.de \u2014 Official ICH Announcement", url: "https://www.berlin.de/en/news/8311297-5559700-berlin-techno-culture-added-to-germanys.en.html" },
      { label: "Rave The Planet \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Rave_The_Planet" },
      { label: "Tresor Club \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Tresor_(club)" },
    ],
  },
];

export const DEFENSIBILITY_STATEMENT = "All modeled figures are presented as conservative estimates based on publicly available attendance, pricing, and economic impact studies. This ensures credibility, policy defensibility, and media reliability. Figures are intentionally conservative rather than exaggerated.";

export const DATA_PURPOSE_POINTS = [
  "Provide transparency of sources",
  "Support informed public dialogue",
  "Present cultural preservation as an evidence-based case",
  "Enable policymakers, media, and stakeholders to review verifiable data",
];

export const PRESS_SUMMARY = `Goa\u2019s trance heritage represents one of the most significant cultural exports in modern music history. Born in the coastal villages of Goa in the 1960s and 70s, this unique musical tradition blended global electronic innovation with local rhythmic traditions and philosophical depth.

Today, the global festival ecosystem inspired by Goa\u2019s trance heritage generates substantial tourism revenue across multiple countries\u2014yet the birthplace itself faces declining high-value tourism segments. Foreign arrivals have dropped from approximately 8.9 lakh in 2017 to an estimated 5.17 lakh in 2025, while charter flights declined from 266 to 189.

This initiative calls for structured, responsible cultural preservation through five pillars: cultural recognition, documentation and archiving, balanced tourism policy, designated cultural zones, and sustainability standards with a multi-stakeholder working group.

The approach draws on global precedents such as Berlin\u2019s recognition of techno in Germany\u2019s national Intangible Cultural Heritage inventory, demonstrating that responsible heritage frameworks can coexist with community wellbeing.`;

export const KEY_FACTS_BULLETS = [
  "Tourism contributes approximately 16.43% to Goa\u2019s GSDP",
  "An estimated 2.5 lakh livelihoods are linked to tourism in Goa",
  "Foreign tourist arrivals declined from ~8.9 lakh (2017) to ~5.17 lakh (2025)",
  "Charter flights to Goa dropped from 266 (2024) to 189 (2025)",
  "The global festival ecosystem inspired by Goa generates significant revenue abroad",
  "Berlin\u2019s techno heritage was added to Germany\u2019s national ICH inventory",
  "Domestic tourism remains strong; preserving global identity sustains premium value",
  "This initiative advocates for structured, responsible cultural preservation",
];

export const SOCIAL_TEMPLATES = {
  x: "Goa gave the world a musical movement. Now it\u2019s time to protect the birthplace. Learn more and sign the petition. #ProtectTheBirthplace #GoaHeritage",
  ig: "Goa\u2019s trance heritage shaped global music culture. From the beaches of Anjuna to festivals worldwide, this legacy deserves preservation\u2014not erasure.\n\nLearn the full story and join the movement.\n\n#ProtectTheBirthplace #GoaTranceHeritage #CulturalPreservation #GoaHeritage #LivingHeritage",
  whatsapp: "Did you know Goa\u2019s trance heritage is one of the most influential cultural exports in modern music? Foreign arrivals and charter flights are declining. A responsible preservation plan could protect livelihoods and cultural legacy. Learn more and sign the petition: [LINK]",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Case", href: "/case" },
  { label: "Evidence", href: "/evidence" },
  { label: "Media", href: "/media" },
];

export const WORLD_MAP_ROUTES = [
  { to: "Portugal", coords: { x: 170, y: 195 } },
  { to: "Hungary", coords: { x: 285, y: 170 } },
  { to: "Brazil", coords: { x: 145, y: 310 } },
  { to: "Germany", coords: { x: 270, y: 160 } },
  { to: "Thailand", coords: { x: 440, y: 240 } },
  { to: "Australia", coords: { x: 490, y: 350 } },
];

export const GOA_COORDS = { x: 380, y: 230 };
