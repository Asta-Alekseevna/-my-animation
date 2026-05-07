import { motion } from "motion/react";
import { Flame, Rocket, Phone, BarChart3, Plug, UserCheck } from "lucide-react";

const CARDS = [
  {
    Icon: Flame, color: "#f97316",
    title: "Горячие лиды",
    desc: "Вы получаете контакты людей, которые уже интересуются вашей нишей — они только что были на сайте конкурента.",
  },
  {
    Icon: Rocket, color: "#38bdf8",
    title: "Быстрый старт",
    desc: "Запуск занимает 2 часа. Никаких долгих согласований и технических интеграций — работаем с первого дня.",
  },
  {
    Icon: Phone, color: "#f472b6",
    title: "Колл-центр в комплекте",
    desc: "Профессиональные операторы обрабатывают контакты по вашему скрипту. Вам не нужно нанимать дополнительный персонал.",
  },
  {
    Icon: BarChart3, color: "#818cf8",
    title: "Аналитика в реальном времени",
    desc: "Детальная отчётность по каждому лиду: статус обработки, конверсия, источник. Всё в одном дашборде.",
  },
  {
    Icon: Plug, color: "#34d399",
    title: "CRM-интеграция",
    desc: "Автоматическая передача лидов в вашу CRM-систему — Битрикс24, AmoCRM, Salesforce и другие.",
  },
  {
    Icon: UserCheck, color: "#facc15",
    title: "Персональный менеджер",
    desc: "Выделенный менеджер для настройки кампании, работы со скриптами и оптимизации конверсии.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" style={{
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
          <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Что вы получаете</span>
        </div>
        <h2 style={{
          margin: "0 0 16px",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
          background: "linear-gradient(130deg, #ffffff 0%, #c7d2fe 60%, #818cf8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Ваши конкурентные<br />преимущества
        </h2>
        <p style={{ color: "#64748b", fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 500, maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>
          Полный комплекс инструментов для захвата аудитории конкурентов
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <motion.div
              whileHover={{ y: -5, borderColor: `${card.color}50` }}
              transition={{ duration: 0.22 }}
              style={{
                background: "rgba(10,18,42,0.65)",
                border: "1px solid rgba(99,102,241,0.12)",
                borderRadius: 18,
                padding: "28px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                height: "100%",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: `${card.color}18`,
                border: `1px solid ${card.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 18px ${card.color}20`,
              }}>
                <card.Icon size={20} color={card.color} />
              </div>

              <div>
                <h3 style={{ margin: "0 0 8px", color: "#f1f5f9", fontSize: 15, fontWeight: 700 }}>
                  {card.title}
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 13, fontWeight: 500, lineHeight: 1.65 }}>
                  {card.desc}
                </p>
              </div>

              {/* Corner glow */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                width: 80, height: 80,
                background: `radial-gradient(circle, ${card.color}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
