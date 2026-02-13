import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";

const COLORS = {
  teal: "#1e7898",
  tealLight: "#4dd8e0",
  orange: "#c67a3c",
  orangeLight: "#e8a86b",
  green: "#5a9e6f",
  red: "#c0392b",
  grey: "#8b8b8b",
  muted: "#a3a3a3",
};

const PIE_COLORS = ["#c0392b", "#1e7898", "#e8a86b", "#5a9e6f"];

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ChartWrapper({
  children,
  title,
  note,
  testId,
}: {
  children: React.ReactNode;
  title: string;
  note?: string;
  testId: string;
}) {
  return (
    <ScrollReveal>
      <Card className="p-5 sm:p-6" data-testid={testId}>
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        {note && (
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{note}</p>
        )}
        {children}
      </Card>
    </ScrollReveal>
  );
}

const customTooltipStyle = {
  backgroundColor: "#faf8f5",
  border: "1px solid #e0dcd6",
  borderRadius: "6px",
  fontSize: "12px",
  padding: "8px 12px",
};

export function TranceRiseChart() {
  const { ref, inView } = useInView();

  const data = [
    { year: "1980", trance: 100, intl: 100 },
    { year: "1985", trance: 110, intl: 105 },
    { year: "1990", trance: 125, intl: 108 },
    { year: "1995", trance: 145, intl: 100 },
    { year: "2000", trance: 160, intl: 105 },
    { year: "2004", trance: 180, intl: 130 },
    { year: "2008", trance: 220, intl: 155 },
    { year: "2010", trance: 250, intl: 165 },
    { year: "2012", trance: 275, intl: 178 },
    { year: "2014", trance: 290, intl: 182 },
    { year: "2016", trance: 295, intl: 185 },
    { year: "2017", trance: 290, intl: 180 },
    { year: "2019", trance: 280, intl: 175 },
    { year: "2022", trance: 265, intl: 165 },
    { year: "2025", trance: 250, intl: 155 },
  ];

  return (
    <ChartWrapper
      title="Rise of Trance Culture & International Tourism in Goa (1980–2025)"
      note="Indicative trend based on cultural festival growth, tourism patterns, and Goa tourism data. Indexed scale (100 = 1980 baseline)."
      testId="chart-trance-rise"
    >
      <div ref={ref} style={{ width: "100%", height: 320 }}>
        {inView && (
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="tranceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd6" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: COLORS.muted }} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.muted }} domain={[80, 320]} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                formatter={(value: string) =>
                  value === "trance"
                    ? "Trance-driven cultural tourism index"
                    : "International tourist arrivals to Goa"
                }
              />
              <Area
                type="monotone"
                dataKey="trance"
                stroke={COLORS.orange}
                strokeWidth={2.5}
                fill="url(#tranceGrad)"
                dot={{ r: 3, fill: COLORS.orange }}
                animationDuration={2000}
                animationBegin={200}
              />
              <Line
                type="monotone"
                dataKey="intl"
                stroke={COLORS.teal}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.teal }}
                animationDuration={2000}
                animationBegin={400}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartWrapper>
  );
}

