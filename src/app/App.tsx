import { useState } from "react";
import { motion } from "motion/react";
import { BarChart2, Globe, Phone, Users, Trophy } from "lucide-react";

// ─── Layout constants ─────────────────────────────────────────────────────────
const POS = {
  sites:  { x: 80,  y: 118 },
  phones: { x: 80,  y: 392 },
  center: { x: 308, y: 255 },
  leads:  { x: 500, y: 255 },
  deal:   { x: 638, y: 255 },
};
const CR = 50;  // center radius
const SR = 36;  // satellite radius

// ─── Tooltip data ─────────────────────────────────────────────────────────────
const TOOLTIPS: Record<string, {
  title: string; text: string; px: number; py: number; pw: number; ph: number; color: string;
}> = {
  sites:  { title: "Сайты конкурентов",    text: "Укажите сайт конкурента (или свой) — и мы извлечём номера телефонов каждого посетителя.",                     px: 128, py: 52,  pw: 208, ph: 120, color: "#38bdf8" },
  phones: { title: "Телефоны конкурентов", text: "Загрузите номера конкурентов для сбора данных — получите полный список их входящих и исходящих номеров.",       px: 128, py: 328, pw: 208, ph: 130, color: "#34d399" },
  center: { title: "Анализ данных",        text: "Собранные данные автоматически структурируются и передаются в наш колл-центр.",                                 px: 183, py: 62,  pw: 252, ph: 110, color: "#818cf8" },
  leads:  { title: "Тёплые лиды",          text: "Наш колл-центр обрабатывает номера по скрипту, отсеивая нецелевые в поиске тёплых лидов.",                     px: 383, py: 66,  pw: 228, ph: 120, color: "#f472b6" },
  deal:   { title: "Сделка",               text: "Вам остаётся только обработать полученных лидов и довести их до сделки.",                                       px: 372, py: 183, pw: 218, ph: 110, color: "#facc15" },
};

// ─── Connections ─────────────────────────────────────────────────────────────
const CONNS = [
  { id: "s-c", from: POS.sites,  to: POS.center, color: "#38bdf8", delay: 0.0, r1: SR, r2: CR },
  { id: "p-c", from: POS.phones, to: POS.center, color: "#34d399", delay: 0.7, r1: SR, r2: CR },
  { id: "c-l", from: POS.center, to: POS.leads,  color: "#a78bfa", delay: 1.3, r1: CR, r2: SR },
  { id: "l-d", from: POS.leads,  to: POS.deal,   color: "#facc15", delay: 1.9, r1: SR, r2: SR },
];

// ─── Satellite node definitions ───────────────────────────────────────────────
const NODES = [
  { id: "sites",  pos: POS.sites,  lines: ["Сайты",    "конкурентов"], Icon: Globe,  color: "#38bdf8" },
  { id: "phones", pos: POS.phones, lines: ["Телефоны", "конкурентов"], Icon: Phone,  color: "#34d399" },
  { id: "leads",  pos: POS.leads,  lines: ["Тёплые",   "лиды"],        Icon: Users,  color: "#f472b6" },
  { id: "deal",   pos: POS.deal,   lines: ["Сделка"],                  Icon: Trophy, color: "#facc15" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function dir(from: {x:number;y:number}, to: {x:number;y:number}) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const d  = Math.sqrt(dx * dx + dy * dy);
  return { nx: dx / d, ny: dy / d };
}

// ─── Dashed animated line ─────────────────────────────────────────────────────
function DashedLine({ x1,y1,x2,y2,color,delay }: { x1:number;y1:number;x2:number;y2:number;color:string;delay:number }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1.8" strokeLinecap="round"
      strokeDasharray="8 6"
      style={{ strokeDashoffset: 0 }}
      animate={{ opacity: [0.2, 0.65, 0.2] }}
      transition={{ opacity: { duration: 2.6, repeat: Infinity, delay } }}
    />
  );
}

// ─── Flying particle ──────────────────────────────────────────────────────────
function Particle({ x1,y1,x2,y2,color,delay }: { x1:number;y1:number;x2:number;y2:number;color:string;delay:number }) {
  return (
    <motion.circle
      r={3.5} fill={color}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.9, repeat: Infinity, delay, ease: "easeInOut", times: [0, 0.1, 0.88, 1] }}
    />
  );
}

