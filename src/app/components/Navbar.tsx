import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap } from "lucide-react";

const CTA = "https://conversion-lab.tilda.ws/#rec2213007531";

const LINKS = [
  { label: "Как работает", href: "#how" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Тарифы", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 48px)",
        height: 64,
        background: scrolled
          ? "rgba(6, 12, 30, 0.92)"
          : "rgba(6, 12, 30, 0.5)",
        borderBottom: scrolled
          ? "1px solid rgba(99,102,241,0.2)"
          : "1px solid transparent",
        backdropFilter: "blur(16px)",
        transition: "background 0.3s, border-color 0.3s",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(99,102,241,0.4)",
        }}>
          <Zap size={16} color="#fff" fill="#fff" />
        </div>
        <span style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" }}>
          Conversion<span style={{ color: "#818cf8" }}>Lab</span>
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}
        className="hidden-mobile">
        {LINKS.map(l => (
          <button key={l.href} onClick={() => scroll(l.href)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#94a3b8", fontSize: 13, fontWeight: 600,
              fontFamily: "Montserrat, sans-serif", letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
          >{l.label}</button>
        ))}
        <motion.a
          href={CTA}
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "#fff", textDecoration: "none",
            borderRadius: 10, padding: "9px 22px",
            fontSize: 13, fontWeight: 700,
            fontFamily: "Montserrat, sans-serif",
            boxShadow: "0 0 16px rgba(99,102,241,0.3)",
            letterSpacing: "0.02em",
          }}
        >Оставить заявку</motion.a>
      </div>

      {/* Mobile burger */}
      <button onClick={() => setOpen(o => !o)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#f1f5f9", display: "none" }}
        className="show-mobile">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 64, left: 0, right: 0,
              background: "rgba(6,12,30,0.97)",
              borderBottom: "1px solid rgba(99,102,241,0.2)",
              padding: "16px 24px 24px",
              display: "flex", flexDirection: "column", gap: 16,
              backdropFilter: "blur(20px)",
            }}
          >
            {LINKS.map(l => (
              <button key={l.href} onClick={() => scroll(l.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94a3b8", fontSize: 15, fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif", textAlign: "left",
                  padding: "8px 0",
                }}
              >{l.label}</button>
            ))}
            <a href={CTA}
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "#fff", textDecoration: "none",
                borderRadius: 10, padding: "12px 24px",
                fontSize: 14, fontWeight: 700,
                fontFamily: "Montserrat, sans-serif", textAlign: "center",
              }}
            >Оставить заявку</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
