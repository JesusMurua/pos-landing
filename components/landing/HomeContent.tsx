"use client";

import { useState } from "react";
import Link from "next/link";
import { MACROS, POWER_FEATURES, TRES_RAZONES, TRUSTED_BY, type MacroSlug } from "./macros";
import { MockDashboard, MockPhone, POSMockup } from "./Mockups";
import PricingTable from "./PricingTable";
import type { PlanDto } from "@/lib/api";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";
const REGISTER_HREF = `${APP_URL}/register?plan=free&country=MX&cycle=monthly`;

const SERIF: React.CSSProperties = {
  fontFamily: "var(--font-serif), serif",
  fontStyle: "italic",
  fontWeight: 400,
};

interface HomeContentProps {
  plans: PlanDto[];
}

export default function HomeContent({ plans }: HomeContentProps) {
  const [currentMacro, setCurrentMacro] = useState<MacroSlug>("food-beverage");
  const macro = MACROS.find((m) => m.slug === currentMacro) ?? MACROS[0];

  return (
    <>
      {/* HERO */}
      <section style={{ background: macro.softTint, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 32px 80px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "6px 14px",
              borderRadius: 999,
              background: "white",
              border: `1px solid ${macro.accent}33`,
              color: macro.accent,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "white",
                background: macro.accent,
                padding: "2px 7px",
                borderRadius: 4,
              }}
            >
              NUEVO
            </span>
            Cobrar nunca había sido tan claro
          </span>

          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              color: "#0f172a",
              marginTop: 22,
              marginBottom: 0,
              maxWidth: 880,
              marginInline: "auto",
            }}
          >
            Tu <span style={{ ...SERIF, color: macro.accent }}>All-In-One</span>
            <br />
            para cobrar mejor cada día.
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#475569",
              marginTop: 24,
              maxWidth: 580,
              marginInline: "auto",
            }}
          >
            Punto de venta, inventario, facturación y reportes. Todo conectado, todo simple, todo desde una pantalla.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "center" }}>
            <a
              href={REGISTER_HREF}
              style={{
                background: macro.accent,
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                padding: "13px 24px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Empezar gratis →
            </a>
            <a
              href="#"
              style={{
                background: "white",
                color: "#0f172a",
                fontSize: 14,
                fontWeight: 600,
                padding: "13px 24px",
                borderRadius: 10,
                textDecoration: "none",
                border: "1px solid #e2e8f0",
              }}
            >
              Agendar demo
            </a>
          </div>

          <div style={{ marginTop: 56, position: "relative", maxWidth: 980, marginInline: "auto" }}>
            <POSMockup macro={macro} />

            {/* phone flotante */}
            <div
              style={{
                position: "absolute",
                left: -60,
                bottom: -40,
                width: 180,
                transform: "rotate(-6deg)",
              }}
            >
              <div
                style={{
                  width: 180,
                  background: "#0f172a",
                  borderRadius: 24,
                  padding: 6,
                  boxShadow: "0 30px 60px -20px rgba(15,23,42,0.4)",
                }}
              >
                <div style={{ background: "white", borderRadius: 19, padding: 12 }}>
                  <div style={{ fontSize: 9, color: "#64748b", fontWeight: 700 }}>HOY</div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>$8,420</div>
                  <div style={{ fontSize: 9, color: "#16a34a", fontWeight: 700 }}>↗ +18%</div>
                  <svg viewBox="0 0 160 40" style={{ width: "100%", marginTop: 6 }}>
                    <path
                      d="M5,30 L25,20 L50,24 L80,12 L110,18 L140,8 L155,5"
                      stroke={macro.accent}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* badge flotante */}
            <div
              style={{
                position: "absolute",
                right: -30,
                top: 60,
                background: "white",
                borderRadius: 12,
                padding: "12px 16px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
                border: "1px solid #e2e8f0",
                transform: "rotate(4deg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>Mesa 3 cobrada</div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>$1,280</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section style={{ background: "white", padding: "64px 32px 48px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 24 }}>
            Negocios que ya cobran con Fino
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 32,
              opacity: 0.55,
            }}
          >
            {TRUSTED_BY.map((b, i) => (
              <span
                key={b}
                style={{
                  fontSize: 22,
                  fontWeight: i % 2 ? 800 : 400,
                  fontStyle: i % 3 === 0 ? "italic" : "normal",
                  letterSpacing: "-0.02em",
                  color: "#0f172a",
                  fontFamily: i % 2 ? "Inter" : "var(--font-serif), serif",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRES RAZONES */}
      <section style={{ background: "white", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
            POR QUÉ FINO
          </span>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              marginTop: 12,
              marginBottom: 40,
              maxWidth: 700,
              marginInline: "auto",
              lineHeight: 1.1,
            }}
          >
            Tres beneficios que sí <span style={SERIF}>se sienten</span> desde el primer día
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {TRES_RAZONES.map((r, i) => (
              <div
                key={r.num}
                style={{
                  textAlign: "left",
                  padding: 28,
                  background: i === 1 ? "#0f172a" : "#f8fafc",
                  color: i === 1 ? "white" : "#0f172a",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 56,
                    fontStyle: "italic",
                    lineHeight: 1,
                    color: macro.accent,
                    marginBottom: 14,
                  }}
                >
                  {r.num}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 10px" }}>
                  {r.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                    color: i === 1 ? "#cbd5e1" : "#475569",
                  }}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POWER FEATURES */}
      <section style={{ background: macro.softTint, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
              EL PODER DE FINO
            </span>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.025em",
                marginTop: 12,
                lineHeight: 1.1,
                maxWidth: 700,
                marginInline: "auto",
              }}
            >
              Desbloquea lo que tu negocio <span style={SERIF}>ya sabía</span> hacer
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {POWER_FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: macro.accent,
                      letterSpacing: "0.08em",
                      padding: "4px 8px",
                      background: macro.softBg,
                      borderRadius: 5,
                    }}
                  >
                    {f.chip}
                  </span>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.02em",
                      margin: "14px 0 8px",
                      lineHeight: 1.2,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
                <div style={{ marginTop: "auto" }}>
                  {i === 0 ? (
                    <MockPhone accent={macro.accent} />
                  ) : (
                    <div style={{ transform: "scale(0.92)", transformOrigin: "top left", width: "108%" }}>
                      <MockDashboard accent={macro.accent} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTOR DE GIRO */}
      <section id="giros" style={{ background: "white", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
              HECHO PARA TI
            </span>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.025em",
                marginTop: 12,
                lineHeight: 1.1,
              }}
            >
              No importa qué vendas. <span style={SERIF}>Fino se acomoda</span>.
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", marginTop: 12 }}>
              Elige tu giro y mira cómo cambia la pantalla.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {MACROS.map((m) => {
              const active = m.slug === currentMacro;
              return (
                <button
                  key={m.slug}
                  onClick={() => setCurrentMacro(m.slug)}
                  style={{
                    background: active ? m.softBg : "white",
                    border: active ? `1.5px solid ${m.accent}` : "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "16px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{ width: 28, height: 28, borderRadius: 7, background: m.accent, marginBottom: 10 }}
                  />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, lineHeight: 1.5 }}>{m.short}</div>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div
            style={{
              background: macro.softBg,
              border: `1px solid ${macro.accent}22`,
              borderRadius: 18,
              padding: 32,
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
                {macro.label.toUpperCase()}
              </span>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "-0.025em",
                  margin: "12px 0 14px",
                  lineHeight: 1.15,
                }}
              >
                {macro.headline.pre}{" "}
                <span style={{ ...SERIF, color: macro.accent }}>{macro.headline.em}</span>
                {macro.headline.post}
              </h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{macro.sub}</p>
              <Link
                href={`/${macro.representativeGiroSlug}`}
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  background: macro.accent,
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "11px 18px",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Ver Fino para {macro.label.toLowerCase()} →
              </Link>
            </div>
            <POSMockup macro={macro} />
          </div>
        </div>
      </section>

      <PricingTable plans={plans} macro={macro} />

      {/* CTA FINAL */}
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
            background: `radial-gradient(circle at 50% 0%, ${macro.accent}33, transparent 60%)`,
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.025em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Empieza <span style={{ ...SERIF, color: "#86efac" }}>hoy mismo</span>.
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 16 }}>
            14 días gratis. Sin tarjeta. Sin compromiso.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <a
              href={REGISTER_HREF}
              style={{
                background: "#16a34a",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Crear mi cuenta gratis →
            </a>
            <a
              href="#"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#cbd5e1",
                fontSize: 14,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Hablar con ventas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
