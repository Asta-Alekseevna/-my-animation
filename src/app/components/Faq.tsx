import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const ITEMS = [
  {
    q: "Законно ли перехватывать клиентов конкурентов?",
    a: "Да, полностью законно. Мы работаем исключительно с открытыми данными и не нарушаем законодательство о персональных данных (152-ФЗ). Наша система анализирует публично доступную информацию, не взламывая сайты и не собирая закрытые сведения.",
  },
  {
    q: "Сколько лидов я получу в первый месяц?",
    a: "Количество лидов зависит от трафика конкурентов и выбранного тарифа. В среднем клиенты на тарифе «Бизнес» получают от 800 до 2 000 квалифицированных контактов в месяц уже с первой недели работы.",
  },
  {
    q: "Как быстро начнёт работать система?",
    a: "Запуск занимает от 2 до 4 часов с момента оплаты. Наши специалисты настроят систему, согласуют скрипт с вашим менеджером и запустят первый обзвон. Первые лиды поступят уже в день подключения.",
  },
  {
    q: "Что мне нужно предоставить для старта?",
    a: "Только ссылки на сайты конкурентов (или базу телефонных номеров) и краткую информацию о вашем продукте. Всё остальное — скрипт, обзвон, аналитику — мы берём на себя.",
  },
  {
    q: "Есть ли пробный период?",
    a: "Да. Мы предоставляем тестовый период на 3 дня с ограниченным числом лидов, чтобы вы могли убедиться в качестве данных и работе колл-центра перед оплатой полного тарифа.",
  },
  {
    q: "Как работает оплата?",
    a: "Оплата производится ежемесячно по безналичному расчёту. Мы работаем с ИП и юридическими лицами, предоставляем закрывающие документы. Возможна оплата за квартал со скидкой 10%.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{
      padding: "100px clamp(16px, 4vw, 48px)",
      maxWidth: 860,
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
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 100, padding: "5px 16px", marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
          <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>FAQ</span>
        </div>
        <h2 style={{
          margin: "0 0 16px",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
          background: "linear-gradient(130deg, #ffffff 0%, #c7d2fe 60%, #818cf8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Частые вопросы
        </h2>
        <p style={{ color: "#64748b", fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 500, maxWidth: 420, margin: "0 auto", lineHeight: 1.6 }}>
          Ответы на вопросы, которые чаще всего задают наши клиенты
        </p>
      </motion.div>

      {/* Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <div
              style={{
                background: open === i
                  ? "rgba(99,102,241,0.08)"
                  : "rgba(10,18,42,0.65)",
                border: open === i
                  ? "1px solid rgba(99,102,241,0.35)"
                  : "1px solid rgba(99,102,241,0.1)",
                borderRadius: 16,
                overflow: "hidden",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              {/* Question row */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none",
                  cursor: "pointer", padding: "22px 24px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 16, textAlign: "left", fontFamily: "Montserrat, sans-serif",
                }}
              >
                <span style={{
                  color: open === i ? "#e2e8f0" : "#cbd5e1",
                  fontSize: "clamp(13px, 1.3vw, 15px)",
                  fontWeight: 700, lineHeight: 1.4, flex: 1,
                }}>
                  {item.q}
                </span>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: open === i ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s",
                }}>
                  {open === i
                    ? <Minus size={13} color="#a5b4fc" />
                    : <Plus size={13} color="#a5b4fc" />
                  }
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      padding: "0 24px 22px",
                      color: "#64748b",
                      fontSize: "clamp(13px, 1.2vw, 14px)",
                      fontWeight: 500, lineHeight: 1.7,
                    }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
