import { useState } from "react";
import { motion } from "motion/react";
import { BarChart2, Globe, Phone, Users, Trophy, Zap } from "lucide-react";

const CTA = "https://conversion-lab.tilda.ws/#rec2213007531";

const POS = {
  sites:  { x: 80,  y: 118 },
  phones: { x: 80,  y: 392 },
  center: { x: 308, y: 255 },
  leads:  { x: 500, y: 255 },
  deal:   { x: 638, y: 255 },
};
const CR = 50;
const SR = 36;

const TOOLTIPS: Record<string, { title: string; text: string; px: number; py: number; pw: number; ph: number; color: string }> = {
  sites:  { title: "Сайты конкурентов",    text: "Укажите сайт конкурента — мы извлечём номера телефонов каждого посетителя.",             px: 128, py: 60,  pw: 210, ph: 110, color: "#38bdf8" },
  phones: { title: "Телефоны конкурентов", text: "Загрузите базу номеров конкурентов — получите полный список входящих и исходящих.",        px: 128, py: 320, pw: 210, ph: 110, color: "#34d399" },
  center: { title: "Анализ данных",        text: "Собранные данные структурируются и передаются в наш колл-центр.",                           px: 180, py: 68,  pw: 252, ph: 100, color: "#818cf8" },
  leads:  { title: "Тёплые лиды",          text: "Колл-центр обрабатывает номера по скрипту, отсеивая нецелевые обращения.",                  px: 375, py: 68,  pw: 228, ph: 110, color: "#f472b6" },
  deal:   { title: "Сделка",               text: "Вам остаётся обработать готовых лидов и довести их до сделки.",                             px: 365, py: 180, pw: 218, ph: 100, color: "#facc15" },
};

const CONNS = [
  { id: "s-c", from: POS.sites,  to: POS.center, color: "#38bdf8", delay: 0.0, r1: SR, r2: CR },
  { id: "p-c", from: POS.phones, to: POS.center, color: "#34d399", delay: 0.7, r1: SR, r2: CR },
  { id: "c-l", from: POS.center, to: POS.leads,  color: "#a78bfa", delay: 1.3, r1: CR, r2: SR },
  { id: "l-d", from: POS.leads,  to: POS.deal,   color: "#facc15", delay: 1.9, r1: SR, r2: SR },
];

const NODES = [
  { id: "sites",  pos: POS.sites,  lines: ["Сайты",    "конкурентов"], Icon: Globe,  color: "#38bdf8" },
  { id: "phones", pos: POS.phones, lines: ["Телефоны", "конкурентов"], Icon: Phone,  color: "#34d399" },
  { id: "leads",  pos: POS.leads,  lines: ["Тёплые",   "лиды"],        Icon: Users,  color: "#f472b6" },
  { id: "deal",   pos: POS.deal,   lines: ["Сделка"],                  Icon: Trophy, color: "#facc15" },
];

function dir(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  return { nx: dx / d, ny: dy / d };
}

function DashedLine({ x1, y1, x2, y2, color, delay }: { x1: number; y1: number; x2: number; y2: number; color: string; delay: number }) {
  return (
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="8 6"
      animate={{ opacity: [0.2, 0.7, 0.2] }}
      transition={{ opacity: { duration: 2.6, repeat: Infinity, delay } }}
    />
  );
}

function Particle({ x1, y1, x2, y2, color, delay }: { x1: number; y1: number; x2: number; y2: number; color: string; delay: number }) {
  return (
    <motion.circle r={3.5} fill={color}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.9, repeat: Infinity, delay, ease: "easeInOut", times: [0, 0.1, 0.88, 1] }}
    />
  );
}

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
          background: "rgba(5,10,28,0.97)", border: `1px solid ${t.color}45`,
          borderLeft: `3px solid ${t.color}`, borderRadius: 10, padding: "10px 13px",
          boxShadow: `0 0 24px ${t.color}30, 0 8px 28px rgba(0,0,0,0.7)`,
          fontFamily: "Montserrat, sans-serif", width: "100%", boxSizing: "border-box" as const,
        }}
      >
        <div style={{ color: t.color, fontSize: 10, fontWeight: 700, marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{t.title}</div>
        <div style={{ color: "#94a3b8", fontSize: 10, lineHeight: 1.55, fontWeight: 500 }}>{t.text}</div>
      </motion.div>
    </foreignObject>
  );
}

