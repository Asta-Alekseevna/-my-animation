import { motion } from "motion/react";
import { Check, Zap, Star, Building2 } from "lucide-react";

const CTA = "https://conversion-lab.tilda.ws/#rec2213007531";

const PLANS = [
  {
    Icon: Zap,
    name: "Старт",
    price: "29 900",
    period: "₽ / мес",
    desc: "Для малого бизнеса, который только начинает работу с лидами",
    color: "#38bdf8",
    popular: false,
    features: [
      "До 500 лидов в месяц",
      "Сбор с 1 сайта конкурента",
      "Базовая аналитика",
      "Email-поддержка",
      "Отчёт раз в неделю",
    ],
    missing: ["Колл-центр", "CRM-интеграция", "Персональный менеджер"],
  },
  {
    Icon: Star,
    name: "Бизнес",
    price: "59 900",
    period: "₽ / мес",
    desc: "Оптимальный выбор для активного роста и масштабирования продаж",
    color: "#6366f1",
    popular: true,
    features: [
      "До 2 000 лидов в месяц",
      "До 5 сайтов конкурентов",
      "Колл-центр включён",
      "Полная аналитика + дашборд",
      "CRM-интеграция",
      "Персональный менеджер",
      "Ежедневные отчёты",
    ],
    missing: [],
  },
  {
    Icon: Building2,
    name: "Корпоратив",
    price: "По запросу",
    period: "",
    desc: "Индивидуальное решение для крупного бизнеса с нестандартными задачами",
    color: "#facc15",
    popular: false,
    features: [
      "Неограниченное число лидов",
      "Любое число конкурентов",
      "Выделенная команда операторов",
      "Кастомные скрипты продаж",
      "Глубокая CRM-интеграция",
      "Приоритетная поддержка 24/7",
      "Индивидуальная аналитика",
    ],
    missing: [],
  },
];

export function Pricing() {
  return (
    <section id="pricing" style={{
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
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 100, padding: "5px 16px", marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
          <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Тарифы</span>
        </div>
        <h2 style={{
          margin: "0 0 16px",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
          background: "linear-gradient(130deg, #ffffff 0%, #c7d2fe 60%, #818cf8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Прозрачные цены
        </h2>
        <p style={{ color: "#64748b", fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 500, maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
          Выберите тариф, который подходит вашему бизнесу
        </p>
      </motion.div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: 24,
        alignItems: "stretch",
      }}>
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                background: plan.popular
                  ? "linear-gradient(160deg, rgba(99,102,241,0.18) 0%, rgba(10,18,42,0.85) 100%)"
                  : "rgba(10,18,42,0.7)",
                border: plan.popular
                  ? "1px solid rgba(99,102,241,0.5)"
                  : "1px solid rgba(99,102,241,0.12)",
                borderRadius: 22,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.popular
                  ? "0 0 48px rgba(99,102,241,0.15), 0 20px 60px rgba(0,0,0,0.4)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute", top: 20, right: 20,
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "#fff", fontSize: 10, fontWeight: 800,
                  padding: "4px 12px", borderRadius: 100,
                  letterSpacing: "0.06em", textTransform: "uppercase" as const,
                  boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                }}>Популярный</div>
              )}

              {/* Glow */}
              <div style={{
                position: "absolute", top: -40, left: -40,
                width: 160, height: 160,
                background: `radial-gradient(circle, ${plan.color}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${plan.color}20`,
                  border: `1px solid ${plan.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 16px ${plan.color}25`,
                }}>
                  <plan.Icon size={20} color={plan.color} />
                </div>
                <span style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 800 }}>{plan.name}</span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 12 }}>
                <span style={{
                  fontSize: plan.price === "По запросу" ? 28 : "clamp(32px, 3vw, 40px)",
                  fontWeight: 900, color: plan.color,
                  letterSpacing: "-0.03em",
                  textShadow: `0 0 24px ${plan.color}50`,
                }}>{plan.price}</span>
                {plan.period && (
                  <span style={{ color: "#64748b", fontSize: 14, fontWeight: 600, marginLeft: 4 }}>{plan.period}</span>
                )}
              </div>

              <p style={{ color: "#64748b", fontSize: 13, fontWeight: 500, lineHeight: 1.6, margin: "0 0 24px" }}>
                {plan.desc}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(99,102,241,0.12)", margin: "0 0 20px" }} />

              {/* Features */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: `${plan.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={11} color={plan.color} strokeWidth={3} />
                    </div>
                    <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.35 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(100,116,139,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: 8, height: 1, background: "#64748b" }} />
                    </div>
                    <span style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href={CTA}
                whileHover={{ scale: 1.03, boxShadow: `0 0 28px ${plan.color}50` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "block", textAlign: "center", textDecoration: "none",
                  background: plan.popular
                    ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                    : `${plan.color}18`,
                  color: plan.popular ? "#fff" : plan.color,
                  border: plan.popular ? "none" : `1px solid ${plan.color}40`,
                  borderRadius: 12,
                  padding: "14px",
                  fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: plan.popular ? "0 0 20px rgba(99,102,241,0.35)" : "none",
                }}
              >
                {plan.price === "По запросу" ? "Обсудить условия" : "Выбрать тариф"}
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