// ─── Tooltip card ─────────────────────────────────────────────────────────────
function TooltipCard({ id, active }: { id: string; active: boolean }) {
  const t = TOOLTIPS[id];
  if (!t) return null;
  return (
    <foreignObject x={t.px} y={t.py} width={t.pw} height={t.ph} style={{ overflow: "visible", pointerEvents: "none" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 8 }}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.82, y: 8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          background: "rgba(7, 13, 31, 0.96)",
          border: `1px solid ${t.color}40`,
          borderLeft: `3px solid ${t.color}`,
          borderRadius: 10,
          padding: "10px 13px",
          boxShadow: `0 0 20px ${t.color}25, 0 6px 24px rgba(0,0,0,0.6)`,
          fontFamily: "Montserrat, sans-serif",
          width: "100%",
          boxSizing: "border-box" as const,
        }}
      >
        <div style={{ color: t.color, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
          {t.title}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 10.5, lineHeight: 1.6, fontWeight: 500 }}>
          {t.text}
        </div>
      </motion.div>
    </foreignObject>
  );
}

// ─── Satellite node ───────────────────────────────────────────────────────────
function SatNode({ node, active, onHover, idx }: {
  node: typeof NODES[0]; active: boolean; onHover:(id:string|null)=>void; idx:number;
}) {
  const { Icon, color, pos: { x, y }, lines } = node;
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, type: "spring", bounce: 0.4 }}
    >
      {/* Pulse ring */}
      <motion.circle cx={x} cy={y} r={SR + 4} fill="none" stroke={color} strokeWidth="1"
        animate={{ r: [SR + 3, SR + 17], opacity: [0.45, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.45 }}
      />
      {/* Soft glow */}
      <circle cx={x} cy={y} r={SR + 8} fill={color} opacity={0.1} style={{ filter: "blur(8px)" }} />
      {/* Main circle */}
      <motion.circle cx={x} cy={y} r={SR}
        fill={active ? color : "#1a2540"}
        stroke={color}
        strokeWidth={active ? 2.5 : 1.8}
        transition={{ duration: 0.15 }}
      />
      {/* Icon via foreignObject */}
      <foreignObject x={x - 13} y={y - 13} width={26} height={26} style={{ pointerEvents: "none" }}>
        <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", color: active ? "#fff" : color }}>
          <Icon size={15} />
        </div>
      </foreignObject>
      {/* Labels */}
      {lines.map((line, li) => (
        <text key={li} x={x} y={y + SR + 17 + li * 16}
          textAnchor="middle"
          fill={active ? color : "#cbd5e1"}
          fontSize="11.5" fontWeight="700" fontFamily="Montserrat, sans-serif"
        >{line}</text>
      ))}
    </motion.g>
  );
}

