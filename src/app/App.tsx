import { Navbar }      from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks }  from "./components/HowItWorks";
import { Benefits }    from "./components/Benefits";
import { Stats }       from "./components/Stats";
import { Pricing }     from "./components/Pricing";
import { Faq }         from "./components/Faq";
import { CtaSection }  from "./components/CtaSection";

export default function App() {
  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060c1e 0%, #0b1228 45%, #07101f 100%)",
      fontFamily: "Montserrat, sans-serif",
      position: "relative",
      overflowX: "hidden",
      color: "#f1f5f9",
    }}>

      {/* ── Fixed global dot-grid background ── */}
      <svg style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        opacity: 0.045, pointerEvents: "none", zIndex: 0,
      }}>
        <defs>
          <pattern id="dotpat" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill="#60a5fa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotpat)" />
      </svg>

      {/* ── Ambient glow blobs (fixed) ── */}
      <div style={{ position: "fixed", top: -80,  left: "50%", transform: "translateX(-50%)", width: 700, height: 320, background: "radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)",  pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: 0, left: "5%",  width: 400, height: 400, background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",    pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: 0, right: "4%", width: 340, height: 340, background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)",   pointerEvents: "none", zIndex: 0 }} />

      {/* ── Section separators (thin gradient lines) ── */}
      <style>{`
        .section-sep {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.18) 30%, rgba(99,102,241,0.18) 70%, transparent 100%);
          margin: 0;
        }
      `}</style>

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />

        <div className="section-sep" />
        <HowItWorks />

        <Stats />

        <div className="section-sep" />
        <Benefits />

        <div className="section-sep" />
        <Pricing />

        <div className="section-sep" />
        <Faq />

        <CtaSection />
      </div>
    </div>
  );
}
