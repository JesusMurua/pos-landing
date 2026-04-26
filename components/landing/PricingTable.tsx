"use client";

import { useState } from "react";
import type { MacroEditorial } from "./macros";
import { PLAN_TAGLINE } from "./pricing-data";
import type { PlanDto, PlanFeatureDto } from "@/lib/api";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

interface PricingTableProps {
  plans: PlanDto[];
  macro: MacroEditorial;
  activeMacroId?: number;
  giroSlug?: string;
}

function Check({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
      <path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(value?: number | null): string {
  if (value === undefined || value === null) return "Personalizado";
  return `$${value.toLocaleString("en-US")}`;
}

function isFeatureVisible(
  feat: string | PlanFeatureDto,
  activeMacroId: number | undefined,
): boolean {
  if (activeMacroId === undefined) return true;
  if (typeof feat === "string") return true;
  const ids = feat.applicableMacroCategoryIds;
  if (!ids || ids.length === 0) return true;
  return ids.includes(activeMacroId);
}

function ctaLabel(plan: PlanDto): string {
  if (plan.monthlyPrice === null && plan.annualPrice === null) return "Hablar con ventas";
  if (plan.monthlyPrice === 0) return "Empezar gratis";
  return "Comenzar";
}

function formatFeatureText(feature: PlanFeatureDto | string): string {
  if (typeof feature === "string") return feature;
  if (feature.isQuantitative) {
    const limitValue =
      feature.defaultLimit ?? (feature as { limit?: number | null }).limit;
    const isUnlimited =
      limitValue === undefined || limitValue === null || limitValue === -1;
    const limitText = isUnlimited ? "Ilimitado" : limitValue;
    return `${feature.name}: ${limitText}`;
  }
  return feature.name;
}

export default function PricingTable({ plans, macro, activeMacroId, giroSlug }: PricingTableProps) {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");

  // Annual toggle only matters when at least one plan exposes an annualPrice.
  const supportsAnnual = plans.some(
    (p) => p.annualPrice !== null && p.annualPrice !== undefined && p.annualPrice > 0,
  );

  const cols = plans.length === 3 ? "repeat(3, 1fr)" : "repeat(4, 1fr)";
  const maxWidth = plans.length === 3 ? 920 : 1200;

  return (
    <section id="precios" style={{ background: "white", padding: "90px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: macro.accent, letterSpacing: "0.1em" }}>
            PLANES
          </span>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              marginTop: 12,
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Encuentra el plan{" "}
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 400 }}>
              perfecto
            </span>{" "}
            para tu negocio
          </h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: 0 }}>
            Empieza gratis. Sube cuando crezcas. Sin permanencia.
          </p>
        </div>

        {supportsAnnual && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", background: "#f1f5f9", borderRadius: 999, padding: 4 }}>
            {[
              { v: "monthly" as const, l: "Mensual" },
              { v: "annual" as const, l: "Anual · 2 meses gratis" },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => setCycle(o.v)}
                style={{
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: cycle === o.v ? "white" : "transparent",
                  color: cycle === o.v ? "#0f172a" : "#64748b",
                  boxShadow: cycle === o.v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: 16,
            maxWidth,
            margin: "0 auto",
          }}
        >
          {plans.map((plan) => {
            const isPopular = plan.internalCode === "pro";
            const monthlyPrice = plan.monthlyPrice;
            const annualPrice = plan.annualPrice;
            const isCustom = monthlyPrice === null && annualPrice === null;
            const isFree = monthlyPrice === 0;
            const hasAnnual = annualPrice !== null && annualPrice > 0;
            const effectiveMonthly =
              cycle === "annual" && annualPrice !== null && annualPrice > 0
                ? Math.ceil(annualPrice / 12)
                : monthlyPrice;
            const visibleFeatures = plan.features.filter((f) =>
              isFeatureVisible(f, activeMacroId),
            );
            const isDark = isPopular;
            const tagline = PLAN_TAGLINE[plan.internalCode] ?? "";

            const giroParam = giroSlug ? `&giro=${giroSlug}` : "";
            const registerHref = `${APP_URL}/register?plan=${plan.internalCode}${giroParam}&country=MX&cycle=${cycle}`;
            const ctaHref = isCustom ? "#contacto" : registerHref;

            return (
              <div
                key={plan.id}
                style={{
                  position: "relative",
                  background: isDark ? "#0f172a" : "white",
                  color: isDark ? "white" : "#0f172a",
                  border: isDark ? "none" : "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: 26,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: isDark ? "0 20px 50px rgba(15,23,42,0.18)" : "none",
                }}
              >
                {isPopular && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: macro.accent,
                      color: "white",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "4px 9px",
                      borderRadius: 5,
                    }}
                  >
                    POPULAR
                  </span>
                )}
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: isDark ? "white" : "#0f172a" }}>
                  {plan.name}
                </h3>
                {tagline && (
                  <p
                    style={{
                      fontSize: 11,
                      color: isDark ? "#94a3b8" : "#64748b",
                      margin: "6px 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {tagline}
                  </p>
                )}

                <div style={{ marginTop: 18, marginBottom: 22 }}>
                  {isCustom ? (
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>Cotización</div>
                      <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                        A la medida
                      </div>
                    </div>
                  ) : isFree ? (
                    <div>
                      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em" }}>Gratis</div>
                      <div style={{ fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", marginTop: 2 }}>
                        Por siempre
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.025em" }}>
                        {formatPrice(effectiveMonthly)}
                      </span>
                      {effectiveMonthly !== null && effectiveMonthly !== undefined && (
                        <span
                          style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b", marginLeft: 4 }}
                        >
                          /mes
                        </span>
                      )}
                      {cycle === "annual" && hasAnnual && (
                        <div
                          style={{
                            fontSize: 11,
                            color: macro.accent,
                            fontWeight: 700,
                            marginTop: 2,
                          }}
                        >
                          Pagas 10, te damos 12
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    marginBottom: 22,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {visibleFeatures.length === 0 ? (
                    <li
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        fontSize: 13,
                        color: isDark ? "#94a3b8" : "#64748b",
                        fontStyle: "italic",
                        lineHeight: 1.5,
                      }}
                    >
                      <Check color={macro.accent} />
                      <span>Funciones esenciales del plan {plan.name}</span>
                    </li>
                  ) : (
                    visibleFeatures.map((feat) => {
                      const isString = typeof feat === "string";
                      const label = formatFeatureText(feat);
                      const key = isString ? feat : feat.code;
                      return (
                        <li
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 13,
                            color: isDark ? "#cbd5e1" : "#374151",
                            lineHeight: 1.5,
                          }}
                        >
                          <Check color={macro.accent} />
                          <span>{label}</span>
                        </li>
                      );
                    })
                  )}
                </ul>

                <a
                  href={ctaHref}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "11px 16px",
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    background: isDark ? macro.accent : isCustom ? "#0f172a" : "white",
                    color: isDark || isCustom ? "white" : "#0f172a",
                    border: isDark ? "none" : isCustom ? "none" : "1px solid #e2e8f0",
                  }}
                >
                  {ctaLabel(plan)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
