import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const STATS = [
  { value: 10000, suffix: "+", label: "Контактов в день", color: "#38bdf8" },
  { value: 87,    suffix: "%", label: "Целевых лидов",    color: "#818cf8" },
  { value: 2,     suffix: " ч", label: "До первых лидов", color: "#34d399" },
  { value: 300,   suffix: "+", label: "Компаний-клиентов", color: "#facc15" },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const duration = 1800;
    const steps = 60;
    const step = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (current >= steps) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>{val.toLocaleString("ru-RU")}{suffix}</span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      padding: "0 clamp(16px, 4vw, 48px) 24px",
      fontFamily: "Montserrat, sans-serif",
      width: "100%",
      boxSizing: "border-box",
    }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          background: "rgba(10,18,42,0.7)",
          border: "1px solid rgba(99,102,241,0.18)",
          borderRadius: 24,
          padding: "48px clamp(24px, 4vw, 64px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 200,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ textAlign: "center", position: "relative" }}
          >
            <div style={{
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 900,
              color: s.color,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 8,
              textShadow: `0 0 32px ${s.color}60`,
            }}>
              <Counter target={s.value} suffix={s.suffix} active={inView} />
            </div>
            <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
              {s.label}
            </div>

            {/* Vertical divider (between items) */}
            {i < STATS.length - 1 && (
              <div style={{
                position: "absolute", right: -16, top: "10%", bottom: "10%", width: 1,
                background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.2), transparent)",
              }} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}