function SatNode({ node, active, onHover, idx }: { node: typeof NODES[0]; active: boolean; onHover: (id: string | null) => void; idx: number }) {
  const { Icon, color, pos: { x, y }, lines } = node;
  return (
    <motion.g style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover(node.id)} onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, type: "spring", bounce: 0.4 }}
    >
      <motion.circle cx={x} cy={y} r={SR + 4} fill="none" stroke={color} strokeWidth="1"
        animate={{ r: [SR + 3, SR + 18], opacity: [0.5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.45 }}
      />
      <circle cx={x} cy={y} r={SR + 10} fill={color} opacity={0.08} style={{ filter: "blur(10px)" }} />
      <motion.circle cx={x} cy={y} r={SR}
        fill={active ? color : "#111d36"} stroke={color} strokeWidth={active ? 2.5 : 1.8}
        transition={{ duration: 0.15 }}
      />
      <foreignObject x={x - 13} y={y - 13} width={26} height={26} style={{ pointerEvents: "none" }}>
        <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", color: active ? "#fff" : color }}>
          <Icon size={15} />
        </div>
      </foreignObject>
      {lines.map((line, li) => (
        <text key={li} x={x} y={y + SR + 17 + li * 16}
          textAnchor="middle" fill={active ? color : "#cbd5e1"}
          fontSize="11.5" fontWeight="700" fontFamily="Montserrat, sans-serif"
        >{line}</text>
      ))}
    </motion.g>
  );
}

