import type { CSSProperties } from "react";
import type { MacroEditorial } from "./macros";

const POS_BORDER = "#e2e8f0";
const POS_TEXT = "#0f172a";
const POS_MUTED = "#64748b";

interface POSFrameProps {
  accent: string;
  label?: string;
  height?: number | string;
  children: React.ReactNode;
}

function POSFrame({ accent, children, label = "FINO POS", height }: POSFrameProps) {
  const style: CSSProperties = {
    background: "white",
    borderRadius: 14,
    border: `1px solid ${POS_BORDER}`,
    boxShadow: "0 24px 60px -20px rgba(15,23,42,0.18), 0 6px 18px -10px rgba(15,23,42,0.12)",
    overflow: "hidden",
    width: "100%",
    ...(height ? { height } : {}),
  };
  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 14px",
          borderBottom: `1px solid ${POS_BORDER}`,
          background: "#fafbfc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: POS_TEXT, letterSpacing: "-0.01em" }}>
            {label}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            margin: "0 14px",
            height: 22,
            background: "white",
            border: `1px solid ${POS_BORDER}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            fontSize: 10,
            color: POS_MUTED,
          }}
        >
          <span>🔍 Buscar producto…</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "white",
              background: accent,
              padding: "3px 8px",
              borderRadius: 5,
            }}
          >
            + Nueva venta
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  big?: boolean;
  warn?: boolean;
  accent?: string;
}

function Row({ label, value, big, warn, accent }: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span style={{ fontSize: 11, color: POS_MUTED }}>{label}</span>
      <span
        style={{
          fontSize: big ? 14 : 11,
          fontWeight: big ? 800 : 600,
          color: warn ? "#b45309" : big && accent ? accent : POS_TEXT,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function MiniDonut({ accent }: { accent: string }) {
  const segs = [
    { c: accent, p: 0.42, label: "Abarrotes" },
    { c: "#16a34a", p: 0.28, label: "Bebidas" },
    { c: "#f59e0b", p: 0.18, label: "Snacks" },
    { c: "#94a3b8", p: 0.12, label: "Otros" },
  ];
  let off = 0;
  const C = 2 * Math.PI * 32;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <svg width="92" height="92" viewBox="0 0 92 92">
        <circle cx="46" cy="46" r="32" fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {segs.map((s, i) => {
          const len = s.p * C;
          const dash = `${len} ${C - len}`;
          const el = (
            <circle
              key={i}
              cx="46"
              cy="46"
              r="32"
              fill="none"
              stroke={s.c}
              strokeWidth="14"
              strokeDasharray={dash}
              strokeDashoffset={-off}
              transform="rotate(-90 46 46)"
            />
          );
          off += len;
          return el;
        })}
        <text x="46" y="42" textAnchor="middle" fontSize="9" fontWeight="600" fill={POS_MUTED}>
          VENTAS
        </text>
        <text x="46" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill={POS_TEXT}>
          $8.4k
        </text>
      </svg>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {segs.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
            <span style={{ color: POS_MUTED, flex: 1 }}>{s.label}</span>
            <span style={{ fontWeight: 700, color: POS_TEXT }}>{Math.round(s.p * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockRestaurant({ accent }: { accent: string }) {
  const tables = [
    { n: 1, status: "ocupada" as const, time: "12 min", total: 540 },
    { n: 2, status: "libre" as const },
    { n: 3, status: "ocupada" as const, time: "32 min", total: 1280 },
    { n: 4, status: "cuenta" as const, time: "48 min", total: 890 },
    { n: 5, status: "libre" as const },
    { n: 6, status: "ocupada" as const, time: "8 min", total: 220 },
    { n: 7, status: "reservada" as const },
    { n: 8, status: "libre" as const },
  ];
  const colors = {
    ocupada: { bg: "#fef2f2", c: accent, label: "Ocupada" },
    cuenta: { bg: "#fef3c7", c: "#b45309", label: "Pidió cuenta" },
    libre: { bg: "#f0fdf4", c: "#16a34a", label: "Libre" },
    reservada: { bg: "#eff6ff", c: "#2563eb", label: "Reservada" },
  };

  return (
    <POSFrame accent={accent} label="FINO · Restaurante">
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", minHeight: 360 }}>
        <div style={{ padding: 16, borderRight: `1px solid ${POS_BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: POS_TEXT }}>Salón principal</span>
            <span style={{ fontSize: 10, color: POS_MUTED }}>5 ocupadas · 3 libres</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {tables.map((t) => {
              const c = colors[t.status];
              return (
                <div
                  key={t.n}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.c}33`,
                    borderRadius: 8,
                    padding: 10,
                    minHeight: 76,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: POS_TEXT }}>M{t.n}</span>
                    <span style={{ fontSize: 8, fontWeight: 600, color: c.c, padding: "2px 5px", borderRadius: 4, background: "white" }}>
                      {c.label}
                    </span>
                  </div>
                  {"total" in t && t.total ? (
                    <div>
                      <div style={{ fontSize: 9, color: POS_MUTED }}>{t.time}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: POS_TEXT }}>${t.total}</div>
                    </div>
                  ) : (
                    <div style={{ height: 18 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: 16, background: "#fafbfc" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.06em", marginBottom: 4 }}>
            MESA 3 · 4 PERSONAS
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: POS_TEXT, marginBottom: 10 }}>Comanda activa</div>
          {[
            { qty: 2, name: "Tacos al pastor", price: 180 },
            { qty: 1, name: "Volcán de costilla", price: 145 },
            { qty: 3, name: "Refresco 600ml", price: 105 },
            { qty: 2, name: "Cerveza tarro", price: 180 },
          ].map((i) => (
            <div
              key={i.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px dashed #e5e7eb",
                fontSize: 11,
              }}
            >
              <span style={{ color: POS_TEXT }}>
                <span style={{ fontWeight: 700, marginRight: 6, color: accent }}>{i.qty}×</span>
                {i.name}
              </span>
              <span style={{ color: POS_TEXT, fontVariantNumeric: "tabular-nums" }}>${i.price}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 12,
              padding: 10,
              background: accent,
              borderRadius: 8,
              color: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600 }}>Total mesa</span>
            <span style={{ fontSize: 16, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>$1,280</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <span
              style={{
                flex: 1,
                padding: "8px 0",
                border: `1px solid ${POS_BORDER}`,
                borderRadius: 6,
                textAlign: "center",
                fontSize: 10,
                fontWeight: 600,
                color: POS_TEXT,
              }}
            >
              Dividir
            </span>
            <span
              style={{
                flex: 1,
                padding: "8px 0",
                background: POS_TEXT,
                borderRadius: 6,
                textAlign: "center",
                fontSize: 10,
                fontWeight: 600,
                color: "white",
              }}
            >
              Cobrar
            </span>
          </div>
        </div>
      </div>
    </POSFrame>
  );
}

export function MockQSR({ accent }: { accent: string }) {
  const cats = ["☕ Café", "🥪 Sándwich", "🍩 Postres", "🥤 Bebidas", "🍰 Pastelería"];
  const products = [
    { n: "Latte vainilla", p: 65, c: "#fef3c7" },
    { n: "Capuccino", p: 60, c: "#fce7f3" },
    { n: "Americano", p: 45, c: "#fef9c3" },
    { n: "Frappé Oreo", p: 85, c: "#e0e7ff" },
    { n: "Mocha", p: 70, c: "#fed7aa" },
    { n: "Matcha latte", p: 80, c: "#dcfce7" },
    { n: "Cold brew", p: 75, c: "#dbeafe" },
    { n: "Té chai", p: 55, c: "#ffedd5" },
  ];
  return (
    <POSFrame accent={accent} label="FINO · Cafetería">
      <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", minHeight: 360 }}>
        <div style={{ borderRight: `1px solid ${POS_BORDER}`, padding: "12px 0" }}>
          {cats.map((c, i) => (
            <div
              key={c}
              style={{
                padding: "10px 12px",
                fontSize: 11,
                fontWeight: i === 0 ? 700 : 500,
                color: i === 0 ? accent : POS_MUTED,
                borderLeft: i === 0 ? `2px solid ${accent}` : "2px solid transparent",
                background: i === 0 ? "#fffbeb" : "transparent",
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <div style={{ padding: 12, borderRight: `1px solid ${POS_BORDER}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {products.map((p) => (
              <div
                key={p.n}
                style={{
                  background: p.c,
                  borderRadius: 8,
                  padding: 10,
                  minHeight: 78,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.7)" }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: POS_TEXT, lineHeight: 1.2 }}>{p.n}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: POS_TEXT }}>${p.p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 14, background: "#fafbfc" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.06em", marginBottom: 4 }}>
            PEDIDO #248
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: POS_TEXT, marginBottom: 10 }}>Para llevar</div>
          {[
            { n: "Latte vainilla", p: 65 },
            { n: "Mocha", p: 70 },
            { n: "Té chai", p: 55 },
            { n: "Frappé Oreo", p: 85 },
          ].map((i) => (
            <div
              key={i.n}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                fontSize: 11,
                borderBottom: "1px dashed #e5e7eb",
              }}
            >
              <span>{i.n}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>${i.p}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 11,
              color: POS_MUTED,
            }}
          >
            <span>Subtotal</span>
            <span>$275</span>
          </div>
          <div
            style={{
              marginTop: 8,
              padding: 10,
              background: accent,
              borderRadius: 8,
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600 }}>Cobrar</span>
            <span style={{ fontSize: 16, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>$275.00</span>
          </div>
        </div>
      </div>
    </POSFrame>
  );
}

export function MockRetail({ accent }: { accent: string }) {
  return (
    <POSFrame accent={accent} label="FINO · Tienda">
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: 360 }}>
        <div style={{ padding: 16, borderRight: `1px solid ${POS_BORDER}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div
              style={{
                flex: 1,
                background: "#eff6ff",
                border: `1px dashed ${accent}`,
                borderRadius: 8,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 9, color: accent, fontWeight: 700, letterSpacing: "0.06em" }}>
                  ESCANEANDO
                </div>
                <div
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    color: POS_TEXT,
                    marginTop: 2,
                  }}
                >
                  7501030415108
                </div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ width: 2, height: i % 2 ? 18 : 22, background: "white" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {[
            { sku: "BIM-PAN-007", n: "Pan blanco grande", p: 38, q: 2, st: "ok" as const },
            { sku: "COL-COL-355", n: "Coca-Cola 355ml", p: 18, q: 6, st: "ok" as const },
            { sku: "DAN-LCH-1L", n: "Leche Lala 1L", p: 28, q: 1, st: "low" as const },
            { sku: "BIM-MAR-300", n: "Mantequilla 300g", p: 48, q: 1, st: "ok" as const },
          ].map((r) => (
            <div
              key={r.sku}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: 10,
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #f1f5f9",
                fontSize: 11,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: POS_TEXT }}>{r.n}</div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, color: POS_MUTED }}>
                  {r.sku}
                </div>
              </div>
              {r.st === "low" && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#b45309",
                    background: "#fef3c7",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  POR AGOTARSE
                </span>
              )}
              <span style={{ fontSize: 10, color: POS_MUTED }}>×{r.q}</span>
              <span style={{ fontWeight: 700, color: POS_TEXT, fontVariantNumeric: "tabular-nums" }}>
                ${r.p * r.q}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding: 16, background: "#fafbfc" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.06em", marginBottom: 10 }}>
            RESUMEN DEL TURNO
          </div>
          <MiniDonut accent={accent} />
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <Row label="Ventas hoy" value="$8,420" big accent={accent} />
            <Row label="Tickets" value="42" />
            <Row label="Margen" value="38%" />
            <Row label="Stock bajo" value="3 items" warn />
          </div>
        </div>
      </div>
    </POSFrame>
  );
}

export function MockServices({ accent }: { accent: string }) {
  const slots = [
    { h: "10:00", n: "María R.", s: "Corte + tinte", st: "confirmada" as const },
    { h: "11:30", n: "Carlos M.", s: "Barba premium", st: "confirmada" as const },
    { h: "12:30", n: "—", s: "Disponible", st: "libre" as const },
    { h: "13:30", n: "Lucía P.", s: "Mensual ✓", st: "membresia" as const },
    { h: "15:00", n: "Roberto V.", s: "Corte clásico", st: "confirmada" as const },
    { h: "16:30", n: "—", s: "Disponible", st: "libre" as const },
  ];
  const colors = {
    confirmada: { bg: "#f5f3ff", c: accent },
    membresia: { bg: "#ecfdf5", c: "#16a34a" },
    libre: { bg: "#f8fafc", c: POS_MUTED },
  };
  return (
    <POSFrame accent={accent} label="FINO · Agenda">
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", minHeight: 360 }}>
        <div style={{ padding: 16, borderRight: `1px solid ${POS_BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: POS_TEXT }}>Hoy · Martes 14</span>
            <span style={{ fontSize: 10, color: POS_MUTED }}>4 confirmadas · 2 libres</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {slots.map((s) => {
              const c = colors[s.st];
              return (
                <div
                  key={s.h}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr auto",
                    gap: 12,
                    alignItems: "center",
                    padding: "10px 12px",
                    background: c.bg,
                    border: `1px solid ${c.c}33`,
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: c.c }}>
                    {s.h}
                  </span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: POS_TEXT }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: POS_MUTED }}>{s.s}</div>
                  </div>
                  {s.st === "membresia" && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#16a34a",
                        padding: "2px 6px",
                        background: "white",
                        borderRadius: 4,
                      }}
                    >
                      MEMBRESÍA
                    </span>
                  )}
                  {s.st === "libre" && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color: accent,
                        padding: "2px 6px",
                        background: "white",
                        borderRadius: 4,
                        border: `1px solid ${accent}33`,
                      }}
                    >
                      + Agendar
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: 16, background: "#fafbfc" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.06em", marginBottom: 10 }}>
            MEMBRESÍAS ACTIVAS
          </div>
          <div
            style={{
              background: "white",
              border: `1px solid ${POS_BORDER}`,
              borderRadius: 10,
              padding: 14,
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: POS_TEXT }}>147</span>
              <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 700 }}>+12 este mes</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#f1f5f9", overflow: "hidden" }}>
              <div style={{ width: "78%", height: "100%", background: accent }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 10, color: POS_MUTED }}>78% renovación automática</div>
          </div>
          <Row label="Cobros este mes" value="$54,200" big accent={accent} />
          <Row label="Vence en 7 días" value="9 clientes" warn />
          <Row label="Recordatorios enviados" value="32" />
        </div>
      </div>
    </POSFrame>
  );
}

