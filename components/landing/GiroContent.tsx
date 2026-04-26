import Link from "next/link";
import type { MacroEditorial } from "./macros";
import { MockDashboard, MockPhone, POSMockup } from "./Mockups";
import PricingTable from "./PricingTable";
import type { BusinessTypeDto, PlanDto } from "@/lib/api";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

const SERIF: React.CSSProperties = {
  fontFamily: "var(--font-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

interface GiroContentProps {
  macro: MacroEditorial;
  businessType: BusinessTypeDto;
  plans: PlanDto[];
}

export default function GiroContent({ macro, businessType, plans }: GiroContentProps) {
  const registerHref = `${APP_URL}/register?plan=free&giro=${businessType.slug}&country=MX&cycle=monthly`;
  return (
    <>
      {/* HERO */}
      <section style={{ background: macro.softTint, position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 0" }}>
          <Link
            href="/"
            style={{
              background: "transparent",
              border: "none",
              color: "#64748b",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
            }}
          >
            ← Todos los giros
          </Link>
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 32px 60px",
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "6px 12px",
                borderRadius: 999,
                background: "white",
                border: `1px solid ${macro.accent}33`,
                color: macro.accent,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: macro.accent }} />
              {macro.badge}
            </span>
            <h1
              style={{
                fontSize: 60,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                fontWeight: 700,
                color: "#0f172a",
                marginTop: 22,
                marginBottom: 0,
              }}
            >
              {macro.headline.pre}{" "}
              <span style={{ ...SERIF, color: macro.accent }}>{macro.headline.em}</span>
              {macro.headline.post}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#475569", marginTop: 22, maxWidth: 500 }}>
              {macro.sub}
            </p>

            {/* 3 stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid #e2e8f0",
              }}
            >
              {[macro.stat1, macro.stat2, macro.stat3].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: 36,
                      lineHeight: 1,
                      fontStyle: "italic",
                      color: macro.accent,
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <a
                href={registerHref}
                style={{
                  background: macro.accent,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "13px 22px",
                  borderRadius: 10,
                  textDecoration: "none",
                }}
              >
                Empezar gratis →
              </a>
              <a
                href="#precios"
                style={{
                  background: "white",
                  color: "#0f172a",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "13px 22px",
                  borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid #e2e8f0",
                }}
              >
                Ver planes
              </a>
            </div>
          </div>
          <div>
            <POSMockup macro={macro} />
          </div>
        </div>
      </section>

      {/* BENEFICIOS — split con UI */}
      <section style={{ background: "white", padding: "90px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
              LO QUE RESUELVE
            </span>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.025em",
                marginTop: 12,
                lineHeight: 1.1,
                maxWidth: 720,
                marginInline: "auto",
              }}
            >
              Tres cosas que tu día a día <span style={SERIF}>te va a agradecer</span>
            </h2>
          </div>

          {macro.benefits.map((b, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={b.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 56,
                  alignItems: "center",
                  padding: "40px 0",
                  borderTop: i === 0 ? "none" : "1px solid #f1f5f9",
                }}
              >
                <div style={{ order: reverse ? 2 : 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: 42,
                      fontStyle: "italic",
                      color: macro.accent,
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.02em",
                      margin: "12px 0 12px",
                      lineHeight: 1.2,
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                </div>
                <div style={{ order: reverse ? 1 : 2 }}>
                  {i === 0 && <POSMockup macro={macro} />}
                  {i === 1 && <MockDashboard accent={macro.accent} />}
                  {i === 2 && <MockPhone accent={macro.accent} />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TIRA SUB-GIROS */}
      <section style={{ background: macro.softTint, padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: macro.accent,
              marginBottom: 18,
            }}
          >
            TAMBIÉN FUNCIONA PARA
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {macro.subgiros.map((s) => (
              <span
                key={s}
                style={{
                  padding: "9px 16px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 999,
                  fontSize: 13,
                  color: "#0f172a",
                  fontWeight: 500,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PricingTable
        plans={plans}
        macro={macro}
        activeMacroId={businessType.macroCategoryId}
        giroSlug={businessType.slug}
      />

      {/* CTA */}
      <section
        style={{
          background: "#0f172a",
          padding: "90px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 0%, ${macro.accent}40, transparent 60%)`,
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.025em",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Lleva tu negocio al <span style={{ ...SERIF, color: "#86efac" }}>siguiente nivel</span>.
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 16 }}>
            Cobra mejor desde hoy. 14 días gratis, sin tarjeta.
          </p>
          <a
            href={registerHref}
            style={{
              display: "inline-block",
              marginTop: 28,
              background: macro.accent,
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Empezar con Fino →
          </a>
        </div>
      </section>
    </>
  );
}
