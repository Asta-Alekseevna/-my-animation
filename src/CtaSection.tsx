import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Mail, Phone, Send, MessageCircle } from "lucide-react";

const CTA = "https://conversion-lab.tilda.ws/#rec2213007531";

export function CtaSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Tilda form section
    window.open(CTA, "_blank");
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(10,18,42,0.8)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: 12,
    padding: "14px 18px",
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Montserrat, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  return (
    <>
      {/* CTA Banner */}
      <section style={{
        padding: "100px clamp(16px, 4vw, 48px) 60px",
        maxWidth: 1140,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "Montserrat, sans-serif",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(10,18,42,0.9) 60%, rgba(79,70,229,0.12) 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 28,
            padding: "clamp(40px, 5vw, 72px) clamp(24px, 5vw, 80px)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(99,102,241,0.1), 0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* BG glows */}
          <div style={{ position: "absolute", top: -80, right: 80, width: 300, height: 300, background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: 40,  width: 240, height: 240, background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 100, padding: "5px 16px", marginBottom: 20,
            }}>
              <Zap size={11} color="#a5b4fc" fill="#a5b4fc" />
              <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
                Начните сегодня
              </span>
            </div>

            <h2 style={{
              margin: "0 0 16px",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
              color: "#f1f5f9",
            }}>
              Получите первых лидов<br />
              <span style={{
                background: "linear-gradient(90deg, #818cf8, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>уже сегодня</span>
            </h2>

            <p style={{ color: "#64748b", fontSize: "clamp(13px, 1.3vw, 15px)", fontWeight: 500, lineHeight: 1.65, margin: "0 0 28px", maxWidth: 460 }}>
              Оставьте заявку — мы свяжемся в течение 15 минут, обсудим вашу нишу и запустим сбор лидов уже сегодня.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { icon: MessageCircle, text: "Ответим за 15 минут", color: "#34d399" },
                { icon: Send, text: "Запуск за 2 часа", color: "#818cf8" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <item.icon size={14} color={item.color} />
                  <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(6,12,30,0.8)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 20,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minWidth: 280,
              width: "100%",
              maxWidth: 340,
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
                <div style={{ color: "#34d399", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Переходим к заявке!</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>Заполните форму на сайте</div>
              </div>
            ) : (
              <>
                <div style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Оставить заявку</div>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(99,102,241,0.25)"}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                    onBlur={e => e.target.style.borderColor = "rgba(99,102,241,0.25)"}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#fff", border: "none", borderRadius: 12,
                    padding: "15px", fontSize: 14, fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif", cursor: "pointer",
                    letterSpacing: "0.02em",
                    boxShadow: "0 0 20px rgba(99,102,241,0.35)",
                    marginTop: 4,
                  }}
                >Получить лиды →</motion.button>
                <p style={{ margin: 0, color: "#475569", fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </>
            )}
          </motion.form>

          <style>{`@media (max-width: 768px) { form { max-width: 100% !important; } }`}</style>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(99,102,241,0.1)",
        padding: "32px clamp(16px, 4vw, 48px)",
        fontFamily: "Montserrat, sans-serif",
        maxWidth: 1140,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 12px rgba(99,102,241,0.35)",
          }}>
            <Zap size={13} color="#fff" fill="#fff" />
          </div>
          <span style={{ color: "#475569", fontSize: 13, fontWeight: 700 }}>
            Conversion<span style={{ color: "#6366f1" }}>Lab</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <a href="mailto:info@conversion-lab.ru" style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
            <Mail size={13} color="#6366f1" />
            info@conversion-lab.ru
          </a>
          <a href="tel:+78001234567" style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
            <Phone size={13} color="#6366f1" />
            8 800 123-45-67
          </a>
        </div>

        <span style={{ color: "#334155", fontSize: 11, fontWeight: 500 }}>
          © 2026 ConversionLab. Все права защищены.
        </span>
      </footer>
    </>
  );
}
