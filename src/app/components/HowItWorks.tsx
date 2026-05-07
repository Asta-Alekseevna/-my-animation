import { motion } from "motion/react";
import { Globe, Database, PhoneCall, Handshake } from "lucide-react";

const STEPS = [
  {
    n: "01",
    Icon: Globe,
    color: "#38bdf8",
    title: "Указываете конкурентов",
    desc: "Передаёте нам сайты конкурентов или загружаете базу телефонных номеров. Никаких сложных настроек — просто ссылки.",
  },
  {
    n: "02",
    Icon: Database,
    color: "#818cf8",
    title: "Мы собираем данные",
    desc: "Система автоматически извлекает контакты посетителей конкурентских сайтов и структурирует их для обработки.",
  },
  {
    n: "03",
    Icon: PhoneCall,
    color: "#f472b6",
    title: "Колл-центр звонит",
    desc: "Наши операторы обзванивают контакты по вашему скрипту, квалифицируют лиды и передают только тёплых клиентов.",
  },
  {
    n: "04",
    Icon: Handshake,
    color: "#facc15",
    title: "Вы закрываете сделки",
    desc: "Получаете готовых к покупке клиентов напрямую в CRM. Вам остаётся только провести встречу и подписать договор.",
  },
];

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(99,102,241,0.1)",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 100, padding: "5px 16px", marginBottom: 16,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
      <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
        {text}
      </span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" style={{
      padding: "100px clamp(16px, 4vw, 48px)",
      maxWidth: 1140,
      margin: "0 auto",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "Montserrat, sans-serif",
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 64 }}
      >
        <SectionLabel text="Процесс" />
        <h2 style={{
          margin: "0 0 16px",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
          background: "linear-gradient(130deg, #ffffff 0%, #c7d2fe 60%, #818cf8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Как это работает
        </h2>
        <p style={{ color: "#64748b", fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 500, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
          Запуск занимает 2 часа. Уже в первый день вы получаете первые тёплые контакты.
        </p>
      </motion.div>

      {/* Steps */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: 24,
        position: "relative",
      }}>
        {/* Connector line (desktop) */}
        <div style={{
          position: "absolute", top: 52, left: "12.5%", right: "12.5%", height: 1,
          background: "linear-gradient(90deg, #38bdf830, #818cf850, #f472b830, #facc1530)",
          pointerEvents: "none",
        }} />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: `0 16px 48px ${step.color}20, 0 0 0 1px ${step.color}30` }}
              transition={{ duration: 0.25 }}
              style={{
                background: "rgba(10,18,42,0.7)",
                border: `1px solid rgba(99,102,241,0.12)`,
                borderRadius: 20,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Glow bg */}
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 120, height: 120,
                background: `radial-gradient(circle, ${step.color}18 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Step number + icon */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, position: "relative" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 20px ${step.color}25`,
                }}>
                  <step.Icon size={22} color={step.color} />
                </div>
                <span style={{
                  fontSize: 36, fontWeight: 900, color: `${step.color}25`,
                  lineHeight: 1, letterSpacing: "-0.04em",
                }}>
                  {step.n}
                </span>
              </div>

              <h3 style={{
                margin: "0 0 10px", color: "#f1f5f9",
                fontSize: 16, fontWeight: 700, lineHeight: 1.3,
              }}>{step.title}</h3>
              <p style={{
                margin: 0, color: "#64748b",
                fontSize: 13, fontWeight: 500, lineHeight: 1.65,
              }}>{step.desc}</p>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)`,
                borderRadius: "0 0 20px 20px",
              }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