function CenterNode({ active, onHover }: { active: boolean; onHover: (id: string | null) => void }) {
  const { x, y } = POS.center;
  return (
    <motion.g style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover("center")} onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
    >
      <motion.circle cx={x} cy={y} r={68} fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="7 5"
        animate={{ rotate: 360 }} style={{ originX: `${x}px`, originY: `${y}px` }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle cx={x} cy={y} r={82} fill="none" stroke="#818cf8" strokeWidth="0.6" strokeDasharray="3 9"
        animate={{ rotate: -360 }} style={{ originX: `${x}px`, originY: `${y}px` }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle cx={x} cy={y} r={55} fill="#6366f1" opacity={0.12}
        animate={{ r: [51, 64, 51] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={x} cy={y} r={CR + 12} fill="#6366f1" opacity={0.14} style={{ filter: "blur(16px)" }} />
      <circle cx={x} cy={y} r={CR} fill="url(#cGrad)" />
      <foreignObject x={x - 20} y={y - 21} width={40} height={40} style={{ pointerEvents: "none" }}>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <BarChart2 size={25} />
        </div>
      </foreignObject>
      <text x={x} y={y + CR + 17} textAnchor="middle"
        fill={active ? "#a5b4fc" : "#f1f5f9"}
        fontSize="12.5" fontWeight="800" fontFamily="Montserrat, sans-serif"
      >Анализ данных</text>
    </motion.g>
  );
}

export function HeroSection() {
  const [active, setActive] = useState<string | null>(null);
  const dim = (id: string) => active !== null && active !== id;

  const flowLabels = [
    { x: (POS.sites.x + POS.center.x) / 2 - 20,  y: (POS.sites.y  + POS.center.y) / 2 - 12, text: "СБОР",      color: "#38bdf8" },
    { x: (POS.phones.x + POS.center.x) / 2 - 20, y: (POS.phones.y + POS.center.y) / 2 + 14, text: "СБОР",      color: "#34d399" },
    { x: (POS.center.x + POS.leads.x) / 2,        y: POS.center.y - 20,                       text: "АНАЛИЗ",    color: "#a78bfa" },
    { x: (POS.leads.x  + POS.deal.x)  / 2,        y: POS.leads.y - 20,                        text: "КОНВЕРСИЯ", color: "#facc15" },
  ];

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 64,
      fontFamily: "Montserrat, sans-serif",
    }}>
      {/* Text block */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
        padding: "48px 24px 16px",
        gap: 18,
        width: "100%",
        maxWidth: 860,
        position: "relative", zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(99,102,241,0.13)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 100, padding: "7px 18px",
          }}
        >
          <Zap size={12} color="#a5b4fc" fill="#a5b4fc" />
          <span style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>
            B2B лидогенерация нового поколения
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            margin: 0,
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em",
            background: "linear-gradient(130deg, #ffffff 0%, #c7d2fe 55%, #818cf8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          Перехват клиентов<br />у ваших конкурентов
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ margin: 0, color: "#94a3b8", fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 500, lineHeight: 1.65, maxWidth: 540 }}
        >
          Получайте целевые контакты потенциальных клиентов вашей ниши и превращайте их в сделки через нашу автоматизированную систему
        </motion.p>
      </div>

      {/* Schema */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35 }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 980,
          padding: "0 16px 0",
          boxSizing: "border-box", flex: 1, display: "flex", alignItems: "stretch",
        }}
      >
        <div style={{
          width: "100%", borderRadius: 20, overflow: "visible",
          background: "rgba(10,18,42,0.5)",
          border: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative", padding: "8px", boxSizing: "border-box",
        }}>
          <motion.svg
            viewBox="0 48 720 438"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%", display: "block", minHeight: 340 }}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <defs>
              <radialGradient id="cGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4338ca" />
              </radialGradient>
              {CONNS.map(c => (
                <marker key={c.id} id={`mk-${c.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 1,6 3,0 5" fill={c.color} opacity="0.85" />
                </marker>
              ))}
            </defs>
            <g>
              {CONNS.map((c) => {
                const { nx, ny } = dir(c.from, c.to);
                const lx1 = c.from.x + nx * (c.r1 + 2), ly1 = c.from.y + ny * (c.r1 + 2);
                const lx2 = c.to.x   - nx * (c.r2 + 9), ly2 = c.to.y   - ny * (c.r2 + 9);
                const hl = active === null
                  || (c.id === "s-c" && (active === "sites"  || active === "center"))
                  || (c.id === "p-c" && (active === "phones" || active === "center"))
                  || (c.id === "c-l" && (active === "center" || active === "leads"))
                  || (c.id === "l-d" && (active === "leads"  || active === "deal"));
                return (
                  <g key={c.id} opacity={hl ? 1 : 0.08} style={{ transition: "opacity 0.3s" }}>
                    <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={c.color} strokeWidth="0.8" opacity={0.2} />
                    <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="transparent" strokeWidth="1.5" markerEnd={`url(#mk-${c.id})`} />
                    <DashedLine x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay} />
                    <Particle   x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay} />
                    <Particle   x1={lx1} y1={ly1} x2={lx2} y2={ly2} color={c.color} delay={c.delay + 0.95} />
                  </g>
                );
              })}
              {NODES.map((node, i) => (
                <g key={node.id} opacity={dim(node.id) ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                  <SatNode node={node} active={active === node.id} onHover={setActive} idx={i} />
                </g>
              ))}
              <g opacity={dim("center") ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                <CenterNode active={active === "center"} onHover={setActive} />
              </g>
              {flowLabels.map((l, i) => (
                <motion.text key={i} x={l.x} y={l.y} textAnchor="middle"
                  fill={l.color} fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
                  transition={{ delay: 1.0 + i * 0.12 }}
                >{l.text}</motion.text>
              ))}
              {["sites", "phones", "center", "leads", "deal"].map(id => (
                <TooltipCard key={id} id={id} active={active === id} />
              ))}
            </g>
          </motion.svg>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            style={{
              position: "absolute", bottom: 14, right: 20,
              color: "rgba(148,163,184,0.4)", fontSize: 10,
              fontWeight: 600, letterSpacing: "0.06em",
              pointerEvents: "none", fontFamily: "Montserrat, sans-serif",
            }}
          >НАВЕДИТЕ НА БЛОК</motion.div>
        </div>
      </motion.div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ position: "relative", zIndex: 1, padding: "28px 24px 48px" }}
      >
        <motion.a
          href={CTA}
          whileHover={{ scale: 1.05, boxShadow: "0 0 44px rgba(99,102,241,0.65)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: "#fff", textDecoration: "none", borderRadius: 14,
            padding: "19px 52px", fontSize: 18, fontWeight: 700,
            fontFamily: "Montserrat, sans-serif", cursor: "pointer",
            letterSpacing: "0.03em",
            boxShadow: "0 0 28px rgba(99,102,241,0.45), 0 6px 20px rgba(0,0,0,0.4)",
          }}
        >Оставить заявку</motion.a>
      </motion.div>
    </section>
  );
}