export function MockDashboard({ accent }: { accent: string }) {
  const months = [40, 55, 48, 70, 62, 88, 76, 95, 82, 110, 98, 120];
  const max = Math.max(...months);
  const pts = months.map((m, i): [number, number] => [
    (i / (months.length - 1)) * 470 + 5,
    110 - (m / max) * 90,
  ]);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${path} L475,120 L5,120 Z`;
  return (
    <POSFrame accent={accent} label="FINO · Reportes">
      <div style={{ padding: 18, minHeight: 320 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: POS_MUTED, letterSpacing: "0.06em" }}>
              VENTAS · ÚLTIMOS 12 MESES
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: POS_TEXT, marginTop: 4 }}>$1,284,560</div>
            <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, marginTop: 2 }}>↗ +18.2% vs año anterior</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["7D", "30D", "12M"].map((p, i) => (
              <span
                key={p}
                style={{
                  padding: "4px 10px",
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 5,
                  background: i === 2 ? POS_TEXT : "#f1f5f9",
                  color: i === 2 ? "white" : POS_MUTED,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 480 130" style={{ width: "100%", height: 130 }}>
          <defs>
            <linearGradient id="grad-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" x2="480" y1={20 + i * 30} y2={20 + i * 30} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          <path d={area} fill="url(#grad-a)" />
          <path
            d={path}
            stroke={accent}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={pts[pts.length - 1][0]}
            cy={pts[pts.length - 1][1]}
            r="4"
            fill="white"
            stroke={accent}
            strokeWidth="2.5"
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: POS_MUTED }}>
          {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
          {[
            { l: "Ticket promedio", v: "$284", d: "+12%" },
            { l: "Clientes nuevos", v: "1,420", d: "+8%" },
            { l: "Producto top", v: "Latte vainilla", d: "326 ud" },
          ].map((k) => (
            <div
              key={k.l}
              style={{
                background: "#f8fafc",
                border: `1px solid ${POS_BORDER}`,
                borderRadius: 8,
                padding: 10,
              }}
            >
              <div style={{ fontSize: 9, color: POS_MUTED, fontWeight: 600, letterSpacing: "0.04em" }}>
                {k.l.toUpperCase()}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: POS_TEXT, marginTop: 3 }}>{k.v}</div>
              <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, marginTop: 2 }}>{k.d}</div>
            </div>
          ))}
        </div>
      </div>
    </POSFrame>
  );
}

export function MockPhone({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 240,
          background: "#0f172a",
          borderRadius: 32,
          padding: 8,
          boxShadow: "0 30px 60px -20px rgba(15,23,42,0.4)",
        }}
      >
        <div style={{ background: "white", borderRadius: 26, overflow: "hidden", padding: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: POS_MUTED,
              marginBottom: 14,
            }}
          >
            <span style={{ fontWeight: 700 }}>9:41</span>
            <span>●●●● Fino</span>
          </div>
          <div style={{ fontSize: 11, color: POS_MUTED, fontWeight: 600 }}>Hoy</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: POS_TEXT, letterSpacing: "-0.03em" }}>$8,420</div>
          <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>↗ +18% vs ayer</div>
          <svg viewBox="0 0 200 60" style={{ width: "100%", marginTop: 10 }}>
            <path
              d="M5,45 L25,32 L50,38 L80,22 L110,28 L140,15 L170,18 L195,8"
              stroke={accent}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 9, color: POS_MUTED, fontWeight: 600 }}>TICKETS</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>42</div>
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 9, color: POS_MUTED, fontWeight: 600 }}>TICKET PROM.</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>$200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function POSMockup({ macro }: { macro: MacroEditorial }) {
  const map = {
    restaurant: MockRestaurant,
    qsr: MockQSR,
    retail: MockRetail,
    services: MockServices,
  } as const;
  const Comp = map[macro.mock];
  return <Comp accent={macro.accent} />;
}