export function ForeignArrivalsChart() {
  const { ref, inView } = useInView();

  const data = [
    { year: "2017", arrivals: 8.9 },
    { year: "Peak", arrivals: 9.2 },
    { year: "2020", arrivals: 7.5 },
    { year: "2021", arrivals: 6.3 },
    { year: "2022", arrivals: 5.4 },
    { year: "2023", arrivals: 4.2 },
    { year: "2025 (Proj.)", arrivals: 5.2 },
  ];

  const trendData = [
    { year: "2017", trend: 8.9 },
    { year: "Peak", trend: 9.2 },
    { year: "2020", trend: 8.5 },
    { year: "2021", trend: 7.5 },
    { year: "2022", trend: 6.5 },
    { year: "2023", trend: 5.8 },
    { year: "2025 (Proj.)", trend: 5.0 },
  ];

  const combined = data.map((d, i) => ({ ...d, trend: trendData[i].trend }));

  return (
    <ChartWrapper
      title="Decline in High-Value International Visitors to Goa"
      note="Foreign tourist arrivals ~8.9 lakh in 2017, peaked around 2018–2019, down to ~5.2 lakh projected in 2025."
      testId="chart-foreign-arrivals"
    >
      <div ref={ref} style={{ width: "100%", height: 320 }}>
        {inView && (
          <ResponsiveContainer>
            <BarChart data={combined} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd6" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: COLORS.muted }} />
              <YAxis
                tick={{ fontSize: 11, fill: COLORS.muted }}
                domain={[0, 10]}
                label={{
                  value: "Foreign arrivals (lakhs)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 10, fill: COLORS.muted },
                  offset: 20,
                }}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(value: number, name: string) => [
                  `${value} lakh`,
                  name === "arrivals" ? "Foreign arrivals" : "Trend line",
                ]}
              />
              <Bar
                dataKey="arrivals"
                fill={COLORS.teal}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={200}
              >
                {combined.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`rgba(30, 120, 152, ${0.95 - index * 0.08})`}
                  />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="trend"
                stroke={COLORS.orange}
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={false}
                animationDuration={2000}
                animationBegin={600}
              />
              <ReferenceLine y={0} stroke="#e0dcd6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-3 px-2 py-2 rounded-md bg-orange-50/60 border border-orange-200/40">
        <p className="text-xs text-orange-800/80 text-center font-medium">
          Loss of Long-Stay Cultural Tourists
        </p>
      </div>
    </ChartWrapper>
  );
}

export function AnnualEconomyPieChart() {
  const { ref, inView } = useInView();

  const data = [
    { name: "Other Global Psy Festivals", value: 135, pct: "68%", desc: "~$135M/yr" },
    { name: "Boom Festival", value: 30, pct: "15%", desc: "~$30M/yr" },
    { name: "Ozora Festival", value: 20, pct: "10%", desc: "~$20M/yr" },
    { name: "Goa Current Share", value: 15, pct: "8%", desc: "~$15M/yr est." },
  ];

  return (
    <ChartWrapper
      title="Annual Global Trance Festival Economy Share (USD)"
      note="Estimated annual global trance festival economy — all values in USD per year."
      testId="chart-annual-economy"
    >
      <div ref={ref} style={{ width: "100%", height: 320 }}>
        {inView && (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={0}
                dataKey="value"
                animationDuration={1800}
                animationBegin={200}
                label={({ name, pct }) => `${pct}`}
                labelLine={{ stroke: COLORS.muted, strokeWidth: 1 }}
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(_value: number, _name: string, props: any) => [
                  props.payload.desc,
                  props.payload.name,
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
                formatter={(value: string, entry: any) => {
                  const item = data.find((d) => d.name === value);
                  return `${value} (${item?.desc || ""})`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartWrapper>
  );
}

export function LifetimeFootprintPieChart() {
  const { ref, inView } = useInView();

  const data = [
    { name: "Other Global Psy/Trance Festivals", value: 4000, pct: "66%", desc: "~$4.0B" },
    { name: "Goa Local Economic Capture", value: 1000, pct: "16%", desc: "1980–2025 est. ~$1.0B" },
    { name: "Boom Festival", value: 700, pct: "11%", desc: "1997–2025 ~$700M" },
    { name: "Ozora Festival", value: 400, pct: "7%", desc: "2004–2025 est. ~$400M" },
  ];

  return (
    <ChartWrapper
      title="Lifetime Global Economic Footprint of Trance Culture (Since 1980s, USD)"
      note="All values represent conservative lifetime economic impact estimates in USD."
      testId="chart-lifetime-footprint"
    >
      <div ref={ref} style={{ width: "100%", height: 320 }}>
        {inView && (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={0}
                dataKey="value"
                animationDuration={1800}
                animationBegin={200}
                label={({ pct }) => `${pct}`}
                labelLine={{ stroke: COLORS.muted, strokeWidth: 1 }}
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(_value: number, _name: string, props: any) => [
                  props.payload.desc,
                  props.payload.name,
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
                formatter={(value: string) => {
                  const item = data.find((d) => d.name === value);
                  return `${value} (${item?.desc || ""})`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartWrapper>
  );
}

export function TourismGrowthChart() {
  const { ref, inView } = useInView();

  const data = [
    { year: "2000", global: 100, intl: 100, domestic: 100 },
    { year: "2005", global: 140, intl: 115, domestic: 130 },
    { year: "2010", global: 190, intl: 140, domestic: 170 },
    { year: "2015", global: 260, intl: 175, domestic: 220 },
    { year: "2018", global: 295, intl: 190, domestic: 270 },
    { year: "2020", global: 300, intl: 190, domestic: 290 },
    { year: "2025", global: 260, intl: 150, domestic: 360 },
  ];

  return (
    <ChartWrapper
      title="Goa Tourism Growth & Cultural Influence (2000–2025)"
      note="Indexed growth (2000 = 100). Shows divergence between domestic growth and international/cultural decline."
      testId="chart-tourism-growth"
    >
      <div ref={ref} style={{ width: "100%", height: 320 }}>
        {inView && (
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0dcd6" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: COLORS.muted }} />
              <YAxis
                tick={{ fontSize: 11, fill: COLORS.muted }}
                domain={[80, 380]}
                label={{
                  value: "Indexed Growth (2000 = 100)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 10, fill: COLORS.muted },
                  offset: 20,
                }}
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                formatter={(value: number, name: string) => [
                  value,
                  name === "global"
                    ? "Global Trance & Cultural Tourism Influence"
                    : name === "intl"
                    ? "International Tourists to Goa"
                    : "Domestic Tourists to Goa",
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                formatter={(value: string) =>
                  value === "global"
                    ? "Global Trance & Cultural Tourism Influence (index)"
                    : value === "intl"
                    ? "International Tourists to Goa (index)"
                    : "Domestic Tourists to Goa (index)"
                }
              />
              <Line
                type="monotone"
                dataKey="global"
                stroke={COLORS.teal}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.teal }}
                animationDuration={2000}
                animationBegin={200}
              />
              <Line
                type="monotone"
                dataKey="intl"
                stroke={COLORS.orange}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.orange }}
                animationDuration={2000}
                animationBegin={400}
              />
              <Line
                type="monotone"
                dataKey="domestic"
                stroke={COLORS.green}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.green }}
                animationDuration={2000}
                animationBegin={600}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartWrapper>
  );
}