// ─── Center node ──────────────────────────────────────────────────────────────
function CenterNode({ active, onHover }: { active: boolean; onHover:(id:string|null)=>void }) {
  const { x, y } = POS.center;
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover("center")}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
    >
      {/* Rotating ring 1 */}
      <motion.circle cx={x} cy={y} r={68} fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="7 5"
        animate={{ rotate: 360 }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      {/* Rotating ring 2 */}
      <motion.circle cx={x} cy={y} r={82} fill="none" stroke="#818cf8" strokeWidth="0.6" strokeDasharray="3 9"
        animate={{ rotate: -360 }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulse halo */}
      <motion.circle cx={x} cy={y} r={55} fill="#6366f1" opacity={0.13}
        animate={{ r: [51, 63, 51] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Glow backdrop */}
      <circle cx={x} cy={y} r={CR + 12} fill="#6366f1" opacity={0.15} style={{ filter: "blur(14px)" }} />
      {/* Main fill */}
      <circle cx={x} cy={y} r={CR} fill="url(#cGrad)" />
      {/* Icon */}
      <foreignObject x={x - 20} y={y - 21} width={40} height={40} style={{ pointerEvents: "none" }}>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <BarChart2 size={25} />
        </div>
      </foreignObject>
      {/* Label */}
      <text x={x} y={y + CR + 17} textAnchor="middle"
        fill={active ? "#a5b4fc" : "#f1f5f9"}
        fontSize="12.5" fontWeight="800" fontFamily="Montserrat, sans-serif"
      >Анализ данных</text>
    </motion.g>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState<string | null>(null);
  const dim = (id: string) => active !== null && active !== id;

  const flowLabels = [
    { x: (POS.sites.x  + POS.center.x) / 2 - 20, y: (POS.sites.y  + POS.center.y) / 2 - 12, text: "СБОР",      color: "#38bdf8" },
    { x: (POS.phones.x + POS.center.x) / 2 - 20, y: (POS.phones.y + POS.center.y) / 2 + 14, text: "СБОР",      color: "#34d399" },
    { x: (POS.center.x + POS.leads.x)  / 2,       y: POS.center.y - 20,                       text: "АНАЛИЗ",    color: "#a78bfa" },
    { x: (POS.leads.x  + POS.deal.x)   / 2,       y: POS.leads.y  - 20,                       text: "КОНВЕРСИЯ", color: "#facc15" },
  ];

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "linear-gradient(135deg, #070d1f 0%, #0d1530 50%, #070d1f 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Montserrat, sans-serif", overflow: "hidden", position: "relative",
      boxSizing: "border-box",
    }}>

      {/* Dot grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055, pointerEvents: "none" }}>
        <defs>
          <pattern id="dotpat" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#60a5fa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotpat)" />
      </svg>

      {/* SVG diagram — fills the whole container */}
      <motion.svg
        viewBox="0 0 720 560"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", display: "block", zIndex: 1 }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <defs>
          <filter id="glw" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="cGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
          {CONNS.map(c => (
            <marker key={c.id} id={`mk-${c.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 1,6 3,0 5" fill={c.color} opacity="0.8" />
            </marker>
          ))}
        </defs>

        {/* ── Connection lines ── */}
        {CONNS.map((c) => {
          const { nx, ny } = dir(c.from, c.to);
          const lx1 = c.from.x + nx * (c.r1 + 2),  ly1 = c.from.y + ny * (c.r1 + 2);
          const lx2 = c.to.x   - nx * (c.r2 + 9),  ly2 = c.to.y   - ny * (c.r2 + 9);
          const hl = active === null
            || (c.id === "s-c" && (active === "sites"  || active === "center"))
            || (c.id === "p-c" && (active === "phones" || active === "center"))
            || (c.id === "c-l" && (active === "center" || active === "leads"))
            || (c.id === "l-d" && (active === "leads"  || active === "deal"));

          return (
            <g key={c.id} opacity={hl ? 1 : 0.1} style={{ transition: "opacity 0.3s" }}>
              <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={c.color} strokeWidth="0.8" opacity={0.18} />
              <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="transparent" strokeWidth="1.5" markerEnd={`url(#mk-${c.id})`} />
              <DashedLine x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay} />
              <Particle x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay} />
              <Particle x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay + 0.9} />
            </g>
          );
        })}

        {/* ── Satellite nodes ── */}
        {NODES.map((node, i) => (
          <g key={node.id} opacity={dim(node.id) ? 0.18 : 1} style={{ transition: "opacity 0.3s" }}>
            <SatNode node={node} active={active === node.id} onHover={setActive} idx={i} />
          </g>
        ))}

        {/* ── Center node ── */}
        <g opacity={dim("center") ? 0.18 : 1} style={{ transition: "opacity 0.3s" }}>
          <CenterNode active={active === "center"} onHover={setActive} />
        </g>

        {/* ── Flow labels ── */}
        {flowLabels.map((l, i) => (
          <motion.text key={i} x={l.x} y={l.y} textAnchor="middle"
            fill={l.color} fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 0.65 }}
            transition={{ delay: 0.9 + i * 0.12 }}
          >{l.text}</motion.text>
        ))}

        {/* ── Title ── */}
        <motion.text
          x="360" y="38"
          textAnchor="middle"
          fill="#f1f5f9"
          fontSize="32" fontWeight="800" fontFamily="Montserrat, sans-serif"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >Схема работы с данными</motion.text>

        {/* ── Tooltip cards (rendered last = on top) ── */}
        {["sites", "phones", "center", "leads", "deal"].map(id => (
          <TooltipCard key={id} id={id} active={active === id} />
        ))}

      </motion.svg>
    </div>
  );
}
